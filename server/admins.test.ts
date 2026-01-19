import { describe, it, expect, beforeAll } from 'vitest';
import * as db from './db';

describe('Admin Management', () => {
  beforeAll(async () => {
    // Ensure admin exists
    const existing = await db.getAdminByEmail('eliane@artwebcreative.com.br');
    if (!existing) {
      await db.createAdmin({
        email: 'eliane@artwebcreative.com.br',
        name: 'Eliane Serafim',
        role: 'admin',
        isActive: true,
        createdBy: 'system',
      });
    }
  });

  it('should get admin by email', async () => {
    const admin = await db.getAdminByEmail('eliane@artwebcreative.com.br');
    expect(admin).toBeDefined();
    expect(admin?.email).toBe('eliane@artwebcreative.com.br');
    expect(admin?.name).toBe('Eliane Serafim');
    expect(admin?.role).toBe('admin');
  });

  it('should return undefined for non-existent admin', async () => {
    const admin = await db.getAdminByEmail('nonexistent@example.com');
    expect(admin).toBeUndefined();
  });

  it('should get all active admins', async () => {
    const admins = await db.getAllAdmins();
    expect(Array.isArray(admins)).toBe(true);
    expect(admins.length).toBeGreaterThan(0);
    
    // Check if our admin is in the list
    const elianeAdmin = admins.find(a => a.email === 'eliane@artwebcreative.com.br');
    expect(elianeAdmin).toBeDefined();
  });

  it('should update admin', async () => {
    const admin = await db.getAdminByEmail('eliane@artwebcreative.com.br');
    if (!admin) throw new Error('Admin not found');

    const updated = await db.updateAdmin(admin.id, {
      name: 'Eliane Serafim Updated',
    });

    expect(updated.name).toBe('Eliane Serafim Updated');

    // Restore original name
    await db.updateAdmin(admin.id, {
      name: 'Eliane Serafim',
    });
  });
});
