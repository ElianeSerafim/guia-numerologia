/**
 * Interpretações Terapêuticas de Ciclos de Vida (C1, C2, C3)
 * 
 * Baseado na metodologia de Elias Abrão Neto
 * 
 * C1 (Formativo): 0-28 anos - Base da personalidade e vínculos familiares
 * C2 (Produtivo): 29-56 anos - Ciclo mais importante, momento de produzir
 * C3 (Colheita): 57+ anos - Como a alma gosta de envelhecer
 */

export interface LifecycleInterpretation {
  number: number;
  title: string;
  description: string;
  potentials: string[];
  possibleWounds: string[];
  consultationQuestion: string;
}

// ==================== C1 - CICLO FORMATIVO (0-28 ANOS) ====================

export const C1_INTERPRETATIONS: Record<number, LifecycleInterpretation> = {
  1: {
    number: 1,
    title: "Formação na força e na autonomia",
    description: "Criança que aprende cedo a se virar, tomar iniciativa, 'ser forte'. Este ciclo formativo molda uma personalidade independente, que desde cedo precisou assumir responsabilidades e confiar em si mesma.",
    potentials: [
      "Coragem natural e capacidade de enfrentar desafios",
      "Forte senso de independência e autonomia",
      "Identidade clara e bem definida desde cedo",
      "Liderança natural e iniciativa",
      "Resiliência e capacidade de superação"
    ],
    possibleWounds: [
      "Sensação de ter que dar conta de tudo sozinha",
      "Dificuldade em pedir ajuda ou mostrar vulnerabilidade",
      "Medo de depender emocionalmente de alguém",
      "Pressão interna de sempre ser forte",
      "Solidão emocional por não compartilhar dificuldades"
    ],
    consultationQuestion: "Você cresceu ouvindo: 'você aguenta', 'não chora', 'resolve'? Hoje sua alma ainda tenta provar que é forte o tempo todo?"
  },
  2: {
    number: 2,
    title: "Formação na sensibilidade e nas relações",
    description: "Criança que precisa de companhia, parceria, afeto. Este ciclo formativo desenvolve uma personalidade sensível, diplomática e profundamente conectada às relações.",
    potentials: [
      "Empatia profunda e capacidade de se colocar no lugar do outro",
      "Diplomacia natural em situações de conflito",
      "Capacidade de cooperação e trabalho em equipe",
      "Sensibilidade emocional aguçada",
      "Habilidade de mediar e harmonizar ambientes"
    ],
    possibleWounds: [
      "Dependência emocional de outras pessoas",
      "Medo intenso de rejeição ou abandono",
      "Dificuldade em se posicionar e defender suas opiniões",
      "Tendência a se anular para manter a paz",
      "Insegurança sobre o próprio valor"
    ],
    consultationQuestion: "Você aprendeu a se adaptar para ser aceita? Hoje, sua cura é aprender a se escolher sem abandonar o outro."
  },
  3: {
    number: 3,
    title: "Formação na expressão",
    description: "Criança comunicativa, criativa, inquieta. Este ciclo formativo molda uma personalidade expressiva, artística e naturalmente comunicativa.",
    potentials: [
      "Comunicação fluente e cativante",
      "Charme natural e carisma",
      "Senso de humor desenvolvido",
      "Talento artístico e criativo",
      "Capacidade de inspirar e entreter"
    ],
    possibleWounds: [
      "Não ser levada a sério quando se expressa",
      "Ser calada ou criticada por sua espontaneidade",
      "Rótulos de 'exagerada', 'dramática', 'faladeira demais'",
      "Medo de se expor e ser julgada",
      "Autocensura e perda da voz autêntica"
    ],
    consultationQuestion: "Quando você foi chamada de exagerada, dramática, 'faladeira demais', uma parte sua aprendeu a se podar. Agora é hora de recuperar essa voz."
  },
  4: {
    number: 4,
    title: "Formação na disciplina e responsabilidade",
    description: "Criança que trabalha cedo ou sente que precisa 'ser responsável' antes do tempo. Este ciclo formativo cria uma personalidade disciplinada, estruturada e extremamente responsável.",
    potentials: [
      "Estrutura mental e capacidade de organização",
      "Disciplina e persistência",
      "Honestidade e integridade",
      "Senso de responsabilidade desenvolvido",
      "Capacidade de construir bases sólidas"
    ],
    possibleWounds: [
      "Dureza consigo mesma e autocobrança excessiva",
      "Culpa por descansar ou se divertir",
      "Medo paralisante de errar",
      "Sensação de carregar o mundo nas costas",
      "Dificuldade em relaxar e aproveitar a vida"
    ],
    consultationQuestion: "Quem te ensinou que descanso é preguiça? Sua alma de hoje está cansada de carregar o mundo sozinha."
  },
  5: {
    number: 5,
    title: "Formação no movimento e nas mudanças",
    description: "Criança que muda de casa, escola, rotina, ou vive instabilidades. Este ciclo formativo desenvolve uma personalidade adaptável, versátil e aberta ao novo.",
    potentials: [
      "Adaptabilidade excepcional a novas situações",
      "Versatilidade e múltiplas habilidades",
      "Coragem para experimentar o novo",
      "Liberdade de espírito",
      "Capacidade de se reinventar"
    ],
    possibleWounds: [
      "Medo de abandono e perda",
      "Dificuldade de criar raízes e se comprometer",
      "Inquietação constante e ansiedade",
      "Sensação de que nada dura",
      "Fuga como mecanismo de defesa"
    ],
    consultationQuestion: "Você aprendeu que nada dura. Hoje sua cura é escolher o que quer manter e não viver só reagindo ao caos."
  },
  6: {
    number: 6,
    title: "Formação no afeto e no lar",
    description: "Criança que vive tudo através da dinâmica familiar. Este ciclo formativo cria uma personalidade cuidadora, responsável e profundamente ligada ao lar.",
    potentials: [
      "Capacidade de cuidar e nutrir",
      "Habilidade de conciliação e harmonização",
      "Senso de família e pertencimento",
      "Amor generoso e incondicional",
      "Criação de ambientes acolhedores"
    ],
    possibleWounds: [
      "Parentificação (virar 'mãezinha' de todos muito cedo)",
      "Culpa constante por não fazer o suficiente",
      "Dificuldade em dizer 'não' e estabelecer limites",
      "Sacrifício da própria identidade pelo outro",
      "Necessidade de ser necessária"
    ],
    consultationQuestion: "Você virou cedo o equilíbrio da casa? Hoje sua alma pede para ser cuidada também."
  },
  7: {
    number: 7,
    title: "Formação na introspecção e na busca de sentido",
    description: "Criança 'diferente', introspectiva, sensível, muitas vezes incompreendida. Este ciclo formativo desenvolve uma personalidade profunda, espiritual e analítica.",
    potentials: [
      "Profundidade de pensamento e análise",
      "Espiritualidade e conexão com o transcendente",
      "Percepção aguçada e intuição",
      "Capacidade de investigação e busca da verdade",
      "Sabedoria além da idade"
    ],
    possibleWounds: [
      "Sensação de não pertencer a lugar nenhum",
      "Rótulos de 'estranha', 'esquisita', 'diferente'",
      "Solidão emocional profunda",
      "Dificuldade de se conectar com o mundo material",
      "Isolamento como proteção"
    ],
    consultationQuestion: "Você sempre sentiu que via o que ninguém via? Agora é hora de honrar essa visão sem se forçar a caber em moldes."
  },
  8: {
    number: 8,
    title: "Formação na sobrevivência material e poder",
    description: "Criança que presencia temas de dinheiro, justiça, autoridade. Este ciclo formativo molda uma personalidade forte, ambiciosa e focada em resultados.",
    potentials: [
      "Liderança natural e autoridade",
      "Visão prática e estratégica",
      "Capacidade de conquistar e realizar",
      "Senso de justiça desenvolvido",
      "Resiliência financeira e material"
    ],
    possibleWounds: [
      "Medo de perder tudo e voltar à escassez",
      "Rigidez e dificuldade de relaxar",
      "Controle excessivo sobre tudo e todos",
      "Associação de valor próprio com dinheiro",
      "Dureza emocional como proteção"
    ],
    consultationQuestion: "Você aprendeu que dinheiro é questão de sobrevivência e respeito. Hoje sua cura é prosperar com leveza, não só por defesa."
  },
  9: {
    number: 9,
    title: "Formação na sensibilidade e no serviço",
    description: "Criança que absorve emoções da casa, sente tudo. Este ciclo formativo desenvolve uma personalidade compassiva, artística e profundamente empática.",
    potentials: [
      "Compaixão universal e empatia profunda",
      "Talento artístico e sensibilidade estética",
      "Visão ampla e compreensão humanitária",
      "Capacidade de servir e ajudar",
      "Sabedoria emocional"
    ],
    possibleWounds: [
      "Culpa por não conseguir salvar todos",
      "Dramas emocionais e intensidade excessiva",
      "Tendência a carregar o sofrimento do mundo",
      "Dificuldade em estabelecer limites emocionais",
      "Martírio e autossacrifício"
    ],
    consultationQuestion: "Você aprendeu a se preocupar com todo mundo. Agora precisa se incluir no amor que oferece."
  }
};

