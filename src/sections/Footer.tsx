import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Check, Github, Twitter, Linkedin } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useCart();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    addToast('Subscribed!', 'You will receive our bi-weekly AI Support Architecture newsletter.', 'success');
  };

  return (
    <footer className="bg-[#070A12] border-t border-white/[0.08] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">
          
          {/* Brand & Newsletter (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-8 h-8">
                <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="footer-h-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7C5CFF" />
                      <stop offset="100%" stopColor="#2EE6C5" />
                    </linearGradient>
                  </defs>
                  <rect x="5" y="4" width="5.5" height="28" rx="2.75" fill="url(#footer-h-grad)" />
                  <rect x="25.5" y="4" width="5.5" height="28" rx="2.75" fill="url(#footer-h-grad)" />
                  <rect x="9" y="15" width="18" height="6" rx="3" fill="url(#footer-h-grad)" />
                </svg>
              </div>
              <span className="font-heading text-xl font-extrabold text-white tracking-tight">
                Helmora
              </span>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Support that actually knows your business. Powered by grounded RAG, live API execution, and deterministic human handoffs.
            </p>

            {/* Newsletter Input */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                Join 14,000+ support leaders
              </span>
              {subscribed ? (
                <div className="flex items-center gap-1.5 text-xs text-[#2EE6C5]">
                  <Check className="w-4 h-4" />
                  <span>Subscribed to Engineering Dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-xs">
                  <input
                    type="email"
                    required
                    placeholder="Engineering newsletter…"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-[#111627] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C5CFF] flex-1"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-white/[0.08] hover:bg-white/[0.14] text-white rounded-xl transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <span className="font-heading text-xs font-bold text-white uppercase tracking-wider block mb-4">
              Product
            </span>
            <ul className="space-y-2.5">
              <li><a href="#product" className="hover:text-white transition-colors">Intent Engine</a></li>
              <li><a href="#accuracy" className="hover:text-white transition-colors">Guardrails & RAG</a></li>
              <li><a href="#product" className="hover:text-white transition-colors">API Actions</a></li>
              <li><a href="#channels" className="hover:text-white transition-colors">Voice Agents (Beta)</a></li>
              <li><a href="#dashboard" className="hover:text-white transition-colors">Analytics Console</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing & Add-ons</a></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <span className="font-heading text-xs font-bold text-white uppercase tracking-wider block mb-4">
              Solutions
            </span>
            <ul className="space-y-2.5">
              <li><a href="#integrations" className="hover:text-white transition-colors">E-Commerce & Shopify</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Fintech & Banking</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">B2B SaaS Helpdesks</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Healthcare & HIPAA</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Global 24/7 Operations</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <span className="font-heading text-xs font-bold text-white uppercase tracking-wider block mb-4">
              Resources
            </span>
            <ul className="space-y-2.5">
              <li><a href="#faq" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#accuracy" className="hover:text-white transition-colors">Hallucination Benchmarks</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Security Whitepaper</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Changelog v2.4</a></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <span className="font-heading text-xs font-bold text-white uppercase tracking-wider block mb-4">
              Company
            </span>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers (We're hiring)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trust Center</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip: Compliance & Copyright */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <span>© 2026 Helmora Technologies Inc. All rights reserved.</span>
            <span>·</span>
            <div className="flex items-center gap-1 text-[#2EE6C5]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SOC 2 Type II Certified · GDPR Ready</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
              aria-label="Helmora on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
              aria-label="Helmora on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
              aria-label="Helmora on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
