import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Download, RefreshCw, Zap, CheckCircle, Clock, XCircle, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AdminOrdersPanel() {
  const [selectedStatus, setSelectedStatus] = useState<'confirmed' | 'pending' | 'failed' | 'refunded' | 'all'>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [refundReason, setRefundReason] = useState('');

  // Fetch all orders
  const { data: allOrders, isLoading: loadingOrders, refetch: refetchOrders } = trpc.orders.getAll.useQuery();
  
  // Fetch statistics
  const { data: stats, isLoading: loadingStats, refetch: refetchStats } = trpc.orders.getStatistics.useQuery();
  
  // Fetch orders by status
  const { data: statusOrders } = trpc.orders.getByStatus.useQuery(
    { status: selectedStatus as any },
    { enabled: selectedStatus !== 'all' }
  );

  // Process refund mutation
  const { mutate: processRefund, isPending: processingRefund } = trpc.orders.processRefund.useMutation({
    onSuccess: () => {
      refetchOrders();
      refetchStats();
      setSelectedOrderId(null);
      setRefundReason('');
    },
  });

  // Filter orders based on criteria
  const filteredOrders = (selectedStatus === 'all' ? allOrders : statusOrders)?.filter(order => {
    const emailMatch = order.email.toLowerCase().includes(searchEmail.toLowerCase());
    const dateMatch = !startDate && !endDate || (
      new Date(order.createdAt) >= new Date(startDate) &&
      new Date(order.createdAt) <= new Date(endDate)
    );
    return emailMatch && dateMatch;
  }) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'refunded':
        return <RotateCcw className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      confirmed: 'Confirmado',
      pending: 'Pendente',
      failed: 'Falhou',
      refunded: 'Reembolsado',
    };
    return labels[status] || status;
  };

  const getPlanLabel = (plan: string) => {
    const labels: Record<string, string> = {
      navegador: 'Navegador (1 mapa)',
      visionario: 'Visionário (3 mapas)',
      iluminado: 'Iluminado (10 mapas)',
    };
    return labels[plan] || plan;
  };

  const handleRefund = (orderId: string) => {
    processRefund({ orderId, reason: refundReason });
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Confirmados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{stats.confirmedOrders}</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-700">{stats.pendingOrders}</div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-700">Falhados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">{stats.failedOrders}</div>
            </CardContent>
          </Card>

          <Card className="border-cyan-200 bg-cyan-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-cyan-700">Receita Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-700">R$ {stats.totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Revenue by Plan */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Navegador</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">R$ {stats.revenueByPlan.navegador.toFixed(2)}</div>
              <p className="text-xs text-slate-500">{stats.ordersByPlan.navegador} pedidos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Visionário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">R$ {stats.revenueByPlan.visionario.toFixed(2)}</div>
              <p className="text-xs text-slate-500">{stats.ordersByPlan.visionario} pedidos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Iluminado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">R$ {stats.revenueByPlan.iluminado.toFixed(2)}</div>
              <p className="text-xs text-slate-500">{stats.ordersByPlan.iluminado} pedidos</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={selectedStatus} onValueChange={(value: any) => setSelectedStatus(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="failed">Falhou</SelectItem>
                  <SelectItem value="refunded">Reembolsado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                placeholder="Buscar por email..."
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Data Inicial</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Data Final</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => refetchOrders()} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pedidos ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingOrders ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-slate-500">Carregando pedidos...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-slate-500">Nenhum pedido encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-2 px-4">ID</th>
                    <th className="text-left py-2 px-4">Email</th>
                    <th className="text-left py-2 px-4">Plano</th>
                    <th className="text-left py-2 px-4">Valor</th>
                    <th className="text-left py-2 px-4">Método</th>
                    <th className="text-left py-2 px-4">Status</th>
                    <th className="text-left py-2 px-4">Data</th>
                    <th className="text-left py-2 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.orderId} className="border-b hover:bg-slate-50">
                      <td className="py-2 px-4 font-mono text-xs">{order.orderId.slice(0, 8)}...</td>
                      <td className="py-2 px-4">{order.email}</td>
                      <td className="py-2 px-4">{getPlanLabel(order.plan)}</td>
                      <td className="py-2 px-4 font-semibold">R$ {order.amount}</td>
                      <td className="py-2 px-4 capitalize">{order.paymentMethod}</td>
                      <td className="py-2 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <span>{getStatusLabel(order.status)}</span>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-xs text-slate-500">
                        {format(new Date(order.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                      </td>
                      <td className="py-2 px-4">
                        {order.status === 'confirmed' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setSelectedOrderId(order.orderId)}
                          >
                            Reembolsar
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Refund Modal */}
      {selectedOrderId && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-lg text-red-700">Processar Reembolso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">ID do Pedido</label>
              <Input value={selectedOrderId} disabled />
            </div>

            <div>
              <label className="text-sm font-medium">Motivo (opcional)</label>
              <Input
                placeholder="Motivo do reembolso..."
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => handleRefund(selectedOrderId)}
                disabled={processingRefund}
                variant="destructive"
              >
                {processingRefund ? 'Processando...' : 'Confirmar Reembolso'}
              </Button>
              <Button
                onClick={() => {
                  setSelectedOrderId(null);
                  setRefundReason('');
                }}
                variant="outline"
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