// ==================== C2 - CICLO PRODUTIVO (29-56 ANOS) ====================

export const C2_INTERPRETATIONS: Record<number, LifecycleInterpretation> = {
  1: {
    number: 1,
    title: "Ciclo de protagonismo",
    description: "Momento de empreender, liderar, inovar. Este é o período de assumir o protagonismo da própria vida e deixar sua marca no mundo.",
    potentials: [
      "Empreendedorismo e iniciativa",
      "Liderança em projetos e equipes",
      "Inovação e pioneirismo",
      "Coragem para começar do zero",
      "Independência profissional"
    ],
    possibleWounds: [
      "Rigidez no 'tem que ser do meu jeito'",
      "Dificuldade em aceitar ajuda ou parceria",
      "Isolamento por excesso de independência",
      "Impulsividade em decisões importantes",
      "Conflitos por autoritarismo"
    ],
    consultationQuestion: "Este é seu ciclo de liderar. Como você pode fazer isso sem carregar tudo sozinha?"
  },
  2: {
    number: 2,
    title: "Ciclo de parcerias",
    description: "Sucesso vem via alianças, colaborações e relacionamentos. Este é o período de construir junto, não sozinha.",
    potentials: [
      "Parcerias estratégicas e duradouras",
      "Diplomacia nos negócios",
      "Sucesso através de alianças",
      "Sensibilidade às necessidades do mercado",
      "Trabalho em equipe eficaz"
    ],
    possibleWounds: [
      "Engolir demais para manter a paz",
      "Dependência de aprovação alheia",
      "Dificuldade em se posicionar",
      "Parcerias desequilibradas",
      "Perda de identidade profissional"
    ],
    consultationQuestion: "Suas parcerias estão equilibradas ou você está se anulando para manter a harmonia?"
  },
  3: {
    number: 3,
    title: "Ciclo de comunicação e visibilidade",
    description: "Momento de criar, lançar, mostrar-se. Este é o período de dar voz ao seu trabalho e se tornar visível.",
    potentials: [
      "Comunicação eficaz e marketing pessoal",
      "Criatividade aplicada aos negócios",
      "Visibilidade e reconhecimento",
      "Networking estratégico",
      "Expressão autêntica no trabalho"
    ],
    possibleWounds: [
      "Dispersão e falta de foco",
      "Promessas exageradas não cumpridas",
      "Superficialidade nos projetos",
      "Medo de se expor",
      "Procrastinação criativa"
    ],
    consultationQuestion: "Você está usando sua voz para criar ou está se dispersando em mil direções?"
  },
  4: {
    number: 4,
    title: "Ciclo de trabalho intenso e construção de base",
    description: "Período de estruturar, organizar, construir bases sólidas. Este é o momento de trabalhar duro e colher resultados concretos.",
    potentials: [
      "Construção de bases sólidas",
      "Disciplina e organização",
      "Resultados tangíveis e duradouros",
      "Reputação de confiabilidade",
      "Estabilidade financeira"
    ],
    possibleWounds: [
      "Viver só para o trabalho",
      "Workaholismo e esgotamento",
      "Rigidez e resistência a mudanças",
      "Perfeccionismo paralisante",
      "Negligência da vida pessoal"
    ],
    consultationQuestion: "Você está construindo algo sólido ou apenas trabalhando sem parar?"
  },
  5: {
    number: 5,
    title: "Ciclo de mudanças profissionais",
    description: "Período de transições, liberdade, experimentação. Este é o momento de expandir horizontes e abraçar o novo.",
    potentials: [
      "Flexibilidade profissional",
      "Múltiplas fontes de renda",
      "Liberdade e autonomia",
      "Adaptação a novos mercados",
      "Reinvenção constante"
    ],
    possibleWounds: [
      "Não fincar raízes em nada",
      "Instabilidade financeira crônica",
      "Fuga de compromissos",
      "Dispersão de talentos",
      "Ansiedade por mudança constante"
    ],
    consultationQuestion: "Suas mudanças são evolução ou fuga? O que você está evitando ao não se comprometer?"
  },
  6: {
    number: 6,
    title: "Ciclo de negócios ligados a cuidado",
    description: "Período de trabalhar com estética, família, terapias, cuidado. Este é o momento de harmonizar pessoal e profissional.",
    potentials: [
      "Negócios de cuidado e bem-estar",
      "Estética e harmonização de ambientes",
      "Trabalho com famílias e relacionamentos",
      "Terapias e aconselhamento",
      "Responsabilidade social nos negócios"
    ],
    possibleWounds: [
      "Misturar demais pessoal e profissional",
      "Assumir responsabilidades de clientes",
      "Dificuldade em cobrar pelo trabalho",
      "Perfeccionismo estético",
      "Controle excessivo"
    ],
    consultationQuestion: "Você está cuidando dos outros no trabalho mas esquecendo de cuidar de si?"
  },
  7: {
    number: 7,
    title: "Ciclo de aprofundamento e especialização",
    description: "Período de estudo, conhecimento, espiritualidade. Este é o momento de se tornar especialista e buscar profundidade.",
    potentials: [
      "Especialização e expertise",
      "Carreira acadêmica ou de pesquisa",
      "Trabalho espiritual ou terapêutico",
      "Consultoria de alto nível",
      "Conhecimento profundo"
    ],
    possibleWounds: [
      "Afastamento do mundo concreto",
      "Dificuldade de se vender",
      "Isolamento profissional",
      "Arrogância intelectual",
      "Desconexão do mercado"
    ],
    consultationQuestion: "Seu conhecimento está servindo ao mundo ou você está se isolando nele?"
  },
  8: {
    number: 8,
    title: "Ciclo de poder e prosperidade",
    description: "Período de cargos, empresas, finanças. Este é o momento de assumir poder e expandir materialmente.",
    potentials: [
      "Posições de liderança e poder",
      "Expansão de negócios",
      "Prosperidade financeira",
      "Autoridade no mercado",
      "Legado material"
    ],
    possibleWounds: [
      "Exaustão por excesso de trabalho",
      "Rigidez e controle",
      "Obsessão por dinheiro",
      "Autoritarismo",
      "Negligência da vida pessoal"
    ],
    consultationQuestion: "Você está prosperando ou apenas acumulando? Seu poder está a serviço de quê?"
  },
  9: {
    number: 9,
    title: "Ciclo de finalização e impacto social",
    description: "Período de encerrar um estilo de vida e trabalhar com impacto social, artístico, espiritual. Este é o momento de servir algo maior.",
    potentials: [
      "Trabalho com impacto social",
      "Arte e expressão universal",
      "Espiritualidade aplicada",
      "Filantropia e serviço",
      "Legado humanitário"
    ],
    possibleWounds: [
      "Carregar mais do que consegue",
      "Martírio e autossacrifício",
      "Dramas emocionais no trabalho",
      "Dificuldade em finalizar ciclos",
      "Apego ao passado"
    ],
    consultationQuestion: "Você está servindo com amor ou se sacrificando por culpa?"
  }
};

