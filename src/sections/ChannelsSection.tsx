import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Mail, Mic, Play, Pause, Volume2, Sparkles, PhoneCall, Check } from 'lucide-react';

export const ChannelsSection: React.FC = () => {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  return (
    <section id="channels" className="py-24 sm:py-32 relative bg-[#0A0E1A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-slate-300 mb-4">
            <Volume2 className="w-3.5 h-3.5 text-[#2EE6C5]" />
            <span>Omnichannel Consistency</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            One single intelligence. Every customer channel.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Stop training separate bots for chat, email, and phone. Helmora shares customer state, memory, and API credentials seamlessly across every touchpoint.
          </p>
        </div>

        {/* 3 Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Channel 1: Web & Mobile Chat */}
          <div className="p-8 rounded-2xl bg-[#111627] border border-white/[0.08] hover:border-[#7C5CFF]/40 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 flex items-center justify-center text-[#7C5CFF] mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">Web & Mobile Chat</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Ultra-fast streaming responses, rich UI cards (order pickers, return flows), custom fonts, and zero-flicker iframe embedding.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0E1A] border border-white/[0.06] text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Speed to First Token</span>
                <span className="font-mono text-[#2EE6C5] font-bold">140ms</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Widget Bundle Size</span>
                <span className="font-mono text-white">&lt;12KB gzip</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Frameworks</span>
                <span className="text-slate-300 font-mono">React / Vue / iOS / Android</span>
              </div>
            </div>
          </div>

          {/* Channel 2: Inbound Email */}
          <div className="p-8 rounded-2xl bg-[#111627] border border-white/[0.08] hover:border-[#2EE6C5]/40 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#2EE6C5]/15 border border-[#2EE6C5]/30 flex items-center justify-center text-[#2EE6C5] mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">Inbound Support Email</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Understands long multi-paragraph customer emails with attachments. Drafts replies, executes backend actions, or auto-responds instantly.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0E1A] border border-white/[0.06] text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Threading Support</span>
                <span className="font-mono text-[#2EE6C5] font-bold">RFC-compliant</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Attachment OCR</span>
                <span className="text-white font-mono">PDF, PNG, CSV, HEIC</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Human Review Mode</span>
                <span className="text-slate-300 font-mono">Draft in Zendesk first</span>
              </div>
            </div>
          </div>

          {/* Channel 3: Conversational Voice (Beta) */}
          <div className="p-8 rounded-2xl bg-[#111627] border-2 border-[#7C5CFF]/30 hover:border-[#2EE6C5]/50 transition-all flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#7C5CFF]/15 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-signature-gradient flex items-center justify-center text-white shadow-md">
                  <Mic className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-signature-gradient text-white shadow-sm">
                  Private Beta
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold text-white mb-2">
                Sub-350ms Voice Agents
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Natural-sounding conversational phone support with interruption handling, emotion detection, and warm transfers to human telephony.
              </p>
            </div>

            {/* Interactive Audio Waveform Mockup */}
            <div className="p-4 rounded-xl bg-[#0A0E1A] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-signature-gradient text-white text-xs font-bold transition-transform active:scale-95 cursor-pointer shadow-md"
                >
                  {isPlayingVoice ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isPlayingVoice ? 'Pause Demo' : 'Listen Sample'}</span>
                </button>
                <span className="font-mono text-[10px] text-slate-400">
                  {isPlayingVoice ? 'Speaking…' : '320ms Latency'}
                </span>
              </div>

              {/* Animated Waveform Bars */}
              <div className="flex items-center justify-between gap-1 h-8 px-2 bg-[#161C30] rounded-lg">
                {[12, 24, 18, 32, 16, 28, 8, 22, 34, 18, 26, 14, 30, 20, 10, 24, 18, 28, 12, 22].map(
                  (h, idx) => (
                    <motion.div
                      key={idx}
                      className="w-1 rounded-full bg-gradient-to-t from-[#7C5CFF] to-[#2EE6C5]"
                      animate={
                        isPlayingVoice
                          ? { height: [h * 0.4, h, h * 0.4] }
                          : { height: Math.max(6, h * 0.35) }
                      }
                      transition={{
                        repeat: isPlayingVoice ? Infinity : 0,
                        duration: 0.6 + (idx % 4) * 0.2,
                        ease: 'easeInOut',
                      }}
                    />
                  )
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
