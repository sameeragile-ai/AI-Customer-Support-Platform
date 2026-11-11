import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck, ArrowRight, CornerDownRight, Cpu, Database, Webhook, RefreshCw, Radio, Layers } from 'lucide-react';

export const BentoFeatures: React.FC = () => {
  return (
    <section id="product" className="py-24 sm:py-32 relative bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 text-xs font-semibold text-[#2EE6C5] mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Autonomous Intelligence Engine</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Designed to feel like your most capable support lead.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Generic chatbots repeat keywords. Helmora grasps the customer's intent, queries live production data, and resolves requests end-to-end.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1: Multi-Turn Memory & Intent (Span 2 on lg for asymmetric impact) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-[#111627] border border-white/[0.08] hover:border-[#7C5CFF]/40 transition-all flex flex-col justify-between overflow-hidden relative group shadow-lg"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#7C5CFF]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#7C5CFF]/15 transition-all" />

            <div className="relative z-10 mb-6">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2EE6C5] bg-[#2EE6C5]/10 px-2.5 py-1 rounded-md border border-[#2EE6C5]/20">
                Core Engine
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mt-3 mb-2">
                Understands intent & multi-turn context
              </h3>
              <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
                Remembers previous context across 20+ turns. Extracts entities like order numbers, email addresses, and SKUs without interrogating the user.
              </p>
            </div>

            {/* Coded Miniature UI Illustration: Dialogue Tree & Entity Memory */}
            <div className="relative z-10 bg-[#0A0E1A] rounded-xl p-4 border border-white/[0.08] space-y-3 font-sans text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#2EE6C5]" />
                  Session Memory State: Active
                </span>
                <span className="text-[10px] bg-white/[0.05] px-2 py-0.5 rounded">3 Entities Tracked</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 shrink-0 font-mono text-[10px]">Turn 1</span>
                  <div className="bg-[#161C30] text-slate-200 px-3 py-1.5 rounded-lg border border-white/[0.05] flex-1">
                    "I want to change the delivery address for my recent sneaker order."
                  </div>
                </div>

                <div className="flex items-start gap-2 pl-4">
                  <CornerDownRight className="w-3.5 h-3.5 text-[#2EE6C5] shrink-0 mt-1" />
                  <div className="bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 text-white px-3 py-2 rounded-lg flex-1">
                    <div className="flex flex-wrap gap-2 text-[10px] mb-1 font-mono text-[#2EE6C5]">
                      <span>Extracted: SKU #SNK-901</span>
                      <span>·</span>
                      <span>Customer: Alex R.</span>
                    </div>
                    <span>"Certainly! I found your order for the Apex Runners (#48213). What is the new delivery address?"</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: RAG Over Knowledge */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#111627] border border-white/[0.08] hover:border-[#7C5CFF]/40 transition-all flex flex-col justify-between overflow-hidden relative group shadow-lg"
          >
            <div className="relative z-10 mb-6">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#7C5CFF] bg-[#7C5CFF]/10 px-2.5 py-1 rounded-md border border-[#7C5CFF]/20">
                Zero Hallucinations
              </span>
              <h3 className="font-heading text-xl font-bold text-white mt-3 mb-2">
                RAG over your actual knowledge
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connects to Zendesk, Notion, PDFs, and website docs. Answers cite exact source paragraphs.
              </p>
            </div>

            {/* Coded Miniature UI Illustration: Doc parsing & chunk highlight */}
            <div className="relative z-10 bg-[#0A0E1A] rounded-xl p-3.5 border border-white/[0.08] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/[0.06] pb-2">
                <span className="font-medium text-slate-300">help.domain.com/returns</span>
                <span className="text-[10px] text-[#2EE6C5] font-mono">Similarity 0.94</span>
              </div>
              <div className="p-2.5 rounded bg-[#161C30] border border-white/[0.05] text-[11px] text-slate-300 leading-relaxed">
                <span className="bg-[#7C5CFF]/30 text-white px-1 rounded">"Items may be returned within 30 calendar days</span> of receipt in original unworn condition with tags intact."
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#2EE6C5] font-medium pt-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified against revision #2026.11</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Takes Real Actions via APIs */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#111627] border border-white/[0.08] hover:border-[#2EE6C5]/40 transition-all flex flex-col justify-between overflow-hidden relative group shadow-lg"
          >
            <div className="relative z-10 mb-6">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2EE6C5] bg-[#2EE6C5]/10 px-2.5 py-1 rounded-md border border-[#2EE6C5]/20">
                Full Automation
              </span>
              <h3 className="font-heading text-xl font-bold text-white mt-3 mb-2">
                Takes real business actions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Processes refunds, modifies account tiers, books calendars, and queries databases via authenticated REST APIs.
              </p>
            </div>

            {/* Coded Miniature UI Illustration: Live API Request / Response */}
            <div className="relative z-10 bg-[#0A0E1A] rounded-xl p-3 border border-white/[0.08] font-mono text-[11px] space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[#2EE6C5] font-bold">POST /v1/orders/refund</span>
                <span className="text-emerald-400">200 OK</span>
              </div>
              <div className="p-2 bg-[#161C30] rounded text-slate-300 text-[10px] space-y-0.5">
                <div>{'{'}</div>
                <div className="pl-3 text-slate-400">"order_id": <span className="text-[#2EE6C5]">"ord_8829"</span>,</div>
                <div className="pl-3 text-slate-400">"amount_cents": <span className="text-white">4900</span>,</div>
                <div className="pl-3 text-slate-400">"status": <span className="text-[#2EE6C5]">"processed"</span></div>
                <div>{'}'}</div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Idempotency-Key validated</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Smart Human Handoff */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#111627] border border-white/[0.08] hover:border-[#FF7A59]/40 transition-all flex flex-col justify-between overflow-hidden relative group shadow-lg"
          >
            <div className="relative z-10 mb-6">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FF7A59] bg-[#FF7A59]/10 px-2.5 py-1 rounded-md border border-[#FF7A59]/20">
                Graceful Routing
              </span>
              <h3 className="font-heading text-xl font-bold text-white mt-3 mb-2">
                Smart human handoff
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When confidence dips below threshold or frustration spikes, Helmora hands off cleanly with summary notes.
              </p>
            </div>

            {/* Coded Miniature UI Illustration: Handoff card */}
            <div className="relative z-10 bg-[#0A0E1A] rounded-xl p-3.5 border border-white/[0.08] space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-white">Escalation Triggered</span>
                <span className="text-[10px] text-[#FF7A59] font-mono">Confidence: 81% (&lt;92%)</span>
              </div>
              <div className="p-2.5 rounded bg-[#161C30] border border-white/[0.06] text-[11px] text-slate-300 space-y-1">
                <div className="text-[10px] text-[#2EE6C5] font-semibold">AI Summary for Human Agent:</div>
                <div className="text-slate-300 text-[10px] leading-snug">
                  • User requested enterprise HIPAA BAA contract.<br />
                  • Verified tier: Pro Plan ($199/mo).<br />
                  • Routed to: Enterprise Sales (Sarah M.)
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Ticket Automation & Slack sync */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="lg:col-span-1 p-6 sm:p-8 rounded-2xl bg-[#111627] border border-white/[0.08] hover:border-[#7C5CFF]/40 transition-all flex flex-col justify-between overflow-hidden relative group shadow-lg"
          >
            <div className="relative z-10 mb-6">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#7C5CFF] bg-[#7C5CFF]/10 px-2.5 py-1 rounded-md border border-[#7C5CFF]/20">
                Tool Integration
              </span>
              <h3 className="font-heading text-xl font-bold text-white mt-3 mb-2">
                Bi-directional ticket sync
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Creates, tags, and updates tickets in Zendesk and HubSpot while notifying emergency channels in Slack.
              </p>
            </div>

            {/* Coded Miniature UI Illustration: Zendesk & Slack sync */}
            <div className="relative z-10 bg-[#0A0E1A] rounded-xl p-3.5 border border-white/[0.08] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] pb-1 border-b border-white/[0.06]">
                <span className="font-bold text-white">#ZD-1042</span>
                <span className="text-[10px] bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded font-mono">
                  Synced: Zendesk
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-[#161C30] text-[11px] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#7C5CFF]" />
                <span>Slack channel <span className="text-white font-mono">#support-alerts</span> notified</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
