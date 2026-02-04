/**
 * Dicas Rápidas Diárias para Aproveitar a Energia Numerológica
 * 
 * METODOLOGIA OFICIAL: Integração de 3 Camadas
 * 1. Ano Pessoal (macro) - aprendizado/colheita inevitável do ano
 * 2. Trimestre vigente (meso) - estratégia do período
 * 3. Dia Pessoal (micro) - atitude/verbo do dia
 */

export interface DailyTip {
  number: number;
  title: string;
  focus: string;
  aproveitamento: string[];
  evite: string;
}

/**
 * Interpretações Base por Dia Pessoal (1-9)
 * Baseado no arquivo: previsoes-diarias-ano-trimestre-dia.md
 */
export const DAILY_TIPS: Record<number, DailyTip> = {
  1: {
    number: 1,
    title: "Ação e Decisão",
    focus: "Iniciar, liderar, escolher.",
    aproveitamento: [
      "Faça uma ação inaugural (primeiro passo real)",
      "Posicione-se com clareza (sem pedir aprovação)"
    ],
    evite: "Impulsividade e brigas por ego."
  },
  2: {
    number: 2,
    title: "Alinhamento e Sensibilidade",
    focus: "Colaboração, diplomacia, bastidores.",
    aproveitamento: [
      "Tenha conversas de alinhamento; refine acordos",
      "Pratique paciência ativa"
    ],
    evite: "Indecisão e dependência emocional."
  },
  3: {
    number: 3,
    title: "Comunicação e Criatividade",
    focus: "Expressão, marketing, alegria.",
    aproveitamento: [
      "Produza conteúdo e socialize estrategicamente",
      "Dê voz ao seu projeto (pitch, texto, vídeo)"
    ],
    evite: "Dispersão e promessas exageradas."
  },
  4: {
    number: 4,
    title: "Organização e Execução",
    focus: "Estrutura, rotina, método.",
    aproveitamento: [
      "Resolva pendências práticas; organize agenda/finanças",
      "Faça o feijão com arroz muito bem-feito"
    ],
    evite: "Rigidez e autocobrança cruel."
  },
  5: {
    number: 5,
    title: "Movimento e Mudança",
    focus: "Flexibilidade, novidade, expansão.",
    aproveitamento: [
      "Teste uma nova abordagem (processo, oferta, hábito)",
      "Dê um passo fora do automático"
    ],
    evite: "Ansiedade e decisões por fuga."
  },
  6: {
    number: 6,
    title: "Amor e Cuidado",
    focus: "Família, casa, beleza, responsabilidade.",
    aproveitamento: [
      "Cuide do seu ambiente e das relações",
      "Embeleze e harmonize (o externo afeta o interno)"
    ],
    evite: "Assumir responsabilidades que não são suas."
  },
  7: {
    number: 7,
    title: "Profundidade e Espiritualidade",
    focus: "Introspecção, estudo, verdade.",
    aproveitamento: [
      "Reserve silêncio para ouvir sua intuição",
      "Estude, revise, investigue"
    ],
    evite: "Isolamento reativo e paralisia por análise."
  },
  8: {
    number: 8,
    title: "Resultados e Prosperidade",
    focus: "Dinheiro, metas, autoridade.",
    aproveitamento: [
      "Negocie, precifique, cobre, planeje",
      "Tome decisões objetivas com visão de longo prazo"
    ],
    evite: "Controle excessivo e dureza emocional."
  },
  9: {
    number: 9,
    title: "Encerramentos e Compaixão",
    focus: "Finalizar, liberar, servir.",
    aproveitamento: [
      "Finalize pendências; doe/desapegue",
      "Encerre conversas e ciclos com maturidade"
    ],
    evite: "Drama, nostalgia e reabrir feridas sem necessidade."
  }
};

/**
 * Ajuste Fino: Como o Trimestre muda o tom do Dia Pessoal
 * Baseado na metodologia oficial
 */
export const TRIMESTRE_ADJUSTMENT: Record<string, string> = {
  "1,5": "o dia ganha tom de ousadia e movimento",
  "4,8": "o dia pede execução, metas e estrutura",
  "2,6": "o dia pede relacionamento, cuidado e diplomacia",
  "7,9": "o dia pede silêncio, cura, revisão e encerramento",
  "3": "o dia favorece expressão e comunicação criativa"
};

/**
 * Ajuste Fino: Como o Ano Pessoal muda o tom do Dia Pessoal
 * Baseado na metodologia oficial
 */
export const PERSONAL_YEAR_ADJUSTMENT: Record<number, string> = {
  1: "qualquer dia vira convite de protagonismo (comece)",
  2: "qualquer dia pede parceria e maturidade emocional (negocie)",
  3: "qualquer dia pede expressão (comunique)",
  4: "qualquer dia pede base e disciplina (organize)",
  5: "qualquer dia pede flexibilidade (adapte)",
  6: "qualquer dia pede cuidado e responsabilidade (harmonize)",
  7: "qualquer dia pede profundidade (investigue)",
  8: "qualquer dia pede resultado (estruture prosperidade)",
  9: "qualquer dia pede liberação (finalize)"
};

/**
 * Retorna ajuste de tom baseado no trimestre
 */
export const getTrimestreAdjustment = (trimestreVibration: number): string => {
  // Verificar cada grupo
  if ([1, 5].includes(trimestreVibration)) return TRIMESTRE_ADJUSTMENT["1,5"];
  if ([4, 8].includes(trimestreVibration)) return TRIMESTRE_ADJUSTMENT["4,8"];
  if ([2, 6].includes(trimestreVibration)) return TRIMESTRE_ADJUSTMENT["2,6"];
  if ([7, 9].includes(trimestreVibration)) return TRIMESTRE_ADJUSTMENT["7,9"];
  if (trimestreVibration === 3) return TRIMESTRE_ADJUSTMENT["3"];
  
  return "o dia mantém sua energia natural";
};

/**
 * Retorna ajuste de tom baseado no Ano Pessoal
 */
export const getPersonalYearAdjustment = (personalYear: number): string => {
  return PERSONAL_YEAR_ADJUSTMENT[personalYear] || "o dia mantém sua energia natural";
};

/**
 * Retorna a dica do dia com contexto completo (3 camadas)
 */
export const getDailyTip = (
  dailyNumber: number,
  personalYear?: number,
  trimestreVibration?: number
): DailyTip & { 
  trimestreContext?: string;
  yearContext?: string;
} => {
  const baseTip = DAILY_TIPS[dailyNumber] || DAILY_TIPS[1];
  
  return {
    ...baseTip,
    trimestreContext: trimestreVibration ? getTrimestreAdjustment(trimestreVibration) : undefined,
    yearContext: personalYear ? getPersonalYearAdjustment(personalYear) : undefined
  };
};
