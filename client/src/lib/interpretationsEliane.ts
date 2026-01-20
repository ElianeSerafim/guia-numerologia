/**
 * Interpretações de Numerologia Pitagórica Terapêutica
 * Metodologia: Lili Numerologia (Eliane Serafim)
 * 
 * Estrutura:
 * - CD: Caminho do Destino
 * - MO: Motivação
 * - EU: Eu Íntimo (sonho íntimo, desejo profundo)
 * - EX: Expressão (como o mundo te vê)
 * - DM: Desafio Maior
 * - ME: Mérito
 * - R1-R4: Realizações (ciclos de vida)
 * - CV: Ciclos de Vida
 */

export interface NumberPosition {
  cd?: string;
  mo?: string;
  eu?: string;
  ex?: string;
  dm?: string;
  me?: string;
  r1?: string;
  r2?: string;
  r3?: string;
  r4?: string;
  cv?: string;
  renascimento?: string;
}

export interface NumberInterpretationEliane {
  number: number | string;
  name: string;
  essence: string;
  positions: NumberPosition;
}

export const INTERPRETATIONS_ELIANE: Record<number | string, NumberInterpretationEliane> = {
  1: {
    number: 1,
    name: 'Liderança e Brilho',
    essence: 'O número 1 vibra a energia do renascimento, da abertura de novos caminhos e da possibilidade. É o início absoluto, o primeiro passo, a coragem de começar.',
    positions: {
      cd: 'Você veio ao mundo para ser líder, para iniciar novos caminhos e para deixar sua marca através da coragem e da ousadia. Sua missão é aprender a usar seu brilho de forma construtiva, desenvolvendo independência autêntica, determinação e capacidade de inovar.',
      mo: 'Desde cedo, existe em você uma força que busca liderança, inovação e brilho. Você não nasceu para seguir — sua motivação vem da necessidade de liderar, de iniciar, de deixar sua marca através da coragem e da ousadia.',
      eu: 'Seu sonho íntimo é ser um LÍDER AUTÊNTICO. Você deseja ser reconhecido por sua coragem, deixar uma marca através de iniciativas, ser aquele que abre novos caminhos com integridade.',
      ex: 'O mundo te vê como um LÍDER NATURAL. As pessoas percebem em você uma energia de coragem, determinação e capacidade de iniciar. Você é percebido como alguém que inspira confiança e liderança.',
      dm: 'Seu grande aprendizado é aprender a ouvir e a colaborar. O número 1 como desafio convida você a desenvolver humildade, empatia e capacidade de trabalhar em equipe.',
      me: 'O Mérito 1 representa a energia mais poderosa do seu mapa. Você carrega uma força de liderança, uma capacidade de iniciar e de transformar ideias em realidade.',
      r1: 'Neste ciclo formativo, você foi desafiado a encontrar sua liderança no mundo. As experiências dessa fase te prepararam para ser iniciador e inovador.',
      r2: 'Nessa fase, você chega à maturidade e pode exercer sua liderança de forma mais consciente. É o momento em que você pode realmente liderar e deixar sua marca.',
      r3: 'Nessa fase de maturidade plena, você pode consolidar sua sabedoria como líder e deixar um legado. É a fase de colher os frutos do que foi semeado.',
      r4: 'Nesse ciclo final, você reflete sobre sua jornada como líder e pode ser mentor, guia e inspiração para as novas gerações.',
      cv: 'Os ciclos de vida do número 1 marcam fases de liderança, iniciativa e inovação. Cada ciclo traz oportunidades para iniciar algo novo e deixar sua marca.',
      renascimento: 'Este período marca um Renascimento. A alma é chamada a reorganizar escolhas, valores e atitudes para retomar sua vibração original e evoluir com mais consciência. Há liberação do Caminho do Destino e da Motivação, permitindo um novo início.'
    }
  },
  2: {
    number: 2,
    name: 'Parceria e União',
    essence: 'O número 2 vibra a energia da parceria, da união com concessão, da flexibilidade e da paciência. É o equilíbrio, a harmonia, a capacidade de ouvir e compreender.',
    positions: {
      cd: 'Você veio ao mundo para ser mediador, para ouvir e para criar relacionamentos que transformam vidas. Sua jornada pede que você se desenvolva como alguém sensível, diplomático e capaz de colaborar com autenticidade.',
      mo: 'Desde cedo, existe em você uma necessidade de estar com outras pessoas, de colaborar e de criar harmonia. Você não nasceu para estar sozinho — sua motivação vem da necessidade de se conectar, de entender o outro.',
      eu: 'Seu sonho íntimo é ser um MEDIADOR COMPASSIVO. Você deseja ser reconhecido por sua sensibilidade, criar harmonia onde há conflito, ser o porto seguro de quem precisa.',
      ex: 'O mundo te vê como um MEDIADOR NATURAL. As pessoas percebem em você uma energia de compreensão e acolhimento, alguém que sabe ouvir e entender.',
      dm: 'Seu grande aprendizado é aprender a confiar em si mesmo. O número 2 como desafio convida você a desenvolver autoconfiança, assertividade e independência emocional.',
      me: 'O Mérito 2 representa a energia mais poderosa do seu mapa. Você carrega uma força de união, uma capacidade de ouvir e de criar harmonia onde há conflito.',
      r1: 'Neste ciclo formativo, você foi desafiado a encontrar sua voz. As experiências dessa fase te prepararam para ser mediador e criador de harmonia.',
      r2: 'Nessa fase, você chega à maturidade e pode exercer sua colaboração de forma mais consciente. É o momento em que você pode realmente mediar e deixar sua marca.',
      r3: 'Nessa fase de maturidade plena, você pode consolidar sua sabedoria como mediador e deixar um legado.',
      r4: 'Nesse ciclo final, você reflete sobre sua jornada como mediador e pode ser mentor e guia.',
      cv: 'Os ciclos de vida do número 2 marcam fases de união, sensibilidade e harmonia. Cada ciclo traz oportunidades para criar relacionamentos significativos.'
    }
  },
  3: {
    number: 3,
    name: 'Criatividade e Expressão',
    essence: 'O número 3 vibra a energia da criatividade, da expressão e da comunicação. É a capacidade de se expressar, de criar, de comunicar com clareza e de inspirar através da palavra e da ação.',
    positions: {
      cd: 'Você veio ao mundo para criar, para se expressar e para deixar sua marca através da comunicação. Sua missão é aprender a usar sua criatividade de forma construtiva.',
      mo: 'Desde cedo, existe em você uma força que busca se expressar, criar e comunicar. Você não nasceu para ficar em silêncio — sua motivação vem da necessidade de criar algo novo.',
      eu: 'Seu sonho íntimo é ser um CRIADOR INSPIRADOR. Você deseja ser reconhecido por sua criatividade, deixar uma marca através da arte e da expressão.',
      ex: 'O mundo te vê como um CRIADOR NATURAL. As pessoas percebem em você uma energia de criatividade e inspiração, alguém que sabe se expressar e comunicar.',
      dm: 'Seu grande aprendizado é aprender a aprofundar. O número 3 como desafio convida você a desenvolver foco, profundidade e responsabilidade.',
      me: 'O Mérito 3 representa a energia mais poderosa do seu mapa. Você carrega uma força de criatividade, uma capacidade de se expressar e de inspirar.',
      r1: 'Neste ciclo formativo, você foi desafiado a encontrar sua voz criativa. As experiências dessa fase te prepararam para ser criador e comunicador.',
      r2: 'Nessa fase, você chega à maturidade e pode exercer sua criatividade de forma mais consciente.',
      r3: 'Nessa fase de maturidade plena, você pode consolidar sua sabedoria como criador.',
      r4: 'Nesse ciclo final, você reflete sobre sua jornada como criador.',
      cv: 'Os ciclos de vida do número 3 marcam fases de criatividade, expressão e expansão.'
    }
  },
  4: {
    number: 4,
    name: 'Construção e Estrutura',
    essence: 'O número 4 vibra a energia da construção, da estrutura e da solidez. É a capacidade de organizar, de construir algo duradouro, de criar fundações sólidas.',
    positions: {
      cd: 'Você veio ao mundo para construir, para organizar e para deixar sua marca através da estrutura e da solidez. Sua missão é aprender a usar sua capacidade de organização de forma construtiva.',
      mo: 'Desde cedo, existe em você uma força que busca construir, organizar e criar estruturas sólidas. Você não nasceu para viver na superficialidade.',
      eu: 'Seu sonho íntimo é ser um CONSTRUTOR SÓLIDO. Você deseja ser reconhecido por sua responsabilidade, deixar uma marca através de estruturas duradouras.',
      ex: 'O mundo te vê como um CONSTRUTOR NATURAL. As pessoas percebem em você uma energia de responsabilidade e confiabilidade.',
      dm: 'Seu grande aprendizado é aprender a ser flexível. O número 4 como desafio convida você a desenvolver adaptabilidade e abertura para mudanças.',
      me: 'O Mérito 4 representa a energia mais poderosa do seu mapa. Você carrega uma força de construção, uma capacidade de organizar e de criar estruturas duradouras.',
      r1: 'Neste ciclo formativo, você foi desafiado a encontrar sua capacidade de construir. As experiências dessa fase te prepararam para ser construtor.',
      r2: 'Nessa fase, você chega à maturidade e pode exercer sua construção de forma mais consciente.',
      r3: 'Nessa fase de maturidade plena, você pode consolidar sua sabedoria como construtor.',
      r4: 'Nesse ciclo final, você reflete sobre sua jornada como construtor.',
      cv: 'Os ciclos de vida do número 4 marcam fases de construção, estrutura e consolidação.'
    }
  },
  5: {
    number: 5,
    name: 'Liberdade e Transformação',
    essence: 'O número 5 vibra a energia da liberdade, da transformação e da adaptabilidade. É a capacidade de explorar, de se adaptar, de transformar e de abraçar a mudança.',
    positions: {
      cd: 'Você veio ao mundo para explorar, para transformar e para deixar sua marca através da liberdade e da mudança. Sua missão é aprender a usar sua capacidade de adaptação de forma construtiva.',
      mo: 'Desde cedo, existe em você uma força que busca liberdade, exploração e transformação. Você não nasceu para ficar preso.',
      eu: 'Seu sonho íntimo é ser um EXPLORADOR TRANSFORMADOR. Você deseja ser reconhecido por sua liberdade e coragem, deixar uma marca através da transformação.',
      ex: 'O mundo te vê como um EXPLORADOR NATURAL. As pessoas percebem em você uma energia de liberdade e transformação.',
      dm: 'Seu grande aprendizado é aprender a se comprometer. O número 5 como desafio convida você a desenvolver responsabilidade e estabilidade.',
      me: 'O Mérito 5 representa a energia mais poderosa do seu mapa. Você carrega uma força de transformação, uma capacidade de se adaptar.',
      r1: 'Neste ciclo formativo, você foi desafiado a encontrar sua liberdade. As experiências dessa fase te prepararam para ser explorador.',
      r2: 'Nessa fase, você chega à maturidade e pode exercer sua liberdade de forma mais consciente.',
      r3: 'Nessa fase de maturidade plena, você pode consolidar sua sabedoria como explorador.',
      r4: 'Nesse ciclo final, você reflete sobre sua jornada como explorador.',
      cv: 'Os ciclos de vida do número 5 marcam fases de mudança, liberdade e exploração.'
    }
  },
  6: {
    number: 6,
    name: 'Amor e Responsabilidade',
    essence: 'O número 6 vibra a energia do amor, da responsabilidade e do cuidado. É a capacidade de amar profundamente, de cuidar, de criar harmonia familiar.',
    positions: {
      cd: 'Você veio ao mundo para amar, para cuidar e para deixar sua marca através da responsabilidade afetiva. Sua missão é aprender a usar seu amor de forma construtiva.',
      mo: 'Desde cedo, existe em você uma força que busca amar, cuidar e criar harmonia. Você não nasceu para viver isolado.',
      eu: 'Seu sonho íntimo é ser um AMANTE RESPONSÁVEL. Você deseja ser reconhecido por seu amor e dedicação, deixar uma marca através de relacionamentos profundos.',
      ex: 'O mundo te vê como um AMANTE NATURAL. As pessoas percebem em você uma energia de amor e cuidado.',
      dm: 'Seu grande aprendizado é aprender a estabelecer limites. O número 6 como desafio convida você a desenvolver discernimento e proteção pessoal.',
      me: 'O Mérito 6 representa a energia mais poderosa do seu mapa. Você carrega uma força de amor, uma capacidade de cuidar e de criar harmonia.',
      r1: 'Neste ciclo formativo, você foi desafiado a encontrar sua capacidade de amar. As experiências dessa fase te prepararam para ser cuidador.',
      r2: 'Nessa fase, você chega à maturidade e pode exercer sua prática afetiva de forma mais consciente.',
      r3: 'Nessa fase de maturidade plena, você pode consolidar sua sabedoria como cuidador.',
      r4: 'Nesse ciclo final, você reflete sobre sua jornada como cuidador.',
      cv: 'Os ciclos de vida do número 6 marcam fases de amor, cuidado e harmonia familiar.'
    }
  },
  7: {
    number: 7,
    name: 'Sabedoria e Introspecção',
    essence: 'O número 7 vibra a energia da sabedoria, da introspecção e da espiritualidade. É a capacidade de questionar, de aprofundar, de buscar verdades.',
    positions: {
      cd: 'Você veio ao mundo para buscar verdades, para aprofundar e para deixar sua marca através da sabedoria e da espiritualidade. Sua missão é aprender a usar sua capacidade de introspecção de forma construtiva.',
      mo: 'Desde cedo, existe em você uma força que busca verdades, aprofundamento e espiritualidade. Você não nasceu para viver na superficialidade.',
      eu: 'Seu sonho íntimo é ser um BUSCADOR DE VERDADE. Você deseja ser reconhecido por sua sabedoria, deixar uma marca através de conhecimento e espiritualidade.',
      ex: 'O mundo te vê como um BUSCADOR NATURAL. As pessoas percebem em você uma energia de sabedoria e profundidade.',
      dm: 'Seu grande aprendizado é aprender a agir. O número 7 como desafio convida você a desenvolver ação prática e engajamento.',
      me: 'O Mérito 7 representa a energia mais poderosa do seu mapa. Você carrega uma força de sabedoria, uma capacidade de aprofundar.',
      r1: 'Neste ciclo formativo, você foi desafiado a encontrar sua sabedoria. As experiências dessa fase te prepararam para ser buscador de verdade.',
      r2: 'Nessa fase, você chega à maturidade e pode exercer sua espiritualidade de forma mais consciente.',
      r3: 'Nessa fase de maturidade plena, você pode consolidar sua sabedoria como mestre.',
      r4: 'Nesse ciclo final, você reflete sobre sua jornada como buscador de verdade.',
      cv: 'Os ciclos de vida do número 7 marcam fases de introspecção, espiritualidade e sabedoria.'
    }
  },
  8: {
    number: 8,
    name: 'Poder e Realização',
    essence: 'O número 8 vibra a energia do poder, da realização e da abundância. É a capacidade de conquistar, de realizar, de transformar ideias em sucesso.',
    positions: {
      cd: 'Você veio ao mundo para conquistar, para realizar e para deixar sua marca através do poder e da abundância. Sua missão é aprender a usar seu poder de forma construtiva.',
      mo: 'Desde cedo, existe em você uma força que busca poder, realização e abundância. Você não nasceu para viver na pobreza ou insignificância.',
      eu: 'Seu sonho íntimo é ser um REALIZADOR PODEROSO. Você deseja ser reconhecido por seu poder e realização, deixar uma marca através de sucesso.',
      ex: 'O mundo te vê como um REALIZADOR NATURAL. As pessoas percebem em você uma energia de poder e realização.',
      dm: 'Seu grande aprendizado é aprender a usar seu poder com sabedoria. O número 8 como desafio convida você a desenvolver integridade e consciência.',
      me: 'O Mérito 8 representa a energia mais poderosa do seu mapa. Você carrega uma força de realização, uma capacidade de conquistar.',
      r1: 'Neste ciclo formativo, você foi desafiado a encontrar seu poder. As experiências dessa fase te prepararam para ser conquistador.',
      r2: 'Nessa fase, você chega à maturidade e pode exercer seu poder de forma mais consciente.',
      r3: 'Nessa fase de maturidade plena, você pode consolidar sua sabedoria como realizador.',
      r4: 'Nesse ciclo final, você reflete sobre sua jornada como conquistador.',
      cv: 'Os ciclos de vida do número 8 marcam fases de realização, poder e abundância.'
    }
  },
  9: {
    number: 9,
    name: 'Ajudante e Espiritual',
    essence: 'O número 9 vibra a energia da ajuda, da espiritualidade e do amor universal. É a pessoa que veio para ajudar outras pessoas, para praticar espiritualidade, com forte intuição, capacidade de comunicação, ausência de preconceito e capacidade de amor indistinto.',
    positions: {
      cd: 'Você veio ao mundo para ajudar pessoas, para praticar espiritualidade e para deixar sua marca através da intuição, da comunicação e do amor universal. Sua missão é aprender a usar sua capacidade de ajudar de forma construtiva.',
      mo: 'Desde cedo, existe em você uma força que busca ajudar pessoas e praticar espiritualidade. Você não nasceu para viver egoisticamente.',
      eu: 'Seu sonho íntimo é ser um AJUDANTE ESPIRITUAL. Você deseja ser reconhecido por sua intuição e espiritualidade, deixar uma marca através de ajuda e comunicação.',
      ex: 'O mundo te vê como um AJUDANTE NATURAL. As pessoas percebem em você uma energia de intuição e espiritualidade.',
      dm: 'Seu grande aprendizado é aprender a estabelecer limites. O número 9 como desafio convida você a desenvolver discernimento e proteção pessoal.',
      me: 'O Mérito 9 representa a energia mais poderosa do seu mapa. Você carrega uma força de intuição, uma capacidade de ajudar e servir com espiritualidade.',
      r1: 'Neste ciclo formativo, você foi desafiado a encontrar seu propósito. As experiências dessa fase te prepararam para ser ajudante espiritual.',
      r2: 'Nessa fase, você chega à maturidade e pode exercer sua ajuda de forma mais consciente.',
      r3: 'Nessa fase de maturidade plena, você pode consolidar sua sabedoria como ajudante espiritual.',
      r4: 'Nesse ciclo final, você reflete sobre sua jornada como ajudante espiritual.',
      cv: 'Os ciclos de vida do número 9 marcam fases de ajuda, espiritualidade e amor universal.'
    }
  },
  11: {
    number: 11,
    name: 'Mestre Iluminado',
    essence: 'O número 11 é um número mestre que vibra a energia da iluminação, da intuição amplificada e da sabedoria espiritual. É o iluminado, o inspirador, aquele que traz luz e compreensão profunda.',
    positions: {
      cd: 'Você veio ao mundo para iluminar, para inspirar e para deixar sua marca através da sabedoria espiritual e da intuição amplificada. Sua missão é ser um farol de luz para a humanidade.',
      mo: 'Desde cedo, existe em você uma força que busca iluminação, inspiração e compreensão profunda. Você não nasceu para viver na escuridão.',
      eu: 'Seu sonho íntimo é ser um MESTRE ILUMINADO. Você deseja ser reconhecido por sua sabedoria espiritual, deixar uma marca através da iluminação.',
      ex: 'O mundo te vê como um ILUMINADO NATURAL. As pessoas percebem em você uma energia de sabedoria e iluminação.',
      dm: 'Seu grande aprendizado é aprender a integrar a sabedoria espiritual com a ação prática no mundo material.',
      me: 'O Mérito 11 representa a energia mais poderosa do seu mapa. Você carrega uma força de iluminação e inspiração.',
      r1: 'Neste ciclo formativo, você foi desafiado a encontrar sua iluminação. As experiências dessa fase te prepararam para ser mestre.',
      r2: 'Nessa fase, você chega à maturidade e pode exercer sua iluminação de forma mais consciente.',
      r3: 'Nessa fase de maturidade plena, você pode consolidar sua sabedoria como mestre iluminado.',
      r4: 'Nesse ciclo final, você reflete sobre sua jornada como iluminado.',
      cv: 'Os ciclos de vida do número 11 marcam fases de iluminação, inspiração e sabedoria espiritual.'
    }
  },
  22: {
    number: 22,
    name: 'Mestre Construtor',
    essence: 'O número 22 é um número mestre que vibra a energia da construção em grande escala, da realização de grandes obras e da transformação do mundo através de estruturas duradouras.',
    positions: {
      cd: 'Você veio ao mundo para construir em grande escala, para realizar grandes obras e para deixar sua marca através de estruturas que transformam o mundo.',
      mo: 'Desde cedo, existe em você uma força que busca construir algo grandioso, algo que deixe um legado duradouro para a humanidade.',
      eu: 'Seu sonho íntimo é ser um MESTRE CONSTRUTOR. Você deseja ser reconhecido por suas grandes realizações, deixar uma marca através de obras que transformam.',
      ex: 'O mundo te vê como um CONSTRUTOR NATURAL. As pessoas percebem em você uma energia de poder e realização em grande escala.',
      dm: 'Seu grande aprendizado é aprender a manter a humildade e a integridade enquanto constrói em grande escala.',
      me: 'O Mérito 22 representa a energia mais poderosa do seu mapa. Você carrega uma força de construção e realização em escala global.',
      r1: 'Neste ciclo formativo, você foi desafiado a encontrar sua capacidade de construir em grande escala. As experiências dessa fase te prepararam para ser mestre construtor.',
      r2: 'Nessa fase, você chega à maturidade e pode exercer sua construção de forma mais consciente em escala maior.',
      r3: 'Nessa fase de maturidade plena, você pode consolidar sua sabedoria como mestre construtor.',
      r4: 'Nesse ciclo final, você reflete sobre sua jornada como construtor de grandes obras.',
      cv: 'Os ciclos de vida do número 22 marcam fases de construção em grande escala e realização de grandes obras.'
    }
  },
  33: {
    number: 33,
    name: 'Mestre Compassivo',
    essence: 'O número 33 é um número mestre que vibra a energia da compaixão universal, do amor incondicional e do serviço à humanidade em escala global.',
    positions: {
      cd: 'Você veio ao mundo para servir a humanidade com compaixão universal, para deixar sua marca através do amor incondicional e do serviço em escala global.',
      mo: 'Desde cedo, existe em você uma força que busca servir, amar e ajudar a humanidade de forma incondicional.',
      eu: 'Seu sonho íntimo é ser um MESTRE COMPASSIVO. Você deseja ser reconhecido por sua compaixão universal, deixar uma marca através do amor incondicional.',
      ex: 'O mundo te vê como um COMPASSIVO NATURAL. As pessoas percebem em você uma energia de amor universal e compaixão.',
      dm: 'Seu grande aprendizado é aprender a estabelecer limites mesmo enquanto serve com compaixão universal.',
      me: 'O Mérito 33 representa a energia mais poderosa do seu mapa. Você carrega uma força de compaixão universal e amor incondicional.',
      r1: 'Neste ciclo formativo, você foi desafiado a encontrar sua compaixão universal. As experiências dessa fase te prepararam para ser mestre compassivo.',
      r2: 'Nessa fase, você chega à maturidade e pode exercer sua compaixão de forma mais consciente em escala maior.',
      r3: 'Nessa fase de maturidade plena, você pode consolidar sua sabedoria como mestre compassivo.',
      r4: 'Nesse ciclo final, você reflete sobre sua jornada como servidor compassivo da humanidade.',
      cv: 'Os ciclos de vida do número 33 marcam fases de compaixão universal, amor incondicional e serviço global.'
    }
  }
};

export function getInterpretation(number: number | string): NumberInterpretationEliane | undefined {
  return INTERPRETATIONS_ELIANE[number];
}

export function getPosition(number: number | string, position: keyof NumberPosition): string | undefined {
  const interpretation = getInterpretation(number);
  return interpretation?.positions[position];
}
