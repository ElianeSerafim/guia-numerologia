import { getAnnualPrediction, getTrimestreInterpretation, getYearDescription } from '@/lib/annualPredictions';
import { Calendar, TrendingUp, AlertCircle, Lightbulb, Target, Zap, Shield } from 'lucide-react';

interface AnnualPredictionsProps {
  chart: NumerologyChart;
  year?: number;
}

/**
 * AnnualPredictions Component - Melhorado
 * 
 * Design: Exibição clara e organizada de previsões anuais
 * - Hierarquia visual melhorada
 * - Cards com melhor espaçamento
 * - Informações agrupadas logicamente
 */

export default function AnnualPredictions({ chart, year = 2026 }: AnnualPredictionsProps) {
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

  return (
    <div className="space-y-8">
      {/* Ano Pessoal - Destaque Principal */}
      <div className="bg-gradient-to-r from-[#8A2BE2] to-[#6A1BB2] rounded-xl p-8 text-center space-y-3 border border-[#D4AF37]/30">
        <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider">Seu Ano Pessoal</p>
        <div className="text-6xl font-bold text-white">{yearNumber}</div>
        <p className="text-[#D4AF37] text-lg font-semibold">{getYearDescription(yearNumber)}</p>
      </div>

      {/* Essência do Ano */}
      <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#4A2A6A] rounded-xl p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="text-[#D4AF37] flex-shrink-0 mt-1" size={24} />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-3">Essência do Ano</h3>
            <p className="text-slate-300 leading-relaxed text-base">{prediction.essence}</p>
          </div>
        </div>
      </div>

      {/* Foco Principal */}
      <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#4A2A6A] rounded-xl p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Target className="text-[#D4AF37] flex-shrink-0 mt-1" size={24} />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-3">Foco Principal</h3>
            <p className="text-slate-300 leading-relaxed text-base">{prediction.focus}</p>
          </div>
        </div>
      </div>

      {/* Manifestações do Ano */}
      <div className="space-y-4">
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

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#4A2A6A] to-transparent"></div>

      {/* Ciclos Trimestrais */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Zap size={24} className="text-[#D4AF37]" />
            Ciclos Trimestrais
          </h3>
          <p className="text-slate-400 text-sm">O ano é dividido em 4 trimestres, cada um com sua vibração específica</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {trimestres.map((trimestre) => {
            const ct = getTrimestreInterpretation(yearNumber, trimestre);
            if (!ct) return null;

            const ctNumber = chart.ciclosTrimestrais?.ano2026?.[`ct${trimestre}` as keyof typeof chart.ciclosTrimestrais.ano2026];

            return (
              <div
                key={trimestre}
                className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#4A2A6A] rounded-xl p-6 space-y-4"
              >
                {/* Header */}
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white">{ct.title}</h4>
                  <div className="inline-block bg-[#4A2A6A] rounded-lg px-3 py-1">
                    <p className="text-sm text-[#D4AF37] font-semibold">Vibração: {ctNumber}</p>
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

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#4A2A6A] to-transparent"></div>

      {/* Recomendações */}
      <div className="space-y-4">
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

      {/* Oportunidades Principais */}
      <div className="bg-gradient-to-r from-[#8A2BE2] to-[#6A1BB2] rounded-xl p-6 space-y-4 border border-[#D4AF37]/30">
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
    </div>
  );
}
