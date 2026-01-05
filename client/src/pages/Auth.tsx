import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Compass, ArrowRight, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { PREMIUM_EMAILS } from '@/types/subscription';

/**
 * Auth Page - Página de Autenticação
 * 
 * Design: Elegante e místico com foco em segurança
 * - Formulário com e-mail e senha
 * - Validação segura
 * - Feedback visual claro
 */

// Senha padrão para demo (em produção, usar autenticação real)
const DEFAULT_PASSWORD = 'numerologia2026';

export default function Auth() {
  const [, setLocation] = useLocation();
  const { registerUser, isPremiumEmail } = useUserSubscription();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPricingHint, setShowPricingHint] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validar e-mail
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

    // Validar senha
    if (!password.trim()) {
      setError('Por favor, insira sua senha');
      setIsLoading(false);
      return;
    }

    if (password !== DEFAULT_PASSWORD) {
      setError('Senha incorreta');
      setIsLoading(false);
      return;
    }

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 800));

    const isPremium = isPremiumEmail(email);
    
    if (isPremium) {
      // Registrar com plano premium
      registerUser(email, 'premium');
      setShowPricingHint(false);
    } else {
      // Mostrar opção de planos
      setShowPricingHint(true);
      setIsLoading(false);
      return;
    }

    // Redirecionar para seleção de painel
    setTimeout(() => {
      setLocation('/dashboard-selector');
    }, 500);
  };

  const handleChoosePlan = () => {
    setLocation('/pricing');
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
          <h1 className="text-3xl font-bold text-slate-900">Bússola Numerológica</h1>
          <p className="text-slate-600">Descubra os mistérios do seu destino</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="card-mystical space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Bem-vindo</h2>

          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
              Seu E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
                setShowPricingHint(false);
              }}
              placeholder="seu@email.com"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all disabled:opacity-50"
            />
            {email.toLowerCase() === 'eliane@artwebcreative.com.br' && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle size={16} />
                <span>E-mail Premium Detectado! 👑</span>
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-slate-900">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Digite sua senha"
                disabled={isLoading}
                className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Senha: numerologia2026
            </p>
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
                <span>Autenticando...</span>
              </>
            ) : (
              <>
                <span>Entrar</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Pricing Hint */}
          {showPricingHint && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="bg-indigo-50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-indigo-900">
                  Escolha seu plano para continuar
                </p>
                <p className="text-xs text-indigo-700">
                  Você precisa de um plano para gerar mapas numerológicos. Confira nossos planos flexíveis e acessíveis.
                </p>
              </div>
              <button
                type="button"
                onClick={handleChoosePlan}
                className="w-full px-4 py-3 rounded-lg border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
              >
                Ver Planos
              </button>
            </div>
          )}

          {/* Info Text */}
          <div className="space-y-2">
            <p className="text-xs text-slate-500 text-center">
              Seus dados são processados localmente e não são armazenados em nossos servidores.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="text-slate-600">Novo na numerologia?</span>
              <Link href="/faq">
                <a className="text-indigo-600 hover:text-indigo-700 font-semibold">
                  Aprenda aqui
                </a>
              </Link>
            </div>
          </div>
        </form>

        {/* Footer Links */}
        <div className="text-center space-y-2">
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
