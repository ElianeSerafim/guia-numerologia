import { router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { TRPCError } from "@trpc/server";

// Helper to check if user is admin
const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const adminUser = await db.getAdminByEmail(ctx.user?.email || '');
  if (!adminUser) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx: { ...ctx, admin: adminUser } });
});

export const adminOrdersRouter = router({
  // Get orders by status (admin only)
  getByStatus: adminProcedure
    .input(z.object({ status: z.enum(['confirmed', 'pending', 'failed', 'refunded']) }))
    .query(async ({ input }) => {
      return await db.getOrdersByStatus(input.status);
    }),

  // Get orders by date range (admin only)
  getByDateRange: adminProcedure
    .input(z.object({ startDate: z.string(), endDate: z.string() }))
    .query(async ({ input }) => {
      const start = new Date(input.startDate);
      const end = new Date(input.endDate);
      return await db.getOrdersByDateRange(start, end);
    }),

  // Process refund (admin only)
  processRefund: adminProcedure
    .input(z.object({ orderId: z.string(), reason: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      const order = await db.getOrderById(input.orderId);
      if (!order) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Order not found' });
      }
      
      // Update order status to refunded
      const updated = await db.updatePagSeguroOrder(input.orderId, { status: 'refunded' });
      
      // Send refund email
      const { sendRefundEmail } = await import('./email/emailService');
      await sendRefundEmail(order.email, {
        email: order.email,
        orderId: order.orderId,
        amount: order.amount,
        plan: order.plan,
        reason: input.reason,
      });
      
      return { success: true, order: updated };
    }),

  // Get payment statistics (admin only)
  getStatistics: adminProcedure.query(async () => {
    const orders = await db.getAllPagSeguroOrders();
    
    const stats = {
      totalOrders: orders.length,
      confirmedOrders: orders.filter(o => o.status === 'confirmed').length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      failedOrders: orders.filter(o => o.status === 'failed').length,
      refundedOrders: orders.filter(o => o.status === 'refunded').length,
      totalRevenue: orders
        .filter(o => o.status === 'confirmed')
        .reduce((sum, o) => sum + parseFloat(o.amount), 0),
      ordersByPlan: {
        navegador: orders.filter(o => o.plan === 'navegador' && o.status === 'confirmed').length,
        visionario: orders.filter(o => o.plan === 'visionario' && o.status === 'confirmed').length,
        iluminado: orders.filter(o => o.plan === 'iluminado' && o.status === 'confirmed').length,
      },
      revenueByPlan: {
        navegador: orders
          .filter(o => o.plan === 'navegador' && o.status === 'confirmed')
          .reduce((sum, o) => sum + parseFloat(o.amount), 0),
        visionario: orders
          .filter(o => o.plan === 'visionario' && o.status === 'confirmed')
          .reduce((sum, o) => sum + parseFloat(o.amount), 0),
        iluminado: orders
          .filter(o => o.plan === 'iluminado' && o.status === 'confirmed')
          .reduce((sum, o) => sum + parseFloat(o.amount), 0),
      },
      paymentMethods: {
        pix: orders.filter(o => o.paymentMethod === 'pix' && o.status === 'confirmed').length,
        credit_card: orders.filter(o => o.paymentMethod === 'credit_card' && o.status === 'confirmed').length,
        boleto: orders.filter(o => o.paymentMethod === 'boleto' && o.status === 'confirmed').length,
      },
    };
    
    return stats;
  }),

  // Get top customers (admin only)
  getTopCustomers: adminProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ input }) => {
      const orders = await db.getAllPagSeguroOrders();
      
      const customerSpending = orders.reduce((acc, order) => {
        if (order.status === 'confirmed') {
          const existing = acc.find(c => c.email === order.email);
          if (existing) {
            existing.totalSpent += parseFloat(order.amount);
            existing.orderCount += 1;
          } else {
            acc.push({
              email: order.email,
              totalSpent: parseFloat(order.amount),
              orderCount: 1,
            });
          }
        }
        return acc;
      }, [] as Array<{ email: string; totalSpent: number; orderCount: number }>);
      
      return customerSpending
        .sort((a, b) => b.totalSpent - a.totalSpent)
        .slice(0, input.limit);
    }),

  // Export orders as CSV (admin only)
  exportOrders: adminProcedure
    .input(z.object({ status: z.enum(['confirmed', 'pending', 'failed', 'refunded']).optional() }))
    .query(async ({ input }) => {
      let orders = await db.getAllPagSeguroOrders();
      
      if (input.status) {
        orders = orders.filter(o => o.status === input.status);
      }
      
      // Format as CSV
      const headers = ['ID', 'Email', 'Plan', 'Amount', 'Status', 'Payment Method', 'Date'];
      const rows = orders.map(o => [
        o.orderId,
        o.email,
        o.plan,
        o.amount,
        o.status,
        o.paymentMethod,
        new Date(o.createdAt).toLocaleDateString('pt-BR'),
      ]);
      
      const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
      
      return {
        csv,
        filename: `orders-${new Date().toISOString().split('T')[0]}.csv`,
      };
    }),
});
