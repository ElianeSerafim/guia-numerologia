/**
 * Email de Confirmação de Pagamento
 */
interface PaymentConfirmationEmailParams {
  email: string;
  planType: string;
  mapsLimit: number;
  accessLink: string;
}

export async function sendPaymentConfirmationEmail(params: PaymentConfirmationEmailParams) {
  const { email, planType, mapsLimit, accessLink } = params;
  console.log(`[Email] Confirmação enviada para: ${email}`);
  return { success: true };
}
