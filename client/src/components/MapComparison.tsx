import { ComparisonResult } from '@/types/history';
import { TrendingUp, AlertCircle, CheckCircle2, Zap } from 'lucide-react';

interface MapComparisonProps {
  comparison: ComparisonResult;
}

/**
 * MapComparison Component
 * 
 * Design: Exibição elegante da comparação entre dois mapas
 * - Números similares e diferentes
 * - Score de compatibilidade
 * - Análise detalhada
 */

export default function MapComparison({ comparison }: MapComparisonProps) {
  const { map1, map2, similarities, differences, compatibility } = comparison;

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-blue-500 to-indigo-600';
    if (score >= 40) return 'from-yellow-500 to-amber-600';
    return 'from-red-500 to-rose-600';
  };

  const getCompatibilityLabel = (score: number) => {
    if (score >= 80) return 'Altíssima';
    if (score >= 60) return 'Boa';
    if (score >= 40) return 'Moderada';
    return 'Baixa';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-900">Análise Comparativa</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-sm text-slate-600 mb-1">Mapa 1</p>
            <p className="font-bold text-slate-900">{map1.chart.fullName}</p>
          </div>
          <Zap className="text-amber-500" size={24} />
          <div className="text-center">
            <p className="text-sm text-slate-600 mb-1">Mapa 2</p>
            <p className="font-bold text-slate-900">{map2.chart.fullName}</p>
          </div>
        </div>
      </div>

      {/* Compatibilidade Score */}
      <div className={`card-mystical bg-gradient-to-br ${getCompatibilityColor(compatibility.score)} text-white space-y-4`}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Compatibilidade</h3>
          <CheckCircle2 size={24} />
        </div>
        <div className="flex items-end gap-4">
          <div>
            <p className="text-5xl font-bold">{compatibility.score}%</p>
            <p className="text-sm opacity-90 mt-1">{getCompatibilityLabel(compatibility.score)}</p>
          </div>
          <div className="flex-1">
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${compatibility.score}%` }}
              ></div>
            </div>
          </div>
        </div>
        <p className="text-sm opacity-95">{compatibility.description}</p>
      </div>

      {/* Similaridades */}
      <div className="card-mystical space-y-4 border-l-4 border-green-500">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="text-green-600" size={20} />
          Números em Comum
        </h3>
        <p className="text-slate-600 text-sm">{similarities.description}</p>
        {similarities.sameNumbers.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {similarities.sameNumbers.map((num, idx) => (
              <div
                key={idx}
                className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
              >
                <p className="text-xs text-green-600 font-semibold mb-1">Número Comum</p>
                <p className="number-mystical text-3xl text-green-600">{num}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 text-sm italic">Nenhum número em comum</p>
        )}
      </div>

      {/* Diferenças */}
      <div className="card-mystical space-y-4 border-l-4 border-amber-500">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <AlertCircle className="text-amber-600" size={20} />
          Diferenças Identificadas
        </h3>
        <p className="text-slate-600 text-sm">{differences.description}</p>
        {differences.differentNumbers.length > 0 ? (
          <div className="space-y-3">
            {differences.differentNumbers.map((diff, idx) => (
              <div
                key={idx}
                className="bg-amber-50 border border-amber-200 rounded-lg p-4"
              >
                <p className="text-xs text-amber-600 font-semibold mb-3">{diff.position}</p>
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="text-xs text-slate-600 mb-1">{map1.chart.fullName}</p>
                    <p className="number-mystical text-2xl text-amber-600">{diff.map1Value}</p>
                  </div>
                  <div className="px-4 text-slate-400">vs</div>
                  <div className="text-center flex-1">
                    <p className="text-xs text-slate-600 mb-1">{map2.chart.fullName}</p>
                    <p className="number-mystical text-2xl text-amber-600">{diff.map2Value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 text-sm italic">Nenhuma diferença</p>
        )}
      </div>

      {/* Análise Detalhada */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Mapa 1 */}
        <div className="card-mystical space-y-4 bg-indigo-50 border-indigo-200">
          <h3 className="font-bold text-indigo-900">{map1.chart.fullName}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Caminho de Destino</span>
              <span className="number-mystical text-2xl">{map1.chart.cd}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Motivação</span>
              <span className="number-mystical text-2xl">{map1.chart.mo}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Expressão</span>
              <span className="number-mystical text-2xl">{map1.chart.ex}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-indigo-200">
              <span className="text-slate-700 font-semibold">Mérito</span>
              <span className="number-mystical text-2xl">{map1.chart.merito}</span>
            </div>
          </div>
        </div>

        {/* Mapa 2 */}
        <div className="card-mystical space-y-4 bg-purple-50 border-purple-200">
          <h3 className="font-bold text-purple-900">{map2.chart.fullName}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Caminho de Destino</span>
              <span className="number-mystical text-2xl">{map2.chart.cd}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Motivação</span>
              <span className="number-mystical text-2xl">{map2.chart.mo}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Expressão</span>
              <span className="number-mystical text-2xl">{map2.chart.ex}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-purple-200">
              <span className="text-slate-700 font-semibold">Mérito</span>
              <span className="number-mystical text-2xl">{map2.chart.merito}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interpretação */}
      <div className="card-mystical space-y-4 bg-gradient-to-br from-slate-50 to-slate-100">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="text-slate-600" size={20} />
          Interpretação da Compatibilidade
        </h3>
        <div className="space-y-3 text-slate-700">
          {compatibility.score >= 80 && (
            <>
              <p>
                <strong>Altíssima Compatibilidade:</strong> Estes mapas compartilham vibrações muito similares.
                Existe grande potencial de entendimento mútuo, valores alinhados e objetivos comuns.
              </p>
              <p>
                As pessoas com estes mapas tendem a se compreender naturalmente, com poucos conflitos relacionados
                às diferenças numerológicas.
              </p>
            </>
          )}
          {compatibility.score >= 60 && compatibility.score < 80 && (
            <>
              <p>
                <strong>Boa Compatibilidade:</strong> Existem muitos pontos em comum entre os mapas.
                As pessoas podem trabalhar bem juntas e construir relacionamentos sólidos.
              </p>
              <p>
                Algumas diferenças podem gerar aprendizado mútuo, desde que haja disposição para compreender
                as perspectivas diferentes.
              </p>
            </>
          )}
          {compatibility.score >= 40 && compatibility.score < 60 && (
            <>
              <p>
                <strong>Compatibilidade Moderada:</strong> Há diferenças significativas entre os mapas.
                Isso não impede relacionamentos positivos, mas requer maior compreensão e adaptação.
              </p>
              <p>
                As diferenças podem ser fontes de conflito ou de crescimento, dependendo da disposição
                de ambas as partes em trabalhar as divergências.
              </p>
            </>
          )}
          {compatibility.score < 40 && (
            <>
              <p>
                <strong>Compatibilidade Baixa:</strong> Os mapas apresentam vibrações muito diferentes.
                Isso significa que as pessoas têm necessidades, valores e formas de agir bastante distintas.
              </p>
              <p>
                Relacionamentos com baixa compatibilidade requerem muito trabalho consciente e compreensão
                para funcionar harmoniosamente.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
