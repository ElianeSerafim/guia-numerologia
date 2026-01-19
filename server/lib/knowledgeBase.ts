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
    significado: "Sua missão de vida nesta encarnação. O propósito maior que sua alma escolheu para aprender, crescer e contribuir. É o fio condutor que une suas experiências em um significado coerente."
  },
  MO: {
    nome: "Motivação",
    significado: "O desejo profundo da sua alma. Aquilo que verdadeiramente te move, independente de expectativas externas. É a bússola interna que guia suas escolhas mais autênticas."
  },
  DM: {
    nome: "Desafio Maior",
    significado: "O pedágio obrigatório de aprendizado nesta vida. Não é punição, mas oportunidade de evolução. Representa a área onde você mais crescerá se abraçar a transformação com consciência."
  },
  ME: {
    nome: "Mérito",
    significado: "A força que você conquistou pela soma de todas as suas experiências. É o seu poder acumulado, a sabedoria que carrega e a capacidade que desenvolveu para lidar com a vida."
  },
  EU: {
    nome: "Expressão",
    significado: "Como você naturalmente se manifesta no mundo. Sua forma de ser, sua energia, sua presença. É o reflexo visível da sua alma no dia a dia."
  },
  R1: {
    nome: "Realização 1",
    significado: "Seu primeiro grande ciclo de aprendizado (aproximadamente 0-29 anos). Período de formação, descoberta e construção das bases da sua vida. Sem possibilidade de renascimento, é um ciclo de consolidação."
  },
  R2: {
    nome: "Realização 2",
    significado: "Seu segundo ciclo de vida (aproximadamente 29-56 anos). Período de ação, realização e possível renascimento. Se um fato grave ocorrer, a alma se reorganiza para retomar sua vibração original com mais consciência."
  },
  R3: {
    nome: "Realização 3",
    significado: "Seu terceiro ciclo (aproximadamente 56-83 anos). Ciclo de maturidade, integração e renascimento consciente. Aqui você colhe o que plantou e pode deixar legados significativos."
  },
  R4: {
    nome: "Realização 4",
    significado: "Seu quarto ciclo (a partir de aproximadamente 83 anos). Síntese final, colheita e legado. Período de encerramento de ciclos, integração de aprendizados e herança que deixará para o mundo."
  },
  CV: {
    nome: "Ciclos de Vida",
    significado: "As fases cronológicas que marcam sua evolução. Cada ciclo traz desafios e oportunidades específicas. Compreender seus ciclos é alinhar-se com o ritmo natural da sua jornada."
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
  1: "Trimestre de liderança e novos começos. Este é um período de iniciativa e coragem. A energia do 1 convida você a tomar as rédeas, começar aquilo que sempre adiou e estabelecer sua autoridade com segurança. É tempo de inovação, independência e ação decisiva. Confie em sua capacidade de liderar.",
  2: "Trimestre de relacionamentos e diplomacia. A energia do 2 traz suavidade e colaboração. Este é um período para aprofundar relacionamentos, ouvir com empatia e criar harmonia ao seu redor. Sensibilidade, intuição e parcerias florescem. Permita-se ser receptivo e vulnerável.",
  3: "Trimestre de criatividade e expressão. A energia do 3 desperta sua criatividade. Este é um período para se comunicar com alegria, expressar seus talentos artísticos e conectar-se com outras pessoas. Sua voz importa. Compartilhe suas ideias, crie, inspire e celebre a vida.",
  4: "Trimestre de estrutura e trabalho. A energia do 4 convida à construção sólida. Este é um período para organizar sua vida, trabalhar com disciplina e estabelecer bases duradouras. Confiabilidade, estabilidade e produtividade são suas aliadas. Invista em fundações que duram.",
  5: "Trimestre de liberdade e mudança. A energia do 5 traz movimento e transformação. Este é um período para explorar, adaptar-se e experimentar novas possibilidades. Flexibilidade, aventura e curiosidade o guiam. Abraçe a mudança com confiança e leveza.",
  6: "Trimestre de responsabilidade e cuidado. A energia do 6 desperta seu coração. Este é um período para servir, harmonizar e cuidar de quem ama. Família, comunidade e ajuda ao próximo ganham importância. Equilibre o cuidado com os outros com o cuidado consigo mesmo.",
  7: "Trimestre de introspecção e sabedoria. A energia do 7 convida à profundidade. Este é um período para aprofundar seu conhecimento, meditar, refletir e conectar-se com sua verdade interior. Espiritualidade, análise e autoconhecimento florescem. Ouça sua intuição.",
  8: "Trimestre de poder e abundância. A energia do 8 manifesta sucesso material. Este é um período para exercer liderança com autoridade, alcançar objetivos ambiciosos e atrair prosperidade. Realização, poder e abundância estão ao seu alcance. Acredite em seu potencial.",
  9: "Trimestre de conclusão e transformação. A energia do 9 convida ao encerramento consciente. Este é um período para completar ciclos, soltar o que não serve mais e preparar renovação. Humanitarismo, compaixão e evolução espiritual marcam este tempo. Deixe ir com amor.",
  11: "Trimestre de iluminação e inspiração. A energia do 11 eleva sua consciência. Este é um período para conectar-se com seu propósito maior, acessar intuição elevada e receber inspiração espiritual. Iluminação e serviço elevado guiam seu caminho. Confie na sabedoria interior.",
  22: "Trimestre de construção de legados. A energia do 22 materializa visões grandiosas. Este é um período para impactar o mundo de forma duradoura, construir projetos significativos e deixar um legado. Visão ampla e realização concreta caminham juntas. Sonhe grande.",
  33: "Trimestre de compaixão universal. A energia do 33 expande seu coração. Este é um período para servir com amor incondicional, elevar a consciência coletiva e trazer cura. Compaixão, elevação espiritual e amor universal marcam este tempo sagrado. Sirva com o coração aberto."
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
