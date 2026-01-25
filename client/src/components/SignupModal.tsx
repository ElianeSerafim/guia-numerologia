import { useState } from 'react';
import { X, Mail, Calendar, Loader2, AlertCircle, Check } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string, birthDate: string) => void;
}

/**
 * Modal de Cadastro - Estilo Astrolink
 * Coleta E-mail e Data de Nascimento
 * Valida e salva dados do cliente
 */
export default function SignupModal({ isOpen, onClose, onSuccess }: SignupModalProps) {
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const createCustomer = trpc.customer.createCustomer.useMutation();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateBirthDate = (date: string) => {
    // Formato: DD/MM/YYYY
    const re = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
    if (!re.test(date)) return false;

    const [day, month, year] = date.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    // Validar se data é válida e não é no futuro
    if (birthDate.getTime() > today.getTime()) return false;
    if (birthDate.getFullYear() < 1900) return false;

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validações
      if (!email.trim()) {
        throw new Error('Por favor, preencha seu e-mail');
      }

      if (!validateEmail(email)) {
        throw new Error('E-mail inválido');
      }

      if (!birthDate.trim()) {
        throw new Error('Por favor, preencha sua data de nascimento');
      }

      if (!validateBirthDate(birthDate)) {
        throw new Error('Data de nascimento inválida (use DD/MM/YYYY)');
      }

      if (!acceptTerms) {
        throw new Error('Você precisa aceitar os termos de uso');
      }

      // Chamar tRPC para criar cliente
      await createCustomer.mutateAsync({
        email: email.trim(),
        birthDate: birthDate.trim()
      });

      setSuccess(true);

      // Aguardar 1 segundo e fechar modal
      setTimeout(() => {
        onSuccess(email.trim(), birthDate.trim());
        setEmail('');
        setBirthDate('');
        setAcceptTerms(false);
        setSuccess(false);
        onClose();
      }, 1000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao cadastrar';
      setError(message);
      console.error('Erro ao cadastrar:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-md w-full shadow-2xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Faça seu mapa astral gratuitamente</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-[#C8A2E0] text-sm">
            Descubra os segredos da numerologia. Preencha seus dados para começar sua jornada.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-[#C8A2E0] font-semibold mb-2 text-sm">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-[#C8A2E0]" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Birth Date Field */}
            <div>
              <label className="block text-[#C8A2E0] font-semibold mb-2 text-sm">
                Data de Nascimento
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-[#C8A2E0]" size={18} />
                <input
                  type="text"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  maxLength={10}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  disabled={isLoading}
                />
              </div>
              <p className="text-slate-400 text-xs mt-1">Formato: DD/MM/YYYY</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex gap-2">
                <AlertCircle className="text-red-400 flex-shrink-0" size={18} />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 flex gap-2">
                <Check className="text-green-400 flex-shrink-0" size={18} />
                <p className="text-green-200 text-sm">Cadastro realizado com sucesso!</p>
              </div>
            )}

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-purple-600 cursor-pointer"
                disabled={isLoading}
              />
              <label htmlFor="terms" className="text-slate-400 text-xs cursor-pointer">
                Concordo com os{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  Termos de Uso
                </a>{' '}
                e{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  Política de Privacidade
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !birthDate || !acceptTerms}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Cadastrando...
                </>
              ) : (
                'Cadastrar'
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-slate-400">Ou</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors text-sm font-semibold"
            >
              Login com Google
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-slate-400 text-xs">
            Já tem cadastro?{' '}
            <button
              type="button"
              onClick={onClose}
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
