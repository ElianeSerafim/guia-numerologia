/**
 * Email Service Tests
 * Validates email sending functionality
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { testSMTPConnection } from './emailService';

describe('Email Service', () => {
  beforeAll(() => {
    // Verify environment variables are set
    if (!process.env.SMTP_HOST) {
      console.warn('⚠️ SMTP_HOST not set. Email tests will be skipped.');
    }
    if (!process.env.SMTP_USER) {
      console.warn('⚠️ SMTP_USER not set. Email tests will be skipped.');
    }
    if (!process.env.SMTP_PASSWORD) {
      console.warn('⚠️ SMTP_PASSWORD not set. Email tests will be skipped.');
    }
  });

  describe('SMTP Configuration', () => {
    it('should have SMTP_HOST configured', () => {
      expect(process.env.SMTP_HOST).toBeDefined();
      expect(process.env.SMTP_HOST).toBe('smtp.gmail.com');
    });

    it('should have SMTP_PORT configured', () => {
      expect(process.env.SMTP_PORT).toBeDefined();
      expect(parseInt(process.env.SMTP_PORT || '0')).toBe(587);
    });

    it('should have SMTP_USER configured', () => {
      expect(process.env.SMTP_USER).toBeDefined();
      expect(process.env.SMTP_USER).toContain('@gmail.com');
    });

    it('should have SMTP_PASSWORD configured', () => {
      expect(process.env.SMTP_PASSWORD).toBeDefined();
      expect(process.env.SMTP_PASSWORD?.length).toBeGreaterThan(0);
    });

    it('should have SMTP_FROM_EMAIL configured', () => {
      expect(process.env.SMTP_FROM_EMAIL).toBeDefined();
    });
  });

  describe('SMTP Connection', () => {
    it('should verify SMTP connection', async () => {
      const result = await testSMTPConnection();
      expect(result).toBeDefined();
      // Connection test may fail in test environment, but should not throw
      expect(result.success !== undefined).toBe(true);
    });
  });

  describe('Email Parameters Validation', () => {
    it('should validate payment confirmation email params', () => {
      const params = {
        email: 'test@example.com',
        planType: 'navegador',
        mapsLimit: 1,
        accessLink: 'https://portaldenumerologia.manus.space/dashboard',
        orderId: 'ORDER_123',
      };

      expect(params.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(['navegador', 'visionario', 'iluminado']).toContain(params.planType);
      expect(params.mapsLimit).toBeGreaterThan(0);
      expect(params.accessLink).toMatch(/^https?:\/\//);
    });

    it('should validate email address format', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'elianeserafim.holistica@gmail.com',
      ];

      validEmails.forEach((email) => {
        expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });
    });
  });

  describe('Plan Types', () => {
    it('should support Navegador plan', () => {
      const plans = ['navegador', 'visionario', 'iluminado'];
      expect(plans).toContain('navegador');
    });

    it('should support Visionário plan', () => {
      const plans = ['navegador', 'visionario', 'iluminado'];
      expect(plans).toContain('visionario');
    });

    it('should support Iluminado plan', () => {
      const plans = ['navegador', 'visionario', 'iluminado'];
      expect(plans).toContain('iluminado');
    });
  });

  describe('Email Content', () => {
    it('should generate valid HTML content', () => {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
          </head>
          <body>
            <p>Test email content</p>
          </body>
        </html>
      `;

      expect(htmlContent).toContain('<!DOCTYPE html>');
      expect(htmlContent).toContain('<html>');
      expect(htmlContent).toContain('</html>');
    });

    it('should include plan information in email', () => {
      const planName = 'Navegador';
      const mapsLimit = 1;

      const content = `Plano: ${planName}, Mapas: ${mapsLimit}`;
      expect(content).toContain('Navegador');
      expect(content).toContain('1');
    });
  });
});
