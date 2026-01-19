import { describe, it, expect } from 'vitest';
import {
  detectRenascimento,
  detectLegacy,
  detectGrandeLove,
} from '../client/src/lib/numerologyUtils';

describe('Renascimento Detection', () => {
  it('should detect Renascimento when R2 exists with Fato Grave', () => {
    const chart = {
      r2: 7,
      r3: 0,
      r4: 0,
      hasFactoGrave: true,
    };
    const result = detectRenascimento(chart as any);
    expect(result).toBe(true);
  });

  it('should detect Renascimento when R3 exists with Fato Grave', () => {
    const chart = {
      r2: 0,
      r3: 5,
      r4: 0,
      hasFactoGrave: true,
    };
    const result = detectRenascimento(chart as any);
    expect(result).toBe(true);
  });

  it('should detect Renascimento when R4 exists with Fato Grave', () => {
    const chart = {
      r2: 0,
      r3: 0,
      r4: 9,
      hasFactoGrave: true,
    };
    const result = detectRenascimento(chart as any);
    expect(result).toBe(true);
  });

  it('should not detect Renascimento without Fato Grave', () => {
    const chart = {
      r2: 7,
      r3: 0,
      r4: 0,
      hasFactoGrave: false,
    };
    const result = detectRenascimento(chart as any);
    expect(result).toBe(false);
  });

  it('should not detect Renascimento in R1', () => {
    const chart = {
      r1: 3,
      r2: 0,
      r3: 0,
      r4: 0,
      hasFactoGrave: true,
    };
    const result = detectRenascimento(chart as any);
    expect(result).toBe(false);
  });
});

describe('Legacy Detection', () => {
  it('should detect legacy when Rn equals MO', () => {
    const chart = {
      r2: 5,
      mo: 5,
      cd: 3,
      me: 7,
    };
    const result = detectLegacy(chart as any);
    expect(result).toBe(true);
  });

  it('should detect legacy when Rn equals CD', () => {
    const chart = {
      r3: 8,
      mo: 5,
      cd: 8,
      me: 7,
    };
    const result = detectLegacy(chart as any);
    expect(result).toBe(true);
  });

  it('should detect legacy when Rn equals ME', () => {
    const chart = {
      r4: 6,
      mo: 5,
      cd: 3,
      me: 6,
    };
    const result = detectLegacy(chart as any);
    expect(result).toBe(true);
  });

  it('should not detect legacy when no match', () => {
    const chart = {
      r2: 5,
      mo: 3,
      cd: 7,
      me: 9,
    };
    const result = detectLegacy(chart as any);
    expect(result).toBe(false);
  });
});

describe('Grande Amor Detection', () => {
  it('should detect Grande Amor with positive MO and harmony', () => {
    const chart = {
      mo: 2,
      eu: 5,
      bloqueioAfetivo: false,
      cicloFavoravel: true,
    };
    const result = detectGrandeLove(chart as any);
    expect(result).toBe(true);
  });

  it('should not detect Grande Amor with negative MO', () => {
    const chart = {
      mo: 13,
      eu: 5,
      bloqueioAfetivo: false,
      cicloFavoravel: true,
    };
    const result = detectGrandeLove(chart as any);
    expect(result).toBe(false);
  });

  it('should not detect Grande Amor with emotional blockage', () => {
    const chart = {
      mo: 2,
      eu: 5,
      bloqueioAfetivo: true,
      cicloFavoravel: true,
    };
    const result = detectGrandeLove(chart as any);
    expect(result).toBe(false);
  });

  it('should not detect Grande Amor without favorable cycle', () => {
    const chart = {
      mo: 2,
      eu: 5,
      bloqueioAfetivo: false,
      cicloFavoravel: false,
    };
    const result = detectGrandeLove(chart as any);
    expect(result).toBe(false);
  });
});
