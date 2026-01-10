import knowledgeBase from './knowledgeBase.json';
import { NumerologyChart } from '@/types';

/**
 * EbookGenerator - Gerador de E-books Numerológicos
 * Metodologia: Abran (Lili Numerologia / Numeria Premium)
 * 
 * Regras Inegociáveis:
 * - Usar APENAS dados do knowledgeBase.json
 * - Nunca inventar conceitos
 * - Nunca simplificar excessivamente
 * - Nunca usar linguagem genérica de autoajuda
 * - Nunca misturar outros sistemas numerológicos
 * - Sempre segunda pessoa ("você")
 * - Tom: claro, acolhedor, terapêutico, elegante e profissional premium
 */

interface InterpretacaoNumero {
  base: string;
  mo?: string;
  dm?: string;
  ciclo_realizacao?: string;
}

export const getInterpretacao = (numero: number, tipo: 'base' | 'mo' | 'dm' | 'ciclo_realizacao' = 'base'): string => {
  const interpretacoes = knowledgeBase.interpretacoes as Record<string, InterpretacaoNumero>;
  const chave = numero.toString();
  
  if (!interpretacoes[chave]) {
    console.warn(`Número ${numero} não encontrado na Base de Conhecimento`);
    return '';
  }
  
  const interpretacao = interpretacoes[chave];
  
  if (tipo === 'base') return interpretacao.base || '';
  if (tipo === 'mo') return interpretacao.mo || '';
  if (tipo === 'dm') return interpretacao.dm || '';
  if (tipo === 'ciclo_realizacao') return interpretacao.ciclo_realizacao || '';
  
  return '';
};

export const getPosicaoNome = (posicao: string): string => {
  const posicoes: Record<string, string> = knowledgeBase.posicoes;
  return posicoes[posicao] || posicao;
};

/**
 * Gera conteúdo de interpretação para uma posição numerológica
 */
export const gerarInterpretacao = (posicao: string, numero: number, chart: NumerologyChart): string => {
  const nome = getPosicaoNome(posicao);
  const interpretacao = getInterpretacao(numero, 'base');
  
  let conteudo = `## ${nome}\n\n`;
  conteudo += `**Seu número: ${numero}**\n\n`;
  conteudo += `${interpretacao}\n\n`;
  
  // Adicionar interpretações específicas baseadas na posição
  if (posicao === 'MO') {
    const mo = getInterpretacao(numero, 'mo');
    conteudo += `### O Seu Desejo Profundo\n\n${mo}\n\n`;
  }
  
  if (posicao === 'DM') {
    const dm = getInterpretacao(numero, 'dm');
    conteudo += `### O Seu Aprendizado Obrigatório\n\n${dm}\n\n`;
  }
  
  return conteudo;
};

/**
 * Gera estrutura completa do e-book
 */
