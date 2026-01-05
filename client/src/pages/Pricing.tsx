import { useState } from 'react';
import { Check, Zap, Crown, Star, ArrowRight, MessageCircle } from 'lucide-react';
import { PLANS } from '@/types/payment';
import { usePaymentManagement } from '@/hooks/usePaymentManagement';
import { useSalesManagement } from '@/hooks/useSalesManagement';
import { useLocation } from 'wouter';
import { sendPurchaseConfirmation } from '@/lib/emailService';

/**
 * Pricing Page - Página de Vendas
 * 
 * Design: Elegante e místico com apresentação dos 3 planos
 * - Cards com destaque para o plano mais popular
 * - Animações suaves e transições
 * - Chamadas à ação claras e persuasivas
 * - Redirecionamento para WhatsApp para pagamento
 */

export default function Pricing() {
  const [, setLocation] = useLocation();
  const { createCustomer, config } = usePaymentManagement();
  const { validateCoupon, useCoupon, addPaymentRecord } = useSalesManagement();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [error, setError] = useState('');

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowCheckout(true);
    setError('');
    setCouponCode('');
    setCouponDiscount(0);
    setCouponError('');
  };

  const handleValidateCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Digite um código de cupom');
      return;
    }

    if (!selectedPlan) {
      setCouponError('Selecione um plano primeiro');
      return;
    }

    const validation = validateCoupon(couponCode, selectedPlan as 'navigator' | 'visionary' | 'illuminated');
    if (!validation.valid) {
      setCouponError(validation.message);
      setCouponDiscount(0);
      return;
    }

    setCouponError('');
    setCouponDiscount(validation.discount);
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

    if (!fullName.trim()) {
      setError('Por favor, insira seu nome completo');
      return;
    }

    if (!selectedPlan) {
      setError('Selecione um plano');
      return;
    }

    // Criar cliente com status pendente
    createCustomer(email, fullName, selectedPlan as any);

    // Enviar e-mail de confirmacao
    const planName = PLANS[selectedPlan as keyof typeof PLANS].name;
    const planPrice = PLANS[selectedPlan as keyof typeof PLANS].price;
    const mapsLimit = PLANS[selectedPlan as keyof typeof PLANS].mapsLimit;
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Calcular desconto
    let finalPrice = planPrice;
    if (couponDiscount > 0) {
      if (couponCode.includes('%')) {
        finalPrice = planPrice * (1 - couponDiscount / 100);
      } else {
        finalPrice = planPrice - couponDiscount;
      }
      useCoupon(couponCode);
    }
    
    // Adicionar ao histórico de pagamentos
    addPaymentRecord({
      customerId: `customer_${Date.now()}`,
      customerEmail: email,
      customerName: fullName,
      plan: selectedPlan as 'navigator' | 'visionary' | 'illuminated',
      amount: planPrice,
      discountApplied: planPrice - finalPrice,
      finalAmount: finalPrice,
      couponCode: couponCode || undefined,
      status: 'pending',
      paymentMethod: 'whatsapp',
    });
    
    sendPurchaseConfirmation(
      email,
      fullName,
      planName,
      finalPrice,
      mapsLimit,
      transactionId
    );

    // Redirecionar para WhatsApp
    const message = `Olá! Gostaria de contratar o plano ${planName} (R$ ${finalPrice.toFixed(2).replace('.', ',')}). Meu e-mail é: ${email}. ID da Transação: ${transactionId}`;
    const whatsappUrl = `${config.whatsappLink}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Limpar formulário
    setTimeout(() => {
      setShowCheckout(false);
      setEmail('');
      setFullName('');
      setSelectedPlan(null);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#190825] via-[#2A1240] to-[#190825]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#190825]/80 backdrop-blur-md border-b border-[#4A2A6A]">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => setLocation('/')}
            className="text-lg font-bold text-[#D4AF37] hover:text-[#8A2BE2] transition-colors"
          >
            ← Voltar
          </button>
          <h1 className="text-xl font-bold text-[#D4AF37]">Planos de Assinatura</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-5xl font-bold text-[#D4AF37]">
            Escolha Seu <span className="text-[#8A2BE2]">Caminho</span>
          </h2>
          <p className="text-xl text-white">
            Desbloqueie o poder da numerologia com nossos planos flexíveis e acessíveis
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="container py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Navegador */}
          <div className="card-mystical space-y-6 hover:shadow-xl transition-shadow bg-[#2A1240] border border-[#4A2A6A]">
            <div className="flex items-center gap-2">
              <Zap className="text-[#D4AF37]" size={24} />
              <h3 className="text-2xl font-bold text-[#D4AF37]">{PLANS.navigator.name}</h3>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-[#8A2BE2]">
                R$ {PLANS.navigator.price.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-white">{PLANS.navigator.description}</p>
            </div>
            <div className="space-y-3">
              {PLANS.navigator.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-white">{feature}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSelectPlan('navigator')}
              className="w-full py-3 bg-[#8A2BE2] text-white rounded-lg hover:bg-[#D4AF37] transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              Contratar via WhatsApp
            </button>
          </div>

          {/* Visionário - Destaque */}
          <div className="card-mystical space-y-6 border-2 border-purple-500 shadow-lg scale-105 hover:shadow-2xl transition-shadow relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              Mais Popular
            </div>
            <div className="flex items-center gap-2">
              <Crown className="text-purple-600" size={24} />
              <h3 className="text-2xl font-bold text-white">{PLANS.visionary.name}</h3>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-purple-600">
                R$ {PLANS.visionary.price.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-slate-600">{PLANS.visionary.description}</p>
            </div>
            <div className="space-y-3">
              {PLANS.visionary.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSelectPlan('visionary')}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              Contratar via WhatsApp
            </button>
          </div>

          {/* Iluminado */}
          <div className="card-mystical space-y-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500" size={24} />
              <h3 className="text-2xl font-bold text-white">{PLANS.illuminated.name}</h3>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-amber-600">
                R$ {PLANS.illuminated.price.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-slate-600">{PLANS.illuminated.description}</p>
            </div>
            <div className="space-y-3">
              {PLANS.illuminated.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSelectPlan('illuminated')}
              className="w-full py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              Contratar via WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white">Confirmar Dados</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-2">Plano Selecionado:</p>
                <p className="font-bold text-white">
                  {selectedPlan && PLANS[selectedPlan as keyof typeof PLANS].name}
                </p>
                <p className="text-lg font-bold text-indigo-600 mt-1">
                  R$ {selectedPlan && PLANS[selectedPlan as keyof typeof PLANS].price.toFixed(2).replace('.', ',')}
                </p>
              </div>

              {/* Cupom de Desconto */}
              <div className="border-t border-slate-200 pt-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Cupom de Desconto (Opcional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value.toUpperCase());
                      setCouponError('');
                    }}
                    placeholder="Digite seu cupom"
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleValidateCoupon}
                    className="px-4 py-2 bg-slate-200 text-white rounded-lg hover:bg-slate-300 transition-colors font-semibold"
                  >
                    Aplicar
                  </button>
                </div>
                {couponError && (
                  <p className="text-red-600 text-sm mt-2">{couponError}</p>
                )}
                {couponDiscount > 0 && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-semibold text-sm">
                      ✓ Cupom aplicado! Desconto de R$ {couponDiscount.toFixed(2).replace('.', ',')}
                    </p>
                    <p className="text-green-600 text-sm mt-1">
                      Valor final: R$ {selectedPlan && ((PLANS[selectedPlan as keyof typeof PLANS].price - couponDiscount).toFixed(2).replace('.', ','))}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCheckout(false);
                  setError('');
                }}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Ir para WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