// ==================== C3 - CICLO DE COLHEITA (57+ ANOS) ====================

export const C3_INTERPRETATIONS: Record<number, LifecycleInterpretation> = {
  1: {
    number: 1,
    title: "Envelhecer com autonomia",
    description: "A alma gosta de envelhecer mantendo sua independência, iniciando novos projetos e sendo protagonista da própria vida.",
    potentials: [
      "Independência até idade avançada",
      "Novos começos mesmo na maturidade",
      "Liderança e referência para outros",
      "Vitalidade e energia",
      "Liberdade de escolha"
    ],
    possibleWounds: [
      "Solidão por excesso de independência",
      "Dificuldade em aceitar ajuda",
      "Resistência ao envelhecimento",
      "Isolamento",
      "Teimosia"
    ],
    consultationQuestion: "Como você pode manter sua autonomia sem se isolar?"
  },
  2: {
    number: 2,
    title: "Envelhecer em companhia",
    description: "A alma gosta de envelhecer cercada de afeto, parcerias e relacionamentos significativos.",
    potentials: [
      "Relacionamentos profundos na maturidade",
      "Sabedoria relacional",
      "Companhia e afeto",
      "Diplomacia e mediação",
      "Legado de amor"
    ],
    possibleWounds: [
      "Dependência emocional",
      "Medo de ficar sozinha",
      "Anulação de si mesma",
      "Dificuldade com perdas",
      "Submissão"
    ],
    consultationQuestion: "Você está cultivando relações que nutrem ou que drenam?"
  },
  3: {
    number: 3,
    title: "Envelhecer com expressão",
    description: "A alma gosta de envelhecer se expressando, criando, comunicando e mantendo a alegria de viver.",
    potentials: [
      "Criatividade na maturidade",
      "Comunicação e socialização",
      "Alegria de viver",
      "Expressão artística",
      "Inspiração para outros"
    ],
    possibleWounds: [
      "Superficialidade",
      "Dispersão",
      "Medo de envelhecer",
      "Negação da idade",
      "Frivolidade"
    ],
    consultationQuestion: "Sua expressão está evoluindo ou você está tentando parecer mais jovem?"
  },
  4: {
    number: 4,
    title: "Envelhecer com estrutura",
    description: "A alma gosta de envelhecer mantendo rotinas, organização e senso de propósito prático.",
    potentials: [
      "Organização e disciplina",
      "Rotinas saudáveis",
      "Propósito prático",
      "Estabilidade",
      "Legado concreto"
    ],
    possibleWounds: [
      "Rigidez excessiva",
      "Resistência a mudanças",
      "Teimosia",
      "Isolamento em rotinas",
      "Dureza consigo mesma"
    ],
    consultationQuestion: "Suas rotinas estão te servindo ou te aprisionando?"
  },
  5: {
    number: 5,
    title: "Envelhecer com liberdade",
    description: "A alma gosta de envelhecer mantendo a liberdade, viajando, experimentando e se reinventando.",
    potentials: [
      "Liberdade e aventura",
      "Viagens e experiências",
      "Reinvenção constante",
      "Adaptabilidade",
      "Vitalidade"
    ],
    possibleWounds: [
      "Instabilidade",
      "Fuga de responsabilidades",
      "Inquietação",
      "Dificuldade em se comprometer",
      "Ansiedade"
    ],
    consultationQuestion: "Sua liberdade está te expandindo ou te dispersando?"
  },
  6: {
    number: 6,
    title: "Envelhecer cuidando",
    description: "A alma gosta de envelhecer cuidando da família, do lar e das relações próximas.",
    potentials: [
      "Cuidado com família",
      "Lar harmonioso",
      "Amor e afeto",
      "Sabedoria relacional",
      "Legado de cuidado"
    ],
    possibleWounds: [
      "Controle sobre a família",
      "Sacrifício excessivo",
      "Culpa",
      "Dificuldade em se priorizar",
      "Parentificação dos netos"
    ],
    consultationQuestion: "Você está cuidando com amor ou com controle?"
  },
  7: {
    number: 7,
    title: "Envelhecer com sabedoria",
    description: "A alma gosta de envelhecer em introspecção, espiritualidade e busca de sentido profundo.",
    potentials: [
      "Sabedoria espiritual",
      "Introspecção profunda",
      "Conexão com o transcendente",
      "Paz interior",
      "Legado de conhecimento"
    ],
    possibleWounds: [
      "Isolamento",
      "Solidão",
      "Desconexão do mundo",
      "Amargura",
      "Arrogância espiritual"
    ],
    consultationQuestion: "Sua busca espiritual está te conectando ou te isolando?"
  },
  8: {
    number: 8,
    title: "Envelhecer com prosperidade",
    description: "A alma gosta de envelhecer colhendo prosperidade material, poder e reconhecimento.",
    potentials: [
      "Prosperidade material",
      "Reconhecimento",
      "Autoridade",
      "Legado financeiro",
      "Poder bem usado"
    ],
    possibleWounds: [
      "Obsessão por dinheiro",
      "Controle excessivo",
      "Rigidez",
      "Dureza emocional",
      "Isolamento por poder"
    ],
    consultationQuestion: "Sua prosperidade está te libertando ou te aprisionando?"
  },
  9: {
    number: 9,
    title: "Envelhecer servindo",
    description: "A alma gosta de envelhecer servindo, doando, compartilhando sabedoria e amor universal.",
    potentials: [
      "Serviço e compaixão",
      "Sabedoria universal",
      "Amor incondicional",
      "Legado humanitário",
      "Paz e aceitação"
    ],
    possibleWounds: [
      "Martírio",
      "Carregar o mundo",
      "Dramas emocionais",
      "Dificuldade em receber",
      "Autossacrifício"
    ],
    consultationQuestion: "Você está servindo com amor ou se sacrificando por culpa?"
  }
};

