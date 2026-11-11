import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { DemoModal } from './components/DemoModal';
import { ToastContainer } from './components/Toast';
import { BackToTop } from './components/BackToTop';

import { HeroSection } from './sections/HeroSection';
import { IntegrationsMarquee } from './sections/IntegrationsMarquee';
import { BentoFeatures } from './sections/BentoFeatures';
import { HowItWorks } from './sections/HowItWorks';
import { AccuracySection } from './sections/AccuracySection';
import { DashboardPreview } from './sections/DashboardPreview';
import { ChannelsSection } from './sections/ChannelsSection';
import { PricingSection } from './sections/PricingSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { FAQSection } from './sections/FAQSection';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './sections/Footer';

export default function App() {
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [activeSection, setActiveSection] = useState('product');

  // Track active section for Navbar pill highlighting
  useEffect(() => {
    const sectionIds = ['product', 'how-it-works', 'integrations', 'accuracy', 'pricing', 'faq'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45 && rect.bottom >= 0) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0A0E1A] text-slate-100 flex flex-col font-sans selection:bg-[#7C5CFF]/30 selection:text-white">
        
        {/* Full-screen Branded Loader */}
        <Loader onComplete={() => setLoaderFinished(true)} />

        {/* Top Navbar */}
        <Navbar activeSection={activeSection} />

        {/* Main Content Layout */}
        <main className={`flex-1 transition-opacity duration-700 ${loaderFinished ? 'opacity-100' : 'opacity-90'}`}>
          <HeroSection />
          <IntegrationsMarquee />
          <BentoFeatures />
          <HowItWorks />
          <AccuracySection />
          <DashboardPreview />
          <ChannelsSection />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <FinalCTA />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Overlays, Drawers & Modals */}
        <CartDrawer />
        <CheckoutModal />
        <DemoModal />
        <ToastContainer />
        <BackToTop />

      </div>
    </CartProvider>
  );
}
