import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Compass, Loader2, ArrowRight, LogOut, Zap, BookOpen } from 'lucide-react';
import { Link } from 'wouter';
import { calculateChart } from '@/lib/numerologyUtils';
import { NumerologyChart } from '@/types';
import { PLANS } from '@/types/subscription';
import { useUserSubscription } from '@/hooks/useUserSubscription';
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
  const [chart, setChart] = useState<NumerologyChart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (!userLoading && !user) {
      setLocation('/auth');
    }
  }, [user, userLoading, setLocation]);

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

  const currentPlan = PLANS[user.plan];
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-700">
              <Compass size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Bússola Numerológica</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/faq">
              <a className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600" title="Aprenda">
                <BookOpen size={20} />
              </a>
            </Link>
            <div className="text-right">
              <p className="text-sm text-slate-600">{user.email}</p>
              <p className="text-xs font-semibold text-indigo-600">{currentPlan.name}</p>
            </div>
            <button
              onClick={() => {
                logout();
                setLocation('/auth');
              }}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
              title="Sair"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Usage Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-900">
              Mapas Gerados: {user.mapsGenerated} / {actualMapsLimit === Infinity ? '∞' : actualMapsLimit}
            </span>
            {!canGenerate && (
              <button
                onClick={() => setLocation('/pricing')}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <Zap size={14} />
                Upgrade
              </button>
            )}
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-600 to-purple-700 h-full transition-all duration-300"
              style={{ width: actualMapsLimit === Infinity ? '100%' : `${(user.mapsGenerated / actualMapsLimit) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span className="text-sm font-medium text-indigo-700">Descubra seu destino numerológico</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            Desvende os Mistérios da <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">Numerologia</span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Utilize o método pitagórico para calcular seu Caminho de Destino, Motivação, Expressão e muito mais. 
            Receba interpretações personalizadas com inteligência artificial.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <div className="flex items-center gap-2 text-slate-700">
              <div className="w-8 h-8 rounded-full bg-gold-mystical/20 flex items-center justify-center">
                <span className="text-sm font-bold text-indigo-600">✓</span>
              </div>
              <span className="text-sm">Cálculos Automáticos</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <div className="w-8 h-8 rounded-full bg-gold-mystical/20 flex items-center justify-center">
                <span className="text-sm font-bold text-indigo-600">✓</span>
              </div>
              <span className="text-sm">Interpretações com IA</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <div className="w-8 h-8 rounded-full bg-gold-mystical/20 flex items-center justify-center">
                <span className="text-sm font-bold text-indigo-600">✓</span>
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
      <section className="container py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Comece Agora</h3>
            <p className="text-slate-600">
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
      <section className="container py-16">
        <div className="divider-diagonal"></div>
        <div className="grid md:grid-cols-3 gap-8 py-12">
          <div className="card-mystical">
            <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-indigo-600">1</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Caminho de Destino</h4>
            <p className="text-slate-600 text-sm">
              Descubra sua missão de vida e o propósito maior que o universo reservou para você.
            </p>
          </div>

          <div className="card-mystical">
            <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-indigo-600">2</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Números Pessoais</h4>
            <p className="text-slate-600 text-sm">
              Compreenda sua motivação, expressão e o eu íntimo que define sua personalidade.
            </p>
          </div>

          <div className="card-mystical">
            <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-indigo-600">3</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Previsões 2026</h4>
            <p className="text-slate-600 text-sm">
              Veja o que o ano de 2026 reserva para você segundo a numerologia pitagórica.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="container py-8 text-center text-slate-600 text-sm">
          <p>Bússola Numerológica 2026 © {new Date().getFullYear()} - Método Pitagórico</p>
        </div>
      </footer>
    </div>
  );
}
