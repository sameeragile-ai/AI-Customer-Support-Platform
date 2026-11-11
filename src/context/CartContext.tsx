import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Plan, Addon, ToastMessage } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Plan | Addon, billingCycle?: 'monthly' | 'yearly') => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  applyPromo: (code: string) => boolean;
  promoDiscount: number;
  promoApplied: boolean;
  subtotalMonthly: number;
  subtotalOneTime: number;
  totalDiscount: number;
  grandTotal: number;
  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'helmora_cart_items_v1';
const PROMO_STORAGE_KEY = 'helmora_promo_applied_v1';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Seed initial sensible default item (Growth plan) so cart is engaging right away if opened
    return [
      {
        id: 'plan-growth-monthly',
        itemId: 'plan-growth',
        type: 'plan',
        name: 'Growth Plan',
        price: 199,
        billingType: 'monthly',
        billingCycle: 'monthly',
        quantity: 1,
        description: '10,000 conversations/mo, API actions & CRM sync',
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [items]);

  // Sync promo to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, promoApplied ? 'true' : 'false');
    } catch (e) {
      console.warn('Failed to save promo', e);
    }
  }, [promoApplied]);

  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addItem = (item: Plan | Addon, billingCycle: 'monthly' | 'yearly' = 'monthly') => {
    const isPlan = 'features' in item;

    if (isPlan) {
      const plan = item as Plan;
      const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
      const existingPlan = items.find((i) => i.type === 'plan');

      if (existingPlan) {
        // Replace existing plan
        setItems((prev) =>
          prev
            .filter((i) => i.type !== 'plan')
            .concat({
              id: `${plan.id}-${billingCycle}`,
              itemId: plan.id,
              type: 'plan',
              name: `${plan.name} Plan`,
              price,
              billingType: 'monthly',
              billingCycle,
              quantity: 1,
              description: plan.conversations,
            })
        );
        addToast(`Plan switched to ${plan.name}`, `Updated to ${billingCycle} billing at $${price}/mo.`, 'info');
      } else {
        setItems((prev) => [
          ...prev,
          {
            id: `${plan.id}-${billingCycle}`,
            itemId: plan.id,
            type: 'plan',
            name: `${plan.name} Plan`,
            price,
            billingType: 'monthly',
            billingCycle,
            quantity: 1,
            description: plan.conversations,
          },
        ]);
        addToast(`Added ${plan.name} Plan`, `$${price}/mo added to your subscription.`, 'success');
      }
    } else {
      // Addon
      const addon = item as Addon;
      const existing = items.find((i) => i.itemId === addon.id);

      if (existing) {
        setItems((prev) =>
          prev.map((i) => (i.itemId === addon.id ? { ...i, quantity: i.quantity + 1 } : i))
        );
        addToast(`Updated ${addon.name}`, `Quantity increased to ${existing.quantity + 1}.`, 'info');
      } else {
        setItems((prev) => [
          ...prev,
          {
            id: addon.id,
            itemId: addon.id,
            type: 'addon',
            name: addon.name,
            price: addon.price,
            billingType: addon.billingType,
            quantity: 1,
            description: addon.description,
          },
        ]);
        addToast(`Added ${addon.name}`, `$${addon.price} (${addon.billingType}) added to cart.`, 'success');
      }
    }
  };

  const removeItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      addToast(`Removed ${item.name}`, undefined, 'info');
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            // Plans cannot have quantity > 1
            if (item.type === 'plan') return item;
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromo = (code: string) => {
    if (code.trim().toUpperCase() === 'LAUNCH20') {
      setPromoApplied(true);
      addToast('Promo Code Applied!', '20% discount applied to your order.', 'success');
      return true;
    } else {
      addToast('Invalid Promo Code', 'Use code LAUNCH20 for 20% discount.', 'warning');
      return false;
    }
  };

  // Calculations
  const subtotalMonthly = items
    .filter((i) => i.billingType === 'monthly')
    .reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const subtotalOneTime = items
    .filter((i) => i.billingType === 'one-time')
    .reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const rawTotal = subtotalMonthly + subtotalOneTime;
  const promoDiscount = promoApplied ? Math.round(rawTotal * 0.2) : 0;
  const totalDiscount = promoDiscount;
  const grandTotal = Math.max(0, rawTotal - totalDiscount);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isDemoModalOpen,
        setIsDemoModalOpen,
        promoCode,
        setPromoCode,
        applyPromo,
        promoDiscount,
        promoApplied,
        subtotalMonthly,
        subtotalOneTime,
        totalDiscount,
        grandTotal,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
