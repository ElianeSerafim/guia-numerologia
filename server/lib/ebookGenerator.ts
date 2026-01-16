import { NumerologyChart } from '@/types';

/**
 * Gera HTML premium de e-book numerológico
 * Paleta: Roxo #4A148C, Rosa #C71585, Dourado #D4AF37
 * Design: Mobile-first, A4, sem páginas em branco
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

    // HTML do e-book
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
    <h1>Bússola Numerológica</h1>
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

  <!-- GRADE VIBRACIONAL -->
  <div class="page">
    <h2>I. Grade Vibracional</h2>
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
    <h2>II. Números Essenciais</h2>
    <div class="divisor">✦ ✦ ✦</div>

    <h3>Caminho de Destino (CD): ${cd}</h3>
    <div class="numero-grande">${cd}</div>
    <div class="card card-roxo">
      <p><strong>Essência:</strong> Sua missão de vida e propósito maior no universo.</p>
    </div>

    <h3>Motivação (MO): ${mo}</h3>
    <div class="numero-grande">${mo}</div>
    <div class="card card-rosa">
      <p><strong>Essência:</strong> Sua motivação interior e desejos profundos.</p>
    </div>

    <h3>Eu Íntimo (EU): ${eu}</h3>
    <div class="numero-grande">${eu}</div>
    <div class="card">
      <p><strong>Essência:</strong> Seu eu verdadeiro e autêntico.</p>
    </div>

    <h3>Expressão (EX): ${ex}</h3>
    <div class="numero-grande">${ex}</div>
    <div class="card card-roxo">
      <p><strong>Essência:</strong> Como você se expressa no mundo.</p>
    </div>

    <h3>Mérito (ME): ${me}</h3>
    <div class="numero-grande">${me}</div>
    <div class="card card-rosa">
      <p><strong>Essência:</strong> Seu mérito pessoal e valor intrínseco.</p>
    </div>
  </div>

  <!-- CICLOS DE VIDA -->
  <div class="page">
    <h2>III. Ciclos de Vida</h2>
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
    <h2>IV. Realizações (Pínáculos)</h2>
    <div class="divisor">✦ ✦ ✦</div>

    <h3>1ª Realização: ${cd}</h3>
    <p>Período: 0 aos ${36 - cd} anos</p>
    <div class="card card-roxo">
      <p>Primeira fase de realização e desenvolvimento pessoal.</p>
    </div>

    <h3>2ª Realização: ${mo}</h3>
    <p>Período: ${36 - cd + 1} aos ${36 - cd + 10} anos</p>
    <div class="card card-rosa">
      <p>Segunda fase de realização e maturidade.</p>
    </div>

    <h3>3ª Realização: ${eu}</h3>
    <p>Período: ${36 - cd + 11} aos ${36 - cd + 20} anos</p>
    <div class="card">
      <p>Terceira fase de realização e plenitude.</p>
    </div>

    <h3>4ª Realização: ${ex}</h3>
    <p>Período: ${36 - cd + 21}+ anos</p>
    <div class="card card-roxo">
      <p>Quarta fase de realização e legado.</p>
    </div>
  </div>

  <!-- DESAFIOS -->
  <div class="page">
    <h2>V. Desafios</h2>
    <div class="divisor">✦ ✦ ✦</div>

    <h3>1º Desafio</h3>
    <p>Período: 0 aos 29 anos</p>
    <div class="card card-rosa">
      <p>Seu primeiro grande desafio na jornada de vida.</p>
    </div>

    <h3>2º Desafio</h3>
    <p>Período: 29 aos 56 anos</p>
    <div class="card">
      <p>Seu segundo grande desafio e oportunidade de crescimento.</p>
    </div>

    <h3>O Seu Pedágio (Desafio Maior)</h3>
    <p>Período: Por toda a vida</p>
    <div class="card card-roxo">
      <p><strong>Este é o seu maior desafio pessoal:</strong> A lição fundamental que você veio aprender nesta vida.</p>
    </div>
  </div>

  <!-- CICLOS TRIMESTRAIS -->
  <div class="page">
    <h2>VI. Ciclos Trimestrais 2026</h2>
    <div class="divisor">✦ ✦ ✦</div>
    <p style="margin-bottom: 1.5rem; font-style: italic; color: #666;">
      Os ciclos trimestrais detalham as vibrações específicas de cada trimestre do ano pessoal, indicando o "clima" e as oportunidades de cada período.
    </p>
    <div class="card card-rosa">
      <p><strong>1º Trimestre (Junho a Agosto)</strong></p>
      <p>Foco em planejamento e base emocional. Período de início e estabelecimento de direções.</p>
    </div>
    <div class="card card-roxo">
      <p><strong>2º Trimestre (Setembro a Novembro)</strong></p>
      <p>Foco em ação e expansão. Período para fazer acontecer no mundo prático.</p>
    </div>
    <div class="card card-rosa">
      <p><strong>3º Trimestre (Dezembro a Fevereiro)</strong></p>
      <p>Foco em colheita e análise. Período para avaliar resultados e fazer ajustes.</p>
    </div>
    <div class="card card-roxo">
      <p><strong>4º Trimestre (Março a Maio)</strong></p>
      <p>Foco em encerramento. Período de preparação para a nova jornada.</p>
    </div>
  </div>

  <!-- PREVISÕES 2026 -->
  <div class="page">
    <h2>VII. Previsões para 2026</h2>
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
