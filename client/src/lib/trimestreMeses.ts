/**
 * Cálculo dos Meses dos Ciclos Trimestrais
 * 
 * Os ciclos trimestrais começam na data do aniversário e seguem:
 * - CT1: Mês 1, Mês 2, Mês 3 (começando no aniversário)
 * - CT2: Mês 4, Mês 5, Mês 6
 * - CT3: Mês 7, Mês 8, Mês 9
 * - CT4: Mês 10, Mês 11, Mês 12
 */

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

interface TrimestreMeses {
  ct1: string[];
  ct2: string[];
  ct3: string[];
  ct4: string[];
}

/**
 * Calcula os meses de cada ciclo trimestral baseado no mês de aniversário
 * @param birthMonth - Mês de nascimento (1-12)
 * @returns Objeto com arrays de meses para cada ciclo trimestral
 */
export function calcularMesesTrimestrais(birthMonth: number): TrimestreMeses {
  // Converter para índice 0-11
  const startMonthIndex = (birthMonth - 1) % 12;
  
  // Função auxiliar para obter mês pelo índice
  const getMeses = (startIndex: number, count: number): string[] => {
    const meses: string[] = [];
    for (let i = 0; i < count; i++) {
      const monthIndex = (startIndex + i) % 12;
      meses.push(MONTH_NAMES[monthIndex]);
    }
    return meses;
  };
  
  return {
    ct1: getMeses(startMonthIndex, 3),      // 3 meses começando no aniversário
    ct2: getMeses(startMonthIndex + 3, 3),  // 3 próximos meses
    ct3: getMeses(startMonthIndex + 6, 3),  // 3 próximos meses
    ct4: getMeses(startMonthIndex + 9, 3),  // 3 últimos meses do ano
  };
}

/**
 * Retorna uma string formatada dos meses de um ciclo trimestral
 * @param meses - Array de nomes de meses
 * @returns String formatada "Mês1, Mês2, Mês3"
 */
export function formatarMesesTrimestre(meses: string[]): string {
  return meses.join(', ');
}

/**
 * Retorna uma string formatada de um ciclo trimestral com o número
 * @param numero - Número do ciclo trimestral (1-4)
 * @param meses - Array de nomes de meses
 * @returns String formatada "CT1: Mês1, Mês2, Mês3"
 */
export function formatarCicloTrimestral(numero: number, meses: string[]): string {
  return `CT${numero}: ${formatarMesesTrimestre(meses)}`;
}
