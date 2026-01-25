import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { getCustomerByEmail, getMapHistoryById, getMapHistoryByCustomerId, deleteMapHistory } from "./db";
import { TRPCError } from "@trpc/server";
import { customers, pagSeguroOrders } from "../drizzle/schema";
import { getDb } from "./db";

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
          const { createPaymentOrder } = await import('./pagseguro');
          const { sendPaymentProcessingEmail } = await import('./email/emailService');
          
          // 1. Create payment order with PagSeguro
          const paymentResponse = await createPaymentOrder({
            email: input.email,
            name: input.name,
            planId: input.planId,
            planName: input.planName,
            amount: input.amount,
            paymentMethod: input.paymentMethod as 'pix' | 'credit_card' | 'boleto',
          });
          
          // 2. Save or update customer in database
          let existingCustomer = await db.getCustomerByEmail(input.email);
          let customerId: number | undefined = existingCustomer?.id;
          
          if (!customerId) {
            try {
              await db.createCustomer({
                email: input.email,
                name: input.name,
                plan: 'pending',
                status: 'pending',
              });
              existingCustomer = await db.getCustomerByEmail(input.email);
              customerId = existingCustomer?.id;
            } catch (err) {
              console.error('Error creating customer:', err);
            }
          }
          
          // 3. Save order in database with status 'pending'
          try {
            await db.createPagSeguroOrder({
              orderId: paymentResponse.id,
              customerId: customerId,
              email: input.email,
              name: input.name,
              plan: input.planId,
              amount: input.amount.toString(),
              paymentMethod: input.paymentMethod,
              status: 'pending',
            });
          } catch (err) {
            console.error('Error saving order:', err);
          }
          
          // 4. Send "payment processing" email
          try {
            await sendPaymentProcessingEmail({
              email: input.email,
              name: input.name,
              planName: input.planName,
              amount: input.amount,
              orderId: paymentResponse.id,
              paymentMethod: input.paymentMethod,
            });
          } catch (err) {
            console.error('Error sending email:', err);
          }
          
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
  }),
});

export type AppRouter = typeof appRouter;
