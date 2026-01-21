/**
 * Cálculo de Ciclos Anuais 2026 - Numerologia Pitagórica
 * Baseado na metodologia de Eliane Serafim
 */

/**
 * Reduz um número a um dígito (1-9) ou número mestre (11, 22, 33)
 */
export function reduceToSingleDigit(num: number): number {
  while (num > 9) {
    if (num === 11 || num === 22 || num === 33) return num;
    const sum = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    num = sum;
  }
  return num;
}

/**
 * Calcula o Ano Pessoal para 2026
 * Fórmula: Mês + Dia + 2 + 0 + 2 + 6
 * @param birthDate - Data de nascimento (DD/MM/YYYY ou Date)
 * @returns Número do Ano Pessoal (1-9 ou 11, 22, 33)
 */
export function calculateAnnualYear2026(birthDate: string | Date): number {
  let month: number;
  let day: number;

  if (typeof birthDate === 'string') {
    const parts = birthDate.split('/');
    day = parseInt(parts[0]);
    month = parseInt(parts[1]);
  } else {
    day = birthDate.getDate();
    month = birthDate.getMonth() + 1;
  }

  // Fórmula: Mês + Dia + 2026
  const sum = month + day + 2 + 0 + 2 + 6;
  return reduceToSingleDigit(sum);
}

/**
 * Determina em qual Ciclo de Vida a pessoa está
 * C1: 0-27 anos (Formação da Base)
 * C2: 28-54 anos (Expansão e Consolidação)
 * C3: 55+ anos (Sabedoria e Legado)
 * @param birthDate - Data de nascimento
 * @returns { ciclo: 'C1' | 'C2' | 'C3', idade: number, descricao: string }
 */
export function calculateLifeCycle(birthDate: string | Date): {
  ciclo: 'C1' | 'C2' | 'C3';
  idade: number;
  descricao: string;
} {
  let age: number;

  if (typeof birthDate === 'string') {
    const parts = birthDate.split('/');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);
    const today = new Date();
    age = today.getFullYear() - year;
    const hasHadBirthday =
      today.getMonth() + 1 > month ||
      (today.getMonth() + 1 === month && today.getDate() >= day);
    if (!hasHadBirthday) age--;
  } else {
    const today = new Date();
    age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthday =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());
    if (!hasHadBirthday) age--;
  }

  if (age < 28) {
    return {
      ciclo: 'C1',
      idade: age,
      descricao: '🌱 Formação da Base - Infância e Juventude',
    };
  } else if (age < 55) {
    return {
      ciclo: 'C2',
      idade: age,
      descricao: '🌿 Expansão e Consolidação - Vida Adulta',
    };
  } else {
    return {
      ciclo: 'C3',
      idade: age,
      descricao: '🌳 Sabedoria e Legado - Maturidade',
    };
  }
}

/**
 * Interface para dados de Ciclo Anual
 */
export interface AnnualCycleData {
  annualYear: number;
  lifeCycle: 'C1' | 'C2' | 'C3';
  age: number;
  year: 2026;
}

/**
 * Calcula todos os dados necessários para exibir o Ciclo Anual 2026
 */
export function calculateAnnualCycle2026(birthDate: string | Date): AnnualCycleData {
  const annualYear = calculateAnnualYear2026(birthDate);
  const lifeCycleData = calculateLifeCycle(birthDate);

  return {
    annualYear,
    lifeCycle: lifeCycleData.ciclo,
    age: lifeCycleData.idade,
    year: 2026,
  };
}
