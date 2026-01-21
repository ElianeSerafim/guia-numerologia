/**
 * Interpretações de Ciclos de Vida, Desafios e Ano Pessoal 2026
 * Baseado na metodologia de Eliane Serafim
 */

/**
 * Interpretações dos Ciclos de Vida
 * C1 (Formativo): 0-28 anos - Soma do Mês
 * C2 (Produtivo): 29-56 anos - Soma do Dia (MAIS IMPORTANTE)
 * C3 (Colheita): 56+ anos - Soma do Ano
 */
export const lifeCycleInterpretations: Record<
  number,
  {
    essence: string;
    c1: string;
    c2: string;
    c3: string;
  }
> = {
  1: {
    essence:
      'Liderança, Iniciativa e Independência - O pioneiro que abre caminhos',
    c1: 'Você está aprendendo a ser independente e a confiar em suas próprias decisões. Este é um período de descoberta de sua força interior e coragem para começar coisas novas. Desafio: não ser impulsivo ou egoísta neste processo de aprendizado.',
    c2: 'Você está em sua fase de maior poder criativo. É hora de liderar projetos, tomar iniciativas e deixar sua marca no mundo. Sua energia é contagiante e você inspira outros. Desafio: equilibrar liderança com colaboração, não dominar mas guiar.',
    c3: 'Você colhe os frutos de sua coragem e iniciativa. Este é o momento de compartilhar sua sabedoria sobre liderança e independência. Você é um exemplo vivo de que é possível ser forte e autêntico.',
  },
  2: {
    essence: 'Harmonia, Diplomacia e Sensibilidade - O mediador que une',
    c1: 'Você está desenvolvendo sensibilidade e aprendendo a se relacionar com outros. Este é um período de aprender sobre empatia, cooperação e como lidar com emoções. Desafio: não ser muito tímido ou dependente neste aprendizado.',
    c2: 'Você está em sua fase de maior influência através da harmonia. É hora de ser mediador, de unir pessoas e de criar ambientes de paz. Sua sensibilidade é uma força. Desafio: não perder sua voz pessoal na busca pela harmonia.',
    c3: 'Você colhe os frutos da paz que cultivou. Este é o momento de ser um sábio conselheiro, alguém que ajuda a resolver conflitos com sabedoria e compaixão.',
  },
  3: {
    essence:
      'Criatividade, Comunicação e Expressão - O criador que inspira',
    c1: 'Você está descobrindo sua criatividade e aprendendo a se expressar. Este é um período de exploração artística e de encontrar sua voz. Desafio: não dispersar sua energia criativa em muitas direções.',
    c2: 'Você está em sua fase de maior expressão criativa. É hora de comunicar suas ideias, criar e compartilhar suas obras com o mundo. Sua criatividade é contagiante. Desafio: transformar criatividade em resultados práticos.',
    c3: 'Você colhe o reconhecimento por sua criatividade. Este é o momento de ser um mestre criativo, ensinando outros a expressar sua própria criatividade.',
  },
  4: {
    essence:
      'Estabilidade, Trabalho e Construção - O construtor que solidifica',
    c1: 'Você está aprendendo disciplina, responsabilidade e como construir bases sólidas. Este é um período de trabalho árduo e de aprender que tudo requer esforço. Desafio: não ser muito rígido ou inflexível.',
    c2: 'Você está em sua fase de maior produtividade. É hora de trabalhar duro, construir projetos sólidos e deixar um legado tangível. Sua dedicação é admirável. Desafio: permitir flexibilidade e descanso quando necessário.',
    c3: 'Você colhe os frutos de seu trabalho árduo. Este é o momento de desfrutar da estabilidade que construiu e de compartilhar sua sabedoria sobre disciplina e construção.',
  },
  5: {
    essence: 'Liberdade, Mudança e Adaptação - O explorador que transforma',
    c1: 'Você está aprendendo a se adaptar e a lidar com mudanças. Este é um período de exploração e descoberta de diferentes possibilidades. Desafio: não ser muito impulsivo ou irresponsável.',
    c2: 'Você está em sua fase de maior flexibilidade e adaptabilidade. É hora de explorar novas oportunidades, viajar, aprender e se reinventar. Sua capacidade de adaptação é sua força. Desafio: manter alguma estabilidade enquanto muda.',
    c3: 'Você colhe a sabedoria de suas experiências variadas. Este é o momento de compartilhar suas histórias de transformação e ajudar outros a se adaptarem às mudanças.',
  },
  6: {
    essence:
      'Responsabilidade, Amor e Família - O cuidador que nutre e protege',
    c1: 'Você está aprendendo sobre responsabilidade, cuidado e amor incondicional. Este é um período de desenvolver empatia e aprender a cuidar de quem ama. Desafio: não sacrificar sua própria vida pelo bem dos outros.',
    c2: 'Você está em sua fase de maior capacidade de amar e cuidar. É hora de construir relacionamentos profundos, criar família (biológica ou espiritual) e ser um porto seguro. Seu amor é transformador. Desafio: manter limites saudáveis enquanto cuida.',
    c3: 'Você colhe o amor que plantou. Este é o momento de ser um sábio conselheiro em questões de relacionamento e de transmitir sua sabedoria sobre amor verdadeiro.',
  },
  7: {
    essence:
      'Espiritualidade, Análise e Introspecção - O buscador que ilumina',
    c1: 'Você está aprendendo a se conectar com sua espiritualidade e a questionar a realidade. Este é um período de introspecção e de buscar respostas profundas. Desafio: não se isolar ou se perder em pensamentos.',
    c2: 'Você está em sua fase de maior compreensão espiritual. É hora de aprofundar seu conhecimento, meditar e buscar a verdade. Sua sabedoria é procurada. Desafio: compartilhar sua sabedoria sem ser dogmático.',
    c3: 'Você colhe a iluminação de sua jornada espiritual. Este é o momento de ser um mestre espiritual, guiando outros em sua busca pela verdade.',
  },
  8: {
    essence: 'Poder, Abundância e Autoridade - O manifestador que realiza',
    c1: 'Você está aprendendo sobre poder pessoal e como manifestar seus desejos. Este é um período de desenvolver confiança em sua capacidade de criar. Desafio: não usar poder de forma destrutiva ou egoísta.',
    c2: 'Você está em sua fase de maior poder de manifestação. É hora de criar riqueza, exercer autoridade e deixar seu legado de sucesso. Seu poder é magnético. Desafio: usar seu poder com responsabilidade e ética.',
    c3: 'Você colhe a abundância que manifestou. Este é o momento de ser um mentor de sucesso, ensinando outros como manifestar seus próprios objetivos.',
  },
  9: {
    essence:
      'Espiritualidade, Compaixão e Serviço - O servidor que transforma',
    c1: 'Você está aprendendo sobre compaixão, empatia universal e desapego. Este é um período de desenvolver amor incondicional e compreender a interconexão de tudo. Desafio: não se perder em problemas alheios.',
    c2: 'Você está em sua fase de maior capacidade de servir e inspirar. É hora de ajudar a humanidade, compartilhar sua sabedoria e deixar o mundo melhor. Sua compaixão é transformadora. Desafio: manter sua própria energia enquanto serve.',
    c3: 'Você colhe a sabedoria de uma vida dedicada ao serviço. Este é o momento de ser um sábio ancião, compartilhando sua compreensão profunda sobre a vida e o propósito.',
  },
  11: {
    essence:
      'Iluminação, Intuição e Inspiração - O iluminado que guia a humanidade',
    c1: 'Você está aprendendo a confiar em sua intuição extraordinária e em sua capacidade de inspirar. Este é um período de descobrir seu potencial espiritual. Desafio: não ser excessivamente idealista ou desconectado da realidade.',
    c2: 'Você está em sua fase de maior influência espiritual. É hora de inspirar, iluminar e guiar outros em sua jornada espiritual. Sua intuição é profunda. Desafio: traduzir sua visão em ações práticas.',
    c3: 'Você colhe o reconhecimento de sua iluminação. Este é o momento de ser um mestre espiritual, deixando um legado de inspiração para as gerações futuras.',
  },
  22: {
    essence:
      'Construção em Larga Escala, Visão e Realização - O mestre construtor',
    c1: 'Você está aprendendo a pensar em grande escala e a sonhar com projetos transformadores. Este é um período de desenvolver visão e ambição. Desafio: não ser arrogante ou perder a humildade.',
    c2: 'Você está em sua fase de maior capacidade de construir legados duradouros. É hora de realizar seus grandes projetos e deixar uma marca permanente no mundo. Sua visão é transformadora. Desafio: manter a paciência e a persistência.',
    c3: 'Você colhe o reconhecimento de suas grandes realizações. Este é o momento de ser um sábio conselheiro em questões de visão e construção de legados.',
  },
  33: {
    essence:
      'Mestria Espiritual, Compaixão Universal e Sacrifício - O mestre ascensionado',
    c1: 'Você está aprendendo sobre compaixão universal e sobre o poder do sacrifício consciente. Este é um período de desenvolver amor incondicional. Desafio: não perder sua própria identidade no serviço aos outros.',
    c2: 'Você está em sua fase de maior capacidade de servir a humanidade com sabedoria e compaixão. É hora de ser um curador, um mestre espiritual e um exemplo vivo de amor. Desafio: manter sua energia e não se queimar no serviço.',
    c3: 'Você colhe a sabedoria de uma vida dedicada à mestria espiritual. Este é o momento de ser um sábio ancião, deixando um legado de compaixão e transformação espiritual.',
  },
};

