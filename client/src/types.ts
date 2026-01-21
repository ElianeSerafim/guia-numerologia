export interface NumerologyChart {
  fullName: string;
  birthDate: string;
  cd: number; // Caminho de Destino (Life Path) - Soma da Data
  mo: number; // Motivação (Soul Urge) - Soma das Vogais
  eu: number; // Eu Íntimo (Inner Self) - Soma das Consoantes
  ex: number; // Expressão (Expression) - Soma Total
  merito: number; // Mérito - Força de Realização (MO + CD)
  desafios: {
    d1: number; // Desafio Menor 1: |Dia - Mês|
    d2: number; // Desafio Menor 2: |Dia - Ano|
    d3: number; // Desafio Menor 3: |Mês - Ano|
    dm: number; // Desafio Maior: |D1 - D3|
  };
  realizacoes: {
    r1: number;
    r2: number;
    r3: number;
    r4: number;
  };
  ciclos: {
    c1: number; // Formativo (Mês)
    c2: number; // Produtivo (Dia)
    c3: number; // Colheita (Ano)
  };
  personalYear: number; // Ano atual
  personalYear2026: number; // Ano específico de 2026
  personalMonth: number;
  ciclosTrimestrais?: {
    atual: { ct1: number; ct2: number; ct3: number; ct4: number };
    ano2026: { ct1: number; ct2: number; ct3: number; ct4: number };
    realizationMonths?: {
      r1Start: number;
      r2Start: number;
      r3Start: number;
      r4Start: number;
    };
  };
  age: number;
  realizationAges: {
    r1End: number;
    r2End: number;
    r3End: number;
  };
  hasHadBirthdayThisYear?: boolean;
}

export interface User {
  name: string;
  email: string;
  isPro: boolean;
}

export enum ViewState {
  LOGIN,
  REGISTER,
  DASHBOARD,
  REPORT
}
