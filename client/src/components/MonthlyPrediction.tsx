import { useState } from 'react';
import { X, Lightbulb, AlertCircle } from 'lucide-react';
import { NumerologyChart } from '@/types';
import { getMonthlyPredictionInterpretation } from '@/lib/monthlyPredictions';
import { reduceNumber } from '@/lib/numerologyUtils';

interface MonthlyPredictionProps {
  chart: NumerologyChart;
  month: number;
  onClose: () => void;
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function MonthlyPrediction({ chart, month, onClose }: MonthlyPredictionProps) {
  const monthName = MONTH_NAMES[month - 1];
  
  // Calcular Previsão Mensal (PM) = AP + Mês
  const pm = reduceNumber(chart.anoP + month);
  
  // Obter interpretação da previsão mensal
  const interpretation = getMonthlyPredictionInterpretation(pm, monthName);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#07131B] to-[#0a1a2e] border border-[#00FFFF]/30 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#07131B] to-[#0a1a2e] border-b border-[#00FFFF]/30 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#00FFFF] mb-2">
              Previsão de {monthName}
            </h2>
            <p className="text-[#19E6FF]">
              Previsão Mensal (PM) = {chart.anoP} + {month} = <span className="font-bold text-[#00FFFF]">{pm}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#00FFFF]/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-[#00FFFF]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Número do Mês */}
          <div className="bg-gradient-to-br from-[#00FFFF]/10 to-[#19E6FF]/10 border border-[#00FFFF]/30 rounded-lg p-6 text-center">
            <p className="text-sm text-[#19E6FF] mb-2">Número da Previsão Mensal</p>
            <div className="text-6xl font-bold text-[#00FFFF] mb-2">{pm}</div>
            <p className="text-[#19E6FF]">Vibração energética para {monthName}</p>
          </div>

          {/* Previsão */}
          <div className="bg-gradient-to-br from-[#19E6FF]/10 to-[#00FFFF]/5 border border-[#19E6FF]/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#00FFFF] mb-4 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#00FFFF]"></span>
              Previsão
            </h3>
            <p className="text-[#E0E0E0] leading-relaxed">
              {interpretation.prediction}
            </p>
          </div>

          {/* Dica para Aproveitar */}
          <div className="bg-gradient-to-br from-[#00FFFF]/10 to-[#19E6FF]/10 border border-[#00FFFF]/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#00FFFF] mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#00FFFF]" />
              Dica para Aproveitar a Energia
            </h3>
            <p className="text-[#E0E0E0] leading-relaxed">
              {interpretation.tip}
            </p>
          </div>

          {/* O que Evitar */}
          <div className="bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF8C42]/10 border border-[#FF6B6B]/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#FF6B6B] mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#FF6B6B]" />
              O que Evitar
            </h3>
            <p className="text-[#E0E0E0] leading-relaxed">
              {interpretation.avoid}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-[#07131B] to-[#0a1a2e] border-t border-[#00FFFF]/30 p-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-[#00FFFF] to-[#19E6FF] text-[#07131B] font-bold rounded-lg hover:shadow-lg hover:shadow-[#00FFFF]/50 transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
