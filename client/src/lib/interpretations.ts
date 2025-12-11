/**
 * Interpretações de Numerologia Pitagórica
 * Baseado em: Técnicas Avançadas de Numerologia Pitagórica - Elias Abrão Neto
 * 
 * Este arquivo contém as interpretações completas dos números 1-9
 * para o Mapa Numerológico Natal (MNN)
 */

export interface NumberInterpretation {
  number: number;
  name: string;
  essence: string;
  regras: string;
  riscos: string;
  comoEvitarRiscos: string;
  caracteristicas: string[];
  potenciais: string[];
  desafios: string[];
}

export const INTERPRETATIONS: Record<number, NumberInterpretation> = {
  1: {
    number: 1,
    name: 'Renascimento',
    essence: 'Abertura de novos caminhos e possibilidades',
    regras: `Renascimento. Abrir novos caminhos. A pessoa deve ficar atenta para perceber e implantar as novas possibilidades. Deve desenvolver a independência, ousadia, coragem, determinação e autoconfiança.`,
    riscos: `Não aproveitar as novas possibilidades e comprometer o ciclo de 9 anos ou querer aproveitar todas as possibilidades e não ter energia suficiente para concluí-las.`,
    comoEvitarRiscos: `Envolver-se e comprometer-se somente com situações que possa efetivamente trazer novas possibilidades e conquistas.`,
    caracteristicas: [
      'Independência',
      'Ousadia',
      'Coragem',
      'Determinação',
      'Autoconfiança',
      'Iniciativa',
      'Liderança',
    ],
    potenciais: [
      'Iniciar novos projetos com sucesso',
      'Desenvolver independência pessoal',
      'Conquistar novas oportunidades',
      'Estabelecer liderança em áreas',
      'Criar mudanças positivas',
    ],
    desafios: [
      'Não aproveitar as oportunidades',
      'Falta de foco e dispersão',
      'Impulsividade excessiva',
      'Dificuldade em completar ciclos',
    ],
  },
  2: {
    number: 2,
    name: 'Parceria e União',
    essence: 'Momento de parcerias e união com concessão',
    regras: `Momento de parcerias e união com concessão, flexibilidade e paciência. Deve-se desenvolver a calma e cooperação.`,
    riscos: `Não conceder ou revoltar-se produzindo perdas acentuadas ou conceder em excesso perdendo as oportunidades.`,
    comoEvitarRiscos: `Conceder para poder manter mas sem deixar de lado seus interesses.`,
    caracteristicas: [
      'Cooperação',
      'Flexibilidade',
      'Paciência',
      'Diplomacia',
      'Sensibilidade',
      'Intuição',
      'Harmonia',
    ],
    potenciais: [
      'Formar parcerias benéficas',
      'Desenvolver relacionamentos harmoniosos',
      'Colaborar efetivamente',
      'Mediar conflitos',
      'Criar equilíbrio em relacionamentos',
    ],
    desafios: [
      'Dependência excessiva',
      'Falta de assertividade',
      'Indecisão',
      'Perda de identidade pessoal',
    ],
  },
  3: {
    number: 3,
    name: 'Crescimento e Expansão',
    essence: 'Momento de crescimento e expansão em todas as áreas',
    regras: `Momento de crescimento e expansão. A pessoa deve buscar crescimento em todas as áreas da vida aproveitando as chances sem desperdiçar. Período de acentuada diversão, festas e compras.`,
    riscos: `Ficar contemplando o crescimento e não aproveitá-lo ou querer aproveitar todas as oportunidades de crescimento e expansão criando assim desordem.`,
    comoEvitarRiscos: `Assumir somente os compromissos que tiver certeza absoluta que poderá cumpri-los na totalidade.`,
    caracteristicas: [
      'Criatividade',
      'Expressão',
      'Otimismo',
      'Comunicação',
      'Alegria',
      'Sociabilidade',
      'Entusiasmo',
    ],
    potenciais: [
      'Expandir negócios e projetos',
      'Desenvolver criatividade',
      'Criar novas oportunidades',
      'Melhorar comunicação',
      'Atrair prosperidade',
    ],
    desafios: [
      'Dispersão e falta de foco',
      'Gastos excessivos',
      'Superficialidade',
      'Falta de profundidade',
    ],
  },
  4: {
    number: 4,
    name: 'Estabilidade e Segurança',
    essence: 'Conquistar estabilidade através de trabalho e dedicação',
    regras: `Momento de conquistar estabilidade e segurança através de muito trabalho, persistência e dedicação. Buscar estrutura e estabilidade.`,
    riscos: `Recusar-se a trabalhar muito (10 a 12 horas ao dia) ou evitar desfazer-se de questões que estão deterioradas na sua vida, ou então trabalhar em excesso e deixar paradas outras questões de seu MNN.`,
    comoEvitarRiscos: `O trabalho acentuado e a estruturação da vida são essenciais nesse ano e somente serão mantidos se viver conjuntamente outras VNs de seu MNN.`,
    caracteristicas: [
      'Disciplina',
      'Responsabilidade',
      'Praticidade',
      'Lealdade',
      'Confiabilidade',
      'Organização',
      'Estabilidade',
    ],
    potenciais: [
      'Construir alicerces sólidos',
      'Estabelecer estrutura duradoura',
      'Alcançar segurança financeira',
      'Consolidar conquistas',
      'Criar ordem e sistema',
    ],
    desafios: [
      'Rigidez excessiva',
      'Falta de flexibilidade',
      'Tédio e monotonia',
      'Resistência à mudança',
    ],
  },
  5: {
    number: 5,
    name: 'Mudança e Liberdade',
    essence: 'Momento de mudanças, liberdade e viagem',
    regras: `Momento de mudanças, liberdade e viagem. É necessário que a pessoa produza mudanças interiores e exteriores. Acreditar em novas possibilidades e investir nelas.`,
    riscos: `A vida muda e a pessoa não efetua as mudanças ou muda em excesso promovendo o desequilíbrio e a desordem.`,
    comoEvitarRiscos: `Efetuar mudanças que produzam condições seguras e aceitar que mudar não representa a perda da estabilidade.`,
    caracteristicas: [
      'Adaptabilidade',
      'Liberdade',
      'Aventura',
      'Dinamismo',
      'Versatilidade',
      'Curiosidade',
      'Movimento',
    ],
    potenciais: [
      'Realizar viagens significativas',
      'Experimentar novas experiências',
      'Adaptar-se a mudanças',
      'Ganhar liberdade pessoal',
      'Explorar novas possibilidades',
    ],
    desafios: [
      'Instabilidade excessiva',
      'Falta de compromisso',
      'Impulsividade',
      'Irresponsabilidade',
    ],
  },
  6: {
    number: 6,
    name: 'Prática Afetiva e Familiar',
    essence: 'Momento de prática afetiva e relacionamentos familiares',
    regras: `Momento de prática afetiva e relacionamentos familiares com família original e aquela que a pessoa tenha constituído. Dedicar-se à prática afetiva e à resolução de situações afetivas e familiares.`,
    riscos: `Afastar-se da prática afetiva, evitar resolver situações familiares. Acomodação, aumento de peso corporal, bigamia ou valorizar em excesso a prática afetiva ou situações familiares deixando de viver completamente seu MNN.`,
    comoEvitarRiscos: `A prática afetiva deve ser com uma única pessoa. Se não viver o lado social da vida, não haverá prática afetiva. As questões familiares (da família de sangue ou da família criada) são importantes, mas a resolução das questões familiares não pode impedir a resolução de propostas pessoais.`,
    caracteristicas: [
      'Amor',
      'Compaixão',
      'Responsabilidade',
      'Harmonia',
      'Cuidado',
      'Dedicação',
      'Empatia',
    ],
    potenciais: [
      'Fortalecer relacionamentos amorosos',
      'Resolver questões familiares',
      'Desenvolver compaixão',
      'Criar harmonia no lar',
      'Cuidar de pessoas queridas',
    ],
    desafios: [
      'Codependência',
      'Sacrifício excessivo',
      'Possessividade',
      'Negligência pessoal',
    ],
  },
  7: {
    number: 7,
    name: 'Encontro Consigo Mesmo',
    essence: 'Momento de encontro consigo mesmo e descobertas',
    regras: `Momento de encontro consigo mesmo e de acentuados questionamentos e descobertas. A vida proporcionará a retirada de ilusões e fantasias (desnudar) mostrando a situação/pessoas como realmente são, para proporcionar uma nova maneira de relacionamento com essas questões. Momento de prática espiritual através da leitura, cursos, reflexão e análise.`,
    riscos: `Não valorizar as descobertas e não produzir nova maneira de relacionar-se com os fatos da vida. Não havendo prática espiritual adequada comprometará os questionamentos e descobertas ou supervalorizar a intuição, interferindo na vida alheia através de palavras e conselhos.`,
    comoEvitarRiscos: `As descobertas e conhecimentos adquiridos nesse ano devem ser colocados em prática imediatamente. A intuição deve ser usada lembrando que a verdade está condicionada ao grau de entendimento de cada ser, e que a intuição é faculdade silenciosa e não deve ser propagada e alardeada indistintamente.`,
    caracteristicas: [
      'Introspecção',
      'Espiritualidade',
      'Sabedoria',
      'Análise',
      'Reflexão',
      'Intuição',
      'Discernimento',
    ],
    potenciais: [
      'Aprofundar autoconhecimento',
      'Desenvolver espiritualidade',
      'Ganhar sabedoria',
      'Resolver conflitos internos',
      'Encontrar propósito de vida',
    ],
    desafios: [
      'Isolamento excessivo',
      'Pessimismo',
      'Crítica severa',
      'Desconfiança',
    ],
  },
  8: {
    number: 8,
    name: 'Desenvolvimento Material',
    essence: 'Momento de desenvolvimento material com conquistas financeiras',
    regras: `Momento de acentuado desenvolvimento material com conquistas financeiras. Momento também de justiça, retidão e honestidade que favorece a resolução de processos judiciais (se houver). Entrada de herança e dinheiro oriundo de investimentos. É normal, nesse ano, a pessoa aumentar seu patrimônio de acordo com a sua realidade financeira.`,
    riscos: `A pessoa gastar excessivamente e comprometer os próximos anos ou desenvolver a ilusão de que somente o financeiro tem importância.`,
    comoEvitarRiscos: `Valorizar as conquistas materiais sem gastos excessivos. Ter a consciência de que posses materiais, prestígio, reconhecimento, destaque e sucesso são efêmeros. E que quando comparados ao desenvolvimento intelectual e espiritual são apenas detalhes necessários à evolução humana.`,
    caracteristicas: [
      'Abundância',
      'Poder',
      'Realização',
      'Justiça',
      'Honestidade',
      'Autoridade',
      'Sucesso',
    ],
    potenciais: [
      'Alcançar sucesso financeiro',
      'Resolver questões legais',
      'Aumentar patrimônio',
      'Ganhar reconhecimento',
      'Consolidar poder pessoal',
    ],
    desafios: [
      'Ganância',
      'Materialismo excessivo',
      'Abuso de poder',
      'Obsessão por dinheiro',
    ],
  },
  9: {
    number: 9,
    name: 'Limpeza e Transformação',
    essence: 'Momento de limpeza, mudanças e transformações',
    regras: `Momento de limpeza, mudanças e transformações. A pessoa está encerrando um ciclo de 9 anos. A vida proporcionará a eliminação de todos os aspectos/situações que não devem continuar na vida. A pessoa deve aceitar as limpezas e transformações sem resistir. Período de acentuada prática espiritual, ajudando e amparando seu próximo, isso aliviará as tensões provocadas pelas mudanças.`,
    riscos: `Prender-se a situações que estão sendo eliminadas para proporcionar o renascer no AP 1 ou então limpar e mudar em excesso, desfazendo-se de situações que não deveria desfazer-se.`,
    comoEvitarRiscos: `Para que a vida seja renovada, será preciso limpar e transformar mas deverá permanecer na vida ao que não apresentar dificuldades na vivência ou nenhum sinal de deterioração.`,
    caracteristicas: [
      'Transformação',
      'Compaixão',
      'Sabedoria',
      'Desapego',
      'Universalidade',
      'Conclusão',
      'Renovação',
    ],
    potenciais: [
      'Completar ciclos importantes',
      'Deixar ir o que não serve',
      'Transformar-se profundamente',
      'Ganhar perspectiva universal',
      'Preparar-se para novo início',
    ],
    desafios: [
      'Resistência à mudança',
      'Apego ao passado',
      'Confusão e caos',
      'Melancolia e tristeza',
    ],
  },
};

/**
 * Obter interpretação de um número
 */
export function getInterpretation(number: number): NumberInterpretation | null {
  const normalized = number % 10 === 0 ? 9 : number % 10;
  return INTERPRETATIONS[normalized] || null;
}

/**
 * Obter resumo da interpretação
 */
export function getInterpretationSummary(number: number): string {
  const interpretation = getInterpretation(number);
  if (!interpretation) return '';

  return `
**${interpretation.name} (Número ${interpretation.number})**

${interpretation.essence}

**Regras:**
${interpretation.regras}

**Riscos:**
${interpretation.riscos}

**Como Evitar os Riscos:**
${interpretation.comoEvitarRiscos}

**Características Principais:**
${interpretation.caracteristicas.map(c => `• ${c}`).join('\n')}

**Potenciais:**
${interpretation.potenciais.map(p => `• ${p}`).join('\n')}

**Desafios:**
${interpretation.desafios.map(d => `• ${d}`).join('\n')}
  `.trim();
}
