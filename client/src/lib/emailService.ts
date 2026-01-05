/**
 * Email Service - Bússola Numerológica 2026
 * 
 * Serviço para envio de e-mails de confirmação de compra e liberação de acesso.
 * Utiliza templates HTML elegantes e místicos.
 */

export interface EmailData {
  to: string;
  subject: string;
  html: string;
}

/**
 * Gera template HTML para confirmação de compra
 */
export function generatePurchaseConfirmationEmail(
  customerName: string,
  planName: string,
  planPrice: number,
  mapsLimit: number,
  transactionId: string
): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #f5f3ff 0%, #faf8ff 100%);
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(76, 29, 149, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #4C1D95 0%, #6B21A8 100%);
          padding: 40px 20px;
          text-align: center;
          color: white;
        }
        .header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .header p {
          font-size: 14px;
          opacity: 0.9;
        }
        .content {
          padding: 40px;
        }
        .greeting {
          font-size: 18px;
          color: #1e293b;
          margin-bottom: 24px;
          font-weight: 600;
        }
        .message {
          color: #475569;
          line-height: 1.6;
          margin-bottom: 32px;
          font-size: 14px;
        }
        .details-box {
          background: #f8fafc;
          border-left: 4px solid #4C1D95;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 32px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
        }
        .detail-row:last-child {
          margin-bottom: 0;
        }
        .detail-label {
          color: #64748b;
          font-weight: 500;
        }
        .detail-value {
          color: #1e293b;
          font-weight: 600;
        }
        .highlight {
          color: #4C1D95;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #4C1D95 0%, #6B21A8 100%);
          color: white;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 32px;
          transition: transform 0.2s;
        }
        .cta-button:hover {
          transform: translateY(-2px);
        }
        .footer {
          background: #f8fafc;
          padding: 24px 40px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          font-size: 12px;
          color: #64748b;
        }
        .footer-link {
          color: #4C1D95;
          text-decoration: none;
        }
        .transaction-id {
          background: #f1f5f9;
          padding: 8px 12px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: #475569;
          word-break: break-all;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🧿 Bússola Numerológica</h1>
          <p>Confirmação de Compra</p>
        </div>
        
        <div class="content">
          <div class="greeting">Olá, ${customerName}!</div>
          
          <div class="message">
            Sua compra foi recebida com sucesso! Agora você está pronto para explorar os mistérios da numerologia pitagórica e descobrir insights profundos sobre seu destino.
          </div>
          
          <div class="details-box">
            <div class="detail-row">
              <span class="detail-label">Plano Adquirido:</span>
              <span class="detail-value">${planName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Valor:</span>
              <span class="detail-value">R$ ${planPrice.toFixed(2)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Mapas Disponíveis:</span>
              <span class="detail-value">${mapsLimit === Infinity ? '∞ Ilimitados' : mapsLimit}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">ID da Transação:</span>
            </div>
            <div class="transaction-id">${transactionId}</div>
          </div>
          
          <div class="message">
            <strong>Próximos passos:</strong><br>
            1. Sua solicitação foi enviada para análise<br>
            2. Você receberá um e-mail de confirmação em até 24 horas<br>
            3. Após aprovação, seu acesso será liberado automaticamente<br>
            4. Comece a gerar seus mapas numerológicos!
          </div>
          
          <a href="https://bussola-numerologica.com" class="cta-button">Acessar Plataforma →</a>
          
          <div class="message">
            Se tiver dúvidas, entre em contato conosco pelo WhatsApp. Estamos aqui para ajudar!
          </div>
        </div>
        
        <div class="footer">
          <p>© 2026 Bússola Numerológica. Todos os direitos reservados.</p>
          <p>
            <a href="#" class="footer-link">Termos de Serviço</a> | 
            <a href="#" class="footer-link">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Gera template HTML para notificação de liberação de acesso
 */
export function generateAccessApprovedEmail(
  customerName: string,
  planName: string,
  mapsLimit: number
): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #f0fdf4 0%, #f8fdf4 100%);
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(34, 197, 94, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
          padding: 40px 20px;
          text-align: center;
          color: white;
        }
        .header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .header p {
          font-size: 14px;
          opacity: 0.9;
        }
        .content {
          padding: 40px;
        }
        .success-badge {
          text-align: center;
          margin-bottom: 24px;
        }
        .success-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }
        .greeting {
          font-size: 18px;
          color: #1e293b;
          margin-bottom: 24px;
          font-weight: 600;
          text-align: center;
        }
        .message {
          color: #475569;
          line-height: 1.6;
          margin-bottom: 32px;
          font-size: 14px;
        }
        .details-box {
          background: #f0fdf4;
          border-left: 4px solid #16a34a;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 32px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
        }
        .detail-row:last-child {
          margin-bottom: 0;
        }
        .detail-label {
          color: #64748b;
          font-weight: 500;
        }
        .detail-value {
          color: #16a34a;
          font-weight: 600;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
          color: white;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 32px;
          width: 100%;
          text-align: center;
          transition: transform 0.2s;
        }
        .cta-button:hover {
          transform: translateY(-2px);
        }
        .features {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 32px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;
          color: #475569;
        }
        .feature-item:last-child {
          margin-bottom: 0;
        }
        .feature-icon {
          color: #16a34a;
          font-weight: bold;
          margin-right: 12px;
          font-size: 16px;
        }
        .footer {
          background: #f8fafc;
          padding: 24px 40px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          font-size: 12px;
          color: #64748b;
        }
        .footer-link {
          color: #16a34a;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🧿 Bússola Numerológica</h1>
          <p>Acesso Liberado!</p>
        </div>
        
        <div class="content">
          <div class="success-badge">
            <div class="success-icon">✨</div>
            <div class="greeting">Bem-vindo, ${customerName}!</div>
          </div>
          
          <div class="message">
            Excelente notícia! Sua solicitação foi aprovada e seu acesso foi liberado com sucesso. Você agora pode começar a explorar os mistérios da numerologia pitagórica.
          </div>
          
          <div class="details-box">
            <div class="detail-row">
              <span class="detail-label">Plano Ativo:</span>
              <span class="detail-value">${planName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Mapas Disponíveis:</span>
              <span class="detail-value">${mapsLimit === Infinity ? '∞ Ilimitados' : mapsLimit}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status:</span>
              <span class="detail-value">✓ Ativo</span>
            </div>
          </div>
          
          <a href="https://bussola-numerologica.com" class="cta-button">Começar Agora →</a>
          
          <div class="features">
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>Cálculos automáticos do seu mapa numerológico</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>Interpretações detalhadas de cada número</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>Previsões anuais e ciclos de vida</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>Histórico completo de seus mapas</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>Exportação em PDF de alta qualidade</span>
            </div>
          </div>
          
          <div class="message">
            Qualquer dúvida ou dificuldade, entre em contato conosco pelo WhatsApp. Estamos aqui para ajudar sua jornada de autoconhecimento!
          </div>
        </div>
        
        <div class="footer">
          <p>© 2026 Bússola Numerológica. Todos os direitos reservados.</p>
          <p>
            <a href="#" class="footer-link">Termos de Serviço</a> | 
            <a href="#" class="footer-link">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Gera template HTML para notificação de rejeição
 */
export function generateAccessRejectedEmail(
  customerName: string,
  reason?: string
): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #fef2f2 0%, #fdf8f8 100%);
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(239, 68, 68, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
          padding: 40px 20px;
          text-align: center;
          color: white;
        }
        .header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .header p {
          font-size: 14px;
          opacity: 0.9;
        }
        .content {
          padding: 40px;
        }
        .greeting {
          font-size: 18px;
          color: #1e293b;
          margin-bottom: 24px;
          font-weight: 600;
        }
        .message {
          color: #475569;
          line-height: 1.6;
          margin-bottom: 32px;
          font-size: 14px;
        }
        .reason-box {
          background: #fef2f2;
          border-left: 4px solid #dc2626;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 32px;
        }
        .reason-label {
          color: #64748b;
          font-weight: 500;
          margin-bottom: 8px;
          font-size: 14px;
        }
        .reason-text {
          color: #475569;
          font-size: 14px;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
          color: white;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 32px;
          transition: transform 0.2s;
        }
        .cta-button:hover {
          transform: translateY(-2px);
        }
        .footer {
          background: #f8fafc;
          padding: 24px 40px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          font-size: 12px;
          color: #64748b;
        }
        .footer-link {
          color: #dc2626;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🧿 Bússola Numerológica</h1>
          <p>Solicitação Revisada</p>
        </div>
        
        <div class="content">
          <div class="greeting">Olá, ${customerName}!</div>
          
          <div class="message">
            Sua solicitação foi revisada e, infelizmente, não pudemos aprovar seu acesso neste momento.
          </div>
          
          ${reason ? `
            <div class="reason-box">
              <div class="reason-label">Motivo:</div>
              <div class="reason-text">${reason}</div>
            </div>
          ` : ''}
          
          <div class="message">
            Não desista! Entre em contato conosco pelo WhatsApp para esclarecer qualquer dúvida ou tentar novamente. Estamos aqui para ajudar!
          </div>
          
          <a href="https://wa.me/5511999999999" class="cta-button">Fale Conosco no WhatsApp →</a>
        </div>
        
        <div class="footer">
          <p>© 2026 Bússola Numerológica. Todos os direitos reservados.</p>
          <p>
            <a href="#" class="footer-link">Termos de Serviço</a> | 
            <a href="#" class="footer-link">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Simula envio de e-mail (em produção, usar serviço real como SendGrid, Mailgun, etc)
 */
export async function sendEmail(emailData: EmailData): Promise<boolean> {
  try {
    // Em produção, integrar com serviço de e-mail real
    // Por enquanto, simular sucesso e logar no console
    console.log('📧 E-mail enviado:', {
      to: emailData.to,
      subject: emailData.subject,
      timestamp: new Date().toISOString()
    });

    // Mostrar alerta para recuperacao de senha em ambiente de teste
    if (emailData.subject.includes('Recuperacao')) {
      console.log('AMBIENTE DE TESTE - Senha padrao: Bdigital@2025');
    }

    // Simular delay de envio
    await new Promise(resolve => setTimeout(resolve, 500));

    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail:', error);
    return false;
  }
}

/**
 * Envia e-mail de confirmação de compra
 */
export async function sendPurchaseConfirmation(
  email: string,
  customerName: string,
  planName: string,
  planPrice: number,
  mapsLimit: number,
  transactionId: string
): Promise<boolean> {
  const html = generatePurchaseConfirmationEmail(
    customerName,
    planName,
    planPrice,
    mapsLimit,
    transactionId
  );

  return sendEmail({
    to: email,
    subject: `✓ Compra Confirmada - Bússola Numerológica 2026`,
    html
  });
}

/**
 * Envia e-mail de liberação de acesso
 */
export async function sendAccessApprovedEmail(
  email: string,
  customerName: string,
  planName: string,
  mapsLimit: number
): Promise<boolean> {
  const html = generateAccessApprovedEmail(customerName, planName, mapsLimit);

  return sendEmail({
    to: email,
    subject: `✨ Seu Acesso Foi Liberado! - Bússola Numerológica 2026`,
    html
  });
}

/**
 * Envia e-mail de rejeição
 */
export async function sendAccessRejectedEmail(
  email: string,
  customerName: string,
  reason?: string
): Promise<boolean> {
  const html = generateAccessRejectedEmail(customerName, reason);

  return sendEmail({
    to: email,
    subject: `Solicitação Revisada - Bússola Numerológica 2026`,
    html
  });
}


/**
 * Gera template HTML para recuperação de senha
 */
export function generatePasswordResetEmail(
  customerName: string,
  resetLink: string
): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%);
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(217, 119, 6, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
          padding: 40px 20px;
          text-align: center;
          color: white;
        }
        .header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .header p {
          font-size: 14px;
          opacity: 0.9;
        }
        .content {
          padding: 40px;
        }
        .greeting {
          font-size: 18px;
          color: #1e293b;
          margin-bottom: 24px;
          font-weight: 600;
        }
        .message {
          color: #475569;
          line-height: 1.6;
          margin-bottom: 32px;
          font-size: 14px;
        }
        .warning-box {
          background: #fef3c7;
          border-left: 4px solid #d97706;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 32px;
        }
        .warning-text {
          color: #92400e;
          font-size: 13px;
          line-height: 1.5;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
          color: white;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 32px;
          width: 100%;
          text-align: center;
          transition: transform 0.2s;
        }
        .cta-button:hover {
          transform: translateY(-2px);
        }
        .footer {
          background: #f8fafc;
          padding: 24px 40px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          font-size: 12px;
          color: #64748b;
        }
        .footer-link {
          color: #d97706;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Recuperação de Senha</h1>
          <p>Bússola Numerológica 2026</p>
        </div>
        
        <div class="content">
          <div class="greeting">Olá, ${customerName}!</div>
          
          <div class="message">
            Recebemos uma solicitação para redefinir a senha da sua conta. Clique no botão abaixo para criar uma nova senha.
          </div>
          
          <div class="warning-box">
            <div class="warning-text">
              ⚠️ <strong>Segurança:</strong> Se você não solicitou esta recuperação de senha, ignore este e-mail. Sua conta permanecerá segura.
            </div>
          </div>
          
          <a href="${resetLink}" class="cta-button">Redefinir Minha Senha →</a>
          
          <div class="message">
            <strong>Ou copie este link:</strong><br>
            <code style="background: #f1f5f9; padding: 8px 12px; border-radius: 4px; word-break: break-all; font-size: 12px;">${resetLink}</code>
          </div>
          
          <div class="message">
            Este link expira em 24 horas. Se precisar de ajuda, entre em contato conosco pelo WhatsApp.
          </div>
        </div>
        
        <div class="footer">
          <p>© 2026 Bússola Numerológica. Todos os direitos reservados.</p>
          <p>
            <a href="#" class="footer-link">Termos de Serviço</a> | 
            <a href="#" class="footer-link">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Envia e-mail de recuperação de senha
 */
export async function sendPasswordResetEmail(
  email: string
): Promise<boolean> {
  // Gerar link de recuperação (em produção, seria um token seguro)
  const resetToken = Math.random().toString(36).substring(2, 15);
  const resetLink = `https://bussola-numerologica.com/reset-password?token=${resetToken}`;
  
  // Extrair nome do e-mail (antes do @)
  const customerName = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
  
  const html = generatePasswordResetEmail(customerName, resetLink);

  return sendEmail({
    to: email,
    subject: `🔐 Recuperação de Senha - Bússola Numerológica 2026`,
    html
  });
}
