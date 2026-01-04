import { useState, useEffect } from 'react';
import { usePaymentManagement } from '@/hooks/usePaymentManagement';
import { Customer, PaymentStatus } from '@/types/payment';
import { Check, X, Trash2, Download, Edit2, Lock, Unlock, Settings } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Admin Dashboard - Gerenciamento de Clientes e Pagamentos
 * 
 * Funcionalidades:
 * - Visualizar todos os clientes
 * - Filtrar por status (Pendente/Aprovado/Rejeitado)
 * - Aprovar/Rejeitar clientes
 * - Visualizar mapas gerados
 * - Exportar dados
 * - Configurar link do WhatsApp
 */

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const {
    customers,
    config,
    getAllCustomers,
    getPendingCustomers,
    getApprovedCustomers,
    approveCustomer,
    rejectCustomer,
    deleteCustomer,
    exportCustomers,
    updateWhatsappLink,
    isLoading
  } = usePaymentManagement();

  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [searchEmail, setSearchEmail] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [newWhatsappLink, setNewWhatsappLink] = useState(config.whatsappLink);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [notes, setNotes] = useState('');

  // Verificar autenticação (apenas admin)
  useEffect(() => {
    const userEmail = localStorage.getItem('numerology_user_email');
    if (userEmail !== 'eliane@artwebcreative.com.br') {
      setLocation('/');
    }
  }, [setLocation]);

  // Filtrar clientes
  const getFilteredCustomers = () => {
    let filtered: Customer[] = [];

    if (filter === 'pending') {
      filtered = getPendingCustomers();
    } else if (filter === 'approved') {
      filtered = getApprovedCustomers();
    } else {
      filtered = getAllCustomers();
    }

    return filtered.filter(c =>
      c.email.toLowerCase().includes(searchEmail.toLowerCase()) ||
      c.fullName.toLowerCase().includes(searchEmail.toLowerCase())
    );
  };

  const handleApprove = (customerId: string) => {
    approveCustomer(customerId, notes);
    setSelectedCustomer(null);
    setNotes('');
  };

  const handleReject = (customerId: string) => {
    rejectCustomer(customerId, notes);
    setSelectedCustomer(null);
    setNotes('');
  };

  const handleSaveWhatsapp = () => {
    if (newWhatsappLink.trim()) {
      updateWhatsappLink(newWhatsappLink);
      setShowSettings(false);
    }
  };

  const filteredCustomers = getFilteredCustomers();
  const pendingCount = getPendingCustomers().length;
  const approvedCount = getApprovedCustomers().length;

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusLabel = (status: PaymentStatus) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'approved':
        return 'Liberado';
      case 'rejected':
        return 'Rejeitado';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-slate-900">Painel Admin</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
            title="Configurações"
          >
            <Settings size={24} />
          </button>
        </div>
      </header>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Configurações</h2>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Link do WhatsApp
              </label>
              <input
                type="text"
                value={newWhatsappLink}
                onChange={(e) => setNewWhatsappLink(e.target.value)}
                placeholder="https://wa.me/..."
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-slate-500 mt-2">
                Formato: https://wa.me/5511999999999
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveWhatsapp}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <section className="container py-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card-mystical">
            <p className="text-slate-600 text-sm">Total de Clientes</p>
            <p className="text-4xl font-bold text-slate-900 mt-2">{customers.length}</p>
          </div>
          <div className="card-mystical">
            <p className="text-slate-600 text-sm">Pendentes de Liberação</p>
            <p className="text-4xl font-bold text-yellow-600 mt-2">{pendingCount}</p>
          </div>
          <div className="card-mystical">
            <p className="text-slate-600 text-sm">Clientes Liberados</p>
            <p className="text-4xl font-bold text-green-600 mt-2">{approvedCount}</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container py-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Buscar por e-mail ou nome..."
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => exportCustomers()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Download size={18} />
            Exportar
          </button>
        </div>

        <div className="flex gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === status
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {status === 'all' && 'Todos'}
              {status === 'pending' && 'Pendentes'}
              {status === 'approved' && 'Liberados'}
              {status === 'rejected' && 'Rejeitados'}
            </button>
          ))}
        </div>
      </section>

      {/* Customers Table */}
      <section className="container py-6">
        <div className="card-mystical overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Nome</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">E-mail</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Plano</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Mapas</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-600">
                    Nenhum cliente encontrado
                  </td>
                </tr>
              ) : (
                filteredCustomers.map(customer => (
                  <tr key={customer.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900 font-medium">{customer.fullName}</td>
                    <td className="py-3 px-4 text-slate-600">{customer.email}</td>
                    <td className="py-3 px-4 text-slate-600">
                      {customer.plan === 'navigator' && 'Navegador'}
                      {customer.plan === 'visionary' && 'Visionário'}
                      {customer.plan === 'illuminated' && 'Iluminado'}
                      {customer.plan === 'premium' && 'Premium'}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {customer.mapsGenerated} / {customer.mapsLimit === Infinity ? '∞' : customer.mapsLimit}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(customer.status)}`}>
                        {getStatusLabel(customer.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4 space-x-2">
                      {customer.status === 'pending' && (
                        <>
                          <button
                            onClick={() => setSelectedCustomer(customer)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                            title="Liberar"
                          >
                            <Unlock size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCustomer(customer);
                              setNotes('');
                            }}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Rejeitar"
                          >
                            <X size={18} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteCustomer(customer.id)}
                        className="p-1 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                        title="Deletar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Action Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {selectedCustomer.status === 'pending' ? 'Liberar Cliente' : 'Ação'}
            </h2>
            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <p className="text-sm text-slate-600">Nome: <span className="font-semibold text-slate-900">{selectedCustomer.fullName}</span></p>
              <p className="text-sm text-slate-600">E-mail: <span className="font-semibold text-slate-900">{selectedCustomer.email}</span></p>
              <p className="text-sm text-slate-600">Plano: <span className="font-semibold text-slate-900">{selectedCustomer.plan}</span></p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Notas (opcional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Adicione notas sobre esta ação..."
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-20"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedCustomer(null);
                  setNotes('');
                }}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              {selectedCustomer.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleReject(selectedCustomer.id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Rejeitar
                  </button>
                  <button
                    onClick={() => handleApprove(selectedCustomer.id)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Liberar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
