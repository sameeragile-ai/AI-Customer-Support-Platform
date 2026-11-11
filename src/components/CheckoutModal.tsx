import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, CreditCard, Lock, ShieldCheck, ArrowRight, Sparkles, Building, Mail, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    items,
    clearCart,
    grandTotal,
    subtotalMonthly,
    subtotalOneTime,
    promoDiscount,
    addToast,
  } = useCart();

  const [form, setForm] = useState({
    name: 'Sarah Connor',
    email: 'sarah@skynet-support.com',
    company: 'Skynet Logistics Inc.',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvc: '888',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment authorization
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7C5CFF', '#2EE6C5', '#FF7A59', '#FFFFFF'],
        });
      } catch {
        // Safe fallback
      }

      addToast('Order Confirmed!', 'Welcome to Helmora. Check your email for API access.', 'success');
      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-xl bg-[#111627] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden z-10 my-auto"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#161C30]/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-signature-gradient flex items-center justify-center text-white">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">Secure Checkout</h3>
                  <p className="text-xs text-slate-400">256-bit encrypted enterprise checkout</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess ? (
              /* Success State */
              <div className="p-8 text-center flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7C5CFF] to-[#2EE6C5] flex items-center justify-center text-white mb-4 shadow-[0_0_30px_rgba(46,230,197,0.5)]"
                >
                  <CheckCircle className="w-9 h-9" />
                </motion.div>

                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                  Welcome to Helmora!
                </h3>
                <p className="text-sm text-slate-300 max-w-sm mb-6">
                  Your workspace has been provisioned. We’ve sent your API credentials and onboarding guide to <span className="text-[#2EE6C5] font-semibold">{form.email}</span>.
                </p>

                {/* Receipt Box */}
                <div className="w-full bg-[#161C30] rounded-xl p-4 border border-white/[0.08] text-left text-xs space-y-2 mb-6">
                  <div className="flex justify-between text-slate-400 pb-2 border-b border-white/[0.06]">
                    <span>Receipt ID</span>
                    <span className="font-mono text-white">#HLM-2026-9941</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Organization</span>
                    <span className="text-white font-medium">{form.company}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Charged Today</span>
                    <span className="font-mono text-white font-bold">${grandTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Next Billing Cycle</span>
                    <span className="text-white">December 11, 2026</span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-signature-gradient shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer"
                >
                  Go to Helmora Dashboard
                </button>
              </div>
            ) : (
              /* Checkout Form */
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
                {/* Order Summary Mini Bar */}
                <div className="bg-[#161C30] rounded-xl p-3.5 border border-white/[0.08] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block">Total Due Today</span>
                    <span className="font-mono text-lg font-bold text-white">${grandTotal}</span>
                  </div>
                  <div className="text-right text-[11px] text-slate-400">
                    {subtotalMonthly > 0 && <span>${subtotalMonthly}/mo recurring</span>}
                    {subtotalOneTime > 0 && <span className="block">+${subtotalOneTime} setup</span>}
                    {promoDiscount > 0 && (
                      <span className="text-[#2EE6C5] block font-medium">-${promoDiscount} promo discount</span>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    1. Account Information
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#161C30] border border-white/[0.08] rounded-xl px-3.5 py-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C5CFF]"
                      />
                      <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="Work Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#161C30] border border-white/[0.08] rounded-xl px-3.5 py-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C5CFF]"
                      />
                      <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Company Name"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full bg-[#161C30] border border-white/[0.08] rounded-xl px-3.5 py-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C5CFF]"
                    />
                    <Building className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                  </div>
                </div>

                {/* Payment Information */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      2. Payment Method
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2EE6C5]" />
                      Stripe Verified
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Card number"
                      value={form.cardNumber}
                      onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                      className="w-full bg-[#161C30] border border-white/[0.08] rounded-xl px-3.5 py-2.5 pl-9 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#7C5CFF]"
                    />
                    <CreditCard className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="MM / YY"
                      value={form.expDate}
                      onChange={(e) => setForm({ ...form, expDate: e.target.value })}
                      className="bg-[#161C30] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#7C5CFF]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="CVC"
                      value={form.cvc}
                      onChange={(e) => setForm({ ...form, cvc: e.target.value })}
                      className="bg-[#161C30] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#7C5CFF]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-signature-gradient shadow-[0_0_25px_rgba(124,92,255,0.4)] hover:shadow-[0_0_35px_rgba(46,230,197,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authorizing Payment…
                    </span>
                  ) : (
                    <>
                      <span>Complete Purchase (${grandTotal})</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  By clicking complete, you agree to Helmora's Terms of Service and Privacy Policy. You can cancel anytime with 1 click from your workspace.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
