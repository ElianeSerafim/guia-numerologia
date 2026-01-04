/**
 * Admin User Types
 * Tipos para gerenciamento de usuários administradores
 */

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin';
  createdAt: string;
  createdBy: string;
  isActive: boolean;
}

export interface AdminManagement {
  admins: AdminUser[];
  currentAdmin: AdminUser | null;
}
