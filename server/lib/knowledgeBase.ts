/**
 * Base de Conhecimento Numerológica
 * Interpretações de números 1-9, 11, 22, 33
 * Conforme metodologia Pitagórica
 */

export interface NumberInterpretation {
  essencia: string;
  luz: string;
  sombra: string;
  fisico: string;
  pratica_afetiva: string;
  valvula_escape: string;
}

export interface ElementInterpretation {
  nome: string;
  significado: string;
}

export const numberInterpretations: Record<number | string, NumberInterpretation> = {
  1: {
    essencia: "Identidade, iniciativa e liderança",
    luz: "Coragem, autonomia, pioneirismo",
    sombra: "Autoritarismo, ego inflado, insegurança mascarada",
    fisico: "Cabeça, sistema nervoso, tensão muscular",
    pratica_afetiva: "Reconhecer suas conquistas sem se isolar",
    valvula_escape: "Atividade física individual, caminhada, decisão consciente"
  },
  2: {
    essencia: "Relações, sensibilidade e cooperação",
    luz: "Empatia, diplomacia, escuta",
    sombra: "Dependência emocional, medo de confronto",
    fisico: "Sistema linfático, estômago",
    pratica_afetiva: "Aprender a dizer não com amor",
    valvula_escape: "Música, escrita emocional, pausas conscientes"
  },
  3: {
    essencia: "Expressão, criatividade e comunicação",
    luz: "Alegria, carisma, talento artístico",
    sombra: "Dispersão, superficialidade",
    fisico: "Garganta, pulmões",
    pratica_afetiva: "Expressar sentimentos com verdade",
    valvula_escape: "Arte, dança, conversa criativa"
  },
  4: {
    essencia: "Estrutura, trabalho e estabilidade",
    luz: "Disciplina, confiabilidade, construção",
    sombra: "Rigidez, teimosia, excesso de controle",
    fisico: "Coluna, ossos, articulações",
    pratica_afetiva: "Flexibilizar rotinas",
    valvula_escape: "Organização prática e descanso consciente"
  },
  5: {
    essencia: "Liberdade, movimento e mudança",
    luz: "Versatilidade, curiosidade, adaptação",
    sombra: "Ansiedade, excessos, instabilidade",
    fisico: "Sistema digestivo, fígado",
    pratica_afetiva: "Respeitar limites",
    valvula_escape: "Viagens curtas, respiração ativa"
  },
  6: {
    essencia: "Amor, cuidado e responsabilidade",
    luz: "Acolhimento, ética, senso de família",
    sombra: "Cobrança excessiva, culpa",
    fisico: "Coração, hormônios",
    pratica_afetiva: "Cuidar sem se anular",
    valvula_escape: "Contato com a natureza e estética"
  },
  7: {
    essencia: "Autoconhecimento e verdade",
    luz: "Sabedoria, profundidade, espiritualidade",
    sombra: "Isolamento, frieza emocional",
    fisico: "Sistema imunológico",
    pratica_afetiva: "Compartilhar o que sente",
    valvula_escape: "Estudo, silêncio, contemplação"
  },
  8: {
    essencia: "Poder material e justiça",
    luz: "Gestão, prosperidade, liderança ética",
    sombra: "Autoritarismo, apego ao controle",
    fisico: "Coluna lombar, sistema circulatório",
    pratica_afetiva: "Equilibrar poder e sensibilidade",
    valvula_escape: "Planejamento e estratégia"
  },
  9: {
    essencia: "Humanitarismo e encerramento de ciclos",
    luz: "Compaixão, altruísmo, visão ampla",
    sombra: "Auto-sacrifício excessivo",
    fisico: "Sistema nervoso, inflamações",
    pratica_afetiva: "Desapegar sem culpa",
    valvula_escape: "Serviço consciente e arte terapêutica"
  },
  11: {
    essencia: "Iluminação e inspiração",
    luz: "Intuição elevada, visão espiritual",
    sombra: "Ansiedade, sobrecarga energética",
    fisico: "Sistema nervoso",
    pratica_afetiva: "Ancorar no corpo",
    valvula_escape: "Meditação guiada e aterramento"
  },
  22: {
    essencia: "Construtor do coletivo",
    luz: "Materialização em grande escala",
    sombra: "Medo da própria grandeza",
    fisico: "Coluna e articulações",
    pratica_afetiva: "Delegar e confiar",
    valvula_escape: "Planejamento com propósito"
  },
  33: {
    essencia: "Amor universal em ação",
    luz: "Cura, serviço elevado",
    sombra: "Autoanulação",
    fisico: "Sistema emocional",
    pratica_afetiva: "Servir sem se perder",
    valvula_escape: "Limites energéticos claros"
  }
};