/**
 * Determina qual ciclo de vida está vigente baseado na idade
 * @param age Idade da pessoa
 * @returns 1 (C1), 2 (C2) ou 3 (C3)
 */
export function getCurrentLifecycle(age: number): 1 | 2 | 3 {
  if (age <= 28) return 1;
  if (age <= 56) return 2;
  return 3;
}

/**
 * Retorna interpretação do ciclo de vida específico
 * @param cycle 1 (C1), 2 (C2) ou 3 (C3)
 * @param number Número do ciclo (1-9)
 * @returns Interpretação ou null se não encontrada
 */
export function getLifecycleInterpretation(
  cycle: 1 | 2 | 3,
  number: number
): LifecycleInterpretation | null {
  const interpretations = cycle === 1 ? C1_INTERPRETATIONS : cycle === 2 ? C2_INTERPRETATIONS : C3_INTERPRETATIONS;
  return interpretations[number] || null;
}

/**
 * Retorna nome do ciclo de vida
 * @param cycle 1 (C1), 2 (C2) ou 3 (C3)
 * @returns Nome do ciclo
 */
export function getLifecycleName(cycle: 1 | 2 | 3): string {
  const names = {
    1: "Ciclo Formativo (0-28 anos)",
    2: "Ciclo Produtivo (29-56 anos)",
    3: "Ciclo de Colheita (57+ anos)"
  };
  return names[cycle];
}
