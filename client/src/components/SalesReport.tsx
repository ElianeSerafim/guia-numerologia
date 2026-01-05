/**
 * SalesReport Component
 * Exibe relatório de vendas com gráficos e métricas
 */

import { useSalesManagement } from '@/hooks/useSalesManagement';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, Clock } from 'lucide-react';

export default function SalesReport() {
  const { generateSalesReport } = useSalesManagement();
  const report = generateSalesReport();

  const COLORS = ['#4C1D95', '#7C3AED', '#A78BFA', '#D8B4FE'];

  const planData = [
    { name: 'Navegador', value: report.planBreakdown.navigator },
    { name: 'Visionário', value: report.planBreakdown.visionary },
    { name: 'Iluminado', value: report.planBreakdown.illuminated },
  ];

  return (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total de Receita */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 border border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-indigo-600">Receita Total</p>
              <p className="text-3xl font-bold text-indigo-900 mt-2">
                R$ {report.totalRevenue.toFixed(2)}
              </p>
            </div>
            <DollarSign size={40} className="text-indigo-300" />
          </div>
        </div>

        {/* Total de Vendas */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-purple-600">Total de Vendas</p>
              <p className="text-3xl font-bold text-purple-900 mt-2">
                {report.totalSales}
              </p>
            </div>
            <ShoppingCart size={40} className="text-purple-300" />
          </div>
        </div>

        {/* Ticket Médio */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-6 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-amber-600">Ticket Médio</p>
              <p className="text-3xl font-bold text-amber-900 mt-2">
                R$ {report.averageOrderValue.toFixed(2)}
              </p>
            </div>
            <TrendingUp size={40} className="text-amber-300" />
          </div>
        </div>

        {/* Pendentes */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-red-600">Pendentes</p>
              <p className="text-3xl font-bold text-red-900 mt-2">
                {report.pendingApprovals}
              </p>
            </div>
            <Clock size={40} className="text-red-300" />
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Receita por Data */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Receita por Data</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={report.revenueByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#4C1D95" name="Receita (R$)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Distribuição por Plano */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Vendas por Plano</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={planData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {planData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Vendas por Data */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Número de Vendas por Data</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={report.revenueByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#7C3AED" name="Número de Vendas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status de Vendas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Status das Vendas</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Aprovadas</span>
              <span className="text-2xl font-bold text-green-600">{report.approvedSales}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Pendentes</span>
              <span className="text-2xl font-bold text-yellow-600">{report.pendingApprovals}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Rejeitadas</span>
              <span className="text-2xl font-bold text-red-600">{report.rejectedSales}</span>
            </div>
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-slate-900">
                  {report.approvedSales + report.pendingApprovals + report.rejectedSales}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Cupons */}
      {report.topCoupons.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Top Cupons Utilizados</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Código</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Usos</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Desconto Total</th>
                </tr>
              </thead>
              <tbody>
                {report.topCoupons.map((coupon) => (
                  <tr key={coupon.code} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-semibold text-slate-900">{coupon.code}</td>
                    <td className="py-3 px-4 text-slate-600">{coupon.usedCount}</td>
                    <td className="py-3 px-4 text-slate-600">R$ {coupon.totalDiscount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
