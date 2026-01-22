/**
 * PaymentHistory Component
 * Exibe histórico de pagamentos
 */

import { useState } from 'react';
import { useSalesManagement } from '@/hooks/useSalesManagement';
import { Download, Filter } from 'lucide-react';

export default function PaymentHistory() {
  const { paymentHistory, getPaymentHistory } = useSalesManagement();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchEmail, setSearchEmail] = useState('');

  const filteredPayments = getPaymentHistory(filter === 'all' ? undefined : filter).filter(
    (p) =>
      p.customerEmail.toLowerCase().includes(searchEmail.toLowerCase()) ||
      p.customerName.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const getPlanLabel = (plan: string) => {
    switch (plan) {
      case 'navigator':
        return 'Navegador';
      case 'visionary':
        return 'Visionário';
      case 'illuminated':
        return 'Iluminado';
      default:
        return plan;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-slate-100 text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
      case 'pending':
        return 'Pendente';
      default:
        return status;
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Data',
      'Cliente',
      'Email',
      'Plano',
      'Valor Original',
      'Desconto',
      'Valor Final',
      'Cupom',
      'Status',
    ];

    const rows = filteredPayments.map((p) => [
      new Date(p.createdAt).toLocaleDateString('pt-BR'),
      p.customerName,
      p.customerEmail,
      getPlanLabel(p.plan),
      `R$ ${p.amount.toFixed(2)}`,
      `R$ ${p.discountApplied.toFixed(2)}`,
      `R$ ${p.finalAmount.toFixed(2)}`,
      p.couponCode || '-',
      getStatusLabel(p.status),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historico-pagamentos-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Histórico de Pagamentos</h2>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download size={20} />
          Exportar CSV
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Buscar por email ou nome..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="flex-1 min-w-64 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex gap-2">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === f
                    ? 'bg-cyan-400 text-white'
                    : 'bg-slate-200 text-white hover:bg-slate-300'
                }`}
              >
                {f === 'all'
                  ? 'Todos'
                  : f === 'pending'
                  ? 'Pendentes'
                  : f === 'approved'
                  ? 'Aprovados'
                  : 'Rejeitados'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabela de Pagamentos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredPayments.length === 0 ? (
          <div className="p-8 text-center text-slate-600">
            Nenhum pagamento encontrado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-white">Data</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Cliente</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Plano</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Valor</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Desconto</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Cupom</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-white text-sm">
                      {new Date(payment.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-white font-semibold">
                      {payment.customerName}
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-sm">{payment.customerEmail}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                        {getPlanLabel(payment.plan)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      R$ {payment.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {payment.discountApplied > 0 ? (
                        <span className="text-green-600 font-semibold">
                          -R$ {payment.discountApplied.toFixed(2)}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-3 px-4 text-white font-semibold">
                      R$ {payment.finalAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {payment.couponCode ? (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm font-semibold">
                          {payment.couponCode}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                          payment.status
                        )}`}
                      >
                        {getStatusLabel(payment.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-slate-600 text-sm mb-2">Total de Registros</p>
          <p className="text-3xl font-bold text-white">{filteredPayments.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-slate-600 text-sm mb-2">Valor Total</p>
          <p className="text-3xl font-bold text-white">
            R$ {filteredPayments.reduce((sum, p) => sum + p.finalAmount, 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-slate-600 text-sm mb-2">Desconto Total Concedido</p>
          <p className="text-3xl font-bold text-green-600">
            R$ {filteredPayments.reduce((sum, p) => sum + p.discountApplied, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
