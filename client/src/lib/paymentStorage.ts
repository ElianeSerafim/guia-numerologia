/**
 * Payment Storage Helper
 * Manages payment order data in localStorage
 */

export interface PaymentOrder {
  orderId: string;
  email: string;
  name: string;
  planId: 'navegador' | 'visionario' | 'iluminado';
  planName: string;
  amount: number;
  paymentMethod: 'pix' | 'cartao' | 'boleto';
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  createdAt: number;
}

const STORAGE_PREFIX = 'payment_order_';
const STORAGE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Save payment order to localStorage
 */
export function savePaymentOrder(order: PaymentOrder): void {
  try {
    const key = `${STORAGE_PREFIX}${order.orderId}`;
    localStorage.setItem(key, JSON.stringify(order));
    
    // Also save to a recent orders list
    const recentKey = 'payment_recent_orders';
    const recent = JSON.parse(localStorage.getItem(recentKey) || '[]');
    recent.push({
      orderId: order.orderId,
      email: order.email,
      timestamp: order.timestamp,
    });
    localStorage.setItem(recentKey, JSON.stringify(recent.slice(-10))); // Keep last 10
  } catch (error) {
    console.error('Error saving payment order:', error);
  }
}

/**
 * Get payment order from localStorage
 */
export function getPaymentOrder(orderId: string): PaymentOrder | null {
  try {
    const key = `${STORAGE_PREFIX}${orderId}`;
    const data = localStorage.getItem(key);
    
    if (!data) return null;
    
    const order = JSON.parse(data) as PaymentOrder;
    
    // Check if order has expired
    if (Date.now() - order.createdAt > STORAGE_EXPIRY) {
      localStorage.removeItem(key);
      return null;
    }
    
    return order;
  } catch (error) {
    console.error('Error retrieving payment order:', error);
    return null;
  }
}

/**
 * Update payment order status
 */
export function updatePaymentOrderStatus(
  orderId: string,
  status: 'pending' | 'confirmed' | 'failed'
): void {
  try {
    const order = getPaymentOrder(orderId);
    if (order) {
      order.status = status;
      savePaymentOrder(order);
    }
  } catch (error) {
    console.error('Error updating payment order:', error);
  }
}

/**
 * Clear expired orders
 */
export function clearExpiredOrders(): void {
  try {
    const keys = Object.keys(localStorage);
    const now = Date.now();
    
    keys.forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const order = JSON.parse(data) as PaymentOrder;
            if (now - order.createdAt > STORAGE_EXPIRY) {
              localStorage.removeItem(key);
            }
          } catch (error) {
            localStorage.removeItem(key);
          }
        }
      }
    });
  } catch (error) {
    console.error('Error clearing expired orders:', error);
  }
}

/**
 * Get recent payment orders
 */
export function getRecentPaymentOrders(): PaymentOrder[] {
  try {
    const keys = Object.keys(localStorage);
    const orders: PaymentOrder[] = [];
    
    keys.forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const order = JSON.parse(data) as PaymentOrder;
            if (Date.now() - order.createdAt <= STORAGE_EXPIRY) {
              orders.push(order);
            }
          } catch (error) {
            // Skip invalid entries
          }
        }
      }
    });
    
    return orders.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error('Error retrieving recent orders:', error);
    return [];
  }
}

/**
 * Generate order ID
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}${random}`.toUpperCase();
}
