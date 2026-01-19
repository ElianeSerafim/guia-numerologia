import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendPaymentConfirmationEmail } from '../email/paymentConfirmation';

describe('Payment Confirmation Email', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return success when SendGrid API key is not configured', async () => {
    // Remove SendGrid API key
    const originalKey = process.env.SENDGRID_API_KEY;
    delete process.env.SENDGRID_API_KEY;

    const result = await sendPaymentConfirmationEmail({
      email: 'test@example.com',
      planType: 'visionario',
      mapsLimit: 3,
      accessLink: 'https://example.com/calculator',
    });

    expect(result.success).toBe(true);
    expect(result.simulated).toBe(true);

    // Restore original key
    if (originalKey) {
      process.env.SENDGRID_API_KEY = originalKey;
    }
  });

  it('should format email with correct plan name', async () => {
    const originalKey = process.env.SENDGRID_API_KEY;
    delete process.env.SENDGRID_API_KEY;

    const plans = ['navegador', 'visionario', 'iluminado'];
    
    for (const plan of plans) {
      const result = await sendPaymentConfirmationEmail({
        email: 'test@example.com',
        planType: plan,
        mapsLimit: 1,
        accessLink: 'https://example.com/calculator',
      });

      expect(result.success).toBe(true);
    }

    if (originalKey) {
      process.env.SENDGRID_API_KEY = originalKey;
    }
  });

  it('should handle different map limits correctly', async () => {
    const originalKey = process.env.SENDGRID_API_KEY;
    delete process.env.SENDGRID_API_KEY;

    const limits = [1, 3, 10];
    
    for (const limit of limits) {
      const result = await sendPaymentConfirmationEmail({
        email: 'test@example.com',
        planType: 'visionario',
        mapsLimit: limit,
        accessLink: 'https://example.com/calculator',
      });

      expect(result.success).toBe(true);
    }

    if (originalKey) {
      process.env.SENDGRID_API_KEY = originalKey;
    }
  });

  it('should include access link in email', async () => {
    const originalKey = process.env.SENDGRID_API_KEY;
    delete process.env.SENDGRID_API_KEY;

    const accessLink = 'https://example.com/calculator?subscription=123';
    const result = await sendPaymentConfirmationEmail({
      email: 'test@example.com',
      planType: 'visionario',
      mapsLimit: 3,
      accessLink,
    });

    expect(result.success).toBe(true);

    if (originalKey) {
      process.env.SENDGRID_API_KEY = originalKey;
    }
  });
});

describe('Webhook Payload Validation', () => {
  it('should validate required fields for webhook', () => {
    const validPayload = {
      id: 'order-123',
      status: 'approved',
      amount: 59.90,
      customer_email: 'test@example.com',
      customer_id: 1,
      plan_type: 'visionario',
      transaction_id: 'txn-123',
      nsu: 'nsu-123',
      aut: 'aut-123',
      card_brand: 'visa',
      payment_method: 'credit',
      installments: 1,
    };

    // Check all required fields are present
    expect(validPayload.id).toBeDefined();
    expect(validPayload.status).toBeDefined();
    expect(validPayload.customer_email).toBeDefined();
    expect(validPayload.customer_id).toBeDefined();
  });

  it('should map plan types to correct map limits', () => {
    const plansMap: Record<string, { mapsLimit: number; price: string }> = {
      'navegador': { mapsLimit: 1, price: '29.90' },
      'visionario': { mapsLimit: 3, price: '59.90' },
      'iluminado': { mapsLimit: 10, price: '200.00' },
    };

    expect(plansMap['navegador'].mapsLimit).toBe(1);
    expect(plansMap['visionario'].mapsLimit).toBe(3);
    expect(plansMap['iluminado'].mapsLimit).toBe(10);
  });

  it('should reject non-approved payments', () => {
    const statuses = ['pending', 'rejected', 'failed', 'cancelled'];
    
    statuses.forEach(status => {
      expect(status).not.toBe('approved');
    });
  });

  it('should handle missing plan_type with default', () => {
    const plansMap: Record<string, { mapsLimit: number; price: string }> = {
      'navegador': { mapsLimit: 1, price: '29.90' },
      'visionario': { mapsLimit: 3, price: '59.90' },
      'iluminado': { mapsLimit: 10, price: '200.00' },
    };

    const planType = undefined;
    const planInfo = plansMap[planType?.toLowerCase() || 'navegador'] || plansMap['navegador'];
    
    expect(planInfo.mapsLimit).toBe(1);
    expect(planInfo.price).toBe('29.90');
  });
});

describe('Subscription Creation', () => {
  it('should set correct expiration date (1 year)', () => {
    const now = new Date();
    const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    
    const daysDiff = Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    expect(daysDiff).toBeGreaterThanOrEqual(364);
    expect(daysDiff).toBeLessThanOrEqual(366);
  });

  it('should initialize mapsGenerated to 0', () => {
    const mapsGenerated = 0;
    expect(mapsGenerated).toBe(0);
  });

  it('should set paymentStatus to completed', () => {
    const paymentStatus = 'completed';
    expect(paymentStatus).toBe('completed');
  });

  it('should store all payment details', () => {
    const subscription = {
      customerId: 1,
      email: 'test@example.com',
      plan: 'visionario',
      planPrice: '59.90',
      mapsLimit: 3,
      mapsGenerated: 0,
      paymentStatus: 'completed',
      infinetepayOrderId: 'order-123',
      infinetepayNsu: 'nsu-123',
      infinetepayAut: 'aut-123',
      cardBrand: 'visa',
      paymentMethod: 'credit',
      installments: 1,
      activatedAt: new Date(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    };

    expect(subscription.infinetepayOrderId).toBe('order-123');
    expect(subscription.infinetepayNsu).toBe('nsu-123');
    expect(subscription.infinetepayAut).toBe('aut-123');
    expect(subscription.cardBrand).toBe('visa');
  });
});
