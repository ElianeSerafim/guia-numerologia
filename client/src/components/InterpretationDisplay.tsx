import { NumerologyChart } from '@/types';
import { getInterpretation } from '@/lib/interpretations';
import { BookOpen, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';

interface InterpretationDisplayProps {
  chart: NumerologyChart;
}

/**
 * InterpretationDisplay Component
 * 
 * Exibe as interpretações completas dos números do mapa numerológico
 * baseado nas técnicas avançadas de numerologia pitagórica
 */

export default function InterpretationDisplay({ chart }: InterpretationDisplayProps) {
  const numbers = [
    { label: 'Caminho de Destino', value: chart.cd },
    { label: 'Motivação', value: chart.mo },
    { label: 'Expressão', value: chart.ex },
    { label: 'Eu Íntimo', value: chart.eu },
    { label: 'Mérito', value: chart.merito },
    { label: 'Desafio Maior', value: chart.desafios.dm },
    { label: 'Ciclo Formativo', value: chart.ciclos.c1 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Interpretações Numerológicas</h2>
        <p className="text-slate-600">
          Análise completa baseada nas Técnicas Avançadas de Numerologia Pitagórica
        </p>
      </div>

      {/* Interpretações */}
      <div className="space-y-6">
        {numbers.map((item) => {
          const interpretation = getInterpretation(item.value);

          if (!interpretation) return null;

          return (
            <div
              key={item.label}
              className="card-mystical space-y-4 border-l-4 border-indigo-600"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{item.label}</h3>
                  <p className="text-sm text-slate-600">Vibração Numérica: {item.value}</p>
                </div>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">
                  {item.value}
                </div>
              </div>

              {/* Essência */}
              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <div className="flex items-start gap-2">
                  <Lightbulb size={18} className="text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-indigo-900 text-sm">Essência</p>
                    <p className="text-indigo-800 text-sm mt-1">{interpretation.essence}</p>
                  </div>
                </div>
              </div>

              {/* Nome e Significado */}
              <div>
                <h4 className="font-bold text-white mb-2">
                  {interpretation.name}
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  {interpretation.regras}
                </p>
              </div>

              {/* Características */}
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Características Principais
                </h4>
                <div className="flex flex-wrap gap-2">
                  {interpretation.caracteristicas.map((char) => (
                    <span
                      key={char}
                      className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              {/* Potenciais */}
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Lightbulb size={16} className="text-amber-600" />
                  Potenciais e Oportunidades
                </h4>
                <ul className="space-y-1">
                  {interpretation.potenciais.map((pot) => (
                    <li key={pot} className="flex items-start gap-2 text-sm text-white">
                      <span className="text-amber-600 font-bold mt-0.5">▸</span>
                      <span>{pot}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Riscos */}
              <div className="bg-red-50 rounded-lg p-4 border border-red-200 space-y-3">
                <div>
                  <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-red-600" />
                    Riscos e Desafios
                  </h4>
                  <p className="text-red-800 text-sm">{interpretation.riscos}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-red-900 mb-2">Como Evitar os Riscos</h4>
                  <p className="text-red-800 text-sm">{interpretation.comoEvitarRiscos}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-red-900 mb-2">Desafios a Superar</h4>
                  <ul className="space-y-1">
                    {interpretation.desafios.map((desafio) => (
                      <li key={desafio} className="flex items-start gap-2 text-sm text-red-800">
                        <span className="text-red-600 font-bold mt-0.5">•</span>
                        <span>{desafio}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Divider */}
              <div className="divider-diagonal"></div>
            </div>
          );
        })}
      </div>

      {/* Nota Final */}
      <div className="bg-slate-100 rounded-lg p-6 border border-slate-300 space-y-3">
        <div className="flex items-start gap-3">
          <BookOpen size={20} className="text-slate-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-white mb-2">Sobre as Interpretações</h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              Essas interpretações são baseadas nas Técnicas Avançadas de Numerologia Pitagórica.
              Cada número representa uma vibração específíca que influencia diferentes aspectos
              da vida humana. A compreensão profunda dessas vibrações permite orientar melhor as
              decisões e ações para maior evolução pessoal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
