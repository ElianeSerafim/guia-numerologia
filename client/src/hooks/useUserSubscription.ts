import { useState, useEffect } from 'react';
import { UserSubscription, SubscriptionPlan, PREMIUM_EMAILS } from '@/types/subscription';

const STORAGE_KEY = 'user_subscription';

export function useUserSubscription() {
  const [user, setUser] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados do localStorage ao montar o componente
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Verificar se o email é premium
  const isPremiumEmail = (email: string): boolean => {
    return PREMIUM_EMAILS.includes(email.toLowerCase());
  };

  // Registrar novo usuário
  const registerUser = (email: string, plan: SubscriptionPlan = 'free') => {
    const isPremium = isPremiumEmail(email);
    const actualPlan = isPremium ? 'premium' : plan;

    const newUser: UserSubscription = {
      email,
      plan: actualPlan as SubscriptionPlan,
      mapsGenerated: 0,
      createdAt: new Date().toISOString(),
      isPremium,
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  };

  // Atualizar plano do usuário
  const updatePlan = (plan: SubscriptionPlan) => {
    if (!user) return;

    const updatedUser: UserSubscription = {
      ...user,
      plan,
    };

    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  };

  // Incrementar contador de mapas gerados
  const incrementMapsGenerated = () => {
    if (!user) return;

    const updatedUser: UserSubscription = {
      ...user,
      mapsGenerated: user.mapsGenerated + 1,
    };

    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  };

  // Verificar se o usuário pode gerar mais mapas
  const canGenerateMap = (mapsLimit: number): boolean => {
    if (!user) return false;
    // Email premium tem acesso ilimitado
    if (user.isPremium && isPremiumEmail(user.email)) return true;
    return user.mapsGenerated < mapsLimit;
  };

  // Fazer logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Obter limite de mapas (ilimitado para premium)
  const getMapsLimit = (mapsLimit: number): number => {
    if (user && user.isPremium && isPremiumEmail(user.email)) return Infinity;
    return mapsLimit;
  };

  return {
    user,
    isLoading,
    registerUser,
    updatePlan,
    incrementMapsGenerated,
    canGenerateMap,
    getMapsLimit,
    logout,
    isPremiumEmail,
  };
}
