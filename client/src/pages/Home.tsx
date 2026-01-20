import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Compass, Loader2, ArrowRight, LogOut, Zap, BookOpen, AlertCircle, Lock, Check } from 'lucide-react';
import { Link } from 'wouter';
import { calculateChart } from '@/lib/numerologyUtils';
import { NumerologyChart } from '@/types';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
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

const PLANS = {
  navegador: {
    name: "Navegador",
    price: "R$ 29,90",
    priceValue: 2990,
    mapsLimit: 1,
    features: [
      "1 mapa numerológico",
      "Interpretações básicas",
      "Acesso por 30 dias",
      "Suporte por email"
    ],
    icon: "🧭",
    color: "from-blue-500 to-blue-600",
    popular: false
  },
  visionario: {
    name: "Visionário",
    price: "R$ 59,90",
    priceValue: 5990,
    mapsLimit: 3,
    features: [
      "3 mapas numerológicos",
      "Interpretações avançadas",
      "Ciclos trimestrais 2026",
      "Suporte prioritário",
      "Relatórios em PDF"
    ],
    icon: "🔮",
    color: "from-purple-500 to-purple-600",
    popular: true
  },
  iluminado: {
    name: "Iluminado",
    price: "R$ 200,00",
    priceValue: 20000,
    mapsLimit: 10,
    features: [
      "10 mapas numerológicos",
      "Interpretações completas",
      "Renascimento & Legado",
      "Suporte 24/7",
      "E-books personalizados",
      "Consultoria numerológica"
    ],
    icon: "✨",
    color: "from-yellow-500 to-yellow-600",
    popular: false
  }
};

