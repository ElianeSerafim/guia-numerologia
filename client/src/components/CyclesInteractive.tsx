import { useState } from 'react';
import { getCycleNumber, getCurrentCycle } from '@/lib/cyclesAndChallenges';
import { getLifeCycleInterpretation } from '@/lib/cyclesInterpretations';

interface CyclesInteractiveProps {
  birthDate: string;
}

type CycleType = 'c1' | 'c2' | 'c3';

const cycleInfo: Record<CycleType, { label: string; definition: string; age: string; color: string; icon: string }> = {
  c1: { 
    label: 'D1 - Primeiro Ciclo', 
    definition: 'Formação e aprendizado inicial da vida',
    age: '0-28 anos', 
    color: 'from-blue-600 to-blue-400', 
    icon: '🌱' 
  },
  c2: { 
    label: 'D2 - Segundo Ciclo', 
    definition: 'Produção, criação e realização pessoal',
    age: '29-56 anos', 
    color: 'from-green-600 to-green-400', 
    icon: '🌿' 
  },
  c3: { 
    label: 'D3 - Terceiro Ciclo', 
    definition: 'Colheita, sabedoria e legado de vida',
    age: '56+ anos', 
    color: 'from-amber-600 to-amber-400', 
    icon: '🌳' 
  },
};

export function CyclesInteractive({ birthDate }: CyclesInteractiveProps) {
  const [selectedCycle, setSelectedCycle] = useState<CycleType>('c1');

  const cycles = {
    c1: getCycleNumber(birthDate, 'c1'),
    c2: getCycleNumber(birthDate, 'c2'),
    c3: getCycleNumber(birthDate, 'c3'),
  };

  const currentCycle = getCurrentCycle(birthDate);
  const selectedNumber = cycles[selectedCycle];
  const cycleTypeMap: Record<CycleType, 'C1' | 'C2' | 'C3'> = { c1: 'C1', c2: 'C2', c3: 'C3' };
  const interpretationText = getLifeCycleInterpretation(selectedNumber, cycleTypeMap[selectedCycle]);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {(Object.keys(cycleInfo) as CycleType[]).map((cycle) => {
          const info = cycleInfo[cycle];
          const isSelected = selectedCycle === cycle;
          const isCurrent = currentCycle === cycle;

          return (
            <button
              key={cycle}
              onClick={() => setSelectedCycle(cycle)}
              className={`relative group transition-all duration-300`}
            >
              <div
                className={`bg-gradient-to-br ${info.color} p-0.5 rounded-lg transition-all duration-300 ${
                  isSelected ? 'shadow-lg' : 'shadow-md'
                }`}
              >
                <div
                  className={`bg-[#07131B] rounded-md p-3 md:p-4 transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-[#19E6FF]' : ''
                  }`}
                >
                  <div className="text-2xl mb-1">{info.icon}</div>
                  <div className="text-sm md:text-base font-bold text-white">
                    {info.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{info.age}</div>
                  {isCurrent && (
                    <div className="text-xs font-semibold text-[#19E6FF] mt-2 bg-[#1A3A4A] rounded px-2 py-1 inline-block">
                      Atual
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#1A3A4A] rounded-xl p-6 md:p-8 space-y-4">
        {/* Number */}
        <div className="flex items-center gap-4">
          <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#19E6FF] to-[#FFD700]">
            {selectedNumber}
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {cycleInfo[selectedCycle].label}
            </h3>
            <p className="text-slate-400">{cycleInfo[selectedCycle].age}</p>
          </div>
        </div>

        {/* Definition */}
        <div className="mt-6 pt-6 border-t border-[#1A3A4A]">
          <h4 className="text-sm font-bold text-[#19E6FF] uppercase tracking-wider mb-2">
            Definição
          </h4>
          <p className="text-slate-300 leading-relaxed">
            {cycleInfo[selectedCycle].definition}
          </p>
        </div>

        {/* Interpretation */}
        {interpretationText && (
          <div className="space-y-4 mt-6 pt-6 border-t border-[#1A3A4A]">
            <div>
              <h4 className="text-sm font-bold text-green-400 uppercase tracking-wider mb-2">
                ✓ Interpretação Resumida
              </h4>
              <p className="text-slate-300 leading-relaxed text-sm">
                {interpretationText}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
