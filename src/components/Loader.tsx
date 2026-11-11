import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Quick, smooth counting up to 100% in ~1.4s
    const startTime = performance.now();
    const duration = 1400; // ms

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 600); // Trigger completion as curtain slides up
        }, 150);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="helmora-loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0E1A] text-white"
        >
          {/* Subtle radial glow in background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(124,92,255,0.18)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative flex flex-col items-center gap-6">
            {/* Geometric "H" Logomark */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
                <defs>
                  <linearGradient id="loader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C5CFF" />
                    <stop offset="100%" stopColor="#2EE6C5" />
                  </linearGradient>
                </defs>

                {/* Left vertical bar */}
                <motion.rect
                  x="18"
                  y="12"
                  width="11"
                  height="56"
                  rx="5.5"
                  fill="url(#loader-grad)"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ transformOrigin: 'top' }}
                />

                {/* Right vertical bar */}
                <motion.rect
                  x="51"
                  y="12"
                  width="11"
                  height="56"
                  rx="5.5"
                  fill="url(#loader-grad)"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                  style={{ transformOrigin: 'bottom' }}
                />

                {/* Connecting cross bar */}
                <motion.rect
                  x="26"
                  y="34"
                  width="28"
                  height="12"
                  rx="6"
                  fill="url(#loader-grad)"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.45, delay: 0.35, ease: 'easeOut' }}
                  style={{ transformOrigin: 'center' }}
                />
              </svg>
            </div>

            {/* Brand title & subtext */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                Helmora
              </span>
              <p className="text-xs text-slate-400 mt-1 font-medium tracking-wide">
                Grounding knowledge models…
              </p>
            </motion.div>

            {/* Thin gradient progress bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-2 relative">
              <motion.div
                className="h-full bg-signature-gradient rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Counting percentage */}
            <div className="text-xs font-mono font-medium text-slate-400 tabular-nums">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
