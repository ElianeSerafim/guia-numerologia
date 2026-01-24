/**
 * Order History Component
 * Displays customer's payment history and order status
 */

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Download, Eye, AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface OrderDetailsDialogProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
}

function OrderDetailsDialog({ order, isOpen, onClose }: OrderDetailsDialogProps) {
  if (!order) return null;

  const statusColors: Record<string, string> = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-blue-100 text-blue-800',
  };

  const statusIcons: Record<string, any> = {
    confirmed: <CheckCircle2 className="w-4 h-4" />,
    pending: <Clock className="w-4 h-4" />,
    failed: <XCircle className="w-4 h-4" />,
    refunded: <AlertCircle className="w-4 h-4" />,
  };

  const planNames: Record<string, string> = {
    navegador: 'Navegador',
    visionario: 'Visionário',
    iluminado: 'Iluminado',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido</DialogTitle>
          <DialogDescription>ID: {order.orderId}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Status:</span>
            <Badge className={`flex items-center gap-1 ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
              {statusIcons[order.status]}
              {order.status === 'confirmed' && 'Confirmado'}
              {order.status === 'pending' && 'Pendente'}
              {order.status === 'failed' && 'Falhou'}
              {order.status === 'refunded' && 'Reembolsado'}
            </Badge>
          </div>

          {/* Plan */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Plano:</span>
            <span className="text-sm font-semibold text-slate-900">{planNames[order.plan] || order.plan}</span>
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Valor:</span>
            <span className="text-sm font-semibold text-slate-900">R$ {parseFloat(order.amount).toFixed(2)}</span>
          </div>

          {/* Payment Method */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Método:</span>
            <span className="text-sm font-semibold text-slate-900">
              {order.paymentMethod === 'pix' && 'Pix'}
              {order.paymentMethod === 'credit_card' && 'Cartão de Crédito'}
              {order.paymentMethod === 'boleto' && 'Boleto'}
            </span>
          </div>

          {/* Maps Limit */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Mapas:</span>
            <span className="text-sm font-semibold text-slate-900">{order.mapsLimit}</span>
          </div>

          {/* Created At */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Data:</span>
            <span className="text-sm text-slate-600">
              {new Date(order.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>

          {/* Confirmed At */}
          {order.confirmedAt && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Confirmado em:</span>
              <span className="text-sm text-slate-600">
                {new Date(order.confirmedAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
          )}

          {/* PagSeguro Reference */}
          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 mb-2">Referência PagSeguro:</p>
            <p className="text-xs font-mono bg-slate-100 p-2 rounded break-all">{order.pagseguroReference}</p>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch orders
  const { data: orders, isLoading, error } = trpc.orders.getByEmail.useQuery();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pedidos</CardTitle>
          <CardDescription>Seus pagamentos e status</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
            <p className="text-sm text-slate-600">Carregando pedidos...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pedidos</CardTitle>
          <CardDescription>Seus pagamentos e status</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-2 text-red-600">
            <AlertCircle className="w-8 h-8" />
            <p className="text-sm">Erro ao carregar pedidos</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pedidos</CardTitle>
          <CardDescription>Seus pagamentos e status</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-slate-600 mb-4">Você ainda não realizou nenhum pedido</p>
            <Button className="bg-cyan-500 hover:bg-cyan-600">
              Ver Planos
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const statusColors: Record<string, string> = {
    confirmed: 'bg-green-50 border-green-200',
    pending: 'bg-yellow-50 border-yellow-200',
    failed: 'bg-red-50 border-red-200',
    refunded: 'bg-blue-50 border-blue-200',
  };

  const statusBadges: Record<string, string> = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-blue-100 text-blue-800',
  };

  const statusLabels: Record<string, string> = {
    confirmed: 'Confirmado',
    pending: 'Pendente',
    failed: 'Falhou',
    refunded: 'Reembolsado',
  };

  const planNames: Record<string, string> = {
    navegador: 'Navegador',
    visionario: 'Visionário',
    iluminado: 'Iluminado',
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pedidos</CardTitle>
          <CardDescription>Total de {orders.length} pedido(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`p-4 border rounded-lg transition-colors ${statusColors[order.status] || 'bg-slate-50 border-slate-200'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Order ID and Date */}
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        Pedido #{order.orderId.substring(0, 8)}...
                      </p>
                      <Badge className={`text-xs ${statusBadges[order.status] || 'bg-gray-100 text-gray-800'}`}>
                        {statusLabels[order.status] || order.status}
                      </Badge>
                    </div>

                    {/* Plan and Amount */}
                    <p className="text-sm text-slate-600 mb-2">
                      <span className="font-semibold">{planNames[order.plan] || order.plan}</span>
                      {' • '}
                      <span>R$ {parseFloat(order.amount).toFixed(2)}</span>
                      {' • '}
                      <span>{order.mapsLimit} mapa(s)</span>
                    </p>

                    {/* Date */}
                    <p className="text-xs text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowDetails(true);
                      }}
                      className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {order.status === 'confirmed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-600 hover:text-slate-700 hover:bg-slate-100"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
}
