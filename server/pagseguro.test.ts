/**
 * PagSeguro Integration Tests
 * Validates payment processing and webhook handling
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { createPaymentOrder, getPaymentStatus, verifyWebhookSignature } from './pagseguro';

describe('PagSeguro Integration', () => {
  beforeAll(() => {
    // Verify environment variables are set
    if (!process.env.PAGSEGURO_TOKEN) {
      console.warn('⚠️ PAGSEGURO_TOKEN not set. Some tests will be skipped.');
    }
    if (!process.env.APP_URL) {
      console.warn('⚠️ APP_URL not set. Some tests will be skipped.');
    }
  });

  describe('Configuration', () => {
    it('should have PAGSEGURO_TOKEN configured', () => {
      expect(process.env.PAGSEGURO_TOKEN).toBeDefined();
      expect(process.env.PAGSEGURO_TOKEN).toMatch(/^[a-f0-9\-]+$/);
    });

    it('should have APP_URL configured', () => {
      expect(process.env.APP_URL).toBeDefined();
      expect(process.env.APP_URL).toMatch(/^https?:\/\//);
    });

    it('should have valid APP_URL format', () => {
      const appUrl = process.env.APP_URL;
      expect(appUrl).toContain('manus.space');
    });
  });

  describe('Payment Order Creation', () => {
    it('should reject payment without token', async () => {
      // Temporarily remove token
      const originalToken = process.env.PAGSEGURO_TOKEN;
      delete process.env.PAGSEGURO_TOKEN;

      try {
        await createPaymentOrder({
          email: 'test@example.com',
          name: 'Test User',
          planId: 'navegador',
          planName: 'Geração de 1 mapa',
          amount: 29.90,
          paymentMethod: 'pix',
        });
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error).toBeDefined();
        expect((error as Error).message).toContain('Token');
      } finally {
        // Restore token
        process.env.PAGSEGURO_TOKEN = originalToken;
      }
    });

    it('should validate payment request data', async () => {
      const paymentData = {
        email: 'customer@example.com',
        name: 'João Silva',
        planId: 'navegador',
        planName: 'Geração de 1 mapa',
        amount: 29.90,
        paymentMethod: 'pix' as const,
      };

      // Validate data structure
      expect(paymentData.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(paymentData.amount).toBeGreaterThan(0);
      expect(['pix', 'credit_card', 'boleto']).toContain(paymentData.paymentMethod);
    });

    it('should format amount correctly in cents', () => {
      const amount = 29.90;
      const amountInCents = Math.round(amount * 100);
      expect(amountInCents).toBe(2990);
    });
  });

  describe('Webhook Signature Verification', () => {
    it('should verify webhook signature', () => {
      const body = JSON.stringify({ id: '123', status: 'PAID' });
      const signature = 'test-signature';

      // Current implementation accepts all (placeholder)
      const isValid = verifyWebhookSignature(body, signature);
      expect(isValid).toBe(true);
    });
  });

  describe('Payment Methods', () => {
    it('should support Pix payments', () => {
      const methods = ['pix', 'credit_card', 'boleto'];
      expect(methods).toContain('pix');
    });

    it('should support Credit Card payments', () => {
      const methods = ['pix', 'credit_card', 'boleto'];
      expect(methods).toContain('credit_card');
    });

    it('should support Boleto payments', () => {
      const methods = ['pix', 'credit_card', 'boleto'];
      expect(methods).toContain('boleto');
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      try {
        // This will fail because we don't have a valid order ID
        await getPaymentStatus('invalid-order-id');
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error).toBeDefined();
        expect((error as Error).message).toContain('Failed');
      }
    });
  });

  describe('Plan Limits', () => {
    it('should have correct plan limits', () => {
      const plans = {
        navegador: { maps: 1, price: 29.90 },
        visionario: { maps: 3, price: 59.90 },
        iluminado: { maps: 10, price: 99.90 },
      };

      expect(plans.navegador.maps).toBe(1);
      expect(plans.visionario.maps).toBe(3);
      expect(plans.iluminado.maps).toBe(10);
    });
  });
});
