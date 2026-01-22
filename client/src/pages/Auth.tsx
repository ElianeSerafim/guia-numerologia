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
const DEFAULT_PASSWORD = 'Bdigital@2025';

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

    if (password.trim() !== DEFAULT_PASSWORD) {
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
      // Armazenar e-mail para DashboardSelector
      localStorage.setItem('numerology_user_email', email);
      
      // Inicializar admin se for super admin
      if (email === 'eliane@artwebcreative.com.br') {
        const defaultAdmin = {
          id: 'super_admin_1',
          email: email,
          name: 'Administrador Principal',
          role: 'super_admin',
          createdAt: new Date().toISOString(),
          createdBy: 'system',
          isActive: true,
        };
        localStorage.setItem('admin_users', JSON.stringify([defaultAdmin]));
        console.log('Admin inicializado:', localStorage.getItem('admin_users'));
      }
      
      setShowPricingHint(false);
      
      // Redirecionar para selecao de painel apos sucesso
      setTimeout(() => {
        setLocation('/dashboard-selector');
      }, 500);
    } else {
      // Mostrar opcao de planos
      setShowPricingHint(true);
      setIsLoading(false);
    }
  };

  const handleChoosePlan = () => {
    setLocation('/pricing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07131B] via-[#0A1F2E] to-[#07131B] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-lg bg-gradient-to-br from-[#00FFFF] to-[#19E6FF]">
              <Compass size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#19E6FF]">Portal Numerologia</h1>
          <p className="text-white">Descubra os mistérios do seu destino</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="card-mystical space-y-6 bg-[#0A1F2E] border-2 border-[#1A3A4A] rounded-xl p-6">
          <h2 className="text-2xl font-bold text-[#19E6FF]">Bem-vindo</h2>

          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-white">
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
              className="w-full px-4 py-3 rounded-lg border-2 border-[#00FFFF] bg-[#1A0820] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19E6FF]/50 focus:border-[#19E6FF] transition-all disabled:opacity-50"
            />
            {email.toLowerCase() === 'eliane@artwebcreative.com.br' && (
              <div className="flex items-center gap-2 text-[#19E6FF] text-sm">
                <CheckCircle size={16} />
                <span>E-mail Premium Detectado! 👑</span>
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-white">
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
                className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-[#00FFFF] bg-[#1A0820] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#19E6FF]/50 focus:border-[#19E6FF] transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#19E6FF] hover:text-[#00FFFF] transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password">
                <a className="text-sm text-[#19E6FF] hover:text-[#00FFFF] font-semibold">
                  Esqueci minha senha
                </a>
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-900/30 border border-red-600">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#00FFFF] to-[#19E6FF] text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-[#00FFFF]/50 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="space-y-4 pt-4 border-t border-[#1A3A4A]">
              <div className="bg-[#00FFFF]/20 rounded-lg p-4 space-y-2 border border-[#00FFFF]/50">
                <p className="text-sm font-semibold text-[#19E6FF]">
                  Escolha seu plano para continuar
                </p>
                <p className="text-xs text-white">
                  Você precisa de um plano para gerar mapas numerológicos. Confira nossos planos flexíveis e acessíveis.
                </p>
              </div>
              <button
                type="button"
                onClick={handleChoosePlan}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#19E6FF] text-[#19E6FF] font-semibold hover:bg-[#19E6FF]/10 transition-colors"
              >
                Ver Planos
              </button>
            </div>
          )}

          {/* Info Text */}
          <div className="space-y-2">
            <p className="text-xs text-gray-400 text-center">
              Seus dados são processados localmente e não são armazenados em nossos servidores.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="text-gray-400">Novo na numerologia?</span>
              <Link href="/faq">
                <a className="text-[#19E6FF] hover:text-[#00FFFF] font-semibold">
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
            className="text-sm text-cyan-400 hover:text-indigo-700 font-semibold"
          >
            ← Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}
