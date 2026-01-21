import { useState } from 'react';
import { getAnnualPrediction, getTrimestreInterpretation, getYearDescription } from '@/lib/annualPredictions';
import { Calendar, TrendingUp, AlertCircle, Lightbulb, Target, Zap, Shield, Filter, X } from 'lucide-react';

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

  const yearNumber = year === 2026 ? chart.personalYear2026 : chart.personalYear;
  const prediction = getAnnualPrediction(yearNumber);

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
      {/* Ano Pessoal - Destaque Principal */}
      <div className="bg-gradient-to-r from-[#8A2BE2] to-[#6A1BB2] rounded-xl p-8 text-center space-y-3 border border-[#D4AF37]/30">
        <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider">Seu Ano Pessoal</p>
        <div className="text-6xl font-bold text-white">{yearNumber}</div>
        <p className="text-[#D4AF37] text-lg font-semibold">{getYearDescription(yearNumber)}</p>
      </div>

      {/* Sistema de Filtros */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-[#D4AF37]" />
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
                  ? 'bg-[#D4AF37] text-[#190825] shadow-lg'
                  : 'bg-[#3A1A5A] text-white border border-[#4A2A6A] hover:border-[#D4AF37]'
              }`}
            >
              <span>{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Filtros de Trimestre (aparece quando selecionado) */}
        {filterType === 'trimestral' && (
          <div className="flex flex-wrap gap-2 pl-4 border-l-2 border-[#D4AF37]">
            <button
              onClick={() => setTrimestreFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                trimestreFilter === 'all'
                  ? 'bg-[#D4AF37] text-[#190825]'
                  : 'bg-[#3A1A5A] text-white border border-[#4A2A6A] hover:border-[#D4AF37]'
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
                    ? 'bg-[#D4AF37] text-[#190825]'
                    : 'bg-[#3A1A5A] text-white border border-[#4A2A6A] hover:border-[#D4AF37]'
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
          <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#4A2A6A] rounded-xl p-6 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-[#D4AF37] flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-3">Essência do Ano</h3>
                <p className="text-slate-300 leading-relaxed text-base">{prediction.essence}</p>
              </div>
            </div>
          </div>
        )}

        {/* Foco Principal */}
        {(filterType === 'all' || filterType === 'focus') && (
          <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#4A2A6A] rounded-xl p-6 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <Target className="text-[#D4AF37] flex-shrink-0 mt-1" size={24} />
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
              <TrendingUp size={24} className="text-[#D4AF37]" />
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
                <Zap size={24} className="text-[#D4AF37]" />
                Ciclos Trimestrais
              </h3>
              <p className="text-slate-400 text-sm">O ano é dividido em 4 trimestres, cada um com sua vibração específica</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {trimestres
                .filter((t) => trimestreFilter === 'all' || trimestreFilter === t.toString())
                .map((trimestre) => {
                  const ct = getTrimestreInterpretation(yearNumber, trimestre);
                  if (!ct) return null;

                  const ctNumber = chart.ciclosTrimestrais?.ano2026?.[`ct${trimestre}` as keyof typeof chart.ciclosTrimestrais.ano2026];
                  
                  // Obter mês de realização correspondente ao trimestre
                  const realizationMonths = chart.ciclosTrimestrais?.realizationMonths;
                  let realizationMonth = '';
                  if (realizationMonths) {
                    if (trimestre === 1) realizationMonth = `Mês ${realizationMonths.r1Start}`;
                    else if (trimestre === 2) realizationMonth = `Mês ${realizationMonths.r2Start}`;
                    else if (trimestre === 3) realizationMonth = `Mês ${realizationMonths.r3Start}`;
                    else if (trimestre === 4) realizationMonth = `Mês ${realizationMonths.r4Start}`;
                  }

                  return (
                    <div
                      key={trimestre}
                      className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#4A2A6A] rounded-xl p-6 space-y-4 animate-in fade-in duration-300"
                    >
                      {/* Header */}
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-white">{ct.title}</h4>
                        <div className="flex flex-wrap gap-2">
                          <div className="inline-block bg-[#4A2A6A] rounded-lg px-3 py-1">
                            <p className="text-sm text-[#D4AF37] font-semibold">Vibração: {ctNumber}</p>
                          </div>
                          {realizationMonth && (
                            <div className="inline-block bg-[#5A3A7A] rounded-lg px-3 py-1">
                              <p className="text-sm text-[#FFD700] font-semibold">📅 {realizationMonth}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Essência */}
                      <div className="bg-[#3A1A5A]/50 rounded-lg p-4 border border-[#4A2A6A]">
                        <p className="text-sm text-slate-300 leading-relaxed">{ct.essence}</p>
                      </div>

                      {/* Atividades Recomendadas */}
                      <div>
                        <h5 className="font-semibold text-[#D4AF37] mb-3 text-sm uppercase tracking-wider">✓ Atividades Recomendadas</h5>
                        <ul className="space-y-2">
                          {ct.activities.slice(0, 3).map((activity, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                              <span className="text-[#D4AF37] font-bold mt-0.5 flex-shrink-0">▸</span>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
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
              <Shield size={24} className="text-[#D4AF37]" />
              Recomendações
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* O Que Fazer */}
              <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#4A2A6A] rounded-xl p-6 space-y-4">
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
              <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#4A2A6A] rounded-xl p-6 space-y-4">
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
          <div className="bg-gradient-to-r from-[#8A2BE2] to-[#6A1BB2] rounded-xl p-6 space-y-4 border border-[#D4AF37]/30 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lightbulb size={20} className="text-[#D4AF37]" />
              Oportunidades Principais
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {prediction.opportunities.map((opp, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 rounded-lg p-4 border border-[#D4AF37]/20 backdrop-blur-sm"
                >
                  <p className="text-sm text-white font-medium">{opp}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
