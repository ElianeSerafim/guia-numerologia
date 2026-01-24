interface MonthlyInterpretation {
  prediction: string;
  tip: string;
  avoid: string;
}

const monthlyInterpretations: Record<number, Record<string, MonthlyInterpretation>> = {
  1: {
    default: {
      prediction: 'Energia de novo começo e iniciativa. É um mês para começar projetos, tomar decisões importantes e estabelecer novas metas. Você terá força para enfrentar desafios e liderar mudanças.',
      tip: 'Aproveite essa energia para iniciar aquilo que vinha adiando. Seja ousado e confie em sua intuição. Este é o momento de plantar sementes para colheitas futuras.',
      avoid: 'Evite procrastinação e indecisão. Não deixe a impulsividade dominar suas ações. Cuidado com conflitos desnecessários.'
    }
  },
  2: {
    default: {
      prediction: 'Energia de cooperação, harmonia e sensibilidade. É um mês para fortalecer relacionamentos, trabalhar em equipe e buscar equilíbrio emocional. Intuição aguçada.',
      tip: 'Cultive a diplomacia e a empatia. Este é um bom período para resolver conflitos e fortalecer parcerias. Confie em sua sensibilidade para guiar suas decisões.',
      avoid: 'Evite isolamento emocional e dependência excessiva de outros. Não deixe a insegurança paralisar suas ações. Cuidado com fofocas.'
    }
  },
  3: {
    default: {
      prediction: 'Energia de criatividade, comunicação e expressão. É um mês para se expressar, criar, socializar e desfrutar da vida. Comunicação fluida e inspiração artística.',
      tip: 'Expresse-se livremente através da criatividade. Fortaleça seus relacionamentos sociais. Este é um bom período para projetos criativos e comunicação importante.',
      avoid: 'Evite dispersão e superficialidade. Não deixe a falta de foco prejudicar seus objetivos. Cuidado com palavras precipitadas.'
    }
  },
  4: {
    default: {
      prediction: 'Energia de estabilidade, trabalho e construção. É um mês para focar no trabalho, organização e criar bases sólidas para o futuro. Disciplina e responsabilidade.',
      tip: 'Concentre-se em tarefas práticas e construção de bases sólidas. Organize sua vida financeira e profissional. Este é um bom período para investimentos seguros.',
      avoid: 'Evite rigidez excessiva e resistência à mudança. Não deixe o trabalho consumir toda sua energia. Cuidado com tédio e monotonia.'
    }
  },
  5: {
    default: {
      prediction: 'Energia de liberdade, mudança e adaptação. É um mês para abraçar mudanças, viajar, experimentar e expandir horizontes. Dinamismo e aventura.',
      tip: 'Seja flexível e aberto a novas experiências. Este é um bom período para viagens, mudanças e novos aprendizados. Aproveite a liberdade para explorar.',
      avoid: 'Evite impulsividade e falta de compromisso. Não deixe a inquietação prejudicar sua estabilidade. Cuidado com excessos.'
    }
  },
  6: {
    default: {
      prediction: 'Energia de responsabilidade, cuidado e harmonia familiar. É um mês para focar em relacionamentos, família e responsabilidades. Amor e compaixão.',
      tip: 'Dedique-se aos seus relacionamentos e responsabilidades familiares. Este é um bom período para resolver questões domésticas. Cultive o amor e a compaixão.',
      avoid: 'Evite sacrifício excessivo e vitimização. Não deixe as responsabilidades sobrecarregá-lo. Cuidado com mágoas não resolvidas.'
    }
  },
  7: {
    default: {
      prediction: 'Energia de introspecção, espiritualidade e sabedoria. É um mês para reflexão, meditação e busca de respostas internas. Análise profunda e crescimento espiritual.',
      tip: 'Reserve tempo para introspecção e meditação. Este é um bom período para estudos profundos e desenvolvimento espiritual. Confie em sua intuição.',
      avoid: 'Evite isolamento excessivo e pessimismo. Não deixe a análise paralizar sua ação. Cuidado com desconexão social.'
    }
  },
  8: {
    default: {
      prediction: 'Energia de poder, abundância e sucesso material. É um mês para focar em negócios, finanças e realização de objetivos. Força e manifestação.',
      tip: 'Aproveite essa energia para avançar em seus objetivos profissionais e financeiros. Este é um bom período para negociações e investimentos. Seja assertivo.',
      avoid: 'Evite ganância e abuso de poder. Não deixe a ambição prejudicar seus princípios. Cuidado com decisões precipitadas.'
    }
  },
  9: {
    default: {
      prediction: 'Energia de conclusão, compaixão e transformação. É um mês para finalizar ciclos, perdoar e preparar-se para novos começos. Universalidade e sabedoria.',
      tip: 'Finalize projetos e ciclos que não servem mais. Este é um bom período para perdoar e liberar o que não serve. Prepare-se para renovação.',
      avoid: 'Evite apego ao passado e resistência ao término. Não deixe a nostalgia impedir seu crescimento. Cuidado com dramatização.'
    }
  },
  11: {
    default: {
      prediction: 'Energia mestre de iluminação, inspiração e intuição elevada. É um mês para inspirar outros, confiar em sua intuição e buscar iluminação espiritual.',
      tip: 'Confie em sua intuição elevada e inspiração. Este é um bom período para projetos que inspiram e elevam consciência. Seja um farol para outros.',
      avoid: 'Evite idealismo excessivo e desconexão da realidade. Não deixe a perfeição impedir a ação. Cuidado com nervosismo.'
    }
  },
  22: {
    default: {
      prediction: 'Energia mestre de construção, manifestação e visão grandiosa. É um mês para construir bases sólidas para projetos de grande impacto e longo prazo.',
      tip: 'Trabalhe em projetos de grande escala com visão de longo prazo. Este é um bom período para construir legados duradouros. Seja ambicioso mas prático.',
      avoid: 'Evite perfeccionismo paralisante e dúvida em sua capacidade. Não deixe o medo impedir sua ação. Cuidado com sobrecarga.'
    }
  },
  33: {
    default: {
      prediction: 'Energia mestre de compaixão, cura e elevação coletiva. É um mês para servir, curar e elevar a consciência coletiva através do amor incondicional.',
      tip: 'Dedique-se a servir e curar. Este é um bom período para trabalhos que elevam consciência coletiva. Cultive compaixão universal.',
      avoid: 'Evite sacrifício excessivo e perda de si mesmo. Não deixe o serviço consumir sua energia. Cuidado com mártir.'
    }
  }
};

export function getMonthlyPredictionInterpretation(pm: number, monthName: string): MonthlyInterpretation {
  // Se existe interpretação específica para este número
  if (monthlyInterpretations[pm]) {
    return monthlyInterpretations[pm].default;
  }

  // Fallback para interpretação genérica
  const genericInterpretations: Record<number, MonthlyInterpretation> = {
    1: monthlyInterpretations[1].default,
    2: monthlyInterpretations[2].default,
    3: monthlyInterpretations[3].default,
    4: monthlyInterpretations[4].default,
    5: monthlyInterpretations[5].default,
    6: monthlyInterpretations[6].default,
    7: monthlyInterpretations[7].default,
    8: monthlyInterpretations[8].default,
    9: monthlyInterpretations[9].default,
  };

  return genericInterpretations[pm] || {
    prediction: `Energia do número ${pm}. Mês de transformação e aprendizado.`,
    tip: 'Confie em seu processo de transformação e crescimento.',
    avoid: 'Evite resistência às mudanças necessárias.'
  };
}
