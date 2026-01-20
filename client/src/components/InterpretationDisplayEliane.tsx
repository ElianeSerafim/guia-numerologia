import { getInterpretation, isRealizacaoLegado, getLegadoType, getLegadoInterpretation, isGrandeAmorPresente, calcularGrandeAmor, getGrandeAmorInterpretation, getGrandeAmorRenascimentoNota } from '@/lib/interpretationsEliane';
import { NumerologyChart } from '@/types';
import { BookOpen, Lightbulb, Heart, Users, Brain, Zap, Compass } from 'lucide-react';

interface InterpretationDisplayElianeProps {
  chart: NumerologyChart;
}

/**
 * InterpretationDisplayEliane Component
 * 
 * Exibe as interpretações completas dos números do mapa numerológico
 * baseado na metodologia de Eliane Serafim (Numerologia Pitagórica Terapêutica)
 * 
 * Estrutura:
 * - CD: Caminho do Destino
 * - MO: Motivação
 * - EU: Eu Íntimo
 * - EX: Expressão
 * - DM: Desafio Maior
 * - ME: Mérito
 * - R1-R4: Realizações
 * - CV: Ciclos de Vida
 */

const positionConfig = [
  {
    key: 'cd',
    label: 'Caminho do Destino',
    icon: Compass,
    color: 'from-blue-600 to-blue-700',
    description: 'Sua missão de vida e propósito'
  },
  {
    key: 'mo',
    label: 'Motivação',
    icon: Zap,
    color: 'from-yellow-600 to-yellow-700',
    description: 'O que move suas escolhas'
  },
  {
    key: 'eu',
    label: 'Eu Íntimo',
    icon: Heart,
    color: 'from-pink-600 to-pink-700',
    description: 'Seu sonho íntimo e desejo profundo'
  },
  {
    key: 'ex',
    label: 'Expressão',
    icon: Users,
    color: 'from-purple-600 to-purple-700',
    description: 'Como o mundo te vê'
  },
  {
    key: 'dm',
    label: 'Desafio Maior',
    icon: Brain,
    color: 'from-orange-600 to-orange-700',
    description: 'Seu grande aprendizado'
  },
  {
    key: 'me',
    label: 'Mérito',
    icon: Lightbulb,
    color: 'from-green-600 to-green-700',
    description: 'Sua força conquistada'
  }
];

