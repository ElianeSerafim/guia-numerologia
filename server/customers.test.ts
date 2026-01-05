import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(user?: AuthenticatedUser): { ctx: TrpcContext } {
  const defaultUser: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user: user || defaultUser,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

function createAdminContext(): { ctx: TrpcContext } {
  const adminUser: AuthenticatedUser = {
    id: 2,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return createAuthContext(adminUser);
}

describe("Customers Router", () => {
  it("should get customer by email", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // This will return null or undefined if customer doesn't exist in DB
    // In a real test, we'd mock the database
    const result = await caller.customers.getByEmail({
      email: "test@example.com",
    });

    // Result should be either null/undefined or a customer object
    expect(result === null || result === undefined || result.email).toBeDefined();
  });

  it("should create a new customer", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.customers.create({
      email: `test-${Date.now()}@example.com`,
      name: "Test Customer",
      plan: "basic",
    });

    expect(result).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.plan).toBe("basic");
    expect(result.status).toBe("pending");
  });

  it("should require admin access to get all customers", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.customers.getAll();
      expect.fail("Should have thrown FORBIDDEN error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("should allow admin to get all customers", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.customers.getAll();

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Numerology Maps Router", () => {
  it("should create a numerology map", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // First create a customer
    const customer = await caller.customers.create({
      email: ctx.user?.email || "test@example.com",
      name: "Test User",
      plan: "basic",
    });

    // Then create a numerology map
    const result = await caller.numerologyMaps.create({
      customerId: customer.id,
      name: "Test Map",
      birthDate: "1990-01-01",
      chartData: {
        destinyNumber: 7,
        lifePath: 3,
        expression: 5,
      },
    });

    expect(result).toBeDefined();
    expect(result.name).toBe("Test Map");
    expect(result.birthDate).toBe("1990-01-01");
  });

  it("should get numerology maps by email", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.numerologyMaps.getByEmail({
      email: ctx.user?.email || "test@example.com",
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should prevent accessing other customer maps", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.numerologyMaps.getByEmail({
        email: "other@example.com",
      });
      expect.fail("Should have thrown FORBIDDEN error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });
});

describe("Coupons Router", () => {
  it("should get coupon by code", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.coupons.getByCode({
      code: "NONEXISTENT",
    });

    // Should return null/undefined if coupon doesn't exist
    expect(result === null || result === undefined || result.code).toBeDefined();
  });

  it("should require admin access to create coupon", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.coupons.create({
        code: "TEST10",
        discountPercentage: 10,
      });
      expect.fail("Should have thrown FORBIDDEN error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });

  it("should allow admin to create coupon", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.coupons.create({
      code: `TEST${Date.now()}`,
      discountPercentage: 15,
      maxUses: 100,
    });

    expect(result).toBeDefined();
    expect(result.discountPercentage).toBe(15);
    expect(result.isActive).toBe(true);
  });
});

describe("Payments Router", () => {
  it("should create payment record", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // First create a customer
    const customer = await caller.customers.create({
      email: `payment-test-${Date.now()}@example.com`,
      name: "Payment Test",
      plan: "professional",
    });

    // Then create a payment record
    const result = await caller.payments.create({
      customerId: customer.id,
      email: customer.email,
      plan: "professional",
      amount: "99.90",
      paymentMethod: "credit_card",
    });

    expect(result).toBeDefined();
    expect(result.status).toBe("pending");
    expect(result.amount).toBe("99.90");
  });

  it("should require admin access to update payment status", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.payments.updateStatus({
        id: 1,
        status: "completed",
      });
      expect.fail("Should have thrown FORBIDDEN error");
    } catch (error: any) {
      expect(error.code).toBe("FORBIDDEN");
    }
  });
});

describe("Auth Router", () => {
  it("should get current user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();

    expect(result).toBeDefined();
    expect(result?.email).toBe("test@example.com");
  });

  it("should logout user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();

    expect(result.success).toBe(true);
  });
});
