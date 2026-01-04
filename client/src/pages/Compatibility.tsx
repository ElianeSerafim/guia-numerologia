/**
 * Compatibility Page - Análise de Compatibilidade Amorosa
 * 
 * Página para comparar mapas numerológicos de duas pessoas
 * e gerar análise de compatibilidade amorosa detalhada.
 */

import { useState } from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Users, Flame, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { calculateChart } from '@/lib/numerologyUtils';
import { NumerologyChart } from '@/types';

interface PersonData {
  name: string;
  birthDate: string;
  chart?: NumerologyChart;
}

interface CompatibilityResult {
  overallScore: number;
  emotionalHarmony: number;
  communicationAlignment: number;
  lifePathCompatibility: number;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  description: string;
}

function calculateCompatibility(person1: NumerologyChart, person2: NumerologyChart): CompatibilityResult {
  // Calcular compatibilidade entre os números principais
  const lifePathDiff = Math.abs(person1.cd - person2.cd);
  const expressionDiff = Math.abs(person1.ex - person2.ex);
  const soulUrgeDiff = Math.abs(person1.mo - person2.mo);

  // Scores de compatibilidade (0-100)
  const lifePathScore = Math.max(0, 100 - lifePathDiff * 15);
  const expressionScore = Math.max(0, 100 - expressionDiff * 12);
  const soulUrgeScore = Math.max(0, 100 - soulUrgeDiff * 10);

  const emotionalHarmony = soulUrgeScore;
  const communicationAlignment = expressionScore;
  const lifePathCompatibility = lifePathScore;
  const overallScore = Math.round(
    (emotionalHarmony + communicationAlignment + lifePathCompatibility) / 3
  );

  // Determinar forças e desafios
  const strengths: string[] = [];
  const challenges: string[] = [];
  const recommendations: string[] = [];

  if (lifePathScore > 80) {
    strengths.push('Caminhos de vida muito alinhados - objetivos e valores similares');
  } else if (lifePathScore < 40) {
    challenges.push('Caminhos de vida diferentes - necessário diálogo sobre objetivos');
  }

  if (expressionScore > 80) {
    strengths.push('Excelente comunicação e compatibilidade de personalidades');
  } else if (expressionScore < 40) {
    challenges.push('Estilos de expressão muito diferentes - requer compreensão mútua');
  }

  if (soulUrgeScore > 80) {
    strengths.push('Desejos emocionais e necessidades muito compatíveis');
  } else if (soulUrgeScore < 40) {
    challenges.push('Necessidades emocionais diferentes - importante comunicar sentimentos');
  }

  // Recomendações
  if (overallScore > 80) {
    recommendations.push('Excelente potencial de relacionamento duradouro');
    recommendations.push('Aproveite a harmonia natural para construir uma base sólida');
    recommendations.push('Mantenha a comunicação aberta para fortalecer ainda mais a conexão');
  } else if (overallScore > 60) {
    recommendations.push('Bom potencial com esforço consciente');
    recommendations.push('Trabalhe nas diferenças com compreensão e paciência');
    recommendations.push('Celebre os pontos em comum e respeite as diferenças');
  } else {
    recommendations.push('Relacionamento desafiador mas não impossível');
    recommendations.push('Requer comunicação clara e disposição para crescimento mútuo');
    recommendations.push('Busque compreender as perspectivas um do outro');
  }

  const description = getCompatibilityDescription(overallScore);

  return {
    overallScore,
    emotionalHarmony,
    communicationAlignment,
    lifePathCompatibility,
    strengths,
    challenges,
    recommendations,
    description,
  };
}

function getCompatibilityDescription(score: number): string {
  if (score >= 90) {
    return 'Compatibilidade Excepcional: Vocês são almas gêmeas numerológicas com harmonia natural em múltiplos níveis.';
  } else if (score >= 80) {
    return 'Compatibilidade Excelente: Forte conexão com alinhamento significativo em valores e emoções.';
  } else if (score >= 70) {
    return 'Compatibilidade Muito Boa: Boa harmonia com algumas diferenças que podem ser enriquecedoras.';
  } else if (score >= 60) {
    return 'Compatibilidade Boa: Potencial sólido com necessidade de compreensão mútua.';
  } else if (score >= 50) {
    return 'Compatibilidade Moderada: Desafios presentes mas superáveis com esforço.';
  } else {
    return 'Compatibilidade Baixa: Diferenças significativas que requerem muita comunicação e paciência.';
  }
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'from-green-500 to-emerald-600';
  if (score >= 60) return 'from-blue-500 to-cyan-600';
  if (score >= 40) return 'from-yellow-500 to-orange-600';
  return 'from-red-500 to-pink-600';
}

