import { Router, Request, Response } from 'express';
import { exportarEbookHTML } from '../lib/ebookGenerator';
import { NumerologyChart } from '@/types';
import { jsPDF } from 'jspdf';

const router = Router();

interface EbookRequest extends Request {
  body: {
    chart: NumerologyChart;
    userEmail: string;
  };
}

/**
 * Converte HTML para PDF usando jsPDF puro
 * Extrai texto do HTML e formata no PDF
 */
async function htmlToPdfSimple(htmlContent: string, fullName: string): Promise<Buffer> {
  try {
    console.log('[htmlToPdfSimple] Iniciando conversão HTML para PDF...');
    
    // Remover tags HTML e extrair texto
    const textContent = htmlContent
      .replace(/<style[^>]*>.*?<\/style>/g, '') // Remover estilos
      .replace(/<script[^>]*>.*?<\/script>/g, '') // Remover scripts
      .replace(/<[^>]*>/g, '') // Remover tags HTML
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .trim();
    
    // Criar PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const maxWidth = pageWidth - 2 * margin;
    
    // Adicionar título
    pdf.setFontSize(18);
    pdf.setFont('', 'bold');
    pdf.text('Guia de Numerologia', margin, margin);
    pdf.setFont('', 'normal');
    
    // Adicionar nome
    pdf.setFontSize(14);
    pdf.text(`${fullName}`, margin, margin + 10);
    
    // Adicionar conteúdo
    pdf.setFontSize(11);
    const lines = pdf.splitTextToSize(textContent, maxWidth);
    
    let yPosition = margin + 25;
    const lineHeight = 6;
    const pageHeightWithMargin = pageHeight - margin;
    
    lines.forEach((line: string, index: number) => {
      if (yPosition > pageHeightWithMargin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
    
    console.log('[htmlToPdfSimple] PDF gerado com sucesso');
    
    // Converter PDF para Buffer
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));
    console.log('[htmlToPdfSimple] Buffer criado, tamanho:', pdfBuffer.length);
    
    return pdfBuffer;
  } catch (error) {
    console.error('[htmlToPdfSimple] Erro ao converter HTML para PDF:', error);
    throw error;
  }
}

// Rota para gerar e-book premium
router.post('/generate', async (req: EbookRequest, res: Response) => {
  try {
    console.log('[ebook.ts] Requisição recebida');
    const { chart, userEmail } = req.body;
    
    console.log('[ebook.ts] Validando dados...');
    if (!chart) {
      return res.status(400).json({ error: 'Chart é obrigatório' });
    }
    
    if (!userEmail) {
      return res.status(400).json({ error: 'userEmail é obrigatório' });
    }
    
    if (!chart.fullName) {
      return res.status(400).json({ error: 'fullName é obrigatório' });
    }
    
    console.log('[ebook.ts] Chamando exportarEbookHTML...');
    // Gerar HTML premium com novo template
    const htmlContent = exportarEbookHTML(chart);
    console.log('[ebook.ts] HTML gerado, tamanho:', htmlContent.length);
    
    console.log('[ebook.ts] Convertendo HTML para PDF com jsPDF...');
    // Converter HTML para PDF usando jsPDF
    const pdfBuffer = await htmlToPdfSimple(htmlContent, chart.fullName);
    console.log('[ebook.ts] PDF gerado, tamanho:', pdfBuffer.length);
    
    if (!pdfBuffer || pdfBuffer.length === 0) {
      return res.status(500).json({ error: 'PDF gerado está vazio' });
    }
    
    const filename = `Guia_de_Numerologia_${chart.fullName.replace(/\s+/g, '_')}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('[ebook.ts] Erro ao gerar e-book:', error);
    if (error instanceof Error) {
      console.error('[ebook.ts] Stack trace:', error.stack);
    }
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ error: 'Erro ao gerar e-book', details: errorMessage });
  }
});

export default router;
