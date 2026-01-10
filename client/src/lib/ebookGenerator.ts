import knowledgeBase from './knowledgeBase.json';
import { NumerologyChart } from '@/types';

/**
 * EbookGenerator - Gerador de E-books Numerológicos Premium
 * Metodologia: Abran (Lili Numerologia / Numeria Premium)
 * 
 * Design Editorial: Paleta Roxo/Rosa/Dourado
 * Formato: A4 com numeração de página
 * Otimização: Mobile-First, sem espaçamento excessivo
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
 * Gera HTML premium com estilo inline para e-books
 */
const getEbookHTML = (content: string): string => {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bússola Numerológica 2026</title>
<style>
@page {
  size: A4;
  margin: 1.5cm;
  @bottom-center {
    content: counter(page);
    font-size: 11px;
    color: #999;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.5;
  color: #2c2c2c;
  background-color: #f5f3f0;
  padding: 1rem;
  font-size: 13px;
  orphans: 3;
  widows: 3;
}

@media (min-width: 768px) {
  body {
    padding: 1.5rem;
    max-width: 850px;
    margin: 0 auto;
    font-size: 14px;
  }
}

h1 {
  font-size: 1.3em;
  text-align: center;
  margin: 0.5rem 0 0.3rem;
  color: #4A148C;
  font-weight: 600;
  letter-spacing: 0.5px;
  page-break-after: avoid;
}

@media (min-width: 768px) {
  h1 {
    font-size: 1.6em;
    margin: 0.8rem 0 0.4rem;
  }
}

h2 {
  font-size: 1.1em;
  text-align: center;
  margin: 0.5rem 0 0.3rem;
  color: #C71585;
  font-weight: 600;
  page-break-after: avoid;
}

@media (min-width: 768px) {
  h2 {
    font-size: 1.3em;
    margin: 0.8rem 0 0.4rem;
  }
}

h3 {
  font-size: 0.95em;
  margin: 0.4rem 0 0.2rem;
  color: #4A148C;
  font-weight: 600;
  page-break-after: avoid;
}

@media (min-width: 768px) {
  h3 {
    font-size: 1em;
    margin: 0.6rem 0 0.3rem;
  }
}

p {
  margin-bottom: 0.4rem;
  text-align: justify;
  line-height: 1.5;
  font-size: 0.93em;
  orphans: 2;
  widows: 2;
}

@media (min-width: 768px) {
  p {
    margin-bottom: 0.6rem;
    line-height: 1.6;
    font-size: 0.95em;
  }
}

.divider {
  text-align: center;
  margin: 0.4rem 0;
  color: #D4AF37;
  font-size: 0.75em;
  letter-spacing: 2px;
  page-break-after: avoid;
}

@media (min-width: 768px) {
  .divider {
    margin: 0.6rem 0;
    font-size: 0.8em;
  }
}

.capa {
  text-align: center;
  margin-bottom: 0.6rem;
  padding: 0.8rem 0;
  border-top: 2px solid #4A148C;
  border-bottom: 2px solid #C71585;
  page-break-after: avoid;
}

@media (min-width: 768px) {
  .capa {
    margin-bottom: 1rem;
    padding: 1rem 0;
    border-top: 3px solid #4A148C;
    border-bottom: 3px solid #C71585;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0.4rem 0;
  font-size: 0.82em;
  page-break-inside: avoid;
}

@media (min-width: 768px) {
  table {
    margin: 0.6rem 0;
    font-size: 0.9em;
  }
}

table th {
  background-color: #4A148C;
  color: #f5f3f0;
  padding: 0.4rem;
  text-align: left;
  font-weight: 600;
}

@media (min-width: 768px) {
  table th {
    padding: 0.6rem;
  }
}

table td {
  border-bottom: 1px solid #e0d9d0;
  padding: 0.4rem;
}

@media (min-width: 768px) {
  table td {
    padding: 0.6rem;
  }
}

.destaque {
  background-color: #faf8f5;
  border-left: 3px solid #C71585;
  padding: 0.6rem;
  margin: 0.6rem 0;
  font-style: italic;
  font-size: 0.88em;
  page-break-inside: avoid;
}

@media (min-width: 768px) {
  .destaque {
    border-left: 4px solid #C71585;
    padding: 0.8rem;
    margin: 0.8rem 0;
    font-size: 0.93em;
  }
}

.assinatura {
  text-align: center;
  margin-top: 0.8rem;
  padding-top: 0.6rem;
  border-top: 2px solid #D4AF37;
  font-style: italic;
  color: #666;
  font-size: 0.85em;
  page-break-inside: avoid;
}

@media (min-width: 768px) {
  .assinatura {
    margin-top: 1rem;
    padding-top: 0.8rem;
    font-size: 0.9em;
  }
}

strong {
  color: #4A148C;
  font-weight: 600;
}

em {
  font-style: italic;
  color: #666;
}

.numero-destaque {
  color: #C71585;
  font-weight: 600;
}

.rodape {
  text-align: center;
  margin-top: 0.6rem;
  padding-top: 0.4rem;
  border-top: 1px solid #D4AF37;
  font-size: 0.75em;
  color: #999;
}

@media (min-width: 768px) {
  .rodape {
    font-size: 0.8em;
  }
}

.bloco-capitulo {
  margin-bottom: 0.8rem;
  page-break-inside: avoid;
}

@media (min-width: 768px) {
  .bloco-capitulo {
    margin-bottom: 1rem;
  }
}

.sabedoria {
  font-style: italic;
  color: #C71585;
  margin: 0.3rem 0;
  font-size: 0.9em;
  page-break-after: avoid;
}

@media (min-width: 768px) {
  .sabedoria {
    font-size: 0.95em;
    margin: 0.4rem 0;
  }
}

.no-break {
  page-break-inside: avoid;
}
</style>
</head>
<body>
${content}
</body>
</html>`;
};

/**
 * Gera conteúdo de interpretação para uma posição numerológica
 */
export const gerarInterpretacao = (posicao: string, numero: number, chart: NumerologyChart): string => {
  const nome = getPosicaoNome(posicao);
  const interpretacao = getInterpretacao(numero, 'base');
  
  let conteudo = `<h3>${nome}</h3>\n`;
  conteudo += `<p><strong>Seu número: <span class="numero-destaque">${numero}</span></strong></p>\n`;
  conteudo += `<p>${interpretacao}</p>\n`;
  
  // Adicionar interpretações específicas baseadas na posição
  if (posicao === 'MO') {
    const mo = getInterpretacao(numero, 'mo');
    conteudo += `<h4>O Seu Desejo Profundo</h4>\n<p>${mo}</p>\n`;
  }
  
  if (posicao === 'DM') {
    const dm = getInterpretacao(numero, 'dm');
    conteudo += `<h4>O Seu Aprendizado Obrigatório</h4>\n<p>${dm}</p>\n`;
  }
  
  return conteudo;
};

/**
 * Gera estrutura completa do e-book em HTML premium
 */
export const gerarEbook = (chart: NumerologyChart): string => {
  let content = '';
  
  // CAPA
  content += `<div class="capa no-break">
<h1>BÚSSOLA NUMEROLÓGICA 2026</h1>
<h2>A Digital da Sua Alma Decodificada</h2>
</div>

<div class="capa no-break">
<h2>${chart.fullName.toUpperCase()}</h2>
<p class="sabedoria">Guia de Autoconhecimento e Planejamento</p>
<p><em>Lili Numerologia | Ouro & Alma</em></p>
</div>

<div class="divider">✦ ✦ ✦</div>

<h2>ÍNDICE</h2>

<div class="indice no-break">
<div style="margin: 0.3rem 0; padding-left: 0.6rem; line-height: 1.4; font-size: 0.88em;"><strong>I. O Quaternário Sagrado</strong> — Essência</div>
<div style="margin: 0.3rem 0; padding-left: 0.6rem; line-height: 1.4; font-size: 0.88em;"><strong>II. O Altar do Mérito</strong> — Força de Brilho</div>
<div style="margin: 0.3rem 0; padding-left: 0.6rem; line-height: 1.4; font-size: 0.88em;"><strong>III. O Pedágio da Alma</strong> — Desafios</div>
<div style="margin: 0.3rem 0; padding-left: 0.6rem; line-height: 1.4; font-size: 0.88em;"><strong>IV. As Estações da Vida</strong> — Ciclos</div>
<div style="margin: 0.3rem 0; padding-left: 0.6rem; line-height: 1.4; font-size: 0.88em;"><strong>V. Fragilidades Físicas</strong> — Bem-estar</div>
<div style="margin: 0.3rem 0; padding-left: 0.6rem; line-height: 1.4; font-size: 0.88em;"><strong>VI. Mensagem de Orientação</strong> — Encerramento</div>
</div>

<div class="divider">✦ ✦ ✦</div>

<h2>GRADE VIBRACIONAL</h2>
<p style="text-align: center; font-size: 0.85em; margin-bottom: 0.4rem;"><em>A Arquitetura da Sua Alma</em></p>

<div class="grade-vibracional no-break">
<table>
<tr>
<td><strong>Caminho de Destino</strong></td>
<td style="text-align: right;"><span class="numero-destaque">${chart.cd}</span></td>
</tr>
<tr>
<td colspan="2" style="font-size: 0.85em; padding: 0.2rem;">Estrutura, Construção, Comunicação</td>
</tr>
<tr>
<td colspan="2">&nbsp;</td>
</tr>
<tr>
<td><strong>Motivação</strong></td>
<td style="text-align: right;"><span class="numero-destaque">${chart.mo}</span></td>
</tr>
<tr>
<td colspan="2" style="font-size: 0.85em; padding: 0.2rem;">Criatividade, Alegria, Expressão</td>
</tr>
<tr>
<td colspan="2">&nbsp;</td>
</tr>
<tr>
<td><strong>Eu Íntimo</strong></td>
<td style="text-align: right;"><span class="numero-destaque">${chart.eu}</span></td>
</tr>
<tr>
<td colspan="2" style="font-size: 0.85em; padding: 0.2rem;">Amor, Harmonia, Responsabilidade</td>
</tr>
<tr>
<td colspan="2">&nbsp;</td>
</tr>
<tr>
<td><strong>Expressão</strong></td>
<td style="text-align: right;"><span class="numero-destaque">${chart.ex}</span></td>
</tr>
<tr>
<td colspan="2" style="font-size: 0.85em; padding: 0.2rem;">Sabedoria, Completude, Transcendência</td>
</tr>
<tr>
<td colspan="2">&nbsp;</td>
</tr>
<tr>
<td><strong>Mérito (Força de Brilho)</strong></td>
<td style="text-align: right;"><span class="numero-destaque">${chart.merito}</span></td>
</tr>
<tr>
<td colspan="2" style="font-size: 0.85em; padding: 0.2rem;">Análise, Espiritualidade, Autoridade</td>
</tr>
</table>
</div>

<div class="divider">✦ ✦ ✦</div>

<div class="bloco-capitulo">
<h1>I. O QUATERNÁRIO SAGRADO</h1>
<p class="sabedoria">"Nada em você é por acaso. Você é feita de forças que se complementam."</p>
${gerarInterpretacao('CD', chart.cd, chart)}
${gerarInterpretacao('MO', chart.mo, chart)}
${gerarInterpretacao('EU', chart.eu, chart)}
${gerarInterpretacao('EX', chart.ex, chart)}
</div>

<div class="divider">✦ ✦ ✦</div>

<div class="bloco-capitulo">
<h1>II. O ALTAR DO MÉRITO</h1>
<p class="sabedoria">"Seu Mérito é onde seu Destino encontra sua Alma."</p>
${gerarInterpretacao('ME', chart.merito, chart)}
</div>

<div class="divider">✦ ✦ ✦</div>

<div class="bloco-capitulo">
<h1>III. O PEDÁGIO DA ALMA</h1>
<p class="sabedoria">"Os desafios não são punições. São ajustes de rota necessários."</p>
${gerarInterpretacao('DM', chart.desafios.dm, chart)}
</div>

<div class="divider">✦ ✦ ✦</div>

<div class="bloco-capitulo">
<h1>IV. AS ESTAÇÕES DA VIDA</h1>
<p class="sabedoria">"Cada ciclo é uma estação de aprendizado e crescimento."</p>

<h3>Os Ciclos de Vida</h3>
<p><strong>1º CICLO: FORMATIVO (0 a 28 anos) — Número ${chart.ciclos.c1}</strong></p>
<p>${getInterpretacao(chart.ciclos.c1, 'ciclo_realizacao')}</p>

<p><strong>2º CICLO: PRODUTIVO (29 a 56 anos) — Número ${chart.ciclos.c2}</strong></p>
<p>${getInterpretacao(chart.ciclos.c2, 'ciclo_realizacao')}</p>

<p><strong>3º CICLO: COLHEITA (57+ anos) — Número ${chart.ciclos.c3}</strong></p>
<p>${getInterpretacao(chart.ciclos.c3, 'ciclo_realizacao')}</p>
</div>

<div class="divider">✦ ✦ ✦</div>

<div class="bloco-capitulo">
<h1>V. FRAGILIDADES FÍSICAS</h1>
<p class="sabedoria">"Conhecer suas fragilidades é o primeiro passo para a cura."</p>

<h3>Bem-Estar e Somatização</h3>
<p>Sua configuração numerológica aponta para uma grande atividade mental. Conhecer suas tendências é o primeiro passo para equilibrar corpo e mente.</p>

<p><strong>Recomendações de Bem-Estar:</strong></p>
<p>Pratique atividades que exijam foco e presença. Reserve tempo para silêncio e meditação. Caminhe descalça na terra. Respire ar fresco. Permita-se descansar sem culpa.</p>
</div>

<div class="divider">✦ ✦ ✦</div>

<div class="bloco-capitulo">
<h1>VI. MENSAGEM DE ORIENTAÇÃO</h1>
<p class="sabedoria">"Você é a arquiteta da sua própria liberdade."</p>

<h3>Encerramento Terapêutico</h3>
<p>${chart.fullName}, você é um ser em constante transformação. Nada em você é por acaso. Cada número é uma peça do quebra-cabeça. Cada desafio é uma oportunidade de crescimento.</p>

<p>Que cada número seja uma luz no seu caminho. Que cada ciclo seja uma oportunidade de aprendizado. Que você permita-se ser o arquiteto da sua própria liberdade.</p>
</div>

<div class="divider">✦ ✦ ✦</div>

<div class="assinatura no-break">
<p><strong>Beijo no seu coração; Eli.</strong></p>
<p><em>Lili Numerologia | Ouro & Alma</em></p>
</div>

<div class="rodape">
<p>Gerado com a Metodologia Abran | Lili Numerologia • Numeria Premium</p>
</div>`;

  return getEbookHTML(content);
};

/**
 * Exporta e-book como HTML para download
 */
export const exportarEbookHTML = (chart: NumerologyChart): string => {
  return gerarEbook(chart);
};
