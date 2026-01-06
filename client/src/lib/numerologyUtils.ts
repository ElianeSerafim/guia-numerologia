const LETTER_VALUES: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8
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

export const calculateNameNumber = (name: string, filter: 'all' | 'vowels' | 'consonants'): number => {
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
 * Baseado em: Técnicas Avançadas de Numerologia Pitagórica
 * 
 * Fórmulas:
 * - Caminho de Destino (CD): dia + mês + ano (reduzido)
 * - Motivação (MO): soma das vogais do nome
 * - Expressão (EX): soma de todas as letras do nome
 * - Eu Íntimo (EU): soma das consoantes do nome
 * - Mérito: MO + CD
 * - Ciclos de Vida: C1=mês, C2=dia, C3=ano
 * - Realizações (Pináculos): R1=dia+mês, R2=dia+ano, R3=R1+R2, R4=mês+ano
 * - Desafios: D1=|mês-dia|, D2=|mês-ano|, DM=|D1-D2|
 * - Ano Pessoal: dia + mês + ano (reduzido)
 * - Ciclos Trimestrais: CT1=AP+C_vida, CT2=AP+Realização, CT3=AP-DM, CT4=CT1+CT2+CT3
 */
export const calculateChart = (fullName: string, birthDate: string): any => {
  const parts = birthDate.split('-');
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);

  // Reduzir componentes da data
  const dayR = reduceNumber(day);
  const monthR = reduceNumber(month);
  const yearR = reduceNumber(year);

  // ========================================
  // 1. NÚMEROS PRINCIPAIS DO MNN
  // ========================================
  
  // Caminho de Destino (CD): dia + mês + ano
  const cd = reduceNumber(dayR + monthR + yearR);

  // Motivação (MO): soma das vogais do nome
  const mo = calculateNameNumber(fullName, 'vowels');

  // Eu Íntimo (EU): soma das consoantes do nome
  const eu = calculateNameNumber(fullName, 'consonants');

  // Expressão (EX): soma de todas as letras do nome
  const ex = calculateNameNumber(fullName, 'all');

  // Mérito (Força de Realização): MO + CD
  const merito = reduceNumber(mo + cd);

  // ========================================
  // 2. CICLOS DE VIDA
  // ========================================
  const c1 = monthR;  // Ciclo 1: Mês
  const c2 = dayR;    // Ciclo 2: Dia
  const c3 = yearR;   // Ciclo 3: Ano

  // ========================================
  // 3. REALIZAÇÕES (PINÁCULOS)
  // ========================================
  const r1 = reduceNumber(dayR + monthR);        // Realização 1
  const r2 = reduceNumber(dayR + yearR);        // Realização 2
  const r3 = reduceNumber(r1 + r2);             // Realização 3
  const r4 = reduceNumber(monthR + yearR);      // Realização 4

  // Idades das Realizações
  const cdSimple = (cd === 11 || cd === 22 || cd === 33) ? reduceNumber(cd, false) : cd;
  const r1EndAge = 36 - cdSimple;
  const r2EndAge = r1EndAge + 9;
  const r3EndAge = r2EndAge + 9;

  // ========================================
  // 4. DESAFIOS
  // ========================================
  const d1 = reduceNumber(Math.abs(dayR - monthR));    // Desafio Menor 1: |dia - mês|
  const d2 = reduceNumber(Math.abs(dayR - yearR));     // Desafio Menor 2: |dia - ano|
  const d3 = reduceNumber(Math.abs(monthR - yearR));   // Desafio Menor 3: |mês - ano|
  const dm = reduceNumber(Math.abs(d1 - d3));          // Desafio Maior: |D1 - D3|

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
  const pyCurrentRaw = dayR + monthR + reduceNumber(yearForAP);
  const pyCurrentReduced = reduceNumber(pyCurrentRaw);

  // Ano Pessoal 2026
  const py2026Raw = dayR + monthR + reduceNumber(2026);
  const py2026 = reduceNumber(py2026Raw);

  // Mês Pessoal Atual
  const pm = reduceNumber(pyCurrentReduced + currentMonth);

  // Ciclos Trimestrais para o Ano Pessoal Atual
  // CT1 = AP + Ciclo de Vida Atual
  const ct1 = reduceNumber(pyCurrentReduced + c1);
  // CT2 = AP + Realização Atual de Vida
  const ct2 = reduceNumber(pyCurrentReduced + r1);
  // CT3 = AP - Desafio Menor (com tratamento para negativo)
  const ct3Raw = pyCurrentReduced - dm;
  const ct3 = ct3Raw <= 0 ? reduceNumber(ct3Raw + 9) : reduceNumber(ct3Raw);
  // CT4 = soma dos 3 primeiros CTs
  const ct4 = reduceNumber(ct1 + ct2 + ct3);

  // Ciclos Trimestrais para 2026
  const ct1_2026 = reduceNumber(py2026 + c1);
  const ct2_2026 = reduceNumber(py2026 + r1);
  const ct3_2026Raw = py2026 - dm;
  const ct3_2026 = ct3_2026Raw <= 0 ? reduceNumber(ct3_2026Raw + 9) : reduceNumber(ct3_2026Raw);
  const ct4_2026 = reduceNumber(ct1_2026 + ct2_2026 + ct3_2026);

  // ========================================
  // 6. IDADE
  // ========================================
  const age = currentYear - year - (today < new Date(currentYear, month - 1, day) ? 1 : 0);

  return {
    fullName,
    birthDate,
    
    // Números principais
    cd,
    mo,
    eu,
    ex,
    merito,
    
    // Ciclos de vida
    ciclos: { c1, c2, c3 },
    
    // Realizações (Pináculos)
    realizacoes: { r1, r2, r3, r4 },
    realizationAges: { r1End: r1EndAge, r2End: r2EndAge, r3End: r3EndAge },
    
    // Desafios
    desafios: { d1, d2, d3, dm },
    
    // Anos Pessoais
    personalYear: pyCurrentReduced,
    personalYear2026: py2026,
    personalMonth: pm,
    
    // Ciclos Trimestrais
    ciclosTrimestrais: {
      atual: { ct1, ct2, ct3, ct4 },
      ano2026: { ct1: ct1_2026, ct2: ct2_2026, ct3: ct3_2026, ct4: ct4_2026 }
    },
    
    // Informações adicionais
    age,
    hasHadBirthdayThisYear
  };
};
