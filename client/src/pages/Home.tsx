import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Compass, Loader2, ArrowRight, LogOut, Zap, BookOpen, AlertCircle, Lock } from 'lucide-react';
import { Link } from 'wouter';
import { calculateChart } from '@/lib/numerologyUtils';
import { NumerologyChart } from '@/types';
import { PLANS } from '@/types/payment';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { usePaymentManagement } from '@/hooks/usePaymentManagement';
import Calculator from '@/components/Calculator';
import Report from '@/components/Report';

/**
 * Home Page - Bússola Numerológica 2026
 * 
 * Design Philosophy: Modernismo Minimalista com Acentos Místicos
 * - Integração com sistema de autenticação e planos
 * - Limite de mapas por plano
 * - Interface elegante e mística
 */

export default function Home() {
  const [, setLocation] = useLocation();
  const { user, isLoading: userLoading, logout, canGenerateMap, incrementMapsGenerated, getMapsLimit } = useUserSubscription();
  const { getCustomerByEmail } = usePaymentManagement();
  const [chart, setChart] = useState<NumerologyChart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const [showPendingWarning, setShowPendingWarning] = useState(false);

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (!userLoading && !user) {
      setLocation('/auth');
    }
  }, [user, userLoading, setLocation]);

  useEffect(() => {
    if (user && user.email !== 'eliane@artwebcreative.com.br') {
      const customer = getCustomerByEmail(user.email);
      if (customer && customer.status === 'pending') {
        setShowPendingWarning(true);
      }
    }
  }, [user, getCustomerByEmail]);

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin mx-auto"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const currentPlan = PLANS[user.plan as keyof typeof PLANS];
  const actualMapsLimit = getMapsLimit(currentPlan.mapsLimit);
  const mapsRemaining = actualMapsLimit === Infinity ? Infinity : actualMapsLimit - user.mapsGenerated;
  const canGenerate = canGenerateMap(actualMapsLimit);

  const handleCalculate = (name: string, birthDate: string) => {
    if (!canGenerate) {
      setShowLimitWarning(true);
      return;
    }

    setIsLoading(true);

    // Simulate brief loading for better UX
    setTimeout(() => {
      const calculatedChart = calculateChart(name, birthDate);
      setChart(calculatedChart);
      incrementMapsGenerated();
      setIsLoading(false);
    }, 800);
  };

  const handleReset = () => {
    setChart(null);
    setShowLimitWarning(false);
  };

  if (chart) {
    return <Report chart={chart} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-[#190825]">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#190825]/95 backdrop-blur-md border-b border-[#4A2A6A]">
        <div className="container flex items-center justify-between py-5 px-4 md:px-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#8A2BE2] to-[#D4AF37]">
              <Compass size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#D4AF37]">Bússola Numerológica</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/faq">
              <a className="p-2.5 rounded-lg hover:bg-[#2A1240] transition-colors text-[#D4AF37]" title="Aprenda">
                <BookOpen size={20} />
              </a>
            </Link>
            <div className="text-right hidden md:block">
              <p className="text-sm text-white font-medium">{user.email}</p>
              <p className="text-xs font-semibold text-[#D4AF37]">{currentPlan.name}</p>
            </div>
            <button
              onClick={() => {
                logout();
                setLocation('/auth');
              }}
              className="p-2.5 rounded-lg hover:bg-[#2A1240] transition-colors text-red-400"
              title="Sair"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Usage Bar */}
      <div className="bg-[#2A1240] border-b border-[#4A2A6A]">
        <div className="container py-6 px-4 md:px-0">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">
              Mapas Gerados: <span className="text-[#D4AF37]">{user.mapsGenerated}</span> / <span className="text-[#D4AF37]">{actualMapsLimit === Infinity ? '∞' : actualMapsLimit}</span>
            </span>
            {!canGenerate && (
              <button
                onClick={() => setLocation('/pricing')}
                className="text-sm font-semibold text-[#D4AF37] hover:text-[#FFD700] flex items-center gap-1 transition-colors"
              >
                <Zap size={14} />
                Upgrade
              </button>
            )}
          </div>
          <div className="w-full bg-[#1A0820] rounded-full h-3 overflow-hidden border border-[#4A2A6A]">
            <div
              className="bg-gradient-to-r from-[#8A2BE2] to-[#D4AF37] h-full transition-all duration-300 rounded-full"
              style={{ width: actualMapsLimit === Infinity ? '100%' : `${(user.mapsGenerated / actualMapsLimit) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container py-12 md:py-20 px-4 md:px-0">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2A1240] border border-[#4A2A6A]">
            <span className="w-2 h-2 rounded-full bg-[#8A2BE2] animate-pulse"></span>
            <span className="text-sm font-medium text-[#D4AF37]">Descubra seu destino numerológico</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Desvende os Mistérios da <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] to-[#D4AF37]">Numerologia</span>
          </h2>

          <p className="text-lg text-white leading-relaxed max-w-2xl mx-auto font-light">
            Utilize o método pitagórico para calcular seu Caminho de Destino, Motivação, Expressão e muito mais. 
            Receba interpretações personalizadas com inteligência artificial.
          </p>

          <div className="flex flex-wrap gap-6 justify-center pt-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-full bg-[#8A2BE2]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-[#D4AF37]">✓</span>
              </div>
              <span className="text-sm">Cálculos Automáticos</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-full bg-[#8A2BE2]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-[#D4AF37]">✓</span>
              </div>
              <span className="text-sm">Interpretações com IA</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-full bg-[#8A2BE2]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-[#D4AF37]">✓</span>
              </div>
              <span className="text-sm">Previsões para 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <div className="divider-diagonal"></div>
      </div>

      {/* Pending Warning */}
      {showPendingWarning && (
        <section className="container py-8">
          <div className="max-w-2xl mx-auto bg-blue-50 border-2 border-blue-200 rounded-lg p-6 space-y-4 flex items-start gap-4">
            <Lock className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-900">Acesso Pendente de Liberação</h3>
              <p className="text-blue-800 mt-2">
                Sua solicitação foi recebida! Estamos analisando seu pagamento. Você receberá um e-mail assim que seu acesso for liberado.
              </p>
              <p className="text-sm text-blue-700 mt-2">Tempo médio: 24 horas</p>
            </div>
          </div>
        </section>
      )}

      {/* Limit Warning */}
      {showLimitWarning && (
        <section className="container py-8">
          <div className="max-w-2xl mx-auto bg-amber-50 border-2 border-amber-200 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-bold text-amber-900">Limite de Mapas Atingido</h3>
            <p className="text-amber-800">
              Você já gerou {user.mapsGenerated} mapas numerológicos. Para gerar mais, faça upgrade do seu plano.
            </p>
            <button
              onClick={() => setLocation('/pricing')}
              className="btn-mystical inline-flex items-center gap-2"
            >
              <span>Ver Planos Premium</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      )}

      {/* Calculator Section */}
      <section className="container py-16 px-4 md:px-0">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-[#D4AF37] mb-3">Comece Agora</h3>
            <p className="text-white text-lg font-light">
              {canGenerate
                ? actualMapsLimit === Infinity
                  ? 'Você tem acesso ILIMITADO a mapas numerológicos'
                  : `Você tem ${mapsRemaining} mapa${mapsRemaining !== 1 ? 's' : ''} disponível${mapsRemaining !== 1 ? 's' : ''}`
                : 'Você atingiu o limite de mapas do seu plano'}
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 border-r-indigo-600 animate-spin"></div>
              </div>
              <p className="text-slate-600">Calculando seu mapa numerológico...</p>
            </div>
          ) : (
            <Calculator onSubmit={handleCalculate} disabled={!canGenerate} />
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="container py-16 px-4 md:px-0">
        <div className="divider-diagonal"></div>
        <div className="grid md:grid-cols-3 gap-8 py-12">
          <div className="card-mystical bg-[#2A1240] border border-[#4A2A6A]">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8A2BE2] to-[#D4AF37] flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-3">Caminho de Destino</h4>
            <p className="text-white text-sm leading-relaxed font-light">
              Descubra sua missão de vida e o propósito maior que o universo reservou para você.
            </p>
          </div>

          <div className="card-mystical bg-[#2A1240] border border-[#4A2A6A]">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8A2BE2] to-[#D4AF37] flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-3">Números Pessoais</h4>
            <p className="text-white text-sm leading-relaxed font-light">
              Compreenda sua motivação, expressão e o eu íntimo que define sua personalidade.
            </p>
          </div>

          <div className="card-mystical bg-[#2A1240] border border-[#4A2A6A]">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8A2BE2] to-[#D4AF37] flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-3">Previsões 2026</h4>
            <p className="text-white text-sm leading-relaxed font-light">
              Veja o que o ano de 2026 reserva para você segundo a numerologia pitagórica.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#4A2A6A] bg-[#1A0820]">
        <div className="container py-8 text-center text-white text-sm font-light space-y-2">
          <p>Bússola Numerológica 2026 © {new Date().getFullYear()} - Método Pitagórico</p>
          <p className="text-xs text-[#D4AF37]">Desenvolvido por <span className="font-semibold">Artweb Creative</span></p>
        </div>
      </footer>
    </div>
  );
}
