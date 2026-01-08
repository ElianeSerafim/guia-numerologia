/*
 * Life Path Calculator - Calculadora de Número do Caminho de Vida
 * 
 * Ferramenta gratuita para calcular o número do caminho de vida
 * baseado na data de nascimento usando redução teosófica.
 * 
 * Melhorias de UX:
 * - Design consistente com tema roxo/ouro
 * - Animações suaves
 * - Validação robusta de data
 * - Loading state
 * - Resultado otimizado
 * - Acessibilidade melhorada
 */

import { useState } from 'react';
import { useLocation } from 'wouter';
import { Calendar, Sparkles, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

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
    meaning: 'O Diplomata Sensível',
    characteristics: [
      'Cooperativo e empático',
      'Sensível aos sentimentos alheios',
      'Pacífico e harmonioso',
      'Intuitivo e perceptivo',
    ],
    strengths: [
      'Empatia excepcional',
      'Habilidade de mediar conflitos',
      'Intuição aguçada',
      'Lealdade e confiabilidade',
    ],
    challenges: [
      'Tendência à passividade',
      'Hipersensibilidade',
      'Dificuldade em tomar decisões',
      'Dependência emocional',
    ],
  },
  3: {
    number: 3,
    meaning: 'O Criador Expressivo',
    characteristics: [
      'Criativo e expressivo',
      'Comunicativo e sociável',
      'Otimista e entusiasmado',
      'Artístico e imaginativo',
    ],
    strengths: [
      'Criatividade brilhante',
      'Comunicação clara',
      'Otimismo contagiante',
      'Talento artístico',
    ],
    challenges: [
      'Dispersão e falta de foco',
      'Superficialidade ocasional',
      'Dificuldade em completar projetos',
      'Impulsividade',
    ],
  },
  4: {
    number: 4,
    meaning: 'O Construtor Prático',
    characteristics: [
      'Prático e organizado',
      'Confiável e responsável',
      'Trabalho duro e dedicado',
      'Estável e seguro',
    ],
    strengths: [
      'Organização impecável',
      'Confiabilidade absoluta',
      'Capacidade de trabalho',
      'Estabilidade emocional',
    ],
    challenges: [
      'Rigidez e inflexibilidade',
      'Dificuldade em inovar',
      'Tendência ao pessimismo',
      'Falta de espontaneidade',
    ],
  },
  5: {
    number: 5,
    meaning: 'O Aventureiro Livre',
    characteristics: [
      'Aventureiro e explorador',
      'Flexível e adaptável',
      'Curioso e investigador',
      'Dinâmico e energético',
    ],
    strengths: [
      'Adaptabilidade excepcional',
      'Curiosidade intelectual',
      'Dinamismo e energia',
      'Liberdade de pensamento',
    ],
    challenges: [
      'Inconstância e impulsividade',
      'Dificuldade em se comprometer',
      'Inquietação crônica',
      'Falta de profundidade',
    ],
  },
  6: {
    number: 6,
    meaning: 'O Cuidador Harmonioso',
    characteristics: [
      'Responsável e cuidadoso',
      'Amoroso e compassivo',
      'Harmonioso e equilibrado',
      'Protetor e leal',
    ],
    strengths: [
      'Compaixão genuína',
      'Senso de responsabilidade',
      'Harmonia e equilíbrio',
      'Lealdade inabalável',
    ],
    challenges: [
      'Tendência ao sacrifício excessivo',
      'Possessividade',
      'Dificuldade em estabelecer limites',
      'Julgamento dos outros',
    ],
  },
  7: {
    number: 7,
    meaning: 'O Pensador Espiritual',
    characteristics: [
      'Intelectual e analítico',
      'Espiritual e introspectivo',
      'Misterioso e reservado',
      'Buscador de verdade',
    ],
    strengths: [
      'Análise profunda',
      'Sabedoria intuitiva',
      'Espiritualidade autêntica',
      'Pensamento crítico',
    ],
    challenges: [
      'Isolamento e solidão',
      'Ceticismo excessivo',
      'Dificuldade em se comunicar',
      'Tendência ao pessimismo',
    ],
  },
  8: {
    number: 8,
    meaning: 'O Realizador Poderoso',
    characteristics: [
      'Ambicioso e determinado',
      'Executivo e estratégico',
      'Poderoso e influente',
      'Focado em sucesso material',
    ],
    strengths: [
      'Poder de manifestação',
      'Visão estratégica',
      'Capacidade de liderança',
      'Sucesso material',
    ],
    challenges: [
      'Obsessão pelo poder',
      'Materialismo excessivo',
      'Dificuldade em equilibrar vida',
      'Tendência ao autoritarismo',
    ],
  },
  9: {
    number: 9,
    meaning: 'O Iluminado Humanitário',
    characteristics: [
      'Humanitário e compassivo',
      'Sábio e iluminado',
      'Universalista e inclusivo',
      'Transformador de mundos',
    ],
    strengths: [
      'Compaixão universal',
      'Sabedoria profunda',
      'Visão holística',
      'Capacidade de transformação',
    ],
    challenges: [
      'Idealismo excessivo',
      'Dificuldade em agir',
      'Sacrifício pessoal',
      'Desapego extremo',
    ],
  },
  11: {
    number: 11,
    meaning: 'O Iluminado Inspirador',
    characteristics: [
      'Inspirador e visionário',
      'Intuitivo e sensível',
      'Idealista e revolucionário',
      'Portador de luz',
    ],
    strengths: [
      'Intuição excepcional',
      'Inspiração contagiante',
      'Visão futurista',
      'Sensibilidade profunda',
    ],
    challenges: [
      'Tendência ao fanatismo',
      'Hipersensibilidade extrema',
      'Dificuldade em se integrar',
      'Idealismo impraticável',
    ],
  },
  22: {
    number: 22,
    meaning: 'O Construtor Mestre',
    characteristics: [
      'Construtor de impérios',
      'Visionário prático',
      'Mestre manifestador',
      'Transformador de estruturas',
    ],
    strengths: [
      'Visão e execução',
      'Poder de manifestação',
      'Liderança transformadora',
      'Construção de legados',
    ],
    challenges: [
      'Pressão extrema',
      'Perfeccionismo excessivo',
      'Dificuldade em delegar',
      'Ambição desmedida',
    ],
  },
  33: {
    number: 33,
    meaning: 'O Mestre Compassivo',
    characteristics: [
      'Mestre da compaixão',
      'Curador e protetor',
      'Iluminado e sábio',
      'Transformador espiritual',
    ],
    strengths: [
      'Compaixão ilimitada',
      'Sabedoria espiritual',
      'Capacidade de cura',
      'Transformação espiritual',
    ],
    challenges: [
      'Sacrifício excessivo',
      'Martírio espiritual',
      'Dificuldade em receber',
      'Idealismo impraticável',
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

function isValidAge(birthDate: string): boolean {
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  return age >= 1 && age <= 150;
}

export default function LifePathCalculator() {
  const [, setLocation] = useLocation();
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<LifePathResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCalculate = () => {
    if (!birthDate) {
      setError('Por favor, insira sua data de nascimento');
      return;
    }

    if (!isValidAge(birthDate)) {
      setError('Por favor, insira uma data de nascimento válida');
      return;
    }

    setLoading(true);
    setError('');
    
    // Simular processamento para melhor UX
    setTimeout(() => {
      try {
        const lifePathNumber = calculateLifePath(birthDate);
        setResult(lifePathMeanings[lifePathNumber]);
        setIsAnimating(true);
      } catch (err) {
        setError('Data inválida. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setResult(null);
    setBirthDate('');
    setError('');
    setIsAnimating(false);
  };

  // Obter data máxima (hoje)
  const today = new Date().toISOString().split('T')[0];
  // Obter data mínima (150 anos atrás)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 150);
  const minDateStr = minDate.toISOString().split('T')[0];

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {!result ? (
        <div className="space-y-6 animate-fade-in">
          {/* Input Section */}
          <div className="bg-gradient-to-br from-[#2A1240] to-[#3F1F5C] rounded-2xl border border-[#4A2A6A] p-8 shadow-2xl hover:border-[#D4AF37] transition-all duration-300">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-[#8A2BE2] to-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#D4AF37]">
                  Descubra Seu Número
                </h3>
                <p className="text-sm text-[#E5C158]">Caminho de Vida</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-white mb-8 leading-relaxed">
              Insira sua data de nascimento para descobrir seu número do caminho de vida e receber uma interpretação personalizada baseada na numerologia pitagórica.
            </p>

            {/* Input Group */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#D4AF37] mb-3">
                  Data de Nascimento
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => {
                      setError('');
                      setBirthDate(e.target.value);
                    }}
                    onKeyPress={handleKeyPress}
                    min={minDateStr}
                    max={today}
                    disabled={loading}
                    className="w-full px-4 py-4 bg-[#190825] border-2 border-[#4A2A6A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Selecione sua data de nascimento"
                  />
                  <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D4AF37] pointer-events-none" />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Formato: DD/MM/AAAA
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-500/50 rounded-lg animate-shake">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                disabled={loading || !birthDate}
                className="w-full px-6 py-4 bg-gradient-to-r from-[#8A2BE2] to-[#D4AF37] text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Calculando...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Calcular Meu Número
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 flex items-center gap-2">
                <CheckCircle size={14} className="text-green-500" />
                Seus dados são processados localmente e nunca são armazenados em servidores
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={`space-y-6 ${isAnimating ? 'animate-fade-in' : ''}`}>
          {/* Result Section */}
          <div className="bg-gradient-to-br from-[#2A1240] to-[#3F1F5C] rounded-2xl border border-[#D4AF37] p-8 shadow-2xl">
            {/* Life Path Number - Destaque */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[#8A2BE2] to-[#D4AF37] rounded-full mb-6 shadow-2xl animate-pulse-slow">
                <span className="text-6xl font-bold text-white">{result.number}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">
                {result.meaning}
              </h2>
              <p className="text-[#E5C158] font-semibold">Seu Número do Caminho de Vida</p>
            </div>

            {/* Characteristics & Strengths Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Características */}
              <div className="bg-[#190825]/50 rounded-xl p-6 border border-[#4A2A6A]">
                <h4 className="font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#D4AF37] rounded-full"></span>
                  Características
                </h4>
                <ul className="space-y-3">
                  {result.characteristics.map((char, idx) => (
                    <li key={idx} className="text-white text-sm flex items-start gap-3">
                      <span className="text-[#D4AF37] font-bold mt-0.5">•</span>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Forças */}
              <div className="bg-[#190825]/50 rounded-xl p-6 border border-[#4A2A6A]">
                <h4 className="font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Forças
                </h4>
                <ul className="space-y-3">
                  {result.strengths.map((strength, idx) => (
                    <li key={idx} className="text-white text-sm flex items-start gap-3">
                      <span className="text-green-500 font-bold mt-0.5">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Challenges */}
            <div className="bg-[#190825]/50 rounded-xl p-6 border border-[#4A2A6A] mb-8">
              <h4 className="font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                Desafios a Superar
              </h4>
              <ul className="grid md:grid-cols-2 gap-3">
                {result.challenges.map((challenge, idx) => (
                  <li key={idx} className="text-white text-sm flex items-start gap-3">
                    <span className="text-orange-500 font-bold mt-0.5">⚡</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA - Upgrade */}
            <div className="bg-gradient-to-r from-[#8A2BE2]/20 to-[#D4AF37]/20 rounded-xl p-6 border border-[#D4AF37]/50 mb-6">
              <h4 className="text-[#D4AF37] font-bold mb-2">Quer explorar mais?</h4>
              <p className="text-white text-sm mb-4">
                Descubra seu mapa numerológico completo com números de Expressão, Motivação, Desafios Pessoais e muito mais!
              </p>
              <button
                onClick={() => setLocation('/pricing')}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#8A2BE2] to-[#D4AF37] text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                Ver Planos Premium
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            ← Calcular Outro Número
          </button>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
