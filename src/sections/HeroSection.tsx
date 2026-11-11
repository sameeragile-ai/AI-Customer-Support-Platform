import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, Star, Check, ArrowRight, RefreshCw, Send, ShieldCheck, UserCheck, ExternalLink, Zap } from 'lucide-react';
import { HERO_DEMO_STEPS, SANDBOX_PRESETS } from '../data/mockData';
import { useCart } from '../context/CartContext';

export const HeroSection: React.FC = () => {
  const { setIsCartOpen, setIsDemoModalOpen } = useCart();

  // Auto-playing conversation loop state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [customQuery, setCustomQuery] = useState('');
  const [activeCustomPreset, setActiveCustomPreset] = useState<typeof SANDBOX_PRESETS[0] | null>(null);

  // Progressive loop through HERO_DEMO_STEPS
  useEffect(() => {
    if (isPaused || activeCustomPreset) return;

    let timeout: NodeJS.Timeout;

    if (currentStepIndex < HERO_DEMO_STEPS.length - 1) {
      setIsTyping(true);
      timeout = setTimeout(() => {
        setIsTyping(false);
        setCurrentStepIndex((prev) => prev + 1);
      }, 2400);
    } else {
      // Loop back after 6 seconds of resting at the final state
      timeout = setTimeout(() => {
        setCurrentStepIndex(0);
      }, 6500);
    }

    return () => clearTimeout(timeout);
  }, [currentStepIndex, isPaused, activeCustomPreset]);

  const handleCustomPresetSelect = (preset: typeof SANDBOX_PRESETS[0]) => {
    setActiveCustomPreset(preset);
  };

  const handleResetToLoop = () => {
    setActiveCustomPreset(null);
    setCurrentStepIndex(0);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    // Simulate instant intelligent matching
    setActiveCustomPreset({
      prompt: customQuery,
      intent: 'Customer Inquiry · Custom Lookup',
      confidence: 96,
      action: 'Custom REST API · executeLookup()',
      response: `Grounded in your internal knowledge base: "${customQuery.slice(0, 35)}…" has been matched against active documentation. Detailed resolution steps have been retrieved with 96% verification.`,
      citation: 'Help Center Docs & API Knowledge',
      escalated: false,
    });
    setCustomQuery('');
  };

  const visibleSteps = HERO_DEMO_STEPS.slice(0, currentStepIndex + 1);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial gradients & subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.18)_0%,rgba(46,230,197,0.06)_45%,transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#7C5CFF]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Announcement Pill Badge */}
            <motion.a
              href="#channels"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-slate-300 hover:text-white hover:border-[#7C5CFF]/40 hover:bg-white/[0.07] transition-all mb-6 group cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-signature-gradient" />
              <span>New · Voice agents now in private beta</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2EE6C5] group-hover:translate-x-0.5 transition-transform" />
            </motion.a>

            {/* Headline with signature gradient keyword */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-balance mb-6"
            >
              Resolve 70% of support tickets — with answers{' '}
              <span className="text-gradient">grounded</span> in your own knowledge.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mb-8"
            >
              Connect your website, help center and internal docs. Helmora answers customers, takes real actions through your APIs, and hands off to your team the moment it’s unsure.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10"
            >
              <button
                onClick={() => {
                  const pricingEl = document.querySelector('#pricing');
                  pricingEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative group overflow-hidden px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-signature-gradient shadow-[0_0_30px_rgba(124,92,255,0.45)] hover:shadow-[0_0_40px_rgba(46,230,197,0.55)] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Start free trial</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer-sweep bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              </button>

              <button
                onClick={() => {
                  const demoEl = document.querySelector('#dashboard');
                  demoEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.2] transition-all cursor-pointer flex items-center justify-center gap-2.5 backdrop-blur-md"
              >
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[#2EE6C5]">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch it work</span>
              </button>
            </motion.div>

            {/* Social Proof Trust Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2 border-t border-white/[0.07]"
            >
              {/* Avatar Stack */}
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Support Leader Avatar"
                    loading="lazy"
                    className="w-8 h-8 rounded-full border-2 border-[#0A0E1A] object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Ccircle cx="16" cy="16" r="16" fill="%237C5CFF"/%3E%3C/svg%3E';
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-[#FF7A59]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white">4.9/5</span>
                <span className="text-xs text-slate-400">· Trusted by 1,200+ support teams</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Animated Live-Looking Chat Widget Mockup */}
          <div className="lg:col-span-5 relative">
            {/* Floating Glass Parallax Mini-cards */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="hidden sm:flex absolute -top-6 -left-6 z-20 items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#161C30]/90 backdrop-blur-xl border border-white/[0.12] shadow-xl text-xs"
            >
              <div className="w-2 h-2 rounded-full bg-[#2EE6C5] shadow-[0_0_8px_#2EE6C5]" />
              <span className="text-slate-300 font-medium">Avg. response</span>
              <span className="font-mono font-bold text-white tabular-nums">1.8s</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut' }}
              className="hidden sm:flex absolute -bottom-6 -left-4 z-20 items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#161C30]/90 backdrop-blur-xl border border-white/[0.12] shadow-xl text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7C5CFF]" />
              <span className="text-slate-300 font-medium">CSAT</span>
              <span className="font-mono font-bold text-white tabular-nums">94.2%</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 0.5 }}
              className="hidden sm:flex absolute top-1/2 -right-8 z-20 items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161C30]/90 backdrop-blur-xl border border-[#2EE6C5]/20 shadow-xl text-xs"
            >
              <span className="text-[#2EE6C5] font-bold">71%</span>
              <span className="text-slate-300">tickets auto-resolved</span>
            </motion.div>

            {/* Main Widget Container */}
            <div className="w-full rounded-2xl bg-[#111627] border border-white/[0.12] shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col">
              
              {/* Chat Widget Top Header */}
              <div className="px-4 py-3 bg-[#161C30] border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-signature-gradient flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <rect x="3" y="3" width="4" height="18" rx="2" fill="white" />
                      <rect x="17" y="3" width="4" height="18" rx="2" fill="white" />
                      <rect x="7" y="10" width="10" height="4" rx="2" fill="white" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">Helmora Agent</span>
                      <span className="text-[10px] bg-emerald-500/15 text-[#2EE6C5] border border-emerald-500/25 px-1.5 py-0.2 rounded font-medium">
                        Live AI
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">Connected to Shopify & Zendesk</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleResetToLoop}
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/[0.05] transition-colors cursor-pointer"
                    title="Replay simulated conversation"
                    aria-label="Replay simulated conversation"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="px-2 py-1 text-[10px] text-slate-300 bg-white/[0.05] hover:bg-white/[0.1] rounded transition-colors"
                  >
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="p-4 space-y-3.5 min-h-[360px] max-h-[390px] overflow-y-auto flex flex-col justify-start text-xs">
                
                {activeCustomPreset ? (
                  /* Custom Sandbox View */
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex justify-end">
                      <div className="max-w-[85%] bg-[#7C5CFF] text-white p-3 rounded-2xl rounded-tr-sm shadow-md">
                        {activeCustomPreset.prompt}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 py-1 text-[10px]">
                      <span className="bg-[#161C30] text-slate-300 border border-white/[0.08] px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3 text-[#2EE6C5]" />
                        {activeCustomPreset.intent}
                      </span>
                      <span className="bg-emerald-500/10 text-[#2EE6C5] border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        Confidence {activeCustomPreset.confidence}%
                      </span>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0A0E1A] border border-white/[0.08] text-[11px] text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#2EE6C5]" />
                      <span>{activeCustomPreset.action}</span>
                    </div>

                    <div className="flex justify-start">
                      <div className="max-w-[90%] bg-[#161C30] border border-white/[0.08] text-slate-200 p-3 rounded-2xl rounded-tl-sm space-y-2">
                        <p className="leading-relaxed">{activeCustomPreset.response}</p>
                        <div className="pt-1.5 border-t border-white/[0.06] flex items-center gap-1 text-[10px] text-[#2EE6C5]">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Source: {activeCustomPreset.citation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-2">
                      <button
                        onClick={handleResetToLoop}
                        className="text-[11px] text-slate-400 hover:text-white underline"
                      >
                        ← Back to standard simulation
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Auto-looping standard steps */
                  visibleSteps.map((step) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      {/* Customer Message */}
                      {step.sender === 'customer' && (
                        <div className="flex justify-end">
                          <div className="max-w-[85%] bg-[#7C5CFF] text-white p-3 rounded-2xl rounded-tr-sm shadow-md">
                            <p className="leading-relaxed">{step.text}</p>
                            <span className="text-[9px] text-white/60 block text-right mt-1">
                              {step.timestamp}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* AI Response & Sub-actions */}
                      {step.sender === 'ai' && (
                        <div className="space-y-2">
                          {/* Intent & Confidence Chip */}
                          {step.intent && (
                            <div className="flex flex-wrap items-center gap-1.5 text-[10px] animate-fadeIn">
                              <span className="bg-[#161C30] text-slate-300 border border-white/[0.08] px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Zap className="w-3 h-3 text-[#2EE6C5]" />
                                Intent: {step.intent}
                              </span>
                              <span className="bg-emerald-500/10 text-[#2EE6C5] border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                                Confidence {step.confidence}%
                              </span>
                            </div>
                          )}

                          {/* API Lookup Step */}
                          {step.apiAction && (
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0A0E1A] border border-white/[0.08] text-[11px] text-slate-300">
                              <span className="w-3 h-3 border-2 border-[#2EE6C5] border-t-transparent rounded-full animate-spin" />
                              <span className="text-slate-300">
                                Looking up order via <span className="text-white font-medium">Shopify API</span>…
                              </span>
                            </div>
                          )}

                          {/* Message Content */}
                          {!step.apiAction && (
                            <div className="flex justify-start">
                              <div className="max-w-[90%] bg-[#161C30] border border-white/[0.08] text-slate-200 p-3 rounded-2xl rounded-tl-sm space-y-2 shadow-sm">
                                <p className="leading-relaxed">{step.text}</p>

                                {/* Grounded Citation */}
                                {step.citation && (
                                  <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px]">
                                    <div className="flex items-center gap-1 text-[#2EE6C5] font-medium">
                                      <ShieldCheck className="w-3 h-3" />
                                      <span>{step.citation.title}</span>
                                    </div>
                                    <span className="text-slate-400 font-mono text-[9px]">help center</span>
                                  </div>
                                )}

                                {/* Human Handoff Badge */}
                                {step.handoff && (
                                  <div className="mt-2 p-2 rounded-lg bg-[#FF7A59]/10 border border-[#FF7A59]/20 text-[10px] text-slate-300 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                      <UserCheck className="w-3.5 h-3.5 text-[#FF7A59]" />
                                      <span className="font-semibold text-white">Ticket #{step.handoff.ticketId} created</span>
                                    </div>
                                    <span className="text-[#FF7A59] font-medium">Handed off to human</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))
                )}

                {/* Typing Indicator */}
                {isTyping && !activeCustomPreset && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1.5 p-2.5 rounded-xl bg-[#161C30] w-16 text-slate-400"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:0.4s]" />
                  </motion.div>
                )}
              </div>

              {/* Chat Input & Sandbox Presets */}
              <div className="p-3 bg-[#0E1322] border-t border-white/[0.08] space-y-2">
                {/* Presets Row */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] text-slate-400 scrollbar-none">
                  <span className="shrink-0 text-slate-400 font-medium">Test inquiries:</span>
                  {SANDBOX_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCustomPresetSelect(p)}
                      className="shrink-0 px-2.5 py-1 rounded-full bg-[#161C30] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#7C5CFF]/40 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {idx === 0 ? 'Refund Policy' : idx === 1 ? 'MFA Reset' : 'Incident'}
                    </button>
                  ))}
                </div>

                {/* Input Bar */}
                <form onSubmit={handleCustomSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    placeholder="Ask a customer support question…"
                    className="flex-1 bg-[#161C30] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C5CFF]"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-signature-gradient text-white hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center"
                    aria-label="Send test message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>

        {/* Animated Count-up Stats Strip under Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-[#111627]/70 border border-white/[0.08] backdrop-blur-xl shadow-xl"
        >
          <div className="p-2 sm:p-4 border-r-0 sm:border-r border-white/[0.06]">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
              71.4%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              Tickets Auto-Resolved
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Without requiring human agent intervention
            </div>
          </div>

          <div className="p-2 sm:p-4 border-r-0 lg:border-r border-white/[0.06]">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#2EE6C5] tracking-tight tabular-nums">
              1.8s
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              Average Response Time
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Sub-second RAG retrieval + validation
            </div>
          </div>

          <div className="p-2 sm:p-4 border-r-0 sm:border-r border-white/[0.06]">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
              94.2%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              Verified CSAT Rating
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Across 1.4M+ post-chat customer reviews
            </div>
          </div>

          <div className="p-2 sm:p-4">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#7C5CFF] tracking-tight tabular-nums">
              40M+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              Conversations Handled
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Powering global high-growth startups
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
