/**
 * Dicas Rápidas Diárias para Aproveitar a Energia Numerológica
 * 
 * Cada número do dia (1-9) possui dicas práticas e objetivas
 * para aproveitar melhor a energia do dia.
 */

export interface DailyTip {
  number: number;
  title: string;
  tip: string;
  action: string;
  avoid: string;
}

export const DAILY_TIPS: Record<number, DailyTip> = {
  1: {
    number: 1,
    title: "Dia de Liderança e Iniciativa",
    tip: "Hoje é o dia perfeito para começar aquele projeto que você vem adiando. A energia do número 1 favorece novos começos, coragem e autonomia. Confie em si mesmo e dê o primeiro passo!",
    action: "Inicie algo novo, tome decisões importantes ou assuma a liderança em uma situação.",
    avoid: "Evite depender excessivamente dos outros ou adiar decisões importantes."
  },
  2: {
    number: 2,
    title: "Dia de Cooperação e Diplomacia",
    tip: "A energia do dia pede colaboração e sensibilidade. É um ótimo momento para fortalecer parcerias, ouvir com atenção e buscar harmonia nos relacionamentos. Sua empatia está em alta!",
    action: "Trabalhe em equipe, resolva conflitos com diálogo ou fortaleça laços afetivos.",
    avoid: "Evite confrontos diretos, impaciência ou tomar decisões sozinho sem consultar os envolvidos."
  },
  3: {
    number: 3,
    title: "Dia de Criatividade e Expressão",
    tip: "Hoje sua criatividade está no auge! É o dia ideal para se expressar, seja através da arte, comunicação ou projetos criativos. Compartilhe suas ideias e deixe sua alegria contagiar os outros.",
    action: "Crie algo novo, participe de eventos sociais ou expresse seus sentimentos de forma autêntica.",
    avoid: "Evite dispersão, superficialidade ou falar demais sem ouvir."
  },
  4: {
    number: 4,
    title: "Dia de Organização e Disciplina",
    tip: "A energia do número 4 traz foco e estabilidade. Hoje é perfeito para organizar sua vida, cumprir tarefas pendentes e construir bases sólidas para o futuro. Trabalhe com método e persistência!",
    action: "Organize seu espaço, finalize tarefas práticas ou planeje seus próximos passos com cuidado.",
    avoid: "Evite rigidez excessiva, resistência a mudanças ou sobrecarga de trabalho."
  },
  5: {
    number: 5,
    title: "Dia de Liberdade e Aventura",
    tip: "Hoje é dia de sair da rotina! A energia do 5 favorece mudanças, viagens e novas experiências. Permita-se explorar, experimentar e se adaptar ao inesperado com leveza e curiosidade.",
    action: "Experimente algo novo, viaje (mesmo que seja um passeio curto) ou quebre a rotina de forma positiva.",
    avoid: "Evite excessos, impulsividade irresponsável ou dispersão que impeça conclusões."
  },
  6: {
    number: 6,
    title: "Dia de Amor e Responsabilidade",
    tip: "A energia do dia pede cuidado e dedicação aos que você ama. É um momento ideal para nutrir relacionamentos, cuidar da família e do lar, e agir com compaixão e responsabilidade.",
    action: "Cuide de quem você ama, embeleze seu espaço ou assuma responsabilidades com amor.",
    avoid: "Evite sacrificar-se em excesso, cobranças exageradas ou interferir onde não foi chamado."
  },
  7: {
    number: 7,
    title: "Dia de Reflexão e Espiritualidade",
    tip: "Hoje é dia de olhar para dentro. A energia do 7 favorece introspecção, estudos profundos e conexão espiritual. Reserve um tempo para meditar, ler ou simplesmente estar em silêncio consigo mesmo.",
    action: "Medite, estude algo que te interessa profundamente ou busque momentos de solidão produtiva.",
    avoid: "Evite isolamento excessivo, desconfiança ou análises que paralisem suas ações."
  },
  8: {
    number: 8,
    title: "Dia de Poder e Realização",
    tip: "A energia do 8 traz força e poder de realização! Hoje é ideal para questões financeiras, negociações e conquistas materiais. Aja com confiança, autoridade e visão estratégica.",
    action: "Negocie, invista em seus projetos ou tome decisões relacionadas a dinheiro e carreira.",
    avoid: "Evite autoritarismo, ganância ou usar seu poder de forma manipuladora."
  },
  9: {
    number: 9,
    title: "Dia de Compaixão e Finalização",
    tip: "Hoje é dia de encerrar ciclos e praticar a generosidade. A energia do 9 favorece o desapego, a compaixão e o serviço ao próximo. Finalize o que precisa ser concluído e ajude quem precisa.",
    action: "Finalize projetos pendentes, pratique atos de bondade ou doe o que não usa mais.",
    avoid: "Evite apego excessivo ao passado, mártir ou dispersar sua energia em muitas causas."
  }
};

/**
 * Retorna a dica do dia baseada no número calculado
 */
export const getDailyTip = (dailyNumber: number): DailyTip => {
  return DAILY_TIPS[dailyNumber] || DAILY_TIPS[1];
};
