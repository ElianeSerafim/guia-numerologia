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