export const gerarEbook = (chart: NumerologyChart): string => {
  let ebook = '';
  
  // CAPA
  ebook += `# ${chart.fullName}\n`;
  ebook += `## Mapa Numerológico Pitagórico Terapêutico\n`;
  ebook += `*Lili Numerologia • Numeria Premium*\n\n`;
  
  // APRESENTAÇÃO
  ebook += `## Apresentação\n\n`;
  ebook += `O mapa numerológico é um espelho da sua essência. Cada número revela um aspecto único da sua personalidade, missão de vida e potencial de transformação.\n\n`;
  ebook += `Este guia foi criado especialmente para você, com base no método pitagórico terapêutico. Use-o como ferramenta de autoconhecimento, nunca como fatalismo.\n\n`;
  
  // SÍNTESE DO MAPA
  ebook += `## Síntese do Seu Mapa\n\n`;
  ebook += `| Posição | Número |\n`;
  ebook += `|---------|--------|\n`;
  ebook += `| Caminho de Destino (CD) | ${chart.cd} |\n`;
  ebook += `| Motivação (MO) | ${chart.mo} |\n`;
  ebook += `| Eu Íntimo (EU) | ${chart.eu} |\n`;
  ebook += `| Expressão (EX) | ${chart.ex} |\n`;
  ebook += `| Mérito (ME) | ${chart.merito} |\n`;
  ebook += `| Desafio Maior (DM) | ${chart.desafios.dm} |\n\n`;
  
  // INTERPRETAÇÕES PRINCIPAIS
  ebook += `## Interpretações Principais\n\n`;
  ebook += gerarInterpretacao('CD', chart.cd, chart);
  ebook += gerarInterpretacao('MO', chart.mo, chart);
  ebook += gerarInterpretacao('EU', chart.eu, chart);
  ebook += gerarInterpretacao('EX', chart.ex, chart);
  ebook += gerarInterpretacao('ME', chart.merito, chart);
  ebook += gerarInterpretacao('DM', chart.desafios.dm, chart);
  
  // DESAFIOS DA VIDA
  ebook += `## Desafios da Vida\n\n`;
  ebook += `### 1º Desafio: Dos 0 aos 29 Anos\n\n`;
  ebook += `**Número:** ${chart.desafios.d1}\n\n`;
  ebook += `**Faixa Etária:** Dos 0 aos 29 anos\n\n`;
  ebook += `${getInterpretacao(chart.desafios.d1)}\n\n`;
  ebook += `${getInterpretacao(chart.desafios.d1, 'dm')}\n\n`;
  
  ebook += `### 2º Desafio: Dos 29 aos 56 Anos\n\n`;
  ebook += `**Número:** ${chart.desafios.d2}\n\n`;
  ebook += `**Faixa Etária:** Dos 29 aos 56 anos\n\n`;
  ebook += `${getInterpretacao(chart.desafios.d2)}\n\n`;
  ebook += `${getInterpretacao(chart.desafios.d2, 'dm')}\n\n`;
  
  ebook += `### Desafio Maior (O Seu Pedágio): Por Toda a Vida\n\n`;
  ebook += `**Número:** ${chart.desafios.dm}\n\n`;
  ebook += `**Faixa Etária:** Por toda a vida\n\n`;
  ebook += `${getInterpretacao(chart.desafios.dm)}\n\n`;
  ebook += `${getInterpretacao(chart.desafios.dm, 'dm')}\n\n`;
  
  // CICLOS DE VIDA
  ebook += `## As Estações da Vida - Ciclos\n\n`;
  ebook += `### 1º Ciclo Formativo\n\nNúmero: ${chart.ciclos.c1}\n\n${getInterpretacao(chart.ciclos.c1, 'ciclo_realizacao')}\n\n`;
  ebook += `### 2º Ciclo Produtivo\n\nNúmero: ${chart.ciclos.c2}\n\n${getInterpretacao(chart.ciclos.c2, 'ciclo_realizacao')}\n\n`;
  ebook += `### 3º Ciclo de Colheita\n\nNúmero: ${chart.ciclos.c3}\n\n${getInterpretacao(chart.ciclos.c3, 'ciclo_realizacao')}\n\n`;
  
  // REALIZAÇÕES
  ebook += `## As Estações da Vida - Realizações\n\n`;
  ebook += `### 1ª Realização\n\nNúmero: ${chart.realizacoes.r1}\n\n${getInterpretacao(chart.realizacoes.r1, 'ciclo_realizacao')}\n\n`;
  ebook += `### 2ª Realização\n\nNúmero: ${chart.realizacoes.r2}\n\n${getInterpretacao(chart.realizacoes.r2, 'ciclo_realizacao')}\n\n`;
  ebook += `### 3ª Realização\n\nNúmero: ${chart.realizacoes.r3}\n\n${getInterpretacao(chart.realizacoes.r3, 'ciclo_realizacao')}\n\n`;
  ebook += `### 4ª Realização\n\nNúmero: ${chart.realizacoes.r4}\n\n${getInterpretacao(chart.realizacoes.r4, 'ciclo_realizacao')}\n\n`;
  
  // ENCERRAMENTO
  ebook += `## Encerramento\n\n`;
  ebook += `Você é um ser em constante transformação. Este mapa é um convite para conhecer-se mais profundamente e integrar todas as suas dimensões numerológicas.\n\n`;
  ebook += `*Que cada número seja uma luz no seu caminho.*\n\n`;
  ebook += `---\n\n`;
  ebook += `Gerado com a Metodologia Abran | Lili Numerologia • Numeria Premium\n`;
  
  return ebook;
};
