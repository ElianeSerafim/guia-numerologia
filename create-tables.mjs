import mysql from 'mysql2/promise';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

async function createTables() {
  const sql = fs.readFileSync('create-missing-tables.sql', 'utf8');
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s && !s.startsWith('--'));
  
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  
  console.log('Criando tabelas faltantes...\n');
  
  for (const statement of statements) {
    try {
      await conn.query(statement);
      const match = statement.match(/CREATE TABLE IF NOT EXISTS `(\w+)`/);
      if (match) {
        console.log(`✓ Tabela ${match[1]} criada`);
      }
    } catch (err) {
      console.error(`✗ Erro:`, err.message);
    }
  }
  
  await conn.end();
  console.log('\n✅ Todas as tabelas foram criadas!');
}

createTables();
