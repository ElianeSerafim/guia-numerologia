import { useState, useEffect } from 'react';
import { getAnnualPrediction, getTrimestreInterpretation, getYearDescription } from '@/lib/annualPredictions';
import { calculateDailyNumber } from '@/lib/numerologyUtils';
import { getDailyTip } from '@/lib/dailyTips';
import { Calendar, TrendingUp, AlertCircle, Lightbulb, Target, Zap, Shield, Filter, X } from 'lucide-react';
import MonthlyPrediction from './MonthlyPrediction';
import DailyTipCard from './DailyTipCard';
import type { NumerologyChart } from '@/types';

interface AnnualPredictionsProps {
  chart: NumerologyChart;
  year?: number;
}

type FilterType = 'all' | 'essence' | 'focus' | 'manifestations' | 'recommendations' | 'opportunities' | 'trimestral';
type TrimestreFilter = 'all' | '1' | '2' | '3' | '4';

/**
 * AnnualPredictions Component - Com Sistema de Filtros
 * 
 * Design: Exibição clara e organizada com filtros interativos
 * - Filtros por tema (Essência, Foco, Manifestações, etc)
 * - Filtros por trimestre
 * - Visualização dinâmica baseada em seleção
 */

export default function AnnualPredictions({ chart, year = 2026 }: AnnualPredictionsProps) {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [trimestreFilter, setTrimestreFilter] = useState<TrimestreFilter>('all');
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Atualizar data à meia-noite
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      setCurrentDate(now);
    };

    // Calcular tempo até meia-noite
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    // Atualizar à meia-noite
    const midnightTimer = setTimeout(() => {
      updateDate();
      // Depois da primeira atualização, atualizar a cada 24h
      const dailyInterval = setInterval(updateDate, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyInterval);
    }, msUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  const yearNumber = year === 2026 ? chart.personalYear2026 : chart.personalYear;
  const prediction = getAnnualPrediction(yearNumber);

  // Calcular dica do dia com integração de 3 camadas
  const dailyNumber = calculateDailyNumber(currentDate, yearNumber);
  
  // Determinar trimestre vigente atual (baseado no mês)
  const currentMonth = currentDate.getMonth() + 1; // 1-12
  let currentTrimestreNumber = 1;
  if (currentMonth >= 4 && currentMonth <= 6) currentTrimestreNumber = 2;
  else if (currentMonth >= 7 && currentMonth <= 9) currentTrimestreNumber = 3;
  else if (currentMonth >= 10) currentTrimestreNumber = 4;
  
  // Obter vibração do trimestre vigente
  const trimestreVibration = chart.ciclosTrimestrais
    ? (year === 2026 
        ? chart.ciclosTrimestrais.ano2026[`ct${currentTrimestreNumber}` as 'ct1' | 'ct2' | 'ct3' | 'ct4']
        : chart.ciclosTrimestrais.atual[`ct${currentTrimestreNumber}` as 'ct1' | 'ct2' | 'ct3' | 'ct4'])
    : 1; // Fallback para 1 se não disponível
  
  // Obter dica do dia com contexto completo (3 camadas)
  const dailyTip = getDailyTip(dailyNumber, yearNumber, trimestreVibration);

  if (!prediction) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700">Não foi possível carregar as previsões.</p>
      </div>
    );
  }

  const trimestres = [1, 2, 3, 4];

  // Filtros disponíveis
  const filters: { value: FilterType; label: string; icon: string }[] = [
    { value: 'all', label: 'Tudo', icon: '📊' },
    { value: 'essence', label: 'Essência', icon: '✨' },
    { value: 'focus', label: 'Foco', icon: '🎯' },
    { value: 'manifestations', label: 'Manifestações', icon: '🌊' },
    { value: 'recommendations', label: 'Recomendações', icon: '💡' },
    { value: 'opportunities', label: 'Oportunidades', icon: '🌟' },
    { value: 'trimestral', label: 'Trimestres', icon: '📅' },
  ];

  return (
    <div className="space-y-8">
      {/* Dica do Dia */}
      <DailyTipCard 
        tip={dailyTip} 
        currentDate={currentDate} 
        personalYear={yearNumber}
        trimestreVibration={trimestreVibration}
      />

      {/* Ano Pessoal - Destaque Principal */}
      <div className="bg-gradient-to-r from-[#00FFFF] to-[#6A1BB2] rounded-xl p-8 text-center space-y-3 border border-[#19E6FF]/30">
        <p className="text-[#19E6FF] text-sm font-semibold uppercase tracking-wider">Seu Ano Pessoal</p>
        <div className="text-6xl font-bold text-white">{yearNumber}</div>
        <p className="text-[#19E6FF] text-lg font-semibold">{getYearDescription(yearNumber)}</p>
      </div>

      {/* Sistema de Filtros */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-[#19E6FF]" />
          <h3 className="text-lg font-bold text-white">Filtros de Visualização</h3>
        </div>

        {/* Filtros de Tema */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => {
                setFilterType(filter.value);
                if (filter.value !== 'trimestral') {
                  setTrimestreFilter('all');
                }
              }}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
                filterType === filter.value
                  ? 'bg-[#19E6FF] text-[#07131B] shadow-lg'
                  : 'bg-[#3A1A5A] text-white border border-[#1A3A4A] hover:border-[#19E6FF]'
              }`}
            >
              <span>{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Filtros de Trimestre (aparece quando selecionado) */}
        {filterType === 'trimestral' && (
          <div className="flex flex-wrap gap-2 pl-4 border-l-2 border-[#19E6FF]">
            <button
              onClick={() => setTrimestreFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                trimestreFilter === 'all'
                  ? 'bg-[#19E6FF] text-[#07131B]'
                  : 'bg-[#3A1A5A] text-white border border-[#1A3A4A] hover:border-[#19E6FF]'
              }`}
            >
              Todos os Trimestres
            </button>
            {trimestres.map((t) => (
              <button
                key={t}
                onClick={() => setTrimestreFilter(t.toString() as TrimestreFilter)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  trimestreFilter === t.toString()
                    ? 'bg-[#19E6FF] text-[#07131B]'
                    : 'bg-[#3A1A5A] text-white border border-[#1A3A4A] hover:border-[#19E6FF]'
                }`}
              >
                T{t}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Conteúdo Filtrado */}
      <div className="space-y-8">
        {/* Essência do Ano */}
        {(filterType === 'all' || filterType === 'essence') && (
          <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#1A3A4A] rounded-xl p-6 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-[#19E6FF] flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-3">Essência do Ano</h3>
                <p className="text-slate-300 leading-relaxed text-base">{prediction.essence}</p>
              </div>
            </div>
          </div>
        )}

        {/* Foco Principal */}
        {(filterType === 'all' || filterType === 'focus') && (
          <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#1A3A4A] rounded-xl p-6 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <Target className="text-[#19E6FF] flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-3">Foco Principal</h3>
                <p className="text-slate-300 leading-relaxed text-base">{prediction.focus}</p>
              </div>
            </div>
          </div>
        )}

        {/* Manifestações do Ano */}
        {(filterType === 'all' || filterType === 'manifestations') && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp size={24} className="text-[#19E6FF]" />
              Como Este Ano Pode Se Manifestar
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Polaridade Positiva */}
              <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border-l-4 border-green-500 rounded-lg p-5 space-y-3">
                <h4 className="font-bold text-green-400 flex items-center gap-2 text-base">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                  Polaridade Positiva
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">{prediction.polarities.positive}</p>
              </div>

              {/* Polaridade Negativa */}
              <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border-l-4 border-red-500 rounded-lg p-5 space-y-3">
                <h4 className="font-bold text-red-400 flex items-center gap-2 text-base">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                  Polaridade Negativa
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">{prediction.polarities.negative}</p>
              </div>

              {/* Uso Parcial */}
              <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border-l-4 border-yellow-500 rounded-lg p-5 space-y-3">
                <h4 className="font-bold text-yellow-400 flex items-center gap-2 text-base">
                  <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
                  Uso Parcial
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">{prediction.polarities.partial}</p>
              </div>

              {/* Extrapolação */}
              <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border-l-4 border-orange-500 rounded-lg p-5 space-y-3">
                <h4 className="font-bold text-orange-400 flex items-center gap-2 text-base">
                  <span className="w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
                  Extrapolação
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">{prediction.polarities.extrapolation}</p>
              </div>

              {/* Bloqueio */}
              <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border-l-4 border-slate-500 rounded-lg p-5 space-y-3 md:col-span-2">
                <h4 className="font-bold text-slate-400 flex items-center gap-2 text-base">
                  <span className="w-2.5 h-2.5 bg-slate-500 rounded-full"></span>
                  Bloqueio
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">{prediction.polarities.block}</p>
              </div>
            </div>
          </div>
        )}

        {/* Ciclos Trimestrais */}
        {(filterType === 'all' || filterType === 'trimestral') && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Zap size={24} className="text-[#19E6FF]" />
                Ciclos Trimestrais
              </h3>
              <p className="text-slate-400 text-sm">O ano é dividido em 4 trimestres, cada um com sua vibração específica</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {trimestres
                .filter((t) => trimestreFilter === 'all' || trimestreFilter === t.toString())
                .map((trimestre) => {
                  const ctNumber = chart.ciclosTrimestrais?.ano2026?.[`ct${trimestre}` as keyof typeof chart.ciclosTrimestrais.ano2026] || trimestre;
                  const ct = getTrimestreInterpretation(yearNumber, ctNumber, trimestre);
                  if (!ct) return null;
                  
                  // Meses por trimestre
                  const monthsByTrimestre: Record<number, string[]> = {
                    1: ['Janeiro', 'Fevereiro', 'Março'],
                    2: ['Abril', 'Maio', 'Junho'],
                    3: ['Julho', 'Agosto', 'Setembro'],
                    4: ['Outubro', 'Novembro', 'Dezembro']
                  };
                  const trimestreMonthsStr = monthsByTrimestre[trimestre]?.join(', ') || ''

                  return (
                    <div
                      key={trimestre}
                      className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#1A3A4A] rounded-xl p-6 space-y-4 animate-in fade-in duration-300 prediction-card-hover"
                    >
                      {/* Header */}
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-white">{ct.title}</h4>
                        <div className="flex flex-wrap gap-2">
                          <div className="inline-block bg-[#1A3A4A] rounded-lg px-3 py-1">
                            <p className="text-sm text-[#19E6FF] font-semibold">Vibração: {ctNumber}</p>
                          </div>
                          {trimestreMonthsStr && (
                            <div className="inline-block bg-[#5A3A7A] rounded-lg px-3 py-1 cursor-pointer hover:bg-[#6A4A8A] transition-colors">
                              <p className="text-sm text-[#FFD700] font-semibold">📅 {trimestreMonthsStr}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Essência */}
                      <div className="bg-[#3A1A5A]/50 rounded-lg p-4 border border-[#1A3A4A]">
                        <p className="text-sm text-slate-300 leading-relaxed">{ct.essence}</p>
                      </div>

                      {/* Descrição Detalhada (se disponível) */}
                      {ct.description && (
                        <div className="bg-[#2A1A4A]/70 rounded-lg p-4 border border-[#3A2A5A]">
                          <h5 className="font-semibold text-[#19E6FF] mb-2 text-sm uppercase tracking-wider">✨ Interpretação Detalhada</h5>
                          <p className="text-sm text-slate-300 leading-relaxed">{ct.description}</p>
                        </div>
                      )}

                      {/* Atividades Recomendadas */}
                      <div>
                        <h5 className="font-semibold text-[#19E6FF] mb-3 text-sm uppercase tracking-wider">✓ Atividades Recomendadas</h5>
                        <ul className="space-y-2">
                          {ct.activities.slice(0, 3).map((activity, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                              <span className="text-[#19E6FF] font-bold mt-0.5 flex-shrink-0">▸</span>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Botão para Ver Previsões Mensais */}
                      <div className="pt-4 border-t border-[#1A3A4A]">
                        <p className="text-xs text-slate-400 mb-3">Clique em um mês para ver previsão mensal:</p>
                        <div className="flex flex-wrap gap-2">
                          {monthsByTrimestre[trimestre]?.map((month: string, idx: number) => {
                              const monthNum = new Date(`${month} 1`).getMonth() + 1;
                              return (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedMonth(monthNum)}
                                  className="px-3 py-1 bg-[#00FFFF]/20 hover:bg-[#00FFFF]/40 border border-[#00FFFF] text-[#00FFFF] text-xs rounded-lg transition-all"
                                >
                                  {month}
                                </button>
                              );
                            })}
                        </div>
                      </div>

                      {/* Cautelas */}
                      <div className="bg-[#4A2A2A]/50 rounded-lg p-4 border border-[#6A3A3A]">
                        <h5 className="font-semibold text-red-400 mb-3 text-sm flex items-center gap-2 uppercase tracking-wider">
                          <AlertCircle size={16} />
                          Cautelas
                        </h5>
                        <ul className="space-y-2">
                          {ct.cautions.slice(0, 2).map((caution, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                              <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">•</span>
                              <span>{caution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Recomendações */}
        {(filterType === 'all' || filterType === 'recommendations') && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield size={24} className="text-[#19E6FF]" />
              Recomendações
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* O Que Fazer */}
              <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#1A3A4A] rounded-xl p-6 space-y-4">
                <h4 className="font-bold text-green-400 flex items-center gap-2 text-base">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  O Que Fazer
                </h4>
                <ul className="space-y-3">
                  {prediction.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">✓</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Desafios a Evitar */}
              <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#1A3A4A] rounded-xl p-6 space-y-4">
                <h4 className="font-bold text-red-400 flex items-center gap-2 text-base">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  Desafios a Evitar
                </h4>
                <ul className="space-y-3">
                  {prediction.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">✗</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Oportunidades Principais */}
        {(filterType === 'all' || filterType === 'opportunities') && (
          <div className="bg-gradient-to-r from-[#00FFFF] to-[#6A1BB2] rounded-xl p-6 space-y-4 border border-[#19E6FF]/30 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lightbulb size={20} className="text-[#19E6FF]" />
              Oportunidades Principais
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {prediction.opportunities.map((opp, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 rounded-lg p-4 border border-[#19E6FF]/20 backdrop-blur-sm"
                >
                  <p className="text-sm text-white font-medium">{opp}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal de Previsão Mensal */}
      {selectedMonth !== null && (
        <MonthlyPrediction
          chart={chart}
          month={selectedMonth}
          onClose={() => setSelectedMonth(null)}
        />
      )}
    </div>
  );
}