/**
 * Interpretações dos Desafios de Vida
 * D1: Dia - Mês (0-28 anos)
 * D2: Mês - Ano (29-56 anos)
 * DM: D1 - D2 (toda a vida) - MAIS IMPORTANTE
 */
export const challengeInterpretations: Record<
  number,
  {
    essence: string;
    d1: string;
    d2: string;
    dm: string;
  }
> = {
  1: {
    essence: 'Aprender a ser independente, corajoso e autêntico',
    d1: 'Você precisa aprender a confiar em si mesmo e a tomar suas próprias decisões. Este é um desafio sobre independência e coragem.',
    d2: 'Você precisa aprender a ser um líder autêntico e a manter sua individualidade mesmo sob pressão. Este é um desafio sobre liderança consciente.',
    dm: 'Seu maior desafio é aprender a ser verdadeiramente independente e autêntico, sem perder a conexão com outros. É sobre encontrar sua voz única.',
  },
  2: {
    essence: 'Aprender a equilibrar, cooperar e confiar',
    d1: 'Você precisa aprender a trabalhar com outros e a confiar em pessoas. Este é um desafio sobre cooperação e diplomacia.',
    d2: 'Você precisa aprender a manter a harmonia sem sacrificar sua própria voz. Este é um desafio sobre limites saudáveis.',
    dm: 'Seu maior desafio é aprender a confiar e a se relacionar profundamente sem perder sua identidade. É sobre encontrar equilíbrio verdadeiro.',
  },
  3: {
    essence: 'Aprender a se expressar, criar e comunicar',
    d1: 'Você precisa aprender a expressar suas ideias e sentimentos. Este é um desafio sobre comunicação e criatividade.',
    d2: 'Você precisa aprender a transformar sua criatividade em resultados práticos. Este é um desafio sobre manifestação.',
    dm: 'Seu maior desafio é aprender a se expressar autenticamente e a compartilhar sua criatividade com o mundo. É sobre encontrar sua voz criativa.',
  },
  4: {
    essence: 'Aprender a construir, disciplinar e ser responsável',
    d1: 'Você precisa aprender disciplina e responsabilidade. Este é um desafio sobre estrutura e comprometimento.',
    d2: 'Você precisa aprender a ser flexível enquanto mantém sua estrutura. Este é um desafio sobre adaptabilidade com raízes.',
    dm: 'Seu maior desafio é aprender a construir bases sólidas sem ser rígido demais. É sobre encontrar estabilidade com flexibilidade.',
  },
  5: {
    essence: 'Aprender a se adaptar, explorar e evoluir',
    d1: 'Você precisa aprender a lidar com mudanças e a ser flexível. Este é um desafio sobre adaptação e coragem para o novo.',
    d2: 'Você precisa aprender a manter alguma estabilidade enquanto explora novas possibilidades. Este é um desafio sobre equilíbrio.',
    dm: 'Seu maior desafio é aprender a abraçar mudanças sem perder seu centro. É sobre encontrar liberdade com propósito.',
  },
  6: {
    essence: 'Aprender a amar, cuidar e servir com limites',
    d1: 'Você precisa aprender a cuidar de outros sem sacrificar a si mesmo. Este é um desafio sobre amor incondicional com limites.',
    d2: 'Você precisa aprender a manter relacionamentos profundos enquanto cresce. Este é um desafio sobre relacionamentos maduros.',
    dm: 'Seu maior desafio é aprender a amar profundamente sem perder sua independência. É sobre encontrar amor verdadeiro.',
  },
  7: {
    essence: 'Aprender a confiar, questionar e compreender',
    d1: 'Você precisa aprender a confiar em sua intuição e em sua sabedoria interior. Este é um desafio sobre fé e introspecção.',
    d2: 'Você precisa aprender a compartilhar sua sabedoria sem ser dogmático. Este é um desafio sobre ensinamento com humildade.',
    dm: 'Seu maior desafio é aprender a confiar em sua intuição enquanto permanece aberto a outras perspectivas. É sobre encontrar sabedoria verdadeira.',
  },
  8: {
    essence: 'Aprender a manifestar, liderar e usar o poder com ética',
    d1: 'Você precisa aprender a confiar em sua capacidade de criar e manifestar. Este é um desafio sobre autoconfiança e poder pessoal.',
    d2: 'Você precisa aprender a usar seu poder com responsabilidade e ética. Este é um desafio sobre liderança consciente.',
    dm: 'Seu maior desafio é aprender a manifestar seus objetivos sem prejudicar outros. É sobre encontrar sucesso com integridade.',
  },
  9: {
    essence: 'Aprender a servir, soltar e transformar',
    d1: 'Você precisa aprender a servir sem perder sua identidade. Este é um desafio sobre compaixão com limites.',
    d2: 'Você precisa aprender a soltar apegos e a aceitar o ciclo natural da vida. Este é um desafio sobre desapego e aceitação.',
    dm: 'Seu maior desafio é aprender a servir a humanidade sem se perder. É sobre encontrar propósito verdadeiro.',
  },
  11: {
    essence:
      'Aprender a confiar em sua intuição extraordinária e a inspirar',
    d1: 'Você precisa aprender a confiar em sua intuição e em sua visão espiritual. Este é um desafio sobre fé em si mesmo.',
    d2: 'Você precisa aprender a traduzir sua visão em ações práticas. Este é um desafio sobre manifestação espiritual.',
    dm: 'Seu maior desafio é aprender a equilibrar sua visão espiritual com a realidade prática. É sobre encontrar iluminação encarnada.',
  },
  22: {
    essence:
      'Aprender a construir em grande escala e a realizar sua visão',
    d1: 'Você precisa aprender a pensar em grande escala e a sonhar grande. Este é um desafio sobre ambição e visão.',
    d2: 'Você precisa aprender a manter a paciência e a persistência em seus grandes projetos. Este é um desafio sobre realização.',
    dm: 'Seu maior desafio é aprender a construir legados duradouros sem perder a humanidade. É sobre encontrar mestria verdadeira.',
  },
  33: {
    essence:
      'Aprender a servir a humanidade com sabedoria e compaixão universal',
    d1: 'Você precisa aprender sobre compaixão universal e sobre o poder do sacrifício consciente. Este é um desafio sobre amor incondicional.',
    d2: 'Você precisa aprender a servir sem se queimar e a manter sua própria energia. Este é um desafio sobre sustentabilidade do serviço.',
    dm: 'Seu maior desafio é aprender a servir a humanidade mantendo sua própria integridade. É sobre encontrar mestria espiritual encarnada.',
  },
};

