import { describe, it, expect } from 'vitest';
import { detectRenascimento, detectLegacy, detectGrandeLove } from '../client/src/lib/numerologyUtils';

describe('Advanced Interpretations', () => {
  describe('detectRenascimento', () => {
    it('deve detectar Renascimento em R2 com Fato Grave', () => {
      expect(detectRenascimento(2, true)).toBe(true);
    });

    it('deve detectar Renascimento em R3 com Fato Grave', () => {
      expect(detectRenascimento(3, true)).toBe(true);
    });

    it('deve detectar Renascimento em R4 com Fato Grave', () => {
      expect(detectRenascimento(4, true)).toBe(true);
    });

    it('não deve detectar Renascimento em R1 mesmo com Fato Grave', () => {
      expect(detectRenascimento(1, true)).toBe(false);
    });

    it('não deve detectar Renascimento sem Fato Grave', () => {
      expect(detectRenascimento(2, false)).toBe(false);
    });
  });

  describe('detectLegacy', () => {
    it('deve detectar Legado quando R2 = MO', () => {
      expect(detectLegacy(2, 5, 5, 3, 8)).toBe(true);
    });

    it('deve detectar Legado quando R3 = CD', () => {
      expect(detectLegacy(3, 7, 5, 7, 8)).toBe(true);
    });

    it('deve detectar Legado quando R4 = ME (Mérito)', () => {
      expect(detectLegacy(4, 9, 5, 3, 9)).toBe(true);
    });

    it('não deve detectar Legado em R1', () => {
      expect(detectLegacy(1, 5, 5, 3, 8)).toBe(false);
    });

    it('não deve detectar Legado se números não coincidem', () => {
      expect(detectLegacy(2, 5, 6, 3, 8)).toBe(false);
    });
  });

  describe('detectGrandeLove', () => {
    it('deve detectar Grande Amor com harmonia completa', () => {
      // MO=2 (positiva), EU=3 (diferença 1), CD=1 (sem bloqueio), CT=2 (favorável)
      expect(detectGrandeLove(2, 3, 1, 2)).toBe(true);
    });

    it('não deve detectar Grande Amor com MO=4 (bloqueada)', () => {
      expect(detectGrandeLove(4, 3, 1, 2)).toBe(false);
    });

    it('não deve detectar Grande Amor com MO=8 (bloqueada)', () => {
      expect(detectGrandeLove(8, 3, 1, 2)).toBe(false);
    });

    it('não deve detectar Grande Amor com EU-MO > 2', () => {
      // MO=2, EU=5 (diferença 3 > 2)
      expect(detectGrandeLove(2, 5, 1, 2)).toBe(false);
    });

    it('não deve detectar Grande Amor com CD=4 (bloqueio)', () => {
      expect(detectGrandeLove(2, 3, 4, 2)).toBe(false);
    });

    it('não deve detectar Grande Amor com CD=8 (bloqueio)', () => {
      expect(detectGrandeLove(2, 3, 8, 2)).toBe(false);
    });

    it('não deve detectar Grande Amor com CT=4 (desfavorável)', () => {
      expect(detectGrandeLove(2, 3, 1, 4)).toBe(false);
    });

    it('não deve detectar Grande Amor com CT=8 (desfavorável)', () => {
      expect(detectGrandeLove(2, 3, 1, 8)).toBe(false);
    });
  });
});
