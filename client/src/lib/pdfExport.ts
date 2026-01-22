import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NumerologyChart } from '@/types';
import { getInterpretation } from './interpretations';

/**
 * PDF Export Service
 * 
 * Serviço para exportar mapas numerológicos em PDF de alta qualidade
 * com interpretações completas e design elegante
 */

interface PDFOptions {
  filename?: string;
  quality?: number;
}

export async function exportMapToPDF(
  chart: NumerologyChart,
  userEmail: string,
  options: PDFOptions = {}
) {
  const {
    filename = `Mapa-Numerologico-${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`,
    quality = 2,
  } = options;

  try {
    // Criar container temporário para renderizar o PDF
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '1200px';
    container.style.backgroundColor = 'white';
    container.style.padding = '40px';
    container.style.fontFamily = 'Inter, sans-serif';
    
    container.innerHTML = generatePDFContent(chart, userEmail);
    document.body.appendChild(container);

    // Converter para canvas
    const canvas = await html2canvas(container, {
      scale: quality,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Remover container temporário
    document.body.removeChild(container);

    // Criar PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let yPosition = 10;

    // Adicionar imagem ao PDF
    pdf.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);

    // Salvar PDF
    pdf.save(filename);

    return true;
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    throw error;
  }
}

function generatePDFContent(chart: NumerologyChart, userEmail: string): string {
  const today = new Date().toLocaleDateString('pt-BR');
  
  return `
    <div style="font-family: 'Playfair Display', serif; color: #1e293b; line-height: 1.6;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #4C1D95; padding-bottom: 20px;">
        <h1 style="font-size: 36px; margin: 0 0 10px 0; color: #4C1D95;">Mapa Numerológico</h1>
        <p style="font-size: 14px; color: #64748b; margin: 0;">Portal Numerologia 2026 - Método Pitagórico</p>
        <p style="font-size: 12px; color: #94a3b8; margin: 5px 0 0 0;">Gerado em ${today}</p>
      </div>

      <!-- User Info -->
      <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h3 style="margin: 0 0 15px 0; color: #4C1D95; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Informações Pessoais</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Nome Completo</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; font-weight: bold; color: #1e293b;">${chart.fullName}</p>
          </div>
          <div>
            <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Data de Nascimento</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; font-weight: bold; color: #1e293b;">${chart.birthDate}</p>
          </div>
          <div>
            <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">E-mail</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; font-weight: bold; color: #1e293b;">${userEmail}</p>
          </div>
          <div>
            <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Data do Relatório</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; font-weight: bold; color: #1e293b;">${today}</p>
          </div>
        </div>
      </div>

      <!-- Main Numbers -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; margin: 0 0 20px 0; color: #4C1D95; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Números Principais</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          ${generateNumberCard('Caminho de Destino', chart.cd)}
          ${generateNumberCard('Motivação', chart.mo)}
          ${generateNumberCard('Expressão', chart.ex)}
          ${generateNumberCard('Eu Íntimo', chart.eu)}
          ${generateNumberCard('Mérito', chart.merito)}
          ${generateNumberCard('Desafio Maior', chart.desafios.dm)}
        </div>
      </div>

      <!-- Cycle Numbers -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; margin: 0 0 20px 0; color: #4C1D95; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Ciclos de Vida</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
          ${generateNumberCard('Ciclo Formativo', chart.ciclos.c1)}
          ${generateNumberCard('Ciclo Produtivo', chart.ciclos.c2)}
          ${generateNumberCard('Ciclo de Colheita', chart.ciclos.c3)}
        </div>
      </div>

      <!-- 2026 Forecast -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; margin: 0 0 20px 0; color: #4C1D95; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Previsão para 2026</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          ${generateNumberCard('Ano Pessoal 2026', chart.personalYear2026)}
          ${generateNumberCard('Idade Numerológica', chart.age)}
        </div>
      </div>

      <!-- Interpretations -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 20px; margin: 0 0 20px 0; color: #4C1D95; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Interpretações Detalhadas</h2>
        
        ${generateInterpretationSection('Caminho de Destino', chart.cd)}
        ${generateInterpretationSection('Motivação (Desejo da Alma)', chart.mo)}
        ${generateInterpretationSection('Expressão', chart.ex)}
        ${generateInterpretationSection('Eu Íntimo', chart.eu)}
      </div>

      <!-- Footer -->
      <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
        <p style="margin: 0;">Portal Numerologia 2026 © ${new Date().getFullYear()} - Método Pitagórico</p>
        <p style="margin: 5px 0 0 0;">Este relatório é baseado nas técnicas avançadas de numerologia pitagórica.</p>
      </div>
    </div>
  `;
}

function generateNumberCard(label: string, number: number): string {
  const interpretation = getInterpretation(number);
  if (!interpretation) return '';
  
  return `
    <div style="background: linear-gradient(135deg, #4C1D95 0%, #6D28D9 100%); color: white; padding: 20px; border-radius: 8px; text-align: center;">
      <p style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">${label}</p>
      <p style="margin: 0; font-size: 48px; font-weight: bold; font-family: 'IBM Plex Mono', monospace;">${number}</p>
      <p style="margin: 10px 0 0 0; font-size: 13px; opacity: 0.95;">${interpretation.essence}</p>
    </div>
  `;
}

function generateInterpretationSection(title: string, number: number): string {
  const interpretation = getInterpretation(number);
  if (!interpretation) return '';
  
  return `
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
      <h3 style="font-size: 16px; margin: 0 0 15px 0; color: #4C1D95; display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 24px; font-weight: bold; color: #D4AF37;">${number}</span>
        ${title}
      </h3>
      
      <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #4C1D95; border-radius: 4px; margin-bottom: 15px;">
        <p style="margin: 0; font-size: 13px; color: #1e293b; line-height: 1.6;">${interpretation.regras}</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
        <div>
          <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; color: #059669; text-transform: uppercase; letter-spacing: 0.5px;">Aspectos Positivos</p>
          <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #1e293b;">
            ${interpretation.caracteristicas.slice(0, 3).map((p: string) => `<li style="margin: 4px 0;">${p}</li>`).join('')}
          </ul>
        </div>
        <div>
          <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; color: #dc2626; text-transform: uppercase; letter-spacing: 0.5px;">Aspectos a Trabalhar</p>
          <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #1e293b;">
            ${interpretation.desafios.slice(0, 3).map((n: string) => `<li style="margin: 4px 0;">${n}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div style="background-color: #f0f4ff; padding: 12px; border-radius: 4px; border-left: 4px solid #6366f1;">
        <p style="margin: 0; font-size: 12px; color: #1e293b;"><strong>Potenciais:</strong> ${interpretation.potenciais.slice(0, 2).join(', ')}</p>
      </div>
    </div>
  `;
}
