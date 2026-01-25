import { eq, and, or, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users,
  InsertCustomer,
  customers,
  InsertNumerologyMap,
  numerologyMaps,
  InsertAdmin,
  admins,
  InsertCoupon,
  coupons,
  InsertPaymentHistory,
  paymentHistory,
  InsertReport,
  reports,
  InsertFavorite,
  favorites,
  Customer,
  Admin,
  renascimento,
  InsertRenascimento,
  subscriptions,
  InsertSubscription,
  Subscription,
  mapHistory,
  InsertMapHistory,
  MapHistory
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

/**
 * User Management
 */
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    // First, try to find existing user
    const existingUser = await db.select().from(users).where(eq(users.openId, user.openId)).limit(1);
    
    if (existingUser.length > 0) {
      // Update existing user
      const updateData: any = {
        updatedAt: new Date(),
      };
      
      if (user.name !== undefined) updateData.name = user.name;
      if (user.email !== undefined) updateData.email = user.email;
      if (user.loginMethod !== undefined) updateData.loginMethod = user.loginMethod;
      if (user.role !== undefined) updateData.role = user.role;
      if (user.lastSignedIn !== undefined) updateData.lastSignedIn = user.lastSignedIn;
      
      await db.update(users).set(updateData).where(eq(users.openId, user.openId));
    } else {
      // Insert new user
      const values: InsertUser = {
        openId: user.openId,
      };

      const textFields = ["name", "email", "loginMethod"] as const;
      type TextField = (typeof textFields)[number];

      const assignNullable = (field: TextField) => {
        const value = user[field];
        if (value === undefined) return;
        const normalized = value ?? null;
        values[field] = normalized;
      };

      textFields.forEach(assignNullable);

      if (user.lastSignedIn !== undefined) {
        values.lastSignedIn = user.lastSignedIn;
      }
      if (user.role !== undefined) {
        values.role = user.role;
      } else if (user.openId === ENV.ownerOpenId) {
        values.role = 'admin';
      }

      if (!values.lastSignedIn) {
        values.lastSignedIn = new Date();
      }

      await db.insert(users).values(values);
    }
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Customer Management
 */
export async function createCustomer(customer: InsertCustomer) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(customers).values(customer);
  // Fetch the created customer by email
  const result = await db.select().from(customers).where(eq(customers.email, customer.email)).limit(1);
  return result[0];
}

export async function getCustomerByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(customers).where(eq(customers.email, email));
  return result.length > 0 ? result[0] : undefined;
}

export async function updateCustomer(id: number, updates: Partial<Customer>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(customers)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(customers.id, id));
  
  // Fetch the updated customer
  const result = await db.select().from(customers).where(eq(customers.id, id)).limit(1);
  return result[0];
}

export async function getAllCustomers() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(customers);
}

export async function getCustomersByStatus(status: 'pending' | 'approved' | 'rejected') {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(customers).where(eq(customers.status, status));
}

/**
 * Numerology Maps Management
 */
export async function createNumerologyMap(map: InsertNumerologyMap) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(numerologyMaps).values(map);
  // Fetch the created map by email and birthDate
  const result = await db.select().from(numerologyMaps)
    .where(and(eq(numerologyMaps.email, map.email), eq(numerologyMaps.birthDate, map.birthDate)))
    .limit(1);
  return result[0];
}

export async function getNumerologyMapsByEmail(email: string) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(numerologyMaps).where(eq(numerologyMaps.email, email));
}

export async function getNumerologyMapsByCustomerId(customerId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(numerologyMaps).where(eq(numerologyMaps.customerId, customerId));
}

/**
 * Admin Management
 */
export async function createAdmin(admin: InsertAdmin) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(admins).values(admin);
  // Fetch the created admin by email
  const result = await db.select().from(admins).where(eq(admins.email, admin.email)).limit(1);
  return result[0];
}

export async function getAdminByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllAdmins() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(admins).where(eq(admins.isActive, true));
}

export async function updateAdmin(id: number, updates: Partial<Admin>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(admins)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(admins.id, id));
  
  // Fetch the updated admin
  const result = await db.select().from(admins).where(eq(admins.id, id)).limit(1);
  return result[0];
}

/**
 * Coupon Management
 */
export async function createCoupon(coupon: InsertCoupon) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(coupons).values(coupon);
  // Fetch the created coupon by code
  const result = await db.select().from(coupons).where(eq(coupons.code, coupon.code)).limit(1);
  return result[0];
}

