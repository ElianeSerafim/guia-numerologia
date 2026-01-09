import { NumerologyChart } from '@/types';
import { Calendar, Zap, TrendingUp } from 'lucide-react';

interface PersonalYearProgressProps {
  chart: NumerologyChart;
}

/**
 * Componente de Progresso do Ano Pessoal
 * 
 * Exibe:
 * - Barra de progresso visual do ano pessoal atual
 * - Meses decorridos vs total
 * - Número do ano pessoal
 * - Próximas datas importantes
 */
export default function PersonalYearProgress({ chart }: PersonalYearProgressProps) {
  // Calcular progresso do ano pessoal
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Data de aniversário
  const parts = chart.birthDate.split('-');
  const birthMonth = parseInt(parts[1]);
  const birthDay = parseInt(parts[2]);

  // Determinar o ano pessoal que começou (aniversário)
  let yearStartMonth = birthMonth;
  let yearStartDay = birthDay;
  let yearStartYear = currentYear;

  // Se o aniversário já passou este ano
  const hasHadBirthdayThisYear =
    currentMonth > birthMonth ||
    (currentMonth === birthMonth && currentDay >= birthDay);

  if (!hasHadBirthdayThisYear) {
    yearStartYear = currentYear - 1;
  }

  // Data de início do ano pessoal (último aniversário)
  const yearStartDate = new Date(yearStartYear, yearStartMonth - 1, yearStartDay);

  // Data de fim do ano pessoal (próximo aniversário)
  const yearEndDate = new Date(yearStartYear + 1, yearStartMonth - 1, yearStartDay);

  // Calcular progresso
  const totalMilliseconds = yearEndDate.getTime() - yearStartDate.getTime();
  const elapsedMilliseconds = today.getTime() - yearStartDate.getTime();
  const progressPercentage = Math.min(
    Math.max((elapsedMilliseconds / totalMilliseconds) * 100, 0),
    100
  );

  // Calcular meses
  const monthsElapsed = Math.floor(
    (currentMonth - birthMonth + (currentDay >= birthDay ? 0 : -1) + 12) % 12
  );
  const monthsRemaining = 12 - monthsElapsed;

  // Formatar datas
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Cores baseadas no progresso
  const getProgressColor = () => {
    if (progressPercentage < 33) return 'from-[#8A2BE2] to-[#D4AF37]';
    if (progressPercentage < 66) return 'from-[#D4AF37] to-[#FFD700]';
    return 'from-[#FFD700] to-[#8A2BE2]';
  };

  // Interpretação do progresso
  const getPhaseDescription = () => {
    if (progressPercentage < 33) {
      return 'Fase Inicial - Novos começos e oportunidades';
    }
    if (progressPercentage < 66) {
      return 'Fase de Desenvolvimento - Consolidação e crescimento';
    }
    return 'Fase de Colheita - Realização e transformação';
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#8A2BE2] to-[#D4AF37]">
            <Calendar size={20} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">Progresso do Ano Pessoal</h3>
        </div>
        <p className="text-[#B8A8D8] text-sm">
          Seu ano pessoal número <span className="font-bold text-[#D4AF37]">{chart.personalYear}</span>
        </p>
      </div>

      {/* Card Principal */}
      <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#4A2A6A] rounded-xl p-8">
        {/* Barra de Progresso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#B8A8D8] font-medium">Progresso do Ano</span>
            <span className="text-[#D4AF37] font-bold text-lg">{Math.round(progressPercentage)}%</span>
          </div>

          {/* Barra com gradiente */}
          <div className="relative w-full h-4 bg-[#1A0A2A] rounded-full overflow-hidden border border-[#4A2A6A]">
            <div
              className={`h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-500 ease-out shadow-lg shadow-[#D4AF37]/50`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Informações de Tempo */}
        <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-[#4A2A6A]">
          {/* Meses Decorridos */}
          <div className="text-center">
            <div className="text-3xl font-bold text-[#D4AF37] mb-1">{monthsElapsed}</div>
            <div className="text-[#B8A8D8] text-sm">Meses Decorridos</div>
          </div>

          {/* Divisor */}
          <div className="flex items-center justify-center">
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-[#4A2A6A] to-transparent"></div>
          </div>

          {/* Meses Restantes */}
          <div className="text-center">
            <div className="text-3xl font-bold text-[#FFD700] mb-1">{monthsRemaining}</div>
            <div className="text-[#B8A8D8] text-sm">Meses Restantes</div>
          </div>
        </div>

        {/* Fase Atual */}
        <div className="flex items-start gap-3 mb-6">
          <div className="p-2 rounded-lg bg-[#4A2A6A]">
            <TrendingUp size={18} className="text-[#D4AF37]" />
          </div>
          <div>
            <p className="text-[#D4AF37] font-semibold mb-1">Fase Atual</p>
            <p className="text-[#B8A8D8]">{getPhaseDescription()}</p>
          </div>
        </div>

        {/* Datas Importantes */}
        <div className="space-y-3 bg-[#1A0A2A] rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-[#B8A8D8] text-sm">Início do Ano Pessoal</span>
            <span className="text-white font-semibold">{formatDate(yearStartDate)}</span>
          </div>
          <div className="h-px bg-[#4A2A6A]"></div>
          <div className="flex justify-between items-center">
            <span className="text-[#B8A8D8] text-sm">Próximo Aniversário</span>
            <span className="text-[#D4AF37] font-semibold">{formatDate(yearEndDate)}</span>
          </div>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Ano Pessoal 2026 */}
        <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#4A2A6A] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[#4A2A6A]">
              <Zap size={16} className="text-[#FFD700]" />
            </div>
            <h4 className="font-semibold text-white">Ano Pessoal 2026</h4>
          </div>
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">
            {chart.personalYear2026}
          </div>
          <p className="text-[#B8A8D8] text-sm mt-2">
            Número que rege suas energias em 2026
          </p>
        </div>

        {/* Mês Pessoal Atual */}
        <div className="bg-gradient-to-br from-[#2A1A4A] to-[#1A0A2A] border border-[#4A2A6A] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[#4A2A6A]">
              <Calendar size={16} className="text-[#D4AF37]" />
            </div>
            <h4 className="font-semibold text-white">Mês Pessoal Atual</h4>
          </div>
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] to-[#D4AF37]">
            {chart.personalMonth}
          </div>
          <p className="text-[#B8A8D8] text-sm mt-2">
            Influência numerológica deste mês
          </p>
        </div>
      </div>

      {/* Dica */}
      <div className="bg-[#2A1A4A]/50 border border-[#4A2A6A] rounded-lg p-4">
        <p className="text-[#B8A8D8] text-sm">
          <span className="text-[#D4AF37] font-semibold">💡 Dica:</span> O progresso do seu ano pessoal reflete as energias em ação. Use este conhecimento para alinhar suas ações com as oportunidades do momento.
        </p>
      </div>
    </div>
  );
}
