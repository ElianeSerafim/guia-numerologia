/**
 * Interpretações de Previsões Anuais
 * Baseado em: Técnicas Avançadas de Numerologia Pitagórica
 * 
 * Ciclos Trimestrais (CTs) e Previsões para cada número (1-9)
 */

export interface AnnualPrediction {
  number: number;
  title: string;
  essence: string;
  polarities: {
    positive: string;
    negative: string;
    partial: string;
    extrapolation: string;
    block: string;
  };
  focus: string;
  recommendations: string[];
  challenges: string[];
  opportunities: string[];
}

export interface TrimestrePrediction {
  number: number;
  trimestre: number;
  title: string;
  essence: string;
  focus: string;
  activities: string[];
  cautions: string[];
}

// ========================================
// PREVISÕES ANUAIS (Anos Pessoais 1-9)
// ========================================

export const annualPredictions: Record<number, AnnualPrediction> = {
  1: {
    number: 1,
    title: "Ano de Novos Inícios e Ação",
    essence: "É o momento de começar novos projetos, tomar iniciativas e agir com coragem. Um ano de liderança, independência e conquistas através da ação determinada.",
    polarities: {
      positive: "Novos projetos florescem, você lidera com sucesso, conquistas significativas, independência alcançada, oportunidades de crescimento.",
      negative: "Impulsividade causa problemas, projetos fracassam, isolamento, conflitos por falta de diplomacia, desperdício de energia.",
      partial: "Alguns projetos progridem, outros enfrentam obstáculos, necessário ajustar estratégias, resultados moderados.",
      extrapolation: "Agressividade excessiva, arrogância, acidentes por pressa, perdas financeiras, relacionamentos prejudicados.",
      block: "Paralisação, falta de oportunidades, projetos não saem do papel, ano de espera e preparação."
    },
    focus: "Iniciativa, liderança, novos começos, ação decisiva",
    recommendations: [
      "Tome iniciativas e não espere oportunidades caírem do céu",
      "Seja corajoso em suas decisões, mas calcule os riscos",
      "Desenvolva sua liderança e independência",
      "Comece aquilo que deseja realizar neste ciclo",
      "Confie em sua força e determinação"
    ],
    challenges: [
      "Impulsividade e precipitação",
      "Falta de diplomacia",
      "Arrogância e egoísmo",
      "Isolamento social",
      "Agressividade desnecessária"
    ],
    opportunities: [
      "Iniciar novos negócios ou projetos",
      "Assumir posições de liderança",
      "Desenvolver independência",
      "Realizar conquistas pessoais",
      "Estabelecer novas direções na vida"
    ]
  },

  2: {
    number: 2,
    title: "Ano de Parcerias e Paciência",
    essence: "Ano de cooperação, diplomacia e trabalho em equipe. Requer paciência, sensibilidade e capacidade de ouvir. Relacionamentos ganham importância.",
    polarities: {
      positive: "Parcerias bem-sucedidas, relacionamentos fortalecem, harmonia nos projetos, apoio de aliados, equilíbrio emocional.",
      negative: "Conflitos em parcerias, dependência excessiva, indecisão, sensibilidade ferida, relacionamentos deterioram.",
      partial: "Algumas parcerias funcionam, outras enfrentam dificuldades, necessário ajustar comunicação.",
      extrapolation: "Dependência prejudicial, submissão excessiva, manipulação por outros, perda de identidade.",
      block: "Isolamento, falta de apoio, dificuldade em cooperar, relacionamentos estagnados."
    },
    focus: "Cooperação, diplomacia, paciência, relacionamentos, equilíbrio",
    recommendations: [
      "Cultive parcerias e alianças estratégicas",
      "Desenvolva sua capacidade de ouvir e compreender",
      "Seja paciente e diplomático nas negociações",
      "Fortaleça relacionamentos importantes",
      "Busque equilíbrio em suas ações"
    ],
    challenges: [
      "Indecisão e falta de ação",
      "Dependência de outros",
      "Sensibilidade excessiva",
      "Dificuldade em estabelecer limites",
      "Medo de conflitos"
    ],
    opportunities: [
      "Formar parcerias produtivas",
      "Melhorar relacionamentos",
      "Desenvolver diplomacia",
      "Trabalhar em equipe",
      "Encontrar equilíbrio e harmonia"
    ]
  },

  3: {
    number: 3,
    title: "Ano de Criatividade e Expressão",
    essence: "Ano de criatividade, comunicação e expressão pessoal. Ideal para projetos criativos, viagens, socialização e diversão.",
    polarities: {
      positive: "Criatividade floresce, comunicação eficaz, socialização agradável, projetos criativos prosperam, alegria e diversão.",
      negative: "Dispersão e falta de foco, comunicação prejudicada, relacionamentos superficiais, gastos excessivos.",
      partial: "Alguns projetos criativos progridem, comunicação intermitente, necessário maior dedicação.",
      extrapolation: "Dispersão extrema, gastos descontrolados, comunicação confusa, relacionamentos caóticos.",
      block: "Bloqueio criativo, dificuldade em se expressar, isolamento social, falta de inspiração."
    },
    focus: "Criatividade, comunicação, expressão, diversão, socialização",
    recommendations: [
      "Expresse sua criatividade em projetos pessoais",
      "Melhore sua comunicação e expressão",
      "Aproveite para viajar e socializar",
      "Desenvolva seus talentos artísticos",
      "Mantenha o foco apesar da diversidade"
    ],
    challenges: [
      "Dispersão e falta de foco",
      "Gastos excessivos",
      "Comunicação confusa",
      "Superficialidade nos relacionamentos",
      "Falta de disciplina"
    ],
    opportunities: [
      "Expressar criatividade",
      "Melhorar habilidades de comunicação",
      "Viajar e explorar",
      "Desenvolver talentos artísticos",
      "Desfrutar de vida social ativa"
    ]
  },

  4: {
    number: 4,
    title: "Ano de Trabalho e Estabilidade",
    essence: "Ano de trabalho árduo, construção de bases sólidas e organização. Requer disciplina, dedicação e atenção aos detalhes.",
    polarities: {
      positive: "Trabalho produtivo, bases sólidas estabelecidas, organização melhorada, estabilidade financeira, progresso concreto.",
      negative: "Trabalho excessivo, rigidez, falta de flexibilidade, problemas estruturais, limitações e restrições.",
      partial: "Algum progresso em bases, mas com dificuldades, necessário maior esforço.",
      extrapolation: "Trabalho obsessivo, rigidez extrema, saúde prejudicada, falta de diversão, relacionamentos negligenciados.",
      block: "Falta de progresso, estrutura frágil, dificuldade em organizar, instabilidade persistente."
    },
    focus: "Trabalho, disciplina, organização, construção de bases, estabilidade",
    recommendations: [
      "Dedique-se ao trabalho com disciplina e foco",
      "Organize sua vida e finanças",
      "Construa bases sólidas para o futuro",
      "Seja prático e realista",
      "Invista em estrutura e segurança"
    ],
    challenges: [
      "Trabalho excessivo",
      "Rigidez e falta de flexibilidade",
      "Monotonia e falta de criatividade",
      "Limitações e restrições",
      "Dificuldade em relaxar"
    ],
    opportunities: [
      "Estabelecer bases sólidas",
      "Organizar vida e negócios",
      "Alcançar estabilidade financeira",
      "Desenvolver disciplina",
      "Construir estruturas duradouras"
    ]
  },

  5: {
    number: 5,
    title: "Ano de Mudanças e Liberdade",
    essence: "Ano de transformações, mudanças e liberdade. Traz dinamismo, viagens, novas experiências e adaptabilidade.",
    polarities: {
      positive: "Mudanças positivas, liberdade alcançada, viagens e aventuras, adaptabilidade, novas oportunidades.",
      negative: "Mudanças caóticas, impulsividade, instabilidade, relacionamentos prejudicados, falta de direção.",
      partial: "Algumas mudanças ocorrem, outras não, necessário maior clareza sobre objetivos.",
      extrapolation: "Caos total, impulsividade destrutiva, vício, relacionamentos destruídos, perdas significativas.",
      block: "Estagnação, falta de mudanças, sensação de prisão, oportunidades não aparecem."
    },
    focus: "Mudanças, liberdade, adaptabilidade, movimento, novas experiências",
    recommendations: [
      "Abraçe as mudanças com flexibilidade",
      "Viaje e explore novas experiências",
      "Adapte-se às circunstâncias",
      "Busque liberdade e independência",
      "Mantenha foco apesar da dinamicidade"
    ],
    challenges: [
      "Instabilidade e impulsividade",
      "Falta de direção",
      "Relacionamentos instáveis",
      "Gastos excessivos",
      "Falta de comprometimento"
    ],
    opportunities: [
      "Viajar e explorar",
      "Realizar mudanças necessárias",
      "Ganhar liberdade",
      "Experimentar novas coisas",
      "Desenvolver adaptabilidade"
    ]
  },

  6: {
    number: 6,
    title: "Ano de Família e Afeto",
    essence: "Ano de responsabilidades familiares, amor e cuidado. Ênfase em relacionamentos, família e serviço ao próximo.",
    polarities: {
      positive: "Relacionamentos fortalecem, família unida, amor e carinho, responsabilidades bem geridas, harmonia doméstica.",
      negative: "Conflitos familiares, responsabilidades opressivas, relacionamentos prejudicados, ciúmes e possessividade.",
      partial: "Alguns relacionamentos melhoram, outros enfrentam dificuldades, necessário maior dedicação.",
      extrapolation: "Codependência, sacrifício excessivo, relacionamentos tóxicos, perda de identidade pessoal.",
      block: "Isolamento familiar, falta de apoio, relacionamentos superficiais, responsabilidades negligenciadas."
    },
    focus: "Família, amor, responsabilidade, cuidado, harmonia doméstica",
    recommendations: [
      "Dedique tempo à família e relacionamentos",
      "Assuma responsabilidades com amor",
      "Cultive harmonia no lar",
      "Cuide de quem ama",
      "Equilibre responsabilidades pessoais e familiares"
    ],
    challenges: [
      "Responsabilidades opressivas",
      "Conflitos familiares",
      "Possessividade e ciúmes",
      "Sacrifício excessivo",
      "Falta de limites"
    ],
    opportunities: [
      "Fortalecer relacionamentos",
      "Unir a família",
      "Criar harmonia doméstica",
      "Servir com amor",
      "Desenvolver responsabilidade"
    ]
  },

  7: {
    number: 7,
    title: "Ano de Análise e Autoconhecimento",
    essence: "Ano de introspecção, análise e busca espiritual. Ideal para estudos, meditação e compreensão profunda.",
    polarities: {
      positive: "Autoconhecimento aprofundado, estudos bem-sucedidos, clareza mental, espiritualidade desenvolvida, sabedoria adquirida.",
      negative: "Isolamento excessivo, paranoia, depressão, ceticismo, dificuldade em se conectar com outros.",
      partial: "Alguma introspecção, mas com dificuldade em aplicar aprendizados, necessário maior dedicação.",
      extrapolation: "Isolamento total, depressão profunda, paranoia, fuga da realidade, relacionamentos destruídos.",
      block: "Falta de clareza, confusão mental, dificuldade em compreender, superficialidade persistente."
    },
    focus: "Análise, introspecção, espiritualidade, aprendizado, autoconhecimento",
    recommendations: [
      "Dedique-se ao autoconhecimento",
      "Estude e aprofunde conhecimentos",
      "Medite e busque espiritualidade",
      "Analise sua vida com honestidade",
      "Busque compreensão profunda"
    ],
    challenges: [
      "Isolamento excessivo",
      "Depressão e melancolia",
      "Ceticismo extremo",
      "Dificuldade em confiar",
      "Paranoia"
    ],
    opportunities: [
      "Aprofundar autoconhecimento",
      "Desenvolver espiritualidade",
      "Adquirir sabedoria",
      "Estudar e aprender",
      "Encontrar clareza mental"
    ]
  },

  8: {
    number: 8,
    title: "Ano de Colheita e Poder",
    essence: "Ano de colheita, poder e abundância. Recompensas pelo trabalho anterior, sucesso material e reconhecimento.",
    polarities: {
      positive: "Colheita de sucesso, abundância material, poder e reconhecimento, negócios prosperam, realizações significativas.",
      negative: "Perdas materiais, abuso de poder, conflitos sobre dinheiro, desonestidade, fracasso nos negócios.",
      partial: "Alguma colheita, mas com dificuldades, necessário maior esforço para consolidar ganhos.",
      extrapolation: "Ganância extrema, abuso de poder, perdas catastróficas, corrupção, relacionamentos destruídos.",
      block: "Falta de colheita, perdas inesperadas, poder usurpado, dificuldade em prosperar."
    },
    focus: "Poder, abundância, colheita, negócios, reconhecimento",
    recommendations: [
      "Colha os frutos do trabalho anterior",
      "Use seu poder com responsabilidade",
      "Invista em negócios e crescimento",
      "Busque reconhecimento e sucesso",
      "Gerencie recursos com sabedoria"
    ],
    challenges: [
      "Ganância e ambição excessiva",
      "Abuso de poder",
      "Conflitos sobre dinheiro",
      "Desonestidade",
      "Falta de ética"
    ],
    opportunities: [
      "Alcançar sucesso material",
      "Colher abundância",
      "Ganhar reconhecimento",
      "Desenvolver poder pessoal",
      "Prosperar nos negócios"
    ]
  },

  9: {
    number: 9,
    title: "Ano de Conclusão e Limpeza",
    essence: "Ano de conclusões, limpeza e encerramento de ciclos. Momento de deixar ir e preparar-se para novos começos.",
    polarities: {
      positive: "Ciclos encerram naturalmente, limpeza completa, transformação profunda, sabedoria universal, renascimento.",
      negative: "Resistência à mudança, apego ao passado, perdas dolorosas, confusão, falta de direção.",
      partial: "Alguns ciclos encerram, outros persistem, necessário maior disposição para deixar ir.",
      extrapolation: "Perdas catastróficas, destruição total, depressão profunda, isolamento completo, colapso.",
      block: "Ciclos não encerram, estagnação, falta de transformação, repetição de padrões."
    },
    focus: "Conclusão, limpeza, transformação, encerramento, renovação",
    recommendations: [
      "Encerre ciclos que não servem mais",
      "Limpe sua vida de tudo que é desnecessário",
      "Deixe ir com graça e aceitação",
      "Prepare-se para novos começos",
      "Busque sabedoria universal"
    ],
    challenges: [
      "Resistência à mudança",
      "Apego ao passado",
      "Perdas e despedidas",
      "Confusão sobre o futuro",
      "Medo do desconhecido"
    ],
    opportunities: [
      "Encerrar ciclos antigos",
      "Limpar e renovar",
      "Transformação profunda",
      "Ganhar sabedoria",
      "Preparar para novos começos"
    ]
  }
};

