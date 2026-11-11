import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data/mockData';
import { ChevronLeft, ChevronRight, Quote, Star, ArrowUpRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 6 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 sm:py-32 relative bg-[#0A0E1A] overflow-hidden border-t border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#7C5CFF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono font-semibold text-[#2EE6C5] uppercase tracking-wider">
              Customer Outcomes
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Trusted by support leaders across tech.
            </h2>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-white transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="font-mono text-xs text-slate-400">
              <span className="text-white font-bold">{currentIndex + 1}</span> / {TESTIMONIALS.length}
            </div>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-white transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Card Stage */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative min-h-[320px] sm:min-h-[280px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="p-8 sm:p-12 rounded-2xl bg-[#111627] border border-white/[0.08] shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Quote & Author (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex text-[#FF7A59]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-lg sm:text-2xl text-slate-100 font-medium leading-relaxed italic">
                  "{current.quote}"
                </p>

                <div className="flex items-center gap-3.5 pt-2">
                  <img
                    src={current.avatarUrl}
                    alt={current.author}
                    loading="lazy"
                    className="w-12 h-12 rounded-full border-2 border-[#7C5CFF]/40 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"%3E%3Ccircle cx="16" cy="16" r="16" fill="%237C5CFF"/%3E%3C/svg%3E';
                    }}
                  />
                  <div>
                    <h4 className="font-heading text-base font-bold text-white">
                      {current.author}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {current.role} · <span className="text-white font-medium">{current.company}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Metric Badge (4 cols) */}
              <div className="lg:col-span-4 p-6 sm:p-8 rounded-xl bg-[#161C30] border border-white/[0.06] text-center flex flex-col items-center justify-center">
                <span className="font-mono text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7C5CFF] to-[#2EE6C5] tracking-tight tabular-nums">
                  {current.metric}
                </span>
                <span className="text-xs font-semibold text-slate-300 mt-2 uppercase tracking-wider">
                  {current.metricLabel}
                </span>
                <span className="text-[11px] text-slate-400 mt-1">
                  Verified enterprise production benchmark
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? 'w-8 bg-signature-gradient' : 'w-2 bg-white/20'
              }`}
              aria-label={`Jump to testimonial ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
