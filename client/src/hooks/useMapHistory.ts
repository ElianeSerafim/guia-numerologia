import { useState, useEffect, useCallback } from 'react';
import { NumerologyChart } from '@/types';
import { SavedMap, MapHistory, ComparisonResult } from '@/types/history';
import { nanoid } from 'nanoid';

const STORAGE_KEY = 'numerology_map_history';

/**
 * Hook para gerenciar histórico de mapas numerológicos
 * 
 * Funcionalidades:
 * - Salvar mapas localmente
 * - Recuperar histórico
 * - Deletar mapas
 * - Comparar mapas
 * - Adicionar notas e tags
 */

export function useMapHistory() {
  const [history, setHistory] = useState<MapHistory>({ maps: [], totalSaved: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Carregar histórico ao montar
  useEffect(() => {
    loadHistory();
  }, []);

  // Carregar histórico do localStorage
  const loadHistory = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: MapHistory = JSON.parse(stored);
        setHistory(data);
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Salvar histórico no localStorage
  const saveToStorage = useCallback((newHistory: MapHistory) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Erro ao salvar histórico:', error);
    }
  }, []);

  // Adicionar novo mapa ao histórico
  const addMap = useCallback(
    (chart: NumerologyChart, email: string, notes?: string, tags?: string[]) => {
      const newMap: SavedMap = {
        id: nanoid(),
        chart,
        email,
        savedAt: Date.now(),
        notes,
        tags
      };

      const newHistory: MapHistory = {
        maps: [newMap, ...history.maps],
        totalSaved: history.totalSaved + 1
      };

      setHistory(newHistory);
      saveToStorage(newHistory);
      return newMap;
    },
    [history, saveToStorage]
  );

  // Deletar mapa do histórico
  const deleteMap = useCallback(
    (mapId: string) => {
      const newHistory: MapHistory = {
        maps: history.maps.filter(m => m.id !== mapId),
        totalSaved: history.totalSaved
      };

      setHistory(newHistory);
      saveToStorage(newHistory);
    },
    [history, saveToStorage]
  );

  // Atualizar notas de um mapa
  const updateNotes = useCallback(
    (mapId: string, notes: string) => {
      const newHistory: MapHistory = {
        ...history,
        maps: history.maps.map(m =>
          m.id === mapId ? { ...m, notes } : m
        )
      };

      setHistory(newHistory);
      saveToStorage(newHistory);
    },
    [history, saveToStorage]
  );

  // Atualizar tags de um mapa
  const updateTags = useCallback(
    (mapId: string, tags: string[]) => {
      const newHistory: MapHistory = {
        ...history,
        maps: history.maps.map(m =>
          m.id === mapId ? { ...m, tags } : m
        )
      };

      setHistory(newHistory);
      saveToStorage(newHistory);
    },
    [history, saveToStorage]
  );

  // Obter mapa por ID
  const getMapById = useCallback(
    (mapId: string) => {
      return history.maps.find(m => m.id === mapId);
    },
    [history.maps]
  );

  // Comparar dois mapas
  const compareMaps = useCallback(
    (mapId1: string, mapId2: string): ComparisonResult | null => {
      const map1 = getMapById(mapId1);
      const map2 = getMapById(mapId2);

      if (!map1 || !map2) return null;

      const chart1 = map1.chart;
      const chart2 = map2.chart;

      // Encontrar números iguais
      const sameNumbers: number[] = [];
      const numberPositions = [
        { key: 'cd', label: 'Caminho de Destino' },
        { key: 'mo', label: 'Motivação' },
        { key: 'eu', label: 'Eu Íntimo' },
        { key: 'ex', label: 'Expressão' },
        { key: 'merito', label: 'Mérito' }
      ];

      numberPositions.forEach(pos => {
        if (chart1[pos.key as keyof NumerologyChart] === chart2[pos.key as keyof NumerologyChart]) {
          sameNumbers.push(chart1[pos.key as keyof NumerologyChart] as number);
        }
      });

      // Encontrar números diferentes
      const differentNumbers = numberPositions
        .filter(pos => chart1[pos.key as keyof NumerologyChart] !== chart2[pos.key as keyof NumerologyChart])
        .map(pos => ({
          position: pos.label,
          map1Value: chart1[pos.key as keyof NumerologyChart] as number,
          map2Value: chart2[pos.key as keyof NumerologyChart] as number
        }));

      // Calcular compatibilidade (0-100)
      const totalPositions = numberPositions.length;
      const compatibilityScore = Math.round((sameNumbers.length / totalPositions) * 100);

      // Gerar descrição de compatibilidade
      let compatibilityDescription = '';
      if (compatibilityScore >= 80) {
        compatibilityDescription = 'Altíssima compatibilidade! Estes mapas compartilham muitas vibrações similares.';
      } else if (compatibilityScore >= 60) {
        compatibilityDescription = 'Boa compatibilidade. Existem muitos pontos em comum entre os mapas.';
      } else if (compatibilityScore >= 40) {
        compatibilityDescription = 'Compatibilidade moderada. Há diferenças significativas que podem gerar aprendizado mútuo.';
      } else {
        compatibilityDescription = 'Compatibilidade baixa. Os mapas apresentam vibrações muito diferentes.';
      }

      return {
        map1,
        map2,
        similarities: {
          sameNumbers,
          description: `${sameNumbers.length} número(s) em comum entre os mapas.`
        },
        differences: {
          differentNumbers,
          description: `${differentNumbers.length} diferença(s) identificada(s) entre os mapas.`
        },
        compatibility: {
          score: compatibilityScore,
          description: compatibilityDescription
        }
      };
    },
    [getMapById]
  );

  // Filtrar mapas por tag
  const filterByTag = useCallback(
    (tag: string) => {
      return history.maps.filter(m => m.tags?.includes(tag));
    },
    [history.maps]
  );

  // Filtrar mapas por email
  const filterByEmail = useCallback(
    (email: string) => {
      return history.maps.filter(m => m.email === email);
    },
    [history.maps]
  );

  // Buscar mapas por nome
  const searchMaps = useCallback(
    (query: string) => {
      const lowerQuery = query.toLowerCase();
      return history.maps.filter(m =>
        m.chart.fullName.toLowerCase().includes(lowerQuery) ||
        m.notes?.toLowerCase().includes(lowerQuery) ||
        m.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    },
    [history.maps]
  );

  // Limpar todo o histórico
  const clearHistory = useCallback(() => {
    setHistory({ maps: [], totalSaved: 0 });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Exportar histórico como JSON
  const exportHistory = useCallback(() => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `numerology-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [history]);

  return {
    history,
    isLoading,
    addMap,
    deleteMap,
    updateNotes,
    updateTags,
    getMapById,
    compareMaps,
    filterByTag,
    filterByEmail,
    searchMaps,
    clearHistory,
    exportHistory
  };
}
