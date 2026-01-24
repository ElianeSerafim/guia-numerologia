import { useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download, TrendingUp } from 'lucide-react';

export default function AdminReportsPanel() {
  // Fetch statistics
  const { data: stats, isLoading } = trpc.orders.getStatistics.useQuery();

  // Prepare data for charts
  const planChartData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: 'Navegador', value: stats.ordersByPlan.navegador, revenue: stats.revenueByPlan.navegador },
      { name: 'Visionário', value: stats.ordersByPlan.visionario, revenue: stats.revenueByPlan.visionario },
      { name: 'Iluminado', value: stats.ordersByPlan.iluminado, revenue: stats.revenueByPlan.iluminado },
    ];
  }, [stats]);

  const statusChartData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: 'Confirmado', value: stats.confirmedOrders, fill: '#10b981' },
      { name: 'Pendente', value: stats.pendingOrders, fill: '#f59e0b' },
      { name: 'Falhou', value: stats.failedOrders, fill: '#ef4444' },
      { name: 'Reembolsado', value: stats.refundedOrders, fill: '#3b82f6' },
    ];
  }, [stats]);

  const paymentMethodsData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: 'Pix', value: stats.paymentMethods.pix },
      { name: 'Cartão', value: stats.paymentMethods.credit_card },
      { name: 'Boleto', value: stats.paymentMethods.boleto },
    ];
  }, [stats]);

  const COLORS = ['#00FFFF', '#FF00FF', '#FFD700', '#00FF00', '#FF6347'];

  const handleExportCSV = async () => {
    // This would call the export function from the backend
    // For now, we'll create a simple CSV from the stats
    if (!stats) return;

    const csv = `Relatório de Pagamentos
Data de Geração: ${new Date().toLocaleDateString('pt-BR')}

RESUMO GERAL
Total de Pedidos: ${stats.totalOrders}
Pedidos Confirmados: ${stats.confirmedOrders}
Pedidos Pendentes: ${stats.pendingOrders}
Pedidos Falhados: ${stats.failedOrders}
Pedidos Reembolsados: ${stats.refundedOrders}
Receita Total: R$ ${stats.totalRevenue.toFixed(2)}

RECEITA POR PLANO
Navegador: R$ ${stats.revenueByPlan.navegador.toFixed(2)} (${stats.ordersByPlan.navegador} pedidos)
Visionário: R$ ${stats.revenueByPlan.visionario.toFixed(2)} (${stats.ordersByPlan.visionario} pedidos)
Iluminado: R$ ${stats.revenueByPlan.iluminado.toFixed(2)} (${stats.ordersByPlan.iluminado} pedidos)

MÉTODOS DE PAGAMENTO
Pix: ${stats.paymentMethods.pix} pedidos
Cartão de Crédito: ${stats.paymentMethods.credit_card} pedidos
Boleto: ${stats.paymentMethods.boleto} pedidos`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', `relatorio-pagamentos-${new Date().toISOString().split('T')[0]}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-slate-500">Carregando relatórios...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Export Button */}
      <div className="flex justify-end">
        <Button onClick={handleExportCSV} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Revenue by Plan Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Receita por Plano</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={planChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="revenue" fill="#00FFFF" name="Receita (R$)" />
              <Bar dataKey="value" fill="#FF00FF" name="Quantidade" yAxisId="right" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Order Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payment Methods Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Métodos de Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentMethodsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00FFFF" name="Quantidade de Pedidos" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Taxa de Conversão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {((stats.confirmedOrders / stats.totalOrders) * 100).toFixed(1)}%
              </div>
              <p className="text-sm text-slate-500 mt-2">
                {stats.confirmedOrders} de {stats.totalOrders} pedidos confirmados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ticket Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                R$ {(stats.totalRevenue / stats.confirmedOrders).toFixed(2)}
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Valor médio por pedido confirmado
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detailed Statistics Table */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Estatísticas Detalhadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600">Total de Pedidos</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">Confirmados</p>
                  <p className="text-2xl font-bold text-green-700">{stats.confirmedOrders}</p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-700">Pendentes</p>
                  <p className="text-2xl font-bold text-yellow-700">{stats.pendingOrders}</p>
                </div>

                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-700">Falhados</p>
                  <p className="text-2xl font-bold text-red-700">{stats.failedOrders}</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">Reembolsados</p>
                  <p className="text-2xl font-bold text-blue-700">{stats.refundedOrders}</p>
                </div>

                <div className="p-4 bg-cyan-50 rounded-lg">
                  <p className="text-sm text-cyan-700">Receita Total</p>
                  <p className="text-2xl font-bold text-cyan-700">R$ {stats.totalRevenue.toFixed(2)}</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700">Pix</p>
                  <p className="text-2xl font-bold text-purple-700">{stats.paymentMethods.pix}</p>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg">
                  <p className="text-sm text-indigo-700">Cartão</p>
                  <p className="text-2xl font-bold text-indigo-700">{stats.paymentMethods.credit_card}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
