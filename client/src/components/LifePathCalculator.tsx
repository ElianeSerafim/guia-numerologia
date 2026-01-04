/**
 * Life Path Calculator - Calculadora de Número do Caminho de Vida
 * 
 * Ferramenta gratuita para calcular o número do caminho de vida
 * baseado na data de nascimento usando redução teosófica.
 */

import { useState } from 'react';
import { useLocation } from 'wouter';
import { Calendar, Sparkles, ArrowRight } from 'lucide-react';

interface LifePathResult {
  number: number;
  meaning: string;
  characteristics: string[];
  strengths: string[];
  challenges: string[];
}

const lifePathMeanings: Record<number, LifePathResult> = {
  1: {
    number: 1,
    meaning: 'O Líder Inovador',
    characteristics: [
      'Independente e determinado',
      'Pioneiro e empreendedor',
      'Ambicioso e focado em objetivos',
      'Criativo e original',
    ],
    strengths: [
      'Liderança natural',
      'Coragem para inovar',
      'Determinação inabalável',
      'Visão clara do futuro',
    ],
    challenges: [
      'Tendência ao autoritarismo',
      'Impaciência com outros',
      'Dificuldade em trabalhar em equipe',
      'Egocentrismo ocasional',
    ],
  },
  2: {
    number: 2,
    meaning: 'O Diplomata Cooperativo',
    characteristics: [
      'Sensível e intuitivo',
      'Cooperativo e pacífico',
      'Empático e compreensivo',
      'Artístico e criativo',
    ],
    strengths: [
      'Habilidade de mediar conflitos',
      'Intuição aguçada',
      'Sensibilidade emocional',
      'Capacidade de colaboração',
    ],
    challenges: [
      'Indecisão frequente',
      'Hipersensibilidade',
      'Dependência emocional',
      'Falta de assertividade',
    ],
  },
  3: {
    number: 3,
    meaning: 'O Criador Expressivo',
    characteristics: [
      'Comunicativo e expressivo',
      'Otimista e alegre',
      'Criativo e artístico',
      'Sociável e amigável',
    ],
    strengths: [
      'Talento para comunicação',
      'Criatividade abundante',
      'Carisma natural',
      'Inspiração para outros',
    ],
    challenges: [
      'Dispersão e falta de foco',
      'Superficialidade em relacionamentos',
      'Dificuldade em completar projetos',
      'Impulsividade',
    ],
  },
  4: {
    number: 4,
    meaning: 'O Construtor Prático',
    characteristics: [
      'Prático e realista',
      'Responsável e confiável',
      'Organizado e metódico',
      'Estável e seguro',
    ],
    strengths: [
      'Capacidade de construção',
      'Confiabilidade absoluta',
      'Organização exemplar',
      'Dedicação ao trabalho',
    ],
    challenges: [
      'Rigidez e inflexibilidade',
      'Dificuldade em se adaptar',
      'Tendência ao pessimismo',
      'Falta de espontaneidade',
    ],
  },
  5: {
    number: 5,
    meaning: 'O Aventureiro Livre',
    characteristics: [
      'Aventureiro e dinâmico',
      'Curioso e explorador',
      'Flexível e adaptável',
      'Amante da liberdade',
    ],
    strengths: [
      'Adaptabilidade excepcional',
      'Curiosidade intelectual',
      'Versatilidade',
      'Espírito de aventura',
    ],
    challenges: [
      'Instabilidade e inconstância',
      'Impulsividade excessiva',
      'Dificuldade em comprometimento',
      'Dispersão mental',
    ],
  },
  6: {
    number: 6,
    meaning: 'O Cuidador Amoroso',
    characteristics: [
      'Responsável e cuidadoso',
      'Amoroso e compassivo',
      'Protetor e dedicado',
      'Harmônico e equilibrado',
    ],
    strengths: [
      'Capacidade de amar profundamente',
      'Senso de responsabilidade',
      'Harmonia nos relacionamentos',
      'Dedicação à família',
    ],
    challenges: [
      'Tendência a se sacrificar',
      'Possessividade em relacionamentos',
      'Dificuldade em estabelecer limites',
      'Culpa excessiva',
    ],
  },
  7: {
    number: 7,
    meaning: 'O Investigador Espiritual',
    characteristics: [
      'Investigador e analítico',
      'Espiritual e introspectivo',
      'Intelectual e profundo',
      'Misterioso e reservado',
    ],
    strengths: [
      'Análise profunda',
      'Intuição espiritual',
      'Busca pela verdade',
      'Sabedoria interior',
    ],
    challenges: [
      'Isolamento social',
      'Pessimismo e ceticismo',
      'Dificuldade em confiar',
      'Tendência ao isolamento',
    ],
  },
  8: {
    number: 8,
    meaning: 'O Realizador Poderoso',
    characteristics: [
      'Ambicioso e poderoso',
      'Executivo e estratégico',
      'Focado em sucesso material',
      'Determinado e resiliente',
    ],
    strengths: [
      'Capacidade de liderança',
      'Visão estratégica',
      'Poder de manifestação',
      'Sucesso material',
    ],
    challenges: [
      'Obsessão por poder',
      'Materialismo excessivo',
      'Dificuldade em equilibrar vida',
      'Insensibilidade emocional',
    ],
  },
  9: {
    number: 9,
    meaning: 'O Humanitário Sábio',
    characteristics: [
      'Compassivo e humanitário',
      'Sábio e compreensivo',
      'Idealista e visionário',
      'Universal e inclusivo',
    ],
    strengths: [
      'Compaixão universal',
      'Sabedoria e discernimento',
      'Visão holística',
      'Capacidade de perdoar',
    ],
    challenges: [
      'Idealismo excessivo',
      'Dificuldade em lidar com realidade',
      'Sacrifício pessoal excessivo',
      'Desapego emocional',
    ],
  },
};

