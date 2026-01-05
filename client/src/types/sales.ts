/**
 * Sales and Coupon Types
 * Tipos para gerenciamento de vendas, cupons e histórico de pagamentos
 */

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxUses: number;
  usedCount: number;
  applicablePlans: ('navigator' | 'visionary' | 'illuminated')[];
  expiryDate: string;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
}

export interface PaymentRecord {
  id: string;
  customerId: string;
  customerEmail: string;
  customerName: string;
  plan: 'navigator' | 'visionary' | 'illuminated';
  amount: number;
  discountApplied: number;
  finalAmount: number;
  couponCode?: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentMethod: 'whatsapp' | 'other';
  approvedAt?: string;
  rejectedAt?: string;
  createdAt: string;
}

export interface SalesReport {
  totalRevenue: number;
  totalSales: number;
  averageOrderValue: number;
  pendingApprovals: number;
  approvedSales: number;
  rejectedSales: number;
  planBreakdown: {
    navigator: number;
    visionary: number;
    illuminated: number;
  };
  topCoupons: Array<{
    code: string;
    usedCount: number;
    totalDiscount: number;
  }>;
  revenueByDate: Array<{
    date: string;
    revenue: number;
    sales: number;
  }>;
}
