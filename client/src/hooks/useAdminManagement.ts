/**
 * Hook useAdminManagement
 * Gerencia usuários administradores e acesso ao dashboard
 */

import { useState, useEffect } from 'react';
import { AdminUser } from '@/types/admin';

const SUPER_ADMIN_EMAIL = 'eliane@artwebcreative.com.br';
const ADMIN_STORAGE_KEY = 'admin_users';

export const useAdminManagement = (currentEmail: string | null) => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  // Carregar admins do localStorage
  useEffect(() => {
    const storedAdmins = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (storedAdmins) {
      try {
        const parsed = JSON.parse(storedAdmins);
        setAdmins(parsed);
      } catch (e) {
        console.error('Erro ao carregar admins:', e);
        // Inicializar com super admin padrão
        initializeDefaultAdmin();
      }
    } else {
      // Primeira vez - criar super admin padrão
      initializeDefaultAdmin();
    }
  }, []);

  // Verificar se usuário atual é admin
  useEffect(() => {
    if (!currentEmail) {
      setIsAdmin(false);
      setIsSuperAdmin(false);
      return;
    }

    // Verificar se é super admin
    if (currentEmail === SUPER_ADMIN_EMAIL) {
      setIsSuperAdmin(true);
      setIsAdmin(true);
      // Garantir que admin está no localStorage
      const storedAdmins = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (!storedAdmins) {
        initializeDefaultAdmin();
      }
      return;
    }

    // Verificar se está na lista de admins
    const isAdminUser = admins.some(
      (admin) => admin.email === currentEmail && admin.isActive
    );
    setIsAdmin(isAdminUser);
    setIsSuperAdmin(false);
  }, [currentEmail, admins]);

  const initializeDefaultAdmin = () => {
    const defaultAdmin: AdminUser = {
      id: 'super_admin_1',
      email: SUPER_ADMIN_EMAIL,
      name: 'Administrador Principal',
      role: 'super_admin',
      createdAt: new Date().toISOString(),
      createdBy: 'system',
      isActive: true,
    };
    setAdmins([defaultAdmin]);
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify([defaultAdmin]));
  };

  const addAdmin = (email: string, name: string): boolean => {
    // Verificar se email já existe
    if (admins.some((admin) => admin.email === email)) {
      return false;
    }

    const newAdmin: AdminUser = {
      id: `admin_${Date.now()}`,
      email,
      name,
      role: 'admin',
      createdAt: new Date().toISOString(),
      createdBy: currentEmail || 'system',
      isActive: true,
    };

    const updated = [...admins, newAdmin];
    setAdmins(updated);
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updated));
    return true;
  };

  const removeAdmin = (adminId: string): boolean => {
    // Não permitir remover super admin
    const admin = admins.find((a) => a.id === adminId);
    if (admin?.role === 'super_admin') {
      return false;
    }

    const updated = admins.filter((a) => a.id !== adminId);
    setAdmins(updated);
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updated));
    return true;
  };

  const toggleAdminStatus = (adminId: string): boolean => {
    const admin = admins.find((a) => a.id === adminId);
    if (!admin) return false;

    const updated = admins.map((a) =>
      a.id === adminId ? { ...a, isActive: !a.isActive } : a
    );
    setAdmins(updated);
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updated));
    return true;
  };

  return {
    admins,
    isAdmin,
    isSuperAdmin,
    addAdmin,
    removeAdmin,
    toggleAdminStatus,
    superAdminEmail: SUPER_ADMIN_EMAIL,
  };
};
