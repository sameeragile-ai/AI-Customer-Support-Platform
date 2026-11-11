import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Sparkles, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    subtotalMonthly,
    subtotalOneTime,
    promoDiscount,
    promoApplied,
    grandTotal,
    applyPromo,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromo(inputCode);
      setInputCode('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full sm:max-w-md h-full bg-[#111627] border-l border-white/[0.08] shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C5CFF]/20 to-[#2EE6C5]/20 border border-[#7C5CFF]/30 flex items-center justify-center text-[#2EE6C5]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">Your Order</h3>
                  <p className="text-xs text-slate-400">
                    {items.length === 0 ? 'No items in cart' : `${items.length} ${items.length === 1 ? 'item' : 'items'} selected`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-500 mb-4">
                    <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h4 className="font-heading text-base font-semibold text-white mb-1">Your cart is empty</h4>
                  <p className="text-xs text-slate-400 max-w-xs mb-6">
                    Choose a plan or add-on booster to preview your tailored customer support stack.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      const pricingElem = document.querySelector('#pricing');
                      pricingElem?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-signature-gradient rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer"
                  >
                    Explore Plans & Add-ons
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 rounded-xl bg-[#161C30] border border-white/[0.07] flex flex-col gap-3 group relative hover:border-white/[0.14] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              item.type === 'plan'
                                ? 'bg-[#7C5CFF]/20 text-[#7C5CFF] border border-[#7C5CFF]/30'
                                : 'bg-[#2EE6C5]/15 text-[#2EE6C5] border border-[#2EE6C5]/25'
                            }`}
                          >
                            {item.type === 'plan' ? 'Subscription' : 'Add-on'}
                          </span>
                          {item.billingCycle && (
                            <span className="text-[10px] text-slate-400">
                              · Billed {item.billingCycle}
                            </span>
                          )}
                        </div>
                        <h4 className="font-heading text-sm font-bold text-white">{item.name}</h4>
                        {item.description && (
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.description}</p>
                        )}
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-base font-bold text-white tabular-nums">
                          ${item.price * item.quantity}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {item.billingType === 'monthly' ? '/mo' : 'one-time'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
                      {/* Quantity controls (addons only) */}
                      {item.type === 'addon' ? (
                        <div className="flex items-center gap-2 bg-[#0A0E1A] px-2 py-1 rounded-lg border border-white/[0.08]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-semibold text-white px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Primary Plan (1 max)</span>
                      )}

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors cursor-pointer p-1"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 sm:p-6 bg-[#0E1322] border-t border-white/[0.08] space-y-4">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo code (try LAUNCH20)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full bg-[#161C30] border border-white/[0.1] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C5CFF]"
                    />
                    <Tag className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.14] text-xs font-semibold text-white rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {promoApplied && (
                  <div className="flex items-center justify-between text-xs text-[#2EE6C5] bg-[#2EE6C5]/10 border border-[#2EE6C5]/20 rounded-lg px-3 py-1.5">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Code LAUNCH20 active (20% off)</span>
                    </span>
                    <span>-${promoDiscount}</span>
                  </div>
                )}

                {/* Pricing Breakdown */}
                <div className="space-y-1.5 text-xs text-slate-400 pt-1">
                  {subtotalMonthly > 0 && (
                    <div className="flex justify-between">
                      <span>Monthly Recurring</span>
                      <span className="font-mono text-slate-200 tabular-nums">${subtotalMonthly}/mo</span>
                    </div>
                  )}
                  {subtotalOneTime > 0 && (
                    <div className="flex justify-between">
                      <span>One-Time Setup</span>
                      <span className="font-mono text-slate-200 tabular-nums">${subtotalOneTime}</span>
                    </div>
                  )}
                  {promoApplied && (
                    <div className="flex justify-between text-[#2EE6C5]">
                      <span>Discount</span>
                      <span className="font-mono tabular-nums">-${promoDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/[0.08]">
                    <span>Due Today</span>
                    <span className="font-mono text-lg text-white tabular-nums">${grandTotal}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-signature-gradient shadow-[0_0_25px_rgba(124,92,255,0.45)] hover:shadow-[0_0_35px_rgba(46,230,197,0.55)] transition-all cursor-pointer flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2EE6C5]" />
                  <span>14-day money-back guarantee · Cancel anytime</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
