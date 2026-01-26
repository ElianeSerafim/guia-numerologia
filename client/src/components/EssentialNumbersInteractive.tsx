import { useState } from 'react';
import { NumerologyChart } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getInterpretation } from '@/lib/interpretationsEliane';

interface EssentialNumbersInteractiveProps {
  chart: NumerologyChart;
}

type NumberKey = 'cd' | 'mo' | 'eu' | 'ex' | 'dm' | 'me';

const numberLabels: Record<NumberKey, { label: string; fullLabel: string; color: string }> = {
  cd: { label: 'CD', fullLabel: 'Caminho do Destino', color: 'from-blue-600 to-blue-400' },
  mo: { label: 'MO', fullLabel: 'Motivação', color: 'from-purple-600 to-purple-400' },
  eu: { label: 'EU', fullLabel: 'Eu Íntimo', color: 'from-pink-600 to-pink-400' },
  ex: { label: 'EX', fullLabel: 'Expressão', color: 'from-green-600 to-green-400' },
  dm: { label: 'DM', fullLabel: 'Desafio Maior', color: 'from-red-600 to-red-400' },
  me: { label: 'ME', fullLabel: 'Mérito', color: 'from-yellow-600 to-yellow-400' },
};

export function EssentialNumbersInteractive({
  chart,
}: EssentialNumbersInteractiveProps) {
  const [expandedNumber, setExpandedNumber] = useState<NumberKey | null>(null);

  const numbers: Record<NumberKey, number> = {
    cd: chart.cd,
    mo: chart.mo,
    eu: chart.eu,
    ex: chart.ex,
    dm: chart.desafios.dm,
    me: chart.merito,
  };

  const toggleExpand = (key: NumberKey) => {
    setExpandedNumber(expandedNumber === key ? null : key);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {(Object.keys(numberLabels) as NumberKey[]).map((key) => {
          const number = numbers[key];
          const label = numberLabels[key];
          const isExpanded = expandedNumber === key;
          const interpretation = getInterpretation(number);

          return (
            <button
              key={key}
              onClick={() => toggleExpand(key)}
              className={`relative group transition-all duration-300 ${
                isExpanded ? 'md:col-span-3' : ''
              }`}
            >
              {/* Card Container */}
              <div
                className={`bg-gradient-to-br ${label.color} p-0.5 rounded-xl transition-all duration-300 ${
                  isExpanded ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="bg-[#07131B] rounded-lg p-4 md:p-6 h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#19E6FF] to-[#FFD700] mb-1">
                        {number}
                      </div>
                      <div className="text-xs md:text-sm font-semibold text-[#B8A8D8] uppercase tracking-wider">
                        {label.label}
                      </div>
                      <div className="text-xs md:text-sm text-slate-400 mt-1">
                        {label.fullLabel}
                      </div>
                    </div>
                    <div className="text-slate-400 transition-transform duration-300">
                      {isExpanded ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && interpretation && (
                    <div className="mt-4 pt-4 border-t border-[#1A3A4A] space-y-3 animate-in fade-in duration-300">
                      <div>
                        <h4 className="text-sm font-bold text-[#19E6FF] mb-2">
                          Essência
                        </h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {interpretation.essence}
                        </p>
                      </div>












                    </div>
                  )}

                  {/* Hover hint */}
                  {!isExpanded && (
                    <div className="text-xs text-slate-500 mt-2 group-hover:text-[#19E6FF] transition-colors">
                      Clique para expandir
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
}
