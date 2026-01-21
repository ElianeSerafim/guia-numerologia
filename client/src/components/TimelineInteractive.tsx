import { useState } from 'react';
import { NumerologyChart } from '@/types';
import { getCycleNumber, getCurrentCycle, getChallengeNumber } from '@/lib/cyclesAndChallenges';
import { getLifeCycleInterpretation, getChallengeInterpretation } from '@/lib/cyclesInterpretations';
import { getInterpretation, isRealizacaoLegado, getLegadoType, getLegadoInterpretation, calcularGrandeAmor, getGrandeAmorInterpretation } from '@/lib/interpretationsEliane';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TimelineInteractiveProps {
  birthDate: string;
  chart?: NumerologyChart;
}

type ItemType = 'c1' | 'c2' | 'c3' | 'd1' | 'd2' | 'dm' | 'r1' | 'r2' | 'r3' | 'r4';

interface TimelineItem {
  id: ItemType;
  label: string;
  definition: string;
  age: string;
  color: string;
  icon: string;
  type: 'cycle' | 'challenge' | 'realization';
}

const cycleItems: TimelineItem[] = [
  { 
    id: 'c1',
    label: 'C1 - Ciclo Formativo', 
    definition: 'Fase de formação, aprendizado inicial e descoberta de identidade',
    age: '0-28 anos', 
    color: 'from-blue-600 to-blue-400', 
    icon: '🌱',
    type: 'cycle'
  },
  { 
    id: 'c2',
    label: 'C2 - Ciclo Produtivo', 
    definition: 'Fase de produção, realização profissional e construção de vida',
    age: '29-56 anos', 
    color: 'from-green-600 to-green-400', 
    icon: '🌿',
    type: 'cycle'
  },
  { 
    id: 'c3',
    label: 'C3 - Ciclo de Colheita', 
    definition: 'Fase de colheita, sabedoria acumulada e legado de vida',
    age: '57+ anos', 
    color: 'from-amber-600 to-amber-400', 
    icon: '🌳',
    type: 'cycle'
  },
];

const challengeItems: TimelineItem[] = [
  { 
    id: 'd1',
    label: 'D1 - 1º Desafio', 
    definition: 'Primeiro aprendizado fundamental da juventude',
    age: '0-28 anos', 
    color: 'from-orange-600 to-orange-400', 
    icon: '⚡',
    type: 'challenge'
  },
  { 
    id: 'd2',
    label: 'D2 - 2º Desafio', 
    definition: 'Aprendizado intermediário da maturidade',
    age: '29-56 anos', 
    color: 'from-red-600 to-red-400', 
    icon: '🔥',
    type: 'challenge'
  },
  { 
    id: 'dm',
    label: 'DM - Desafio Maior', 
    definition: 'Aprendizado principal que acompanha toda a vida',
    age: 'Toda a vida', 
    color: 'from-pink-600 to-pink-400', 
    icon: '⭐',
    type: 'challenge'
  },
];

const realizationItems: TimelineItem[] = [
  { 
    id: 'r1',
    label: 'R1 - 1ª Realização', 
    definition: 'Ciclo formativo - período de aprendizado e descoberta',
    age: '0-28 anos', 
    color: 'from-purple-600 to-purple-400', 
    icon: '🎯',
    type: 'realization'
  },
  { 
    id: 'r2',
    label: 'R2 - 2ª Realização', 
    definition: 'Ciclo de maturidade - período de construção e consolidação',
    age: '29-56 anos', 
    color: 'from-indigo-600 to-indigo-400', 
    icon: '🏆',
    type: 'realization'
  },
  { 
    id: 'r3',
    label: 'R3 - 3ª Realização', 
    definition: 'Ciclo de plenitude - período de colheita e sabedoria',
    age: '57-84 anos', 
    color: 'from-violet-600 to-violet-400', 
    icon: '👑',
    type: 'realization'
  },
  { 
    id: 'r4',
    label: 'R4 - 4ª Realização', 
    definition: 'Ciclo final - período de legado e transcendência',
    age: '85+ anos', 
    color: 'from-fuchsia-600 to-fuchsia-400', 
    icon: '✨',
    type: 'realization'
  },
];

