import { Sparkles, Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import { DailyTip } from '@/lib/dailyTips';

interface DailyTipCardProps {
  tip: DailyTip;
  currentDate: Date;
}

/**
 * Card de Dica Rápida Diária
 * 
 * Exibe a dica do dia com design místico e informações práticas
 * para aproveitar a energia numerológica do dia.
 */
export default function DailyTipCard({ tip, currentDate }: DailyTipCardProps) {
  const dateStr = currentDate.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#07131B] via-[#0A1F2E] to-[#07131B] border-2 border-[#00FFFF] shadow-[0_0_30px_rgba(0,255,255,0.3)] mb-8">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FFFF] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#19E6FF] rounded-full blur-3xl"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#19E6FF] flex items-center justify-center shadow-lg">
              <Sparkles className="text-[#07131B]" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#00FFFF] uppercase tracking-wider">Dica do Dia</h3>
              <p className="text-xs text-slate-400 capitalize">{dateStr}</p>
            </div>
          </div>
          <div className="w-16 h-16 rounded-full bg-[#00FFFF]/20 border-2 border-[#00FFFF] flex items-center justify-center">
            <span className="text-3xl font-bold text-[#00FFFF]">{tip.number}</span>
          </div>
        </div>

        {/* Título da energia do dia */}
        <div className="mb-6">
          <h4 className="text-2xl font-bold text-white mb-3">{tip.title}</h4>
          <p className="text-slate-300 leading-relaxed">{tip.tip}</p>
        </div>

        {/* Ações práticas */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* O que fazer */}
          <div className="bg-[#00FFFF]/10 rounded-xl p-4 border border-[#00FFFF]/30">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00FFFF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="text-[#00FFFF]" size={18} />
              </div>
              <div>
                <h5 className="font-semibold text-[#00FFFF] mb-2 text-sm uppercase tracking-wider">✓ Faça Hoje</h5>
                <p className="text-sm text-slate-300 leading-relaxed">{tip.action}</p>
              </div>
            </div>
          </div>

          {/* O que evitar */}
          <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <XCircle className="text-red-400" size={18} />
              </div>
              <div>
                <h5 className="font-semibold text-red-400 mb-2 text-sm uppercase tracking-wider">✗ Evite Hoje</h5>
                <p className="text-sm text-slate-300 leading-relaxed">{tip.avoid}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer motivacional */}
        <div className="mt-6 pt-6 border-t border-[#00FFFF]/20 flex items-center gap-2 justify-center">
          <Lightbulb className="text-[#00FFFF]" size={20} />
          <p className="text-sm text-[#00FFFF] font-medium">Aproveite a energia do dia e faça acontecer!</p>
        </div>
      </div>
    </div>
  );
}
