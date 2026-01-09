import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { usePaymentManagement } from '@/hooks/usePaymentManagement';
import { useAdminManagement } from '@/hooks/useAdminManagement';
import { Customer } from '@/types/payment';
import { Check, X, Trash2, Download, Edit2, Lock, Unlock, Settings, Users, Plus, BarChart3, Tag, History, LogOut } from 'lucide-react';
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
    // Permitir acesso ao admin se for super admin por email
    const userEmail = localStorage.getItem('numerology_user_email');
    console.log('AdminDashboard - userEmail:', userEmail);
    
    // Se não for super admin, redirecionar imediatamente
    if (userEmail !== 'eliane@artwebcreative.com.br') {
      console.log('Acesso negado - redirecionando para home');
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
  console.log('AdminDashboard - isSuperAdminByEmail:', isSuperAdminByEmail, 'userEmail:', userEmail);
  
  // Se não for super admin, mostrar página de acesso restrito com botão de voltar
  if (!isSuperAdminByEmail) {
    return (
      <div className="min-h-screen bg-[#190825] flex items-center justify-center p-4">
        <div className="text-center bg-[#2A1A4A] border border-[#4A2A6A] rounded-lg shadow-lg p-8 max-w-md">
          <Lock className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h1 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h1>
          <p className="text-[#B8A8D8] mb-6">Você não tem permissão para acessar o painel administrativo.</p>
          <button
            onClick={() => {
              console.log('Botão voltar clicado');
              setLocation('/');
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium w-full"
          >
            ← Voltar para Página Inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#190825]">
      {/* Back Button */}
      <div className="bg-[#2A1A4A] border-b border-[#4A2A6A]">
        <div className="container py-3">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#D4AF37] hover:text-[#FFD700] transition-colors rounded-lg hover:bg-[#4A2A6A]"
            title="Voltar para página inicial"
          >
            ← Voltar
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="bg-[#2A1A4A] border-b border-[#4A2A6A] sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
            <p className="text-[#B8A8D8] mt-1">Gerenciar clientes e configurações</p>
          </div>
          <div className="flex items-center gap-3">
            {isSuperAdmin && (
              <button
                onClick={() => setShowAdminManagement(!showAdminManagement)}
                className="flex items-center gap-2 px-4 py-2 bg-[#8A2BE2] text-white rounded-lg hover:bg-[#A040FF] transition-colors"
              >
                <Users size={20} />
                Admins ({admins.length})
              </button>
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#190825] rounded-lg hover:bg-[#FFD700] transition-colors font-semibold"
            >
              <Settings size={20} />
              Configurações
            </button>
            <button
              onClick={() => {
                // Limpar dados do localStorage
                localStorage.removeItem('numerology_user_email');
                localStorage.removeItem('admin_users');
                // Redirecionar para página inicial
                setLocation('/');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              title="Sair da conta"
            >
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Admin Management Section */}
        {showAdminManagement && isSuperAdmin && (
          <div className="bg-[#2A1A4A] border border-[#4A2A6A] rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Gerenciar Usuários Admin</h2>
            
            {/* Add New Admin */}
            <div className="bg-[#1A0A2A] p-4 rounded-lg mb-6 border border-[#4A2A6A]">
              <h3 className="font-semibold text-white mb-3">Adicionar Novo Admin</h3>
              {adminError && (
                <div className="bg-red-900/30 border border-red-700 text-red-300 px-3 py-2 rounded mb-3">
                  {adminError}
                </div>
              )}
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Email do novo admin"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="flex-1 px-3 py-2 border border-[#4A2A6A] bg-[#1A0A2A] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
                />
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-[#4A2A6A] bg-[#1A0A2A] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
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
                    <th className="text-left py-3 px-4 font-semibold text-white">Nome</th>
                    <th className="text-left py-3 px-4 font-semibold text-white">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-white">Tipo</th>
                    <th className="text-left py-3 px-4 font-semibold text-white">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-white">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-white">{admin.name}</td>
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
          <div className="bg-[#2A1A4A] border border-[#4A2A6A] rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Configurações</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Link do WhatsApp
                </label>
                <input
                  type="text"
                  value={newWhatsappLink}
                  onChange={(e) => setNewWhatsappLink(e.target.value)}
                  placeholder="https://wa.me/5511999999999"
                  className="w-full px-4 py-2 border border-[#4A2A6A] bg-[#1A0A2A] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
                />
                <p className="text-sm text-[#B8A8D8] mt-1">Formato: https://wa.me/5511999999999</p>
              </div>
              <button
                onClick={handleSaveWhatsapp}
                className="px-4 py-2 bg-[#8A2BE2] text-white rounded-lg hover:bg-[#A040FF] transition-colors"
              >
                Salvar Configurações
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-[#2A1A4A] rounded-lg shadow-md mb-6 border-b border-[#4A2A6A]">
          <div className="flex gap-0">
            <button
              onClick={() => setActiveTab('customers')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition-colors ${
                activeTab === 'customers'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-white'
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
                  : 'border-transparent text-slate-600 hover:text-white'
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
                  : 'border-transparent text-slate-600 hover:text-white'
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
                  : 'border-transparent text-slate-600 hover:text-white'
              }`}
            >
              <History size={20} />
              Histórico
            </button>
          </div>
        </div>

        {/* Filters */}
        {activeTab === 'customers' && (
        <div className="bg-[#2A1A4A] border border-[#4A2A6A] rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Buscar por email ou nome..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="flex-1 min-w-64 px-4 py-2 border border-[#4A2A6A] bg-[#1A0A2A] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
            />
            <div className="flex gap-2">
              {(['pending', 'approved', 'rejected', 'all'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    filter === f
                      ? 'bg-[#8A2BE2] text-white'
                      : 'bg-[#4A2A6A] text-white hover:bg-[#6A3A8A]'
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
          <div className="bg-[#2A1A4A] border border-[#4A2A6A] rounded-lg shadow-md p-6">
            <SalesReport />
          </div>
        )}

        {/* Cupons Tab */}
        {activeTab === 'coupons' && (
          <div className="bg-[#2A1A4A] border border-[#4A2A6A] rounded-lg shadow-md p-6">
            <CouponManagement />
          </div>
        )}

        {/* Histórico Tab */}
        {activeTab === 'history' && (
          <div className="bg-[#2A1A4A] border border-[#4A2A6A] rounded-lg shadow-md p-6">
            <PaymentHistory />
          </div>
        )}

        {/* Customers Table */}
        {activeTab === 'customers' && (
        <div className="bg-[#2A1A4A] border border-[#4A2A6A] rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-white">Nome</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Plano</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Data</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Ações</th>
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
                      <td className="py-3 px-4 text-white">{customer.fullName}</td>
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
          <div className="bg-[#2A1A4A] border border-[#4A2A6A] rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">
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
                className="flex-1 px-4 py-2 bg-slate-300 text-white rounded-lg hover:bg-slate-400 transition-colors"
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
