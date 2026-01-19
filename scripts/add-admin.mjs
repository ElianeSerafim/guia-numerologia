import * as db from '../server/db.ts';

async function addAdmin() {
  try {
    const admin = await db.createAdmin({
      email: 'eliane@artwebcreative.com.br',
      name: 'Eliane Serafim',
      role: 'admin',
      isActive: true,
      createdBy: 'system',
    });
    
    console.log('✅ Admin criado com sucesso:', admin);
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

addAdmin();
