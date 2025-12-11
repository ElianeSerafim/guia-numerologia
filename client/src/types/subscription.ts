export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'premium';

export interface Plan {
  id: SubscriptionPlan;
  name: string;
  price: number;
  mapsLimit: number;
  features: string[];
  description: string;
  highlighted?: boolean;
}

export interface UserSubscription {
  email: string;
  plan: SubscriptionPlan;
  mapsGenerated: number;
  createdAt: string;
  expiresAt?: string;
  isPremium?: boolean;
}

export const PLANS: Record<SubscriptionPlan, Plan> = {
  free: {
    id: 'free',
    name: 'Explorador',
    price: 0,
    mapsLimit: 1,
    features: [
      '1 mapa numerológico',
      'Cálculos básicos',
      'Acesso por 30 dias',
    ],
    description: 'Perfeito para descobrir a numerologia',
  },
  starter: {
    id: 'starter',
    name: 'Navegador',
    price: 29.90,
    mapsLimit: 2,
    features: [
      '2 mapas numerológicos',
      'Cálculos completos',
      'Acesso por 90 dias',
      'Suporte por email',
    ],
    description: 'Para explorar seu destino',
  },
  pro: {
    id: 'pro',
    name: 'Visionário',
    price: 59.90,
    mapsLimit: 6,
    features: [
      '6 mapas numerológicos',
      'Cálculos avançados',
      'Acesso por 1 ano',
      'Suporte prioritário',
      'Relatórios em PDF',
    ],
    description: 'Para aprofundar seu conhecimento',
    highlighted: true,
  },
  premium: {
    id: 'premium',
    name: 'Iluminado',
    price: 97.00,
    mapsLimit: 10,
    features: [
      '10 mapas numerológicos',
      'Cálculos ilimitados',
      'Acesso vitalício',
      'Suporte 24/7',
      'Relatórios em PDF',
      'Análises comparativas',
      'Atualizações futuras',
    ],
    description: 'Acesso completo e ilimitado',
  },
};

export const PREMIUM_EMAILS = ['eliane@artwebcreative.com.br'];
