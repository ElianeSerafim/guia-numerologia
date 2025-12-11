import { useState } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';

/**
 * Calculator Component
 * 
 * Design: Minimalista com foco em usabilidade
 * - Clean form inputs com focus states claros
 * - Validação em tempo real
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

  const validate = () => {
    const newErrors: { name?: string; birthDate?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Nome completo é obrigatório';
    } else if (name.trim().split(' ').length < 2) {
      newErrors.name = 'Por favor, insira seu nome completo';
    }

    if (!birthDate) {
      newErrors.birthDate = 'Data de nascimento é obrigatória';
    } else {
      const date = new Date(birthDate);
      const today = new Date();
      if (date > today) {
        newErrors.birthDate = 'Data de nascimento não pode ser no futuro';
      }
      if (date.getFullYear() < 1900) {
        newErrors.birthDate = 'Data de nascimento parece inválida';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(name, birthDate);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Input */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-semibold text-slate-900">
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
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 font-sans disabled:opacity-50 disabled:cursor-not-allowed
            ${errors.name
              ? 'border-red-500 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/50'
              : 'border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500'
            }`}
        />
        {errors.name && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle size={16} />
            <span>{errors.name}</span>
          </div>
        )}
      </div>

      {/* Birth Date Input */}
      <div className="space-y-2">
        <label htmlFor="birthDate" className="block text-sm font-semibold text-slate-900">
          Data de Nascimento
        </label>
        <input
          id="birthDate"
          type="date"
          value={birthDate}
          onChange={(e) => {
            setBirthDate(e.target.value);
            if (errors.birthDate) setErrors({ ...errors, birthDate: undefined });
          }}
          disabled={disabled}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 font-sans disabled:opacity-50 disabled:cursor-not-allowed
            ${errors.birthDate
              ? 'border-red-500 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/50'
              : 'border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500'
            }`}
        />
        {errors.birthDate && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle size={16} />
            <span>{errors.birthDate}</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={disabled}
        className="w-full btn-mystical flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{disabled ? 'Limite de Mapas Atingido' : 'Gerar Mapa Numerológico'}</span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Info Text */}
      <p className="text-xs text-slate-500 text-center">
        Seus dados são processados localmente e não são armazenados em nossos servidores.
      </p>
    </form>
  );
}
