import { NumerologyChart } from '@/types';
import FavoriteButton from './FavoriteButton';
import { calcularIdadesRealizacoes } from '@/lib/numerologyUtils';
import { useUserSubscription } from '@/hooks/useUserSubscription';

/**
 * ChartDisplay Component
 * 
 * Design: Apresentação visual dos números numerológicos
 * - Grid de números com destaque em ouro
 * - Organização clara por categorias
 * - Animações de entrada escalonadas
 * - Idades de realização baseadas no Caminho de Destino
 */

interface ChartDisplayProps {
  chart: NumerologyChart;
}

export default function ChartDisplay({ chart }: ChartDisplayProps) {
  const { user } = useUserSubscription();
  return (
    <div className="space-y-8">
      {/* Core Numbers */}
      <div className="card-mystical">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Números Essenciais</h3>
          {user && (
            <FavoriteButton
              email={user.email}
              mapId={1}
              sectionType="core-numbers"
              sectionTitle="Números Essenciais"
              sectionContent={JSON.stringify({ cd: chart.cd, mo: chart.mo, eu: chart.eu, ex: chart.ex, merito: chart.merito })}
              isFavorited={false}
            />
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <NumberCard
            label="Caminho de Destino"
            value={chart.cd}
            description="Sua missão de vida e propósito maior"
          />
          <NumberCard
            label="Motivação (Alma)"
            value={chart.mo}
            description="O que move seu coração e desejos"
          />
          <NumberCard
            label="Eu Íntimo"
            value={chart.eu}
            description="Seu sonho pessoal e verdadeira natureza"
          />
          <NumberCard
            label="Expressão"
            value={chart.ex}
            description="Como você se manifesta no mundo"
          />
        </div>
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-white">Mérito (Força de Realização)</span>
            <span className="number-mystical text-4xl">{chart.merito}</span>
          </div>
          <p className="text-slate-600 text-sm mt-2">
            Combinação de sua motivação e caminho de destino - sua força de realização
          </p>
        </div>
      </div>

      {/* Realizações (Pínáculos) - Unificado */}
      <div className="card-mystical">
        <h3 className="text-2xl font-bold text-white mb-6">Realizações (Pínáculos)</h3>
        <div className="space-y-4">
          {(() => {
            const idades = calcularIdadesRealizacoes(chart.cd);
            const r1Fim = 36 - chart.cd;
            const r2Inicio = r1Fim + 1;
            const r2Fim = r2Inicio + 9;
            const r3Inicio = r2Fim + 1;
            const r3Fim = r3Inicio + 9;
            const r4Inicio = r3Fim + 1;
            
            const isR1Active = chart.age <= r1Fim;
            const isR2Active = chart.age >= r2Inicio && chart.age <= r2Fim;
            const isR3Active = chart.age >= r3Inicio && chart.age <= r3Fim;
            const isR4Active = chart.age >= r4Inicio;
            
            return (
              <>
                <div className={`bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border rounded-lg p-4 transition-all ${
                  isR1Active ? 'border-yellow-400 shadow-lg shadow-yellow-400/50' : 'border-purple-500/50'
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-yellow-400">
                        1ª Realização {isR1Active && <span className="text-sm">(ATIVA)</span>}
                      </h4>
                      <p className="text-white mt-1">{idades.r1}</p>
                    </div>
                    <span className="text-3xl font-bold text-yellow-400">{chart.realizacoes.r1}</span>
                  </div>
                </div>
                <div className={`bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border rounded-lg p-4 transition-all ${
                  isR2Active ? 'border-yellow-400 shadow-lg shadow-yellow-400/50' : 'border-purple-500/50'
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-yellow-400">
                        2ª Realização {isR2Active && <span className="text-sm">(ATIVA)</span>}
                      </h4>
                      <p className="text-white mt-1">{idades.r2}</p>
                    </div>
                    <span className="text-3xl font-bold text-yellow-400">{chart.realizacoes.r2}</span>
                  </div>
                </div>
                <div className={`bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border rounded-lg p-4 transition-all ${
                  isR3Active ? 'border-yellow-400 shadow-lg shadow-yellow-400/50' : 'border-purple-500/50'
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-yellow-400">
                        3ª Realização {isR3Active && <span className="text-sm">(ATIVA)</span>}
                      </h4>
                      <p className="text-white mt-1">{idades.r3}</p>
                    </div>
                    <span className="text-3xl font-bold text-yellow-400">{chart.realizacoes.r3}</span>
                  </div>
                </div>
                <div className={`bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border rounded-lg p-4 transition-all ${
                  isR4Active ? 'border-yellow-400 shadow-lg shadow-yellow-400/50' : 'border-purple-500/50'
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-yellow-400">
                        4ª Realização {isR4Active && <span className="text-sm">(ATIVA)</span>}
                      </h4>
                      <p className="text-white mt-1">{idades.r4}</p>
                    </div>
                    <span className="text-3xl font-bold text-yellow-400">{chart.realizacoes.r4}</span>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </div>

      {/* Life Cycles */}
      <div className="card-mystical">
        <h3 className="text-2xl font-bold text-white mb-6">Ciclos de Vida</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <CycleCard
            label="1º Ciclo Formativo"
            value={chart.ciclos.c1}
            description="Mês de nascimento - Formação"
            ageRange="0 aos 29 anos"
          />
          <CycleCard
            label="2º Ciclo Produtivo"
            value={chart.ciclos.c2}
            description="Dia de nascimento - Ação"
            ageRange="29 aos 56 anos"
          />
          <CycleCard
            label="3º Ciclo de Colheita"
            value={chart.ciclos.c3}
            description="Ano de nascimento - Realização"
            ageRange="56 anos em diante"
          />
        </div>
      </div>



      {/* Challenges */}
      <div className="card-mystical">
        <h3 className="text-2xl font-bold text-white mb-6">Desafios</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <ChallengeCard
            label="Desafio Menor 1"
            value={chart.desafios.d1}
            description="|Dia - Mês|"
          />
          <ChallengeCard
            label="Desafio Menor 2"
            value={chart.desafios.d2}
            description="|Dia - Ano|"
          />
          <ChallengeCard
            label="Desafio Menor 3"
            value={chart.desafios.d3}
            description="|Mês - Ano|"
          />
          <ChallengeCard
            label="Desafio Maior"
            value={chart.desafios.dm}
            description="|D1 - D3|"
            highlight
          />
        </div>
      </div>
    </div>
  );
}

interface NumberCardProps {
  label: string;
  value: number;
  description: string;
}

function NumberCard({ label, value, description }: NumberCardProps) {
  return (
    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-colors">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{label}</p>
      <div className="flex items-baseline gap-3 mb-2">
        <span className="number-mystical text-3xl">{value}</span>
      </div>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}

interface CycleCardProps {
  label: string;
  value: number;
  description: string;
  ageRange?: string;
}

function CycleCard({ label, value, description, ageRange }: CycleCardProps) {
  return (
    <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
      <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-2">{label}</p>
      <div className="flex items-baseline gap-3 mb-2">
        <span className="number-mystical text-3xl text-cyan-400">{value}</span>
      </div>
      <p className="text-sm text-indigo-700">{description}</p>
      {ageRange && <p className="text-xs text-cyan-400 font-semibold mt-2 pt-2 border-t border-indigo-200">{ageRange}</p>}
    </div>
  );
}


interface ChallengeCardProps {
  label: string;
  value: number;
  description: string;
  highlight?: boolean;
}

function ChallengeCard({ label, value, description, highlight }: ChallengeCardProps) {
  return (
    <div className={`p-4 rounded-lg border ${
      highlight
        ? 'bg-red-50 border-red-200'
        : 'bg-slate-50 border-slate-200'
    }`}>
      <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${
        highlight ? 'text-red-700' : 'text-slate-500'
      }`}>{label}</p>
      <div className="flex items-baseline gap-3 mb-2">
        <span className={`number-mystical text-3xl ${highlight ? 'text-red-600' : ''}`}>{value}</span>
      </div>
      <p className={`text-sm ${highlight ? 'text-red-700' : 'text-slate-600'}`}>{description}</p>
    </div>
  );
}
