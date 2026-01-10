import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useFavorites } from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  email: string;
  mapId: number;
  sectionType: string;
  sectionTitle: string;
  sectionContent: string;
  isFavorited: boolean;
  onToggle?: (isFavorited: boolean) => void;
}

export default function FavoriteButton({
  email,
  mapId,
  sectionType,
  sectionTitle,
  sectionContent,
  isFavorited: initialIsFavorited,
  onToggle,
}: FavoriteButtonProps) {
  const { addFavorite, removeFavorite } = useFavorites();
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFavorite = async () => {
    setIsLoading(true);
    try {
      if (isFavorited) {
        // Find and remove the favorite
        const response = await fetch(`/api/favorites?email=${encodeURIComponent(email)}`);
        const favorites = await response.json();
        const favorite = favorites.find(
          (f: any) => f.mapId === mapId && f.sectionType === sectionType
        );
        if (favorite) {
          await removeFavorite(favorite.id);
        }
      } else {
        // Add new favorite
        await addFavorite(email, mapId, sectionType, sectionTitle, sectionContent);
      }
      setIsFavorited(!isFavorited);
      onToggle?.(!isFavorited);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
        isFavorited
          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 hover:bg-yellow-500/30'
          : 'bg-gray-500/20 text-gray-400 border border-gray-500/50 hover:bg-gray-500/30'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      title={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart
        size={18}
        className={isFavorited ? 'fill-current' : ''}
      />
      <span className="text-sm font-medium">
        {isFavorited ? 'Favorito' : 'Favoritar'}
      </span>
    </button>
  );
}