export default function InterpretationDisplayEliane({ chart }: InterpretationDisplayElianeProps) {
  const positions = [
    { key: 'cd', value: chart.cd },
    { key: 'mo', value: chart.mo },
    { key: 'eu', value: chart.eu },
    { key: 'ex', value: chart.ex },
    { key: 'dm', value: chart.desafios?.dm },
    { key: 'me', value: chart.merito }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Seu Mapa Numerológico</h2>
        <p className="text-slate-400">
          Interpretações baseadas na Numerologia Pitagórica Terapêutica de Eliane Serafim
        </p>
      </div>

      {/* Posições Principais */}
      <div className="space-y-6">
        {positions.map((item) => {
          if (!item.value) return null;

          const interpretation = getInterpretation(item.value);
          const config = positionConfig.find(c => c.key === item.key);

          if (!interpretation || !config) return null;

          const Icon = config.icon;
          const positionText = interpretation.positions[item.key as keyof typeof interpretation.positions];

          return (
            <div
              key={item.key}
              className="card-mystical space-y-4 border-l-4 border-indigo-600 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${config.color}`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{config.label}</h3>
                    <p className="text-sm text-slate-400">{config.description}</p>
                  </div>
                </div>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">
                  {item.value}
                </div>
              </div>

              {/* Número Nome */}
              <div className="bg-indigo-50/10 rounded-lg p-3 border border-indigo-500/20">
                <p className="text-indigo-300 text-sm font-semibold">{interpretation.name}</p>
              </div>

              {/* Essência */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{interpretation.essence}"
                </p>
              </div>

              {/* Interpretação da Posição */}
              {positionText && (
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                  <p className="text-white text-sm leading-relaxed">
                    {positionText}
                  </p>
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-indigo-600 to-transparent"></div>
            </div>
          );
        })}
      </div>

      {/* Realizações */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white">Ciclos de Realização</h3>
        <p className="text-slate-400 text-sm">
          As fases de sua vida e os aprendizados de cada período
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { key: 'r1', label: 'Realização 1 (0-28 anos)', desc: 'Ciclo Formativo' },
            { key: 'r2', label: 'Realização 2 (29-56 anos)', desc: 'Ciclo de Maturidade' },
            { key: 'r3', label: 'Realização 3 (57-84 anos)', desc: 'Ciclo de Plenitude' },
            { key: 'r4', label: 'Realização 4 (85+ anos)', desc: 'Ciclo Final' }
          ].map((cycle) => {
            const realizacaoNumber = cycle.key === 'r1' ? chart.r1 : cycle.key === 'r2' ? chart.r2 : cycle.key === 'r3' ? chart.r3 : chart.r4;
            const interpretation = getInterpretation(realizacaoNumber);
            const cycleText = interpretation?.positions[cycle.key as keyof typeof interpretation.positions];
            
            // Detectar se eh uma Realizacao de Legado
            const isLegado = isRealizacaoLegado(realizacaoNumber, chart.mo, chart.cd, chart.merito);
            const legadoType = getLegadoType(realizacaoNumber, chart.mo, chart.cd, chart.merito);
            const legadoText = getLegadoInterpretation(realizacaoNumber);
            
            // Detectar Grande Amor (quando R = 6)
            const isGrandeAmor = realizacaoNumber === 6;
            const grandeAmorInfo = isGrandeAmor ? calcularGrandeAmor(chart.r1, chart.r2, chart.r3, chart.r4) : null;
            const grandeAmorText = grandeAmorInfo ? getGrandeAmorInterpretation(grandeAmorInfo) : '';
            const grandeAmorRenascimentoNota = grandeAmorInfo ? getGrandeAmorRenascimentoNota(chart.r1, chart.r2, chart.r3, chart.r4) : '';

            return (
              <div
                key={cycle.key}
                className={`card-mystical space-y-3 border-l-4 ${
                  isGrandeAmor ? 'border-pink-500 bg-pink-500/5' : isLegado ? 'border-yellow-500 bg-yellow-500/5' : 'border-purple-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white">{cycle.label}</h4>
                      <p className="text-xs text-slate-400">{cycle.desc}</p>
                    </div>
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                      {realizacaoNumber}
                    </div>
                  </div>
                  
                  {isGrandeAmor && (
                    <div className="mt-2 px-3 py-1 bg-pink-500/20 border border-pink-500/50 rounded text-pink-300 text-xs font-semibold">
                      💕 Grande Amor - Duração: {grandeAmorInfo?.duracao} anos {grandeAmorInfo?.ehDefinitivo ? '(Possível permanência definitiva)' : ''}
                    </div>
                  )}
                  
                  {isLegado && (
                    <div className="mt-2 px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded text-yellow-300 text-xs font-semibold">
                      ⭐ Realizacao de Legado ({legadoType})
                    </div>
                  )}
                </div>

                {cycleText && (
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {cycleText}
                  </p>
                )}
                
                {isGrandeAmor && grandeAmorText && (
                  <div className="bg-pink-500/10 rounded-lg p-4 border border-pink-500/30 mt-3">
                    <p className="text-pink-200 text-sm leading-relaxed">
                      {grandeAmorText}
                    </p>
                  </div>
                )}
                
                {isLegado && legadoText && (
                  <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/30 mt-3">
                    <p className="text-yellow-200 text-sm leading-relaxed italic">
                      <span className="font-semibold">Legado:</span> {legadoText}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Ciclos de Vida */}
      <div className="card-mystical space-y-4 border-l-4 border-green-600">
        <h3 className="text-xl font-bold text-white">Ciclos de Vida</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          {getInterpretation(chart.cd)?.positions.cv}
        </p>
      </div>

      {/* Nota Final */}
      <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-lg p-6 border border-indigo-500/20">
        <p className="text-slate-300 text-sm leading-relaxed">
          <span className="font-semibold text-indigo-300">Lembre-se:</span> A Numerologia é uma ferramenta de autoconhecimento e clareza, não de previsão mística. 
          Use essas interpretações para compreender melhor seus ciclos, potenciais e desafios, e para tomar decisões mais conscientes e alinhadas com seu propósito.
        </p>
      </div>
    </div>
  );
}
