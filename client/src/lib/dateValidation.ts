/**
 * Validação de Datas de Nascimento
 * Verifica datas inválidas e fornece mensagens de erro amigáveis
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  errorType?: 'empty' | 'invalid_format' | 'invalid_date' | 'future_date' | 'too_old' | 'invalid_age';
}

/**
 * Valida uma data de nascimento
 * @param dateString Data no formato YYYY-MM-DD ou DD/MM/YYYY
 * @returns Objeto com resultado da validação e mensagem de erro (se houver)
 */
export function validateBirthDate(dateString: string): ValidationResult {
  // Verificar se está vazio
  if (!dateString || dateString.trim() === '') {
    return {
      isValid: false,
      error: 'Por favor, insira sua data de nascimento.',
      errorType: 'empty',
    };
  }

  let year: number, month: number, day: number;

  // Tentar parsear diferentes formatos
  if (dateString.includes('-')) {
    // Formato YYYY-MM-DD
    const parts = dateString.split('-');
    if (parts.length !== 3) {
      return {
        isValid: false,
        error: 'Formato de data inválido. Use DD/MM/YYYY ou YYYY-MM-DD.',
        errorType: 'invalid_format',
      };
    }
    year = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
    day = parseInt(parts[2], 10);
  } else if (dateString.includes('/')) {
    // Formato DD/MM/YYYY
    const parts = dateString.split('/');
    if (parts.length !== 3) {
      return {
        isValid: false,
        error: 'Formato de data inválido. Use DD/MM/YYYY.',
        errorType: 'invalid_format',
      };
    }
    day = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
    year = parseInt(parts[2], 10);
  } else {
    return {
      isValid: false,
      error: 'Formato de data inválido. Use DD/MM/YYYY ou YYYY-MM-DD.',
      errorType: 'invalid_format',
    };
  }

  // Verificar se os valores são números
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return {
      isValid: false,
      error: 'Data inválida. Verifique os números inseridos.',
      errorType: 'invalid_date',
    };
  }

  // Validar mês
  if (month < 1 || month > 12) {
    return {
      isValid: false,
      error: `Mês inválido: ${month}. O mês deve estar entre 1 e 12.`,
      errorType: 'invalid_date',
    };
  }

  // Validar dia
  if (day < 1 || day > 31) {
    return {
      isValid: false,
      error: `Dia inválido: ${day}. O dia deve estar entre 1 e 31.`,
      errorType: 'invalid_date',
    };
  }

  // Validar dias por mês
  const daysInMonth = getDaysInMonth(month, year);
  if (day > daysInMonth) {
    return {
      isValid: false,
      error: `Data inválida: ${day}/${month}/${year} não existe. ${getMonthName(month)} tem apenas ${daysInMonth} dias.`,
      errorType: 'invalid_date',
    };
  }

  // Criar objeto Date para validações adicionais
  const birthDate = new Date(year, month - 1, day);

  // Verificar se a data foi criada corretamente
  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    return {
      isValid: false,
      error: 'Data inválida. Verifique se a data existe no calendário.',
      errorType: 'invalid_date',
    };
  }

  // Verificar se é data futura
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (birthDate > today) {
    return {
      isValid: false,
      error: 'A data de nascimento não pode ser no futuro.',
      errorType: 'future_date',
    };
  }

  // Calcular idade
  const age = today.getFullYear() - year - (today < new Date(today.getFullYear(), month - 1, day) ? 1 : 0);

  // Verificar se é muito velho (mais de 150 anos)
  if (age > 150) {
    return {
      isValid: false,
      error: `Idade inválida: ${age} anos. A data de nascimento parece estar muito no passado.`,
      errorType: 'too_old',
    };
  }

  // Verificar se é muito jovem (menos de 1 dia)
  if (age < 0) {
    return {
      isValid: false,
      error: 'A data de nascimento não pode ser no futuro.',
      errorType: 'future_date',
    };
  }

  // Data válida!
  return {
    isValid: true,
  };
}

/**
 * Obtém o número de dias em um mês
 */
function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * Obtém o nome do mês
 */
function getMonthName(month: number): string {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return months[month - 1] || '';
}

/**
 * Formata uma data para o padrão DD/MM/YYYY
 */
export function formatDateBR(dateString: string): string {
  if (!dateString) return '';

  let year: number, month: number, day: number;

  if (dateString.includes('-')) {
    const parts = dateString.split('-');
    year = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
    day = parseInt(parts[2], 10);
  } else if (dateString.includes('/')) {
    return dateString; // Já está em DD/MM/YYYY
  } else {
    return '';
  }

  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
}

/**
 * Converte data DD/MM/YYYY para YYYY-MM-DD
 */
export function convertToISO(dateString: string): string {
  if (!dateString) return '';

  if (dateString.includes('-')) {
    return dateString; // Já está em YYYY-MM-DD
  }

  if (dateString.includes('/')) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      return `${year}-${month}-${day}`;
    }
  }

  return '';
}
