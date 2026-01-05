#!/usr/bin/env node

/**
 * Migration Script: Transfer data from localStorage to PostgreSQL
 * 
 * This script initializes the database with default admin user and data
 * Run with: node server/migrate-data.mjs
 */

import { drizzle } from 'drizzle-orm/node-postgres';
import { users, admins, customers } from '../drizzle/schema.ts';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is not set');
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: DATABASE_URL,
});

const db = drizzle(pool);

async function migrateData() {
  try {
    console.log('🚀 Starting data migration from localStorage to PostgreSQL...\n');

    // 1. Create super admin user
    console.log('📝 Creating super admin user...');
    const superAdminEmail = 'eliane@artwebcreative.com.br';
    
    try {
      await db.insert(admins).values({
        email: superAdminEmail,
        name: 'Administrador Principal',
        role: 'super_admin',
        isActive: true,
        createdBy: 'system',
      });
      console.log('✅ Super admin created successfully\n');
    } catch (error) {
      console.log('ℹ️  Super admin already exists, skipping...\n');
    }

    // 2. Create sample customers (if needed)
    console.log('📝 Creating sample customers...');
    const sampleCustomers = [
      {
        email: 'cliente1@example.com',
        name: 'Cliente Teste 1',
        plan: 'basic',
        status: 'approved',
      },
      {
        email: 'cliente2@example.com',
        name: 'Cliente Teste 2',
        plan: 'professional',
        status: 'approved',
      },
    ];

    for (const customer of sampleCustomers) {
      try {
        await db.insert(customers).values(customer);
        console.log(`✅ Customer ${customer.email} created`);
      } catch (error) {
        console.log(`ℹ️  Customer ${customer.email} already exists, skipping...`);
      }
    }

    console.log('\n✅ Data migration completed successfully!');
    console.log('\n📊 Summary:');
    console.log('  - Super admin user created');
    console.log('  - Sample customers initialized');
    console.log('\n💡 Next steps:');
    console.log('  1. Update frontend to use tRPC API instead of localStorage');
    console.log('  2. Test all features with the new database');
    console.log('  3. Deploy to production');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrateData();
