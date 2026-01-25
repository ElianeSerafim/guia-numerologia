import { router, publicProcedure } from '../_core/trpc';
import { z } from 'zod';
import { db } from '../db';
import { TRPCError } from '@trpc/server';

export const customerRouter = router({
  /**
   * Criar novo cliente (cadastro)
   * Valida e-mail, data de nascimento
   * Salva dados do cliente no banco
   */
  createCustomer: publicProcedure
    .input(
      z.object({
        email: z.string().email('E-mail inválido'),
        birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato inválido: DD/MM/YYYY')
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Validar se cliente já existe
        const existingCustomer = await db.getCustomerByEmail(input.email);
        if (existingCustomer) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Este e-mail já está cadastrado'
          });
        }

        // Validar data de nascimento
        const [day, month, year] = input.birthDate.split('/').map(Number);
        const birthDateObj = new Date(year, month - 1, day);
        const today = new Date();

        if (birthDateObj.getTime() > today.getTime()) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Data de nascimento não pode ser no futuro'
          });
        }

        if (year < 1900) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Data de nascimento inválida'
          });
        }

        // Criar cliente
        const customer = await db.createCustomer({
          email: input.email,
          birthDate: input.birthDate,
          plan: 'free', // Plano gratuito por padrão
          createdAt: new Date(),
          updatedAt: new Date()
        });

        return {
          id: customer.id,
          email: customer.email,
          birthDate: customer.birthDate,
          plan: customer.plan,
          message: 'Cadastro realizado com sucesso!'
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error('Erro ao criar cliente:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro ao cadastrar cliente'
        });
      }
    }),

  /**
   * Obter cliente por e-mail
   * Usado para verificar se cliente existe
   */
  getCustomerByEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input }) => {
      try {
        const customer = await db.getCustomerByEmail(input.email);
        return customer || null;
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro ao buscar cliente'
        });
      }
    }),

  /**
   * Atualizar plano do cliente
   * Usado após pagamento bem-sucedido
   */
  updateCustomerPlan: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        plan: z.enum(['navigator', 'visionary', 'illuminated']),
        orderId: z.string()
      })
    )
    .mutation(async ({ input }) => {
      try {
        const customer = await db.getCustomerByEmail(input.email);
        if (!customer) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Cliente não encontrado'
          });
        }

        // Atualizar plano
        await db.updateCustomer(customer.id, {
          plan: input.plan,
          planActivatedAt: new Date(),
          lastOrderId: input.orderId
        });

        return {
          id: customer.id,
          email: customer.email,
          plan: input.plan,
          message: 'Plano atualizado com sucesso!'
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error('Erro ao atualizar plano:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro ao atualizar plano'
        });
      }
    })
});
