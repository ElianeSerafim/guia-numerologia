import { Router, Request, Response } from 'express';
import { exportarEbookHTML } from '@/lib/ebookGenerator';
import { NumerologyChart } from '@/types';
import puppeteer from 'puppeteer';

const router = Router();

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
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Definir tamanho de página A4
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const pdfData = await page.pdf({
      format: 'A4',
      margin: {
        top: '1.5cm',
        right: '1.5cm',
        bottom: '1.5cm',
        left: '1.5cm'
      },
      printBackground: true,
      displayHeaderFooter: true,
      footerTemplate: '<div style="font-size: 10px; color: #999; text-align: center; width: 100%;"><span class="pageNumber"></span></div>'
    });
    
    const pdfBuffer = Buffer.from(pdfData);
    
    await browser.close();
    return pdfBuffer as Buffer;
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

// Rota para gerar e-book premium
router.post('/generate', async (req: EbookRequest, res: Response) => {
  try {
    const { chart, userEmail } = req.body;
    
    if (!chart) {
      return res.status(400).json({ error: 'Chart é obrigatório' });
    }
    
    if (!userEmail) {
      return res.status(400).json({ error: 'userEmail é obrigatório' });
    }
    
    if (!chart.fullName || chart.cd === undefined || chart.personalYear2026 === undefined) {
      return res.status(400).json({ error: 'Dados incompletos no chart' });
    }
    
    // Gerar HTML premium com novo template
    const htmlContent = exportarEbookHTML(chart);
    
    // Converter HTML para PDF
    const pdfBuffer = await htmlToPdf(htmlContent);
    
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