export async function getCouponByCode(code: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(coupons).where(eq(coupons.code, code)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllCoupons() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(coupons);
}

export async function updateCoupon(id: number, updates: Partial<typeof coupons.$inferSelect>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(coupons)
    .set(updates)
    .where(eq(coupons.id, id));
  
  // Fetch the updated coupon
  const result = await db.select().from(coupons).where(eq(coupons.id, id)).limit(1);
  return result[0];
}

/**
 * Payment History Management
 */
export async function createPaymentHistory(payment: InsertPaymentHistory) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(paymentHistory).values(payment);
  // Fetch the created payment by customerId and email
  const result = await db.select().from(paymentHistory)
    .where(and(eq(paymentHistory.customerId, payment.customerId), eq(paymentHistory.email, payment.email)))
    .orderBy(desc(paymentHistory.createdAt))
    .limit(1);
  return result[0];
}

export async function getPaymentHistoryByCustomerId(customerId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(paymentHistory).where(eq(paymentHistory.customerId, customerId));
}

export async function getAllPaymentHistory() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(paymentHistory);
}

export async function updatePaymentHistory(id: number, updates: Partial<typeof paymentHistory.$inferSelect>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(paymentHistory)
    .set(updates)
    .where(eq(paymentHistory.id, id));
  
  // Fetch the updated payment
  const result = await db.select().from(paymentHistory).where(eq(paymentHistory.id, id)).limit(1);
  return result[0];
}

/**
 * Reports Management
 */
export async function createReport(report: InsertReport) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(reports).values(report);
  // Fetch the created report by type and title
  const result = await db.select().from(reports)
    .where(and(eq(reports.type, report.type), eq(reports.title, report.title)))
    .orderBy(desc(reports.createdAt))
    .limit(1);
  return result[0];
}

export async function getReportsByType(type: string) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(reports).where(eq(reports.type, type));
}

export async function getAllReports() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(reports);
}

/**
 * Favorites Management
 */
export async function createFavorite(favorite: InsertFavorite) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(favorites).values(favorite);
  // Fetch the created favorite by email and mapId
  const result = await db.select().from(favorites)
    .where(and(eq(favorites.email, favorite.email), eq(favorites.mapId, favorite.mapId)))
    .limit(1);
  return result[0];
}

export async function getFavoritesByEmail(email: string) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(favorites).where(eq(favorites.email, email));
}

export async function getFavoritesByMapId(mapId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(favorites).where(eq(favorites.mapId, mapId));
}

export async function deleteFavorite(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(favorites).where(eq(favorites.id, id)).limit(1);
  const favorite = result[0];
  
  await db.delete(favorites).where(eq(favorites.id, id));
  return favorite;
}

export async function updateFavorite(id: number, updates: Partial<typeof favorites.$inferSelect>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(favorites)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(favorites.id, id));
  
  // Fetch the updated favorite
  const result = await db.select().from(favorites).where(eq(favorites.id, id)).limit(1);
  return result[0];
}

/**
 * Renascimento Management
 */
export async function createRenascimento(data: InsertRenascimento) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(renascimento).values(data);
  // Fetch the created renascimento by customerId and email
  const result = await db.select().from(renascimento)
    .where(and(eq(renascimento.customerId, data.customerId), eq(renascimento.email, data.email)))
    .orderBy(desc(renascimento.createdAt))
    .limit(1);
  return result[0];
}

export async function getRenascimentoByCustomerId(customerId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(renascimento).where(eq(renascimento.customerId, customerId));
}

