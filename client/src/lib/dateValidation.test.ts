import { describe, it, expect } from 'vitest';
import { validateBirthDate, formatDateBR, convertToISO } from './dateValidation';

describe('Date Validation', () => {
  describe('validateBirthDate', () => {
    it('deve rejeitar data vazia', () => {
      const result = validateBirthDate('');
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('empty');
    });

    it('deve rejeitar formato inválido', () => {
      const result = validateBirthDate('invalid');
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('invalid_format');
    });

    it('deve rejeitar mês inválido (13)', () => {
      const result = validateBirthDate('1990-13-15');
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('invalid_date');
    });

    it('deve rejeitar dia inválido (32)', () => {
      const result = validateBirthDate('1990-05-32');
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('invalid_date');
    });

    it('deve rejeitar 31 de fevereiro', () => {
      const result = validateBirthDate('1990-02-31');
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('invalid_date');
    });

    it('deve aceitar 29 de fevereiro em ano bissexto', () => {
      const result = validateBirthDate('2000-02-29');
      expect(result.isValid).toBe(true);
    });

    it('deve rejeitar 29 de fevereiro em ano não bissexto', () => {
      const result = validateBirthDate('1900-02-29');
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('invalid_date');
    });

    it('deve rejeitar data futura', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
      
      const result = validateBirthDate(dateStr);
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('future_date');
    });

    it('deve rejeitar idade muito alta (>150 anos)', () => {
      const result = validateBirthDate('1800-01-01');
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('too_old');
    });

    it('deve aceitar data válida (1990-05-15)', () => {
      const result = validateBirthDate('1990-05-15');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('deve aceitar data válida (1966-05-20)', () => {
      const result = validateBirthDate('1966-05-20');
      expect(result.isValid).toBe(true);
    });

    it('deve aceitar data válida (1955-07-03)', () => {
      const result = validateBirthDate('1955-07-03');
      expect(result.isValid).toBe(true);
    });

    it('deve rejeitar números inválidos', () => {
      const result = validateBirthDate('1990-ab-15');
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('invalid_date');
    });

    it('deve rejeitar dia 0', () => {
      const result = validateBirthDate('1990-05-00');
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('invalid_date');
    });

    it('deve rejeitar mês 0', () => {
      const result = validateBirthDate('1990-00-15');
      expect(result.isValid).toBe(false);
      expect(result.errorType).toBe('invalid_date');
    });
  });

  describe('formatDateBR', () => {
    it('deve converter YYYY-MM-DD para DD/MM/YYYY', () => {
      const result = formatDateBR('1990-05-15');
      expect(result).toBe('15/05/1990');
    });

    it('deve retornar data já em DD/MM/YYYY', () => {
      const result = formatDateBR('15/05/1990');
      expect(result).toBe('15/05/1990');
    });

    it('deve retornar string vazia para entrada vazia', () => {
      const result = formatDateBR('');
      expect(result).toBe('');
    });

    it('deve formatar com zeros à esquerda', () => {
      const result = formatDateBR('1990-05-03');
      expect(result).toBe('03/05/1990');
    });
  });

  describe('convertToISO', () => {
    it('deve converter DD/MM/YYYY para YYYY-MM-DD', () => {
      const result = convertToISO('15/05/1990');
      expect(result).toBe('1990-05-15');
    });

    it('deve retornar data já em YYYY-MM-DD', () => {
      const result = convertToISO('1990-05-15');
      expect(result).toBe('1990-05-15');
    });

    it('deve retornar string vazia para entrada vazia', () => {
      const result = convertToISO('');
      expect(result).toBe('');
    });

    it('deve retornar string vazia para formato inválido', () => {
      const result = convertToISO('invalid');
      expect(result).toBe('');
    });
  });
});
