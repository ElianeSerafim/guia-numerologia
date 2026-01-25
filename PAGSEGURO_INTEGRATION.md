# Integração PagSeguro - Novo Fluxo de Pagamento

## Visão Geral

Este documento descreve a integração completa do PagSeguro para o novo fluxo de vendas:

1. **Home** → Botão "Teste Gratuitamente"
2. **Tela de Cálculo** → Degustação (Caminho do Destino + Ciclo Atual)
3. **Botão "Veja seu mapa completo"** → Planos com integração PagSeguro
4. **Seleção de Plano** → Formulário de dados + Pagamento

## Componentes Criados

### 1. Componente `Tasting.tsx`
Mostra uma prévia do mapa numerológico com:
- **Caminho do Destino (CD)**: Número 1-9, 11, 22, 33
- **Ciclo de Vida Atual**: 1º, 2º ou 3º ciclo baseado na idade
- Botão "Veja Seu Mapa Completo" para acessar planos

**Localização**: `client/src/components/Tasting.tsx`

**Props**:
```typescript
interface TastingProps {
  chart: NumerologyChart;
  onViewFullMap: () => void;
}
```

**Uso**:
```tsx
<Tasting 
  chart={calculatedChart}
  onViewFullMap={() => setShowPlans(true)}
/>
```

### 2. Componente `PlansWithPayment.tsx`
Exibe planos com integração PagSeguro:
- **3 Planos**: Navegador, Visionário, Iluminado
- **Seleção de Plano**: Visual feedback ao selecionar
- **Formulário**: Nome e E-mail
- **Integração PagSeguro**: Redireciona para checkout

**Localização**: `client/src/components/PlansWithPayment.tsx`

**Props**:
```typescript
interface PlansWithPaymentProps {
  chart: NumerologyChart;
  onPaymentSuccess?: () => void;
}
```

**Uso**:
```tsx
<PlansWithPayment 
  chart={calculatedChart}
  onPaymentSuccess={() => handlePaymentSuccess()}
/>
```

## Fluxo de Integração

### Passo 1: Atualizar Home.tsx

```tsx
import Tasting from '@/components/Tasting';
import PlansWithPayment from '@/components/PlansWithPayment';

export default function Home() {
  const [chart, setChart] = useState<NumerologyChart | null>(null);
  const [showTasting, setShowTasting] = useState(false);
  const [showPlans, setShowPlans] = useState(false);

  const handleCalculate = (name: string, birthDate: string) => {
    const calculatedChart = calculateChart(name, birthDate);
    setChart(calculatedChart);
    setShowTasting(true);
  };

  return (
    <>
      {/* Botão "Teste Gratuitamente" na Home */}
      {!showTasting && !showPlans && (
        <button
          onClick={() => setShowTasting(true)}
          className="bg-gradient-to-r from-[#00FFFF] to-[#19E6FF] text-[#07131B] px-8 py-4 rounded-lg font-bold text-lg"
        >
          Teste Gratuitamente
        </button>
      )}

      {/* Tela de Cálculo + Degustação */}
      {showTasting && chart && (
        <Tasting 
          chart={chart}
          onViewFullMap={() => setShowPlans(true)}
        />
      )}

      {/* Planos com Pagamento */}
      {showPlans && chart && (
        <PlansWithPayment 
          chart={chart}
          onPaymentSuccess={() => {
            // Redirecionar ou mostrar mensagem de sucesso
          }}
        />
      )}
    </>
  );
}
```

### Passo 2: tRPC Procedure para Iniciar Pagamento

**Arquivo**: `server/routers.ts`

```typescript
export const appRouter = router({
  payment: router({
    initiatePagSeguro: publicProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().min(3),
        planId: z.enum(['navigator', 'visionary', 'illuminated']),
        planName: z.string(),
        amount: z.number().positive(), // em centavos
        paymentMethod: z.enum(['pix', 'credit_card', 'boleto']),
        chartData: z.string().optional()
      }))
      .mutation(async ({ input }) => {
        try {
          // 1. Salvar cliente no banco de dados
          const customer = await db.createCustomer({
            email: input.email,
            name: input.name,
            plan: input.planId
          });

          // 2. Criar pedido no banco de dados
          const order = await db.createPagSeguroOrder({
            customerId: customer.id,
            email: input.email,
            planId: input.planId,
            amount: input.amount,
            status: 'pending',
            chartData: input.chartData
          });

          // 3. Iniciar pagamento no PagSeguro
          const paymentResponse = await initiatePagSeguroPayment({
            orderId: order.id,
            email: input.email,
            name: input.name,
            amount: input.amount,
            planName: input.planName,
            paymentMethod: input.paymentMethod
          });

          // 4. Enviar e-mail de "Pagamento em processamento"
          await sendPaymentProcessingEmail({
            email: input.email,
            name: input.name,
            planName: input.planName,
            amount: input.amount
          });

          return {
            orderId: order.id,
            checkoutUrl: paymentResponse.checkoutUrl,
            redirectUrl: paymentResponse.redirectUrl
          };
        } catch (error) {
          console.error('Erro ao iniciar pagamento:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Erro ao processar pagamento'
          });
        }
      })
  })
});
```

### Passo 3: Webhook do PagSeguro

**Arquivo**: `server/webhooks/pagseguro.ts`

