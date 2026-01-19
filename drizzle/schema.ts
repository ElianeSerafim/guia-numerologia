import { 
  pgTable, 
  pgEnum, 
  serial, 
  varchar, 
  text, 
  timestamp, 
  boolean, 
  integer,
  decimal,
  jsonb,
  date
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * PostgreSQL Enum for user roles
 */
export const roleEnum = pgEnum("role", ["user", "admin"]);

/**
 * PostgreSQL Enum for subscription plans
 */
export const planEnum = pgEnum("plan", ["basic", "professional", "premium"]);

/**
 * PostgreSQL Enum for customer status
 */
export const customerStatusEnum = pgEnum("customer_status", ["pending", "approved", "rejected"]);

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: serial("id").primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }).unique(),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Customers table for managing subscription customers
 */
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  plan: planEnum("plan").default("basic").notNull(),
  status: customerStatusEnum("status").default("pending").notNull(),
  mapsGenerated: integer("mapsGenerated").default(0).notNull(),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  paymentId: varchar("paymentId", { length: 255 }),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  currency: varchar("currency", { length: 3 }).default("BRL"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  approvedAt: timestamp("approvedAt"),
});

export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = typeof customers.$inferInsert;

/**
 * Numerology maps table for storing generated maps
 */
export const numerologyMaps = pgTable("numerology_maps", {
  id: serial("id").primaryKey(),
  customerId: integer("customerId").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  birthDate: varchar("birthDate", { length: 50 }).notNull(),
  chartData: jsonb("chartData").notNull(), // Store the complete chart as JSON
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type NumerologyMap = typeof numerologyMaps.$inferSelect;
export type InsertNumerologyMap = typeof numerologyMaps.$inferInsert;

/**
 * Admins table for managing admin users
 */
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).default("admin").notNull(), // admin, super_admin
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  createdBy: varchar("createdBy", { length: 320 }),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = typeof admins.$inferInsert;

/**
 * Coupons table for managing discount codes
 */
export const coupons = pgTable("coupons", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  discountPercentage: integer("discountPercentage").notNull(),
  maxUses: integer("maxUses"),
  currentUses: integer("currentUses").default(0).notNull(),
  expiresAt: timestamp("expiresAt"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  createdBy: varchar("createdBy", { length: 320 }),
});

export type Coupon = typeof coupons.$inferSelect;
export type InsertCoupon = typeof coupons.$inferInsert;

/**
 * Payment history table for tracking all transactions
 */
export const paymentHistory = pgTable("payment_history", {
  id: serial("id").primaryKey(),
  customerId: integer("customerId").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  plan: planEnum("plan").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("BRL"),
  status: varchar("status", { length: 50 }).notNull(), // pending, completed, failed
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  paymentId: varchar("paymentId", { length: 255 }),
  couponCode: varchar("couponCode", { length: 50 }),
  discountAmount: decimal("discountAmount", { precision: 10, scale: 2 }).default("0"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type PaymentHistory = typeof paymentHistory.$inferSelect;
export type InsertPaymentHistory = typeof paymentHistory.$inferInsert;

/**
 * Reports table for storing admin reports
 */
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // sales, customers, usage, etc
  data: jsonb("data").notNull(),
  generatedBy: varchar("generatedBy", { length: 320 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;

/**
 * Relations for Drizzle ORM
 */
export const customersRelations = relations(customers, ({ many }) => ({
  numerologyMaps: many(numerologyMaps),
  paymentHistory: many(paymentHistory),
  renascimento: many(renascimento),
}));

export const numerologyMapsRelations = relations(numerologyMaps, ({ one }) => ({
  customer: one(customers, {
    fields: [numerologyMaps.customerId],
    references: [customers.id],
  }),
}));

export const paymentHistoryRelations = relations(paymentHistory, ({ one }) => ({
  customer: one(customers, {
    fields: [paymentHistory.customerId],
    references: [customers.id],
  }),
}));

/**
 * Favorites table for storing user favorite sections and interpretations
 */
export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  mapId: integer("mapId").notNull(),
  sectionType: varchar("sectionType", { length: 50 }).notNull(), // cd, mo, eu, ex, merito, ciclos, realizacoes, desafios, etc
  sectionTitle: varchar("sectionTitle", { length: 255 }).notNull(),
  sectionContent: text("sectionContent").notNull(),
  notes: text("notes"), // User's personal notes about this favorite
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = typeof favorites.$inferInsert;

/**
 * Updated relations with favorites
 */
export const favoritesRelations = relations(favorites, ({ one }) => ({
  numerologyMap: one(numerologyMaps, {
    fields: [favorites.mapId],
    references: [numerologyMaps.id],
  }),
}));


/**
 * Renascimento table for storing advanced interpretation data
 * Stores information about Renascimento (Rebirth) events for clients
 */
export const renascimento = pgTable("renascimento", {
  id: serial("id").primaryKey(),
  customerId: integer("customerId").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  hasFactoGrave: boolean("hasFactoGrave").default(false).notNull(),
  factoGraveType: varchar("factoGraveType", { length: 100 }), // enfermidade, acidente, perda_material, perda_afetiva
  notes: text("notes"), // Admin notes about the Renascimento
  realizacao: integer("realizacao"), // Which realization (2, 3, or 4)
  realizacaoNumber: integer("realizacaoNumber"), // The number of the realization
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  updatedBy: varchar("updatedBy", { length: 320 }), // Admin email who last updated
});

export type Renascimento = typeof renascimento.$inferSelect;
export type InsertRenascimento = typeof renascimento.$inferInsert;

/**
 * Relations for Renascimento
 */
export const renascimentoRelations = relations(renascimento, ({ one }) => ({
  customer: one(customers, {
    fields: [renascimento.customerId],
    references: [customers.id],
  }),
}));

