/**
 * PagSeguro Webhook Handler
 * Processes payment notifications from PagSeguro and updates order status
 */

import { getDb } from '../db';
import { pagSeguroOrders, customers, subscriptions, PagSeguroOrder } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { sendPaymentConfirmationEmail, sendPaymentFailureEmail } from '../email/emailService';

export interface PagSeguroWebhookPayload {
  id: string;
  code: string;
  reference: string;
  status: string;
  grossAmount: string;
  netAmount: string;
  paymentMethod: {
    type: string;
    code: string;
  };
  createdAt: string;
  updatedAt: string;
  payer?: {
    email: string;
    name: string;
  };
}

/**
 * Map PagSeguro status to internal status
 */
function mapPagSeguroStatus(pagseguroStatus: string): 'pending' | 'confirmed' | 'failed' | 'refunded' {
  const statusMap: Record<string, 'pending' | 'confirmed' | 'failed' | 'refunded'> = {
    'PAID': 'confirmed',
    'WAITING': 'pending',
    'CANCELED': 'failed',
    'REFUNDED': 'refunded',
    'CHARGEBACK': 'failed',
    'DISPUTE': 'pending',
  };

  return statusMap[pagseguroStatus] || 'pending';
}

/**
 * Process webhook from PagSeguro
 */
export async function handlePagSeguroWebhook(payload: PagSeguroWebhookPayload): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  try {
    console.log('[PagSeguro Webhook] Processing payment:', {
      id: payload.id,
      reference: payload.reference,
      status: payload.status,
    });

    // Find order by PagSeguro reference
    const order = await db
      .select()
      .from(pagSeguroOrders)
      .where(eq(pagSeguroOrders.pagseguroReference, payload.reference))
      .limit(1);

    if (!order || order.length === 0) {
      console.warn('[PagSeguro Webhook] Order not found:', payload.reference);
      return;
    }

    const existingOrder = order[0] as PagSeguroOrder;
    const internalStatus = mapPagSeguroStatus(payload.status);
    const now = new Date();

    // Update order status
    await db
      .update(pagSeguroOrders)
      .set({
        status: internalStatus,
        pagseguroStatus: payload.status,
        pagseguroCode: payload.code,
        webhookData: payload as any,
        confirmedAt: internalStatus === 'confirmed' ? now : existingOrder.confirmedAt,
        updatedAt: now,
      })
      .where(eq(pagSeguroOrders.id, existingOrder.id));

    console.log('[PagSeguro Webhook] Order updated:', {
      orderId: existingOrder.orderId,
      status: internalStatus,
    });

    // If payment confirmed, activate subscription
    if (internalStatus === 'confirmed') {
      await activateSubscription(db, existingOrder);
    }

    // If payment failed or refunded, handle accordingly
    if (internalStatus === 'failed' || internalStatus === 'refunded') {
      await handleFailedPayment(db, existingOrder);
    }
  } catch (error) {
    console.error('[PagSeguro Webhook] Error processing webhook:', error);
    throw error;
  }
}

/**
 * Activate subscription after successful payment
 */
