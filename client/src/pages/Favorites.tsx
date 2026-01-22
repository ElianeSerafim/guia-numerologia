import { useEffect, useState } from 'react';
import { Trash2, Edit2, X, Check } from 'lucide-react';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { useFavorites, type Favorite } from '@/hooks/useFavorites';
import { useLocation } from 'wouter';

export default function Favorites() {
  const { user } = useUserSubscription();
  const { favorites, fetchFavorites, removeFavorite, updateFavoriteNotes } = useFavorites();
  const [, setLocation] = useLocation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchFavorites(user.email).finally(() => setLoading(false));
    }
  }, [user?.email, fetchFavorites]);

  const handleEditNotes = (favorite: Favorite) => {
    setEditingId(favorite.id);
    setEditingNotes(favorite.notes || '');
  };

  const handleSaveNotes = async (id: number) => {
    try {
      await updateFavoriteNotes(id, editingNotes);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja remover este favorito?')) {
      try {
        await removeFavorite(id);
      } catch (error) {
        console.error('Error deleting favorite:', error);
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-black flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Acesso Negado</h1>
          <p className="text-gray-300 mb-6">Você precisa estar logado para acessar seus favoritos.</p>
          <button
            onClick={() => setLocation('/app')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-400 text-white rounded-lg hover:from-cyan-500 hover:to-indigo-700 transition-all"
          >
            Voltar ao App
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setLocation('/app')}
            className="text-gray-400 hover:text-white transition-colors mb-4"
          >
            ← Voltar
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">Meus Favoritos</h1>
          <p className="text-gray-400">
            {favorites.length} {favorites.length === 1 ? 'favorito salvo' : 'favoritos salvos'}
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
            <p className="text-gray-400 mt-4">Carregando favoritos...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12 bg-blue-900/30 border border-purple-500/50 rounded-lg">
            <p className="text-gray-400 mb-4">Você ainda não tem favoritos salvos.</p>
            <button
              onClick={() => setLocation('/app')}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-400 text-white rounded-lg hover:from-cyan-500 hover:to-indigo-700 transition-all"
            >
              Ir para o App
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="bg-blue-900/30 border border-purple-500/50 rounded-lg p-6 hover:bg-blue-900/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{favorite.sectionTitle}</h3>
                    <p className="text-sm text-gray-400">
                      Tipo: <span className="text-yellow-400">{favorite.sectionType}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Salvo em {new Date(favorite.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditNotes(favorite)}
                      className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                      title="Editar notas"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(favorite.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      title="Remover favorito"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Content Preview */}
                <div className="bg-black/20 rounded p-4 mb-4 max-h-32 overflow-y-auto">
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">
                    {favorite.sectionContent.substring(0, 200)}...
                  </p>
                </div>

                {/* Notes Section */}
                {editingId === favorite.id ? (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-white">Suas Notas</label>
                    <textarea
                      value={editingNotes}
                      onChange={(e) => setEditingNotes(e.target.value)}
                      className="w-full px-4 py-2 bg-black/30 border border-purple-500/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                      rows={3}
                      placeholder="Adicione suas notas pessoais..."
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveNotes(favorite.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Check size={16} />
                        Salvar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <X size={16} />
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  favorite.notes && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                      <p className="text-sm text-yellow-100">
                        <span className="font-semibold">Suas notas:</span> {favorite.notes}
                      </p>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