export const elementInterpretations: Record<string, ElementInterpretation> = {
  CD: {
    nome: "Caminho do Destino",
    significado: "Missão de vida e aprendizados práticos nesta encarnação"
  },
  MO: {
    nome: "Motivação",
    significado: "Desejo interno da alma e o que move suas escolhas"
  },
  DM: {
    nome: "Desafio",
    significado: "Pedágio obrigatório de aprendizado"
  },
  ME: {
    nome: "Mérito",
    significado: "Força conquistada pela soma de experiências"
  },
  EU: {
    nome: "Expressão",
    significado: "Como a pessoa se manifesta no mundo"
  },
  R1: {
    nome: "Realização 1",
    significado: "Primeiro grande ciclo de aprendizado (sem renascimento)"
  },
  R2: {
    nome: "Realização 2",
    significado: "Segundo ciclo com possibilidade de renascimento"
  },
  R3: {
    nome: "Realização 3",
    significado: "Ciclo de maturidade e renascimento consciente"
  },
  R4: {
    nome: "Realização 4",
    significado: "Síntese final, legado e colheita"
  },
  CV: {
    nome: "Ciclos de Vida",
    significado: "Fases cronológicas que marcam evolução e desafios"
  }
};

export function getNumberInterpretation(number: number | string): NumberInterpretation | null {
  const num = typeof number === 'string' ? parseInt(number, 10) : number;
  return numberInterpretations[num] || null;
}

// Interpretações de Desafios adaptadas por número
export const challengeInterpretations: Record<number | string, string> = {
  1: "Aprender a equilibrar independência com colaboração. O desafio é não ser dominador e reconhecer que precisa dos outros.",
  2: "Desenvolver assertividade e confiança em si mesmo. O desafio é sair da passividade e tomar decisões próprias.",
  3: "Focar e aprofundar ao invés de dispersar. O desafio é completar projetos e ser consistente.",
  4: "Flexibilizar rigidez e aceitar mudanças. O desafio é aprender que nem tudo pode ser controlado.",
  5: "Encontrar estabilidade dentro da liberdade. O desafio é não usar a liberdade como fuga.",
  6: "Aprender a colocar limites saudáveis. O desafio é não se sacrificar pelos outros.",
  7: "Confiar em sua intuição e conhecimento. O desafio é não se isolar em análise paralisante.",
  8: "Usar poder com responsabilidade e ética. O desafio é não ser ganancioso ou manipulador.",
  9: "Completar ciclos e deixar ir. O desafio é aceitar perdas e transformações necessárias.",
  11: "Integrar sensibilidade com ação. O desafio é transformar intuição em realização prática.",
  22: "Construir legados duradouros. O desafio é manter visão ampla sem perder em detalhes.",
  33: "Servir com compaixão sem se esgotar. O desafio é equilibrar dar e receber."
};

// Interpretações de Realizações adaptadas por número
export const realizationInterpretations: Record<number | string, string> = {
  1: "Período de liderança, inovação e independência. Oportunidade para iniciar novos projetos e ser pioneiro.",
  2: "Período de relacionamentos, parcerias e diplomacia. Oportunidade para colaborar e criar harmonia.",
  3: "Período de expressão criativa e comunicação. Oportunidade para se expressar e inspirar outros.",
  4: "Período de construção, estrutura e trabalho. Oportunidade para estabelecer bases sólidas.",
  5: "Período de liberdade, mudança e aventura. Oportunidade para explorar novas possibilidades.",
  6: "Período de responsabilidade, família e serviço. Oportunidade para cuidar e criar harmonia.",
  7: "Período de introspecção, sabedoria e espiritualidade. Oportunidade para aprofundar conhecimento.",
  8: "Período de poder, abundância e realização material. Oportunidade para alcançar sucesso.",
  9: "Período de conclusão, transformação e humanitarismo. Oportunidade para completar ciclos.",
  11: "Período de iluminação e inspiração. Oportunidade para conectar-se com propósito maior.",
  22: "Período de construção de legados. Oportunidade para impactar o mundo de forma duradoura.",
  33: "Período de compaixão universal. Oportunidade para servir e elevar consciência coletiva."
};

export function getElementInterpretation(element: string): ElementInterpretation | null {
  return elementInterpretations[element.toUpperCase()] || null;
}

