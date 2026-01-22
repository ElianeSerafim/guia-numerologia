import axios from 'axios';

/**
 * Email de Confirmação de Pagamento
 */
interface PaymentConfirmationEmailParams {
  email: string;
  planType: string;
  mapsLimit: number;
  accessLink: string;
}

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@bussola-numerologica.com';

export async function sendPaymentConfirmationEmail(params: PaymentConfirmationEmailParams) {
  const { email, planType, mapsLimit, accessLink } = params;

  // Se não tiver SendGrid configurado, apenas log
  if (!SENDGRID_API_KEY) {
    console.log(`[Email] Confirmação enviada para: ${email} (modo simulado)`);
    return { success: true, simulated: true };
  }

  try {
    const planNames: Record<string, string> = {
      'navegador': 'Navegador',
      'visionario': 'Visionário',
      'iluminado': 'Iluminado',
    };

    const planName = planNames[planType.toLowerCase()] || planType;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .plan-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7C3AED; }
            .plan-info h2 { margin-top: 0; color: #4C1D95; }
            .plan-info p { margin: 10px 0; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #999; }
            .highlight { color: #7C3AED; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔮 Pagamento Confirmado!</h1>
            </div>
            <div class="content">
              <p>Olá,</p>
              <p>Seu pagamento foi processado com sucesso! Você agora tem acesso ao plano <span class="highlight">${planName}</span>.</p>
              
              <div class="plan-info">
                <h2>Detalhes do Seu Plano</h2>
                <p><strong>Plano:</strong> ${planName}</p>
                <p><strong>Mapas Disponíveis:</strong> ${mapsLimit}</p>
                <p><strong>Validade:</strong> 1 ano</p>
              </div>

              <p>Clique no botão abaixo para começar a gerar seus mapas numerológicos:</p>
              
              <center>
                <a href="${accessLink}" class="cta-button">Acessar Calculadora</a>
              </center>

              <p>Ou copie e cole este link no seu navegador:</p>
              <p style="word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 4px; font-size: 12px;">${accessLink}</p>

              <p>Se tiver qualquer dúvida, entre em contato conosco.</p>
              <p>Namastê,<br>Equipe Portal Numerologia</p>
            </div>
            <div class="footer">
              <p>Este é um email automático. Por favor, não responda.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const response = await axios.post(
      'https://api.sendgrid.com/v3/mail/send',
      {
        personalizations: [
          {
            to: [{ email }],
            subject: `Pagamento Confirmado - Plano ${planName}`,
          },
        ],
        from: { email: SENDGRID_FROM_EMAIL },
        content: [
          {
            type: 'text/html',
            value: htmlContent,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`[Email] Confirmação enviada com sucesso para: ${email}`);
    return { success: true, messageId: response.headers['x-message-id'] };
  } catch (error) {
    console.error('[Email Error]', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