function reduceToSingleDigit(num: number): number {
  while (num >= 10) {
    num = Math.floor(num / 10) + (num % 10);
  }
  return num;
}

function calculateLifePath(birthDate: string): number {
  const [year, month, day] = birthDate.split('-').map(Number);

  // Reduzir cada componente
  const reducedDay = reduceToSingleDigit(day);
  const reducedMonth = reduceToSingleDigit(month);
  const reducedYear = reduceToSingleDigit(year);

  // Somar todos os componentes reduzidos
  const sum = reducedDay + reducedMonth + reducedYear;

  // Reduzir o resultado final
  return reduceToSingleDigit(sum);
}

export default function LifePathCalculator() {
  const [, setLocation] = useLocation();
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<LifePathResult | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    if (!birthDate) {
      setError('Por favor, insira sua data de nascimento');
      return;
    }

    try {
      const lifePathNumber = calculateLifePath(birthDate);
      setResult(lifePathMeanings[lifePathNumber]);
      setError('');
    } catch (err) {
      setError('Data inválida. Por favor, tente novamente.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!result ? (
        <div className="space-y-6">
          {/* Input Section */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Descubra Seu Número do Caminho de Vida
              </h3>
            </div>

            <p className="text-slate-600 mb-6">
              Insira sua data de nascimento para descobrir seu número do caminho de vida e
              receber uma interpretação personalizada.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => {
                    setError('');
                    setBirthDate(e.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>

              {error && <div className="text-red-600 text-sm font-medium">{error}</div>}

              <button
                onClick={handleCalculate}
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
              >
                <Sparkles size={18} />
                Calcular Meu Número
              </button>
            </div>

            <p className="text-xs text-slate-500 text-center mt-4">
              Seus dados são processados localmente e nunca são armazenados.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Result Section */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-8 shadow-lg">
            {/* Life Path Number */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full mb-4">
                <span className="text-5xl font-bold text-white">{result.number}</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{result.meaning}</h2>
              <p className="text-slate-600">Seu Número do Caminho de Vida</p>
            </div>

            {/* Characteristics */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Características
                </h4>
                <ul className="space-y-2">
                  {result.characteristics.map((char, idx) => (
                    <li key={idx} className="text-slate-700 text-sm">
                      • {char}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Forças
                </h4>
                <ul className="space-y-2">
                  {result.strengths.map((strength, idx) => (
                    <li key={idx} className="text-slate-700 text-sm">
                      • {strength}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Challenges */}
            <div className="bg-white rounded-lg p-4 mb-8">
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                Desafios a Superar
              </h4>
              <ul className="space-y-2">
                {result.challenges.map((challenge, idx) => (
                  <li key={idx} className="text-slate-700 text-sm">
                    • {challenge}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-white rounded-lg p-6 border-2 border-indigo-200">
              <p className="text-slate-700 mb-4">
                Quer explorar mais profundamente seu mapa numerológico completo? Descubra seus
                números de Expressão, Motivação, Desafios e muito mais!
              </p>
              <button
                onClick={() => setLocation('/pricing')}
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
              >
                Ver Planos Premium
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setResult(null);
              setBirthDate('');
              setError('');
            }}
            className="w-full px-6 py-2 border-2 border-slate-300 text-slate-900 rounded-lg font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-colors"
          >
            Calcular Outro Número
          </button>
        </div>
      )}
    </div>
  );
}
