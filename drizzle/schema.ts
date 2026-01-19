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



/**
 * Subscriptions table for storing user subscription plans and payment info
 * Tracks which plan each user has, how many maps they can generate, and payment status
 */
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  customerId: integer("customerId").notNull().unique(),
  email: varchar("email", { length: 320 }).notNull(),
  plan: varchar("plan", { length: 50 }).notNull(), // "navegador", "visionario", "iluminado"
  planPrice: decimal("planPrice", { precision: 10, scale: 2 }).notNull(), // R$29.90, R$59.90, R$200.00
  mapsLimit: integer("mapsLimit").notNull(), // 1, 3, or 10
  mapsGenerated: integer("mapsGenerated").default(0).notNull(), // How many maps user has generated
  paymentStatus: varchar("paymentStatus", { length: 50 }).notNull(), // "pending", "completed", "failed"
  infinetepayOrderId: varchar("infinetepayOrderId", { length: 255 }), // Order ID from Infinetepay
  infinetepayNsu: varchar("infinetepayNsu", { length: 255 }), // Transaction NSU from Infinetepay
  infinetepayAut: varchar("infinetepayAut", { length: 255 }), // Authorization code from Infinetepay
  cardBrand: varchar("cardBrand", { length: 50 }), // mastercard, visa, elo, etc
  paymentMethod: varchar("paymentMethod", { length: 50 }), // "credit", "debit", "pix"
  installments: integer("installments").default(1), // Number of installments (1-12)
  activatedAt: timestamp("activatedAt"), // When subscription became active
  expiresAt: timestamp("expiresAt"), // When subscription expires (if applicable)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

/**
 * Relations for Subscriptions
 */
export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  customer: one(customers, {
    fields: [subscriptions.customerId],
    references: [customers.id],
  }),
}));


/**
 * Map History Table - Stores all generated numerology maps
 */
export const mapHistory = pgTable("map_history", {
  id: serial("id").primaryKey(),
  subscriptionId: integer("subscriptionId").notNull(), // Reference to subscription
  customerId: integer("customerId").notNull(), // Reference to customer
  name: varchar("name", { length: 255 }).notNull(), // Full name used for calculation
  birthDate: date("birthDate").notNull(), // Birth date used for calculation
  mapData: jsonb("mapData").notNull(), // Full numerology chart data (CD, MO, DM, ME, EU, R1-R4, CV, etc)
  pdfUrl: varchar("pdfUrl", { length: 1024 }), // URL to generated PDF in S3
  pdfKey: varchar("pdfKey", { length: 1024 }), // S3 key for the PDF
  generatedAt: timestamp("generatedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type MapHistory = typeof mapHistory.$inferSelect;
export type InsertMapHistory = typeof mapHistory.$inferInsert;

/**
 * Relations for Map History
 */
export const mapHistoryRelations = relations(mapHistory, ({ one }) => ({
  subscription: one(subscriptions, {
    fields: [mapHistory.subscriptionId],
    references: [subscriptions.id],
  }),
  customer: one(customers, {
    fields: [mapHistory.customerId],
    references: [customers.id],
  }),
}));
