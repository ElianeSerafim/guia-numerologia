
import { useState } from 'react';
import { NumerologyChart } from '@/types';
import { ArrowLeft, Download, Printer, Loader2, Save, History } from 'lucide-react';
import ChartDisplay from './ChartDisplay';
import InterpretationDisplay from './InterpretationDisplay';
import AnnualPredictions from './AnnualPredictions';
import { exportMapToPDF } from '@/lib/pdfExport';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { useMapHistory } from '@/hooks/useMapHistory';
import { getYearDescription } from '@/lib/annualPredictions';
import { useLocation } from 'wouter';

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
  const { user } = useUserSubscription();
  const { addMap } = useMapHistory();
  const [, setLocation] = useLocation();
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [notes, setNotes] = useState('');

  const handleExportPDF = async () => {
    if (!user) return;
    
    setIsExporting(true);
    try {
      await exportMapToPDF(chart, user.email);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveMap = async () => {
    if (!user || !user.email) return;
    
    setIsSaving(true);
    try {
      addMap(chart, user.email, notes);
      alert('Mapa salvo com sucesso!');
      setShowSaveModal(false);
      setNotes('');
    } catch (error) {
      console.error('Erro ao salvar mapa:', error);
      alert('Erro ao salvar mapa. Tente novamente.');
    } finally {
      setIsSaving(false);
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
              onClick={() => setLocation('/history')}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
              title="Ver histórico"
            >
              <History size={20} />
            </button>
            <button
              onClick={() => setShowSaveModal(true)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
              title="Salvar mapa"
            >
              <Save size={20} />
            </button>
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
              title="Imprimir"
            >
              <Printer size={20} />
            </button>
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Baixar PDF"
            >
              {isExporting ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
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
              <p className="text-slate-700">
                Aqui está seu mapa numerológico completo baseado no método pitagórico. 
                Seus números revelam sua essência, missão e potencial para 2026.
              </p>
            </div>

            {/* Chart Display */}
            <ChartDisplay chart={chart} />

            {/* Divider */}
            <div className="divider-diagonal"></div>

            {/* Interpretations */}
            <InterpretationDisplay chart={chart} />

            {/* Divider */}
            <div className="divider-diagonal"></div>

            {/* Annual Predictions */}
            <AnnualPredictions chart={chart} year={2026} />
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
                  <span className="text-slate-700 font-medium">Caminho de Destino</span>
                  <span className="number-mystical text-3xl">{chart.cd}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 font-medium">Motivação</span>
                  <span className="number-mystical text-3xl">{chart.mo}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 font-medium">Expressão</span>
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

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <h2 className="text-2xl font-bold text-white">Salvar Mapa</h2>
            <p className="text-slate-600">Adicione notas para lembrar detalhes sobre este mapa.</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Digite suas notas aqui (opcional)..."
              className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-24"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveMap}
                disabled={isSaving}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Salvar Mapa
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