export async function getRenascimentoByYear(customerId: number, realizacao: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(renascimento)
    .where(and(eq(renascimento.customerId, customerId), eq(renascimento.realizacao, realizacao)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateRenascimento(id: number, updates: Partial<typeof renascimento.$inferSelect>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(renascimento)
    .set(updates)
    .where(eq(renascimento.id, id));
  
  // Fetch the updated renascimento
  const result = await db.select().from(renascimento).where(eq(renascimento.id, id)).limit(1);
  return result[0];
}

/**
 * Subscription Management
 */
export async function createSubscription(subscription: InsertSubscription): Promise<Subscription | null> {
  const db = await getDb();
  if (!db) return null;
  
  await db.insert(subscriptions).values(subscription);
  // Fetch the created subscription by customerId
  const result = await db.select().from(subscriptions)
    .where(eq(subscriptions.customerId, subscription.customerId))
    .limit(1);
  return result[0] || null;
}

export async function getSubscriptionByCustomerId(customerId: number): Promise<Subscription | null> {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(subscriptions)
    .where(eq(subscriptions.customerId, customerId))
    .limit(1);
  return result[0] || null;
}

export async function updateSubscription(id: number, updates: Partial<Subscription>): Promise<Subscription | null> {
  const db = await getDb();
  if (!db) return null;
  
  await db.update(subscriptions)
    .set(updates)
    .where(eq(subscriptions.id, id));
  
  // Fetch the updated subscription
  const result = await db.select().from(subscriptions).where(eq(subscriptions.id, id)).limit(1);
  return result[0] || null;
}

export async function getAllSubscriptions(): Promise<Subscription[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(subscriptions);
}

/**
 * Map History Management
 */
export async function addMapToHistory(data: InsertMapHistory): Promise<MapHistory | null> {
  const db = await getDb();
  if (!db) return null;
  
  await db.insert(mapHistory).values(data);
  // Fetch the created map history by customerId and birthDate
  const result = await db.select().from(mapHistory)
    .where(and(eq(mapHistory.customerId, data.customerId), eq(mapHistory.birthDate, data.birthDate)))
    .orderBy(desc(mapHistory.generatedAt))
    .limit(1);
  return result[0] || null;
}

export async function getMapHistoryByCustomerId(customerId: number): Promise<MapHistory[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(mapHistory)
    .where(eq(mapHistory.customerId, customerId))
    .orderBy(desc(mapHistory.generatedAt));
}

export async function getMapHistoryById(id: number): Promise<MapHistory | null> {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(mapHistory).where(eq(mapHistory.id, id)).limit(1);
  return result[0] || null;
}

export async function updateMapHistory(id: number, updates: Partial<MapHistory>): Promise<MapHistory | null> {
  const db = await getDb();
  if (!db) return null;
  
  await db.update(mapHistory)
    .set(updates)
    .where(eq(mapHistory.id, id));
  
  // Fetch the updated map history
  const result = await db.select().from(mapHistory).where(eq(mapHistory.id, id)).limit(1);
  return result[0] || null;
}

export async function deleteMapHistory(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  
  await db.delete(mapHistory).where(eq(mapHistory.id, id));
  return true;
}

/**
 * PagSeguro Orders Management
 */
import { pagSeguroOrders, PagSeguroOrder } from "../drizzle/schema";

export async function getOrdersByEmail(email: string): Promise<PagSeguroOrder[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(pagSeguroOrders)
      .where(eq(pagSeguroOrders.email, email))
      .orderBy(desc(pagSeguroOrders.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get orders by email:", error);
    return [];
  }
}

export async function getOrdersByStatus(status: string): Promise<PagSeguroOrder[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(pagSeguroOrders)
      .where(eq(pagSeguroOrders.status, status))
      .orderBy(desc(pagSeguroOrders.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get orders by status:", error);
    return [];
  }
}

export async function getOrdersByDateRange(startDate: Date, endDate: Date): Promise<PagSeguroOrder[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(pagSeguroOrders)
      .where(and(
        eq(pagSeguroOrders.status, 'confirmed'),
        // Add date range filtering if needed
      ))
      .orderBy(desc(pagSeguroOrders.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get orders by date range:", error);
    return [];
  }
}

export async function createPagSeguroOrder(order: typeof pagSeguroOrders.$inferInsert): Promise<PagSeguroOrder | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.insert(pagSeguroOrders).values(order);
    // Fetch the created order by email and orderId
    const result = await db.select().from(pagSeguroOrders)
      .where(and(eq(pagSeguroOrders.email, order.email), eq(pagSeguroOrders.orderId, order.orderId)))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[Database] Failed to create PagSeguro order:", error);
    return null;
  }
}

export async function updatePagSeguroOrder(orderId: string, updates: Partial<typeof pagSeguroOrders.$inferSelect>): Promise<PagSeguroOrder | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.update(pagSeguroOrders)
      .set(updates)
      .where(eq(pagSeguroOrders.orderId, orderId));
    
    // Fetch the updated order
    const result = await db.select().from(pagSeguroOrders)
      .where(eq(pagSeguroOrders.orderId, orderId))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[Database] Failed to update PagSeguro order:", error);
    return null;
  }
}

export async function getPagSeguroOrderById(orderId: string): Promise<PagSeguroOrder | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(pagSeguroOrders)
      .where(eq(pagSeguroOrders.orderId, orderId))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[Database] Failed to get PagSeguro order:", error);
    return null;
  }
}

export async function getAllPagSeguroOrders(): Promise<PagSeguroOrder[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(pagSeguroOrders)
      .orderBy(desc(pagSeguroOrders.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get all PagSeguro orders:", error);
    return [];
  }
}

export async function getAllRenascimentos(): Promise<typeof renascimento.$inferSelect[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(renascimento);
}

export async function deleteRenascimento(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  
  await db.delete(renascimento).where(eq(renascimento.id, id));
  return true;
}

export async function getOrderById(orderId: string): Promise<PagSeguroOrder | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(pagSeguroOrders)
      .where(eq(pagSeguroOrders.orderId, orderId))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[Database] Failed to get order by ID:", error);
    return null;
  }
}

export async function checkIfFavorited(email: string, mapId: number, sectionType?: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  
  if (sectionType) {
    const result = await db.select().from(favorites)
      .where(and(eq(favorites.email, email), eq(favorites.mapId, mapId)))
      .limit(1);
    return result.length > 0;
  }
  
  const result = await db.select().from(favorites)
    .where(and(eq(favorites.email, email), eq(favorites.mapId, mapId)))
    .limit(1);
  return result.length > 0;
}

export async function getRenascimentoByEmail(email: string) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(renascimento).where(eq(renascimento.email, email));
}

