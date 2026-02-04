/**
 * Interpretações Especiais - Numerologia Pitagórica Terapêutica
 * 
 * Baseado na metodologia de Lili Numerologia
 * Vigente desde 2017
 * 
 * Inclui: Renascimento, Realização de Legado e Grande Amor
 */

import { NumerologyChart } from '@/types';

// ==================== RENASCIMENTO ====================

export interface RenascimentoInfo {
  hasRenascimento: boolean;
  realizacoes: number[]; // Quais realizações têm Renascimento (2, 3 ou 4)
  definition: string;
  standardText: string;
  rules: {
    noR1: string;
    onlyR234: string;
    liberacaoCDMO: string;
    mudancaResidencial: string;
    finalidade: string;
  };
  fatoGrave: string[];
}

/**
 * Detecta Renascimento no mapa
 * 
 * Regras:
 * - Não existe Renascimento em R1
 * - Pode ocorrer apenas em R2, R3 ou R4
 * - Ocorre quando pessoa passa por Fato Grave como tentativa da alma de sair da Polaridade Negativa
 * 
 * NOTA: A detecção automática completa de Renascimento requer análise terapêutica profunda.
 * Esta função fornece a estrutura e regras, mas a confirmação deve ser feita pelo terapeuta.
 */
export function detectRenascimento(chart: NumerologyChart): RenascimentoInfo {
  // Por enquanto, retornamos a estrutura com hasRenascimento = false
  // A detecção real requer análise terapêutica de:
  // - Bloqueios nas vibrações
  // - Polaridade negativa
  // - Extrapolação
  // - Histórico de fatos graves
  
  return {
    hasRenascimento: false, // Requer análise terapêutica
    realizacoes: [], // Será preenchido após análise
    definition: "O Renascimento ocorre quando a pessoa passa por um Fato Grave como tentativa da alma de sair da Polaridade Negativa, do Bloqueio ou da Extrapolação e retornar à Polaridade Positiva da Vibração Numérica.",
    standardText: "Este período marca um Renascimento. A alma é chamada a reorganizar escolhas, valores e atitudes para retomar sua vibração original e evoluir com mais consciência.",
    rules: {
      noR1: "Não existe Renascimento em R1.",
      onlyR234: "O Renascimento pode ocorrer apenas em R2, R3 ou R4.",
      liberacaoCDMO: "A liberação do Caminho do Destino (CD) e da Motivação (MO), assim como a regressão da MO, deve ocorrer em cada Renascimento.",
      mudancaResidencial: "Quando houver mais de um Renascimento, a mudança de imóvel residencial deve acontecer somente no último.",
      finalidade: "O Renascimento nunca é punição. Ele é um chamado terapêutico para reorganização da alma."
    },
    fatoGrave: [
      "Enfermidade física grave",
      "Acidente grave",
      "Perda material significativa",
      "Perda afetiva significativa"
    ]
  };
}

// ==================== REALIZAÇÃO DE LEGADO ====================

export interface LegadoInfo {
  hasLegado: boolean;
  realizacoes: Array<{
    numero: number; // R2, R3 ou R4
    valor: number; // Valor numérico da realização
    match: 'MO' | 'CD' | 'ME'; // Com qual número coincide
  }>;
  definition: string;
  standardText: string;
}

/**
 * Detecta Realização de Legado no mapa
 * 
 * Regras:
 * - Ocorre quando uma Realização (R2, R3 ou R4) apresenta o mesmo número da MO, CD ou ME
 * - Significa que a pessoa deixa marcas, obras, ensinamentos que impactam outras pessoas
 * 
 * @param chart Mapa numerológico completo
 * @returns Informações sobre Realização de Legado
 */
