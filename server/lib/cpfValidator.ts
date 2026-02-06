/**
 * Validador de CPF para o servidor
 * Implementa validação oficial de CPF brasileiro
 */

/**
 * Remove caracteres especiais do CPF
 */
export function cleanCPF(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

/**
 * Valida se o CPF é válido usando o algoritmo oficial
 * @param cpf - CPF com ou sem formatação
 * @returns true se válido, false caso contrário
 */
export function isValidCPF(cpf: string): boolean {
  if (!cpf) return false;

  const cleanedCPF = cleanCPF(cpf);

  // Deve ter exatamente 11 dígitos
  if (cleanedCPF.length !== 11) return false;

  // Rejeita CPFs conhecidos como inválidos (todos iguais)
  if (/^(\d)\1{10}$/.test(cleanedCPF)) return false;

  // Calcula primeiro dígito verificador
  let sum = 0;
  let remainder: number;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanedCPF.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;

  if (remainder !== parseInt(cleanedCPF.substring(9, 10))) return false;

  // Calcula segundo dígito verificador
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanedCPF.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;

  if (remainder !== parseInt(cleanedCPF.substring(10, 11))) return false;

  return true;
}

/**
 * Formata CPF para o padrão XXX.XXX.XXX-XX
 */
export function formatCPF(cpf: string): string {
  const cleaned = cleanCPF(cpf);
  if (cleaned.length !== 11) return cpf;
  return `${cleaned.substring(0, 3)}.${cleaned.substring(3, 6)}.${cleaned.substring(6, 9)}-${cleaned.substring(9)}`;
}

/**
 * Valida telefone brasileiro
 * Aceita formatos: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;

  const cleaned = phone.replace(/\D/g, '');

  // Deve ter 10 ou 11 dígitos
  if (cleaned.length !== 10 && cleaned.length !== 11) return false;

  // Primeiro dígito não pode ser 0
  if (cleaned.charAt(0) === '0') return false;

  return true;
}

/**
 * Formata telefone para o padrão (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 10) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
  }

  if (cleaned.length === 11) {
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
  }

  return phone;
}

/**
 * Valida dados de pagamento para PagSeguro
 */
export interface PaymentValidation {
  isValid: boolean;
  errors: string[];
}

export function validatePaymentData(cpf: string, phone: string): PaymentValidation {
  const errors: string[] = [];

  if (!isValidCPF(cpf)) {
    errors.push('CPF inválido');
  }

  if (!isValidPhone(phone)) {
    errors.push('Telefone inválido');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
