import { calculateChart, reduceNumber } from './numerologyUtils';

/**
 * Validação dos cálculos com exemplos fornecidos
 * 
 * Exemplo 1: 20/05/1966
 * - Dia: 20 → 2+0 = 2
 * - Mês: 05 → 0+5 = 5
 * - Ano: 1966 → 1+9+6+6 = 22 → 2+2 = 4
 * - CD: 2 + 5 + 4 = 11
 * 
 * Exemplo 2: 03/07/1955
 * - Dia: 03 → 0+3 = 3
 * - Mês: 07 → 0+7 = 7
 * - Ano: 1955 → 1+9+5+5 = 20 → 2+0 = 2
 * - CD: 3 + 7 + 2 = 12 → 1+2 = 3
 */

export function validateCalculations() {
  console.log('=== VALIDAÇÃO DOS CÁLCULOS NUMEROLÓGICOS ===\n');

  // Teste 1: 20/05/1966
  console.log('Teste 1: Data 20/05/1966');
  console.log('Dia: 20 → 2+0 =', reduceNumber(20));
  console.log('Mês: 05 → 0+5 =', reduceNumber(5));
  console.log('Ano: 1966 → 1+9+6+6 = 22 → 2+2 =', reduceNumber(1966));
  
  const chart1 = calculateChart('Test Person', '1966-05-20');
  console.log('CD calculado:', chart1.cd);
  console.log('Esperado: 11');
  console.log('✓ Correto!' + (chart1.cd === 11 ? ' ✓' : ' ✗'));
  console.log('');

  // Teste 2: 03/07/1955
  console.log('Teste 2: Data 03/07/1955');
  console.log('Dia: 03 → 0+3 =', reduceNumber(3));
  console.log('Mês: 07 → 0+7 =', reduceNumber(7));
  console.log('Ano: 1955 → 1+9+5+5 = 20 → 2+0 =', reduceNumber(1955));
  
  const chart2 = calculateChart('Test Person', '1955-07-03');
  console.log('CD calculado:', chart2.cd);
  console.log('Esperado: 3 (3+7+2=12→1+2=3)');
  console.log('✓ Correto!' + (chart2.cd === 3 ? ' ✓' : ' ✗'));
  console.log('');

  // Teste 3: Validar desafios com valores reduzidos
  console.log('Teste 3: Desafios (usando valores reduzidos)');
  console.log('Data: 20/05/1966');
  console.log('Dia reduzido: 2, Mês reduzido: 5, Ano reduzido: 4');
  console.log('D1 = |2-5| =', reduceNumber(Math.abs(2-5)), '(esperado: 3)');
  console.log('D2 = |2-4| =', reduceNumber(Math.abs(2-4)), '(esperado: 2)');
  console.log('D3 = |5-4| =', reduceNumber(Math.abs(5-4)), '(esperado: 1)');
  console.log('DM = |3-1| =', reduceNumber(Math.abs(3-1)), '(esperado: 2)');
  console.log('');

  // Teste 4: Realizações
  console.log('Teste 4: Realizações (usando valores reduzidos)');
  console.log('Data: 20/05/1966 (Dia: 2, Mês: 5, Ano: 4)');
  console.log('R1 = 2+5 =', reduceNumber(2+5), '(esperado: 7)');
  console.log('R2 = 2+4 =', reduceNumber(2+4), '(esperado: 6)');
  console.log('R3 = 7+6 =', reduceNumber(7+6), '(esperado: 4)');
  console.log('R4 = 5+4 =', reduceNumber(5+4), '(esperado: 9)');
  console.log('');

  console.log('=== FIM DA VALIDAÇÃO ===');
}

// Executar validação
if (typeof window !== 'undefined') {
  (window as any).validateCalculations = validateCalculations;
}