export default function Compatibility() {
  const [, setLocation] = useLocation();
  const [person1, setPerson1] = useState<PersonData>({ name: '', birthDate: '' });
  const [person2, setPerson2] = useState<PersonData>({ name: '', birthDate: '' });
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (!person1.name || !person1.birthDate || !person2.name || !person2.birthDate) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const chart1 = calculateChart(person1.name, person1.birthDate);
      const chart2 = calculateChart(person2.name, person2.birthDate);

      setPerson1({ ...person1, chart: chart1 });
      setPerson2({ ...person2, chart: chart2 });

      const compatibility = calculateCompatibility(chart1, chart2);
      setResult(compatibility);
    } catch (err) {
      setError('Erro ao calcular compatibilidade. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPerson1({ name: '', birthDate: '' });
    setPerson2({ name: '', birthDate: '' });
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />

      <div className="pt-32 pb-20">
        <div className="container max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-red-500" />
              <h1 className="text-5xl font-bold text-slate-900">Compatibilidade Amorosa</h1>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Descubra o potencial de harmonia entre dois corações através da análise numerológica
              completa.
            </p>
          </div>

          {!result ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Person 1 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                    <Users size={20} className="text-indigo-600" />
                    Primeira Pessoa
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={person1.name}
                      onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                      placeholder="Digite o nome completo"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      value={person1.birthDate}
                      onChange={(e) => setPerson1({ ...person1, birthDate: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                {/* Person 2 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                    <Users size={20} className="text-purple-600" />
                    Segunda Pessoa
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={person2.name}
                      onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
                      placeholder="Digite o nome completo"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      value={person2.birthDate}
                      onChange={(e) => setPerson2({ ...person2, birthDate: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
                  <AlertCircle size={20} />
                  {error}
                </div>
              )}

              <button
                onClick={handleCalculate}
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Flame size={18} />
                {loading ? 'Calculando...' : 'Calcular Compatibilidade'}
              </button>

              <p className="text-xs text-slate-500 text-center mt-4">
                Seus dados são processados localmente e nunca são armazenados.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Overall Score */}
              <div className={`bg-gradient-to-br ${getScoreColor(result.overallScore)} rounded-xl p-8 text-white shadow-lg`}>
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">Compatibilidade Geral</p>
                  <div className="text-6xl font-bold mb-4">{result.overallScore}%</div>
                  <p className="text-lg">{result.description}</p>
                </div>
              </div>

              {/* Detailed Scores */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Heart size={18} className="text-red-500" />
                    Harmonia Emocional
                  </h4>
                  <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-pink-600 transition-all duration-500"
                      style={{ width: `${result.emotionalHarmony}%` }}
                    ></div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 mt-3">{result.emotionalHarmony}%</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Users size={18} className="text-blue-500" />
                    Alinhamento de Comunicação
                  </h4>
                  <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 transition-all duration-500"
                      style={{ width: `${result.communicationAlignment}%` }}
                    ></div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 mt-3">{result.communicationAlignment}%</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <TrendingUp size={18} className="text-green-500" />
                    Compatibilidade de Destino
                  </h4>
                  <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500"
                      style={{ width: `${result.lifePathCompatibility}%` }}
                    ></div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 mt-3">{result.lifePathCompatibility}%</p>
                </div>
              </div>

              {/* Strengths and Challenges */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-green-200 p-6">
                  <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-600" />
                    Forças do Relacionamento
                  </h4>
                  <ul className="space-y-3">
                    {result.strengths.map((strength, idx) => (
                      <li key={idx} className="text-slate-700 flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl border border-orange-200 p-6">
                  <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <AlertCircle size={18} className="text-orange-600" />
                    Desafios a Superar
                  </h4>
                  <ul className="space-y-3">
                    {result.challenges.map((challenge, idx) => (
                      <li key={idx} className="text-slate-700 flex items-start gap-2">
                        <span className="text-orange-600 font-bold mt-1">!</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
                <h4 className="font-semibold text-slate-900 mb-4">Recomendações para o Casal</h4>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-slate-700 flex items-start gap-3">
                      <span className="text-indigo-600 font-bold mt-1">→</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-900 rounded-lg font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-colors"
                >
                  Calcular Outra Compatibilidade
                </button>
                <button
                  onClick={() => setLocation('/pricing')}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                >
                  Ver Análise Completa
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