// ========================================
// INTERPRETAÇÕES DE CICLOS TRIMESTRAIS
// ========================================

export const getTrimestreInterpretation = (number: number, trimestre: number): TrimestrePrediction | null => {
  const baseInterpretation = annualPredictions[number];
  if (!baseInterpretation) return null;

  const trimestreNames = ['1º Trimestre', '2º Trimestre', '3º Trimestre', '4º Trimestre'];
  const trimestresDescription = [
    'Início do ciclo anual - Planejamento e Iniciação',
    'Desenvolvimento - Ação e Progresso',
    'Consolidação - Refinamento e Ajustes',
    'Conclusão - Colheita e Preparação'
  ];

  return {
    number,
    trimestre,
    title: `${trimestreNames[trimestre - 1]} - ${baseInterpretation.title}`,
    essence: `${trimestresDescription[trimestre - 1]}: ${baseInterpretation.essence}`,
    focus: baseInterpretation.focus,
    activities: baseInterpretation.recommendations,
    cautions: baseInterpretation.challenges
  };
};

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

export const getAnnualPrediction = (number: number): AnnualPrediction | null => {
  return annualPredictions[number] || null;
};

export const getYearDescription = (year: number): string => {
  const descriptions: Record<number, string> = {
    1: 'Novos Inícios e Ação',
    2: 'Parcerias e Paciência',
    3: 'Criatividade e Expressão',
    4: 'Trabalho e Estabilidade',
    5: 'Mudanças e Liberdade',
    6: 'Família e Afeto',
    7: 'Análise e Autoconhecimento',
    8: 'Colheita e Poder',
    9: 'Conclusão e Limpeza',
    11: 'Iluminação Espiritual',
    22: 'Grandes Realizações',
    33: 'Amor Universal'
  };
  return descriptions[year] || 'Transformação';
};
