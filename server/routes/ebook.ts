import { Router, Request, Response } from 'express';
import { exportarEbookHTML } from '@/lib/ebookGenerator';
import { NumerologyChart } from '@/types';
let puppeteer: any;

const router = Router();

// Carregar Puppeteer dinamicamente
(async () => {
  try {
    puppeteer = await import('puppeteer');
    console.log('[ebook.ts] Puppeteer carregado com sucesso');
  } catch (error) {
    console.error('[ebook.ts] Erro ao carregar Puppeteer:', error);
  }
})();

interface EbookRequest extends Request {
  body: {
    chart: NumerologyChart;
    userEmail: string;
  };
}

/**
 * Converte HTML para PDF usando Puppeteer
 */
async function htmlToPdf(htmlContent: string): Promise<Buffer> {
  let browser;
  try {
    if (!puppeteer) {
      console.error('[htmlToPdf] Puppeteer não foi carregado');
      throw new Error('Puppeteer não disponível');
    }
    console.log('[htmlToPdf] Iniciando Puppeteer...');
    const puppeteerModule = puppeteer.default || puppeteer;
    browser = await puppeteerModule.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    console.log('[htmlToPdf] Browser iniciado');
    
    const page = await browser.newPage();
    console.log('[htmlToPdf] Página criada');
    
    // Definir tamanho de página A4
    console.log('[htmlToPdf] Definindo conteúdo HTML...');
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    console.log('[htmlToPdf] Conteúdo definido');
    
    console.log('[htmlToPdf] Gerando PDF...');
    const pdfData = await page.pdf({
      format: 'A4',
      margin: {
        top: '1.5cm',
        right: '1.5cm',
        bottom: '1.5cm',
        left: '1.5cm'
      },
      printBackground: true,
      displayHeaderFooter: false
    });
    console.log('[htmlToPdf] PDF gerado, tamanho:', pdfData.length);
    
    const pdfBuffer = Buffer.from(pdfData);
    console.log('[htmlToPdf] Buffer criado');
    
    await browser.close();
    console.log('[htmlToPdf] Browser fechado');
    return pdfBuffer as Buffer;
  } catch (error) {
    console.error('[htmlToPdf] Erro ao gerar PDF:', error);
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('[htmlToPdf] Erro ao fechar browser:', closeError);
      }
    }
    throw error;
  }
}

// Rota para gerar e-book premium
router.post('/generate', async (req: EbookRequest, res: Response) => {
  try {
    console.log('[ebook.ts] Requisição recebida:', { body: req.body });
    const { chart, userEmail } = req.body;
    
    console.log('[ebook.ts] Validando dados...');
    if (!chart) {
      return res.status(400).json({ error: 'Chart é obrigatório' });
    }
    
    if (!userEmail) {
      return res.status(400).json({ error: 'userEmail é obrigatório' });
    }
    
    if (!chart.fullName || chart.cd === undefined || chart.personalYear2026 === undefined) {
      return res.status(400).json({ error: 'Dados incompletos no chart' });
    }
    
    console.log('[ebook.ts] Chamando exportarEbookHTML...');
    // Gerar HTML premium com novo template
    const htmlContent = exportarEbookHTML(chart);
    console.log('[ebook.ts] HTML gerado, tamanho:', htmlContent.length);
    
    console.log('[ebook.ts] Convertendo HTML para PDF...');
    // Converter HTML para PDF
    const pdfBuffer = await htmlToPdf(htmlContent);
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
    console.error('Erro ao gerar e-book:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(500).json({ error: 'Erro ao gerar e-book', details: errorMessage });
  }
});

export default router;
