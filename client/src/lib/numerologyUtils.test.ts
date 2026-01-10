import { describe, it, expect } from 'vitest';
import { calculateChart, reduceNumber, calcularIdadesRealizacoes } from './numerologyUtils';

describe('Numerology Utils - Cálculos Corrigidos', () => {
  describe('reduceNumber', () => {
    it('deve reduzir 20 para 2', () => {
      expect(reduceNumber(20)).toBe(2);
    });

    it('deve reduzir 5 para 5', () => {
      expect(reduceNumber(5)).toBe(5);
    });

    it('deve reduzir 1966 para 4', () => {
      // 1966 → 1+9+6+6 = 22 → 2+2 = 4
      expect(reduceNumber(1966)).toBe(4);
    });

    it('deve reduzir 1955 para 2', () => {
      // 1955 → 1+9+5+5 = 20 → 2+0 = 2
      expect(reduceNumber(1955)).toBe(2);
    });

    it('deve reconhecer número mestre 11', () => {
      expect(reduceNumber(11)).toBe(11);
    });

    it('deve reconhecer número mestre 22', () => {
      expect(reduceNumber(22)).toBe(22);
    });

    it('deve reconhecer número mestre 33', () => {
      expect(reduceNumber(33)).toBe(33);
    });

    it('deve reduzir 11 para 2 sem números mestres', () => {
      expect(reduceNumber(11, false)).toBe(2);
    });
  });

  describe('calculateChart - Exemplo 1: 20/05/1966', () => {
    const chart = calculateChart('Test Person', '1966-05-20');

    it('deve calcular CD = 11', () => {
      // Dia: 20 → 2
      // Mês: 05 → 5
      // Ano: 1966 → 4
      // CD: 2 + 5 + 4 = 11
      expect(chart.cd).toBe(11);
    });

    it('deve calcular ciclos corretamente', () => {
      expect(chart.ciclos.c1).toBe(5);  // Mês: 05 → 5
      expect(chart.ciclos.c2).toBe(2);  // Dia: 20 → 2
      expect(chart.ciclos.c3).toBe(4);  // Ano: 1966 → 4
    });

    it('deve calcular realizações corretamente', () => {
      expect(chart.realizacoes.r1).toBe(7);  // 2 + 5 = 7
      expect(chart.realizacoes.r2).toBe(6);  // 2 + 4 = 6
      expect(chart.realizacoes.r3).toBe(4);  // 7 + 6 = 13 → 4
      expect(chart.realizacoes.r4).toBe(9);  // 5 + 4 = 9
    });

    it('deve calcular desafios corretamente', () => {
      expect(chart.desafios.d1).toBe(3);  // |2 - 5| = 3
      expect(chart.desafios.d2).toBe(2);  // |2 - 4| = 2
      expect(chart.desafios.d3).toBe(1);  // |5 - 4| = 1
      expect(chart.desafios.dm).toBe(2);  // |3 - 1| = 2
    });
  });

  describe('calculateChart - Exemplo 2: 03/07/1955', () => {
    const chart = calculateChart('Test Person', '1955-07-03');

    it('deve calcular CD = 3', () => {
      // Dia: 03 → 3
      // Mês: 07 → 7
      // Ano: 1955 → 2
      // CD: 3 + 7 + 2 = 12 → 1 + 2 = 3
      expect(chart.cd).toBe(3);
    });

    it('deve calcular ciclos corretamente', () => {
      expect(chart.ciclos.c1).toBe(7);  // Mês: 07 → 7
      expect(chart.ciclos.c2).toBe(3);  // Dia: 03 → 3
      expect(chart.ciclos.c3).toBe(2);  // Ano: 1955 → 2
    });

    it('deve calcular realizações corretamente', () => {
      expect(chart.realizacoes.r1).toBe(1);  // 3 + 7 = 10 → 1
      expect(chart.realizacoes.r2).toBe(5);  // 3 + 2 = 5
      expect(chart.realizacoes.r3).toBe(6);  // 1 + 5 = 6
      expect(chart.realizacoes.r4).toBe(9);  // 7 + 2 = 9
    });

    it('deve calcular desafios corretamente', () => {
      expect(chart.desafios.d1).toBe(4);  // |3 - 7| = 4
      expect(chart.desafios.d2).toBe(1);  // |3 - 2| = 1
      expect(chart.desafios.d3).toBe(5);  // |7 - 2| = 5
      expect(chart.desafios.dm).toBe(1);  // |4 - 5| = 1
    });
  });

  describe('calcularIdadesRealizacoes', () => {
    it('deve calcular idades para CD = 11', () => {
      const idades = calcularIdadesRealizacoes(11);
      expect(idades.r1).toBe('0 aos 25 anos');
      expect(idades.r2).toBe('26 aos 34 anos');
      expect(idades.r3).toBe('35 aos 43 anos');
      expect(idades.r4).toBe('Acima de 44 anos');
    });

    it('deve calcular idades para CD = 3', () => {
      const idades = calcularIdadesRealizacoes(3);
      expect(idades.r1).toBe('0 aos 33 anos');
      expect(idades.r2).toBe('34 aos 42 anos');
      expect(idades.r3).toBe('43 aos 51 anos');
      expect(idades.r4).toBe('Acima de 52 anos');
    });
  });

  describe('Validação de Método Correto', () => {
    it('deve usar valores reduzidos para cálculos de desafios', () => {
      // Garantir que desafios usam valores reduzidos, não originais
      const chart = calculateChart('Test', '1966-05-20');
      
      // D1 deve ser |2-5| = 3, não |20-5| = 15
      expect(chart.desafios.d1).toBe(3);
      expect(chart.desafios.d1).not.toBe(15);
    });

    it('deve usar valores reduzidos para cálculos de realizações', () => {
      const chart = calculateChart('Test', '1966-05-20');
      
      // R1 deve ser 2+5 = 7, não 20+5 = 25
      expect(chart.realizacoes.r1).toBe(7);
      expect(chart.realizacoes.r1).not.toBe(25);
    });
  });
});
