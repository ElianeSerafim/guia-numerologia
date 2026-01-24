import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { getCustomerByEmail, getMapHistoryById, getMapHistoryByCustomerId, deleteMapHistory } from "./db";
import { TRPCError } from "@trpc/server";

// Helper to check if user is admin
const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const adminUser = await db.getAdminByEmail(ctx.user?.email || '');
  if (!adminUser) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx: { ...ctx, admin: adminUser } });
});

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  /**
   * Customer Management Routes
   */
  customers: router({
    // Get customer by email
    getByEmail: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input }) => {
        return await db.getCustomerByEmail(input.email);
      }),

    // Create new customer
    create: publicProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().min(1),
        plan: z.enum(['basic', 'professional', 'premium']).default('basic'),
        paymentMethod: z.string().optional(),
        paymentId: z.string().optional(),
        amount: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const existing = await db.getCustomerByEmail(input.email);
        if (existing) {
          throw new TRPCError({ code: 'CONFLICT', message: 'Customer already exists' });
        }
        return await db.createCustomer({
          email: input.email,
          name: input.name,
          plan: input.plan,
          status: 'pending',
          paymentMethod: input.paymentMethod,
          paymentId: input.paymentId,
          amount: input.amount,
        });
      }),

    // Update customer status (admin only)
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['pending', 'approved', 'rejected']),
      }))
      .mutation(async ({ input }) => {
        return await db.updateCustomer(input.id, {
          status: input.status as 'pending' | 'approved' | 'rejected',
          approvedAt: input.status === 'approved' ? new Date() : undefined,
        });
      }),

    // Get all customers (admin only)
    getAll: adminProcedure.query(async () => {
      return await db.getAllCustomers();
    }),

    // Get customers by status (admin only)
    getByStatus: adminProcedure
      .input(z.object({ status: z.enum(['pending', 'approved', 'rejected']) }))
      .query(async ({ input }) => {
        return await db.getCustomersByStatus(input.status);
      }),
  }),

  /**
   * Numerology Maps Routes
   */
  numerologyMaps: router({
    // Create new map
    create: protectedProcedure
      .input(z.object({
        customerId: z.number(),
        name: z.string().min(1),
        birthDate: z.string(),
        chartData: z.record(z.string(), z.any()),
      }))
      .mutation(async ({ input, ctx }) => {
        const customer = await db.getCustomerByEmail(ctx.user?.email || '');
        if (!customer || customer.id !== input.customerId) {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Cannot create map for other customer' });
        }

        return await db.createNumerologyMap({
          customerId: input.customerId,
          email: ctx.user?.email || '',
          name: input.name,
          birthDate: input.birthDate,
          chartData: input.chartData,
        });
      }),

    // Get maps by customer email
    getByEmail: protectedProcedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.email !== input.email) {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Cannot access other customer maps' });
        }
        return await db.getNumerologyMapsByEmail(input.email);
      }),

    // Get maps by customer ID (admin only)
    getByCustomerId: adminProcedure
      .input(z.object({ customerId: z.number() }))
      .query(async ({ input }) => {
        return await db.getNumerologyMapsByCustomerId(input.customerId);
      }),
  }),

  /**
   * Admin Management Routes
   */
  admins: router({
    // Check if current user is admin
    isAdmin: protectedProcedure.query(async ({ ctx }) => {
      const adminUser = await db.getAdminByEmail(ctx.user?.email || '');
      return {
        isAdmin: !!adminUser,
        admin: adminUser || null,
      };
    }),

    // Get all admins (admin only)
    getAll: adminProcedure.query(async () => {
      return await db.getAllAdmins();
    }),

    // Create new admin (super admin only)
    create: adminProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().min(1),
        role: z.enum(['admin', 'super_admin']).default('admin'),
      }))
      .mutation(async ({ input, ctx }) => {
        const currentAdmin = await db.getAdminByEmail(ctx.user?.email || '');
        if (currentAdmin?.role !== 'super_admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Only super admins can create admins' });
        }

        const existing = await db.getAdminByEmail(input.email);
        if (existing) {
          throw new TRPCError({ code: 'CONFLICT', message: 'Admin already exists' });
        }

        return await db.createAdmin({
          email: input.email,
          name: input.name,
          role: input.role,
          isActive: true,
          createdBy: ctx.user?.email,
        });
      }),

    // Update admin (super admin only)
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const currentAdmin = await db.getAdminByEmail(ctx.user?.email || '');
        if (currentAdmin?.role !== 'super_admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Only super admins can update admins' });
        }

        return await db.updateAdmin(input.id, {
          name: input.name,
          isActive: input.isActive,
        });
      }),
  }),

  /**
   * Coupon Management Routes
   */
  coupons: router({
    // Get coupon by code
    getByCode: publicProcedure
      .input(z.object({ code: z.string() }))
      .query(async ({ input }) => {
        return await db.getCouponByCode(input.code);
      }),

    // Get all coupons (admin only)
    getAll: adminProcedure.query(async () => {
      return await db.getAllCoupons();
    }),

    // Create coupon (admin only)
    create: adminProcedure
      .input(z.object({
        code: z.string().min(1),
        discountPercentage: z.number().min(0).max(100),
        maxUses: z.number().optional(),
        expiresAt: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        return await db.createCoupon({
          code: input.code,
          discountPercentage: input.discountPercentage,
          maxUses: input.maxUses,
          expiresAt: input.expiresAt ? new Date(input.expiresAt) : undefined,
          isActive: true,
          createdBy: ctx.user?.email,
        });
      }),

    // Update coupon (admin only)
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        isActive: z.boolean().optional(),
        maxUses: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.updateCoupon(input.id, {
          isActive: input.isActive,
          maxUses: input.maxUses,
        });
      }),
  }),

  /**
   * Payment History Routes
   */
  payments: router({
    // Get payment history by customer ID
    getByCustomerId: protectedProcedure
      .input(z.object({ customerId: z.number() }))
      .query(async ({ input, ctx }) => {
        const customer = await db.getCustomerByEmail(ctx.user?.email || '');
        if (!customer || customer.id !== input.customerId) {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Cannot access other customer payments' });
        }
        return await db.getPaymentHistoryByCustomerId(input.customerId);
      }),

    // Get all payments (admin only)
    getAll: adminProcedure.query(async () => {
      return await db.getAllPaymentHistory();
    }),

    // Create payment record
    create: publicProcedure
      .input(z.object({
        customerId: z.number(),
        email: z.string().email(),
        plan: z.enum(['basic', 'professional', 'premium']),
        amount: z.string(),
        paymentMethod: z.string(),
        paymentId: z.string().optional(),
        couponCode: z.string().optional(),
        discountAmount: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createPaymentHistory({
          customerId: input.customerId,
          email: input.email,
          plan: input.plan,
          amount: input.amount,
          currency: 'BRL',
          status: 'pending',
          paymentMethod: input.paymentMethod,
          paymentId: input.paymentId,
          couponCode: input.couponCode,
          discountAmount: input.discountAmount,
        });
      }),

    // Update payment status (admin only)
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['pending', 'completed', 'failed']),
      }))
      .mutation(async ({ input }) => {
        return await db.updatePaymentHistory(input.id, {
          status: input.status as 'pending' | 'completed' | 'failed',
          completedAt: input.status === 'completed' ? new Date() : undefined,
        });
      }),
  }),

  /**
   * Reports Routes
   */
  reports: router({
    // Get all reports (admin only)
    getAll: adminProcedure.query(async () => {
      return await db.getAllReports();
    }),

    // Get reports by type (admin only)
    getByType: adminProcedure
      .input(z.object({ type: z.string() }))
      .query(async ({ input }) => {
        return await db.getReportsByType(input.type);
      }),

    // Create report (admin only)
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        type: z.string().min(1),
        data: z.record(z.string(), z.any()),
      }))
      .mutation(async ({ input, ctx }) => {
        return await db.createReport({
          title: input.title,
          type: input.type,
          data: input.data,
          generatedBy: ctx.user?.email,
        });
      }),
  }),
  /**
   * Renascimento Management Routes
   */
  renascimento: router({
    // Get Renascimento by customer ID (admin only)
    getByCustomerId: adminProcedure
      .input(z.object({ customerId: z.number() }))
      .query(async ({ input }) => {
        return await db.getRenascimentoByCustomerId(input.customerId);
      }),

    // Get Renascimento by email (admin only)
    getByEmail: adminProcedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input }) => {
        return await db.getRenascimentoByEmail(input.email);
      }),

    // Create or update Renascimento (admin only)
    upsert: adminProcedure
      .input(z.object({
        customerId: z.number(),
        email: z.string().email(),
        hasFactoGrave: z.boolean(),
        factoGraveType: z.enum(['enfermidade', 'acidente', 'perda_material', 'perda_afetiva']).optional(),
        notes: z.string().optional(),
        realizacao: z.number().optional(),
        realizacaoNumber: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const existing = await db.getRenascimentoByCustomerId(input.customerId);
        
        if (existing) {
          return await db.updateRenascimento(input.customerId, {
            hasFactoGrave: input.hasFactoGrave,
            factoGraveType: input.factoGraveType,
            notes: input.notes,
            realizacao: input.realizacao,
            realizacaoNumber: input.realizacaoNumber,
            updatedBy: ctx.user?.email ?? undefined,
          });
        } else {
          return await db.createRenascimento({
            customerId: input.customerId,
            email: input.email,
            hasFactoGrave: input.hasFactoGrave,
            factoGraveType: input.factoGraveType,
            notes: input.notes,
            realizacao: input.realizacao,
            realizacaoNumber: input.realizacaoNumber,
            updatedBy: ctx.user?.email ?? undefined,
          });
        }
      }),

    // Get all Renascimentos (admin only)
    getAll: adminProcedure.query(async () => {
      return await db.getAllRenascimentos();
    }),

    // Delete Renascimento (admin only)
    delete: adminProcedure
      .input(z.object({ customerId: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteRenascimento(input.customerId);
        return { success: true };
      }),
  }),

  /**
   * Payment Router - PagSeguro Integration
   */
  payment: router({
    // Initiate payment with PagSeguro
    initiatePagSeguro: publicProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().min(1),
        planId: z.enum(['navegador', 'visionario', 'iluminado']),
        planName: z.string(),
        amount: z.number().positive(),
        paymentMethod: z.enum(['pix', 'credit_card', 'boleto']),
      }))
      .mutation(async ({ input }) => {
        try {
          // Import PagSeguro functions
          const { createPaymentOrder } = await import('./pagseguro');
          
          // Create payment order
          const paymentResponse = await createPaymentOrder({
            email: input.email,
            name: input.name,
            planId: input.planId,
            planName: input.planName,
            amount: input.amount,
            paymentMethod: input.paymentMethod as 'pix' | 'credit_card' | 'boleto',
          });
          
          // Extract payment link from response
          const paymentLink = paymentResponse.links?.find(link => link.rel === 'PAYMENT')?.href;
          
          return {
            success: true,
            orderId: paymentResponse.id,
            paymentLink: paymentLink || '',
            status: paymentResponse.status,
          };
        } catch (error) {
          console.error('Error initiating PagSeguro payment:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to initiate payment',
          });
        }
      }),

    // Get payment status
    getStatus: publicProcedure
      .input(z.object({ orderId: z.string() }))
      .query(async ({ input }) => {
        try {
          const { getPaymentStatus } = await import('./pagseguro');
          const status = await getPaymentStatus(input.orderId);
          return status;
        } catch (error) {
          console.error('Error fetching payment status:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch payment status',
          });
        }
      }),
  }),

  /**
   * Order History Router - PagSeguro Orders
   */
  orders: router({
    // Get order history by email (protected)
    getByEmail: protectedProcedure
      .query(async ({ ctx }) => {
        if (!ctx.user?.email) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        return await db.getOrdersByEmail(ctx.user.email);
      }),

    // Get single order by ID (protected)
    getById: protectedProcedure
      .input(z.object({ orderId: z.string() }))
      .query(async ({ input, ctx }) => {
        if (!ctx.user?.email) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        const order = await db.getOrderById(input.orderId);
        if (!order || order.email !== ctx.user.email) {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        return order;
      }),

    // Get all orders (admin only)
    getAll: adminProcedure.query(async () => {
      return await db.getAllPagSeguroOrders();
    }),
  }),

  /**
   * Map History Router
   */
  mapHistory: {
    getMyMaps: protectedProcedure
      .query(async ({ ctx }) => {
        if (!ctx.user?.email) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        
        // Get customer by email
        const customer = await getCustomerByEmail(ctx.user.email);
        if (!customer) {
          return [];
        }
        
        // Get map history
        const maps = await getMapHistoryByCustomerId(customer.id);
        return maps;
      }),

    getMapById: protectedProcedure
      .input(z.object({ mapId: z.number() }))
      .query(async ({ input, ctx }) => {
        if (!ctx.user?.email) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        
        const map = await getMapHistoryById(input.mapId);
        if (!map) {
          throw new TRPCError({ code: 'NOT_FOUND' });
        }
        
        // Verify ownership
        const customer = await getCustomerByEmail(ctx.user.email);
        if (!customer || map.customerId !== customer.id) {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        
        return map;
      }),

    deleteMap: protectedProcedure
      .input(z.object({ mapId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user?.email) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        
        const map = await getMapHistoryById(input.mapId);
        if (!map) {
          throw new TRPCError({ code: 'NOT_FOUND' });
        }
        
        // Verify ownership
        const customer = await getCustomerByEmail(ctx.user.email);
        if (!customer || map.customerId !== customer.id) {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        
        await deleteMapHistory(input.mapId);
        return { success: true };
      }),
  },

});

export type AppRouter = typeof appRouter;

// Subscription and Payment Procedures are added below
// This will be integrated in the next update
