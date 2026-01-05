import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Compass, ArrowRight, AlertCircle, CheckCircle, Mail } from 'lucide-react';
import { sendPasswordResetEmail } from '@/lib/emailService';

/**
 * ForgotPassword Page - Página de Recuperação de Senha
 * 
 * Design: Elegante e místico
 * - Formulário simples de e-mail
 * - Envio de link de recuperação
 * - Feedback visual claro
 */

export default function ForgotPassword() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    if (!email.trim()) {
      setError('Por favor, insira seu e-mail');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('E-mail inválido');
      setIsLoading(false);
      return;
    }

    // Simular delay de envio
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Enviar e-mail de recuperação
    try {
      await sendPasswordResetEmail(email);
      setSuccess(true);
      setEmail('');
      
      // Redirecionar para login após 3 segundos
      setTimeout(() => {
        setLocation('/auth');
      }, 3000);
    } catch (err) {
      setError('Erro ao enviar e-mail. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-700">
              <Compass size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">Bússola Numerológica</h1>
          <p className="text-slate-600">Recupere seu acesso</p>
        </div>

        {/* Recovery Form */}
        {!success ? (
          <form onSubmit={handleSubmit} className="card-mystical space-y-6">
            <h2 className="text-2xl font-bold text-white">Esqueci minha Senha</h2>
            
            <p className="text-slate-600 text-sm">
              Digite seu e-mail e enviaremos um link para você redefinir sua senha.
            </p>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-white">
                Seu E-mail
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="seu@email.com"
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-mystical flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <span>Enviar Link de Recuperação</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Back to Login */}
            <div className="text-center">
              <Link href="/auth">
                <a className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                  ← Voltar ao Login
                </a>
              </Link>
            </div>
          </form>
        ) : (
          /* Success Message */
          <div className="card-mystical space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-green-50">
                <CheckCircle size={48} className="text-green-600" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">E-mail Enviado!</h2>
              <p className="text-slate-600">
                Verifique seu e-mail <span className="font-semibold text-indigo-600">{email}</span> para o link de recuperação de senha.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-indigo-900">
                💡 Dica
              </p>
              <p className="text-xs text-indigo-700">
                Se não receber o e-mail em alguns minutos, verifique sua pasta de spam.
              </p>
            </div>

            <p className="text-xs text-slate-500 text-center">
              Redirecionando para login em alguns segundos...
            </p>

            <Link href="/auth">
              <a className="block text-center text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                Clique aqui se não for redirecionado
              </a>
            </Link>
          </div>
        )}

        {/* Footer Links */}
        <div className="text-center">
          <button
            onClick={() => setLocation('/')}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}
