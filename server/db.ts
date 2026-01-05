import { eq, and, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
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
  Customer,
  Admin
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

    // PostgreSQL upsert using ON CONFLICT
    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: {
        name: values.name,
        email: values.email,
        loginMethod: values.loginMethod,
        role: values.role,
        lastSignedIn: values.lastSignedIn,
        updatedAt: new Date(),
      },
    });
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
  
  const result = await db.insert(customers).values(customer).returning();
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
  
  const result = await db.update(customers)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(customers.id, id))
    .returning();
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
  
  const result = await db.insert(numerologyMaps).values(map).returning();
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
  
  const result = await db.insert(admins).values(admin).returning();
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
  
  const result = await db.update(admins)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(admins.id, id))
    .returning();
  return result[0];
}

/**
 * Coupon Management
 */
export async function createCoupon(coupon: InsertCoupon) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(coupons).values(coupon).returning();
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
  
  const result = await db.update(coupons)
    .set(updates)
    .where(eq(coupons.id, id))
    .returning();
  return result[0];
}

/**
 * Payment History Management
 */
export async function createPaymentHistory(payment: InsertPaymentHistory) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(paymentHistory).values(payment).returning();
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
  
  const result = await db.update(paymentHistory)
    .set(updates)
    .where(eq(paymentHistory.id, id))
    .returning();
  return result[0];
}

/**
 * Reports Management
 */
export async function createReport(report: InsertReport) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(reports).values(report).returning();
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
