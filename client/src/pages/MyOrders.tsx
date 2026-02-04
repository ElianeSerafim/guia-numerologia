import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Package, Calendar, CreditCard, DollarSign, Filter } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * MyOrders - Histórico de Pedidos do Usuário
 * 
 * Design: Consistente com o design místico do projeto
 * Funcionalidades:
 * - Lista todos os pedidos do usuário logado
 * - Filtros por status (todos, pendente, aprovado, cancelado)
 * - Exibe: data, plano, valor, status, método de pagamento
 * - Link para voltar à home
 */

type OrderStatus = 'all' | 'pending' | 'approved' | 'cancelled';

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendente',
  approved: 'Aprovado',
  cancelled: 'Cancelado',
  processing: 'Processando',
  completed: 'Concluído',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  approved: 'bg-green-100 text-green-800 border-green-300',
  cancelled: 'bg-red-100 text-red-800 border-red-300',
  processing: 'bg-blue-100 text-blue-800 border-blue-300',
  completed: 'bg-purple-100 text-purple-800 border-purple-300',
};

const PLAN_LABELS: Record<string, string> = {
  basic: 'Básico - 1 Mapa',
  standard: 'Padrão - 5 Mapas',
  premium: 'Premium - 20 Mapas',
  unlimited: 'Ilimitado',
};

export default function MyOrders() {
  const [, setLocation] = useLocation();
  const [statusFilter, setStatusFilter] = useState<OrderStatus>('all');
  
  const { data: orders, isLoading, error } = trpc.orders.getByEmail.useQuery();

  // Filtrar pedidos por status
  const filteredOrders = orders?.filter(order => {
    if (statusFilter === 'all') return true;
    return order.status === statusFilter;
  });

  // Formatar data
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Formatar valor
  const formatCurrency = (value: string) => {
    const numValue = parseFloat(value);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numValue);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto" />
          <p className="text-slate-600">Carregando seus pedidos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <Package className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Erro ao Carregar Pedidos</h2>
            <p className="text-slate-600">
              Não foi possível carregar seu histórico de pedidos. Por favor, tente novamente mais tarde.
            </p>
            <Button onClick={() => setLocation('/')} className="w-full">
              Voltar à Página Inicial
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-slate-900">Meus Pedidos</h1>
          <Button variant="outline" onClick={() => setLocation('/')}>
            Voltar
          </Button>
        </div>
      </header>

      {/* Content */}
      <section className="container py-8 space-y-6">
        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtrar por Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                Todos ({orders?.length || 0})
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                Pendentes ({orders?.filter(o => o.status === 'pending').length || 0})
              </Button>
              <Button
                variant={statusFilter === 'approved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('approved')}
              >
                Aprovados ({orders?.filter(o => o.status === 'approved').length || 0})
              </Button>
              <Button
                variant={statusFilter === 'cancelled' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('cancelled')}
              >
                Cancelados ({orders?.filter(o => o.status === 'cancelled').length || 0})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Pedidos */}
        {filteredOrders && filteredOrders.length > 0 ? (
          <div className="grid gap-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Coluna Esquerda */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">
                            {PLAN_LABELS[order.plan] || order.plan}
                          </h3>
                          <p className="text-sm text-slate-600">Pedido #{order.orderId}</p>
                        </div>
                        <Badge className={STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-800'}>
                          {STATUS_LABELS[order.status] || order.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CreditCard className="w-4 h-4" />
                        <span>{order.paymentMethod || 'Não informado'}</span>
                      </div>
                    </div>

                    {/* Coluna Direita */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">
                          {formatCurrency(order.amount)}
                        </span>
                      </div>

                      {order.pagseguroReference && (
                        <div className="text-sm text-slate-600">
                          <span className="font-semibold">Referência PagSeguro:</span>
                          <br />
                          <span className="font-mono text-xs">{order.pagseguroReference}</span>
                        </div>
                      )}

                      {order.confirmedAt && (
                        <div className="text-sm text-green-600">
                          <span className="font-semibold">Confirmado em:</span>
                          <br />
                          <span>{formatDate(order.confirmedAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto">
                <Package className="w-8 h-8 text-slate-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Nenhum Pedido Encontrado</h2>
              <p className="text-slate-600">
                {statusFilter === 'all'
                  ? 'Você ainda não fez nenhum pedido.'
                  : `Você não tem pedidos com status "${STATUS_LABELS[statusFilter] || statusFilter}".`}
              </p>
              <Button onClick={() => setLocation('/pricing')}>
                Ver Planos Disponíveis
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
