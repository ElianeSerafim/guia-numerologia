import { useState, useEffect, useCallback } from 'react';
import { Customer, PaymentStatus, SubscriptionPlan, PaymentConfig } from '@/types/payment';
import { nanoid } from 'nanoid';

const STORAGE_KEY_CUSTOMERS = 'numerology_customers';
const STORAGE_KEY_CONFIG = 'numerology_payment_config';
const ADMIN_EMAIL = 'eliane@artwebcreative.com.br';
const DEFAULT_WHATSAPP = 'https://wa.me/5511999999999';

/**
 * Hook para gerenciar clientes, pagamentos e status
 * 
 * Funcionalidades:
 * - Criar cliente após clique em plano
 * - Gerenciar status de pagamento (pending/approved/rejected)
 * - Liberar acesso após aprovação
 * - Rastrear mapas gerados por cliente
 */

export function usePaymentManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [config, setConfig] = useState<PaymentConfig>({
    whatsappLink: DEFAULT_WHATSAPP,
    adminEmail: ADMIN_EMAIL
  });
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados ao montar
  useEffect(() => {
    loadData();
  }, []);

  // Carregar clientes e config do localStorage
  const loadData = useCallback(() => {
    try {
      const storedCustomers = localStorage.getItem(STORAGE_KEY_CUSTOMERS);
      if (storedCustomers) {
        setCustomers(JSON.parse(storedCustomers));
      }

      const storedConfig = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (storedConfig) {
        setConfig(JSON.parse(storedConfig));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Salvar clientes no localStorage
  const saveCustomers = useCallback((newCustomers: Customer[]) => {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(newCustomers));
      setCustomers(newCustomers);
    } catch (error) {
      console.error('Erro ao salvar clientes:', error);
    }
  }, []);

  // Salvar config no localStorage
  const saveConfig = useCallback((newConfig: PaymentConfig) => {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(newConfig));
      setConfig(newConfig);
    } catch (error) {
      console.error('Erro ao salvar config:', error);
    }
  }, []);

  // Atualizar link do WhatsApp
  const updateWhatsappLink = useCallback((link: string) => {
    const newConfig = { ...config, whatsappLink: link };
    saveConfig(newConfig);
  }, [config, saveConfig]);

  // Criar novo cliente após clique em plano
  const createCustomer = useCallback(
    (email: string, fullName: string, plan: SubscriptionPlan) => {
      const existingCustomer = customers.find(c => c.email === email);

      if (existingCustomer) {
        // Atualizar plano se cliente já existe
        const updated = customers.map(c =>
          c.email === email
            ? { ...c, plan, status: 'pending' as PaymentStatus, createdAt: Date.now() }
            : c
        );
        saveCustomers(updated);
        return updated.find(c => c.email === email)!;
      }

      // Criar novo cliente
      const newCustomer: Customer = {
        id: nanoid(),
        email,
        fullName,
        plan,
        status: 'pending',
        mapsGenerated: 0,
        mapsLimit: getMapsLimit(plan),
        createdAt: Date.now()
      };

      saveCustomers([newCustomer, ...customers]);
      return newCustomer;
    },
    [customers, saveCustomers]
  );

  // Obter limite de mapas por plano
  const getMapsLimit = (plan: SubscriptionPlan): number => {
    const limits: Record<SubscriptionPlan, number> = {
      navigator: 2,
      visionary: 6,
      illuminated: 10,
      premium: Infinity
    };
    return limits[plan];
  };

  // Obter cliente por email
  const getCustomerByEmail = useCallback(
    (email: string) => {
      return customers.find(c => c.email === email);
    },
    [customers]
  );

  // Aprovar cliente (liberar acesso)
  const approveCustomer = useCallback(
    (customerId: string, notes?: string) => {
      const updated = customers.map(c =>
        c.id === customerId
          ? {
              ...c,
              status: 'approved' as PaymentStatus,
              approvedAt: Date.now(),
              notes
            }
          : c
      );
      saveCustomers(updated);
    },
    [customers, saveCustomers]
  );

  // Rejeitar cliente
  const rejectCustomer = useCallback(
    (customerId: string, notes?: string) => {
      const updated = customers.map(c =>
        c.id === customerId
          ? {
              ...c,
              status: 'rejected' as PaymentStatus,
              notes
            }
          : c
      );
      saveCustomers(updated);
    },
    [customers, saveCustomers]
  );

  // Incrementar contador de mapas gerados
  const incrementMapsGenerated = useCallback(
    (email: string) => {
      const updated = customers.map(c =>
        c.email === email
          ? { ...c, mapsGenerated: c.mapsGenerated + 1 }
          : c
      );
      saveCustomers(updated);
    },
    [customers, saveCustomers]
  );

  // Verificar se cliente pode gerar mais mapas
  const canGenerateMap = useCallback(
    (email: string): boolean => {
      const customer = getCustomerByEmail(email);
      if (!customer) return false;
      if (customer.status !== 'approved') return false;
      return customer.mapsGenerated < customer.mapsLimit;
    },
    [getCustomerByEmail]
  );

  // Obter mapas restantes
  const getRemainingMaps = useCallback(
    (email: string): number => {
      const customer = getCustomerByEmail(email);
      if (!customer) return 0;
      return Math.max(0, customer.mapsLimit - customer.mapsGenerated);
    },
    [getCustomerByEmail]
  );

  // Obter todos os clientes (apenas para admin)
  const getAllCustomers = useCallback(() => {
    return customers;
  }, [customers]);

  // Obter clientes pendentes
  const getPendingCustomers = useCallback(() => {
    return customers.filter(c => c.status === 'pending');
  }, [customers]);

  // Obter clientes aprovados
  const getApprovedCustomers = useCallback(() => {
    return customers.filter(c => c.status === 'approved');
  }, [customers]);

  // Deletar cliente
  const deleteCustomer = useCallback(
    (customerId: string) => {
      const updated = customers.filter(c => c.id !== customerId);
      saveCustomers(updated);
    },
    [customers, saveCustomers]
  );

  // Exportar clientes como JSON
  const exportCustomers = useCallback(() => {
    const dataStr = JSON.stringify(customers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `clientes-numerologia-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [customers]);

  return {
    customers,
    config,
    isLoading,
    createCustomer,
    getCustomerByEmail,
    approveCustomer,
    rejectCustomer,
    incrementMapsGenerated,
    canGenerateMap,
    getRemainingMaps,
    getAllCustomers,
    getPendingCustomers,
    getApprovedCustomers,
    deleteCustomer,
    exportCustomers,
    updateWhatsappLink,
    getMapsLimit
  };
}