async function activateSubscription(db: any, order: PagSeguroOrder): Promise<void> {
  try {
    // Find or create customer
    const customerList = await db
      .select()
      .from(customers)
      .where(eq(customers.email, order.email))
      .limit(1);

    let customerId: number;

    if (!customerList || customerList.length === 0) {
      // Create new customer
      const result = await db.insert(customers).values({
        email: order.email,
        name: order.name,
        plan: order.plan,
        status: 'active',
        paymentMethod: order.paymentMethod,
        paymentId: order.orderId,
        amount: order.amount,
        currency: 'BRL',
        approvedAt: new Date(),
      });

      // Get the inserted customer ID
      const insertedCustomers = await db
        .select()
        .from(customers)
        .where(eq(customers.email, order.email))
        .limit(1);
      customerId = insertedCustomers[0].id;
    } else {
      customerId = customerList[0].id;

      // Update customer status
      await db
        .update(customers)
        .set({
          plan: order.plan,
          status: 'active',
          paymentMethod: order.paymentMethod,
          paymentId: order.orderId,
          amount: order.amount,
          approvedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(customers.id, customerId));
    }

    // Get plan details from PLANS constant
    const planLimits: Record<string, number> = {
      'navegador': 1,
      'visionario': 3,
      'iluminado': 10,
    };

    const mapsLimit = planLimits[order.plan] || 1;

    // Create or update subscription
    const existingSubscription = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.customerId, customerId))
      .limit(1);

    if (existingSubscription && existingSubscription.length > 0) {
      // Update existing subscription
      await db
        .update(subscriptions)
        .set({
          plan: order.plan,
          planPrice: order.amount,
          mapsLimit: mapsLimit,
          paymentStatus: 'completed',
          paymentMethod: order.paymentMethod,
          activatedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(subscriptions.customerId, customerId));
    } else {
      // Create new subscription
      await db.insert(subscriptions).values({
        customerId,
        email: order.email,
        plan: order.plan,
        planPrice: order.amount,
        mapsLimit: mapsLimit,
        mapsGenerated: 0,
        paymentStatus: 'completed',
        paymentMethod: order.paymentMethod,
        activatedAt: new Date(),
      });
    }

    // Update order with customer ID
    await db
      .update(pagSeguroOrders)
      .set({
        customerId,
        updatedAt: new Date(),
      })
      .where(eq(pagSeguroOrders.id, order.id));

    console.log('[PagSeguro Webhook] Subscription activated:', {
      customerId,
      plan: order.plan,
      mapsLimit: mapsLimit,
    });

    // Enviar email de confirmação
    try {
      await sendPaymentConfirmationEmail({
        email: order.email,
        planType: order.plan,
        mapsLimit: mapsLimit,
        accessLink: `https://portaldenumerologia.manus.space/dashboard`,
        orderId: order.orderId,
      });
    } catch (emailError) {
      console.error('[PagSeguro Webhook] Error sending confirmation email:', emailError);
    }
  } catch (error) {
    console.error('[PagSeguro Webhook] Error activating subscription:', error);
    throw error;
  }
}

/**
 * Handle failed or refunded payment
 */
async function handleFailedPayment(db: any, order: PagSeguroOrder): Promise<void> {
  try {
    // Find customer
    const customerList = await db
      .select()
      .from(customers)
      .where(eq(customers.email, order.email))
      .limit(1);

    if (customerList && customerList.length > 0) {
      // Update customer status to pending
      await db
        .update(customers)
        .set({
          status: 'pending',
          updatedAt: new Date(),
        })
        .where(eq(customers.id, customerList[0].id));

      // Deactivate subscription if exists
      const subscription = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.customerId, customerList[0].id))
        .limit(1);

      if (subscription && subscription.length > 0) {
        await db
          .update(subscriptions)
          .set({
            paymentStatus: 'failed',
            updatedAt: new Date(),
          })
          .where(eq(subscriptions.customerId, customerList[0].id));
      }
    }

    console.log('[PagSeguro Webhook] Payment failed/refunded:', {
      orderId: order.orderId,
      email: order.email,
    });

    // Enviar email de falha
    try {
      await sendPaymentFailureEmail(
        order.email,
        order.plan,
        'Seu pagamento foi recusado. Por favor, tente novamente com outro método de pagamento.'
      );
    } catch (emailError) {
      console.error('[PagSeguro Webhook] Error sending failure email:', emailError);
    }
  } catch (error) {
    console.error('[PagSeguro Webhook] Error handling failed payment:', error);
    throw error;
  }
}

/**
 * Verify webhook signature from PagSeguro
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  webhookSecret: string
): boolean {
  try {
    // TODO: Implement signature verification based on PagSeguro documentation
    // For now, we'll just verify the payload is valid JSON
    JSON.parse(payload);
    return true;
  } catch (error) {
    console.error('[PagSeguro Webhook] Invalid signature:', error);
    return false;
  }
}
