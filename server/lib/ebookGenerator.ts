import { NumerologyChart } from '@/types';
import { getNumberInterpretation, getChallengeInterpretation, getRealizationInterpretation, getQuarterlyInterpretation, getRenascimentoInterpretation, getLegacyInterpretation, getGrandeLoveInterpretation, getElementInterpretation } from './knowledgeBase';

function generateNumberInterpretationHTML(number: number, label: string): string {
  const interp = getNumberInterpretation(number);
  if (!interp) return '';
  
  return `
    <div class="card card-roxo" style="margin-bottom: 1rem;">
      <p><strong>${label} (${number})</strong></p>
      <p><strong>Essência:</strong> ${interp.essencia}</p>
      <p><strong>Luz:</strong> ${interp.luz}</p>
      <p><strong>Sombra:</strong> ${interp.sombra}</p>
      <p><strong>Aspecto Físico:</strong> ${interp.fisico}</p>
      <p><strong>Prática Afetiva:</strong> ${interp.pratica_afetiva}</p>
      <p><strong>Válvula de Escape:</strong> ${interp.valvula_escape}</p>
    </div>
  `;
}

function generateElementInterpretationHTML(element: string): string {
  const interp = getElementInterpretation(element);
  if (!interp) return '';
  
  return `
    <div class="card card-rosa" style="margin-bottom: 1rem; border-left: 4px solid #C71585;">
      <p><strong>${interp.nome}</strong></p>
      <p style="line-height: 1.6; color: #333;">${interp.significado}</p>
    </div>
  `;
}

/**
 * Gera HTML premium de e-book numerológico
 * Baseado no modelo profissional de Eliane Serafim
 * Paleta: Roxo #4A148C, Rosa #C71585, Dourado #D4AF37
 */
