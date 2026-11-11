import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PLANS, ADDONS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Check, Sparkles, Plus, Mic, MessageCircle, Cloud, Code, Palette, Compass, ShoppingBag, ArrowRight } from 'lucide-react';

const ADDON_ICONS: Record<string, React.ElementType> = {
  Mic,
  MessageCircle,
  Cloud,
  Code,
  Palette,
  Compass,
};

export const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { items, addItem, setIsCartOpen } = useCart();

  const isItemInCart = (id: string) => {
    return items.some((item) => item.itemId === id);
  };

  return (
    <section id="pricing" className="py-24 sm:py-32 relative bg-[#0A0E1A] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.14)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-slate-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#2EE6C5]" />
            <span>Transparent, Predictable Billing</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Plans that scale with your customer volume.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Every plan includes our deterministic RAG engine and zero-hallucination guardrails. No hidden fees or surprise overages.
          </p>

          {/* Monthly / Yearly Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-xl bg-[#111627] border border-white/[0.1] shadow-inner">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#161C30] text-white shadow-md border border-white/[0.08]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                billingCycle === 'yearly'
                  ? 'bg-signature-gradient text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/30 text-[#2EE6C5] uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Core Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24">
          {PLANS.map((plan) => {
            const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
            const inCart = isItemInCart(plan.id);

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                  plan.popular
                    ? 'bg-[#161C30] border-2 border-[#7C5CFF] shadow-[0_0_40px_-10px_rgba(124,92,255,0.4)] lg:-translate-y-2'
                    : 'bg-[#111627] border border-white/[0.08] hover:border-white/[0.16] shadow-xl'
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-signature-gradient text-white shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-xl font-bold text-white">{plan.name}</h3>
                    <span className="text-[11px] font-mono text-[#2EE6C5] bg-[#2EE6C5]/10 px-2 py-0.5 rounded border border-[#2EE6C5]/20">
                      {plan.conversations.split(' /')[0]}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-6 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6 flex items-baseline gap-1.5">
                    <span className="font-mono text-4xl sm:text-5xl font-extrabold text-white tracking-tight tabular-nums">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-400">/ month</span>
                    {billingCycle === 'yearly' && (
                      <span className="text-[10px] text-[#2EE6C5] ml-2 block font-medium">
                        billed annually
                      </span>
                    )}
                  </div>

                  {/* Add to Cart / Switch Plan CTA */}
                  <button
                    onClick={() => addItem(plan, billingCycle)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group mb-8 ${
                      plan.popular
                        ? 'bg-signature-gradient text-white shadow-lg hover:shadow-cyan-500/25 active:scale-95'
                        : 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1] active:scale-95'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{inCart ? 'Active in Cart · Replace' : plan.ctaText}</span>
                  </button>

                  {/* Features List */}
                  <div className="space-y-3 pt-6 border-t border-white/[0.06]">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Included with {plan.name}:
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#2EE6C5] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-ons Grid */}
        <div className="mt-16 pt-12 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono font-semibold text-[#2EE6C5] uppercase tracking-wider">
                Modular Capabilities
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
                Customize with specialized Add-ons
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg">
                Add phone telephony, higher capacity, or enterprise connectors anytime with a single click.
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2EE6C5] hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>View shopping cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADDONS.map((addon) => {
              const Icon = ADDON_ICONS[addon.iconName] || Plus;
              const inCart = isItemInCart(addon.id);

              return (
                <div
                  key={addon.id}
                  className="p-6 rounded-2xl bg-[#111627] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#2EE6C5] group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      {addon.tag && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#7C5CFF]/15 text-[#7C5CFF] border border-[#7C5CFF]/25">
                          {addon.tag}
                        </span>
                      )}
                    </div>

                    <h4 className="font-heading text-base font-bold text-white mb-1">
                      {addon.name}
                    </h4>
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                      {addon.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <div>
                      <span className="font-mono text-xl font-bold text-white tabular-nums">
                        ${addon.price}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-1">
                        {addon.billingType === 'monthly' ? '/mo' : 'one-time'}
                      </span>
                    </div>

                    <button
                      onClick={() => addItem(addon)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                        inCart
                          ? 'bg-[#2EE6C5]/20 text-[#2EE6C5] border border-[#2EE6C5]/30'
                          : 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.08]'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{inCart ? 'Add Another' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
