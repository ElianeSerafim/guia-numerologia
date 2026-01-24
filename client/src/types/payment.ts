/**
 * Tipos para Sistema de Pagamento e Gerenciamento de Clientes
 */

export type PaymentStatus = 'pending' | 'approved' | 'rejected';
export type SubscriptionPlan = 'navigator' | 'visionary' | 'illuminated' | 'premium';

export interface Customer {
  id: string;
  email: string;
  fullName: string;
  plan: SubscriptionPlan;
  status: PaymentStatus;
  mapsGenerated: number;
  mapsLimit: number;
  createdAt: number;
  approvedAt?: number;
  notes?: string;
}

export interface PaymentConfig {
  whatsappLink: string;
  adminEmail: string;
}

export interface PlanDetails {
  id: SubscriptionPlan;
  name: string;
  price: number;
  mapsLimit: number;
  description: string;
  features: string[];
}

export const PLANS: Record<SubscriptionPlan, PlanDetails> = {
  navigator: {
    id: 'navigator',
    name: 'Geração de 1 mapa',
    price: 29.90,
    mapsLimit: 1,
    description: 'Perfeito para começar sua jornada numerológica',
    features: [
      'Geração de 1 mapa numerológico',
      'Interpretações detalhadas',
      'Exportação em PDF',
      'Histórico de mapas'
    ]
  },
  visionary: {
    id: 'visionary',
    name: 'Geração de 3 mapas',
    price: 59.90,
    mapsLimit: 3,
    description: 'Para explorar profundamente a numerologia',
    features: [
      'Geração de 3 mapas numerológicos',
      'Interpretações detalhadas',
      'Exportação em PDF',
      'Histórico de mapas',
      'Comparação de compatibilidade'
    ]
  },
  illuminated: {
    id: 'illuminated',
    name: 'Iluminado',
    price: 97.00,
    mapsLimit: 10,
    description: 'Acesso completo à sabedoria numerológica',
    features: [
      'Geração de 10 mapas numerológicos',
      'Interpretações detalhadas',
      'Exportação em PDF',
      'Histórico de mapas',
      'Comparação de compatibilidade',
      'Suporte prioritário'
    ]
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: 0,
    mapsLimit: Infinity,
    description: 'Acesso ilimitado (Admin)',
    features: [
      'Mapas ilimitados',
      'Todas as funcionalidades',
      'Suporte total'
    ]
  }
};