export function getChallengeInterpretation(number: number | string): string | null {
  const num = typeof number === 'string' ? parseInt(number, 10) : number;
  return challengeInterpretations[num] || null;
}

export function getRealizationInterpretation(number: number | string): string | null {
  const num = typeof number === 'string' ? parseInt(number, 10) : number;
  return realizationInterpretations[num] || null;
}

// Interpretações de Ciclos Trimestrais adaptadas por número
export const quarterlyInterpretations: Record<number | string, string> = {
  1: "Trimestre de liderança e novos começos. Período para iniciar projetos, tomar decisões corajosas e estabelecer sua autoridade. Foco em independência e inovação.",
  2: "Trimestre de relacionamentos e diplomacia. Período para colaborar, ouvir e criar harmonia. Foco em parcerias, sensibilidade e intuição.",
  3: "Trimestre de criatividade e expressão. Período para se comunicar, criar e inspirar. Foco em alegria, talento artístico e networking.",
  4: "Trimestre de estrutura e trabalho. Período para construir bases sólidas, organizar e disciplinar. Foco em confiabilidade, estabilidade e produtividade.",
  5: "Trimestre de liberdade e mudança. Período para explorar, adaptar e experimentar. Foco em flexibilidade, aventura e transformação.",
  6: "Trimestre de responsabilidade e cuidado. Período para servir, harmonizar e cuidar. Foco em família, comunidade e ajuda ao próximo.",
  7: "Trimestre de introspecção e sabedoria. Período para aprofundar conhecimento, meditar e refletir. Foco em espiritualidade, análise e verdade.",
  8: "Trimestre de poder e abundância. Período para manifestar sucesso, liderar com autoridade e alcançar objetivos materiais. Foco em realização e prosperidade.",
  9: "Trimestre de conclusão e transformação. Período para completar ciclos, soltar o passado e preparar renovação. Foco em humanitarismo e evolução.",
  11: "Trimestre de iluminação e inspiração. Período para conectar-se com propósito maior, intuição elevada e visão espiritual. Foco em iluminação e serviço.",
  22: "Trimestre de construção de legados. Período para impactar o mundo de forma duradoura, construir grandes projetos. Foco em visão ampla e realização concreta.",
  33: "Trimestre de compaixão universal. Período para servir com amor incondicional, elevar consciência coletiva. Foco em cura e elevação espiritual."
};

export function getQuarterlyInterpretation(number: number | string): string | null {
  const num = typeof number === 'string' ? parseInt(number, 10) : number;
  return quarterlyInterpretations[num] || null;
}


// ===== INTERPRETAÇÕES AVANÇADAS =====

// Renascimento: Ocorre em R2, R3 ou R4 quando há um Fato Grave
export const renascimentoInterpretations: Record<number | string, string> = {
  1: "Renascimento através da liderança consciente. A alma é chamada a reorganizar sua independência e reconhecer que a verdadeira força vem da colaboração. Período de reconstrução da identidade com maior humildade e abertura.",
  2: "Renascimento através da sensibilidade e relacionamentos. A alma é chamada a reorganizar suas relações e aprender que a vulnerabilidade é força. Período de reconstrução emocional com maior assertividade.",
  3: "Renascimento através da expressão autêntica. A alma é chamada a reorganizar sua criatividade e comunicação. Período de reconstrução da voz pessoal com maior profundidade.",
  4: "Renascimento através da estrutura renovada. A alma é chamada a reorganizar suas bases e aprender flexibilidade. Período de reconstrução da estabilidade com maior adaptação.",
  5: "Renascimento através da liberdade consciente. A alma é chamada a reorganizar sua relação com mudança. Período de reconstrução da autonomia com maior responsabilidade.",
  6: "Renascimento através do amor transformador. A alma é chamada a reorganizar seus cuidados e limites. Período de reconstrução da compaixão com maior autopreservação.",
  7: "Renascimento através da sabedoria adquirida. A alma é chamada a reorganizar seu conhecimento. Período de reconstrução da verdade com maior compartilhamento.",
  8: "Renascimento através do poder ético. A alma é chamada a reorganizar sua relação com controle e abundância. Período de reconstrução da autoridade com maior integridade.",
  9: "Renascimento através da transformação completa. A alma é chamada a reorganizar seus ciclos. Período de reconstrução do humanitarismo com maior consciência.",
  11: "Renascimento através da iluminação prática. A alma é chamada a reorganizar sua intuição. Período de reconstrução da inspiração com maior ancoragem.",
  22: "Renascimento através do legado reconstruído. A alma é chamada a reorganizar seus grandes projetos. Período de reconstrução da visão com maior sabedoria.",
  33: "Renascimento através da compaixão elevada. A alma é chamada a reorganizar seu serviço. Período de reconstrução do amor universal com maior equilíbrio."
};

