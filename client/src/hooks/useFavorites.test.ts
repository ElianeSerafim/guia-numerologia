import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useFavorites } from './useFavorites';

// Mock fetch
global.fetch = vi.fn();

describe('useFavorites', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch favorites by email', async () => {
    const mockFavorites = [
      {
        id: 1,
        email: 'test@example.com',
        mapId: 1,
        sectionType: 'cd',
        sectionTitle: 'Caminho de Destino',
        sectionContent: 'Test content',
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockFavorites,
    });

    const { result } = renderHook(() => useFavorites());

    await act(async () => {
      await result.current.fetchFavorites('test@example.com');
    });

    await waitFor(() => {
      expect(result.current.favorites).toEqual(mockFavorites);
    });
  });

  it('should add a favorite', async () => {
    const newFavorite = {
      id: 2,
      email: 'test@example.com',
      mapId: 1,
      sectionType: 'mo',
      sectionTitle: 'Motivação',
      sectionContent: 'Test content',
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (global.fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => newFavorite,
      });

    const { result } = renderHook(() => useFavorites());

    await act(async () => {
      await result.current.fetchFavorites('test@example.com');
    });

    await act(async () => {
      await result.current.addFavorite(
        'test@example.com',
        1,
        'mo',
        'Motivação',
        'Test content'
      );
    });

    await waitFor(() => {
      expect(result.current.favorites).toContainEqual(newFavorite);
    });
  });

  it('should remove a favorite', async () => {
    const favorite = {
      id: 1,
      email: 'test@example.com',
      mapId: 1,
      sectionType: 'cd',
      sectionTitle: 'Caminho de Destino',
      sectionContent: 'Test content',
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (global.fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [favorite],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

    const { result } = renderHook(() => useFavorites());

    await act(async () => {
      await result.current.fetchFavorites('test@example.com');
    });

    await act(async () => {
      await result.current.removeFavorite(1);
    });

    await waitFor(() => {
      expect(result.current.favorites).toEqual([]);
    });
  });

  it('should check if a section is favorited', async () => {
    const favorite = {
      id: 1,
      email: 'test@example.com',
      mapId: 1,
      sectionType: 'cd',
      sectionTitle: 'Caminho de Destino',
      sectionContent: 'Test content',
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => [favorite],
    });

    const { result } = renderHook(() => useFavorites());

    await act(async () => {
      await result.current.fetchFavorites('test@example.com');
    });

    expect(result.current.isFavorited(1, 'cd')).toBe(true);
    expect(result.current.isFavorited(1, 'mo')).toBe(false);
  });
});
