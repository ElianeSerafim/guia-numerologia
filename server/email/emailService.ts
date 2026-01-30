/**
 * Email Service com Nodemailer
 * Envia emails de confirmação de pagamento e notificações
 */

import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SMTP_FROM_EMAIL = process.env.SMTP_FROM_EMAIL || SMTP_USER;

// Criar transporter Nodemailer
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    if (!SMTP_USER || !SMTP_PASSWORD) {
      console.warn('[Email] SMTP credentials not configured. Email sending disabled.');
      return null;
    }

    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  return transporter;
}

export interface PaymentConfirmationEmailParams {
  email: string;
  planType: string;
  mapsLimit: number;
  accessLink: string;
  orderId?: string;
}

/**
 * Enviar email de confirmação de pagamento
 */
export async function sendPaymentConfirmationEmail(
  params: PaymentConfirmationEmailParams
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const { email, planType, mapsLimit, accessLink, orderId } = params;

  const transporter = getTransporter();

  // Se não tiver transporter configurado, apenas log
  if (!transporter) {
    console.log(`[Email] Confirmação enviada para: ${email} (modo simulado)`);
    return { success: true };
  }

  try {
    const planNames: Record<string, string> = {
      navegador: 'Navegador',
      visionario: 'Visionário',
      iluminado: 'Iluminado',
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
            .header { background: linear-gradient(135deg, #00FFFF 0%, #0099FF 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .plan-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00FFFF; }
            .plan-info h2 { margin-top: 0; color: #0099FF; }
            .plan-info p { margin: 10px 0; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #00FFFF 0%, #0099FF 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #999; }
            .highlight { color: #00FFFF; font-weight: bold; }
            .order-id { background: #f0f0f0; padding: 10px; border-radius: 4px; margin: 10px 0; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Pagamento Confirmado!</h1>
            </div>
            <div class="content">
              <p>Olá,</p>
              <p>Seu pagamento foi processado com sucesso! Agora você tem acesso completo ao plano <span class="highlight">${planName}</span>.</p>
              
              <div class="plan-info">
                <h2>Detalhes do Seu Plano</h2>
                <p><strong>Plano:</strong> ${planName}</p>
                <p><strong>Mapas Disponíveis:</strong> ${mapsLimit}</p>
                ${orderId ? `<p><strong>ID do Pedido:</strong></p><div class="order-id">${orderId}</div>` : ''}
              </div>

              <p>Você pode acessar o seu dashboard e começar a gerar seus mapas numerológicos agora:</p>
              
              <center>
                <a href="${accessLink}" class="cta-button">Acessar Dashboard →</a>
              </center>

              <div class="plan-info">
                <h2>O Que Você Pode Fazer Agora?</h2>
                <ul>
                  <li>✓ Gerar até <strong>${mapsLimit}</strong> mapa${mapsLimit !== 1 ? 's' : ''} numerológico${mapsLimit !== 1 ? 's' : ''}</li>
                  <li>✓ Acessar interpretações detalhadas</li>
                  <li>✓ Visualizar previsões personalizadas</li>
                  <li>✓ Salvar e compartilhar seus mapas</li>
                </ul>
              </div>

              <p>Se você tiver qualquer dúvida, não hesite em nos contatar.</p>
              
              <p>Abraços,<br><strong>Equipe Bússola Numerológica</strong></p>

              <div class="footer">
                <p>Este é um email automático. Por favor, não responda.</p>
                <p>© 2026 Bússola Numerológica. Todos os direitos reservados.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
Pagamento Confirmado!

Olá,

Seu pagamento foi processado com sucesso! Agora você tem acesso completo ao plano ${planName}.

Detalhes do Seu Plano:
- Plano: ${planName}
- Mapas Disponíveis: ${mapsLimit}
${orderId ? `- ID do Pedido: ${orderId}` : ''}

Acesse seu dashboard aqui: ${accessLink}

O Que Você Pode Fazer Agora?
✓ Gerar até ${mapsLimit} mapa(s) numerológico(s)
✓ Acessar interpretações detalhadas
✓ Visualizar previsões personalizadas
✓ Salvar e compartilhar seus mapas

Se você tiver qualquer dúvida, não hesite em nos contatar.

Abraços,
Equipe Bússola Numerológica

---
Este é um email automático. Por favor, não responda.
© 2026 Bússola Numerológica. Todos os direitos reservados.
    `;

    const info = await transporter.sendMail({
      from: SMTP_FROM_EMAIL,
      to: email,
      subject: `✓ Pagamento Confirmado - Plano ${planName}`,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Email] Confirmação enviada com sucesso para: ${email} (ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Email Error]', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao enviar email',
    };
  }
}

/**
 * Enviar email de falha de pagamento
 */
export async function sendPaymentFailureEmail(
  email: string,
  planType: string,
  reason?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const transporter = getTransporter();

  if (!transporter) {
    console.log(`[Email] Notificação de falha enviada para: ${email} (modo simulado)`);
    return { success: true };
  }

  try {
    const planNames: Record<string, string> = {
      navegador: 'Navegador',
      visionario: 'Visionário',
      iluminado: 'Iluminado',
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
            .header { background: linear-gradient(135deg, #FF6B6B 0%, #FF4444 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .alert { background: #FFE5E5; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF6B6B; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #00FFFF 0%, #0099FF 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⚠️ Pagamento Não Confirmado</h1>
            </div>
            <div class="content">
              <p>Olá,</p>
              <p>Infelizmente, seu pagamento para o plano <strong>${planName}</strong> não foi processado com sucesso.</p>
              
              <div class="alert">
                <p><strong>Motivo:</strong> ${reason || 'Erro na processamento do pagamento'}</p>
              </div>

              <p>Por favor, tente novamente ou entre em contato conosco para suporte.</p>
              
              <center>
                <a href="https://portaldenumerologia.manus.space/pricing" class="cta-button">Tentar Novamente →</a>
              </center>

              <p>Se você tiver qualquer dúvida, não hesite em nos contatar.</p>
              
              <p>Abraços,<br><strong>Equipe Bússola Numerológica</strong></p>

              <div class="footer">
                <p>Este é um email automático. Por favor, não responda.</p>
                <p>© 2026 Bússola Numerológica. Todos os direitos reservados.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: SMTP_FROM_EMAIL,
      to: email,
      subject: `⚠️ Pagamento Não Confirmado - Plano ${planName}`,
      html: htmlContent,
    });

    console.log(`[Email] Notificação de falha enviada para: ${email} (ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Email Error]', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao enviar email',
    };
  }
}

/**
 * Testar conexão SMTP
 */
export async function testSMTPConnection(): Promise<{ success: boolean; error?: string }> {
  const transporter = getTransporter();

  if (!transporter) {
    return {
      success: false,
      error: 'SMTP credentials not configured',
    };
  }

  try {
    await transporter.verify();
    console.log('[Email] SMTP connection verified successfully');
    return { success: true };
  } catch (error) {
    console.error('[Email] SMTP connection failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'SMTP connection failed',
    };
  }
}

/**
 * Enviar email de reembolso
 */
export interface RefundEmailParams {
  email: string;
  orderId: string;
  amount: string;
  plan: string;
  reason?: string;
}

export async function sendRefundEmail(email: string, params: RefundEmailParams): Promise<boolean> {
  const transporter = getTransporter();

  if (!transporter) {
    console.log(`[Email] Refund email sent to: ${email} (simulated mode)`);
    return true;
  }

  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Reembolso Processado</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
            Olá,
          </p>
          
          <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
            Seu reembolso foi processado com sucesso. Aqui estão os detalhes:
          </p>
          
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
              <strong>ID do Pedido:</strong> ${params.orderId}
            </p>
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
              <strong>Plano:</strong> ${params.plan}
            </p>
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
              <strong>Valor Reembolsado:</strong> R$ ${params.amount}
            </p>
          </div>
          
          <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
            O reembolso será creditado em sua conta em até 5-7 dias úteis.
          </p>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            © 2026 Bússola Numerológica. Todos os direitos reservados.
          </p>
        </div>
      </div>
    `;
    
    const info = await transporter.sendMail({
      from: SMTP_FROM_EMAIL,
      to: email,
      subject: `Reembolso Processado - Pedido ${params.orderId}`,
      html: htmlContent,
    });
    
    console.log(`[Email] Refund email sent to ${email}:`, info.messageId);
    return true;
  } catch (error) {
    console.error(`[Email] Failed to send refund email to ${email}:`, error);
    return false;
  }
}


/**
 * Enviar email de redefinição de senha
 */
export async function sendPasswordResetEmail(
  email: string,
  name: string,
  resetLink: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const transporter = getTransporter();

  if (!transporter) {
    console.log(`[Email] Password reset email sent to: ${email} (simulated mode)`);
    return { success: true };
  }

  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00FFFF 0%, #0099FF 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .alert { background: #FFF3CD; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FFC107; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #00FFFF 0%, #0099FF 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Redefinição de Senha</h1>
            </div>
            <div class="content">
              <p>Olá ${name},</p>
              <p>Recebemos uma solicitação para redefinir a senha da sua conta na <strong>Bússola Numerológica</strong>.</p>
              
              <div class="alert">
                <p><strong>⚠️ Atenção:</strong> Este link expira em 1 hora por questões de segurança.</p>
              </div>

              <p>Clique no botão abaixo para criar uma nova senha:</p>
              
              <center>
                <a href="${resetLink}" class="cta-button">Redefinir Minha Senha →</a>
              </center>

              <p style="font-size: 12px; color: #666; margin-top: 20px;">
                Ou copie e cole este link no seu navegador:<br>
                <a href="${resetLink}" style="color: #0099FF; word-break: break-all;">${resetLink}</a>
              </p>

              <p style="margin-top: 30px;">Se você não solicitou esta redefinição de senha, ignore este email. Sua senha permanecerá inalterada.</p>
              
              <p>Abraços,<br><strong>Equipe Bússola Numerológica</strong></p>

              <div class="footer">
                <p>Este é um email automático. Por favor, não responda.</p>
                <p>© 2026 Bússola Numerológica. Todos os direitos reservados.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
Redefinição de Senha

Olá ${name},

Recebemos uma solicitação para redefinir a senha da sua conta na Bússola Numerológica.

⚠️ Atenção: Este link expira em 1 hora por questões de segurança.

Clique no link abaixo para criar uma nova senha:
${resetLink}

Se você não solicitou esta redefinição de senha, ignore este email. Sua senha permanecerá inalterada.

Abraços,
Equipe Bússola Numerológica

---
Este é um email automático. Por favor, não responda.
© 2026 Bússola Numerológica. Todos os direitos reservados.
    `;

    const info = await transporter.sendMail({
      from: SMTP_FROM_EMAIL,
      to: email,
      subject: '🔐 Redefinição de Senha - Bússola Numerológica',
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Email] Password reset email sent to: ${email} (ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Email Error]', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao enviar email',
    };
  }
}
