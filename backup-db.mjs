import mysql from 'mysql2/promise';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

async function backupDatabase() {
  console.log('🔄 Conectando ao banco de dados TiDB...\n');
  
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    const timestamp = Date.now();
    const jsonFile = `database-backup-${timestamp}.json`;
    const sqlFile = `database-backup-${timestamp}.sql`;
    
    const dump = {
      exported_at: new Date().toISOString(),
      database: 'TiDB Cloud (Manus)',
      tables: {}
    };
    
    let sqlDump = `-- Database Backup - Bússola Numerológica\n`;
    sqlDump += `-- Generated: ${new Date().toISOString()}\n`;
    sqlDump += `-- Source: TiDB Cloud (Manus)\n\n`;
    sqlDump += `SET NAMES utf8mb4;\n`;
    sqlDump += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;
    
    const tables = [
      'admins', 'coupons', 'customers', 'favorites', 'map_history',
      'numerology_maps', 'pagseguro_orders', 'password_reset_tokens',
      'payment_history', 'renascimento', 'reports', 'subscriptions', 'users'
    ];
    
    console.log('📊 Exportando tabelas:\n');
    
    for (const table of tables) {
      try {
        const [rows] = await connection.query(`SELECT * FROM \`${table}\``);
        dump.tables[table] = rows;
        console.log(`  ✓ ${table.padEnd(25)} ${rows.length} registros`);
        
        if (rows.length > 0) {
          // Get table structure
          const [createTable] = await connection.query(`SHOW CREATE TABLE \`${table}\``);
          sqlDump += `-- Table structure for ${table}\n`;
          sqlDump += `DROP TABLE IF EXISTS \`${table}\`;\n`;
          sqlDump += createTable[0]['Create Table'] + ';\n\n';
          
          // Add data
          sqlDump += `-- Data for ${table}\n`;
          for (const row of rows) {
            const columns = Object.keys(row).map(c => `\`${c}\``).join(', ');
            const values = Object.values(row).map(v => {
              if (v === null) return 'NULL';
              if (v instanceof Date) return `'${v.toISOString().slice(0, 19).replace('T', ' ')}'`;
              if (typeof v === 'string') return `'${v.replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
              if (typeof v === 'boolean') return v ? '1' : '0';
              return v;
            }).join(', ');
            sqlDump += `INSERT INTO \`${table}\` (${columns}) VALUES (${values});\n`;
          }
          sqlDump += '\n';
        }
      } catch (err) {
        console.log(`  ⚠ ${table.padEnd(25)} Erro: ${err.message}`);
      }
    }
    
    sqlDump += `SET FOREIGN_KEY_CHECKS = 1;\n`;
    
    // Save files
    fs.writeFileSync(jsonFile, JSON.stringify(dump, null, 2));
    fs.writeFileSync(sqlFile, sqlDump);
    
    const jsonSize = (fs.statSync(jsonFile).size / 1024).toFixed(2);
    const sqlSize = (fs.statSync(sqlFile).size / 1024).toFixed(2);
    
    console.log(`\n✅ Backup concluído!\n`);
    console.log(`📦 Arquivos gerados:`);
    console.log(`   → ${jsonFile} (${jsonSize} KB)`);
    console.log(`   → ${sqlFile} (${sqlSize} KB)`);
    
    await connection.end();
    
  } catch (error) {
    console.error('\n❌ Erro ao fazer backup:', error.message);
    process.exit(1);
  }
}

backupDatabase();
