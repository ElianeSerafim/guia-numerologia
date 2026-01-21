
import { useState } from 'react';
import { NumerologyChart } from '@/types';
import { ArrowLeft, Download, Printer, Loader2, Save, History, BookOpen } from 'lucide-react';
import ChartDisplay from './ChartDisplay';
import InterpretationDisplay from './InterpretationDisplay';
import InterpretationDisplayEliane from './InterpretationDisplayEliane';
import { EssentialNumbersInteractive } from './EssentialNumbersInteractive';
import { CyclesInteractive } from './CyclesInteractive';
import { ChallengesInteractive } from './ChallengesInteractive';
import { CyclesAndChallengesDisplay } from './CyclesAndChallengesDisplay';
import AnnualPredictions from './AnnualPredictions';
import PersonalYearProgress from './PersonalYearProgress';
import { exportMapToPDF } from '@/lib/pdfExport';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { useMapHistory } from '@/hooks/useMapHistory';
import { getYearDescription } from '@/lib/annualPredictions';
import { useLocation } from 'wouter';

/**
 * Report Component - Melhorado
 * 
 * Design: Apresentação elegante e profissional do mapa numerológico
 * - Tipografia refinada com hierarquia clara
 * - Espaçamento generoso para melhor legibilidade
 * - Layout responsivo com sidebar inteligente
 * - Tema roxo/ouro mantido
 * - Novo botão de e-book profissional
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
  const [isGeneratingEbook, setIsGeneratingEbook] = useState(false);
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

  const handleGenerateEbook = async () => {
    if (!user) return;
    
    setIsGeneratingEbook(true);
    try {
      // Chamar API para gerar e-book
      const response = await fetch('/api/ebook/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chart, userEmail: user.email })
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Guia_Numerologia_${chart.fullName.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Erro ao gerar e-book. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao gerar e-book:', error);
      alert('Erro ao gerar e-book. Tente novamente.');
    } finally {
      setIsGeneratingEbook(false);
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
    <div className="min-h-screen bg-[#190825]">
      {/* Header - Melhorado */}
      <header className="sticky top-0 z-50 bg-[#190825]/95 backdrop-blur-md border-b border-[#4A2A6A]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onReset}
              className="flex items-center gap-2 text-[#D4AF37] hover:text-[#FFD700] font-semibold transition-colors duration-300"
            >
              <ArrowLeft size={20} />
              <span>Novo Cálculo</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setLocation('/history')}
                className="p-2.5 rounded-lg hover:bg-[#4A2A6A] transition-colors text-[#D4AF37] hover:text-[#FFD700]"
                title="Ver histórico"
              >
                <History size={20} />
              </button>
              <button
                onClick={() => setShowSaveModal(true)}
                className="p-2.5 rounded-lg hover:bg-[#4A2A6A] transition-colors text-[#D4AF37] hover:text-[#FFD700]"
                title="Salvar mapa"
              >
                <Save size={20} />
              </button>
              <button
                onClick={() => window.print()}
                className="p-2.5 rounded-lg hover:bg-[#4A2A6A] transition-colors text-[#D4AF37] hover:text-[#FFD700]"
                title="Imprimir"
              >
                <Printer size={20} />
              </button>
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="p-2.5 rounded-lg hover:bg-[#4A2A6A] transition-colors text-[#D4AF37] hover:text-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed"
                title="Baixar PDF do Mapa"
              >
                {isExporting ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
              </button>
              <button
                onClick={handleGenerateEbook}
                disabled={isGeneratingEbook}
                className="p-2.5 rounded-lg hover:bg-[#4A2A6A] transition-colors text-[#D4AF37] hover:text-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed"
                title="Gerar E-book Profissional"
              >
                {isGeneratingEbook ? <Loader2 size={20} className="animate-spin" /> : <BookOpen size={20} />}
              </button>
            </div>
          </div>
          
          {/* Título Principal */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-white">Seu Mapa </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] to-[#D4AF37]">Numerológico</span>
            </h1>
            <p className="text-[#B8A8D8] text-lg">Análise completa baseada no método pitagórico</p>
          </div>
        </div>
      </header>

      {/* Main Content - Melhorado */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-12">
            {/* Welcome Section - Melhorado */}
            <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#4A2A6A] rounded-xl p-8 md:p-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Bem-vindo, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">{chart.fullName}</span>
              </h2>
              <p className="text-[#B8A8D8] text-lg leading-relaxed">
                Aqui está seu mapa numerológico completo baseado no método pitagórico. Seus números revelam sua essência, missão de vida e potencial para 2026. Explore cada seção para compreender melhor sua jornada pessoal.
              </p>
            </div>

            {/* Personal Year Progress - NOVO */}
            <div>
              <PersonalYearProgress chart={chart} />
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#4A2A6A] to-transparent"></div>

            {/* Essential Numbers Interactive */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Seus Números Essenciais</h3>
              <p className="text-slate-400 mb-6">Clique em cada número para ver a interpretação completa</p>
              <EssentialNumbersInteractive chart={chart} />
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#4A2A6A] to-transparent"></div>

            {/* Interpretations - Melhorado */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Interpretação Detalhada</h3>
              <InterpretationDisplayEliane chart={chart} />
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#4A2A6A] to-transparent"></div>

            {/* Cycles of Life */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Ciclos de Vida</h3>
              <p className="text-slate-400 mb-6">Clique em cada ciclo para ver a interpretação completa</p>
              <CyclesInteractive birthDate={chart.birthDate} />
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#4A2A6A] to-transparent"></div>

            {/* Challenges */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Desafios de Vida</h3>
              <p className="text-slate-400 mb-6">Clique em cada desafio para ver a interpretação completa</p>
              <ChallengesInteractive birthDate={chart.birthDate} />
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#4A2A6A] to-transparent"></div>

            {/* Annual Predictions */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Previsões para 2026</h3>
              <AnnualPredictions chart={chart} year={2026} />
            </div>
          </div>

          {/* Sidebar - 1 column - Melhorado */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#4A2A6A] rounded-xl p-6">
              <h3 className="text-lg font-bold text-white border-b border-[#4A2A6A] pb-4 mb-4">
                Informações Pessoais
              </h3>
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold text-white uppercase tracking-widest mb-2">Nome Completo</p>
                  <p className="text-white font-medium text-lg">{chart.fullName}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white uppercase tracking-widest mb-2">Data de Nascimento</p>
                  <p className="text-white font-medium text-lg">
                    {(() => {
                      // Aceitar ambos os formatos: DD/MM/YYYY e YYYY-MM-DD
                      let day, month, year;
                      if (chart.birthDate.includes('/')) {
                        const parts = chart.birthDate.split('/');
                        day = parseInt(parts[0]);
                        month = parseInt(parts[1]) - 1; // mês é 0-indexed
                        year = parseInt(parts[2]);
                      } else if (chart.birthDate.includes('-')) {
                        const parts = chart.birthDate.split('-');
                        year = parseInt(parts[0]);
                        month = parseInt(parts[1]) - 1;
                        day = parseInt(parts[2]);
                      } else {
                        return chart.birthDate;
                      }
                      const date = new Date(year, month, day);
                      return date.toLocaleDateString('pt-BR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      });
                    })()}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white uppercase tracking-widest mb-2">Idade</p>
                  <p className="text-white font-medium text-lg">{chart.age} anos</p>
                </div>
              </div>
            </div>

            {/* Key Numbers */}
            <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#4A2A6A] rounded-xl p-6">
              <h3 className="text-lg font-bold text-white border-b border-[#4A2A6A] pb-4 mb-6">
                Números Principais
              </h3>
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Caminho de Destino</span>
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">{chart.cd}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Motivação</span>
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">{chart.mo}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Expressão</span>
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">{chart.ex}</span>
                </div>
                <div className="flex items-center justify-between pt-5 border-t border-[#4A2A6A]">
                  <span className="text-white font-bold">Mérito (Força)</span>
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">{chart.merito}</span>
                </div>
              </div>
            </div>

            {/* 2026 Prediction */}
            <div className="bg-gradient-to-br from-[#4A2A6A] to-[#2A1A4A] border border-[#8A2BE2] rounded-xl p-6">
              <h3 className="text-lg font-bold text-white border-b border-[#8A2BE2] pb-4 mb-6">
                Ciclo Pessoal 2026
              </h3>
              <div className="text-center space-y-4">
                <p className="text-sm text-[#D4AF37] font-semibold uppercase tracking-wide">Seu Ano Pessoal</p>
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">{chart.personalYear2026}</div>
                <p className="text-sm text-white leading-relaxed">
                  {getYearDescription(chart.personalYear2026)}
                </p>
              </div>
            </div>

            {/* E-book CTA */}
            <button
              onClick={handleGenerateEbook}
              disabled={isGeneratingEbook}
              className="w-full bg-gradient-to-r from-[#8A2BE2] to-[#D4AF37] hover:from-[#A040FF] hover:to-[#FFE066] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingEbook ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <BookOpen size={20} />
                  Gerar E-book Completo
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Save Modal - Melhorado */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#4A2A6A] rounded-xl max-w-md w-full p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white">Salvar Mapa</h2>
            <p className="text-[#B8A8D8]">Adicione notas para lembrar detalhes sobre este mapa.</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Digite suas notas aqui (opcional)..."
              className="w-full p-4 bg-[#1A0A2A] border border-[#4A2A6A] rounded-lg text-white placeholder-[#8A6BA8] focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] resize-none h-24"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-4 py-3 border border-[#4A2A6A] rounded-lg text-[#B8A8D8] hover:bg-[#2A1A4A] transition-colors font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveMap}
                disabled={isSaving}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#8A2BE2] to-[#D4AF37] text-white rounded-lg hover:from-[#A040FF] hover:to-[#FFE066] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
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
