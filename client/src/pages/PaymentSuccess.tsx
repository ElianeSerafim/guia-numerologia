/**
 * PaymentSuccess Page
 * Displays payment confirmation and order details after successful payment
 */

import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Copy, Download, Home, Mail, Clock, DollarSign, Zap } from 'lucide-react';
import { PLANS } from '@/types/payment';

interface OrderDetails {
  orderId: string;
  email: string;
  name: string;
  planId: 'navigator' | 'visionary' | 'illuminated';
  planName: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
}

export default function PaymentSuccess() {
  const [, setLocation] = useLocation();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order details from URL params or localStorage
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('orderId');
    const email = params.get('email');
    const planId = params.get('plan') as 'navigator' | 'visionary' | 'illuminated';

    if (orderId && email && planId) {
      // Get stored order details from localStorage
      const storedOrder = localStorage.getItem(`order_${orderId}`);
      if (storedOrder) {
        setOrderDetails(JSON.parse(storedOrder));
      } else {
        // Create order details from params
        const plan = PLANS[planId];
        setOrderDetails({
          orderId,
          email,
          name: params.get('name') || 'Cliente',
          planId,
          planName: plan.name,
          amount: plan.price,
          paymentMethod: params.get('method') || 'Pix',
          status: 'confirmed',
          timestamp: new Date().toLocaleString('pt-BR'),
        });
      }
    }

    setLoading(false);
  }, []);

  const handleCopyOrderId = () => {
    if (orderDetails?.orderId) {
      navigator.clipboard.writeText(orderDetails.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadReceipt = () => {
    if (!orderDetails) return;

    const receiptContent = `
RECIBO DE PAGAMENTO - BÚSSOLA NUMEROLÓGICA 2026
================================================

ID do Pedido: ${orderDetails.orderId}
Data: ${orderDetails.timestamp}

CLIENTE
-------
Nome: ${orderDetails.name}
Email: ${orderDetails.email}

PLANO ADQUIRIDO
---------------
Plano: ${orderDetails.planName}
Mapas Inclusos: ${PLANS[orderDetails.planId].mapsLimit}
Valor: R$ ${orderDetails.amount.toFixed(2).replace('.', ',')}

MÉTODO DE PAGAMENTO
-------------------
${orderDetails.paymentMethod}

STATUS
------
✓ Pagamento Confirmado

PRÓXIMOS PASSOS
---------------
1. Verifique seu email para instruções de acesso
2. Acesse o portal em https://seu-dominio.manus.space
3. Comece a gerar seus mapas numerológicos

GARANTIA
--------
Garantia de satisfação de 7 dias
Reembolso total se não estiver satisfeito

================================================
Obrigado por escolher a Bússola Numerológica!
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(receiptContent));
    element.setAttribute('download', `recibo_${orderDetails.orderId}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando detalhes do pedido...</p>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-8 text-center">
            <p className="text-slate-600 mb-6">Nenhum pedido encontrado</p>
            <Button onClick={() => setLocation('/pricing')} className="w-full">
              Voltar aos Planos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse" />
              <CheckCircle className="relative h-20 w-20 text-green-500" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Pagamento Confirmado!
          </h1>
          <p className="text-lg text-slate-600">
            Sua compra foi processada com sucesso
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-8 border-2 border-green-200 bg-green-50">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle size={24} />
              Detalhes do Pedido
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-8 pb-8 space-y-6">
            {/* Order ID */}
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="text-sm text-slate-600 mb-2">ID do Pedido</p>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xl font-bold text-slate-900 break-all">
                  {orderDetails.orderId}
                </p>
                <button
                  onClick={handleCopyOrderId}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Copy size={16} />
                  <span className="text-sm">{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            {/* Customer Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                  <Mail size={16} />
                  Email
                </p>
                <p className="font-semibold text-slate-900">{orderDetails.email}</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                  <Clock size={16} />
                  Data e Hora
                </p>
                <p className="font-semibold text-slate-900">{orderDetails.timestamp}</p>
              </div>
            </div>

            {/* Plan Details */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Zap size={20} className="text-indigo-600" />
                Plano Adquirido
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Plano:</span>
                  <span className="font-bold text-indigo-600">{orderDetails.planName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Mapas Inclusos:</span>
                  <span className="font-bold text-slate-900">
                    {PLANS[orderDetails.planId].mapsLimit}
                  </span>
                </div>

                <div className="border-t border-indigo-200 pt-3 flex justify-between items-center">
                  <span className="text-slate-700 font-semibold">Valor Pago:</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    R$ {orderDetails.amount.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="text-sm text-slate-600 mb-2">Método de Pagamento</p>
              <p className="font-semibold text-slate-900">{orderDetails.paymentMethod}</p>
            </div>

            {/* Features Included */}
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="text-sm text-slate-600 mb-3 font-semibold">Recursos Inclusos:</p>
              <ul className="space-y-2">
                {PLANS[orderDetails.planId].features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader className="bg-blue-100 border-b border-blue-200">
            <CardTitle className="text-blue-900">Próximos Passos</CardTitle>
          </CardHeader>

          <CardContent className="pt-8 pb-8">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Verifique seu Email</p>
                  <p className="text-slate-600 text-sm">
                    Enviamos instruções de acesso para {orderDetails.email}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Acesse o Portal</p>
                  <p className="text-slate-600 text-sm">
                    Faça login com suas credenciais para começar
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Gere seus Mapas</p>
                  <p className="text-slate-600 text-sm">
                    Comece a explorar a numerologia pitagórica
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guarantee Badge */}
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardContent className="pt-6 pb-6 text-center">
            <p className="text-amber-900 font-semibold mb-2">✓ Garantia de Satisfação de 7 Dias</p>
            <p className="text-sm text-amber-800">
              Se não estiver satisfeito, devolvemos 100% do seu dinheiro
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            onClick={handleDownloadReceipt}
            variant="outline"
            className="w-full py-6 text-base font-semibold flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Baixar Recibo
          </Button>

          <Button
            onClick={() => setLocation('/')}
            className="w-full py-6 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Voltar ao Início
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-12 text-center text-slate-600 text-sm">
          <p className="mb-2">Dúvidas? Entre em contato conosco</p>
          <p>Email: suporte@bussola-numerologica.com</p>
        </div>
      </div>
    </div>
  );
}
