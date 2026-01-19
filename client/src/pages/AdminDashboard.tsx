import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { usePaymentManagement } from '@/hooks/usePaymentManagement';
import { useAdminManagement } from '@/hooks/useAdminManagement';
import { Customer } from '@/types/payment';
import { Check, X, Trash2, Download, Edit2, Lock, Unlock, Settings, Users, Plus, BarChart3, Tag, History, LogOut } from 'lucide-react';
import { sendAccessApprovedEmail, sendAccessRejectedEmail } from '@/lib/emailService';
import SalesReport from '@/components/SalesReport';
import CouponManagement from '@/components/CouponManagement';
import PaymentHistory from '@/components/PaymentHistory';
import AdminManagement from '@/components/AdminManagement';

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
  const [activeTab, setActiveTab] = useState<'customers' | 'reports' | 'coupons' | 'history' | 'admins'>('customers');
  const [newWhatsappLink, setNewWhatsappLink] = useState(config.whatsappLink);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [notes, setNotes] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [adminError, setAdminError] = useState('');
  const [renascimentoData, setRenascimentoData] = useState<Record<string, { hasFactoGrave: boolean; factoGraveType: string; notes: string }>>({});

  // Verificar se usuário é admin no banco de dados
  const { data: adminStatus, isLoading: checkingAdmin, error: queryError } = trpc.admins.isAdmin.useQuery(undefined, {
    retry: 3,
    retryDelay: 1000,
  });

  // Verificar autenticação (apenas admin)
  useEffect(() => {
    // Enquanto está carregando, não fazer nada
    if (checkingAdmin) {
      console.log('Verificando permissões de admin...');
      return;
    }

    // Se houve erro, permitir acesso (fallback para email hardcoded)
    if (queryError) {
      console.log('Erro ao verificar admin:', queryError);
      const userEmail = localStorage.getItem('numerology_user_email');
      if (userEmail !== 'eliane@artwebcreative.com.br') {
        console.log('Acesso negado - não é super admin');
        setLocation('/');
      }
      return;
    }

    // Se não for admin (verificado no banco), redirecionar
    if (!adminStatus?.isAdmin) {
      console.log('Acesso negado - usuário não é admin no banco');
      setLocation('/');
    }
  }, [checkingAdmin, adminStatus, queryError, setLocation]);

  // Sincronizar newWhatsappLink quando config muda
  useEffect(() => {
    console.log('[AdminDashboard] Config atualizado:', config);
    setNewWhatsappLink(config.whatsappLink);
  }, [config]);

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

  // Mutation para salvar Renascimento
  const renascimentoUpsert = trpc.renascimento.upsert.useMutation();

  const handleSaveRenascimento = async () => {
    // Salvar dados de Renascimento para cada cliente
    for (const [email, data] of Object.entries(renascimentoData)) {
      if (data.hasFactoGrave || data.factoGraveType || data.notes) {
        const customer = customers.find(c => c.email === email);
        if (customer) {
          try {
            await renascimentoUpsert.mutateAsync({
              customerId: parseInt(customer.id),
              email: customer.email,
              hasFactoGrave: data.hasFactoGrave || false,
              factoGraveType: data.factoGraveType as any,
              notes: data.notes,
            });
          } catch (error) {
            console.error('Erro ao salvar Renascimento:', error);
          }
        }
      }
    }
    setShowSettings(false);
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
        <div className="container py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Painel Administrativo</h1>
              <p className="text-[#B8A8D8] mt-1 text-sm md:text-base">Gerenciar clientes e configurações</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {isSuperAdmin && (
              <button
                onClick={() => setShowAdminManagement(!showAdminManagement)}
                className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm md:text-base bg-[#8A2BE2] text-white rounded-lg hover:bg-[#A040FF] transition-colors"
              >
                <Users size={18} />
                <span className="hidden sm:inline">Admins ({admins.length})</span>
                <span className="sm:hidden">Admins</span>
              </button>
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm md:text-base bg-[#D4AF37] text-[#190825] rounded-lg hover:bg-[#FFD700] transition-colors font-semibold"
            >
              <Settings size={18} />
              <span className="hidden sm:inline">Configurações</span>
              <span className="sm:hidden">Config</span>
            </button>
            <button
              onClick={() => {
                // Limpar dados do localStorage
                localStorage.removeItem('numerology_user_email');
                localStorage.removeItem('admin_users');
                // Redirecionar para página inicial
                setLocation('/');
              }}
              className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm md:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              title="Sair da conta"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container py-4 md:py-8 px-2 md:px-0">
        {/* Admin Management Section */}
        {showAdminManagement && isSuperAdmin && (
          <div className="bg-[#2A1A4A] border border-[#4A2A6A] rounded-lg shadow-md p-4 md:p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Gerenciar Usuários Admin</h2>
            
            {/* Add New Admin */}
            <div className="bg-[#1A0A2A] p-3 md:p-4 rounded-lg mb-6 border border-[#4A2A6A]">
              <h3 className="font-semibold text-white mb-3 text-sm md:text-base">Adicionar Novo Admin</h3>
              {adminError && (
                <div className="bg-red-900/30 border border-red-700 text-red-300 px-3 py-2 rounded mb-3 text-sm">
                  {adminError}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <input
                  type="email"
                  placeholder="Email do novo admin"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm md:text-base border border-[#4A2A6A] bg-[#1A0A2A] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
                />
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm md:text-base border border-[#4A2A6A] bg-[#1A0A2A] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
                />
                <button
                  onClick={handleAddAdmin}
                  className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 text-sm md:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline">Adicionar</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>

            {/* Admin List */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-3 md:px-4 font-semibold text-white text-sm md:text-base">Nome</th>
                    <th className="text-left py-3 px-3 md:px-4 font-semibold text-white text-sm md:text-base">Email</th>
                    <th className="text-left py-3 px-3 md:px-4 font-semibold text-white text-sm md:text-base">Tipo</th>
                    <th className="text-left py-3 px-3 md:px-4 font-semibold text-white text-sm md:text-base">Status</th>
                    <th className="text-left py-3 px-3 md:px-4 font-semibold text-white text-sm md:text-base">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-3 md:px-4 text-white text-sm md:text-base">{admin.name}</td>
                      <td className="py-3 px-3 md:px-4 text-slate-600 text-sm md:text-base">{admin.email}</td>
                      <td className="py-3 px-3 md:px-4">
                        <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                          admin.role === 'super_admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                        </span>
                      </td>
                      <td className="py-3 px-3 md:px-4">
                        <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                          admin.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {admin.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="py-3 px-3 md:px-4 flex gap-1 md:gap-2">
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
          <div className="container py-4 md:py-8 px-2 md:px-0">
            <div className="bg-[#2A1A4A] border border-[#4A2A6A] rounded-lg shadow-md p-4 md:p-6 mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Configurações</h2>
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
                    className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-[#4A2A6A] bg-[#1A0A2A] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
                  />
                  <p className="text-xs md:text-sm text-[#B8A8D8] mt-1">Formato: https://wa.me/5511999999999</p>
                </div>
                <div className="border-t border-[#4A2A6A] pt-4 mt-4">
                  <h3 className="text-lg font-bold text-white mb-4">Gerenciar Renascimento</h3>
                  <p className="text-sm text-[#B8A8D8] mb-3">Registre Fatos Graves para clientes em Renascimento (R2, R3, R4)</p>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {customers.filter(c => c.status === 'approved').map(customer => (
                      <div key={customer.id} className="bg-[#1A0A2A] p-3 rounded-lg border border-[#4A2A6A]">
                        <p className="text-sm font-semibold text-white mb-2">{customer.email}</p>
                        <label className="flex items-center gap-2 text-sm text-[#B8A8D8] mb-2">
                          <input
                            type="checkbox"
                            checked={renascimentoData[customer.email]?.hasFactoGrave || false}
                            onChange={(e) => setRenascimentoData({
                              ...renascimentoData,
                              [customer.email]: {
                                ...renascimentoData[customer.email],
                                hasFactoGrave: e.target.checked
                              }
                            })}
                            className="w-4 h-4"
                          />
                          Tem Fato Grave?
                        </label>
                        {renascimentoData[customer.email]?.hasFactoGrave && (
                          <>
                            <select
                              value={renascimentoData[customer.email]?.factoGraveType || ''}
                              onChange={(e) => setRenascimentoData({
                                ...renascimentoData,
                                [customer.email]: {
                                  ...renascimentoData[customer.email],
                                  factoGraveType: e.target.value
                                }
                              })}
                              className="w-full px-2 py-1 text-xs border border-[#4A2A6A] bg-[#0A0A1A] text-white rounded mb-2"
                            >
                              <option value="">Selecione o tipo...</option>
                              <option value="enfermidade">Enfermidade Física Grave</option>
                              <option value="acidente">Acidente Grave</option>
                              <option value="perda_material">Perda Material Significativa</option>
                              <option value="perda_afetiva">Perda Afetiva Significativa</option>
                            </select>
                            <textarea
                              value={renascimentoData[customer.email]?.notes || ''}
                              onChange={(e) => setRenascimentoData({
                                ...renascimentoData,
                                [customer.email]: {
                                  ...renascimentoData[customer.email],
                                  notes: e.target.value
                                }
                              })}
                              placeholder="Notas sobre o Renascimento..."
                              className="w-full px-2 py-1 text-xs border border-[#4A2A6A] bg-[#0A0A1A] text-white rounded"
                              rows={2}
                            />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleSaveWhatsapp();
                    handleSaveRenascimento();
                  }}
                  className="w-full md:w-auto px-4 md:px-6 py-2 text-sm md:text-base bg-[#8A2BE2] text-white rounded-lg hover:bg-[#A040FF] transition-colors font-semibold mt-4"
                >
                  Salvar Configurações
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-[#2A1A4A] rounded-lg shadow-md mb-6 border-b border-[#4A2A6A] overflow-x-auto">
          <div className="flex gap-0 min-w-max md:min-w-0">
            <button
              onClick={() => setActiveTab('customers')}
              className={`flex items-center gap-2 px-3 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold border-b-2 transition-colors ${
                activeTab === 'customers'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-white'
              }`}
            >
              <Users size={18} />
              Clientes
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-2 px-3 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold border-b-2 transition-colors ${
                activeTab === 'reports'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-white'
              }`}
            >
              <BarChart3 size={18} />
              Relatórios
            </button>
            <button
              onClick={() => setActiveTab('coupons')}
              className={`flex items-center gap-2 px-3 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold border-b-2 transition-colors ${
                activeTab === 'coupons'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-white'
              }`}
            >
              <Tag size={18} />
              Cupons
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-3 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-white'
              }`}
            >
              <History size={18} />
              Histórico
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`flex items-center gap-2 px-3 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold border-b-2 transition-colors ${
                activeTab === 'admins'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-white'
              }`}
            >
              <Users size={18} />
              Admins
            </button>
          </div>
        </div>

        {/* Filters */}
        {activeTab === 'customers' && (
        <div className="bg-[#2A1A4A] border border-[#4A2A6A] rounded-lg shadow-md p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Buscar por email ou nome..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="flex-1 min-w-0 md:min-w-64 px-3 md:px-4 py-2 text-sm md:text-base border border-[#4A2A6A] bg-[#1A0A2A] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2]"
            />
            <div className="flex gap-1 md:gap-2 flex-wrap">
              {(['pending', 'approved', 'rejected', 'all'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2 md:px-4 py-2 text-xs md:text-sm rounded-lg font-semibold transition-colors whitespace-nowrap ${
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
              className="px-3 md:px-4 py-2 text-sm md:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Exportar</span>
              <span className="sm:hidden">Export</span>
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

        {/* Admins Tab */}
        {activeTab === 'admins' && (
          <div className="bg-[#2A1A4A] border border-[#4A2A6A] rounded-lg shadow-md p-6">
            <AdminManagement />
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
