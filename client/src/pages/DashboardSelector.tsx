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
  const { isAdmin } = useAdminManagement(userEmail);

  useEffect(() => {
    if (!userEmail) {
      setLocation('/auth');
    }
  }, [userEmail, setLocation]);

  if (!userEmail) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-lg text-slate-600">
            Escolha qual painel você deseja acessar
          </p>
          <p className="text-sm text-slate-500 mt-2">
            {userEmail}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Painel Cliente */}
          <button
            onClick={() => setLocation('/app')}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-indigo-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative space-y-4">
              <div className="inline-flex p-4 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition-colors">
                <LayoutDashboard size={32} className="text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 text-left">
                  Painel Cliente
                </h2>
                <p className="text-slate-600 text-left mt-2">
                  Gere seus mapas numerológicos, visualize histórico e acesse suas análises
                </p>
              </div>
              <div className="pt-4">
                <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-semibold group-hover:bg-indigo-200 transition-colors">
                  Acessar →
                </span>
              </div>
            </div>
          </button>

          {/* Painel Admin */}
          {isAdmin ? (
            <button
              onClick={() => setLocation('/admin')}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-purple-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-4">
                <div className="inline-flex p-4 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                  <Users size={32} className="text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 text-left">
                    Painel Admin
                  </h2>
                  <p className="text-slate-600 text-left mt-2">
                    Gerencie clientes, visualize relatórios, cupons e histórico de pagamentos
                  </p>
                </div>
                <div className="pt-4">
                  <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-lg font-semibold group-hover:bg-purple-200 transition-colors">
                    Acessar →
                  </span>
                </div>
              </div>
            </button>
          ) : (
            <div className="rounded-2xl bg-slate-100 p-8 border border-slate-200 opacity-50">
              <div className="space-y-4">
                <div className="inline-flex p-4 bg-slate-200 rounded-xl">
                  <Users size={32} className="text-slate-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-400">
                    Painel Admin
                  </h2>
                  <p className="text-slate-400 mt-2">
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
            className="text-slate-600 hover:text-slate-900 font-semibold transition-colors"
          >
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}
