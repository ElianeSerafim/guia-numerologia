import { useState } from 'react';
import { PLANS } from '@/types/payment';
import { usePaymentManagement } from '@/hooks/usePaymentManagement';
import { useSalesManagement } from '@/hooks/useSalesManagement';
import { useLocation } from 'wouter';
import { sendPurchaseConfirmation } from '@/lib/emailService';
import CheckoutPagSeguro from '@/components/CheckoutPagSeguro';
import { Zap, Check, Star, ArrowRight, MessageCircle, Crown } from 'lucide-react';

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
  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'pagseguro'>('whatsapp');
  const [showPagSeguroCheckout, setShowPagSeguroCheckout] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-[#07131B] via-[#0A1F2E] to-[#07131B]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#07131B]/80 backdrop-blur-md border-b border-[#1A3A4A]">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => setLocation('/')}
            className="text-lg font-bold text-[#19E6FF] hover:text-[#00FFFF] transition-colors"
          >
            ← Voltar
          </button>
          <h1 className="text-xl font-bold text-[#19E6FF]">Planos de Assinatura</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-5xl font-bold text-[#19E6FF]">
            Escolha Seu <span className="text-[#00FFFF]">Caminho</span>
          </h2>
          <p className="text-xl text-white">
            Desbloqueie o poder da numerologia com nossos planos flexíveis e acessíveis
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="container py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Navegador */}
          <div 
            onClick={() => handleSelectPlan('navigator')}
            className="card-mystical space-y-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-[#0A1F2E] border border-[#1A3A4A] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Zap className="text-[#19E6FF]" size={24} />
              <h3 className="text-2xl font-bold text-[#19E6FF]">{PLANS.navigator.name}</h3>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-[#00FFFF]">
                R$ {PLANS.navigator.price.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-white text-sm">{PLANS.navigator.description}</p>
            </div>
            <div className="space-y-3">
              {PLANS.navigator.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                  <span className="text-white text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectPlan('navigator');
              }}
              className="w-full py-3 bg-gradient-to-r from-[#00FFFF] to-[#19E6FF] text-white rounded-lg hover:from-[#19E6FF] hover:to-[#00FFFF] transition-all font-semibold flex items-center justify-center gap-2 shadow-lg"
            >
              <ArrowRight size={18} />
              Escolher Plano
            </button>
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-[#1A3A4A]">
              <span className="text-2xl">✓</span>
              <span className="text-sm text-white font-semibold">Garantia de Satisfação de 7 dias</span>
            </div>
          </div>

          {/* Visionário - Destaque */}
          <div 
            onClick={() => handleSelectPlan('visionary')}
            className="card-mystical space-y-6 border-2 border-[#19E6FF] shadow-2xl scale-105 hover:shadow-2xl hover:scale-110 transition-all duration-300 relative cursor-pointer bg-gradient-to-br from-[#0A1F2E] to-[#3A1A50]"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#19E6FF] to-[#FFC700] text-[#07131B] px-4 py-1 rounded-full text-sm font-bold">
              ⭐ Mais Popular
            </div>
            <div className="flex items-center gap-2">
              <Crown className="text-[#19E6FF]" size={24} />
              <h3 className="text-2xl font-bold text-[#19E6FF]">{PLANS.visionary.name}</h3>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-[#19E6FF]">
                R$ {PLANS.visionary.price.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-white text-sm">{PLANS.visionary.description}</p>
            </div>
            <div className="space-y-3">
              {PLANS.visionary.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                  <span className="text-white text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectPlan('visionary');
              }}
              className="w-full py-3 bg-gradient-to-r from-[#19E6FF] to-[#FFC700] text-[#07131B] rounded-lg hover:from-[#FFC700] hover:to-[#FFD700] transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#19E6FF]/50"
            >
              <ArrowRight size={18} />
              Escolher Plano
            </button>
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-[#1A3A4A]">
              <span className="text-2xl">✓</span>
              <span className="text-sm text-[#07131B] font-semibold">Garantia de Satisfação de 7 dias</span>
            </div>
          </div>

          {/* Iluminado */}
          <div 
            onClick={() => handleSelectPlan('illuminated')}
            className="card-mystical space-y-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-[#0A1F2E] border border-[#1A3A4A] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Star className="text-[#19E6FF]" size={24} />
              <h3 className="text-2xl font-bold text-[#19E6FF]">{PLANS.illuminated.name}</h3>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-[#19E6FF]">
                R$ {PLANS.illuminated.price.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-white text-sm">{PLANS.illuminated.description}</p>
            </div>
            <div className="space-y-3">
              {PLANS.illuminated.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                  <span className="text-white text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectPlan('illuminated');
              }}
              className="w-full py-3 bg-gradient-to-r from-[#00FFFF] to-[#19E6FF] text-white rounded-lg hover:from-[#19E6FF] hover:to-[#00FFFF] transition-all font-semibold flex items-center justify-center gap-2 shadow-lg"
            >
              <ArrowRight size={18} />
              Escolher Plano
            </button>
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-[#1A3A4A]">
              <span className="text-2xl">✓</span>
              <span className="text-sm text-white font-semibold">Garantia de Satisfação de 7 dias</span>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Resumo do Plano</h2>
              <p className="text-sm text-slate-600">Revise os detalhes antes de continuar</p>
            </div>
            
            {/* Resumo do Plano */}
            <div className="bg-gradient-to-br from-[#0A1F2E] to-[#1A3A4A] rounded-lg p-6 text-white space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#19E6FF]">Plano Selecionado</span>
                <span className="text-2xl font-bold text-[#00FFFF]">
                  {selectedPlan && PLANS[selectedPlan as keyof typeof PLANS].name}
                </span>
              </div>
              
              <div className="border-t border-[#1A3A4A] pt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#19E6FF]">Mapas Inclusos:</span>
                  <span className="font-bold text-white">{selectedPlan && PLANS[selectedPlan as keyof typeof PLANS].mapsLimit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#19E6FF]">Preço:</span>
                  <span className="text-xl font-bold text-[#00FFFF]">
                    R$ {selectedPlan && PLANS[selectedPlan as keyof typeof PLANS].price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-[#1A3A4A] pt-4">
                <p className="text-xs text-[#19E6FF] mb-2 font-semibold">Recursos Inclusos:</p>
                <ul className="space-y-1">
                  {selectedPlan && PLANS[selectedPlan as keyof typeof PLANS].features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-white flex items-start gap-2">
                      <span className="text-[#00FFFF] mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
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
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
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
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                />
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
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
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
                className="flex-1 px-4 py-2 bg-cyan-400 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Ir para WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Footer */}
      <footer className="border-t border-[#1A3A4A] bg-[#1A0820] mt-16">
        <div className="container py-8 text-center text-white text-sm font-light space-y-2">
          <p>Portal Numerologia 2026 © {new Date().getFullYear()} - Método Pitagórico</p>
          <p className="text-xs text-[#19E6FF]">Desenvolvido por <span className="font-semibold">Artweb Creative</span></p>
        </div>
      </footer>
    </div>
  );
}
