import { useState } from 'react';
import { NumerologyChart } from '@/types';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import ChartDisplay from './ChartDisplay';
import InterpretationSection from './InterpretationSection';

/**
 * Report Component
 * 
 * Design: Apresentação elegante do mapa numerológico
 * - Layout assimétrico com conteúdo principal à esquerda
 * - Painel lateral com informações complementares
 * - Tipografia clara com números em ouro
 */

interface ReportProps {
  chart: NumerologyChart;
  onReset: () => void;
}

export default function Report({ chart, onReset }: ReportProps) {
  const [isGeneratingInterpretation, setIsGeneratingInterpretation] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);

  const handleGenerateInterpretation = async () => {
    setIsGeneratingInterpretation(true);
    try {
      // Placeholder para integração com Gemini API
      // Em produção, isso chamaria o serviço de IA
      await new Promise(resolve => setTimeout(resolve, 2000));
      setInterpretation('Interpretação com IA será disponibilizada após integração com Gemini API');
    } catch (error) {
      console.error('Erro ao gerar interpretação:', error);
    } finally {
      setIsGeneratingInterpretation(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Novo Cálculo</span>
          </button>
          <h1 className="text-xl font-bold text-slate-900">Seu Mapa Numerológico</h1>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
              title="Imprimir"
            >
              <Printer size={20} />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
              title="Baixar PDF"
            >
              <Download size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="card-mystical">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Bem-vindo, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">{chart.fullName}</span>
              </h2>
              <p className="text-slate-600">
                Aqui está seu mapa numerológico completo baseado no método pitagórico. 
                Seus números revelam sua essência, missão e potencial para 2026.
              </p>
            </div>

            {/* Chart Display */}
            <ChartDisplay chart={chart} />

            {/* Interpretation Section */}
            {!interpretation && (
              <div className="card-mystical text-center space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Interpretação Personalizada com IA</h3>
                <p className="text-slate-600">
                  Receba uma análise profunda e inspiradora de seu mapa numerológico gerada por inteligência artificial.
                </p>
                <button
                  onClick={handleGenerateInterpretation}
                  disabled={isGeneratingInterpretation}
                  className="btn-mystical disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingInterpretation ? 'Gerando interpretação...' : 'Gerar Interpretação com IA'}
                </button>
              </div>
            )}

            {interpretation && (
              <InterpretationSection interpretation={interpretation} />
            )}
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="card-mystical space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
                Informações Pessoais
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Nome</p>
                  <p className="text-slate-900 font-medium">{chart.fullName}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Data de Nascimento</p>
                  <p className="text-slate-900 font-medium">
                    {new Date(chart.birthDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Idade</p>
                  <p className="text-slate-900 font-medium">{chart.age} anos</p>
                </div>
              </div>
            </div>

            {/* Key Numbers */}
            <div className="card-mystical space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
                Números Principais
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Caminho de Destino</span>
                  <span className="number-mystical text-3xl">{chart.cd}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Motivação</span>
                  <span className="number-mystical text-3xl">{chart.mo}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Expressão</span>
                  <span className="number-mystical text-3xl">{chart.ex}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <span className="text-slate-900 font-bold">Mérito (Força)</span>
                  <span className="number-mystical text-3xl">{chart.merito}</span>
                </div>
              </div>
            </div>

            {/* 2026 Prediction */}
            <div className="card-mystical space-y-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
              <h3 className="text-lg font-bold text-indigo-900 border-b border-indigo-200 pb-3">
                Previsão 2026
              </h3>
              <div className="text-center">
                <p className="text-sm text-indigo-700 mb-2">Seu Ano Pessoal em 2026</p>
                <div className="number-mystical text-5xl text-indigo-600">{chart.personalYear2026}</div>
                <p className="text-xs text-indigo-600 mt-2 font-medium">
                  {getYearDescription(chart.personalYear2026)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getYearDescription(year: number): string {
  const descriptions: Record<number, string> = {
    1: 'Novos Inícios e Ação',
    2: 'Parcerias e Paciência',
    3: 'Criatividade e Expressão',
    4: 'Trabalho e Estabilidade',
    5: 'Mudanças e Liberdade',
    6: 'Família e Afeto',
    7: 'Análise e Autoconhecimento',
    8: 'Colheita e Poder',
    9: 'Conclusão e Limpeza',
    11: 'Iluminação Espiritual',
    22: 'Grandes Realizações',
    33: 'Amor Universal'
  };
  return descriptions[year] || 'Transformação';
}
