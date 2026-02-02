import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './drizzle/schema.ts';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

async function exportDatabase() {
  console.log('🔄 Conectando ao banco de dados...');
  
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection, { schema, mode: 'default' });
  
  console.log('📊 Exportando dados das tabelas...');
  
  const dump = {
    exported_at: new Date().toISOString(),
    database_url: process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@'), // Hide password
    tables: {}
  };
  
  try {
    // Export all tables
    const tables = [
      'admins', 'coupons', 'customers', 'favorites', 'map_history',
      'numerology_maps', 'pagseguro_orders', 'password_reset_tokens',
      'payment_history', 'renascimento', 'reports', 'subscriptions', 'users'
    ];
    
    for (const table of tables) {
      console.log(`  ↳ Exportando ${table}...`);
      const [rows] = await connection.query(`SELECT * FROM ${table}`);
      dump.tables[table] = rows;
      console.log(`    ✓ ${rows.length} registros`);
    }
    
    // Save to file
    const filename = `database-backup-${Date.now()}.json`;
    fs.writeFileSync(filename, JSON.stringify(dump, null, 2));
    console.log(`\n✅ Backup salvo em: ${filename}`);
    console.log(`📦 Tamanho: ${(fs.statSync(filename).size / 1024).toFixed(2)} KB`);
    
  } catch (error) {
    console.error('❌ Erro ao exportar:', error.message);
  } finally {
    await connection.end();
  }
}

exportDatabase();