export function TimelineInteractive({ birthDate, chart }: TimelineInteractiveProps) {
  const [expandedItem, setExpandedItem] = useState<ItemType | null>(null);

  // Calcular números dos ciclos e desafios
  const cycleNumbers: Record<'c1' | 'c2' | 'c3', number> = {
    c1: getCycleNumber(birthDate, 'c1'),
    c2: getCycleNumber(birthDate, 'c2'),
    c3: getCycleNumber(birthDate, 'c3'),
  };

  const challengeNumbers: Record<'d1' | 'd2' | 'dm', number> = {
    d1: getChallengeNumber(birthDate, 'd1'),
    d2: getChallengeNumber(birthDate, 'd2'),
    dm: getChallengeNumber(birthDate, 'dm'),
  };

  // Números das realizações (se chart disponível)
  const realizationNumbers: Record<'r1' | 'r2' | 'r3' | 'r4', number> = {
    r1: chart?.r1 || 0,
    r2: chart?.r2 || 0,
    r3: chart?.r3 || 0,
    r4: chart?.r4 || 0,
  };

  const currentCycle = getCurrentCycle(birthDate);

  const getNumber = (id: ItemType): number => {
    if (id in cycleNumbers) return cycleNumbers[id as 'c1' | 'c2' | 'c3'];
    if (id in challengeNumbers) return challengeNumbers[id as 'd1' | 'd2' | 'dm'];
    if (id in realizationNumbers) return realizationNumbers[id as 'r1' | 'r2' | 'r3' | 'r4'];
    return 0;
  };

  const getCycleInterpretationText = (item: TimelineItem): string => {
    const number = getNumber(item.id);
    if (item.type === 'cycle') {
      const cycleMap: Record<string, 'C1' | 'C2' | 'C3'> = { c1: 'C1', c2: 'C2', c3: 'C3' };
      return getLifeCycleInterpretation(number, cycleMap[item.id]) || '';
    } else if (item.type === 'challenge') {
      const challengeMap: Record<string, 'D1' | 'D2' | 'DM'> = { d1: 'D1', d2: 'D2', dm: 'DM' };
      return getChallengeInterpretation(number, challengeMap[item.id]) || '';
    } else if (item.type === 'realization') {
      const interpretation = getInterpretation(number);
      const posKey = item.id as 'r1' | 'r2' | 'r3' | 'r4';
      return interpretation?.positions[posKey] || '';
    }
    return '';
  };

  const toggleExpand = (id: ItemType) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const isCurrent = (item: TimelineItem): boolean => {
    if (item.type === 'cycle') {
      return currentCycle === item.id;
    }
    if (item.type === 'challenge') {
      if (item.id === 'dm') return true;
      if (item.id === 'd1' && currentCycle === 'c1') return true;
      if (item.id === 'd2' && currentCycle === 'c2') return true;
    }
    if (item.type === 'realization') {
      if (item.id === 'r1' && currentCycle === 'c1') return true;
      if (item.id === 'r2' && currentCycle === 'c2') return true;
      if (item.id === 'r3' && currentCycle === 'c3') return true;
    }
    return false;
  };

  // Verificar se é Legado ou Grande Amor
  const getSpecialBadge = (item: TimelineItem): { type: string; text: string; color: string } | null => {
    if (item.type !== 'realization' || !chart) return null;
    
    const number = getNumber(item.id);
    
    // Grande Amor (R = 6)
    if (number === 6) {
      const grandeAmorInfo = calcularGrandeAmor(chart.r1, chart.r2, chart.r3, chart.r4);
      if (grandeAmorInfo) {
        return {
          type: 'grandeAmor',
          text: `💕 Grande Amor - ${grandeAmorInfo.duracao} anos`,
          color: 'bg-pink-500/20 border-pink-500/50 text-pink-300'
        };
      }
    }
    
    // Legado
    if (isRealizacaoLegado(number, chart.mo, chart.cd, chart.merito)) {
      const legadoType = getLegadoType(number, chart.mo, chart.cd, chart.merito);
      return {
        type: 'legado',
        text: `⭐ Legado (${legadoType})`,
        color: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300'
      };
    }
    
    return null;
  };

  const renderSection = (title: string, icon: string, items: TimelineItem[], gridCols: string = 'md:grid-cols-3') => (
    <div>
      <h4 className="text-lg font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        {title}
      </h4>
      <div className={`grid grid-cols-1 ${gridCols} gap-4`}>
        {items.map((item) => {
          const isExpanded = expandedItem === item.id;
          const number = getNumber(item.id);
          const interpretation = getCycleInterpretationText(item);
          const isCurrentItem = isCurrent(item);
          const isMostImportant = item.id === 'dm';
          const specialBadge = getSpecialBadge(item);

          return (
            <button
              key={item.id}
              onClick={() => toggleExpand(item.id)}
              className="w-full text-left transition-all duration-300"
            >
              <div
                className={`bg-gradient-to-br ${item.color} p-0.5 rounded-xl transition-all duration-300 ${
                  isExpanded ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="bg-[#190825] rounded-lg p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm font-bold text-white">{item.label}</span>
                        {isMostImportant && (
                          <span className="text-xs font-bold bg-[#D4AF37] text-[#190825] px-1.5 py-0.5 rounded">
                            IMPORTANTE
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{item.age}</p>
                      {isCurrentItem && !isMostImportant && (
                        <span className="inline-block mt-2 text-xs font-semibold text-[#D4AF37] bg-[#4A2A6A] rounded px-2 py-0.5">
                          Atual
                        </span>
                      )}
                      {specialBadge && (
                        <div className={`mt-2 px-2 py-1 ${specialBadge.color} border rounded text-xs font-semibold`}>
                          {specialBadge.text}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">
                        {number}
                      </div>
                      <div className="text-slate-400">
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {/* Collapsed hint */}
                  {!isExpanded && (
                    <p className="text-xs text-slate-500 mt-2">Clique para expandir</p>
                  )}

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-[#4A2A6A] space-y-3 animate-in fade-in duration-300">
                      <div>
                        <h5 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                          Definição
                        </h5>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {item.definition}
                        </p>
                      </div>
                      {interpretation && (
                        <div>
                          <h5 className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                            item.type === 'challenge' ? 'text-red-400' : 
                            item.type === 'realization' ? 'text-purple-400' : 'text-green-400'
                          }`}>
                            {item.type === 'challenge' ? '⚠️' : item.type === 'realization' ? '🎯' : '✓'} Interpretação Resumida
                          </h5>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {interpretation}
                          </p>
                        </div>
                      )}
                      {/* Legado extra info */}
                      {specialBadge?.type === 'legado' && chart && (
                        <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/30">
                          <p className="text-yellow-200 text-xs leading-relaxed italic">
                            <span className="font-semibold">Legado:</span> {getLegadoInterpretation(number)}
                          </p>
                        </div>
                      )}
                      {/* Grande Amor extra info */}
                      {specialBadge?.type === 'grandeAmor' && chart && (
                        <div className="bg-pink-500/10 rounded-lg p-3 border border-pink-500/30">
                          <p className="text-pink-200 text-xs leading-relaxed">
                            {getGrandeAmorInterpretation(calcularGrandeAmor(chart.r1, chart.r2, chart.r3, chart.r4))}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Ciclos de Vida */}
      {renderSection('Ciclos de Vida', '🔄', cycleItems)}

      {/* Ciclos de Realização */}
      {chart && renderSection('Ciclos de Realização', '🏆', realizationItems, 'md:grid-cols-4')}

      {/* Desafios */}
      {renderSection('Desafios de Vida', '🎯', challengeItems)}
    </div>
  );
}
