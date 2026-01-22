import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAdminManagement } from '@/hooks/useAdminManagement';
import { LayoutDashboard, Users } from 'lucide-react';

/**
 * Dashboard Selector - Página de Seleção de Painel
 * 
 * Exibe opções para o usuário escolher entre:
 * - Painel Cliente (sempre disponível)
 * - Painel Admin (apenas para usuários cadastrados como admin)
 */

export default function DashboardSelector() {
  const [, setLocation] = useLocation();
  const userEmail = localStorage.getItem('numerology_user_email');
  const { isAdmin, isSuperAdmin } = useAdminManagement(userEmail);
  
  // Debug
  useEffect(() => {
    console.log('DashboardSelector Debug:', {
      userEmail,
      isAdmin,
      isSuperAdmin,
      storedAdmins: localStorage.getItem('admin_users')
    });
  }, [userEmail, isAdmin, isSuperAdmin]);

  useEffect(() => {
    if (!userEmail) {
      setLocation('/auth');
    }
  }, [userEmail, setLocation]);

  if (!userEmail) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#07131B] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-lg text-white">
            Escolha qual painel você deseja acessar
          </p>
          <p className="text-sm text-[#19E6FF] mt-2">
            {userEmail}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Painel Cliente */}
          <button
            onClick={() => setLocation('/app')}
            className="group relative overflow-hidden rounded-2xl bg-[#0A1F2E] p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#1A3A4A] hover:border-[#00FFFF]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative space-y-4">
              <div className="inline-flex p-4 bg-[#00FFFF]/20 rounded-xl group-hover:bg-[#00FFFF]/30 transition-colors">
                <LayoutDashboard size={32} className="text-[#00FFFF]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#19E6FF] text-left">
                  Painel Cliente
                </h2>
                <p className="text-white text-left mt-2">
                  Gere seus mapas numerológicos, visualize histórico e acesse suas análises
                </p>
              </div>
              <div className="pt-4">
                <span className="inline-block px-4 py-2 bg-[#00FFFF]/20 text-[#19E6FF] rounded-lg font-semibold group-hover:bg-[#00FFFF]/30 transition-colors">
                  Acessar →
                </span>
              </div>
            </div>
          </button>

          {/* Painel Admin */}
          {isAdmin ? (
            <button
              onClick={() => setLocation('/admin')}
              className="group relative overflow-hidden rounded-2xl bg-[#0A1F2E] p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#1A3A4A] hover:border-[#19E6FF]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#19E6FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-4">
                <div className="inline-flex p-4 bg-[#19E6FF]/20 rounded-xl group-hover:bg-[#19E6FF]/30 transition-colors">
                  <Users size={32} className="text-[#19E6FF]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#19E6FF] text-left">
                    Painel Admin
                  </h2>
                  <p className="text-white text-left mt-2">
                    Gerencie clientes, visualize relatórios, cupons e histórico de pagamentos
                  </p>
                </div>
                <div className="pt-4">
                  <span className="inline-block px-4 py-2 bg-[#19E6FF]/20 text-[#19E6FF] rounded-lg font-semibold group-hover:bg-[#19E6FF]/30 transition-colors">
                    Acessar →
                  </span>
                </div>
              </div>
            </button>
          ) : (
            <div className="rounded-2xl bg-[#1A0820] p-8 border border-[#1A3A4A] opacity-50">
              <div className="space-y-4">
                <div className="inline-flex p-4 bg-[#1A3A4A] rounded-xl">
                  <Users size={32} className="text-[#00FFFF]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#00FFFF]">
                    Painel Admin
                  </h2>
                  <p className="text-white/50 mt-2">
                    Acesso restrito a administradores
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              localStorage.removeItem('numerology_user_email');
              setLocation('/auth');
            }}
            className="text-[#19E6FF] hover:text-white font-semibold transition-colors"
          >
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}
