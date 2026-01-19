/**
 * Infinetepay Integration
 * Handles payment processing via Infinetepay DeepLink
 */

export interface InfinetePayConfig {
  handle: string; // Merchant handle (e.g., "eliane-serafim-dos-908")
  docNumber?: string; // CPF without formatting (optional)
}

export interface PaymentRequest {
  amount: number; // Amount in cents (e.g., 2990 for R$29.90)
  paymentMethod: "credit" | "debit"; // Payment method
  installments: number; // Number of installments (1-12)
  orderId: string; // Unique order ID from your system
  resultUrl: string; // DeepLink to return to after payment
  appClientReferrer: string; // Your app referrer
  forceDeeplink?: boolean; // iOS specific
}

export interface PaymentResult {
  orderId: string;
  nsu: string; // Transaction identifier (UUID)
  aut: string; // Authorization code
  cardBrand: string; // Card network (mastercard, visa, elo, etc)
  userId: string;
  accessId: string;
  handle: string;
  merchantDocument: string;
  warning?: string; // Error message if transaction failed
}

/**
 * Generate Infinetepay DeepLink for payment
 * @param config - Infinetepay configuration
 * @param payment - Payment request details
 * @returns DeepLink URL to open Infinetepay app
 */
export function generateInfinetePayDeepLink(
  config: InfinetePayConfig,
  payment: PaymentRequest
): string {
  // Validate minimum amount (100 = R$1.00)
  if (payment.amount < 100) {
    throw new Error("Minimum amount is 100 (R$1.00)");
  }

  // Validate installments
  if (payment.installments < 1 || payment.installments > 12) {
    throw new Error("Installments must be between 1 and 12");
  }

  // Validate each installment is at least R$1.00
  const installmentAmount = payment.amount / payment.installments;
  if (installmentAmount < 100) {
    throw new Error("Each installment must be at least R$1.00");
  }

  // Build query parameters
  const params = new URLSearchParams({
    amount: payment.amount.toString(),
    payment_method: payment.paymentMethod,
    installments: payment.installments.toString(),
    order_id: payment.orderId,
    result_url: encodeURIComponent(payment.resultUrl),
    app_client_referrer: payment.appClientReferrer,
    handle: config.handle,
  });

  if (config.docNumber) {
    params.append("doc_number", config.docNumber);
  }

  if (payment.forceDeeplink) {
    params.append("af_force_deeplink", "true");
  }

  // Return DeepLink
  return `infinitepaydash://infinitetap-app?${params.toString()}`;
}

/**
 * Plans configuration
 */
export const PLANS = {
  navegador: {
    name: "Navegador",
    price: 2990, // R$29.90 in cents
    mapsLimit: 1,
  },
  visionario: {
    name: "Visionário",
    price: 5990, // R$59.90 in cents
    mapsLimit: 3,
  },
  iluminado: {
    name: "Iluminado",
    price: 20000, // R$200.00 in cents
    mapsLimit: 10,
  },
};

/**
 * Validate payment result from Infinetepay callback
 * @param result - Payment result from Infinetepay
 * @returns true if payment was successful
 */
export function validatePaymentResult(result: PaymentResult): boolean {
  // If warning exists, payment failed
  if (result.warning) {
    return false;
  }

  // Check required fields
  return !!(
    result.orderId &&
    result.nsu &&
    result.aut &&
    result.cardBrand &&
    result.handle
  );
}
