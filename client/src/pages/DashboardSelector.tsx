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
    <div className="min-h-screen bg-[#190825] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-lg text-white">
            Escolha qual painel você deseja acessar
          </p>
          <p className="text-sm text-[#D4AF37] mt-2">
            {userEmail}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Painel Cliente */}
          <button
            onClick={() => setLocation('/app')}
            className="group relative overflow-hidden rounded-2xl bg-[#2A1240] p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#4A2A6A] hover:border-[#8A2BE2]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative space-y-4">
              <div className="inline-flex p-4 bg-[#8A2BE2]/20 rounded-xl group-hover:bg-[#8A2BE2]/30 transition-colors">
                <LayoutDashboard size={32} className="text-[#8A2BE2]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#D4AF37] text-left">
                  Painel Cliente
                </h2>
                <p className="text-white text-left mt-2">
                  Gere seus mapas numerológicos, visualize histórico e acesse suas análises
                </p>
              </div>
              <div className="pt-4">
                <span className="inline-block px-4 py-2 bg-[#8A2BE2]/20 text-[#D4AF37] rounded-lg font-semibold group-hover:bg-[#8A2BE2]/30 transition-colors">
                  Acessar →
                </span>
              </div>
            </div>
          </button>

          {/* Painel Admin */}
          {isAdmin ? (
            <button
              onClick={() => setLocation('/admin')}
              className="group relative overflow-hidden rounded-2xl bg-[#2A1240] p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#4A2A6A] hover:border-[#D4AF37]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-4">
                <div className="inline-flex p-4 bg-[#D4AF37]/20 rounded-xl group-hover:bg-[#D4AF37]/30 transition-colors">
                  <Users size={32} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#D4AF37] text-left">
                    Painel Admin
                  </h2>
                  <p className="text-white text-left mt-2">
                    Gerencie clientes, visualize relatórios, cupons e histórico de pagamentos
                  </p>
                </div>
                <div className="pt-4">
                  <span className="inline-block px-4 py-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg font-semibold group-hover:bg-[#D4AF37]/30 transition-colors">
                    Acessar →
                  </span>
                </div>
              </div>
            </button>
          ) : (
            <div className="rounded-2xl bg-[#1A0820] p-8 border border-[#4A2A6A] opacity-50">
              <div className="space-y-4">
                <div className="inline-flex p-4 bg-[#4A2A6A] rounded-xl">
                  <Users size={32} className="text-[#8A2BE2]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#8A2BE2]">
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
            className="text-[#D4AF37] hover:text-white font-semibold transition-colors"
          >
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}
