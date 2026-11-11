import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  activeSection: string;
}

const NAV_LINKS = [
  { name: 'Product', href: '#product' },
  { name: 'How it works', href: '#how-it-works' },
  { name: 'Integrations', href: '#integrations' },
  { name: 'Accuracy', href: '#accuracy' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items, setIsCartOpen, setIsDemoModalOpen } = useCart();

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Monitor scroll for frosted glass transition and progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          isScrolled
            ? 'h-[68px] bg-[#0A0E1A]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]'
            : 'h-[88px] bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo Zone */}
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF] rounded-lg p-1"
          >
            <div
              className={`transition-all duration-300 flex items-center justify-center ${
                isScrolled ? 'w-8 h-8' : 'w-9 h-9'
              }`}
            >
              <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-[0_0_12px_rgba(124,92,255,0.4)]">
                <defs>
                  <linearGradient id="nav-h-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C5CFF" />
                    <stop offset="100%" stopColor="#2EE6C5" />
                  </linearGradient>
                </defs>
                <rect x="5" y="4" width="5.5" height="28" rx="2.75" fill="url(#nav-h-grad)" />
                <rect x="25.5" y="4" width="5.5" height="28" rx="2.75" fill="url(#nav-h-grad)" />
                <rect x="9" y="15" width="18" height="6" rx="3" fill="url(#nav-h-grad)" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-heading font-extrabold tracking-tight text-white transition-all duration-300 ${
                  isScrolled ? 'text-xl' : 'text-2xl'
                }`}
              >
                Helmora
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 relative px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors whitespace-nowrap z-10 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-white/[0.08] border border-white/[0.12] rounded-full -z-10 shadow-inner"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Zone */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Sign in ghost button */}
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Sign in
            </button>

            {/* Cart Button with animated count badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-slate-300 hover:text-white rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"
              aria-label={`Open cart, ${totalItemsCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemsCount > 0 && (
                <motion.span
                  key={totalItemsCount}
                  initial={{ scale: 0.6, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-r from-[#7C5CFF] to-[#2EE6C5] rounded-full shadow-md"
                >
                  {totalItemsCount}
                </motion.span>
              )}
            </button>

            {/* Book a Demo primary button */}
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold text-white bg-signature-gradient shadow-[0_0_20px_-3px_rgba(124,92,255,0.45)] hover:shadow-[0_0_28px_rgba(46,230,197,0.5)] transition-all duration-300 cursor-pointer active:scale-95"
            >
              <div className="relative z-10 flex items-center gap-1.5">
                <span>Book a demo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
              {/* Shimmer sweep overlay */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer-sweep bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-300 hover:text-white rounded-xl bg-white/[0.05] border border-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#2EE6C5]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 2px Gradient scroll-progress line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.05] overflow-hidden">
          <div
            className="h-full bg-signature-gradient transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 pt-[88px] px-6 pb-8 bg-[#0A0E1A]/95 backdrop-blur-2xl flex flex-col justify-between lg:hidden border-b border-white/[0.08]"
          >
            {/* Ambient background glow */}
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-[#7C5CFF]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Staggered Navigation Links */}
            <nav className="flex flex-col gap-2 pt-4">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.2 }}
                  className="flex items-center justify-between py-3.5 px-4 rounded-xl text-base font-medium text-slate-200 hover:text-white hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] transition-all"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </motion.a>
              ))}
            </nav>

            {/* Mobile Menu Bottom CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col gap-3 pt-6 border-t border-white/[0.08]"
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.05] border border-white/[0.08] flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Cart ({totalItemsCount} items)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsDemoModalOpen(true);
                }}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-signature-gradient shadow-[0_0_25px_rgba(124,92,255,0.4)] flex items-center justify-center gap-2"
              >
                <span>Book a 15-min Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
