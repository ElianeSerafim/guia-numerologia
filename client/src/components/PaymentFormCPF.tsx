import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface PaymentFormCPFProps {
  onSubmit: (cpf: string, phone: string) => void;
  isLoading?: boolean;
}

export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

  return true;
};

export const formatCPF = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '').slice(0, 11);
  return cleanValue
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{2})$/, '$1-$2');
};

export const formatPhone = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '').slice(0, 11);
  return cleanValue
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
};

export default function PaymentFormCPF({ onSubmit, isLoading = false }: PaymentFormCPFProps) {
  const [cpf, setCPF] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ cpf?: string; phone?: string }>({});
  const [touched, setTouched] = useState<{ cpf?: boolean; phone?: boolean }>({});

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCPF(formatted);

    if (touched.cpf && formatted.length > 0) {
      if (formatted.replace(/\D/g, '').length < 11) {
        setErrors(prev => ({ ...prev, cpf: 'CPF incompleto' }));
      } else if (!validateCPF(formatted)) {
        setErrors(prev => ({ ...prev, cpf: 'CPF inválido' }));
      } else {
        setErrors(prev => ({ ...prev, cpf: undefined }));
      }
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);

    if (touched.phone && formatted.length > 0) {
      const cleanPhone = formatted.replace(/\D/g, '');
      if (cleanPhone.length < 11) {
        setErrors(prev => ({ ...prev, phone: 'Telefone incompleto' }));
      } else {
        setErrors(prev => ({ ...prev, phone: undefined }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanCPF = cpf.replace(/\D/g, '');
    if (cleanCPF.length !== 11) {
      setErrors(prev => ({ ...prev, cpf: 'CPF incompleto' }));
      return;
    }
    if (!validateCPF(cpf)) {
      setErrors(prev => ({ ...prev, cpf: 'CPF inválido' }));
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 11) {
      setErrors(prev => ({ ...prev, phone: 'Telefone incompleto' }));
      return;
    }

    setErrors({});
    onSubmit(cpf, phone);
  };

  const isCPFValid = cpf.replace(/\D/g, '').length === 11 && validateCPF(cpf);
  const isPhoneValid = phone.replace(/\D/g, '').length === 11;
  const isFormValid = isCPFValid && isPhoneValid;

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-800 rounded-lg border border-slate-700 shadow-lg">
      <h3 className="text-xl font-bold text-[#19E6FF] mb-2">Dados para Pagamento</h3>
      <p className="text-sm text-slate-400 mb-6">PagSeguro requer CPF e telefone</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cpf" className="block text-sm font-medium text-[#C8A2E0] mb-2">
            CPF *
          </label>
          <div className="relative">
            <input
              id="cpf"
              type="text"
              value={cpf}
              onChange={handleCPFChange}
              onBlur={() => setTouched(prev => ({ ...prev, cpf: true }))}
              placeholder="000.000.000-00"
              className={`w-full px-4 py-2 border rounded-lg font-mono text-sm bg-slate-700 text-white placeholder-slate-500 transition-colors ${
                errors.cpf && touched.cpf
                  ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500'
                  : isCPFValid
                    ? 'border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500'
                    : 'border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400'
              }`}
              disabled={isLoading}
            />
            {isCPFValid && <CheckCircle className="absolute right-3 top-2.5 w-5 h-5 text-green-500" />}
            {errors.cpf && touched.cpf && <AlertCircle className="absolute right-3 top-2.5 w-5 h-5 text-red-500" />}
          </div>
          {errors.cpf && touched.cpf && (
            <p className="mt-1 text-sm text-red-400">{errors.cpf}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#C8A2E0] mb-2">
            Telefone *
          </label>
          <div className="relative">
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
              placeholder="(00) 00000-0000"
              className={`w-full px-4 py-2 border rounded-lg font-mono text-sm bg-slate-700 text-white placeholder-slate-500 transition-colors ${
                errors.phone && touched.phone
                  ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500'
                  : isPhoneValid
                    ? 'border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500'
                    : 'border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400'
              }`}
              disabled={isLoading}
            />
            {isPhoneValid && <CheckCircle className="absolute right-3 top-2.5 w-5 h-5 text-green-500" />}
            {errors.phone && touched.phone && <AlertCircle className="absolute right-3 top-2.5 w-5 h-5 text-red-500" />}
          </div>
          {errors.phone && touched.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
            isFormValid && !isLoading
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg'
              : 'bg-slate-600 cursor-not-allowed opacity-50'
          }`}
        >
          {isLoading ? 'Processando...' : 'Confirmar Dados'}
        </button>
      </form>
    </div>
  );
}
