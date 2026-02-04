/**
 * Interpretações de Previsões Mensais
 * 
 * Fórmula: Previsão Mensal = Ano Pessoal (AP) + Mês clicado
 * Baseado na metodologia oficial de numerologia
 */

export interface MonthlyInterpretation {
  number: number;
  title: string;
  prediction: string;
  howToLeverage: string[];
  whatToAvoid: string[];
}

export const MONTHLY_INTERPRETATIONS: Record<number, MonthlyInterpretation> = {
  1: {
    number: 1,
    title: "Mês de Novos Começos",
    prediction: "Este é um mês de iniciativa, liderança e novos começos. A energia do número 1 traz coragem para iniciar projetos, tomar decisões importantes e assumir o protagonismo da sua vida. É hora de plantar as sementes do que deseja colher nos próximos meses. Confie na sua visão e dê o primeiro passo com determinação.",
    howToLeverage: [
      "Inicie novos projetos pessoais ou profissionais",
      "Tome decisões que vinha adiando",
      "Assuma posições de liderança",
      "Confie na sua intuição e visão",
      "Seja pioneiro em alguma área da sua vida"
    ],
    whatToAvoid: [
      "Impulsividade sem planejamento",
      "Excesso de individualismo",
      "Agressividade nas relações",
      "Ignorar conselhos importantes",
      "Procrastinação por medo"
    ]
  },
  2: {
    number: 2,
    title: "Mês de Parcerias e Diplomacia",
    prediction: "A energia do número 2 traz foco em relacionamentos, cooperação e sensibilidade emocional. Este é um mês para fortalecer vínculos, praticar a diplomacia e trabalhar em equipe. Sua capacidade de ouvir e mediar conflitos estará em alta. Valorize as parcerias e busque o equilíbrio entre dar e receber.",
    howToLeverage: [
      "Fortaleça relacionamentos importantes",
      "Pratique a escuta ativa e empatia",
      "Forme parcerias estratégicas",
      "Busque consenso em situações de conflito",
      "Cultive a paciência e receptividade"
    ],
    whatToAvoid: [
      "Dependência emocional excessiva",
      "Submissão ou perda de limites",
      "Indecisão paralisante",
      "Sensibilidade exagerada a críticas",
      "Manipulação emocional"
    ]
  },
  3: {
    number: 3,
    title: "Mês de Expressão e Criatividade",
    prediction: "O número 3 traz alegria, criatividade e comunicação. Este é um mês para se expressar autenticamente, socializar e deixar sua criatividade fluir. Projetos artísticos, comunicação e networking estão favorecidos. Permita-se brilhar e compartilhar seus talentos com o mundo.",
    howToLeverage: [
      "Expresse-se criativamente (arte, escrita, fala)",
      "Socialize e expanda sua rede de contatos",
      "Lance projetos de comunicação ou marketing",
      "Participe de eventos culturais",
      "Traga mais alegria e leveza ao cotidiano"
    ],
    whatToAvoid: [
      "Dispersão e falta de foco",
      "Superficialidade nas relações",
      "Exibicionismo ou arrogância",
      "Fofoca e comunicação destrutiva",
      "Promessas que não pode cumprir"
    ]
  },
  4: {
    number: 4,
    title: "Mês de Estrutura e Trabalho",
    prediction: "A energia do número 4 pede organização, disciplina e trabalho consistente. Este é um mês para construir bases sólidas, estabelecer rotinas produtivas e focar em resultados práticos. O esforço dedicado agora trará frutos duradouros. Seja metódico e persistente.",
    howToLeverage: [
      "Organize finanças e projetos",
      "Estabeleça rotinas produtivas",
      "Foque em trabalho e construção de bases",
      "Formalize acordos e contratos",
      "Cuide da saúde física e bem-estar"
    ],
    whatToAvoid: [
      "Workaholismo e negligência da vida pessoal",
      "Rigidez excessiva",
      "Resistência a mudanças necessárias",
      "Perfeccionismo paralisante",
      "Negligência do descanso"
    ]
  },
  5: {
    number: 5,
    title: "Mês de Mudança e Liberdade",
    prediction: "O número 5 traz movimento, mudança e expansão de horizontes. Este é um mês para abraçar o novo, viajar, experimentar e sair da zona de conforto. A liberdade e a versatilidade estão em alta. Permita-se aventurar e explorar novas possibilidades.",
    howToLeverage: [
      "Viaje ou explore novos lugares",
      "Experimente novas atividades e experiências",
      "Seja flexível e adaptável",
      "Expanda seus horizontes pessoais e profissionais",
      "Abrace mudanças com coragem"
    ],
    whatToAvoid: [
      "Imprudência e irresponsabilidade",
      "Instabilidade excessiva",
      "Fuga de compromissos importantes",
      "Dispersão de energia",
      "Decisões impulsivas sem reflexão"
    ]
  },
  6: {
    number: 6,
    title: "Mês de Amor e Responsabilidade",
    prediction: "A energia do número 6 traz foco em família, lar, relacionamentos e responsabilidades afetivas. Este é um mês para cuidar de quem ama, harmonizar o ambiente doméstico e assumir compromissos com amor. A beleza, o cuidado e a harmonia estão em destaque.",
    howToLeverage: [
      "Fortaleça laços familiares",
      "Cuide do lar e do ambiente",
      "Assuma responsabilidades com amor",
      "Pratique o cuidado consigo e com outros",
      "Traga beleza e harmonia ao seu espaço"
    ],
    whatToAvoid: [
      "Controle excessivo sobre outros",
      "Sacrifício da própria identidade",
      "Perfeccionismo estético",
      "Assumir responsabilidades que não são suas",
      "Dependência afetiva"
    ]
  },
  7: {
    number: 7,
    title: "Mês de Introspecção e Sabedoria",
    prediction: "O número 7 convida à introspecção, estudo e conexão espiritual. Este é um mês para buscar respostas internas, aprofundar conhecimentos e confiar na intuição. Momentos de solidão e reflexão são necessários. Busque a verdade e a sabedoria.",
    howToLeverage: [
      "Reserve tempo para meditação e reflexão",
      "Estude e aprofunde conhecimentos",
      "Confie na sua intuição",
      "Busque práticas espirituais",
      "Analise situações com profundidade"
    ],
    whatToAvoid: [
      "Isolamento excessivo",
      "Arrogância intelectual",
      "Paralisia por análise",
      "Desconexão do mundo material",
      "Ceticismo que bloqueia a fé"
    ]
  },
  8: {
    number: 8,
    title: "Mês de Poder e Prosperidade",
    prediction: "A energia do número 8 traz foco em poder, prosperidade e realizações materiais. Este é um mês para assumir autoridade, expandir negócios e buscar resultados concretos. O sucesso financeiro e profissional está favorecido. Seja estratégico e ambicioso.",
    howToLeverage: [
      "Foque em metas financeiras e profissionais",
      "Negocie, invista e expanda negócios",
      "Assuma posições de autoridade",
      "Seja estratégico e objetivo",
      "Colha os frutos do seu esforço"
    ],
    whatToAvoid: [
      "Ganância e obsessão por dinheiro",
      "Autoritarismo e dureza",
      "Desonestidade nos negócios",
      "Negligência da vida pessoal",
      "Controle excessivo"
    ]
  },
  9: {
    number: 9,
    title: "Mês de Encerramento e Compaixão",
    prediction: "O número 9 traz energia de finalização, liberação e compaixão universal. Este é um mês para encerrar ciclos, perdoar, doar e servir. Deixe ir o que não serve mais e prepare-se para novos começos. A generosidade e o desapego estão em destaque.",
    howToLeverage: [
      "Finalize projetos e ciclos pendentes",
      "Pratique o perdão e a liberação",
      "Doe, compartilhe e sirva",
      "Cultive compaixão e empatia",
      "Prepare-se para novos começos"
    ],
    whatToAvoid: [
      "Apego ao passado",
      "Amargura e ressentimento",
      "Dramatização excessiva",
      "Resistência a términos necessários",
      "Isolamento emocional"
    ]
  }
};

/**
 * Calcula o número da previsão mensal
 * @param personalYear Ano Pessoal (1-9)
 * @param month Mês (1-12)
 * @returns Número da previsão mensal reduzido (1-9)
 */
export function calculateMonthlyNumber(personalYear: number, month: number): number {
  const sum = personalYear + month;
  
  // Reduzir para 1-9
  let result = sum;
  while (result > 9) {
    result = result.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  
  return result;
}

/**
 * Retorna interpretação mensal para um número específico
 * @param monthlyNumber Número da previsão mensal (1-9)
 * @returns Interpretação mensal ou null se não encontrada
 */
export function getMonthlyInterpretation(monthlyNumber: number): MonthlyInterpretation | null {
  return MONTHLY_INTERPRETATIONS[monthlyNumber] || null;
}

/**
 * Nomes dos meses em português
 */
export const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
