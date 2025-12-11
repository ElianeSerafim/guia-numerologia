import { NumerologyChart } from '@/types';

/**
 * ChartDisplay Component
 * 
 * Design: Apresentação visual dos números numerológicos
 * - Grid de números com destaque em ouro
 * - Organização clara por categorias
 * - Animações de entrada escalonadas
 */

interface ChartDisplayProps {
  chart: NumerologyChart;
}

export default function ChartDisplay({ chart }: ChartDisplayProps) {
  return (
    <div className="space-y-8">
      {/* Core Numbers */}
      <div className="card-mystical">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Números Essenciais</h3>
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
            <span className="text-lg font-bold text-slate-900">Mérito (Força de Realização)</span>
            <span className="number-mystical text-4xl">{chart.merito}</span>
          </div>
          <p className="text-slate-600 text-sm mt-2">
            Combinação de sua motivação e caminho de destino - sua força de realização
          </p>
        </div>
      </div>

      {/* Life Cycles */}
      <div className="card-mystical">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Ciclos de Vida</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <CycleCard
            label="Ciclo Formativo"
            value={chart.ciclos.c1}
            description="Mês de nascimento - Formação"
          />
          <CycleCard
            label="Ciclo Produtivo"
            value={chart.ciclos.c2}
            description="Dia de nascimento - Ação"
          />
          <CycleCard
            label="Ciclo de Colheita"
            value={chart.ciclos.c3}
            description="Ano de nascimento - Realização"
          />
        </div>
      </div>

      {/* Realizations (Pinnacles) */}
      <div className="card-mystical">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Realizações (Pináculos)</h3>
        <div className="space-y-4">
          <RealizationCard
            number={1}
            value={chart.realizacoes.r1}
            ageEnd={chart.realizationAges.r1End}
            currentAge={chart.age}
          />
          <RealizationCard
            number={2}
            value={chart.realizacoes.r2}
            ageStart={chart.realizationAges.r1End + 1}
            ageEnd={chart.realizationAges.r2End}
            currentAge={chart.age}
          />
          <RealizationCard
            number={3}
            value={chart.realizacoes.r3}
            ageStart={chart.realizationAges.r2End + 1}
            ageEnd={chart.realizationAges.r3End}
            currentAge={chart.age}
          />
          <RealizationCard
            number={4}
            value={chart.realizacoes.r4}
            ageStart={chart.realizationAges.r3End}
            currentAge={chart.age}
          />
        </div>
      </div>

      {/* Challenges */}
      <div className="card-mystical">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Desafios</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <ChallengeCard
            label="Desafio Menor 1"
            value={chart.desafios.d1}
            description="Primeiro desafio a superar"
          />
          <ChallengeCard
            label="Desafio Menor 2"
            value={chart.desafios.d2}
            description="Segundo desafio a superar"
          />
          <ChallengeCard
            label="Desafio Maior"
            value={chart.desafios.dm}
            description="Desafio principal de vida"
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
}

function CycleCard({ label, value, description }: CycleCardProps) {
  return (
    <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
      <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-2">{label}</p>
      <div className="flex items-baseline gap-3 mb-2">
        <span className="number-mystical text-3xl text-indigo-600">{value}</span>
      </div>
      <p className="text-sm text-indigo-700">{description}</p>
    </div>
  );
}

interface RealizationCardProps {
  number: number;
  value: number;
  ageStart?: number;
  ageEnd?: number;
  currentAge: number;
}

function RealizationCard({ number, value, ageStart, ageEnd, currentAge }: RealizationCardProps) {
  const isActive = ageStart ? currentAge >= ageStart && currentAge <= (ageEnd || 999) : currentAge <= (ageEnd || 999);
  
  return (
    <div className={`p-4 rounded-lg border-2 transition-all ${
      isActive
        ? 'bg-gold-mystical/10 border-gold-mystical/50'
        : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {number}ª Realização {isActive && <span className="text-gold-mystical font-bold">(ATIVA)</span>}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            {ageStart ? `Dos ${ageStart} aos ${ageEnd} anos` : `Até ${ageEnd} anos`}
          </p>
        </div>
        <span className="number-mystical text-3xl">{value}</span>
      </div>
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
