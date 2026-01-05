/**
 * Hook useSalesManagement
 * Gerencia cupons, histórico de pagamentos e relatórios de vendas
 */

import { useState, useEffect } from 'react';
import { Coupon, PaymentRecord, SalesReport } from '@/types/sales';

const COUPONS_STORAGE_KEY = 'sales_coupons';
const PAYMENT_HISTORY_STORAGE_KEY = 'payment_history';

export const useSalesManagement = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const storedCoupons = localStorage.getItem(COUPONS_STORAGE_KEY);
    if (storedCoupons) {
      try {
        setCoupons(JSON.parse(storedCoupons));
      } catch (e) {
        console.error('Erro ao carregar cupons:', e);
      }
    }

    const storedPayments = localStorage.getItem(PAYMENT_HISTORY_STORAGE_KEY);
    if (storedPayments) {
      try {
        setPaymentHistory(JSON.parse(storedPayments));
      } catch (e) {
        console.error('Erro ao carregar histórico de pagamentos:', e);
      }
    }
  }, []);

  // Criar novo cupom
  const createCoupon = (
    code: string,
    discountType: 'percentage' | 'fixed',
    discountValue: number,
    maxUses: number,
    applicablePlans: ('navigator' | 'visionary' | 'illuminated')[],
    expiryDate: string,
    createdBy: string
  ): boolean => {
    // Validar código único
    if (coupons.some((c) => c.code.toUpperCase() === code.toUpperCase())) {
      return false;
    }

    const newCoupon: Coupon = {
      id: `coupon_${Date.now()}`,
      code: code.toUpperCase(),
      discountType,
      discountValue,
      maxUses,
      usedCount: 0,
      applicablePlans,
      expiryDate,
      isActive: true,
      createdAt: new Date().toISOString(),
      createdBy,
    };

    const updated = [...coupons, newCoupon];
    setCoupons(updated);
    localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(updated));
    return true;
  };

  // Validar e aplicar cupom
  const validateCoupon = (code: string, plan: 'navigator' | 'visionary' | 'illuminated'): { valid: boolean; discount: number; message: string } => {
    const coupon = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase());

    if (!coupon) {
      return { valid: false, discount: 0, message: 'Cupom não encontrado' };
    }

    if (!coupon.isActive) {
      return { valid: false, discount: 0, message: 'Cupom inativo' };
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      return { valid: false, discount: 0, message: 'Cupom expirado' };
    }

    if (coupon.usedCount >= coupon.maxUses) {
      return { valid: false, discount: 0, message: 'Cupom atingiu limite de uso' };
    }

    if (!coupon.applicablePlans.includes(plan)) {
      return { valid: false, discount: 0, message: 'Cupom não é válido para este plano' };
    }

    return { valid: true, discount: coupon.discountValue, message: 'Cupom válido' };
  };

  // Usar cupom (incrementar contador)
  const useCoupon = (couponCode: string): boolean => {
    const coupon = coupons.find((c) => c.code.toUpperCase() === couponCode.toUpperCase());
    if (!coupon) return false;

    const updated = coupons.map((c) =>
      c.id === coupon.id ? { ...c, usedCount: c.usedCount + 1 } : c
    );
    setCoupons(updated);
    localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(updated));
    return true;
  };

  // Deletar cupom
  const deleteCoupon = (couponId: string): boolean => {
    const updated = coupons.filter((c) => c.id !== couponId);
    setCoupons(updated);
    localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(updated));
    return true;
  };

  // Ativar/Desativar cupom
  const toggleCouponStatus = (couponId: string): boolean => {
    const updated = coupons.map((c) =>
      c.id === couponId ? { ...c, isActive: !c.isActive } : c
    );
    setCoupons(updated);
    localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(updated));
    return true;
  };

  // Adicionar registro de pagamento
  const addPaymentRecord = (payment: Omit<PaymentRecord, 'id' | 'createdAt'>): PaymentRecord => {
    const newPayment: PaymentRecord = {
      ...payment,
      id: `payment_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const updated = [...paymentHistory, newPayment];
    setPaymentHistory(updated);
    localStorage.setItem(PAYMENT_HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return newPayment;
  };

  // Gerar relatório de vendas
  const generateSalesReport = (): SalesReport => {
    const approvedPayments = paymentHistory.filter((p) => p.status === 'approved');
    const pendingPayments = paymentHistory.filter((p) => p.status === 'pending');
    const rejectedPayments = paymentHistory.filter((p) => p.status === 'rejected');

    const totalRevenue = approvedPayments.reduce((sum, p) => sum + p.finalAmount, 0);
    const totalDiscount = approvedPayments.reduce((sum, p) => sum + p.discountApplied, 0);

    // Breakdown por plano
    const planBreakdown = {
      navigator: approvedPayments.filter((p) => p.plan === 'navigator').length,
      visionary: approvedPayments.filter((p) => p.plan === 'visionary').length,
      illuminated: approvedPayments.filter((p) => p.plan === 'illuminated').length,
    };

    // Top cupons
    const couponUsage: { [key: string]: { code: string; usedCount: number; totalDiscount: number } } = {};
    approvedPayments.forEach((p) => {
      if (p.couponCode) {
        if (!couponUsage[p.couponCode]) {
          couponUsage[p.couponCode] = { code: p.couponCode, usedCount: 0, totalDiscount: 0 };
        }
        couponUsage[p.couponCode].usedCount += 1;
        couponUsage[p.couponCode].totalDiscount += p.discountApplied;
      }
    });

    const topCoupons = Object.values(couponUsage)
      .sort((a, b) => b.usedCount - a.usedCount)
      .slice(0, 5);

    // Receita por data (últimos 30 dias)
    const revenueByDate: { [key: string]: { revenue: number; sales: number } } = {};
    approvedPayments.forEach((p) => {
      const date = new Date(p.createdAt).toLocaleDateString('pt-BR');
      if (!revenueByDate[date]) {
        revenueByDate[date] = { revenue: 0, sales: 0 };
      }
      revenueByDate[date].revenue += p.finalAmount;
      revenueByDate[date].sales += 1;
    });

    const revenueByDateArray = Object.entries(revenueByDate)
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      totalRevenue,
      totalSales: approvedPayments.length,
      averageOrderValue: approvedPayments.length > 0 ? totalRevenue / approvedPayments.length : 0,
      pendingApprovals: pendingPayments.length,
      approvedSales: approvedPayments.length,
      rejectedSales: rejectedPayments.length,
      planBreakdown,
      topCoupons,
      revenueByDate: revenueByDateArray,
    };
  };

  // Obter histórico de pagamentos filtrado
  const getPaymentHistory = (filter?: 'pending' | 'approved' | 'rejected'): PaymentRecord[] => {
    if (!filter) return paymentHistory;
    return paymentHistory.filter((p) => p.status === filter);
  };

  return {
    coupons,
    paymentHistory,
    createCoupon,
    validateCoupon,
    useCoupon,
    deleteCoupon,
    toggleCouponStatus,
    addPaymentRecord,
    generateSalesReport,
    getPaymentHistory,
  };
};
