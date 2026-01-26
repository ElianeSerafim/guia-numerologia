import { NumerologyChart } from '@/types';
import { ArrowRight, Zap } from 'lucide-react';

interface TastingProps {
  chart: NumerologyChart;
  onViewFullMap: () => void;
}

/**
 * Componente de Degustação
 * Mostra uma prévia do mapa numerológico com:
 * - Caminho do Destino (CD)
 * - Ciclo de Vida Atual (CV)
 */
export default function Tasting({ chart, onViewFullMap }: TastingProps) {
  // Calcular ciclo de vida baseado na idade
  const birthYear = parseInt(chart.birthDate.split('/')[2]);
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  let cycleInfo = {
    name: '',
    description: '',
    ageRange: '',
    vibration: 0
  };

  if (age < 29) {
    cycleInfo = {
      name: '1º Ciclo (Formativo)',
      description: 'Período de aprendizado e construção de bases. Você está desenvolvendo suas habilidades e compreendendo o mundo.',
      ageRange: `0 - 28 anos (Você tem ${age} anos)`,
      vibration: chart.mo // Motivação = 1º Ciclo
    };
  } else if (age < 56) {
    cycleInfo = {
      name: '2º Ciclo (Produtivo)',
      description: 'Período mais importante da vida. É hora de aplicar o que aprendeu e conquistar seu espaço no mundo.',
      ageRange: `29 - 56 anos (Você tem ${age} anos)`,
      vibration: chart.eu // Expressão = 2º Ciclo
    };
  } else {
    cycleInfo = {
      name: '3º Ciclo (Colheita)',
      description: 'Período de colheita e sabedoria. Você colhe os frutos do que plantou e compartilha sua experiência.',
      ageRange: `Acima de 56 anos (Você tem ${age} anos)`,
      vibration: chart.merito // Mérito = 3º Ciclo
    };
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-[#19E6FF]">
          Sua Degustação Numerológica
        </h2>
        <p className="text-[#C8A2E0]">
          Veja uma prévia dos mistérios revelados em seu mapa completo
        </p>
      </div>

      {/* Caminho do Destino */}
      <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border border-purple-500/30 rounded-2xl p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-[#F3D5FF]">Seu Caminho do Destino</h3>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{chart.cd}</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[#C8A2E0]">
            <span className="font-semibold">Número {chart.cd}</span> - Sua missão de vida é regida pelo Arquétipo do <span className="font-bold text-[#19E6FF]">Construtor</span>.
          </p>
          <p className="text-[#B8A2D0] text-sm leading-relaxed">
            Você é chamado a construir bases sólidas, criar estruturas duráveis e deixar um legado tangível. Sua jornada envolve disciplina, responsabilidade e a capacidade de transformar visões em realidade. O desafio é aprender a equilibrar o rigor com a flexibilidade.
          </p>
        </div>
      </div>

      {/* Ciclo de Vida Atual */}
      <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-2xl p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-[#F3D5FF]">Seu Ciclo Atual</h3>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{cycleInfo.vibration}</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[#C8A2E0]">
            <span className="font-semibold">{cycleInfo.name}</span>
          </p>
          <p className="text-[#B8A2D0] text-sm">{cycleInfo.ageRange}</p>
          <p className="text-[#B8A2D0] text-sm leading-relaxed">
            {cycleInfo.description}
          </p>
          <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-200 text-sm">
              <span className="font-semibold">💡 Vibração Vigente:</span> A energia {cycleInfo.vibration} está regendo este período da sua vida.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex flex-col gap-4">
        <button
          onClick={onViewFullMap}
          className="w-full bg-gradient-to-r from-[#00FFFF] to-[#19E6FF] text-[#07131B] px-6 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all button-glow neon-pulse flex items-center justify-center gap-2"
        >
          <Zap size={20} />
          Veja Seu Mapa Completo
        </button>
        <p className="text-center text-[#B8A2D0] text-sm">
          Desbloqueie interpretações completas, ciclos trimestrais, desafios e realizações com um de nossos planos.
        </p>
      </div>
    </div>
  );
}
