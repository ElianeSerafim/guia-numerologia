import { useState } from 'react';
import { getChallengeNumber } from '@/lib/cyclesAndChallenges';
import { getChallengeInterpretation } from '@/lib/cyclesInterpretations';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ChallengesInteractiveProps {
  birthDate: string;
}

type ChallengeType = 'd1' | 'd2' | 'dm';

const challengeInfo: Record<ChallengeType, { label: string; age: string; color: string; description: string }> = {
  d1: { 
    label: 'D1 - 1º Desafio Menor', 
    age: '0-28 anos', 
    color: 'from-orange-600 to-orange-400',
    description: 'Primeiro aprendizado fundamental'
  },
  d2: { 
    label: 'D2 - 2º Desafio Menor', 
    age: '29-56 anos', 
    color: 'from-red-600 to-red-400',
    description: 'Aprendizado intermediário'
  },
  dm: { 
    label: 'DM - Desafio Maior', 
    age: 'Toda a vida', 
    color: 'from-pink-600 to-pink-400',
    description: 'Aprendizado principal (MAIS IMPORTANTE)'
  },
};

export function ChallengesInteractive({ birthDate }: ChallengesInteractiveProps) {
  const [expandedChallenge, setExpandedChallenge] = useState<ChallengeType | null>(null);

  const challenges = {
    d1: getChallengeNumber(birthDate, 'd1'),
    d2: getChallengeNumber(birthDate, 'd2'),
    dm: getChallengeNumber(birthDate, 'dm'),
  };

  const toggleExpand = (challenge: ChallengeType) => {
    setExpandedChallenge(expandedChallenge === challenge ? null : challenge);
  };

  return (
    <div className="space-y-4">
      {(Object.keys(challengeInfo) as ChallengeType[]).map((challenge) => {
        const info = challengeInfo[challenge];
        const number = challenges[challenge];
        const isExpanded = expandedChallenge === challenge;
        const challengeTypeMap: Record<ChallengeType, 'D1' | 'D2' | 'DM'> = { d1: 'D1', d2: 'D2', dm: 'DM' };
        const interpretationText = getChallengeInterpretation(number, challengeTypeMap[challenge]);
        const isMostImportant = challenge === 'dm';

        return (
          <button
            key={challenge}
            onClick={() => toggleExpand(challenge)}
            className="w-full text-left transition-all duration-300"
          >
            <div
              className={`bg-gradient-to-br ${info.color} p-0.5 rounded-xl transition-all duration-300 ${
                isExpanded ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="bg-[#190825] rounded-lg p-4 md:p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        {info.label}
                      </h3>
                      {isMostImportant && (
                        <span className="text-xs font-bold bg-[#D4AF37] text-[#190825] px-2 py-1 rounded">
                          ⭐ IMPORTANTE
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-slate-400 mb-2">
                      {info.age}
                    </p>
                    <p className="text-xs text-slate-500">{info.description}</p>
                  </div>
                  <div className="ml-4">
                    <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">
                      {number}
                    </div>
                  </div>
                  <div className="text-slate-400 transition-transform duration-300 ml-2">
                    {isExpanded ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && interpretationText && (
                  <div className="mt-4 pt-4 border-t border-[#4A2A6A] space-y-4 animate-in fade-in duration-300">
                    <div>
                      <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                        Interpretação
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {interpretationText}
                      </p>
                    </div>
                  </div>
                )}

                {/* Hover hint */}
                {!isExpanded && (
                  <div className="text-xs text-slate-500 mt-3 group-hover:text-[#D4AF37] transition-colors">
                    Clique para expandir
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
