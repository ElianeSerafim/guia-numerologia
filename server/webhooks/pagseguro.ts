/**
 * PagSeguro Webhook Router
 * Receives and processes payment notifications from PagSeguro
 */

import express, { Router, Request, Response } from 'express';
import { handlePagSeguroWebhook, PagSeguroWebhookPayload, verifyWebhookSignature } from './pagseguro-handler';

const router = Router();

/**
 * POST /api/webhooks/pagseguro
 * Receives webhook notifications from PagSeguro
 * Handles transaction status changes: PAID, PENDING, FAILED, REFUNDED
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const payload = req.body as PagSeguroWebhookPayload;

    console.log('[PagSeguro Webhook] Received notification:', {
      id: payload.id,
      reference: payload.reference,
      status: payload.status,
      grossAmount: payload.grossAmount,
    });

    // Verify webhook signature (optional, based on PagSeguro requirements)
    // const signature = req.headers['x-signature'] as string;
    // const isValid = verifyWebhookSignature(JSON.stringify(payload), signature, process.env.PAGSEGURO_WEBHOOK_SECRET || '');
    // if (!isValid) {
    //   console.warn('[PagSeguro Webhook] Invalid signature');
    //   return res.status(401).json({ error: 'Invalid signature' });
    // }

    // Process webhook
    await handlePagSeguroWebhook(payload);

    // Return success response
    res.status(200).json({ 
      success: true,
      message: 'Webhook processed successfully',
      orderId: payload.reference,
    });
  } catch (error) {
    console.error('[PagSeguro Webhook] Error processing webhook:', error);
    
    // Return error response but with 200 status to prevent PagSeguro retries
    res.status(200).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/webhooks/pagseguro/health
 * Health check endpoint for webhook configuration
 */
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'PagSeguro webhook endpoint is operational',
    timestamp: new Date().toISOString(),
  });
});

export default router;
