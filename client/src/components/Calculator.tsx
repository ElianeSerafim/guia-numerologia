import { useState } from 'react';
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { validateBirthDate } from '../lib/dateValidation';

/**
 * Calculator Component
 * 
 * Design: Minimalista com foco em usabilidade
 * - Clean form inputs com focus states claros
 * - Validação robusta de datas
 * - Feedback visual para erros
 */

interface CalculatorProps {
  onSubmit: (name: string, birthDate: string) => void;
  disabled?: boolean;
}

export default function Calculator({ onSubmit, disabled = false }: CalculatorProps) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [errors, setErrors] = useState<{ name?: string; birthDate?: string }>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingName, setPendingName] = useState('');
  const [pendingBirthDate, setPendingBirthDate] = useState('');

  const validate = () => {
    const newErrors: { name?: string; birthDate?: string } = {};

    // Validar nome
    if (!name.trim()) {
      newErrors.name = 'Nome completo é obrigatório';
    } else if (name.trim().split(' ').length < 2) {
      newErrors.name = 'Por favor, insira seu nome completo';
    } else if (name.trim().length > 100) {
      newErrors.name = 'Nome muito longo (máximo 100 caracteres)';
    }

    // Validar data de nascimento com função robusta
    if (!birthDate) {
      newErrors.birthDate = 'Data de nascimento é obrigatória';
    } else {
      const validation = validateBirthDate(birthDate);
      if (!validation.isValid) {
        newErrors.birthDate = validation.error || 'Data de nascimento inválida';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setPendingName(name);
      setPendingBirthDate(birthDate);
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    onSubmit(pendingName, pendingBirthDate);
    setShowConfirmation(false);
    setPendingName('');
    setPendingBirthDate('');
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setPendingName('');
    setPendingBirthDate('');
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-to-br from-purple-950/30 via-purple-900/20 to-black rounded-2xl p-8 border border-purple-600/30 backdrop-blur-sm">
      {/* Name Input */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-semibold text-white flex items-center gap-2">
          <span className="text-yellow-500">✨</span>
          Nome Completo
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors({ ...errors, name: undefined });
          }}
          disabled={disabled}
          placeholder="Ex: João Silva Santos"
          maxLength={100}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 font-sans disabled:opacity-50 disabled:cursor-not-allowed text-white placeholder-gray-400
            ${errors.name
              ? 'border-red-500 bg-purple-950 focus:outline-none focus:ring-2 focus:ring-red-500/50'
              : 'border-purple-600 bg-black hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-yellow-500'
            }`}
        />
        {errors.name && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{errors.name}</span>
          </div>
        )}
      </div>

      {/* Birth Date Input */}
      <div className="space-y-2">
        <label htmlFor="birthDate" className="block text-sm font-semibold text-white flex items-center gap-2">
          <span className="text-yellow-500">✨</span>
          Data de Nascimento
        </label>
        <input
          id="birthDate"
          type="text"
          inputMode="numeric"
          placeholder="DD/MM/YYYY"
          value={birthDate}
          maxLength={10}
          onChange={(e) => {
            let value = e.target.value;
            value = value.replace(/[^0-9]/g, '');
            if (value.length > 0) {
              if (value.length <= 2) {
                value = value;
              } else if (value.length <= 4) {
                value = value.slice(0, 2) + '/' + value.slice(2);
              } else if (value.length <= 8) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4);
              }
            }
            setBirthDate(value);
            if (errors.birthDate) setErrors({ ...errors, birthDate: undefined });
          }}
          disabled={disabled}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 font-sans disabled:opacity-50 disabled:cursor-not-allowed text-white
            ${errors.birthDate
              ? 'border-red-500 bg-purple-950 focus:outline-none focus:ring-2 focus:ring-red-500/50'
              : 'border-purple-600 bg-black hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-yellow-500'
            }`}
        />
        {errors.birthDate && (
          <div className="flex items-start gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{errors.birthDate}</span>
          </div>
        )}
        <p className="text-xs text-white/60">
          Use o formato DD/MM/YYYY (ex: 04/01/1970)
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={disabled}
        className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-500 hover:to-yellow-400 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-600/50"
      >
        <span>{disabled ? 'Limite de Mapas Atingido' : 'Gerar Mapa Numerológico'}</span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Upgrade Message */}
      {disabled && (
        <div className="p-4 bg-gradient-to-r from-purple-600/20 to-yellow-500/20 border border-yellow-500/50 rounded-lg">
          <p className="text-sm text-white/80 text-center">
            Você atingiu o limite de mapas do seu plano atual. 
            <br />
            <span className="text-yellow-500 font-semibold">Faça upgrade para continuar sua jornada numerológica.</span>
          </p>
        </div>
      )}

      {/* Info Text */}
      <p className="text-xs text-white/70 text-center flex items-center justify-center gap-1">
        <span className="text-yellow-500">🔒</span>
        Seus dados são processados localmente e não são armazenados em nossos servidores.
      </p>
    </form>

    {/* Confirmation Modal */}
    {showConfirmation && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-purple-950 to-black rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 animate-in fade-in zoom-in duration-300 border border-purple-600/30">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center">
              <CheckCircle2 className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Confirme seus dados</h3>
              <p className="text-sm text-white/70">Verifique se as informações estão corretas</p>
            </div>
          </div>

          {/* Data Review */}
          <div className="space-y-4 bg-purple-950/50 rounded-lg p-4 border border-purple-600/20">
            <div>
              <p className="text-xs font-semibold text-yellow-500 uppercase tracking-wide">Nome de Solteiro</p>
              <p className="text-lg font-semibold text-white mt-1">{pendingName}</p>
            </div>
            <div className="border-t border-purple-600/30 pt-4">
              <p className="text-xs font-semibold text-yellow-500 uppercase tracking-wide">Data de Nascimento</p>
              <p className="text-lg font-semibold text-white mt-1">{pendingBirthDate}</p>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-purple-600/10 border border-yellow-500/50 rounded-lg p-4">
            <p className="text-sm text-white/90">
              <span className="font-semibold text-yellow-500">Atenção:</span> Você tem direito a apenas <span className="font-bold text-yellow-500">1 cálculo</span> com este plano. Certifique-se de que os dados estão corretos antes de prosseguir.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-3 rounded-lg border-2 border-purple-600 text-white font-semibold hover:bg-purple-600/20 transition-colors"
            >
              Corrigir Dados
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-yellow-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all"
            >
              Confirmar e Calcular
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
