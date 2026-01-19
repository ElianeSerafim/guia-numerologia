const LETTER_VALUES: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9
};

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

export const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");
};

export const reduceNumber = (num: number, masterNumbers: boolean = true): number => {
  if (num === 0) return 0;
  if (masterNumbers && (num === 11 || num === 22 || num === 33)) return num;

  if (num < 10) return num;

  let sum = 0;
  const digits = num.toString().split('');
  for (const digit of digits) {
    sum += parseInt(digit, 10);
  }

  return reduceNumber(sum, masterNumbers);
};

export const calculateNameNumber = (name: string, filter: 'all' | 'vowels' | 'consonants' = 'all'): number => {
  const normalized = normalizeString(name);
  let sum = 0;

  for (const char of normalized) {
    const val = LETTER_VALUES[char] || 0;
    const isVowel = VOWELS.includes(char);

    if (filter === 'all') {
      sum += val;
    } else if (filter === 'vowels' && isVowel) {
      sum += val;
    } else if (filter === 'consonants' && !isVowel) {
      sum += val;
    }
  }

  return reduceNumber(sum);
};

/**
 * Calcula o Mapa Numerológico Natal (MNN) completo
 * 
 * MÉTODO CORRETO:
 * 1. Reduzir DIA a um dígito
 * 2. Reduzir MÊS a um dígito
 * 3. Reduzir ANO a um dígito
 * 4. Somar os três reduzidos e reduzir novamente
 * 
 * Exemplo: 20/05/1966
 * - Dia: 20 → 2+0 = 2
 * - Mês: 05 → 0+5 = 5
 * - Ano: 1966 → 1+9+6+6 = 22 → 2+2 = 4
 * - CD: 2 + 5 + 4 = 11
 */
export const calculateChart = (fullName: string, birthDate: string): any => {
  // Aceitar ambos os formatos: YYYY-MM-DD e DD/MM/YYYY
  let year: number, month: number, day: number;
  
  if (birthDate.includes('-')) {
    // Formato YYYY-MM-DD (do input type="date")
    const parts = birthDate.split('-');
    year = parseInt(parts[0]);
    month = parseInt(parts[1]);
    day = parseInt(parts[2]);
  } else if (birthDate.includes('/')) {
    // Formato DD/MM/YYYY
    const parts = birthDate.split('/');
    day = parseInt(parts[0]);
    month = parseInt(parts[1]);
    year = parseInt(parts[2]);
  } else {
    throw new Error('Formato de data inválido. Use DD/MM/YYYY ou YYYY-MM-DD.');
  }

  // ========================================
  // REDUZIR DIA, MÊS E ANO INDIVIDUALMENTE
  // ========================================
  const dayReduced = reduceNumber(day);
  const monthReduced = reduceNumber(month);
  const yearReduced = reduceNumber(year);

  // ========================================
  // 1. NÚMEROS PRINCIPAIS DO MNN
  // ========================================
  
  // Caminho de Destino (CD): dayReduced + monthReduced + yearReduced
  const cd = reduceNumber(dayReduced + monthReduced + yearReduced);

  // Motivação (MO): soma das vogais do nome
  const mo = calculateNameNumber(fullName, 'vowels');

  // Eu Íntimo (EU): soma das consoantes do nome
  const eu = calculateNameNumber(fullName, 'consonants');

  // Expressão (EX): soma de todas as letras do nome
  const ex = calculateNameNumber(fullName, 'all');

  // Mérito (Força de Realização): MO + CD (reduzido)
  const merito = reduceNumber(mo + cd);

  // ========================================
  // 2. CICLOS DE VIDA
  // ========================================
  const c1 = monthReduced;  // Ciclo 1: Mês reduzido
  const c2 = dayReduced;    // Ciclo 2: Dia reduzido
  const c3 = yearReduced;   // Ciclo 3: Ano reduzido

  // ========================================
  // 3. REALIZAÇÕES (PINÁCULOS)
  // ========================================
  const r1 = reduceNumber(dayReduced + monthReduced);        // Realização 1
  const r2 = reduceNumber(dayReduced + yearReduced);         // Realização 2
  const r3 = reduceNumber(r1 + r2);                          // Realização 3
  const r4 = reduceNumber(monthReduced + yearReduced);       // Realização 4

  // Idades das Realizações
  const cdSimple = (cd === 11 || cd === 22 || cd === 33) ? reduceNumber(cd, false) : cd;
  const r1EndAge = 36 - cdSimple;
  const r2EndAge = r1EndAge + 9;
  const r3EndAge = r2EndAge + 9;

  // ========================================
  // 4. DESAFIOS
  // ========================================
  const d1 = reduceNumber(Math.abs(dayReduced - monthReduced));    // Desafio Menor 1
  const d2 = reduceNumber(Math.abs(dayReduced - yearReduced));     // Desafio Menor 2
  const d3 = reduceNumber(Math.abs(monthReduced - yearReduced));   // Desafio Menor 3
  const dm = reduceNumber(Math.abs(d1 - d3));                      // Desafio Maior

  // ========================================
  // 5. ANOS PESSOAIS E CICLOS TRIMESTRAIS
  // ========================================
  
  // Ano Pessoal Atual
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Verificar se já fez aniversário este ano
  const hasHadBirthdayThisYear = 
    currentMonth > month || 
    (currentMonth === month && currentDay >= day);

  const yearForAP = hasHadBirthdayThisYear ? currentYear : currentYear - 1;
  const pyCurrentRaw = dayReduced + monthReduced + reduceNumber(yearForAP);
  const pyCurrentReduced = reduceNumber(pyCurrentRaw);

  // Ano Pessoal 2026
  const py2026Raw = dayReduced + monthReduced + reduceNumber(2026);
  const py2026 = reduceNumber(py2026Raw);

  // Mês Pessoal Atual
  const pm = reduceNumber(pyCurrentReduced + currentMonth);

  // Ciclos Trimestrais para o Ano Pessoal Atual
  const ct1 = reduceNumber(pyCurrentReduced + monthReduced);
  const ct2 = reduceNumber(pyCurrentReduced + dayReduced);
  const ct3 = reduceNumber(pyCurrentReduced + yearReduced);
  const pyNextYear = reduceNumber(dayReduced + monthReduced + reduceNumber(currentYear + 1));
  const ct4 = reduceNumber(pyCurrentReduced + pyNextYear);

  // Ciclos Trimestrais para 2026
  const ct1_2026 = reduceNumber(py2026 + monthReduced);
  const ct2_2026 = reduceNumber(py2026 + dayReduced);
  const ct3_2026 = reduceNumber(py2026 + yearReduced);
  const py2027 = reduceNumber(dayReduced + monthReduced + reduceNumber(2027));
  const ct4_2026 = reduceNumber(py2026 + py2027);

  // ========================================
  // 6. IDADE
  // ========================================
  const age = currentYear - year - (today < new Date(currentYear, month - 1, day) ? 1 : 0);

  return {
    fullName,
    birthDate,
    age,
    cd,
    mo,
    eu,
    ex,
    merito,
    personalYear: pyCurrentReduced,
    personalYear2026: py2026,
    personalMonth: pm,
    ciclos: {
      c1,
      c2,
      c3,
    },
    realizacoes: {
      r1,
      r2,
      r3,
      r4,
    },
    realizationAges: {
      r1End: r1EndAge,
      r2End: r2EndAge,
      r3End: r3EndAge,
    },
    desafios: {
      d1,
      d2,
      d3,
      dm,
    },
    ciclosTrimestrais: {
      atual: { ct1, ct2, ct3, ct4 },
      ano2026: { ct1: ct1_2026, ct2: ct2_2026, ct3: ct3_2026, ct4: ct4_2026 },
    },
  };
};