export function detectLegado(chart: NumerologyChart): LegadoInfo {
  const legados: LegadoInfo['realizacoes'] = [];
  
  const mo = chart.mo;
  const cd = chart.cd;
  const me = chart.merito;
  
  // Verificar R2
  const r2 = chart.realizacoes.r2;
  if (r2 === mo) legados.push({ numero: 2, valor: r2, match: 'MO' });
  else if (r2 === cd) legados.push({ numero: 2, valor: r2, match: 'CD' });
  else if (r2 === me) legados.push({ numero: 2, valor: r2, match: 'ME' });
  
  // Verificar R3
  const r3 = chart.realizacoes.r3;
  if (r3 === mo) legados.push({ numero: 3, valor: r3, match: 'MO' });
  else if (r3 === cd) legados.push({ numero: 3, valor: r3, match: 'CD' });
  else if (r3 === me) legados.push({ numero: 3, valor: r3, match: 'ME' });
  
  // Verificar R4
  const r4 = chart.realizacoes.r4;
  if (r4 === mo) legados.push({ numero: 4, valor: r4, match: 'MO' });
  else if (r4 === cd) legados.push({ numero: 4, valor: r4, match: 'CD' });
  else if (r4 === me) legados.push({ numero: 4, valor: r4, match: 'ME' });
  
  return {
    hasLegado: legados.length > 0,
    realizacoes: legados,
    definition: "A Realização de Legado ocorre quando uma Realização (R2, R3 ou R4) apresenta o mesmo número da MO, do CD ou do Mérito (ME). Neste período, a pessoa não vive apenas conquistas pessoais, mas deixa marcas, obras, ensinamentos ou exemplos que impactam outras pessoas.",
    standardText: "Esta realização representa a construção de um legado. Suas escolhas reverberam além de você, deixando marcas conscientes na sua história e na vida de outras pessoas."
  };
}

// ==================== GRANDE AMOR ====================

export interface GrandeAmorInfo {
  hasGrandeAmor: boolean;
  criteriosAtendidos: {
    moAtiva: boolean;
    harmoniaEuMo: boolean;
    semBloqueioAfetivo: boolean;
    cicloFavoravel: boolean;
  };
  definition: string;
  standardText: string;
  observacao: string;
}

/**
 * Detecta Grande Amor no mapa
 * 
 * Critérios:
 * - Ativação positiva da MO
 * - Harmonia entre EU e MO
 * - Ausência de Bloqueio afetivo
 * - Momento favorável nos ciclos de vida
 * 
 * NOTA: A detecção completa requer análise terapêutica profunda de bloqueios e polaridades.
 * Esta função fornece a estrutura, mas a confirmação deve ser feita pelo terapeuta.
 * 
 * @param chart Mapa numerológico completo
 * @returns Informações sobre Grande Amor
 */
export function detectGrandeAmor(chart: NumerologyChart): GrandeAmorInfo {
  // Critérios simplificados (requer análise terapêutica completa)
  const criterios = {
    moAtiva: false, // Requer análise de polaridade da MO
    harmoniaEuMo: false, // Requer análise de compatibilidade EU-MO
    semBloqueioAfetivo: false, // Requer análise de bloqueios
    cicloFavoravel: false // Requer análise de ciclos vigentes
  };
  
  // Análise simplificada de ciclo favorável
  // Ciclos 2, 6, 9 são tradicionalmente favoráveis ao amor
  // Determinar ciclo vigente baseado na idade
  let cicloVigente: number;
  if (chart.age <= 28) {
    cicloVigente = chart.ciclos.c1;
  } else if (chart.age <= 56) {
    cicloVigente = chart.ciclos.c2;
  } else {
    cicloVigente = chart.ciclos.c3;
  }
  
  if ([2, 6, 9].includes(cicloVigente)) {
    criterios.cicloFavoravel = true;
  }
  
  const todosAtendidos = Object.values(criterios).every(v => v === true);
  
  return {
    hasGrandeAmor: todosAtendidos,
    criteriosAtendidos: criterios,
    definition: "O Grande Amor é identificado quando as vibrações afetivas encontram harmonia profunda entre ciclos, motivações e desafios, gerando vínculos transformadores.",
    standardText: "Este período favorece a vivência de um amor significativo, consciente e transformador, que contribui para o crescimento emocional e espiritual.",
    observacao: "O Grande Amor não é dependência, resgate ou carência. Ele surge quando a pessoa está alinhada consigo."
  };
}

// ==================== FUNÇÃO PRINCIPAL ====================

export interface SpecialInterpretations {
  renascimento: RenascimentoInfo;
  legado: LegadoInfo;
  grandeAmor: GrandeAmorInfo;
}

/**
 * Analisa todas as interpretações especiais do mapa
 * 
 * @param chart Mapa numerológico completo
 * @returns Todas as interpretações especiais detectadas
 */
export function analyzeSpecialInterpretations(chart: NumerologyChart): SpecialInterpretations {
  return {
    renascimento: detectRenascimento(chart),
    legado: detectLegado(chart),
    grandeAmor: detectGrandeAmor(chart)
  };
}

// ==================== METADADOS ====================

export const SPECIAL_INTERPRETATIONS_METADATA = {
  metodo: "Numerologia Pitagórica Terapêutica – Lili Numerologia",
  uso: "App, IA, Relatórios, PDF, E-book",
  vigente_desde: 2017,
  idioma: "pt-BR"
};
