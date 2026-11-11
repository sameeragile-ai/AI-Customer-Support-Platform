import React from 'react';
import { motion } from 'motion/react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';
import { Check, Link, Sliders, Globe } from 'lucide-react';

const STEP_ICONS = [Link, Sliders, Globe];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative bg-[#0A0E1A] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#7C5CFF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-slate-300 mb-4">
            <span>Simple 3-Step Setup</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Up and running before your next support shift.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            No complex prompt engineering or multi-week ML training cycles. Connect, set policy boundaries, and activate.
          </p>
        </div>

        {/* Steps Grid with Connecting Line */}
        <div className="relative">
          {/* Desktop Connecting Gradient Line */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-[2px] -translate-y-12 bg-gradient-to-r from-[#7C5CFF]/30 via-[#2EE6C5]/50 to-[#7C5CFF]/30 -z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const Icon = STEP_ICONS[idx] || Link;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="p-8 rounded-2xl bg-[#111627] border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col justify-between group shadow-xl relative"
                >
                  <div>
                    {/* Top Step Number Badge & Icon */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#7C5CFF]/20 to-[#2EE6C5]/20 border border-[#7C5CFF]/30 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5 text-[#2EE6C5]" />
                      </div>
                      <span className="font-mono text-3xl font-extrabold text-white/20 group-hover:text-white/40 transition-colors">
                        {step.step}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#2EE6C5] bg-[#2EE6C5]/10 px-2 py-0.5 rounded border border-[#2EE6C5]/20">
                      {step.badge}
                    </span>

                    <h3 className="font-heading text-xl font-bold text-white mt-3 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  {/* Sub-feature checklist */}
                  <div className="pt-6 border-t border-white/[0.06] space-y-2">
                    {step.subFeatures.map((sub, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-400">
                        <Check className="w-3.5 h-3.5 text-[#2EE6C5] shrink-0" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
