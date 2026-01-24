/**
 * CheckoutPagSeguro Component
 * Handles payment processing with PagSeguro
 * Supports: Pix, Credit/Debit Card, Boleto
 */

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle, CheckCircle, CreditCard, Smartphone, FileText } from 'lucide-react';
import { PLANS } from '@/types/payment';

interface CheckoutPagSeguroProps {
  planId: 'navegador' | 'visionario' | 'iluminado';
  onSuccess?: (orderId: string) => void;
  onError?: (error: string) => void;
}

export default function CheckoutPagSeguro({ planId, onSuccess, onError }: CheckoutPagSeguroProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'boleto'>('pix');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const plan = PLANS[planId as keyof typeof PLANS];
  const initiatePagSeguro = trpc.payment.initiatePagSeguro.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate inputs
      if (!email || !name) {
        throw new Error('Por favor, preencha todos os campos');
      }

      // Call tRPC mutation to initiate payment
      const response = await initiatePagSeguro.mutateAsync({
        email,
        name,
        planId,
        planName: plan.name,
        amount: plan.price,
        paymentMethod,
      });

      if (response.success && response.paymentLink) {
        setOrderId(response.orderId);
        setSuccess(true);
        onSuccess?.(response.orderId);

        // Redirect to PagSeguro payment page after 2 seconds
        setTimeout(() => {
          window.location.href = response.paymentLink;
        }, 2000);
      } else {
        throw new Error('Falha ao iniciar pagamento');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao processar pagamento';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse" />
              <CheckCircle className="relative h-16 w-16 text-green-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">Pagamento Iniciado!</h2>
          <p className="text-slate-600 mb-4">
            Você será redirecionado para completar o pagamento em breve...
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-700">
              <strong>ID do Pedido:</strong> {orderId}
            </p>
            <p className="text-sm text-green-700 mt-2">
              Método de Pagamento: <strong>{getPaymentMethodLabel(paymentMethod)}</strong>
            </p>
          </div>

          <Button
            onClick={() => window.location.href = '/pricing'}
            variant="outline"
            className="w-full"
          >
            Voltar aos Planos
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Checkout - {plan.name}</CardTitle>
        <CardDescription>
          Escolha seu método de pagamento preferido
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plan Summary */}
          <div className="bg-gradient-to-br from-[#0A1F2E] to-[#1A3A4A] rounded-lg p-4 text-white">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-[#19E6FF]">Plano</span>
              <span className="font-bold text-[#00FFFF]">{plan.name}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-[#19E6FF]">Mapas Inclusos</span>
              <span className="font-bold text-white">{plan.mapsLimit}</span>
            </div>
            <div className="border-t border-[#1A3A4A] pt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#19E6FF]">Valor Total</span>
                <span className="text-2xl font-bold text-[#00FFFF]">
                  R$ {plan.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Método de Pagamento
            </label>

            <div className="space-y-2">
              {/* Pix Option */}
              <label className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
                style={{
                  borderColor: paymentMethod === 'pix' ? '#4F46E5' : '#E2E8F0',
                  backgroundColor: paymentMethod === 'pix' ? '#EEF2FF' : 'transparent',
                }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pix"
                  checked={paymentMethod === 'pix'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'pix' | 'credit_card' | 'boleto')}
                  className="w-4 h-4"
                  disabled={isLoading}
                />
                <Smartphone size={20} className="ml-3 text-indigo-600" />
                <div className="ml-3">
                  <p className="font-semibold text-slate-900">Pix</p>
                  <p className="text-xs text-slate-600">Instantâneo</p>
                </div>
              </label>

              {/* Credit Card Option */}
              <label className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
                style={{
                  borderColor: paymentMethod === 'credit_card' ? '#4F46E5' : '#E2E8F0',
                  backgroundColor: paymentMethod === 'credit_card' ? '#EEF2FF' : 'transparent',
                }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'pix' | 'credit_card' | 'boleto')}
                  className="w-4 h-4"
                  disabled={isLoading}
                />
                <CreditCard size={20} className="ml-3 text-indigo-600" />
                <div className="ml-3">
                  <p className="font-semibold text-slate-900">Cartão de Crédito/Débito</p>
                  <p className="text-xs text-slate-600">Visa, Mastercard, Elo</p>
                </div>
              </label>

              {/* Boleto Option */}
              <label className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
                style={{
                  borderColor: paymentMethod === 'boleto' ? '#4F46E5' : '#E2E8F0',
                  backgroundColor: paymentMethod === 'boleto' ? '#EEF2FF' : 'transparent',
                }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="boleto"
                  checked={paymentMethod === 'boleto'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'pix' | 'credit_card' | 'boleto')}
                  className="w-4 h-4"
                  disabled={isLoading}
                />
                <FileText size={20} className="ml-3 text-indigo-600" />
                <div className="ml-3">
                  <p className="font-semibold text-slate-900">Boleto Bancário</p>
                  <p className="text-xs text-slate-600">Vencimento em 3 dias</p>
                </div>
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-red-900">Erro</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !email || !name}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              `Pagar R$ ${plan.price.toFixed(2).replace('.', ',')}`
            )}
          </Button>

          {/* Guarantee Badge */}
          <div className="text-center pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-600">
              ✓ Garantia de Satisfação de 7 dias
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

/**
 * Helper function to get payment method label
 */
function getPaymentMethodLabel(method: string): string {
  const labels: Record<string, string> = {
    pix: 'Pix',
    credit_card: 'Cartão de Crédito/Débito',
    boleto: 'Boleto Bancário',
  };
  return labels[method] || 'Desconhecido';
}
