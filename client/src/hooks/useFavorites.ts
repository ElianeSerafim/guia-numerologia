import { useState, useCallback } from 'react';

export interface Favorite {
  id: number;
  email: string;
  mapId: number;
  sectionType: string;
  sectionTitle: string;
  sectionContent: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/favorites?email=${encodeURIComponent(email)}`);
      if (!response.ok) throw new Error('Failed to fetch favorites');
      const data = await response.json();
      setFavorites(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  const addFavorite = useCallback(async (
    email: string,
    mapId: number,
    sectionType: string,
    sectionTitle: string,
    sectionContent: string,
    notes?: string
  ) => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          mapId,
          sectionType,
          sectionTitle,
          sectionContent,
          notes,
        }),
      });
      if (!response.ok) throw new Error('Failed to add favorite');
      const newFavorite = await response.json();
      setFavorites([...favorites, newFavorite]);
      return newFavorite;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    }
  }, [favorites]);

  const removeFavorite = useCallback(async (id: number) => {
    try {
      const response = await fetch(`/api/favorites/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to remove favorite');
      setFavorites(favorites.filter(f => f.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    }
  }, [favorites]);

  const updateFavoriteNotes = useCallback(async (id: number, notes: string) => {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      if (!response.ok) throw new Error('Failed to update favorite');
      const updated = await response.json();
      setFavorites(favorites.map(f => f.id === id ? updated : f));
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    }
  }, [favorites]);

  const isFavorited = useCallback((mapId: number, sectionType: string) => {
    return favorites.some(f => f.mapId === mapId && f.sectionType === sectionType);
  }, [favorites]);

  return {
    favorites,
    loading,
    error,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    updateFavoriteNotes,
    isFavorited,
  };
}
