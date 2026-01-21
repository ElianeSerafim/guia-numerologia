/**
 * Cálculo de Ciclos de Vida, Desafios e Ano Pessoal 2026
 * Baseado na metodologia de Eliane Serafim
 */

/**
 * Reduz um número a um dígito (1-9) ou número mestre (11, 22, 33)
 */
export function reduceToSingleDigit(num: number): number {
  while (num > 9) {
    if (num === 11 || num === 22 || num === 33) return num;
    const sum = num
      .toString()
      .split('')
      .reduce((a, b) => a + parseInt(b), 0);
    num = sum;
  }
  return num;
}

/**
 * Extrai dia, mês e ano de uma data
 */
function parseBirthDate(birthDate: string | Date): {
  day: number;
  month: number;
  year: number;
} {
  let day: number;
  let month: number;
  let year: number;

  if (typeof birthDate === 'string') {
    const parts = birthDate.split('/');
    day = parseInt(parts[0]);
    month = parseInt(parts[1]);
    year = parseInt(parts[2]);
  } else {
    day = birthDate.getDate();
    month = birthDate.getMonth() + 1;
    year = birthDate.getFullYear();
  }

  return { day, month, year };
}

/**
 * Calcula Ciclos de Vida
 * C1: Soma do MÊS (0-28 anos) - Formativo
 * C2: Soma do DIA (29-56 anos) - Produtivo (MAIS IMPORTANTE)
 * C3: Soma do ANO (56+ anos) - Colheita
 */
export function calculateLifeCycles(birthDate: string | Date): {
  c1: number;
  c2: number;
  c3: number;
} {
  const { day, month, year } = parseBirthDate(birthDate);

  const c1 = reduceToSingleDigit(month);
  const c2 = reduceToSingleDigit(day);
  const c3 = reduceToSingleDigit(year);

  return { c1, c2, c3 };
}

/**
 * Calcula Desafios de Vida
 * D1: Dia - Mês (0-28 anos)
 * D2: Mês - Ano (29-56 anos)
 * DM: D1 - D2 (toda a vida) - MAIS IMPORTANTE
 */
export function calculateChallenges(birthDate: string | Date): {
  d1: number;
  d2: number;
  dm: number;
} {
  const { day, month, year } = parseBirthDate(birthDate);

  const daySum = reduceToSingleDigit(day);
  const monthSum = reduceToSingleDigit(month);
  const yearSum = reduceToSingleDigit(year);

  let d1 = daySum - monthSum;
  if (d1 < 0) d1 = Math.abs(d1);
  d1 = reduceToSingleDigit(d1);

  let d2 = monthSum - yearSum;
  if (d2 < 0) d2 = Math.abs(d2);
  d2 = reduceToSingleDigit(d2);

  let dm = d1 - d2;
  if (dm < 0) dm = Math.abs(dm);
  dm = reduceToSingleDigit(dm);

  return { d1, d2, dm };
}

/**
 * Calcula a idade atual
 */
function calculateAge(birthDate: string | Date): number {
  const { day, month, year } = parseBirthDate(birthDate);
  const today = new Date();
  let age = today.getFullYear() - year;
  const hasHadBirthday =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);
  if (!hasHadBirthday) age--;
  return age;
}

/**
 * Retorna qual ciclo de vida a pessoa está atualmente
 */
export function getCurrentLifeCycle(
  birthDate: string | Date
): 'C1' | 'C2' | 'C3' {
  const age = calculateAge(birthDate);
  if (age < 28) return 'C1';
  if (age < 56) return 'C2';
  return 'C3';
}

/**
 * Calcula o Ano Pessoal para 2026
 * Fórmula: Dia + Mês + 2026
 * Vigência: A partir do aniversário
 */
export function calculateAnnualYear2026(birthDate: string | Date): number {
  const { day, month } = parseBirthDate(birthDate);
  const sum = day + month + 2 + 0 + 2 + 6;
  return reduceToSingleDigit(sum);
}

/**
 * Verifica se o Ano Pessoal 2026 já começou
 * (se já passou o aniversário no ano de 2026)
 */
export function hasAnnualYearStarted2026(birthDate: string | Date): boolean {
  const { day, month } = parseBirthDate(birthDate);
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Se estamos antes do aniversário, o ano pessoal ainda não começou
  if (currentMonth < month) return false;
  if (currentMonth === month && currentDay < day) return false;
  return true;
}

/**
 * Interface com todos os dados necessários
 */
export interface FullNumerologyData {
  birthDate: string;
  age: number;
  lifeCycles: {
    c1: number;
    c2: number;
    c3: number;
    current: 'C1' | 'C2' | 'C3';
  };
  challenges: {
    d1: number;
    d2: number;
    dm: number;
  };
  annualYear2026: number;
  annualYearStarted: boolean;
}

/**
 * Retorna o número do ciclo de vida
 */
export function getCycleNumber(
  birthDate: string | Date,
  cycleType: 'c1' | 'c2' | 'c3'
): number {
  const cycles = calculateLifeCycles(birthDate);
  return cycles[cycleType];
}

/**
 * Retorna o ciclo atual da pessoa
 */
export function getCurrentCycle(birthDate: string | Date): 'c1' | 'c2' | 'c3' {
  const current = getCurrentLifeCycle(birthDate);
  return current.toLowerCase() as 'c1' | 'c2' | 'c3';
}

/**
 * Retorna o número do desafio
 */
export function getChallengeNumber(
  birthDate: string | Date,
  challengeType: 'd1' | 'd2' | 'dm'
): number {
  const challenges = calculateChallenges(birthDate);
  return challenges[challengeType];
}

/**
 * Calcula todos os dados de ciclos, desafios e ano pessoal
 */
export function calculateFullCyclesAndChallenges(
  birthDate: string | Date
): FullNumerologyData {
  const age = calculateAge(birthDate);
  const lifeCycles = calculateLifeCycles(birthDate);
  const challenges = calculateChallenges(birthDate);
  const annualYear2026 = calculateAnnualYear2026(birthDate);
  const annualYearStarted = hasAnnualYearStarted2026(birthDate);
  const current = getCurrentLifeCycle(birthDate);

  const birthDateStr =
    typeof birthDate === 'string'
      ? birthDate
      : `${birthDate.getDate()}/${birthDate.getMonth() + 1}/${birthDate.getFullYear()}`;

  return {
    birthDate: birthDateStr,
    age,
    lifeCycles: {
      ...lifeCycles,
      current,
    },
    challenges,
    annualYear2026,
    annualYearStarted,
  };
}
