import { Router, Request, Response } from 'express';
import { PDFDocument, rgb } from 'pdf-lib';
import { NumerologyChart } from '@/types';

const router = Router();

// Cores do tema
const COLORS = {
  primary: { r: 138, g: 43, b: 226 }, // #8A2BE2
  secondary: { r: 212, g: 175, b: 55 }, // #D4AF37
  dark: { r: 25, g: 8, b: 37 }, // #190825
  light: { r: 184, g: 168, b: 216 }, // #B8A8D8
  white: { r: 255, g: 255, b: 255 },
  black: { r: 0, g: 0, b: 0 }
};

interface EbookRequest extends Request {
  body: {
    chart: NumerologyChart;
    userEmail: string;
  };
}

async function generateEbook(chart: NumerologyChart): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const helveticaBold = await pdfDoc.embedFont('Helvetica-Bold');
  const helvetica = await pdfDoc.embedFont('Helvetica');
  
  // Configurar página
  const pageWidth = 595; // A4 width in points
  const pageHeight = 842; // A4 height in points
  const margin = 40;
  const contentWidth = pageWidth - (margin * 2);
  
  // ========== PÁGINA 1: CAPA ==========
  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  
  // Fundo gradiente (simulado com retângulos)
  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: rgb(COLORS.dark.r / 255, COLORS.dark.g / 255, COLORS.dark.b / 255),
  });
  
  // Decoração superior
  page.drawRectangle({
    x: 0,
    y: pageHeight - 100,
    width: pageWidth,
    height: 100,
    color: rgb(COLORS.primary.r / 255, COLORS.primary.g / 255, COLORS.primary.b / 255),
    opacity: 0.1,
  });
  
  // Título principal
  page.drawText('GUIA COMPLETO DE NUMEROLOGIA', {
    x: margin,
    y: pageHeight - 200,
    size: 36,
    font: helveticaBold,
    color: rgb(COLORS.secondary.r / 255, COLORS.secondary.g / 255, COLORS.secondary.b / 255),
    maxWidth: contentWidth,
  });
  
  // Subtítulo
  page.drawText('Pitagórica', {
    x: margin,
    y: pageHeight - 250,
    size: 36,
    font: helveticaBold,
    color: rgb(COLORS.primary.r / 255, COLORS.primary.g / 255, COLORS.primary.b / 255),
  });
  
  // Descrição
  page.drawText('Seu Mapa Numerológico 2026', {
    x: margin,
    y: pageHeight - 320,
    size: 18,
    font: helvetica,
    color: rgb(COLORS.light.r / 255, COLORS.light.g / 255, COLORS.light.b / 255),
  });
  
  // Linha decorativa
  page.drawLine({
    start: { x: margin, y: pageHeight - 350 },
    end: { x: pageWidth - margin, y: pageHeight - 350 },
    thickness: 2,
    color: rgb(COLORS.secondary.r / 255, COLORS.secondary.g / 255, COLORS.secondary.b / 255),
  });
  
  // Informações do cliente
  page.drawText(`Nome: ${chart.fullName}`, {
    x: margin,
    y: pageHeight - 420,
    size: 14,
    font: helvetica,
    color: rgb(COLORS.white.r / 255, COLORS.white.g / 255, COLORS.white.b / 255),
  });
  
  page.drawText(`Data de Nascimento: ${new Date(chart.birthDate).toLocaleDateString('pt-BR')}`, {
    x: margin,
    y: pageHeight - 450,
    size: 14,
    font: helvetica,
    color: rgb(COLORS.white.r / 255, COLORS.white.g / 255, COLORS.white.b / 255),
  });
  
  page.drawText(`Idade: ${chart.age} anos`, {
    x: margin,
    y: pageHeight - 480,
    size: 14,
    font: helvetica,
    color: rgb(COLORS.white.r / 255, COLORS.white.g / 255, COLORS.white.b / 255),
  });
  
  // Números principais na capa
  page.drawText('SEUS NÚMEROS PRINCIPAIS', {
    x: margin,
    y: pageHeight - 560,
    size: 12,
    font: helveticaBold,
    color: rgb(COLORS.secondary.r / 255, COLORS.secondary.g / 255, COLORS.secondary.b / 255),
  });
  
  const numberBoxWidth = (contentWidth - 30) / 4;
  const numberBoxHeight = 80;
  const numberBoxY = pageHeight - 680;
  
  const numbers = [
    { label: 'CD', value: chart.cd },
    { label: 'MO', value: chart.mo },
    { label: 'EX', value: chart.ex },
    { label: 'ME', value: chart.merito }
  ];
  
  numbers.forEach((num, index) => {
    const boxX = margin + (index * (numberBoxWidth + 10));
    
    // Caixa
    page.drawRectangle({
      x: boxX,
      y: numberBoxY,
      width: numberBoxWidth,
      height: numberBoxHeight,
      borderColor: rgb(COLORS.secondary.r / 255, COLORS.secondary.g / 255, COLORS.secondary.b / 255),
      borderWidth: 2,
    });
    
    // Rótulo
    page.drawText(num.label, {
      x: boxX + (numberBoxWidth / 2) - 5,
      y: numberBoxY + 60,
      size: 10,
      font: helveticaBold,
      color: rgb(COLORS.secondary.r / 255, COLORS.secondary.g / 255, COLORS.secondary.b / 255),
      maxWidth: numberBoxWidth,
    });
    
    // Número
    page.drawText(String(num.value), {
      x: boxX + (numberBoxWidth / 2) - 16,
      y: numberBoxY + 25,
      size: 32,
      font: helveticaBold,
      color: rgb(COLORS.secondary.r / 255, COLORS.secondary.g / 255, COLORS.secondary.b / 255),
      maxWidth: numberBoxWidth,
    });
  });
  
  // Rodapé
  page.drawText('Gerado em ' + new Date().toLocaleDateString('pt-BR'), {
    x: margin,
    y: 30,
    size: 10,
    font: helvetica,
    color: rgb(COLORS.light.r / 255, COLORS.light.g / 255, COLORS.light.b / 255),
  });
  
  // ========== PÁGINA 2: ÍNDICE ==========
  page = pdfDoc.addPage([pageWidth, pageHeight]);
  
  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: rgb(COLORS.dark.r / 255, COLORS.dark.g / 255, COLORS.dark.b / 255),
  });
  
  page.drawText('ÍNDICE', {
    x: margin,
    y: pageHeight - 80,
    size: 28,
    font: helveticaBold,
    color: rgb(COLORS.secondary.r / 255, COLORS.secondary.g / 255, COLORS.secondary.b / 255),
  });
  
  const tableOfContents = [
    '1. Introdução à Numerologia Pitagórica',
    '2. Como Funciona o Cálculo',
    '3. Seu Mapa Numerológico',
    '4. Interpretação dos Números Principais',
    '5. Previsões para 2026',
    '6. Dicas para Aplicar a Numerologia',
    '7. Glossário de Termos'
  ];
  
  let yPosition = pageHeight - 150;
  tableOfContents.forEach((item) => {
    page.drawText(item, {
      x: margin + 20,
      y: yPosition,
      size: 12,
      font: helvetica,
      color: rgb(COLORS.white.r / 255, COLORS.white.g / 255, COLORS.white.b / 255),
    });
    yPosition -= 40;
  });
  
  // ========== PÁGINA 3: SEUS NÚMEROS ==========
  page = pdfDoc.addPage([pageWidth, pageHeight]);
  
  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: rgb(COLORS.dark.r / 255, COLORS.dark.g / 255, COLORS.dark.b / 255),
  });
  
  // Cabeçalho
  page.drawRectangle({
    x: 0,
    y: pageHeight - 60,
    width: pageWidth,
    height: 60,
    color: rgb(COLORS.primary.r / 255, COLORS.primary.g / 255, COLORS.primary.b / 255),
    opacity: 0.2,
  });
  
  page.drawText('SEU MAPA NUMEROLÓGICO', {
    x: margin,
    y: pageHeight - 40,
    size: 24,
    font: helveticaBold,
    color: rgb(COLORS.secondary.r / 255, COLORS.secondary.g / 255, COLORS.secondary.b / 255),
  });
  
  // Números em grid
  yPosition = pageHeight - 150;
  const numberDescriptions = [
    { title: 'CAMINHO DE DESTINO', value: chart.cd, description: 'Sua missão de vida' },
    { title: 'MOTIVAÇÃO', value: chart.mo, description: 'O que te impulsiona' },
    { title: 'EXPRESSÃO', value: chart.ex, description: 'Como você se expressa' },
    { title: 'MÉRITO (FORÇA)', value: chart.merito, description: 'Suas forças principais' }
  ];
  
  numberDescriptions.forEach((num) => {
    // Caixa com número
    page.drawRectangle({
      x: margin,
      y: yPosition - 80,
      width: 100,
      height: 100,
      borderColor: rgb(COLORS.secondary.r / 255, COLORS.secondary.g / 255, COLORS.secondary.b / 255),
      borderWidth: 2,
    });
    
    page.drawText(String(num.value), {
      x: margin + 25,
      y: yPosition - 30,
      size: 48,
      font: helveticaBold,
      color: rgb(COLORS.secondary.r / 255, COLORS.secondary.g / 255, COLORS.secondary.b / 255),
      maxWidth: 100,
    });
    
    // Texto
    page.drawText(num.title, {
      x: margin + 120,
      y: yPosition - 20,
      size: 12,
      font: helveticaBold,
      color: rgb(COLORS.secondary.r / 255, COLORS.secondary.g / 255, COLORS.secondary.b / 255),
    });
    
    page.drawText(num.description, {
      x: margin + 120,
      y: yPosition - 45,
      size: 10,
      font: helvetica,
      color: rgb(COLORS.light.r / 255, COLORS.light.g / 255, COLORS.light.b / 255),
    });
    
    yPosition -= 130;
  });
  
  // ========== PÁGINA 4: PREVISÕES 2026 ==========
  page = pdfDoc.addPage([pageWidth, pageHeight]);
  
  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: rgb(COLORS.dark.r / 255, COLORS.dark.g / 255, COLORS.dark.b / 255),
  });
  
  // Cabeçalho
  page.drawRectangle({
    x: 0,
    y: pageHeight - 60,
    width: pageWidth,
    height: 60,
    color: rgb(COLORS.primary.r / 255, COLORS.primary.g / 255, COLORS.primary.b / 255),
    opacity: 0.2,
  });
  
  page.drawText('PREVISÕES PARA 2026', {
    x: margin,
    y: pageHeight - 40,
    size: 24,
    font: helveticaBold,
    color: rgb(COLORS.secondary.r / 255, COLORS.secondary.g / 255, COLORS.secondary.b / 255),
  });
  
  // Ano pessoal
  page.drawText('SEU ANO PESSOAL EM 2026', {
    x: margin,
    y: pageHeight - 130,
    size: 14,
    font: helveticaBold,
    color: rgb(COLORS.white.r / 255, COLORS.white.g / 255, COLORS.white.b / 255),
  });
  
  // Caixa grande com número
  page.drawRectangle({
    x: margin,
    y: pageHeight - 280,
    width: 150,
    height: 120,
    borderColor: rgb(COLORS.secondary.r / 255, COLORS.secondary.g / 255, COLORS.secondary.b / 255),
    borderWidth: 3,
  });
  
  page.drawText(String(chart.personalYear2026), {
    x: margin + 50,
    y: pageHeight - 200,
    size: 72,
    font: helveticaBold,
    color: rgb(COLORS.secondary.r / 255, COLORS.secondary.g / 255, COLORS.secondary.b / 255),
    maxWidth: 150,
  });
  
  // Descrição do ano
  page.drawText('Este é um ano de transformação e oportunidades. Foque em seus objetivos principais e mantenha-se aberto a novas possibilidades.', {
    x: margin + 170,
    y: pageHeight - 200,
    size: 11,
    font: helvetica,
    color: rgb(COLORS.light.r / 255, COLORS.light.g / 255, COLORS.light.b / 255),
    maxWidth: contentWidth - 170,
  });
  
  // Rodapé com marca d'água
  page.drawText('Guia Completo de Numerologia Pitagórica - 2026', {
    x: margin,
    y: 30,
    size: 10,
    font: helvetica,
    color: rgb(COLORS.light.r / 255, COLORS.light.g / 255, COLORS.light.b / 255),
  });
  
  page.drawText('Gerado em ' + new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR'), {
    x: pageWidth - margin - 200,
    y: 30,
    size: 10,
    font: helvetica,
    color: rgb(COLORS.light.r / 255, COLORS.light.g / 255, COLORS.light.b / 255),
  });
  
  return Buffer.from(await pdfDoc.save());
}

// Rota para gerar e-book
router.post('/generate', async (req: EbookRequest, res: Response) => {
  try {
    const { chart, userEmail } = req.body;
    
    if (!chart) {
      return res.status(400).json({ error: 'Chart é obrigatório' });
    }
    
    if (!userEmail) {
      return res.status(400).json({ error: 'userEmail é obrigatório' });
    }
    
    if (!chart.fullName || !chart.cd || chart.personalYear2026 === undefined) {
      return res.status(400).json({ error: 'Dados incompletos no chart' });
    }
    
    const pdfBuffer = await generateEbook(chart);
    
    if (!pdfBuffer || pdfBuffer.length === 0) {
      return res.status(500).json({ error: 'PDF gerado está vazio' });
    }
    
    const filename = `Guia_Numerologia_${chart.fullName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Erro ao gerar e-book:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ error: 'Erro ao gerar e-book', details: errorMessage });
  }
});

export default router;