/**
 * Interpretações do Ano Pessoal 2026
 * Adaptadas para o contexto prático do ano
 */
export const annualYear2026Interpretations: Record<
  number,
  {
    essence: string;
    facilidades: string;
    desafios: string;
    conselhos: string;
  }
> = {
  1: {
    essence: '2026 é um ano de INÍCIO, LIDERANÇA e CORAGEM',
    facilidades:
      'Este é um ano para começar novos projetos, tomar iniciativas e ser corajoso. Você terá energia e inspiração para liderar. Oportunidades de crescimento pessoal e profissional aparecem. É um ano de renovação e de deixar o passado para trás.',
    desafios:
      'Cuidado com a impulsividade e o egoísmo. Você pode querer fazer tudo sozinho. Aprenda a colaborar e a ouvir outras perspectivas. Não force as coisas; deixe que fluam naturalmente.',
    conselhos:
      'Use sua coragem para começar, mas mantenha a humildade. Colabore com outros. Confie em seu instinto, mas valide com a razão. Este é um ano para plantar sementes, não para colher.',
  },
  2: {
    essence: '2026 é um ano de HARMONIA, DIPLOMACIA e COOPERAÇÃO',
    facilidades:
      'Este é um ano para construir relacionamentos, cooperar e criar harmonia. Você terá facilidade em mediar conflitos e em unir pessoas. Oportunidades de parcerias e colaborações surgem. É um ano de paz e equilíbrio.',
    desafios:
      'Cuidado com a passividade e a dependência. Você pode perder sua voz pessoal na busca pela harmonia. Não sacrifique seus próprios desejos. Mantenha seus limites.',
    conselhos:
      'Cultive a paz sem perder sua autenticidade. Seja diplomático, mas firme em seus valores. Este é um ano para fortalecer relacionamentos importantes. Confie em sua intuição.',
  },
  3: {
    essence: '2026 é um ano de CRIATIVIDADE, COMUNICAÇÃO e EXPRESSÃO',
    facilidades:
      'Este é um ano para se expressar, criar e comunicar suas ideias. Você terá inspiração criativa e facilidade em se conectar com outros. Oportunidades de projetos criativos e de comunicação surgem. É um ano de alegria e criatividade.',
    desafios:
      'Cuidado com a dispersão e a falta de foco. Você pode ter muitas ideias e não concluir nada. Não negligencie responsabilidades. Transforme criatividade em ação.',
    conselhos:
      'Canaliza sua criatividade em projetos específicos. Comunique suas ideias com clareza. Este é um ano para brilhar e se expressar. Divirta-se, mas mantenha o foco.',
  },
  4: {
    essence: '2026 é um ano de TRABALHO, CONSTRUÇÃO e ESTABILIDADE',
    facilidades:
      'Este é um ano para trabalhar duro, construir bases sólidas e criar estabilidade. Você terá disciplina e determinação. Oportunidades de crescimento profissional e de construção de projetos surgem. É um ano de progresso tangível.',
    desafios:
      'Cuidado com a rigidez e a falta de flexibilidade. Você pode se sobrecarregar de trabalho. Permita descanso e diversão. Não seja tão exigente consigo mesmo.',
    conselhos:
      'Trabalhe com dedicação, mas permita-se descansar. Construa com paciência e consistência. Este é um ano para estabelecer fundações sólidas. Confie no processo.',
  },
  5: {
    essence: '2026 é um ano de LIBERDADE, MUDANÇA e ADAPTAÇÃO',
    facilidades:
      'Este é um ano para explorar, se adaptar e abraçar mudanças. Você terá flexibilidade e curiosidade. Oportunidades de viagens, aprendizado e transformação surgem. É um ano de crescimento através da experiência.',
    desafios:
      'Cuidado com a impulsividade e a falta de comprometimento. Você pode mudar de direção constantemente. Mantenha alguma estabilidade. Não abandone projetos importantes.',
    conselhos:
      'Explore novas possibilidades, mas mantenha seu centro. Seja flexível, mas comprometido. Este é um ano para aprender e crescer. Confie em sua capacidade de adaptação.',
  },
  6: {
    essence: '2026 é um ano de RESPONSABILIDADE, AMOR e FAMÍLIA',
    facilidades:
      'Este é um ano para amar, cuidar e construir relacionamentos profundos. Você terá capacidade de criar harmonia familiar. Oportunidades de relacionamentos significativos e de serviço surgem. É um ano de conexão e cuidado.',
    desafios:
      'Cuidado com o sacrifício excessivo e a perda de identidade. Você pode se dedicar demais aos outros. Mantenha seus próprios desejos e necessidades. Estabeleça limites saudáveis.',
    conselhos:
      'Ame profundamente, mas mantenha sua independência. Cuide de quem ama, mas também de si mesmo. Este é um ano para fortalecer vínculos. Confie no poder do amor.',
  },
  7: {
    essence: '2026 é um ano de ESPIRITUALIDADE, ANÁLISE e INTROSPECÇÃO',
    facilidades:
      'Este é um ano para se conectar com sua espiritualidade, meditar e buscar respostas profundas. Você terá clareza mental e intuição aguçada. Oportunidades de aprendizado espiritual e de compreensão surgem. É um ano de sabedoria.',
    desafios:
      'Cuidado com o isolamento e a obsessão com detalhes. Você pode se perder em pensamentos. Mantenha conexões com o mundo físico e com outras pessoas. Não seja muito crítico.',
    conselhos:
      'Dedique tempo à meditação e à introspecção. Busque respostas em sua sabedoria interior. Este é um ano para compreender profundamente. Confie em sua intuição.',
  },
  8: {
    essence: '2026 é um ano de PODER, ABUNDÂNCIA e MANIFESTAÇÃO',
    facilidades:
      'Este é um ano para manifestar seus objetivos, criar riqueza e exercer seu poder. Você terá confiança e magnetismo. Oportunidades de sucesso profissional e financeiro surgem. É um ano de realização e abundância.',
    desafios:
      'Cuidado com o abuso de poder e a ganância. Você pode ser muito focado em resultados. Use seu poder com ética e responsabilidade. Não negligencie relacionamentos.',
    conselhos:
      'Manifeste com intenção clara e ética. Use seu poder para o bem. Este é um ano para criar sucesso duradouro. Confie em sua capacidade de manifestação.',
  },
  9: {
    essence: '2026 é um ano de ESPIRITUALIDADE, COMPAIXÃO e SERVIÇO',
    facilidades:
      'Este é um ano para servir, ajudar e deixar o mundo melhor. Você terá compaixão universal e compreensão profunda. Oportunidades de serviço e de transformação surgem. É um ano de propósito espiritual.',
    desafios:
      'Cuidado com o sacrifício excessivo e a perda de energia. Você pode se dedicar demais ao bem dos outros. Mantenha sua própria energia e bem-estar. Estabeleça limites.',
    conselhos:
      'Sirva com compaixão, mas mantenha sua energia. Ajude sem se perder. Este é um ano para deixar um legado positivo. Confie no poder da compaixão.',
  },
  11: {
    essence: '2026 é um ano de ILUMINAÇÃO, INTUIÇÃO e INSPIRAÇÃO',
    facilidades:
      'Este é um ano para confiar em sua intuição extraordinária e inspirar outros. Você terá visão clara e conexão espiritual profunda. Oportunidades de liderança espiritual e de inspiração surgem. É um ano de iluminação.',
    desafios:
      'Cuidado com o idealismo excessivo e a desconexão da realidade. Você pode ter expectativas irrealistas. Mantenha os pés no chão. Traduza sua visão em ações práticas.',
    conselhos:
      'Confie em sua intuição extraordinária. Inspire outros com sua visão. Este é um ano para iluminar caminhos. Mantenha a conexão com a realidade prática.',
  },
  22: {
    essence: '2026 é um ano de VISÃO EM GRANDE ESCALA e REALIZAÇÃO',
    facilidades:
      'Este é um ano para realizar seus grandes projetos e deixar um legado duradouro. Você terá visão clara e capacidade de construção. Oportunidades de grandes realizações surgem. É um ano de mestria.',
    desafios:
      'Cuidado com a arrogância e a falta de paciência. Você pode querer tudo rápido demais. Mantenha a humildade e a persistência. Não desista nos obstáculos.',
    conselhos:
      'Construa com paciência e visão clara. Mantenha a humildade enquanto realiza. Este é um ano para deixar uma marca permanente. Confie em seu processo.',
  },
  33: {
    essence: '2026 é um ano de MESTRIA ESPIRITUAL e COMPAIXÃO UNIVERSAL',
    facilidades:
      'Este é um ano para servir a humanidade com sabedoria e compaixão. Você terá capacidade de curar e transformar. Oportunidades de serviço espiritual e de transformação surgem. É um ano de mestria.',
    desafios:
      'Cuidado com o burnout e a perda de energia. Você pode se dedicar demais ao bem dos outros. Mantenha sua própria energia e bem-estar. Estabeleça limites saudáveis.',
    conselhos:
      'Sirva com sabedoria e compaixão, mas mantenha sua energia. Este é um ano para deixar um legado espiritual. Confie no poder da transformação consciente.',
  },
};

/**
 * Função para obter interpretação de Ciclo de Vida
 */
export function getLifeCycleInterpretation(
  number: number,
  cycle: 'C1' | 'C2' | 'C3'
): string {
  const interpretation = lifeCycleInterpretations[number];
  if (!interpretation) return '';

  switch (cycle) {
    case 'C1':
      return interpretation.c1;
    case 'C2':
      return interpretation.c2;
    case 'C3':
      return interpretation.c3;
  }
}

/**
 * Função para obter interpretação de Desafio
 */
export function getChallengeInterpretation(
  number: number,
  challenge: 'D1' | 'D2' | 'DM'
): string {
  const interpretation = challengeInterpretations[number];
  if (!interpretation) return '';

  switch (challenge) {
    case 'D1':
      return interpretation.d1;
    case 'D2':
      return interpretation.d2;
    case 'DM':
      return interpretation.dm;
  }
}

/**
 * Função para obter interpretação de Ano Pessoal 2026
 */
export function getAnnualYear2026Interpretation(number: number) {
  return annualYear2026Interpretations[number] || null;
}