/**
 * Calcula as idades de realização baseado no Caminho de Destino
 */
export function calcularIdadesRealizacoes(cd: number) {
  const r1Fim = 36 - cd;
  const r2Inicio = r1Fim + 1;
  const r2Fim = r2Inicio + 9;
  const r3Inicio = r2Fim + 1;
  const r3Fim = r3Inicio + 9;
  const r4Inicio = r3Fim + 1;

  return {
    r1: `0 aos ${r1Fim} anos`,
    r2: `${r2Inicio} aos ${r2Fim} anos`,
    r3: `${r3Inicio} aos ${r3Fim} anos`,
    r4: `Acima de ${r4Inicio} anos`
  };
}

// Interpretações dos números
export const numberInterpretations: Record<number, string> = {
  1: "Liderança, independência, iniciativa e determinação",
  2: "Equilíbrio, cooperação, sensibilidade e diplomacia",
  3: "Criatividade, comunicação, expressão e alegria",
  4: "Estabilidade, ordem, trabalho e praticidade",
  5: "Liberdade, mudança, aventura e versatilidade",
  6: "Harmonia, responsabilidade, cuidado e amor",
  7: "Espiritualidade, análise, introspecção e sabedoria",
  8: "Poder, sucesso, abundância e autoridade",
  9: "Compaixão, humanidade, finalização e universalidade",
  11: "Intuição, inspiração, iluminação e sensibilidade elevada",
  22: "Mestre construtor, visão grandiosa, manifestação em larga escala",
  33: "Mestre curador, amor incondicional, sabedoria e compaixão",
};


/**
 * Detecta se há Renascimento (R2, R3 ou R4)
 * Renascimento ocorre quando há um Fato Grave e a pessoa está em R2, R3 ou R4
 */
export function detectRenascimento(realizacao: number, hasFactoGrave: boolean): boolean {
  // Renascimento só pode ocorrer em R2, R3 ou R4
  const canHaveRenascimento = realizacao === 2 || realizacao === 3 || realizacao === 4;
  return canHaveRenascimento && hasFactoGrave;
}

/**
 * Detecta se há Realização de Legado
 * Ocorre quando uma Realização (R2, R3 ou R4) = MO, CD ou ME
 */
export function detectLegacy(
  realizacao: number,
  realizacaoNumber: number,
  mo: number,
  cd: number,
  merito: number
): boolean {
  // Legado só pode ocorrer em R2, R3 ou R4
  if (realizacao === 1) return false;
  
  // Verifica se o número da realização coincide com MO, CD ou ME
  return realizacaoNumber === mo || realizacaoNumber === cd || realizacaoNumber === merito;
}

/**
 * Detecta Grande Amor baseado em harmonia afetiva
 * Critérios:
 * - Ativação positiva da MO (MO não é 4, 8 ou números com sombra forte)
 * - Harmonia entre EU e MO (diferença <= 2)
 * - Ausência de Bloqueio afetivo (CD não é 4 ou 8)
 * - Momento favorável nos ciclos (CT atual não é 4 ou 8)
 */
export function detectGrandeLove(
  mo: number,
  eu: number,
  cd: number,
  ctAtual: number
): boolean {
  // Ativação positiva da MO
  const moPositiva = mo !== 4 && mo !== 8;
  
  // Harmonia entre EU e MO (diferença pequena)
  const harmonia = Math.abs(eu - mo) <= 2;
  
  // Ausência de Bloqueio afetivo
  const semBloqueio = cd !== 4 && cd !== 8;
  
  // Momento favorável nos ciclos
  const momentoFavoravel = ctAtual !== 4 && ctAtual !== 8;
  
  return moPositiva && harmonia && semBloqueio && momentoFavoravel;
}