// Realização de Legado: Ocorre quando Rn = MO, CD ou ME
export const legacyInterpretations: Record<number | string, string> = {
  1: "Legado de liderança e pioneirismo. Suas escolhas deixam marcas de coragem e inovação que inspiram outras pessoas a serem ousadas e autênticas.",
  2: "Legado de empatia e diplomacia. Suas escolhas deixam marcas de sensibilidade e compreensão que curam e harmonizam relacionamentos.",
  3: "Legado de criatividade e expressão. Suas escolhas deixam marcas de beleza e comunicação que inspiram criatividade em outros.",
  4: "Legado de estrutura e confiabilidade. Suas escolhas deixam marcas de solidez que servem como base para gerações futuras.",
  5: "Legado de liberdade e adaptação. Suas escolhas deixam marcas de coragem para mudar que libertam outros de padrões limitantes.",
  6: "Legado de amor e responsabilidade. Suas escolhas deixam marcas de cuidado que fortalecem famílias e comunidades.",
  7: "Legado de sabedoria e verdade. Suas escolhas deixam marcas de conhecimento que iluminam caminhos para outros.",
  8: "Legado de poder ético e prosperidade. Suas escolhas deixam marcas de integridade que demonstram que sucesso e ética caminham juntos.",
  9: "Legado de transformação e humanitarismo. Suas escolhas deixam marcas de compaixão que elevam a consciência coletiva.",
  11: "Legado de iluminação e inspiração. Suas escolhas deixam marcas de visão espiritual que conectam outros com propósito maior.",
  22: "Legado de construção duradoura. Suas escolhas deixam marcas de realização em grande escala que impactam gerações.",
  33: "Legado de amor universal. Suas escolhas deixam marcas de cura e elevação que transformam a consciência coletiva."
};

// Grande Amor: Identificado por harmonia afetiva entre ciclos, MO e EU
export const grandeLoveInterpretations: Record<number | string, string> = {
  1: "Grande Amor de liderança compartilhada. Um amor que reconhece sua força e o convida a liderar com coração. Parceria que celebra sua coragem e o apoia em novas jornadas.",
  2: "Grande Amor de sensibilidade profunda. Um amor que honra sua empatia e cria espaço para vulnerabilidade mútua. Parceria que nutre através da compreensão.",
  3: "Grande Amor de expressão criativa. Um amor que celebra sua criatividade e o inspira a se expressar mais plenamente. Parceria que dança junto à sua alegria.",
  4: "Grande Amor de estabilidade compartilhada. Um amor que constrói bases sólidas e cria segurança. Parceria que cresce junto através de compromisso.",
  5: "Grande Amor de liberdade respeitada. Um amor que honra sua necessidade de liberdade e cresce através da adaptação. Parceria que evolui sem prender.",
  6: "Grande Amor de cuidado mútuo. Um amor que nutre e é nutrido. Parceria que cria harmonia através do respeito e responsabilidade.",
  7: "Grande Amor de profundidade espiritual. Um amor que convida à introspecção compartilhada. Parceria que cresce através da verdade e sabedoria.",
  8: "Grande Amor de realização conjunta. Um amor que apoia seus objetivos e cresce através do sucesso compartilhado. Parceria que prospera juntos.",
  9: "Grande Amor de transformação mútua. Um amor que permite crescimento e mudança. Parceria que evolui através de ciclos de renovação.",
  11: "Grande Amor de iluminação compartilhada. Um amor que conecta em nível espiritual profundo. Parceria que eleva consciência mutuamente.",
  22: "Grande Amor de legado construído. Um amor que cria impacto duradouro juntos. Parceria que deixa marcas significativas no mundo.",
  33: "Grande Amor de compaixão universal. Um amor que serve à humanidade. Parceria que cura e eleva consciência coletiva."
};

export function getRenascimentoInterpretation(number: number | string): string | null {
  const num = typeof number === 'string' ? parseInt(number, 10) : number;
  return renascimentoInterpretations[num] || null;
}

export function getLegacyInterpretation(number: number | string): string | null {
  const num = typeof number === 'string' ? parseInt(number, 10) : number;
  return legacyInterpretations[num] || null;
}

export function getGrandeLoveInterpretation(number: number | string): string | null {
  const num = typeof number === 'string' ? parseInt(number, 10) : number;
  return grandeLoveInterpretations[num] || null;
}
