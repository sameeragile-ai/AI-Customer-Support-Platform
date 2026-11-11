import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FinalCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { setIsDemoModalOpen, addToast } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    addToast('Demo Scheduled!', 'Our solutions team will reach out within 15 minutes.', 'success');
  };

  return (
    <section className="py-20 sm:py-28 relative bg-[#0A0E1A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Glowing Banner Container */}
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 bg-gradient-to-b from-[#161C30] to-[#111627] border border-white/[0.12] shadow-2xl overflow-hidden text-center">
          {/* Internal ambient radial glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-80 bg-[radial-gradient(ellipse_at_top,rgba(124,92,255,0.35)_0%,rgba(46,230,197,0.15)_40%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-semibold text-[#2EE6C5] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch in 20 minutes</span>
            </span>

            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Give your support team its evenings back.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed text-balance">
              Join over 1,200 fast-growing companies that trust Helmora to resolve tickets with high accuracy and zero hallucinations.
            </p>

            {/* Email Capture & CTA */}
            {submitted ? (
              <div className="inline-flex items-center gap-2 p-3.5 px-6 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[#2EE6C5] text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Thanks! Check {email} for demo link.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md mx-auto mb-8"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email…"
                  className="bg-[#0A0E1A]/90 border border-white/[0.12] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#7C5CFF] flex-1 backdrop-blur-md"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-signature-gradient shadow-[0_0_25px_rgba(124,92,255,0.4)] hover:shadow-[0_0_35px_rgba(46,230,197,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 active:scale-95"
                >
                  <span>Book a demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Trust Markers */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2EE6C5]" />
                <span>14-day free trial</span>
              </div>
              <span>·</span>
              <span>No credit card required</span>
              <span>·</span>
              <span>SOC 2 Type II Certified</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
