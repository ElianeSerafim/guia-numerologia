import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const tables = {
  pagseguro_orders: `
    CREATE TABLE IF NOT EXISTS pagseguro_orders (
      id serial AUTO_INCREMENT NOT NULL,
      orderId varchar(255) NOT NULL,
      email varchar(320) NOT NULL,
      name varchar(255) NOT NULL,
      plan varchar(50) NOT NULL,
      amount varchar(50) NOT NULL,
      paymentMethod varchar(50) NOT NULL,
      status varchar(50) NOT NULL DEFAULT 'pending',
      pagseguroReference varchar(255),
      pagseguroCode varchar(255),
      pagseguroStatus varchar(50),
      customerId int,
      createdAt timestamp NOT NULL DEFAULT (now()),
      updatedAt timestamp NOT NULL DEFAULT (now()),
      paidAt timestamp,
      confirmedAt timestamp,
      mapsLimit int NOT NULL DEFAULT 0,
      CONSTRAINT pagseguro_orders_id PRIMARY KEY(id),
      CONSTRAINT pagseguro_orders_orderId_unique UNIQUE(orderId)
    )
  `,
  map_history: `
    CREATE TABLE IF NOT EXISTS map_history (
      id serial AUTO_INCREMENT NOT NULL,
      customerId int NOT NULL,
      name varchar(255) NOT NULL,
      birthDate varchar(20) NOT NULL,
      chart json NOT NULL,
      pdfUrl varchar(500),
      createdAt timestamp NOT NULL DEFAULT (now()),
      updatedAt timestamp NOT NULL DEFAULT (now()),
      deletedAt timestamp,
      favorite boolean NOT NULL DEFAULT false,
      notes text,
      CONSTRAINT map_history_id PRIMARY KEY(id)
    )
  `,
  renascimento: `
    CREATE TABLE IF NOT EXISTS renascimento (
      id serial AUTO_INCREMENT NOT NULL,
      numero int NOT NULL,
      titulo varchar(255) NOT NULL,
      descricao text NOT NULL,
      luz text NOT NULL,
      sombra text NOT NULL,
      praticasAfetivas text NOT NULL,
      valvulasEscape text NOT NULL,
      createdAt timestamp NOT NULL DEFAULT (now()),
      updatedAt timestamp NOT NULL DEFAULT (now()),
      createdBy varchar(320),
      CONSTRAINT renascimento_id PRIMARY KEY(id),
      CONSTRAINT renascimento_numero_unique UNIQUE(numero)
    )
  `,
  password_reset_tokens: `
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id serial AUTO_INCREMENT NOT NULL,
      email varchar(320) NOT NULL,
      token varchar(255) NOT NULL,
      expiresAt timestamp NOT NULL,
      usedAt timestamp,
      createdAt timestamp NOT NULL DEFAULT (now()),
      CONSTRAINT password_reset_tokens_id PRIMARY KEY(id),
      CONSTRAINT password_reset_tokens_token_unique UNIQUE(token)
    )
  `,
  coupons: `
    CREATE TABLE IF NOT EXISTS coupons (
      id serial AUTO_INCREMENT NOT NULL,
      code varchar(50) NOT NULL,
      discountPercent int NOT NULL,
      discountAmount varchar(50),
      maxUses int NOT NULL DEFAULT 1,
      usedCount int NOT NULL DEFAULT 0,
      expiresAt timestamp,
      isActive boolean NOT NULL DEFAULT true,
      createdAt timestamp NOT NULL DEFAULT (now()),
      updatedAt timestamp NOT NULL DEFAULT (now()),
      CONSTRAINT coupons_id PRIMARY KEY(id),
      CONSTRAINT coupons_code_unique UNIQUE(code)
    )
  `,
  payment_history: `
    CREATE TABLE IF NOT EXISTS payment_history (
      id serial AUTO_INCREMENT NOT NULL,
      customerId int NOT NULL,
      orderId varchar(255) NOT NULL,
      amount varchar(50) NOT NULL,
      paymentMethod varchar(50) NOT NULL,
      status varchar(50) NOT NULL,
      pagseguroReference varchar(255),
      pagseguroStatus varchar(50),
      plan varchar(50) NOT NULL,
      mapsLimit int NOT NULL DEFAULT 0,
      createdAt timestamp NOT NULL DEFAULT (now()),
      updatedAt timestamp NOT NULL DEFAULT (now()),
      paidAt timestamp,
      refundedAt timestamp,
      CONSTRAINT payment_history_id PRIMARY KEY(id)
    )
  `,
  reports: `
    CREATE TABLE IF NOT EXISTS reports (
      id serial AUTO_INCREMENT NOT NULL,
      type varchar(50) NOT NULL,
      data json NOT NULL,
      generatedAt timestamp NOT NULL DEFAULT (now()),
      generatedBy varchar(320),
      period varchar(50),
      CONSTRAINT reports_id PRIMARY KEY(id)
    )
  `,
  numerology_maps: `
    CREATE TABLE IF NOT EXISTS numerology_maps (
      id serial AUTO_INCREMENT NOT NULL,
      customerId int NOT NULL,
      mapData json NOT NULL,
      pdfUrl varchar(500),
      createdAt timestamp NOT NULL DEFAULT (now()),
      updatedAt timestamp NOT NULL DEFAULT (now()),
      deletedAt timestamp,
      CONSTRAINT numerology_maps_id PRIMARY KEY(id)
    )
  `,
  favorites: `
    CREATE TABLE IF NOT EXISTS favorites (
      id serial AUTO_INCREMENT NOT NULL,
      customerId int NOT NULL,
      mapHistoryId int NOT NULL,
      createdAt timestamp NOT NULL DEFAULT (now()),
      updatedAt timestamp NOT NULL DEFAULT (now()),
      deletedAt timestamp,
      notes text,
      tags json,
      reminderDate timestamp,
      CONSTRAINT favorites_id PRIMARY KEY(id)
    )
  `,
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id serial AUTO_INCREMENT NOT NULL,
      email varchar(320) NOT NULL,
      name varchar(255) NOT NULL,
      password varchar(255) NOT NULL,
      role varchar(50) NOT NULL DEFAULT 'user',
      isActive boolean NOT NULL DEFAULT true,
      createdAt timestamp NOT NULL DEFAULT (now()),
      updatedAt timestamp NOT NULL DEFAULT (now()),
      lastLoginAt timestamp,
      CONSTRAINT users_id PRIMARY KEY(id),
      CONSTRAINT users_email_unique UNIQUE(email)
    )
  `
};

async function createAllTables() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  
  console.log('Criando tabelas faltantes...\n');
  
  for (const [tableName, sql] of Object.entries(tables)) {
    try {
      await conn.query(sql);
      console.log(`✓ ${tableName} criada`);
    } catch (err) {
      console.error(`✗ ${tableName}: ${err.message}`);
    }
  }
  
  await conn.end();
  console.log('\n✅ Processo concluído!');
}

createAllTables();
