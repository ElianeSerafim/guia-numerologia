import { NumerologyChart } from '@/types';

/**
 * Tipos para o Sistema de Histórico de Mapas Numerológicos
 */

export interface SavedMap {
  id: string;
  chart: NumerologyChart;
  email: string;
  savedAt: number; // timestamp
  notes?: string;
  tags?: string[];
}

export interface MapHistory {
  maps: SavedMap[];
  totalSaved: number;
}

export interface ComparisonResult {
  map1: SavedMap;
  map2: SavedMap;
  similarities: {
    sameNumbers: number[];
    description: string;
  };
  differences: {
    differentNumbers: Array<{
      position: string;
      map1Value: number;
      map2Value: number;
    }>;
    description: string;
  };
  compatibility: {
    score: number; // 0-100
    description: string;
  };
}