export default function Home() {
  const [, setLocation] = useLocation();
  const { user, loading, isAuthenticated } = useAuth();
  const [chart, setChart] = useState<NumerologyChart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  // tRPC queries (placeholder - será implementado com tRPC procedures)
  const subscription = null;
  const canGenerate = { canGenerate: true, mapsRemaining: 1, reason: "OK" };
  const initiatePaymentMutation = { mutateAsync: async () => ({}) };

  // Redirecionar para login se não estiver autenticado
  // Comentado: deixar o usuário ver a página mesmo sem autenticação
  // useEffect(() => {
  //   if (!loading && !isAuthenticated) {
  //     setLocation('/auth');
  //   }
  // }, [isAuthenticated, loading, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin mx-auto"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Permitir acesso mesmo sem autenticação
  // if (!isAuthenticated) {
  //   return null;
  // }

  const handleCalculate = (name: string, birthDate: string) => {
    if (!canGenerate?.canGenerate) {
      setShowPlans(true);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const calculatedChart = calculateChart(name, birthDate);
      setChart(calculatedChart);
      setIsLoading(false);
    }, 800);
  };

  const handleInitiatePayment = async (planKey: string) => {
    try {
      // Placeholder - será implementado com tRPC
      alert(`Plano ${planKey} selecionado. Redirecionando para pagamento...`);
      // const result = await initiatePaymentMutation.mutateAsync({...});
      // if (result?.deepLink) { window.location.href = result.deepLink; }
    } catch (error) {
      console.error("Erro ao iniciar pagamento:", error);
    }
  };

  const handleReset = () => {
    setChart(null);
  };

  if (chart) {
    return <Report chart={chart} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between py-3 px-4 md:px-6">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-700 flex-shrink-0">
              <Compass size={20} className="text-white" />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-slate-900 truncate">Bússola</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/faq">
              <a className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600" title="Aprenda">
                <BookOpen size={18} />
              </a>
            </Link>
            <div className="text-right hidden sm:block">
              <p className="text-xs md:text-sm text-slate-600 truncate">{user?.email}</p>
              {subscription && (
                <p className="text-xs font-semibold text-indigo-600">Plano Ativo</p>
              )}
            </div>
            <button
              onClick={() => {
                // Logout logic
                setLocation('/auth');
              }}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Usage Bar */}
      {subscription && (
        <div className="bg-white border-b border-slate-200">
          <div className="container py-3 md:py-4 px-4 md:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
              <span className="text-xs md:text-sm font-semibold text-slate-900">
                Mapas Gerados: 0 / 1
              </span>
              {!canGenerate?.canGenerate && (
                <button
                  onClick={() => setShowPlans(true)}
                  className="text-xs md:text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 whitespace-nowrap"
                >
                  <Zap size={14} />
                  Upgrade
                </button>
              )}
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-600 to-purple-700 h-full transition-all duration-300"
                style={{ width: '0%' }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Plans Section */}
      {showPlans && (
        <section className="container py-8 md:py-16 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">Escolha Seu Plano</h2>
              <p className="text-sm md:text-lg text-slate-600">Desvende os mistérios da numerologia com o plano perfeito para você</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {Object.entries(PLANS).map(([key, plan]) => (
                <div
                  key={key}
                  className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                    plan.popular ? 'ring-2 ring-purple-500 md:scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                      Popular
                    </div>
                  )}
                  
                  <div className={`bg-gradient-to-br ${plan.color} p-8 text-white`}>
                    <div className="text-5xl mb-4">{plan.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold mb-1">{plan.price}</div>
                    <p className="text-sm opacity-90">por mês</p>
                  </div>

                  <div className="bg-white p-8">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleInitiatePayment(key)}
                      disabled={false}
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                          : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                      }`}
                    >
                      Escolher Plano
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowPlans(false)}
              className="mt-8 mx-auto block text-slate-600 hover:text-slate-900 font-semibold"
            >
              ← Voltar
            </button>
          </div>
        </section>
      )}

      {/* Hero Section */}
      {!showPlans && (
        <>
          <section className="container py-8 md:py-24 px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                <span className="text-sm font-medium text-indigo-700">Descubra seu destino numerológico</span>
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Desvende os Mistérios da <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">Numerologia</span>
              </h2>

              <p className="text-sm md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Utilize o método pitagórico para calcular seu Caminho de Destino, Motivação, Expressão e muito mais. 
                Receba interpretações personalizadas com inteligência artificial.
              </p>

              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-indigo-600">✓</span>
                  </div>
                  <span className="text-sm">Cálculos Automáticos</span>
                </div>

                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-indigo-600">✓</span>
                  </div>
                  <span className="text-sm">Previsões para 2026</span>
                </div>
              </div>
            </div>
          </section>

          {/* Calculator Section */}
          <section className="container py-8 md:py-16 px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Comece Agora</h3>
                <p className="text-xs md:text-base text-slate-600">
                  {canGenerate?.canGenerate
                    ? `Você tem ${canGenerate?.mapsRemaining || 1} mapa${canGenerate?.mapsRemaining !== 1 ? 's' : ''} disponível${canGenerate?.mapsRemaining !== 1 ? 's' : ''}`
                    : 'Escolha um plano para começar'}
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
                <Calculator onSubmit={handleCalculate} disabled={!canGenerate?.canGenerate} />
              )}

              {!canGenerate?.canGenerate && (
                <div className="mt-8 p-6 bg-amber-50 border-2 border-amber-200 rounded-lg">
                  <div className="flex gap-4">
                    <Lock className="text-amber-600 flex-shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-amber-900 mb-2">Limite de Mapas Atingido</h4>
                      <p className="text-amber-800 mb-4">
                        Você já gerou todos os mapas do seu plano. Para gerar mais, faça upgrade do seu plano.
                      </p>
                      <button
                        onClick={() => setShowPlans(true)}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        <span>Ver Planos Premium</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Info Section */}
          <section className="container py-8 md:py-16 px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 py-8 md:py-12">
              <div className="rounded-xl p-6 md:p-8 bg-white shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-indigo-600">1</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Caminho de Destino</h4>
                <p className="text-slate-600 text-sm">
                  Descubra sua missão de vida e o propósito maior que o universo reservou para você.
                </p>
              </div>

              <div className="rounded-xl p-6 md:p-8 bg-white shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-indigo-600">2</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Números Pessoais</h4>
                <p className="text-slate-600 text-sm">
                  Compreenda sua motivação, expressão e o eu íntimo que define sua personalidade.
                </p>
              </div>

              <div className="rounded-xl p-6 md:p-8 bg-white shadow-md hover:shadow-lg transition-all">
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
        </>
      )}
    </div>
  );
}
