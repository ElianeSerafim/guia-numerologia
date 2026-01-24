/**
 * PagSeguro Integration
 * Handles payment processing for Pix, Credit/Debit Card, and Boleto
 */

import axios from 'axios';

const PAGSEGURO_API_URL = 'https://api.pagseguro.com/orders';
const PAGSEGURO_TOKEN = process.env.PAGSEGURO_TOKEN || '909061';

interface PaymentRequest {
  email: string;
  name: string;
  planId: string;
  planName: string;
  amount: number;
  paymentMethod: 'pix' | 'credit_card' | 'boleto';
  cardData?: {
    number: string;
    holder: string;
    expirationMonth: string;
    expirationYear: string;
    securityCode: string;
  };
}

interface PaymentResponse {
  id: string;
  status: string;
  charges: Array<{
    id: string;
    status: string;
    paymentMethod: {
      type: string;
    };
    paidAt?: string;
  }>;
  links?: Array<{
    rel: string;
    href: string;
  }>;
}

/**
 * Create a payment order with PagSeguro
 */
export async function createPaymentOrder(paymentData: PaymentRequest): Promise<PaymentResponse> {
  try {
    const orderData = {
      reference_id: `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      customer: {
        name: paymentData.name,
        email: paymentData.email,
      },
      items: [
        {
          name: paymentData.planName,
          quantity: 1,
          unit_amount: Math.round(paymentData.amount * 100), // Convert to cents
        },
      ],
      charges: [
        {
          payment_method: {
            type: mapPaymentMethod(paymentData.paymentMethod),
            ...(paymentData.paymentMethod === 'credit_card' && paymentData.cardData && {
              card: {
                number: paymentData.cardData.number,
                exp_month: paymentData.cardData.expirationMonth,
                exp_year: paymentData.cardData.expirationYear,
                security_code: paymentData.cardData.securityCode,
                holder_name: paymentData.cardData.holder,
              },
            }),
          },
        },
      ],
      notification_urls: [
        `${process.env.APP_URL}/api/webhooks/pagseguro`,
      ],
    };

    const response = await axios.post(PAGSEGURO_API_URL, orderData, {
      headers: {
        'Authorization': `Bearer ${PAGSEGURO_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('PagSeguro API Error:', error);
    throw new Error('Failed to create payment order');
  }
}

/**
 * Map payment method to PagSeguro format
 */
function mapPaymentMethod(method: string): string {
  const methodMap: Record<string, string> = {
    pix: 'PIX',
    credit_card: 'CREDIT_CARD',
    boleto: 'BOLETO',
  };
  return methodMap[method] || 'CREDIT_CARD';
}

/**
 * Verify webhook signature from PagSeguro
 */
export function verifyWebhookSignature(body: string, signature: string): boolean {
  // PagSeguro uses HMAC-SHA256 for signature verification
  // Implementation depends on PagSeguro's specific requirements
  // For now, we'll accept all webhooks (should be improved in production)
  return true;
}

/**
 * Handle webhook notification from PagSeguro
 */
export async function handleWebhookNotification(payload: any): Promise<void> {
  try {
    const { id, status, charges, reference_id } = payload;

    console.log(`Processing PagSeguro webhook: Order ${id}, Status: ${status}`);

    // Extract customer email and plan from reference_id if needed
    // Update payment status in database
    // Trigger plan activation if payment is confirmed

    if (status === 'PAID' || (charges && charges[0]?.status === 'PAID')) {
      console.log(`Payment confirmed for order ${id}`);
      // Trigger automatic plan activation
      // This will be handled by the database update
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    throw error;
  }
}

/**
 * Get payment status from PagSeguro
 */
export async function getPaymentStatus(orderId: string): Promise<PaymentResponse> {
  try {
    const response = await axios.get(`${PAGSEGURO_API_URL}/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${PAGSEGURO_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching payment status:', error);
    throw new Error('Failed to fetch payment status');
  }
}
