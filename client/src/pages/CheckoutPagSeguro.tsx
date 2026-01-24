/**
 * CheckoutPagSeguro Page
 * Dedicated page for PagSeguro payment processing
 */

import { useLocation } from 'wouter';
import CheckoutPagSeguro from '@/components/CheckoutPagSeguro';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPagSeguroPage() {
  const [, setLocation] = useLocation();
  const planId = new URLSearchParams(window.location.search).get('plan') as 'navegador' | 'visionario' | 'iluminado' || 'navegador';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => setLocation('/pricing')}
            variant="ghost"
            className="mb-6 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={18} className="mr-2" />
            Voltar aos Planos
          </Button>

          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Checkout Seguro
          </h1>
          <p className="text-slate-600">
            Complete seu pagamento com segurança usando PagSeguro
          </p>
        </div>

        {/* Checkout Component */}
        <CheckoutPagSeguro
          planId={planId}
          onSuccess={(orderId) => {
            console.log('Payment initiated:', orderId);
          }}
          onError={(error) => {
            console.error('Payment error:', error);
          }}
        />

        {/* Security Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold text-slate-900 mb-1">100% Seguro</h3>
            <p className="text-sm text-slate-600">
              Seus dados são protegidos com criptografia SSL
            </p>
          </div>

          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-slate-900 mb-1">Instantâneo</h3>
            <p className="text-sm text-slate-600">
              Receba acesso imediatamente após o pagamento
            </p>
          </div>

          <div className="text-center">
            <div className="text-3xl mb-2">✓</div>
            <h3 className="font-semibold text-slate-900 mb-1">Garantido</h3>
            <p className="text-sm text-slate-600">
              Garantia de satisfação de 7 dias
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
