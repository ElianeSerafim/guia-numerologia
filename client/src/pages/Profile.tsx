import { useState, useEffect } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { useLocation } from 'wouter';
import { Download, Trash2, LogOut, ArrowRight, Calendar, Zap, User, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Profile() {
  const { user, logout, loading } = useAuth();
  const [, setLocation] = useLocation();

  // Fetch user's maps
  const { data: maps = [], isLoading: mapsLoading, refetch } = trpc.mapHistory.getMyMaps.useQuery(
    undefined,
    { enabled: !!user }
  );

  // Mutation para deletar mapa
  const deleteMutation = trpc.mapHistory.deleteMap.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  // Fetch subscription info - placeholder for now
  const subscription = {
    plan: 'visionario',
    mapsLimit: 3,
    mapsGenerated: maps.length,
  };

  useEffect(() => {
    if (!loading && !user) {
      setLocation('/');
    }
  }, [user, loading, setLocation]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-cyan-400 animate-spin mx-auto"></div>
          <p className="text-slate-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  const mapsRemaining = subscription ? subscription.mapsLimit - subscription.mapsGenerated : 0;
  const progressPercent = subscription ? (subscription.mapsGenerated / subscription.mapsLimit) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-slate-900">Meu Perfil</h1>
          <button
            onClick={() => {
              logout();
              setLocation('/');
            }}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
            title="Sair"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* User Info Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl">Bem-vindo, {user.name || user.email}!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Email</p>
                  <p className="text-lg font-semibold text-slate-900">{user.email}</p>
                </div>
                {subscription && (
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Plano Ativo</p>
                    <p className="text-lg font-semibold text-cyan-400 capitalize">
                      {subscription.plan === 'navegador' && '🔷 Navegador'}
                      {subscription.plan === 'visionario' && '🔮 Visionário'}
                      {subscription.plan === 'iluminado' && '✨ Iluminado'}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Subscription Status */}
          {subscription && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap size={24} className="text-amber-500" />
                  Seu Plano
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">Mapas Gerados</p>
                    <p className="text-3xl font-bold text-cyan-400">{subscription.mapsGenerated}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">Limite Total</p>
                    <p className="text-3xl font-bold text-slate-900">{subscription.mapsLimit}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">Restantes</p>
                    <p className="text-3xl font-bold text-purple-600">{mapsRemaining}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Progresso</span>
                    <span className="font-semibold text-slate-900">{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Upgrade Button */}
                {mapsRemaining === 0 && (
                  <Button
                    onClick={() => setLocation('/')}
                    className="w-full bg-cyan-400 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Zap size={18} />
                    Fazer Upgrade
                    <ArrowRight size={18} />
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Maps History */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Meus Mapas Numerológicos</CardTitle>
              <p className="text-sm text-slate-600 mt-2">
                {maps.length === 0 ? 'Você ainda não gerou nenhum mapa' : `Você tem ${maps.length} mapa${maps.length !== 1 ? 's' : ''} gerado${maps.length !== 1 ? 's' : ''}`}
              </p>
            </CardHeader>
            <CardContent>
              {mapsLoading ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-cyan-400 animate-spin mx-auto"></div>
                </div>
              ) : maps.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <p className="text-slate-600">Nenhum mapa gerado ainda</p>
                  <Button
                    onClick={() => setLocation('/')}
                    className="bg-cyan-400 hover:bg-indigo-700 text-white"
                  >
                    Gerar Primeiro Mapa
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {maps.map((map) => (
                    <div
                      key={map.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{map.name}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(map.generatedAt).toLocaleDateString('pt-BR')}
                          </span>
                          <span>{new Date(map.generatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {map.pdfUrl && (
                          <a
                            href={map.pdfUrl}
                            download
                            className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-cyan-400 transition-colors"
                            title="Baixar PDF"
                          >
                            <Download size={18} />
                          </a>
                        )}
                        <button
                          onClick={() => {
                            if (confirm('Tem certeza que deseja deletar este mapa?')) {
                              deleteMutation.mutate({ mapId: map.id });
                            }
                          }}
                          disabled={deleteMutation.isPending}
                          className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors disabled:opacity-50"
                          title="Deletar"
                        >
                          {deleteMutation.isPending ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-slate-600">
            <p>Precisa de ajuda? <a href="/faq" className="text-cyan-400 hover:text-indigo-700 font-semibold">Consulte nossas FAQs</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