```typescript
import { Router } from 'express';
import { db } from '../db';
import { sendAccessEmail } from '../email/emailService';

const router = Router();

router.post('/webhooks/pagseguro', async (req, res) => {
  try {
    const { reference, status, grossAmount } = req.body;

    // 1. Verificar assinatura do webhook (segurança)
    if (!verifyPagSeguroSignature(req)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // 2. Recuperar pedido do banco de dados
    const order = await db.getPagSeguroOrderById(reference);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // 3. Atualizar status do pedido
    if (status === 'PAID' || status === '3') { // 3 = Pago
      await db.updatePagSeguroOrder(reference, {
        status: 'approved',
        paidAt: new Date()
      });

      // 4. Ativar plano do cliente
      await db.updateCustomer(order.customerId, {
        plan: order.planId,
        planActivatedAt: new Date(),
        planExpiresAt: calculatePlanExpiration(order.planId)
      });

      // 5. Enviar e-mail com acesso
      const customer = await db.getCustomerById(order.customerId);
      const planInfo = PLANS[order.planId];
      
      await sendAccessEmail({
        email: customer.email,
        name: customer.name,
        planName: planInfo.name,
        mapsLimit: planInfo.mapsLimit,
        accessLink: `${process.env.APP_URL}/dashboard`
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
```

### Passo 4: Funções de E-mail

**Arquivo**: `server/email/emailService.ts`

```typescript
export async function sendPaymentProcessingEmail({
  email,
  name,
  planName,
  amount
}: {
  email: string;
  name: string;
  planName: string;
  amount: number;
}) {
  const html = `
    <h2>Pagamento em Processamento</h2>
    <p>Olá ${name},</p>
    <p>Recebemos sua tentativa de pagamento para o plano <strong>${planName}</strong>.</p>
    <p><strong>Valor:</strong> R$ ${(amount / 100).toFixed(2)}</p>
    <p>Você receberá um e-mail de confirmação assim que o pagamento for processado.</p>
    <p>Obrigado!</p>
  `;

  return sendEmail({
    to: email,
    subject: `Pagamento em Processamento - ${planName}`,
    html
  });
}

export async function sendAccessEmail({
  email,
  name,
  planName,
  mapsLimit,
  accessLink
}: {
  email: string;
  name: string;
  planName: string;
  mapsLimit: number;
  accessLink: string;
}) {
  const html = `
    <h2>Bem-vindo ao Portal de Numerologia!</h2>
    <p>Olá ${name},</p>
    <p>Seu pagamento foi aprovado com sucesso! 🎉</p>
    <p><strong>Plano:</strong> ${planName}</p>
    <p><strong>Mapas Disponíveis:</strong> ${mapsLimit}</p>
    <p><a href="${accessLink}" style="background: #00FFFF; color: #07131B; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Acessar Meu Dashboard</a></p>
    <p>Comece a explorar os mistérios da numerologia agora!</p>
  `;

  return sendEmail({
    to: email,
    subject: `Acesso Liberado - ${planName}`,
    html
  });
}
```

## Variáveis de Ambiente Necessárias

```env
# PagSeguro
PAGSEGURO_TOKEN=seu_token_aqui
PAGSEGURO_API_URL=https://api.pagseguro.com/orders
PAGSEGURO_PUBLIC_KEY=sua_chave_publica

# E-mail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASSWORD=sua_senha
SMTP_FROM_EMAIL=noreply@numerologia.com

# App
APP_URL=https://seu-dominio.com
```

## Fluxo Completo de Dados

```
1. Cliente clica "Teste Gratuitamente"
   ↓
2. Preenche nome e data de nascimento
   ↓
3. Sistema calcula mapa numerológico
   ↓
4. Mostra Degustação (CD + Ciclo Atual)
   ↓
5. Cliente clica "Veja seu mapa completo"
   ↓
6. Mostra 3 planos (Navegador, Visionário, Iluminado)
   ↓
7. Cliente seleciona plano e preenche e-mail
   ↓
8. Clica "Ir para PagSeguro"
   ↓
9. tRPC chama initiatePagSeguro
   ↓
10. Sistema salva cliente + cria pedido + envia e-mail "Pagamento em processamento"
    ↓
11. Cliente é redirecionado para PagSeguro
    ↓
12. Cliente completa pagamento
    ↓
13. PagSeguro envia webhook para nosso sistema
    ↓
14. Sistema atualiza pedido + ativa plano + envia e-mail "Acesso Liberado"
    ↓
15. Cliente acessa dashboard com mapas desbloqueados
```

## Testes Recomendados

### 1. Teste de Fluxo Completo
```bash
# Testar cálculo de mapa
POST /api/trpc/numerology.calculateChart
{
  "name": "Eliane Serafim",
  "birthDate": "04/01/1970"
}

# Testar iniciação de pagamento
POST /api/trpc/payment.initiatePagSeguro
{
  "email": "teste@example.com",
  "name": "Teste",
  "planId": "navigator",
  "planName": "Navegador",
  "amount": 2990,
  "paymentMethod": "pix"
}
```

### 2. Teste de Webhook
```bash
# Simular webhook de pagamento aprovado
POST /webhooks/pagseguro
{
  "reference": "order_123",
  "status": "PAID",
  "grossAmount": "29.90"
}
```

## Checklist de Implementação

- [ ] Criar componente `Tasting.tsx`
- [ ] Criar componente `PlansWithPayment.tsx`
- [ ] Atualizar `Home.tsx` com novo fluxo
- [ ] Implementar tRPC procedure `payment.initiatePagSeguro`
- [ ] Implementar webhook `/webhooks/pagseguro`
- [ ] Criar funções de e-mail
- [ ] Configurar variáveis de ambiente
- [ ] Testar fluxo completo
- [ ] Fazer checkpoint e publicar

## Suporte

Para dúvidas sobre a integração, consulte:
- [Documentação PagSeguro](https://dev.pagseguro.uol.com.br/)
- [Documentação tRPC](https://trpc.io/)
