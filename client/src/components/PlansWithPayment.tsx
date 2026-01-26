import { useState } from 'react';
import { NumerologyChart } from '@/types';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface PlansWithPaymentProps {
  chart: NumerologyChart;
  onPaymentSuccess?: () => void;
}

const PLANS = {
  navigator: {
    id: 'navigator',
    name: 'Navegador',
    price: 29.90,
    priceFormatted: 'R$ 29,90',
    mapsLimit: 1,
    features: [
      '1 mapa numerológico completo',
      'Interpretações detalhadas',
      'Ciclos de vida e realizações',
      'Relatório em PDF',
      'Acesso por 30 dias'
    ],
    icon: '🧭',
    color: 'from-blue-500 to-blue-600',
    popular: false
  },
  visionary: {
    id: 'visionary',
    name: 'Visionário',
    price: 59.90,
    priceFormatted: 'R$ 59,90',
    mapsLimit: 3,
    features: [
      '3 mapas numerológicos',
      'Interpretações avançadas',
      'Ciclos trimestrais 2026',
      'Renascimento & Legado',
      'Relatórios em PDF',
      'Suporte prioritário',
      'Acesso por 90 dias'
    ],
    icon: '🔮',
    color: 'from-purple-500 to-purple-600',
    popular: true
  },
  illuminated: {
    id: 'illuminated',
    name: 'Iluminado',
    price: 200.00,
    priceFormatted: 'R$ 200,00',
    mapsLimit: 10,
    features: [
      '10 mapas numerológicos',
      'Interpretações completas',
      'Renascimento & Legado',
      'Grande Amor & Compatibilidade',
      'Ciclos trimestrais detalhados',
      'E-books personalizados',
      'Consultoria numerológica',
      'Suporte 24/7',
      'Acesso por 1 ano'
    ],
    icon: '✨',
    color: 'from-yellow-500 to-yellow-600',
    popular: false
  }
};

export default function PlansWithPayment({ chart, onPaymentSuccess }: PlansWithPaymentProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const initiatePagSeguro = trpc.payment.initiatePagSeguro.useMutation();

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setError('');
  };

  const handleInitiatePayment = async (planId: string) => {
    setError('');
    setIsLoading(true);

    try {
      // Validar campos
      if (!name.trim() || !email.trim()) {
        throw new Error('Por favor, preencha seu nome e e-mail');
      }

      const plan = PLANS[planId as keyof typeof PLANS];
      if (!plan) {
        throw new Error('Plano inválido');
      }

      // Chamar tRPC para iniciar pagamento
      // Map Portuguese plan names to English
      const planMap: Record<string, 'navigator' | 'visionary' | 'illuminated'> = {
        'navegador': 'navigator',
        'visionario': 'visionary',
        'iluminado': 'illuminated',
        'navigator': 'navigator',
        'visionary': 'visionary',
        'illuminated': 'illuminated'
      };
      const mappedPlanId = (planMap[selectedPlan as string] || 'navigator') as 'navigator' | 'visionary' | 'illuminated';

      const response = await initiatePagSeguro.mutateAsync({
        email: email.trim(),
        name: name.trim(),
        planId: mappedPlanId,
        planName: plan.name,
        amount: Math.round(plan.price * 100), // Converter para centavos
        paymentMethod: 'pix'
      });

      // Redirecionar para PagSeguro
      if (response.paymentLink) {
        window.location.href = response.paymentLink;
      } else {
        throw new Error('Não foi possível iniciar o pagamento');
      }

      onPaymentSuccess?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao processar pagamento';
      setError(message);
      console.error('Erro ao iniciar pagamento:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-[#19E6FF]">
          Escolha Seu Plano
        </h2>
        <p className="text-[#C8A2E0]">
          Desbloqueie o mapa completo com interpretações detalhadas
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(PLANS).map(([key, plan]) => (
          <div
            key={key}
            className={`relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
              plan.popular ? 'ring-2 ring-purple-500 md:scale-105' : ''
            } ${selectedPlan === key ? 'ring-2 ring-cyan-400' : ''}`}
            onClick={() => handleSelectPlan(key)}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg z-10">
                Popular
              </div>
            )}

            {/* Header do Card */}
            <div className={`bg-gradient-to-br ${plan.color} p-8 text-white`}>
              <div className="text-5xl mb-4">{plan.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-1">{plan.priceFormatted}</div>
              <p className="text-sm opacity-90">{plan.mapsLimit} mapa{plan.mapsLimit > 1 ? 's' : ''}</p>
            </div>

            {/* Features */}
            <div className="bg-white p-8">
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(key)}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedPlan === key
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                    : plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                {selectedPlan === key ? 'Selecionado ✓' : 'Selecionar'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário de Pagamento */}
      {selectedPlan && (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 space-y-6">
          <h3 className="text-2xl font-bold text-[#19E6FF]">
            Finalize Seu Pedido
          </h3>

          {/* Erro */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {/* Campos */}
          <div className="space-y-4">
            <div>
              <label className="block text-[#C8A2E0] font-semibold mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-[#C8A2E0] font-semibold mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-slate-700/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-[#C8A2E0]">
              <span>Plano {PLANS[selectedPlan as keyof typeof PLANS].name}:</span>
              <span className="font-bold text-[#19E6FF]">
                {PLANS[selectedPlan as keyof typeof PLANS].priceFormatted}
              </span>
            </div>
            <div className="flex justify-between text-[#B8A2D0] text-sm">
              <span>Mapas inclusos:</span>
              <span>{PLANS[selectedPlan as keyof typeof PLANS].mapsLimit}</span>
            </div>
          </div>

          {/* Botão de Pagamento */}
          <button
            onClick={() => handleInitiatePayment(selectedPlan)}
            disabled={isLoading || !name.trim() || !email.trim()}
            className="w-full bg-gradient-to-r from-[#00FFFF] to-[#19E6FF] text-[#07131B] px-6 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all button-glow neon-pulse disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processando...
              </>
            ) : (
              <>
                Ir para PagSeguro
              </>
            )}
          </button>

          <p className="text-center text-[#B8A2D0] text-sm">
            Você será redirecionado para o PagSeguro para completar o pagamento de forma segura.
          </p>
        </div>
      )}
    </div>
  );
}
