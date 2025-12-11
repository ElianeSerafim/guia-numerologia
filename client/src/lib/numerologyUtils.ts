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

export const calculateChart = (fullName: string, birthDate: string): any => {
  const parts = birthDate.split('-');
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);

  // 1. Core Numbers
  const dayR = reduceNumber(day);
  const monthR = reduceNumber(month);
  const yearR = reduceNumber(year);
  const cd = reduceNumber(dayR + monthR + yearR);

  const mo = calculateNameNumber(fullName, 'vowels');
  const eu = calculateNameNumber(fullName, 'consonants');
  const ex = calculateNameNumber(fullName, 'all');
  const merito = reduceNumber(mo + cd);

  // 2. Ciclos de Vida
  const c1 = monthR;
  const c2 = dayR;
  const c3 = yearR;

  // 3. Realizações (Pináculos)
  const r1 = reduceNumber(dayR + monthR);
  const r2 = reduceNumber(dayR + yearR);
  const r3 = reduceNumber(r1 + r2);
  const r4 = reduceNumber(monthR + yearR);

  // Idades das Realizações
  const r1EndAge = 36 - (cd === 11 || cd === 22 || cd === 33 ? reduceNumber(cd, false) : cd);
  const r2EndAge = r1EndAge + 9;
  const r3EndAge = r2EndAge + 9;

  // 4. Desafios
  const d1 = reduceNumber(Math.abs(monthR - dayR));
  const d2 = reduceNumber(Math.abs(monthR - yearR));
  const dm = reduceNumber(Math.abs(d1 - d2));

  // 5. Personal Year (Current & 2026)
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const py = reduceNumber(dayR + monthR + reduceNumber(currentYear));
  const py2026 = reduceNumber(dayR + monthR + 1);
  const pm = reduceNumber(py + currentMonth);

  // Age
  const age = currentYear - year - (today < new Date(currentYear, month - 1, day) ? 1 : 0);

  return {
    fullName,
    birthDate,
    cd,
    mo,
    eu,
    ex,
    merito,
    personalYear: py,
    personalYear2026: py2026,
    personalMonth: pm,
    realizacoes: { r1, r2, r3, r4 },
    ciclos: { c1, c2, c3 },
    desafios: { d1, d2, dm },
    realizationAges: { r1End: r1EndAge, r2End: r2EndAge, r3End: r3EndAge },
    age
  };
};
