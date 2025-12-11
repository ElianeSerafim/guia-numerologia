import { useState } from 'react';
import { Check, Zap, Crown, Star, ArrowRight } from 'lucide-react';
import { PLANS, SubscriptionPlan } from '@/types/subscription';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { useLocation } from 'wouter';

/**
 * Pricing Page - Página de Vendas
 * 
 * Design: Elegante e místico com apresentação dos 3 planos
 * - Cards com destaque para o plano mais popular
 * - Animações suaves e transições
 * - Chamadas à ação claras e persuasivas
 */

export default function Pricing() {
  const [, setLocation] = useLocation();
  const { registerUser } = useUserSubscription();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [error, setError] = useState('');

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowCheckout(true);
    setError('');
  };

  const handleCheckout = () => {
    if (!email.trim()) {
      setError('Por favor, insira seu e-mail');
      return;
    }

    if (!email.includes('@')) {
      setError('E-mail inválido');
      return;
    }

    if (!selectedPlan) {
      setError('Selecione um plano');
      return;
    }

    // Registrar usuário com o plano selecionado
    registerUser(email, selectedPlan as any);

    // Redirecionar para a página inicial
    setTimeout(() => {
      setLocation('/');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => setLocation('/')}
            className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors"
          >
            ← Voltar
          </button>
          <h1 className="text-xl font-bold text-slate-900">Planos de Assinatura</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-5xl font-bold text-slate-900">
            Escolha Seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">Caminho</span>
          </h2>
          <p className="text-xl text-slate-600">
            Desbloqueie o poder da numerologia com nossos planos flexíveis e acessíveis
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <PricingCard
            plan={PLANS.starter}
            isSelected={selectedPlan === 'starter'}
            onSelect={() => handleSelectPlan('starter')}
            icon={<Zap className="w-8 h-8" />}
          />

          {/* Pro Plan - Highlighted */}
          <PricingCard
            plan={PLANS.pro}
            isSelected={selectedPlan === 'pro'}
            onSelect={() => handleSelectPlan('pro')}
            icon={<Star className="w-8 h-8" />}
            highlighted={true}
          />

          {/* Premium Plan */}
          <PricingCard
            plan={PLANS.premium}
            isSelected={selectedPlan === 'premium'}
            onSelect={() => handleSelectPlan('premium')}
            icon={<Crown className="w-8 h-8" />}
          />
        </div>
      </section>

      {/* Checkout Section */}
      {showCheckout && (
        <section className="container py-12">
          <div className="max-w-md mx-auto card-mystical space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">
              Finalize sua Compra
            </h3>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-600">Plano Selecionado</p>
              <p className="text-lg font-bold text-indigo-600">
                {selectedPlan && PLANS[selectedPlan as SubscriptionPlan]?.name}
              </p>
              <p className="text-2xl font-bold text-slate-900">
                R$ {selectedPlan && PLANS[selectedPlan as SubscriptionPlan]?.price.toFixed(2)}
              </p>
            </div>

            <div className="divider-diagonal"></div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Seu E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="w-full btn-mystical flex items-center justify-center gap-2 group"
              >
                <span>Confirmar Compra</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setShowCheckout(false);
                  setSelectedPlan(null);
                  setEmail('');
                }}
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 text-slate-900 font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
            </div>

            <p className="text-xs text-slate-500 text-center">
              💡 Se você usar o e-mail eliane@artwebcreative.com.br, terá acesso ao plano Iluminado gratuitamente!
            </p>
          </div>
        </section>
      )}

      {/* Features Comparison */}
      <section className="container py-16">
        <div className="divider-diagonal"></div>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Comparação de Planos
          </h3>
          <div className="card-mystical overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Recurso</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-900">Navegador</th>
                  <th className="text-center py-4 px-4 font-bold text-indigo-600">Visionário</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-900">Iluminado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4 text-slate-700">Mapas Numerológicos</td>
                  <td className="text-center py-4 px-4 font-bold text-slate-900">2</td>
                  <td className="text-center py-4 px-4 font-bold text-indigo-600">6</td>
                  <td className="text-center py-4 px-4 font-bold text-slate-900">10</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4 text-slate-700">Cálculos Completos</td>
                  <td className="text-center py-4 px-4"><Check size={20} className="mx-auto text-green-600" /></td>
                  <td className="text-center py-4 px-4"><Check size={20} className="mx-auto text-green-600" /></td>
                  <td className="text-center py-4 px-4"><Check size={20} className="mx-auto text-green-600" /></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4 text-slate-700">Relatórios em PDF</td>
                  <td className="text-center py-4 px-4 text-slate-400">—</td>
                  <td className="text-center py-4 px-4"><Check size={20} className="mx-auto text-green-600" /></td>
                  <td className="text-center py-4 px-4"><Check size={20} className="mx-auto text-green-600" /></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-4 text-slate-700">Suporte Prioritário</td>
                  <td className="text-center py-4 px-4 text-slate-400">—</td>
                  <td className="text-center py-4 px-4"><Check size={20} className="mx-auto text-green-600" /></td>
                  <td className="text-center py-4 px-4"><Check size={20} className="mx-auto text-green-600" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-slate-700">Análises Comparativas</td>
                  <td className="text-center py-4 px-4 text-slate-400">—</td>
                  <td className="text-center py-4 px-4 text-slate-400">—</td>
                  <td className="text-center py-4 px-4"><Check size={20} className="mx-auto text-green-600" /></td>
                </tr>
              </tbody>
            </table>
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

interface PricingCardProps {
  plan: any;
  isSelected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  highlighted?: boolean;
}

function PricingCard({ plan, isSelected, onSelect, icon, highlighted }: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl transition-all duration-300 ${
        highlighted
          ? 'ring-2 ring-indigo-600 shadow-2xl scale-105'
          : 'border-2 border-slate-200 hover:border-indigo-300'
      } ${isSelected ? 'bg-indigo-50' : 'bg-white'}`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-4 py-1 rounded-full text-sm font-bold">
          Mais Popular
        </div>
      )}

      <div className="p-8 space-y-6">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          highlighted ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'
        }`}>
          {icon}
        </div>

        {/* Plan Name */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
          <p className="text-sm text-slate-600 mt-1">{plan.description}</p>
        </div>

        {/* Price */}
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-slate-900">
              R$ {plan.price.toFixed(2)}
            </span>
            {plan.price > 0 && <span className="text-slate-600">uma vez</span>}
          </div>
          {plan.price === 0 && <p className="text-sm text-slate-600 mt-1">Teste gratuitamente</p>}
        </div>

        {/* Features */}
        <ul className="space-y-3">
          {plan.features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-center gap-3 text-slate-700">
              <Check size={18} className="text-green-600 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={onSelect}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            highlighted
              ? 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:shadow-lg'
              : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
          } ${isSelected ? 'ring-2 ring-indigo-600' : ''}`}
        >
          <span>{isSelected ? 'Selecionado' : 'Escolher Plano'}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
