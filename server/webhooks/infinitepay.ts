import { Router } from 'express';
import { createSubscription } from '../db';
import { sendPaymentConfirmationEmail } from '../email/paymentConfirmation';

const router = Router();

/**
 * Webhook endpoint para receber confirmação de pagamento do Infinetepay
 * POST /api/webhooks/infinitepay
 */
router.post('/infinitepay', async (req, res) => {
  try {
    const { 
      id, 
      status, 
      amount, 
      customer_email, 
      customer_id,
      plan_type,
      transaction_id,
      nsu,
      aut,
      card_brand,
      payment_method,
      installments
    } = req.body;

    // Validar estrutura mínima
    if (!id || !status || !customer_email || !customer_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verificar se é pagamento aprovado
    if (status !== 'approved') {
      console.log(`[Infinetepay] Pagamento não aprovado: ${id}`);
      return res.status(200).json({ received: true });
    }

    // Mapear plan_type para mapsLimit e planPrice
    const plansMap: Record<string, { mapsLimit: number; price: string }> = {
      'navegador': { mapsLimit: 1, price: '29.90' },
      'visionario': { mapsLimit: 3, price: '59.90' },
      'iluminado': { mapsLimit: 10, price: '200.00' },
    };

    const planInfo = plansMap[plan_type?.toLowerCase()] || plansMap['navegador'];

    // Criar subscription no banco de dados
    const subscription = await createSubscription({
      customerId: parseInt(customer_id),
      email: customer_email,
      plan: plan_type || 'navegador',
      planPrice: planInfo.price,
      mapsLimit: planInfo.mapsLimit,
      mapsGenerated: 0,
      paymentStatus: 'completed',
      infinetepayOrderId: id,
      infinetepayNsu: nsu,
      infinetepayAut: aut,
      cardBrand: card_brand,
      paymentMethod: payment_method || 'credit',
      installments: installments || 1,
      activatedAt: new Date(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 ano
    });

    if (!subscription) {
      throw new Error('Failed to create subscription');
    }

    console.log(`[Infinetepay] Subscription criada: ${subscription.id}`);

    // Enviar email de confirmação
    await sendPaymentConfirmationEmail({
      email: customer_email,
      planType: plan_type || 'navegador',
      mapsLimit: planInfo.mapsLimit,
      accessLink: `${process.env.FRONTEND_URL}/calculator?subscription=${subscription.id}`,
    });

    console.log(`[Infinitepay] Email enviado para: ${customer_email}`);

    // Responder ao Infinetepay
    res.status(200).json({ 
      received: true, 
      subscription_id: subscription.id 
    });

  } catch (error) {
    console.error('[Infinetepay Webhook Error]', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
