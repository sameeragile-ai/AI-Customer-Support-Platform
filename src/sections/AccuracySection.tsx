import React from 'react';
import { motion } from 'motion/react';
import { XCircle, CheckCircle, Shield, AlertTriangle, FileText, Check, Lock, Terminal, Activity } from 'lucide-react';
import { ACCURACY_COMPARISON } from '../data/mockData';

export const AccuracySection: React.FC = () => {
  return (
    <section id="accuracy" className="py-24 sm:py-32 bg-[#F7F7FB] text-[#0A0E1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 border border-slate-300 text-xs font-semibold text-slate-700 mb-4">
            <Shield className="w-3.5 h-3.5 text-[#7C5CFF]" />
            <span>Deterministic Reliability</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0E1A] tracking-tight leading-tight">
            Built to not make things up.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Customer trust is non-negotiable. Helmora is architected with multi-layered containment filters, strict RAG retrieval boundaries, and policy validation before any word is delivered.
          </p>
        </div>

        {/* Split Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Left Card: Without Guardrails */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-rose-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <span className="font-heading text-sm font-bold text-slate-900">
                    Standard LLM Chatbot
                  </span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
                  Unconstrained Hallucination
                </span>
              </div>

              {/* Inquiry Prompt */}
              <div className="mb-4">
                <span className="text-xs text-slate-400 block mb-1">Customer asks:</span>
                <div className="p-3 bg-slate-100 rounded-xl text-xs font-medium text-slate-800">
                  "{ACCURACY_COMPARISON.withoutGuardrails.userQuery}"
                </div>
              </div>

              {/* Risky Response */}
              <div className="mb-6">
                <span className="text-xs text-rose-500 block mb-1 flex items-center gap-1 font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Hallucinated Unauthorized Promise:
                </span>
                <div className="p-4 bg-rose-50/70 border border-rose-200/80 rounded-xl text-xs text-rose-900 leading-relaxed">
                  "{ACCURACY_COMPARISON.withoutGuardrails.response}"
                </div>
              </div>
            </div>

            {/* Identified Vulnerabilities */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Critical Failures:</span>
              {ACCURACY_COMPARISON.withoutGuardrails.issues.map((issue, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-rose-700">
                  <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Card: Helmora Grounded */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-[#7C5CFF]/30 shadow-xl relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#2EE6C5]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#2EE6C5]" />
                  <span className="font-heading text-sm font-bold text-slate-900">
                    Helmora Grounded Architecture
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  <span>Confidence: 97%</span>
                </div>
              </div>

              {/* Inquiry Prompt */}
              <div className="mb-4">
                <span className="text-xs text-slate-400 block mb-1">Customer asks:</span>
                <div className="p-3 bg-slate-100 rounded-xl text-xs font-medium text-slate-800">
                  "{ACCURACY_COMPARISON.withHelmora.userQuery}"
                </div>
              </div>

              {/* Grounded Response */}
              <div className="mb-4">
                <span className="text-xs text-emerald-700 block mb-1 flex items-center gap-1 font-semibold">
                  <Shield className="w-3.5 h-3.5 text-[#2EE6C5]" />
                  Verified Policy Response:
                </span>
                <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl text-xs text-slate-800 leading-relaxed space-y-2">
                  <p>{ACCURACY_COMPARISON.withHelmora.response}</p>
                  
                  {/* Verified Sources */}
                  <div className="pt-2 border-t border-emerald-200/50 flex flex-wrap gap-2 text-[10px]">
                    {ACCURACY_COMPARISON.withHelmora.sources.map((src, idx) => (
                      <span key={idx} className="bg-white px-2 py-0.5 rounded border border-emerald-300 font-mono text-emerald-800 flex items-center gap-1">
                        <FileText className="w-3 h-3 text-[#2EE6C5]" />
                        {src.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Safeguards */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Active Safeguards:</span>
              {ACCURACY_COMPARISON.withHelmora.safeguards.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-emerald-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* 5 Enterprise Safeguards Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-6">
          {[
            {
              title: 'Source-Only Retrieval',
              desc: 'Answers are strictly synthesized from retrieved doc chunks, never parametric hallucination.',
              icon: FileText,
            },
            {
              title: 'Confidence Gates',
              desc: 'Scores below 92% immediately prompt "I am not sure" and hand off to human support.',
              icon: Activity,
            },
            {
              title: 'Policy Validation',
              desc: 'Commercial rules prevent unauthorized discounts, refunds, or SLA commitments.',
              icon: Lock,
            },
            {
              title: 'Regression Suites',
              desc: 'Hundreds of evaluation unit tests run automatically before every knowledge update.',
              icon: Terminal,
            },
            {
              title: 'Immutable Audit Trail',
              desc: 'Every single generated word is tracked with raw document vectors and confidence logs.',
              icon: Shield,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#7C5CFF] mb-3">
                  <item.icon className="w-4 h-4" />
                </div>
                <h4 className="font-heading text-xs font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-[11px] text-slate-600 leading-normal">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
