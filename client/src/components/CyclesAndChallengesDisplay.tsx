import { useMemo } from 'react';
import {
  calculateFullCyclesAndChallenges,
  FullNumerologyData,
} from '@/lib/cyclesAndChallenges';
import {
  getLifeCycleInterpretation,
  getChallengeInterpretation,
  getAnnualYear2026Interpretation,
  lifeCycleInterpretations,
  challengeInterpretations,
} from '@/lib/cyclesInterpretations';

interface CyclesAndChallengesDisplayProps {
  birthDate: string;
}

export function CyclesAndChallengesDisplay({
  birthDate,
}: CyclesAndChallengesDisplayProps) {
  const data = useMemo(
    () => calculateFullCyclesAndChallenges(birthDate),
    [birthDate]
  );

  return (
    <div className="space-y-8">
      {/* CICLOS DE VIDA */}
      <section className="space-y-4">
        <div className="border-b-2 border-purple-600 pb-3">
          <h3 className="text-2xl font-bold text-white">🌱 Ciclos de Vida</h3>
          <p className="text-slate-400 text-sm mt-1">
            A vibração que guia cada fase da sua vida
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* C1 - Formativo */}
          <div className="card-mystical space-y-3 border-l-4 border-blue-500">
            <div>
              <h4 className="text-lg font-bold text-white">
                C1 - Formativo (0-28 anos)
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-300">
                    {data.lifeCycles.c1}
                  </span>
                </div>
                <p className="text-slate-300 text-sm">
                  {lifeCycleInterpretations[data.lifeCycles.c1]?.essence}
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {getLifeCycleInterpretation(data.lifeCycles.c1, 'C1')}
            </p>
            {data.lifeCycles.current === 'C1' && (
              <div className="mt-2 px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-blue-300 text-xs font-semibold">
                ✨ Você está neste ciclo agora
              </div>
            )}
          </div>

          {/* C2 - Produtivo */}
          <div className="card-mystical space-y-3 border-l-4 border-green-500">
            <div>
              <h4 className="text-lg font-bold text-white">
                C2 - Produtivo (29-56 anos)
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-green-300">
                    {data.lifeCycles.c2}
                  </span>
                </div>
                <p className="text-slate-300 text-sm">
                  {lifeCycleInterpretations[data.lifeCycles.c2]?.essence}
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {getLifeCycleInterpretation(data.lifeCycles.c2, 'C2')}
            </p>
            <div className="mt-2 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-300 text-xs font-semibold">
              ⭐ Ciclo Mais Importante
            </div>
            {data.lifeCycles.current === 'C2' && (
              <div className="mt-2 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-300 text-xs font-semibold">
                ✨ Você está neste ciclo agora
              </div>
            )}
          </div>

          {/* C3 - Colheita */}
          <div className="card-mystical space-y-3 border-l-4 border-amber-500">
            <div>
              <h4 className="text-lg font-bold text-white">
                C3 - Colheita (56+ anos)
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-amber-300">
                    {data.lifeCycles.c3}
                  </span>
                </div>
                <p className="text-slate-300 text-sm">
                  {lifeCycleInterpretations[data.lifeCycles.c3]?.essence}
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {getLifeCycleInterpretation(data.lifeCycles.c3, 'C3')}
            </p>
            {data.lifeCycles.current === 'C3' && (
              <div className="mt-2 px-3 py-1 bg-amber-500/20 border border-amber-500/50 rounded text-amber-300 text-xs font-semibold">
                ✨ Você está neste ciclo agora
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DESAFIOS DE VIDA */}
      <section className="space-y-4">
        <div className="border-b-2 border-red-600 pb-3">
          <h3 className="text-2xl font-bold text-white">⚔️ Desafios de Vida</h3>
          <p className="text-slate-400 text-sm mt-1">
            Aprendizados que você desenvolve ao longo da vida
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* D1 */}
          <div className="card-mystical space-y-3 border-l-4 border-orange-500">
            <div>
              <h4 className="text-lg font-bold text-white">
                D1 - 1º Desafio Menor (0-28 anos)
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-orange-300">
                    {data.challenges.d1}
                  </span>
                </div>
                <p className="text-slate-300 text-sm">
                  {challengeInterpretations[data.challenges.d1]?.essence}
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {getChallengeInterpretation(data.challenges.d1, 'D1')}
            </p>
          </div>

          {/* D2 */}
          <div className="card-mystical space-y-3 border-l-4 border-red-500">
            <div>
              <h4 className="text-lg font-bold text-white">
                D2 - 2º Desafio Menor (29-56 anos)
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-red-300">
                    {data.challenges.d2}
                  </span>
                </div>
                <p className="text-slate-300 text-sm">
                  {challengeInterpretations[data.challenges.d2]?.essence}
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {getChallengeInterpretation(data.challenges.d2, 'D2')}
            </p>
          </div>

          {/* DM */}
          <div className="card-mystical space-y-3 border-l-4 border-purple-600 bg-purple-600/10">
            <div>
              <h4 className="text-lg font-bold text-white">
                DM - Desafio Maior (Toda a vida)
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center">
                  <span className="text-lg font-bold text-purple-300">
                    {data.challenges.dm}
                  </span>
                </div>
                <p className="text-slate-300 text-sm">
                  {challengeInterpretations[data.challenges.dm]?.essence}
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {getChallengeInterpretation(data.challenges.dm, 'DM')}
            </p>
            <div className="mt-2 px-3 py-1 bg-purple-600/20 border border-purple-600/50 rounded text-purple-300 text-xs font-semibold">
              ⭐ Seu Maior Desafio
            </div>
          </div>
        </div>
      </section>

      {/* ANO PESSOAL 2026 */}
      <section className="space-y-4">
        <div className="border-b-2 border-yellow-500 pb-3">
          <h3 className="text-2xl font-bold text-white">
            ✨ Previsão - Ano Pessoal 2026
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            {data.annualYearStarted
              ? 'Seu ano pessoal já começou! (a partir do seu aniversário)'
              : 'Seu ano pessoal começa no seu próximo aniversário'}
          </p>
        </div>

        {(() => {
          const annualInterpretation = getAnnualYear2026Interpretation(
            data.annualYear2026
          );
          if (!annualInterpretation) return null;

          return (
            <div className="card-mystical space-y-4 border-l-4 border-yellow-500 bg-yellow-500/5">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-yellow-300">
                      {data.annualYear2026}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">
                      {annualInterpretation.essence}
                    </h4>
                    <p className="text-slate-400 text-sm">
                      Idade: {data.age} anos
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                  <h5 className="text-green-300 font-bold mb-2">✅ Facilidades</h5>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {annualInterpretation.facilidades}
                  </p>
                </div>

                <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                  <h5 className="text-red-300 font-bold mb-2">⚠️ Desafios</h5>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {annualInterpretation.desafios}
                  </p>
                </div>

                <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                  <h5 className="text-blue-300 font-bold mb-2">💡 Conselhos</h5>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {annualInterpretation.conselhos}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </section>
    </div>
  );
}
