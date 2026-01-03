import { NumerologyChart } from '@/types';
import { getAnnualPrediction, getTrimestreInterpretation, getYearDescription } from '@/lib/annualPredictions';
import { Calendar, TrendingUp, AlertCircle, Lightbulb, Target } from 'lucide-react';

interface AnnualPredictionsProps {
  chart: NumerologyChart;
  year?: number;
}

/**
 * AnnualPredictions Component
 * 
 * Design: Exibição elegante de previsões anuais e ciclos trimestrais
 * - Cards com informações de cada trimestre
 * - Interpretações detalhadas do ano pessoal
 * - Polaridades e recomendações
 */

export default function AnnualPredictions({ chart, year = 2026 }: AnnualPredictionsProps) {
  const yearNumber = year === 2026 ? chart.personalYear2026 : chart.personalYear;
  const prediction = getAnnualPrediction(yearNumber);

  if (!prediction) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700">Não foi possível carregar as previsões para o ano {year}.</p>
      </div>
    );
  }

  const trimestres = [1, 2, 3, 4];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Calendar className="text-indigo-600" size={24} />
          <h2 className="text-3xl font-bold text-slate-900">Previsões Anuais {year}</h2>
        </div>
        <p className="text-slate-600">
          Seu Ano Pessoal: <span className="font-bold text-indigo-600 text-2xl">{yearNumber}</span>
        </p>
        <p className="text-lg text-slate-700 font-semibold">{getYearDescription(yearNumber)}</p>
      </div>

      {/* Essência do Ano */}
      <div className="card-mystical space-y-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <div className="flex items-start gap-3">
          <Lightbulb className="text-indigo-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <h3 className="font-bold text-indigo-900 mb-2">Essência do Ano</h3>
            <p className="text-indigo-800 leading-relaxed">{prediction.essence}</p>
          </div>
        </div>
      </div>

      {/* Foco Principal */}
      <div className="card-mystical space-y-4">
        <div className="flex items-start gap-3">
          <Target className="text-amber-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <h3 className="font-bold text-slate-900 mb-2">Foco Principal do Ano</h3>
            <p className="text-slate-700">{prediction.focus}</p>
          </div>
        </div>
      </div>

      {/* Polaridades */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp size={20} className="text-purple-600" />
          Como Este Ano Pode Se Manifestar
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Polaridade Positiva */}
          <div className="card-mystical border-l-4 border-green-500 space-y-3">
            <h4 className="font-bold text-green-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Polaridade Positiva
            </h4>
            <p className="text-slate-700 text-sm">{prediction.polarities.positive}</p>
          </div>

          {/* Polaridade Negativa */}
          <div className="card-mystical border-l-4 border-red-500 space-y-3">
            <h4 className="font-bold text-red-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Polaridade Negativa
            </h4>
            <p className="text-slate-700 text-sm">{prediction.polarities.negative}</p>
          </div>

          {/* Uso Parcial */}
          <div className="card-mystical border-l-4 border-yellow-500 space-y-3">
            <h4 className="font-bold text-yellow-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              Uso Parcial
            </h4>
            <p className="text-slate-700 text-sm">{prediction.polarities.partial}</p>
          </div>

          {/* Extrapolação */}
          <div className="card-mystical border-l-4 border-orange-500 space-y-3">
            <h4 className="font-bold text-orange-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Extrapolação
            </h4>
            <p className="text-slate-700 text-sm">{prediction.polarities.extrapolation}</p>
          </div>

          {/* Bloqueio */}
          <div className="card-mystical border-l-4 border-slate-500 space-y-3 md:col-span-2">
            <h4 className="font-bold text-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-500 rounded-full"></span>
              Bloqueio
            </h4>
            <p className="text-slate-700 text-sm">{prediction.polarities.block}</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider-diagonal"></div>

      {/* Ciclos Trimestrais */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900">Ciclos Trimestrais</h3>
        <p className="text-slate-600">
          O ano pessoal é dividido em 4 trimestres, cada um com sua vibração específica e foco particular.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {trimestres.map((trimestre) => {
            const ct = getTrimestreInterpretation(yearNumber, trimestre);
            if (!ct) return null;

            const ctNumber = chart.ciclosTrimestrais?.ano2026?.[`ct${trimestre}` as keyof typeof chart.ciclosTrimestrais.ano2026];

            return (
              <div
                key={trimestre}
                className="card-mystical space-y-4 border-l-4 border-indigo-600"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{ct.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Vibração do CT: <span className="font-bold text-indigo-600 text-lg">{ctNumber}</span>
                    </p>
                  </div>
                </div>

                {/* Essência */}
                <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
                  <p className="text-sm text-indigo-800 leading-relaxed">{ct.essence}</p>
                </div>

                {/* Atividades Recomendadas */}
                <div>
                  <h5 className="font-semibold text-slate-900 mb-2 text-sm">Atividades Recomendadas</h5>
                  <ul className="space-y-1">
                    {ct.activities.slice(0, 3).map((activity, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-indigo-600 font-bold mt-0.5">▸</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cautelas */}
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                  <h5 className="font-semibold text-amber-900 mb-2 text-sm flex items-center gap-2">
                    <AlertCircle size={14} />
                    Cautelas
                  </h5>
                  <ul className="space-y-1">
                    {ct.cautions.slice(0, 2).map((caution, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-amber-800">
                        <span className="text-amber-600 font-bold mt-0.5">•</span>
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
      <div className="divider-diagonal"></div>

      {/* Recomendações */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Recomendações para {year}</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Recomendações Positivas */}
          <div className="card-mystical space-y-3">
            <h4 className="font-bold text-green-700 flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              O Que Fazer
            </h4>
            <ul className="space-y-2">
              {prediction.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Desafios */}
          <div className="card-mystical space-y-3">
            <h4 className="font-bold text-red-700 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              Desafios a Evitar
            </h4>
            <ul className="space-y-2">
              {prediction.challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-red-600 font-bold mt-0.5">✗</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Oportunidades */}
      <div className="card-mystical space-y-4 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
        <h3 className="text-lg font-bold text-purple-900 flex items-center gap-2">
          <Lightbulb size={20} className="text-purple-600" />
          Oportunidades Principais
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {prediction.opportunities.map((opp, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-3 border border-purple-200"
            >
              <p className="text-sm text-slate-700 font-medium">{opp}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nota Final */}
      <div className="bg-slate-100 rounded-lg p-6 border border-slate-300 space-y-3">
        <h4 className="font-bold text-slate-900">Nota Importante</h4>
        <p className="text-slate-700 text-sm leading-relaxed">
          As previsões anuais dependem diretamente de como você está vivendo seu Mapa Numerológico Natal.
          A vibração do seu Ano Pessoal irá mexer com as posições do seu MNN conforme as regras da técnica.
          Lembre-se: você sempre tem livre-arbítrio para escolher como viver cada vibração.
        </p>
      </div>
    </div>
  );
}
