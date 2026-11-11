import React from 'react';
import { INTEGRATIONS } from '../data/mockData';
import { 
  Ticket, Layers, Hash, MessageSquare, ShoppingBag, Cloud, 
  LifeBuoy, FileText, Folder, BookOpen, CreditCard, Mail 
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Ticket,
  Layers,
  Hash,
  MessageSquare,
  ShoppingBag,
  Cloud,
  LifeBuoy,
  FileText,
  Folder,
  BookOpen,
  CreditCard,
  Mail,
};

export const IntegrationsMarquee: React.FC = () => {
  // Double the array for seamless infinite marquee loop
  const marqueeItems = [...INTEGRATIONS, ...INTEGRATIONS];

  return (
    <section id="integrations" className="py-14 border-y border-white/[0.06] bg-[#0A0E1A]/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
          Native bidirectional sync with your existing tools & helpdesks
        </p>
      </div>

      {/* Marquee Track with gradient fade edges */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-4 sm:gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
          {marqueeItems.map((item, index) => {
            const Icon = ICON_MAP[item.logo] || Layers;
            return (
              <div
                key={`${item.name}-${index}`}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#111627] border border-white/[0.08] hover:border-white/[0.2] transition-colors group cursor-default select-none shadow-sm"
              >
                <div className="w-6 h-6 rounded-lg bg-white/[0.05] group-hover:bg-[#7C5CFF]/20 flex items-center justify-center text-slate-300 group-hover:text-[#2EE6C5] transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-xs font-bold text-white tracking-tight">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono leading-none">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
      `}</style>
    </section>
  );
};
