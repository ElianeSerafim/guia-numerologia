import { useState, useMemo } from 'react';
import { useMapHistory } from '@/hooks/useMapHistory';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { useLocation } from 'wouter';
import { ArrowLeft, Trash2, Download, Search, Eye, Zap, X } from 'lucide-react';
import { SavedMap } from '@/types/history';

/**
 * History Page
 * 
 * Design: Exibição elegante do histórico de mapas numerológicos
 * - Lista de mapas salvos com filtros
 * - Visualização rápida de números principais
 * - Funcionalidade de comparação
 * - Busca e filtros
 */

export default function History() {
  const { user } = useUserSubscription();
  const { history, deleteMap, searchMaps, exportHistory } = useMapHistory();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaps, setSelectedMaps] = useState<string[]>([]);
  const [viewingMap, setViewingMap] = useState<SavedMap | null>(null);

        // Filtrar mapas do usuário atual
        const userMaps = useMemo(() => {
          if (!user || !user.email) return [];
          return history.maps.filter(m => m.email === user.email);
        }, [history.maps, user]);

  // Buscar mapas
  const filteredMaps = useMemo(() => {
    if (!searchQuery) return userMaps;
    return userMaps.filter(m =>
      m.chart.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.notes?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [userMaps, searchQuery]);

  const handleViewMap = (map: SavedMap) => {
    setViewingMap(map);
  };

  const handleDeleteMap = (mapId: string) => {
    if (confirm('Tem certeza que deseja deletar este mapa?')) {
      deleteMap(mapId);
    }
  };

  const handleSelectMap = (mapId: string) => {
    setSelectedMaps(prev =>
      prev.includes(mapId)
        ? prev.filter(id => id !== mapId)
        : [...prev, mapId]
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Faça login para acessar seu histórico</p>
          <button
            onClick={() => setLocation('/auth')}
            className="btn-primary"
          >
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  if (!user.email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
          <h1 className="text-xl font-bold text-white">Histórico de Mapas</h1>
          <button
            onClick={exportHistory}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
            title="Exportar histórico"
          >
            <Download size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="card-mystical text-center">
            <p className="text-slate-600 text-sm mb-1">Mapas Salvos</p>
            <p className="text-4xl font-bold text-indigo-600">{userMaps.length}</p>
          </div>
          <div className="card-mystical text-center">
            <p className="text-slate-600 text-sm mb-1">Mais Recente</p>
            <p className="text-lg font-semibold text-white">
              {userMaps.length > 0
                ? new Date(userMaps[0].savedAt).toLocaleDateString('pt-BR')
                : 'Nenhum'}
            </p>
          </div>
          <div className="card-mystical text-center">
            <p className="text-slate-600 text-sm mb-1">Espaço Usado</p>
            <p className="text-lg font-semibold text-white">
              {(JSON.stringify(userMaps).length / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nome, notas ou tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Maps List */}
        {filteredMaps.length === 0 ? (
          <div className="card-mystical text-center py-12">
            <p className="text-slate-600 mb-4">
              {userMaps.length === 0
                ? 'Você ainda não tem mapas salvos. Gere seu primeiro mapa!'
                : 'Nenhum mapa encontrado com essa busca.'}
            </p>
            {userMaps.length === 0 && (
              <button
                onClick={() => setLocation('/')}
                className="btn-primary"
              >
                Gerar Mapa Agora
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaps.map((map) => (
              <div
                key={map.id}
                className="card-mystical space-y-4 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleViewMap(map)}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">{map.chart.fullName}</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(map.savedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedMaps.includes(map.id)}
                    onChange={() => handleSelectMap(map.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-5 h-5 rounded border-slate-300 text-indigo-600 cursor-pointer"
                  />
                </div>

                {/* Key Numbers */}
                <div className="grid grid-cols-2 gap-3 bg-indigo-50 rounded-lg p-3">
                  <div className="text-center">
                    <p className="text-xs text-indigo-600 font-semibold">CD</p>
                    <p className="number-mystical text-2xl">{map.chart.cd}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-indigo-600 font-semibold">MO</p>
                    <p className="number-mystical text-2xl">{map.chart.mo}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-indigo-600 font-semibold">EX</p>
                    <p className="number-mystical text-2xl">{map.chart.ex}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-indigo-600 font-semibold">AP2026</p>
                    <p className="number-mystical text-2xl">{map.chart.personalYear2026}</p>
                  </div>
                </div>

                {/* Notes */}
                {map.notes && (
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <p className="text-sm text-slate-700 line-clamp-2">{map.notes}</p>
                  </div>
                )}

                {/* Tags */}
                {map.tags && map.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {map.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-slate-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewMap(map);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 text-sm text-indigo-600 hover:bg-indigo-50 py-2 rounded transition-colors"
                  >
                    <Eye size={16} />
                    Ver
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMap(map.id);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 text-sm text-red-600 hover:bg-red-50 py-2 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Visualização */}
      {viewingMap && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">{viewingMap.chart.fullName}</h2>
              <button
                onClick={() => setViewingMap(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Informações Pessoais */}
              <div>
                <h3 className="font-bold text-white mb-3">Informações Pessoais</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Data de Nascimento</p>
                    <p className="font-medium text-white">
                      {new Date(viewingMap.chart.birthDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Idade</p>
                    <p className="font-medium text-white">{viewingMap.chart.age} anos</p>
                  </div>
                </div>
              </div>

              {/* Números Principais */}
              <div>
                <h3 className="font-bold text-white mb-3">Números Principais</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center bg-indigo-50 rounded-lg p-4">
                    <p className="text-xs text-indigo-600 font-semibold mb-1">Caminho de Destino</p>
                    <p className="number-mystical text-3xl">{viewingMap.chart.cd}</p>
                  </div>
                  <div className="text-center bg-purple-50 rounded-lg p-4">
                    <p className="text-xs text-purple-600 font-semibold mb-1">Motivação</p>
                    <p className="number-mystical text-3xl">{viewingMap.chart.mo}</p>
                  </div>
                  <div className="text-center bg-amber-50 rounded-lg p-4">
                    <p className="text-xs text-amber-600 font-semibold mb-1">Expressão</p>
                    <p className="number-mystical text-3xl">{viewingMap.chart.ex}</p>
                  </div>
                </div>
              </div>

              {/* Notas */}
              {viewingMap.notes && (
                <div>
                  <h3 className="font-bold text-white mb-2">Notas</h3>
                  <p className="text-slate-700">{viewingMap.notes}</p>
                </div>
              )}

              {/* Botão de Ação */}
              <button
                onClick={() => {
                  setViewingMap(null);
                  // Aqui você pode implementar a comparação ou visualização completa
                }}
                className="w-full btn-primary"
              >
                Ver Mapa Completo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