export function exportarEbookHTML(chart: NumerologyChart): string {
  try {
    console.log('[ebookGenerator] Iniciando geração de e-book para:', chart.fullName);
    
    // Extrair dados com valores padrão seguros
    const fullName = String(chart.fullName || 'Cliente').trim();
    const cd = Number(chart.cd) || 0;
    const mo = Number(chart.mo) || 0;
    const eu = Number(chart.eu) || 0;
    const ex = Number(chart.ex) || 0;
    const me = Number(chart.merito) || 0;
    const personalYear2026 = Number(chart.personalYear2026) || 0;
    const r2 = Number(chart.realizacoes?.r2) || 0;
    const r3 = Number(chart.realizacoes?.r3) || 0;
    const r4 = Number(chart.realizacoes?.r4) || 0;
    const ctAtual = Number(chart.ciclosTrimestrais?.atual?.ct1) || 0;
    
    // Formatar data com segurança
    let dataNascimento = 'Data não disponível';
    if (chart.birthDate) {
      try {
        const dateStr = String(chart.birthDate);
        if (dateStr.includes('-')) {
          const [ano, mes, dia] = dateStr.split('-');
          dataNascimento = `${dia}/${mes}/${ano}`;
        } else if (dateStr.includes('/')) {
          dataNascimento = dateStr;
        }
      } catch (e) {
        console.error('[ebookGenerator] Erro ao formatar data:', e);
      }
    }

    console.log('[ebookGenerator] Dados extraídos:', { fullName, cd, mo, eu, ex, me, personalYear2026, dataNascimento });

    // ========================================
    // DETECTAR INTERPRETAÇÕES AVANÇADAS
    // ========================================
    
    // Importar funções de detecção (assumindo que estão disponíveis)
    // Para agora, vamos usar lógica inline para não quebrar o build
    
    // Detectar Renascimento (R2, R3, R4 com Fato Grave)
    // Nota: Fato Grave é armazenado no banco de dados
    // Para agora, vamos usar false como padrão (será preenchido pelo cliente)
    const hasRenascimento = false; // Será preenchido do banco de dados
    const renascimentoNumber = (r2 || r3 || r4);
    
    // Detectar Realização de Legado (Rn = MO, CD ou ME)
    const hasLegacy = (r2 === mo || r2 === cd || r2 === me) ||
                      (r3 === mo || r3 === cd || r3 === me) ||
                      (r4 === mo || r4 === cd || r4 === me);
    const legacyNumber = hasLegacy ? (r2 === mo || r2 === cd || r2 === me ? r2 : (r3 === mo || r3 === cd || r3 === me ? r3 : r4)) : 0;
    
    // Detectar Grande Amor (harmonia afetiva)
    const moPositiva = mo !== 4 && mo !== 8;
    const harmonia = Math.abs(eu - mo) <= 2;
    const semBloqueio = cd !== 4 && cd !== 8;
    const momentoFavoravel = ctAtual !== 4 && ctAtual !== 8;
    const hasGrandeLove = moPositiva && harmonia && semBloqueio && momentoFavoravel;

    // HTML do e-book com template profissional de Eliane
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Guia de Numerologia - ${fullName}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      font-family: 'Georgia', 'Garamond', serif;
      background: #FFFEF9;
      color: #333;
      line-height: 1.6;
    }

    @page {
      size: A4;
      margin: 1.5cm;
    }

    .page {
      page-break-after: always;
      width: 100%;
      min-height: 297mm;
      padding: 2rem;
      background: #FFFEF9;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    /* Capa */
    .capa {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 297mm;
      background: linear-gradient(135deg, #4A148C 0%, #2A0845 100%);
      color: #FFFEF9;
      padding: 3rem 2rem;
    }

    .capa h1 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      color: #D4AF37;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .capa .subtitulo {
      font-size: 1.5rem;
      color: #C71585;
      margin-bottom: 2rem;
      font-style: italic;
    }

    .capa .nome {
      font-size: 2rem;
      color: #FFFEF9;
      margin-top: 3rem;
      border-top: 2px solid #D4AF37;
      border-bottom: 2px solid #D4AF37;
      padding: 1rem 0;
    }

    .capa .assinatura {
      font-size: 1.2rem;
      margin-top: 3rem;
      color: #D4AF37;
      font-style: italic;
    }

    /* Seções */
    h2 {
      font-size: 2rem;
      color: #4A148C;
      margin-bottom: 1.5rem;
      border-bottom: 3px solid #D4AF37;
      padding-bottom: 0.5rem;
    }

    h3 {
      font-size: 1.3rem;
      color: #C71585;
      margin-top: 1.5rem;
      margin-bottom: 0.8rem;
    }

    .divisor {
      text-align: center;
      color: #D4AF37;
      font-size: 1.5rem;
      margin: 1.5rem 0;
    }

    .numero-grande {
      display: inline-block;
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #8A2BE2 0%, #D4AF37 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: bold;
      margin: 1rem 0;
      box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
    }

    .card {
      background: #F5F1E8;
      border-left: 5px solid #D4AF37;
      padding: 1.2rem;
      margin: 1rem 0;
      border-radius: 4px;
    }

    .card-roxo {
      background: #F3E5F5;
      border-left: 5px solid #4A148C;
    }

    .card-rosa {
      background: #FCE4EC;
      border-left: 5px solid #C71585;
    }

    p {
      margin-bottom: 0.8rem;
      text-align: justify;
      font-size: 0.95rem;
      line-height: 1.7;
    }

    .grade-vibracional {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin: 1.5rem 0;
    }

    .item-grade {
      background: #F5F1E8;
      padding: 0.8rem;
      border-radius: 4px;
      border: 1px solid #D4AF37;
    }

    .item-grade strong {
      color: #4A148C;
    }

    .item-grade .valor {
      color: #C71585;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .rodape {
      text-align: center;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #D4AF37;
      color: #999;
      font-size: 0.85rem;
    }

    /* Estilos para Interpretações Avançadas */
    .card-renascimento {
      background: linear-gradient(135deg, #F3E5F5 0%, #E8D5F2 100%);
      border-left: 5px solid #8A2BE2;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(138, 43, 226, 0.15);
    }

    .card-legado {
      background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);
      border-left: 5px solid #D4AF37;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(212, 175, 55, 0.15);
    }

    .card-amor {
      background: linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%);
      border-left: 5px solid #C71585;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(199, 21, 133, 0.15);
    }

    .interpretacao-avancada {
      padding: 1.5rem;
      margin: 1.5rem 0;
      border-radius: 8px;
      background: #FFFEF9;
    }

    .interpretacao-avancada h3 {
      color: #4A148C;
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    .interpretacao-avancada p {
      color: #555;
      line-height: 1.8;
    }

    @media (max-width: 768px) {
      .page {
        padding: 1.5rem;
      }

      .capa h1 {
        font-size: 2.5rem;
      }

      h2 {
        font-size: 1.5rem;
      }

      .grade-vibracional {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <!-- CAPA -->
  <div class="page capa">
    <h1>Portal Numerologia</h1>
    <div class="subtitulo">Seu Guia Pessoal de Numerologia Pitagórica</div>
    <div class="nome">${fullName}</div>
    <div class="assinatura">Beijo no seu coração; Eli.<br/>Lili Numerologia</div>
  </div>

  <!-- ÍNDICE -->
  <div class="page">
    <h2>Índice Ceremonioso</h2>
    <div class="divisor">✦ ✦ ✦</div>
    <p style="margin-left: 1rem;">
      I. Grade Vibracional<br/>
      II. Números Essenciais<br/>
      III. Ciclos de Vida<br/>
      IV. Realizações (Pínaculos)<br/>
      V. Desafios<br/>
      VI. Ciclos Trimestrais 2026<br/>
      VII. Previsões para 2026
    </p>
    <div class="divisor">✦ ✦ ✦</div>
    <p style="margin-top: 2rem; text-align: center; color: #999;">
      Data de Nascimento: ${dataNascimento}
    </p>
  </div>

  <!-- VISÃO GERAL -->
  <div class="page">
    <h2>I. Visão Geral - Sua Jornada Numerológica</h2>
    <div class="divisor">✦ ✦ ✦</div>
    
    <p style="font-size: 1.1rem; line-height: 1.8; color: #333; margin-bottom: 1.5rem;">
      Bem-vindo(a) a esta jornada de autoconhecimento. Seu mapa numerológico é um reflexo da sua alma nesta encarnação. 
      Cada número representa um aspecto diferente da sua essência, uma faceta da sua jornada. Juntos, eles contam a história 
      única e sagrada da sua vida.
    </p>
    
    <div style="background: linear-gradient(135deg, #f5e6f0 0%, #f0e6f5 100%); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <h3 style="color: #4A148C; margin-top: 0;">Os Pilares da Sua Vida</h3>
      ${generateElementInterpretationHTML('CD')}
      ${generateElementInterpretationHTML('MO')}
      ${generateElementInterpretationHTML('EU')}
      ${generateElementInterpretationHTML('DM')}
      ${generateElementInterpretationHTML('ME')}
    </div>
  </div>

  <!-- GRADE VIBRACIONAL -->
  <div class="page">
    <h2>II. Grade Vibracional</h2>
    <div class="divisor">✦ ✦ ✦</div>
    
    <div class="grade-vibracional">
      <div class="item-grade">
        <strong>Caminho de Destino (CD)</strong><br/>
        <span class="valor">${cd}</span>
      </div>
      <div class="item-grade">
        <strong>Motivação (MO)</strong><br/>
        <span class="valor">${mo}</span>
      </div>
      <div class="item-grade">
        <strong>Eu Íntimo (EU)</strong><br/>
        <span class="valor">${eu}</span>
      </div>
      <div class="item-grade">
        <strong>Expressão (EX)</strong><br/>
        <span class="valor">${ex}</span>
      </div>
      <div class="item-grade">
        <strong>Mérito (ME)</strong><br/>
        <span class="valor">${me}</span>
      </div>
      <div class="item-grade">
        <strong>Ano Pessoal 2026</strong><br/>
        <span class="valor">${personalYear2026}</span>
      </div>
    </div>

    <div class="divisor">✦ ✦ ✦</div>
    <p style="text-align: center; color: #999; font-size: 0.9rem; margin-top: 1.5rem;">
      Estes números formam a base da sua carta numerológica pessoal
    </p>
  </div>

  <!-- NÚMEROS ESSENCIAIS -->
  <div class="page">
    <h2>III. Números Essenciais</h2>
    <div class="divisor">✦ ✦ ✦</div>

    <h3>Caminho de Destino (CD): ${cd}</h3>
    <div class="numero-grande">${cd}</div>
    ${generateNumberInterpretationHTML(cd, 'Caminho de Destino')}

    <h3>Motivação (MO): ${mo}</h3>
    <div class="numero-grande">${mo}</div>
    ${generateNumberInterpretationHTML(mo, 'Motivação')}

    <h3>Eu Íntimo (EU): ${eu}</h3>
    <div class="numero-grande">${eu}</div>
    ${generateNumberInterpretationHTML(eu, 'Eu Íntimo')}

    <h3>Expressão (EX): ${ex}</h3>
    <div class="numero-grande">${ex}</div>
    ${generateNumberInterpretationHTML(ex, 'Expressão')}

    <h3>Mérito (ME): ${me}</h3>
    <div class="numero-grande">${me}</div>
    ${generateNumberInterpretationHTML(me, 'Mérito')}
  </div>

  <!-- CICLOS DE VIDA -->
  <div class="page">
    <h2>IV. Ciclos de Vida</h2>
    <div class="divisor">✦ ✦ ✦</div>

    <h3>1º Ciclo Formativo: ${cd}</h3>
    <p>Período: 0 aos ${36 - cd} anos</p>
    <div class="card">
      <p>Fase de formação, aprendizado e desenvolvimento pessoal.</p>
    </div>

    <h3>2º Ciclo Produtivo: ${mo}</h3>
    <p>Período: ${36 - cd + 1} aos ${36 - cd + 27} anos</p>
    <div class="card">
      <p>Fase de produção, realização e contribuição ao mundo.</p>
    </div>

    <h3>3º Ciclo de Colheita: ${eu}</h3>
    <p>Período: ${36 - cd + 28}+ anos</p>
    <div class="card">
      <p>Fase de colheita, sabedoria e legado pessoal.</p>
    </div>
  </div>

  <!-- REALIZAÇÕES -->
  <div class="page">
    <h2>V. Realizações (Pínáculos)</h2>
    <div class="divisor">✦ ✦ ✦</div>

    <h3>1ª Realização: ${cd}</h3>
    <p>Período: 0 aos ${36 - cd} anos</p>
    <div class="card card-roxo">
      <p>${getRealizationInterpretation(cd) || 'Primeira fase de realização e desenvolvimento pessoal.'}</p>
    </div>

    <h3>2ª Realização: ${mo}</h3>
    <p>Período: ${36 - cd + 1} aos ${36 - cd + 10} anos</p>
    <div class="card card-rosa">
      <p>${getRealizationInterpretation(mo) || 'Segunda fase de realização e maturidade.'}</p>
    </div>

    <h3>3ª Realização: ${eu}</h3>
    <p>Período: ${36 - cd + 11} aos ${36 - cd + 20} anos</p>
    <div class="card">
      <p>${getRealizationInterpretation(eu) || 'Terceira fase de realização e plenitude.'}</p>
    </div>

    <h3>4ª Realização: ${ex}</h3>
    <p>Período: ${36 - cd + 21}+ anos</p>
    <div class="card card-roxo">
      <p>${getRealizationInterpretation(ex) || 'Quarta fase de realização e legado.'}</p>
    </div>
  </div>

  <!-- DESAFIOS -->
  <div class="page">
    <h2>VI. Desafios</h2>
    <div class="divisor">✦ ✦ ✦</div>

    <h3>1º Desafio</h3>
    <p>Período: 0 aos 29 anos</p>
    <div class="card card-rosa">
      <p>${getChallengeInterpretation(cd) || 'Seu primeiro grande desafio na jornada de vida.'}</p>
    </div>

    <h3>2º Desafio</h3>
    <p>Período: 29 aos 56 anos</p>
    <div class="card">
      <p>${getChallengeInterpretation(mo) || 'Seu segundo grande desafio e oportunidade de crescimento.'}</p>
    </div>

    <h3>O Seu Pedágio (Desafio Maior)</h3>
    <p>Período: Por toda a vida</p>
    <div class="card card-roxo">
      <p><strong>Este é o seu maior desafio pessoal:</strong> ${getChallengeInterpretation(eu) || 'A lição fundamental que você veio aprender nesta vida.'}</p>
    </div>
  </div>

  <!-- CICLOS TRIMESTRAIS -->
  <div class="page">
    <h2>VII. Ciclos Trimestrais 2026</h2>
    <div class="divisor">✦ ✦ ✦</div>
    <p style="margin-bottom: 1.5rem; font-style: italic; color: #666;">
      Os ciclos trimestrais detalham as vibrações específicas de cada trimestre do ano pessoal em 2026. Cada período traz uma energia única, oportunidades e desafios que o convidam a evoluir.
    </p>
    
    <div class="card card-rosa" style="margin-bottom: 1.5rem;">
      <p><strong>1º Trimestre (Junho a Agosto 2026) - Ciclo Trimestral 1</strong></p>
      <p style="line-height: 1.6; color: #333;">
        A energia do 1 marca o início de um novo ciclo trimestral. Este é um período de liderança e novos começos. 
        Você é convidado a tomar iniciativas, começar projetos que estavam em espera e estabelecer novas direções. 
        É tempo de coragem, inovação e ação decisiva. Confie em sua capacidade de liderar este período.
      </p>
    </div>
    
    <div class="card card-roxo" style="margin-bottom: 1.5rem;">
      <p><strong>2º Trimestre (Setembro a Novembro 2026) - Ciclo Trimestral 2</strong></p>
      <p style="line-height: 1.6; color: #333;">
        A energia do 2 traz colaboração e relacionamentos. Este é um período para aprofundar conexões, trabalhar em equipe 
        e criar harmonia ao seu redor. Sensibilidade, intuição e diplomacia são suas ferramentas. Permita-se ser receptivo 
        e vulnerável. As parcerias florescem neste tempo.
      </p>
    </div>
    
    <div class="card card-rosa" style="margin-bottom: 1.5rem;">
      <p><strong>3º Trimestre (Dezembro a Fevereiro 2027) - Ciclo Trimestral 3</strong></p>
      <p style="line-height: 1.6; color: #333;">
        A energia do 3 desperta criatividade e expressão. Este é um período para comunicar, criar e inspirar. 
        Sua voz importa. Compartilhe seus talentos, conecte-se com outras pessoas e celebre a vida. Criatividade, 
        alegria e networking marcam este trimestre. Expresse-se com autenticidade.
      </p>
    </div>
    
    <div class="card card-roxo" style="margin-bottom: 1.5rem;">
      <p><strong>4º Trimestre (Março a Maio 2027) - Ciclo Trimestral 4</strong></p>
      <p style="line-height: 1.6; color: #333;">
        A energia do 4 convida à estrutura e consolidação. Este é um período para organizar, trabalhar com disciplina 
        e estabelecer bases sólidas. Confiabilidade, estabilidade e produtividade são suas aliadas. Invista em fundações 
        que duram. Prepare-se para o próximo ciclo anual com segurança e solidez.
      </p>
    </div>
  </div>

  <!-- PREVISÕES 2026 -->
  <div class="page">
    <h2>VIII. Previsões para 2026</h2>
    <div class="divisor">✦ ✦ ✦</div>

    <h3>Seu Ano Pessoal: ${personalYear2026}</h3>
    <div class="numero-grande">${personalYear2026}</div>
    <div class="card card-roxo">
      <p><strong>Essência do Ano:</strong> Este é o significado vibracional do seu ano pessoal em 2026.</p>
      <p>Use este conhecimento para alinhar suas ações com a energia do universo.</p>
    </div>

    <div class="divisor">✦ ✦ ✦</div>
    <p style="text-align: center; margin-top: 2rem; font-style: italic; color: #666;">
      Este é seu guia pessoal de numerologia. Use-o como ferramenta de autoconhecimento e reflexão.
    </p>
  </div>

  <!-- INTERPRETAÇÕES AVANÇADAS -->
  <div class="page">
    <h2>VIII. Interpretações Avançadas</h2>
    <div class="divisor">✦ ✦ ✦</div>
    <p style="margin-bottom: 1.5rem; font-style: italic; color: #666;">
      Leituras profundas de Renascimento, Legado e Grande Amor
    </p>
  </div>

  <!-- RENASCIMENTO -->
  ${hasRenascimento ? `
  <div class="page">
    <h2>VIII.1 Renascimento</h2>
    <div class="divisor">✦ ✦ ✦</div>
    <p style="margin-bottom: 1.5rem; font-style: italic; color: #666;">
      Este período marca um Renascimento. A alma é chamada a reorganizar escolhas, valores e atitudes para retomar sua vibração original e evoluir com mais consciência.
    </p>
    <div class="card card-roxo">
      <p><strong>Renascimento (${renascimentoNumber})</strong></p>
      <p>Este é um chamado terapêutico para reorganização da alma. O Renascimento nunca é punição, mas uma oportunidade de evolução consciente.</p>
      <p style="margin-top: 1rem; font-style: italic;">Período de transformação profunda e reconstrução espiritual.</p>
    </div>
  </div>
  ` : ''}

  <!-- REALIZAÇÃO DE LEGADO -->
  ${hasLegacy ? `
  <div class="page">
    <h2>VIII.2 Realização de Legado</h2>
    <div class="divisor">✦ ✦ ✦</div>
    <p style="margin-bottom: 1.5rem; font-style: italic; color: #666;">
      Esta realização representa a construção de um legado. Suas escolhas reverberam além de você, deixando marcas conscientes na sua história e na vida de outras pessoas.
    </p>
    <div class="card card-roxo">
      <p><strong>Legado (${legacyNumber})</strong></p>
      <p>Neste período, você não vive apenas conquistas pessoais, mas deixa marcas, obras, ensinamentos ou exemplos que impactam outras pessoas.</p>
      <p style="margin-top: 1rem; font-style: italic;">Suas ações transcendem o pessoal e criam impacto duradouro.</p>
    </div>
  </div>
  ` : ''}

  <!-- GRANDE AMOR -->
  ${hasGrandeLove ? `
  <div class="page">
    <h2>VIII.3 Grande Amor</h2>
    <div class="divisor">✦ ✦ ✦</div>
    <p style="margin-bottom: 1.5rem; font-style: italic; color: #666;">
      Este período favorece a vivência de um amor significativo, consciente e transformador, que contribui para o crescimento emocional e espiritual.
    </p>
    <div class="card card-roxo">
      <p><strong>Grande Amor</strong></p>
      <p>O Grande Amor não é dependência, resgate ou carência. Ele surge quando você está alinhado consigo mesmo. Este é um período de harmonia afetiva profunda.</p>
      <p style="margin-top: 1rem; font-style: italic;">Oportunidade para vivenciar um amor consciente e transformador.</p>
    </div>
  </div>
  ` : ''}

  <!-- PÁGINA FINAL -->
  <div class="page">
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; text-align: center;">
      <div class="divisor">✦ ✦ ✦</div>
      <h2 style="border: none; margin: 2rem 0;">Obrigada por confiar em mim</h2>
      <p style="font-size: 1.1rem; margin: 1.5rem 0;">
        Que este guia ilumine seu caminho e revele os mistérios do seu destino.
      </p>
      <div style="margin-top: 3rem; font-size: 1.2rem; color: #D4AF37; font-style: italic;">
        Beijo no seu coração;<br/>
        <strong>Eli.</strong><br/>
        <em>Lili Numerologia</em>
      </div>
      <div class="divisor" style="margin-top: 3rem;">✦ ✦ ✦</div>
    </div>
  </div>
</body>
</html>`;

    console.log('[ebookGenerator] HTML gerado com sucesso, tamanho:', html.length, 'bytes');
    return html;
  } catch (error) {
    console.error('[ebookGenerator] Erro fatal:', error);
    throw error;
  }
}
