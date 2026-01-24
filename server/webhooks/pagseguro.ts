/**
 * PagSeguro Webhook Handler
 * Receives and processes payment notifications from PagSeguro
 */

import express, { Router, Request, Response } from 'express';
import * as db from '../db';
import { handleWebhookNotification } from '../pagseguro';

const router = Router();

/**
 * POST /api/webhooks/pagseguro
 * Receives webhook notifications from PagSeguro
 * Handles transaction status changes: PAID, PENDING, FAILED, REFUNDED
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    console.log('PagSeguro Webhook Received:', JSON.stringify(payload, null, 2));

    // Verify webhook signature (implement based on PagSeguro requirements)
    // const isValid = verifyWebhookSignature(JSON.stringify(payload), req.headers['x-signature'] as string);
    // if (!isValid) {
    //   return res.status(401).json({ error: 'Invalid signature' });
    // }

    // Extract payment information
    const { id: orderId, status, charges, customer, items, reference_id } = payload;
    const customerEmail = customer?.email;
    const amount = items?.[0]?.unit_amount ? items[0].unit_amount / 100 : 0;
    const chargeStatus = charges?.[0]?.status;
    const paymentMethod = charges?.[0]?.payment_method?.type;

    console.log(`Processing transaction: Order ${orderId}, Status: ${status}, Charge Status: ${chargeStatus}`);

    // Handle different transaction states
    switch (chargeStatus || status) {
      case 'PAID':
        // Payment confirmed - Liberate plan access
        if (customerEmail) {
          console.log(`✓ Payment CONFIRMED for ${customerEmail}: Order ${orderId}, Amount: R$ ${amount}`);
          console.log(`  Payment Method: ${paymentMethod}`);
          console.log(`  Liberating plan access...`);
          
          // TODO: Update customer payment status in database
          // await db.updateCustomerPaymentStatus(customerEmail, {
          //   paymentId: orderId,
          //   status: 'paid',
          //   amount: amount,
          //   paymentMethod: paymentMethod,
          //   paidAt: new Date(),
          // });
          
          // TODO: Send confirmation email to customer
          // await sendPaymentConfirmationEmail(customerEmail, { orderId, amount, plan });
        }
        break;

      case 'PENDING':
        // Payment pending - Awaiting confirmation
        if (customerEmail) {
          console.log(`⏳ Payment PENDING for ${customerEmail}: Order ${orderId}`);
          console.log(`  Payment Method: ${paymentMethod}`);
          console.log(`  Awaiting confirmation...`);
          
          // TODO: Send pending notification email
          // await sendPaymentPendingEmail(customerEmail, { orderId, paymentMethod });
        }
        break;

      case 'FAILED':
        // Payment failed - Notify customer
        if (customerEmail) {
          console.log(`✗ Payment FAILED for ${customerEmail}: Order ${orderId}`);
          console.log(`  Payment Method: ${paymentMethod}`);
          
          // TODO: Send failure notification email
          // await sendPaymentFailedEmail(customerEmail, { orderId, amount });
        }
        break;

      case 'REFUNDED':
        // Refund processed
        if (customerEmail) {
          console.log(`↩ Refund PROCESSED for ${customerEmail}: Order ${orderId}`);
          console.log(`  Refund Amount: R$ ${amount}`);
          
          // TODO: Update customer status and revoke plan access
          // await db.updateCustomerPaymentStatus(customerEmail, {
          //   status: 'refunded',
          //   refundedAt: new Date(),
          // });
        }
        break;

      default:
        console.log(`Unknown status: ${chargeStatus || status}`);
    }

    // Process the webhook
    await handleWebhookNotification(payload);

    // Always respond with 200 OK to acknowledge receipt
    res.status(200).json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    console.error('Error processing PagSeguro webhook:', error);
    // Still return 200 to prevent PagSeguro from retrying
    res.status(200).json({ success: false, error: 'Processing error' });
  }
});

/**
 * GET /api/webhooks/pagseguro/status/:orderId
 * Check payment status for a specific order
 */
router.get('/status/:orderId', async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    
    // Fetch payment status from PagSeguro
    // const paymentStatus = await getPaymentStatus(orderId);
    
    res.status(200).json({
      orderId,
      status: 'pending',
      // Add actual status from PagSeguro here
    });
  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({ error: 'Failed to fetch payment status' });
  }
});

export default router;
