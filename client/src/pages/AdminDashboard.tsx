import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { usePaymentManagement } from '@/hooks/usePaymentManagement';
import { useAdminManagement } from '@/hooks/useAdminManagement';
import { Customer } from '@/types/payment';
import { Check, X, Trash2, Download, Edit2, Lock, Unlock, Settings, Users, Plus, BarChart3, Tag, History } from 'lucide-react';
import { sendAccessApprovedEmail, sendAccessRejectedEmail } from '@/lib/emailService';
import SalesReport from '@/components/SalesReport';
import CouponManagement from '@/components/CouponManagement';
import PaymentHistory from '@/components/PaymentHistory';

/**
 * Admin Dashboard - Gerenciamento de Clientes e Pagamentos
 * 
 * Funcionalidades:
 * - Visualizar todos os clientes
 * - Filtrar por status (Pendente/Aprovado/Rejeitado)
 * - Aprovar/Rejeitar clientes
 * - Gerenciar usuários admin
 * - Exportar dados
 * - Configurar link do WhatsApp
 */

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const userEmail = localStorage.getItem('numerology_user_email');
  const { isAdmin, isSuperAdmin, admins, addAdmin, removeAdmin, toggleAdminStatus } = useAdminManagement(userEmail);
  
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
  const [showAdminManagement, setShowAdminManagement] = useState(false);
  const [activeTab, setActiveTab] = useState<'customers' | 'reports' | 'coupons' | 'history'>('customers');
  const [newWhatsappLink, setNewWhatsappLink] = useState(config.whatsappLink);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [notes, setNotes] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [adminError, setAdminError] = useState('');

  // Verificar autenticação (apenas admin)
  useEffect(() => {
    // Permitir acesso ao admin se for super admin ou admin
    // Verificar se eh super admin por email
    const userEmail = localStorage.getItem('numerology_user_email');
    if (userEmail !== 'eliane@artwebcreative.com.br' && !isAdmin) {
      setLocation('/');
    }
  }, [isAdmin, setLocation]);

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

  const handleApprove = async (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      approveCustomer(customerId, notes);
      
      const planName = customer.plan === 'navigator' ? 'Navegador' : 
                       customer.plan === 'visionary' ? 'Visionario' :
                       customer.plan === 'illuminated' ? 'Iluminado' : 'Premium';
      
      await sendAccessApprovedEmail(
        customer.email,
        customer.fullName,
        planName,
        customer.mapsLimit
      );
    }
    setSelectedCustomer(null);
    setNotes('');
  };

  const handleReject = async (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      rejectCustomer(customerId, notes);
      await sendAccessRejectedEmail(customer.email, customer.fullName, notes);
    }
    setSelectedCustomer(null);
    setNotes('');
  };

  const handleSaveWhatsapp = () => {
    if (newWhatsappLink.trim()) {
      updateWhatsappLink(newWhatsappLink);
      setShowSettings(false);
    }
  };

  const handleAddAdmin = () => {
    setAdminError('');
    
    if (!newAdminEmail.trim() || !newAdminName.trim()) {
      setAdminError('Email e nome são obrigatórios');
      return;
    }

    if (!newAdminEmail.includes('@')) {
      setAdminError('Email inválido');
      return;
    }

    const success = addAdmin(newAdminEmail, newAdminName);
    if (!success) {
      setAdminError('Este email já está cadastrado como admin');
      return;
    }

    setNewAdminEmail('');
    setNewAdminName('');
  };

  const filteredCustomers = getFilteredCustomers();

  // Permitir acesso se for super admin por email
  const isSuperAdminByEmail = userEmail === 'eliane@artwebcreative.com.br';
  
  if (!isSuperAdminByEmail && !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Painel Administrativo</h1>
            <p className="text-slate-600 mt-1">Gerenciar clientes e configurações</p>
          </div>
          <div className="flex items-center gap-3">
            {isSuperAdmin && (
              <button
                onClick={() => setShowAdminManagement(!showAdminManagement)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Users size={20} />
                Admins ({admins.length})
              </button>
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors"
            >
              <Settings size={20} />
              Configurações
            </button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Admin Management Section */}
        {showAdminManagement && isSuperAdmin && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Gerenciar Usuários Admin</h2>
            
            {/* Add New Admin */}
            <div className="bg-slate-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-slate-900 mb-3">Adicionar Novo Admin</h3>
              {adminError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-3">
                  {adminError}
                </div>
              )}
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Email do novo admin"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleAddAdmin}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus size={20} />
                  Adicionar
                </button>
              </div>
            </div>

            {/* Admin List */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Nome</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Tipo</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-900">{admin.name}</td>
                      <td className="py-3 px-4 text-slate-600">{admin.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          admin.role === 'super_admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          admin.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {admin.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        {admin.role !== 'super_admin' && (
                          <>
                            <button
                              onClick={() => toggleAdminStatus(admin.id)}
                              className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                              title={admin.isActive ? 'Desativar' : 'Ativar'}
                            >
                              {admin.isActive ? (
                                <Lock size={18} className="text-slate-600" />
                              ) : (
                                <Unlock size={18} className="text-slate-600" />
                              )}
                            </button>
                            <button
                              onClick={() => removeAdmin(admin.id)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                              title="Remover"
                            >
                              <Trash2 size={18} className="text-red-600" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Section */}
        {showSettings && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Configurações</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Link do WhatsApp
                </label>
                <input
                  type="text"
                  value={newWhatsappLink}
                  onChange={(e) => setNewWhatsappLink(e.target.value)}
                  placeholder="https://wa.me/5511999999999"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-sm text-slate-600 mt-1">Formato: https://wa.me/5511999999999</p>
              </div>
              <button
                onClick={handleSaveWhatsapp}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Salvar Configurações
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6 border-b border-slate-200">
          <div className="flex gap-0">
            <button
              onClick={() => setActiveTab('customers')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition-colors ${
                activeTab === 'customers'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users size={20} />
              Clientes
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition-colors ${
                activeTab === 'reports'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 size={20} />
              Relatórios
            </button>
            <button
              onClick={() => setActiveTab('coupons')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition-colors ${
                activeTab === 'coupons'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Tag size={20} />
              Cupons
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <History size={20} />
              Histórico
            </button>
          </div>
        </div>

        {/* Filters */}
        {activeTab === 'customers' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Buscar por email ou nome..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="flex-1 min-w-64 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex gap-2">
              {(['pending', 'approved', 'rejected', 'all'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    filter === f
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                  }`}
                >
                  {f === 'pending' ? 'Pendentes' : f === 'approved' ? 'Aprovados' : f === 'rejected' ? 'Rejeitados' : 'Todos'}
                </button>
              ))}
            </div>
            <button
              onClick={() => exportCustomers()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Download size={20} />
              Exportar
            </button>
          </div>
        </div>
        )}

        {/* Relatórios Tab */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <SalesReport />
          </div>
        )}

        {/* Cupons Tab */}
        {activeTab === 'coupons' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <CouponManagement />
          </div>
        )}

        {/* Histórico Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <PaymentHistory />
          </div>
        )}

        {/* Customers Table */}
        {activeTab === 'customers' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Nome</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Plano</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Data</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-600">
                      Nenhum cliente encontrado
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-900">{customer.fullName}</td>
                      <td className="py-3 px-4 text-slate-600">{customer.email}</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                          {customer.plan === 'navigator' ? 'Navegador' :
                           customer.plan === 'visionary' ? 'Visionário' :
                           customer.plan === 'illuminated' ? 'Iluminado' : 'Premium'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          customer.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : customer.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {customer.status === 'approved' ? 'Aprovado' :
                           customer.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-sm">
                        {new Date(customer.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        {customer.status === 'pending' && (
                          <>
                            <button
                              onClick={() => setSelectedCustomer(customer)}
                              className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                              title="Aprovar"
                            >
                              <Check size={18} className="text-green-600" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedCustomer(customer);
                                setNotes('');
                              }}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                              title="Rejeitar"
                            >
                              <X size={18} className="text-red-600" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteCustomer(customer.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          title="Deletar"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}
      </div>

      {/* Modal para Aprovar/Rejeitar */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {selectedCustomer.status === 'pending' ? 'Aprovar Cliente' : 'Rejeitar Cliente'}
            </h3>
            <p className="text-slate-600 mb-4">
              {selectedCustomer.fullName} ({selectedCustomer.email})
            </p>
            <textarea
              placeholder="Adicionar notas (opcional)..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  handleApprove(selectedCustomer.id);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Aprovar
              </button>
              <button
                onClick={() => {
                  handleReject(selectedCustomer.id);
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Rejeitar
              </button>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="flex-1 px-4 py-2 bg-slate-300 text-slate-900 rounded-lg hover:bg-slate-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
