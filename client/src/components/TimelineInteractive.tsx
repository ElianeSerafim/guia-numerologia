import { useState } from 'react';
import { getCycleNumber, getCurrentCycle, getChallengeNumber } from '@/lib/cyclesAndChallenges';
import { getLifeCycleInterpretation, getChallengeInterpretation } from '@/lib/cyclesInterpretations';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TimelineInteractiveProps {
  birthDate: string;
}

type ItemType = 'c1' | 'c2' | 'c3' | 'd1' | 'd2' | 'dm';

interface TimelineItem {
  id: ItemType;
  label: string;
  definition: string;
  age: string;
  color: string;
  icon: string;
  type: 'cycle' | 'challenge';
}

const timelineItems: TimelineItem[] = [
  // Ciclos de Vida
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
  // Desafios
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

export function TimelineInteractive({ birthDate }: TimelineInteractiveProps) {
  const [expandedItem, setExpandedItem] = useState<ItemType | null>(null);

  // Calcular números dos ciclos e desafios
  const numbers: Record<ItemType, number> = {
    c1: getCycleNumber(birthDate, 'c1'),
    c2: getCycleNumber(birthDate, 'c2'),
    c3: getCycleNumber(birthDate, 'c3'),
    d1: getChallengeNumber(birthDate, 'd1'),
    d2: getChallengeNumber(birthDate, 'd2'),
    dm: getChallengeNumber(birthDate, 'dm'),
  };

  const currentCycle = getCurrentCycle(birthDate);

  const getInterpretation = (item: TimelineItem): string => {
    if (item.type === 'cycle') {
      const cycleMap: Record<string, 'C1' | 'C2' | 'C3'> = { c1: 'C1', c2: 'C2', c3: 'C3' };
      return getLifeCycleInterpretation(numbers[item.id], cycleMap[item.id]) || '';
    } else {
      const challengeMap: Record<string, 'D1' | 'D2' | 'DM'> = { d1: 'D1', d2: 'D2', dm: 'DM' };
      return getChallengeInterpretation(numbers[item.id], challengeMap[item.id]) || '';
    }
  };

  const toggleExpand = (id: ItemType) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const isCurrent = (item: TimelineItem): boolean => {
    if (item.type === 'cycle') {
      return currentCycle === item.id;
    }
    // Para desafios, D1 é atual se ciclo atual é c1, D2 se c2, DM sempre relevante
    if (item.id === 'dm') return true;
    if (item.id === 'd1' && currentCycle === 'c1') return true;
    if (item.id === 'd2' && currentCycle === 'c2') return true;
    return false;
  };

  return (
    <div className="space-y-8">
      {/* Ciclos de Vida */}
      <div>
        <h4 className="text-lg font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
          <span className="text-2xl">🔄</span>
          Ciclos de Vida
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {timelineItems.filter(item => item.type === 'cycle').map((item) => {
            const isExpanded = expandedItem === item.id;
            const number = numbers[item.id];
            const interpretation = getInterpretation(item);
            const isCurrentItem = isCurrent(item);

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
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-sm font-bold text-white">{item.label}</span>
                        </div>
                        <p className="text-xs text-slate-400">{item.age}</p>
                        {isCurrentItem && (
                          <span className="inline-block mt-2 text-xs font-semibold text-[#D4AF37] bg-[#4A2A6A] rounded px-2 py-0.5">
                            Atual
                          </span>
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
                            <h5 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-1">
                              ✓ Interpretação Resumida
                            </h5>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {interpretation}
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

      {/* Desafios */}
      <div>
        <h4 className="text-lg font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Desafios de Vida
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {timelineItems.filter(item => item.type === 'challenge').map((item) => {
            const isExpanded = expandedItem === item.id;
            const number = numbers[item.id];
            const interpretation = getInterpretation(item);
            const isCurrentItem = isCurrent(item);
            const isMostImportant = item.id === 'dm';

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
                        <div className="flex items-center gap-2 mb-1">
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
                            <h5 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                              ⚠️ Interpretação Resumida
                            </h5>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {interpretation}
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
    </div>
  );
}
