import React, { useState, useEffect, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Studio from './components/Studio';
import Catalog from './components/Catalog';
import Estimator from './components/Estimator';
import WhyUs from './components/WhyUs';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { CATALOG_ITEMS, DEFAULT_PRICING_RULES } from './data';
import { CustomDesign, ProductType, EstimateResult } from './types';
import { motion } from 'motion/react';
import { Settings } from 'lucide-react';

const AdminEditor = React.lazy(() => import('./components/AdminEditor'));

const defaultHero = {
  headline: "High-Speed Commercial Apparel Print & Packaging",
  description: "We operate advanced offset, flexographic, and rotary printing presses in Faisalabad. From luxury textured hang tags, rigid gift packages, and barcode systems, to premium woven brand labels—crafted through partner mills and fully guaranteed by us—we run long-run branding specs under tight quality checks.",
  subtext: "PAKISTAN'S ELITE PRINTING PRESS HUB • FAISALABAD",
  images: [
    "https://images.unsplash.com/photo-1698932646779-916299619ad2?fm=jpg&q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603252109303-2751441dd157?fm=jpg&q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1656543802898-41c8c46683a7?fm=jpg&q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616400619175-5ebd300900cf?fm=jpg&q=80&w=400&auto=format&fit=crop"
  ]
};

const defaultContact = {
  address: "Eid Gah Road, Faisalabad, Punjab, Pakistan",
  phone: "0302-7000073",
  email: "info@printvisionpk.com",
  whatsapp: "923027000073"
};

const defaultPricingRules = DEFAULT_PRICING_RULES;

const defaultWhyUs = {
  badge: "The Print Vision Calibration",
  title: "Engineered For Elite Apparel Brands",
  description: "We do not just manufacture standard paper tags. We build precision brand assets. Rooted in Faisalabad, Print Vision utilizes modern, state-of-the-art print machinery to run perfect identity plates for Pakistan's leading fashion exporters.",
  advantages: [
    {
      title: "Spectrophotometer Color Alignment",
      description: "Print Vision implements automated colorimeter-guided offset plate checks to align label print colors with your fabric base. We prioritize high-grade consistency across all production batches."
    },
    {
      title: "Faisalabad Direct High-Speed Hub",
      description: "Based in the heart of Pakistan's textile capital. We synchronize print plate runs with your knitting schedules to eliminate downtime—ensuring premium Swings and Labels arrive before packaging begins."
    },
    {
      title: "Premium Multi-Tactile Tooling",
      description: "Expand your brand's touchpoints. We specialize in velvet-soft matte lamination, high-build Spot UV finishes, micro-embossed textured cardboards, and real hot-stamped gold foil trims."
    },
    {
      title: "Sustainably-Sourced Premium Dye Integrity",
      description: "Our printing processes use high-density, hypoallergenic inks and yarns. Fully resistant to washing friction and rigorous commercial laundry cycles, keeping tags and labels looking crisp."
    }
  ]
};

export default function App() {
  const [activeDesign, setActiveDesign] = useState<CustomDesign | null>(null);
  const [activeEstimate, setActiveEstimate] = useState<{ type: ProductType; quantity: number; costBreakdown: EstimateResult } | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Editable dynamic configurations
  const [siteConfig, setSiteConfig] = useState(() => {
    const savedHero = localStorage.getItem('printvision_hero_config');
    const savedCatalog = localStorage.getItem('printvision_catalog_config');
    const savedContact = localStorage.getItem('printvision_contact_config');
    const savedPricingRules = localStorage.getItem('printvision_pricing_rules');
    const savedWhyUs = localStorage.getItem('printvision_whyus_config');

    let finalCatalog = CATALOG_ITEMS;
    if (savedCatalog) {
      try {
        const parsed = JSON.parse(savedCatalog);
        const hasStaleItems = parsed.some((item: any) => item.id === 'insert-cards-1' || item.type === 'insert-cards');
        if (!hasStaleItems && parsed.length > 0) {
          finalCatalog = parsed;
        } else {
          localStorage.removeItem('printvision_catalog_config');
        }
      } catch (e) {
        // Fall back to clean default items
      }
    }

    return {
      hero: savedHero ? JSON.parse(savedHero) : defaultHero,
      catalogItems: finalCatalog,
      contact: savedContact ? JSON.parse(savedContact) : defaultContact,
      pricingRules: savedPricingRules ? JSON.parse(savedPricingRules) : defaultPricingRules,
      whyUsConfig: savedWhyUs ? JSON.parse(savedWhyUs) : defaultWhyUs
    };
  });

  // Load configuration from server-side database on mount
  useEffect(() => {
    fetch('/api/config')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Failed to load server site config');
      })
      .then((data) => {
        if (data && data.hero) {
          setSiteConfig(data);
          // Sync client-side backup cache
          localStorage.setItem('printvision_hero_config', JSON.stringify(data.hero));
          localStorage.setItem('printvision_catalog_config', JSON.stringify(data.catalogItems));
          localStorage.setItem('printvision_contact_config', JSON.stringify(data.contact));
          localStorage.setItem('printvision_pricing_rules', JSON.stringify(data.pricingRules));
          localStorage.setItem('printvision_whyus_config', JSON.stringify(data.whyUsConfig));
        }
      })
      .catch((err) => console.error('Site configuration load error:', err));
  }, []);

  const handleUpdateConfig = (newConfig: typeof siteConfig) => {
    setSiteConfig(newConfig);
    localStorage.setItem('printvision_hero_config', JSON.stringify(newConfig.hero));
    localStorage.setItem('printvision_catalog_config', JSON.stringify(newConfig.catalogItems));
    localStorage.setItem('printvision_contact_config', JSON.stringify(newConfig.contact));
    localStorage.setItem('printvision_pricing_rules', JSON.stringify(newConfig.pricingRules));
    localStorage.setItem('printvision_whyus_config', JSON.stringify(newConfig.whyUsConfig));

    const token = localStorage.getItem('pv_admin_token') || '';
    fetch('/api/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newConfig)
    })
      .then((res) => {
        if (!res.ok) console.error('Failed to save config to server storage');
      })
      .catch((err) => console.error('Save config server error:', err));
  };

  const handleResetConfig = () => {
    localStorage.removeItem('printvision_hero_config');
    localStorage.removeItem('printvision_catalog_config');
    localStorage.removeItem('printvision_contact_config');
    localStorage.removeItem('printvision_pricing_rules');
    localStorage.removeItem('printvision_whyus_config');
    
    const defaultConfig = {
      hero: defaultHero,
      catalogItems: CATALOG_ITEMS,
      contact: defaultContact,
      pricingRules: defaultPricingRules,
      whyUsConfig: defaultWhyUs
    };
    
    setSiteConfig(defaultConfig);

    const token = localStorage.getItem('pv_admin_token') || '';
    fetch('/api/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(defaultConfig)
    })
      .then((res) => {
        if (!res.ok) console.error('Failed to reset config on server storage');
      })
      .catch((err) => console.error('Reset config server error:', err));
  };

  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'admin') {
      setIsAdminOpen(true);
      return;
    }
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of our fixed frosted-glass navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleDesignFromStudio = (design: CustomDesign) => {
    setActiveDesign(design);
    setActiveEstimate(null); // Clear any estimate so the form focus is on the design spec
    handleScrollToSection('contact');
  };

  const handleEstimateFromCalculator = (est: { type: ProductType; quantity: number; costBreakdown: EstimateResult }) => {
    setActiveEstimate(est);
    setActiveDesign(null); // Clear design spec so the form focus is on invoice breakdown
    handleScrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-white text-[#171B54] font-sans antialiased">
      
      {/* Premium sticky header bar with dynamic contact phone */}
      <Header onScrollToSection={handleScrollToSection} phone={siteConfig.contact.phone} />

      {/* Main visual elements */}
      <main>
        
        {/* Animated Hero layout with dynamic editable texts and images */}
        <Hero 
          onScrollToSection={handleScrollToSection} 
          headline={siteConfig.hero.headline}
          description={siteConfig.hero.description}
          subtext={siteConfig.hero.subtext}
          images={siteConfig.hero.images}
        />

        {/* Dynamic Studio layout */}
        <Studio onDesignSubmit={handleDesignFromStudio} />

        {/* Digital product catalog specs with dynamic editable catalog items */}
        <Catalog catalogItems={siteConfig.catalogItems} />

        {/* Volume & Cost estimator sliderboard */}
        <Estimator onEstimateSelect={handleEstimateFromCalculator} pricingRules={siteConfig.pricingRules} />

        {/* Strategic quality advantages cards */}
        <WhyUs whyUsConfig={siteConfig.whyUsConfig} />

        {/* Procurement & Specs Contact Form */}
        <ContactForm 
          prefilledEstimate={activeEstimate}
          prefilledDesign={activeDesign}
        />

      </main>

      {/* Premium detailed footer board with dynamic contact details */}
      <Footer onScrollToSection={handleScrollToSection} contact={siteConfig.contact} />

      {/* Floating dynamic WhatsApp anchor */}
      <motion.a 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={`https://wa.me/${siteConfig.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Procurement Hotline"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-[#171B54] via-[#E31E2B] to-[#F5A623] flex items-center justify-center text-white shadow-2xl border border-white/20 cursor-pointer"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.741-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.832.002-2.627-1.013-5.097-2.859-6.944C16.632 1.982 14.18 1.1 11.997 1.1 6.562 1.1 2.138 5.513 2.135 10.934c-.001 1.705.502 3.371 1.455 4.829l-.261.954-.863 3.149 3.243-.849.938-.309zm11.233-5.247c-.296-.149-1.755-.865-2.027-.964-.271-.099-.468-.149-.665.149-.197.297-.764.964-.937 1.162-.173.199-.346.223-.642.075-.296-.15-1.255-.462-2.39-1.497-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.444-.52.149-.174.198-.298.296-.497.099-.198.05-.371-.025-.52-.075-.149-.665-1.602-.912-2.095-.24-.579-.48-.5-.665-.525-.172-.023-.37-.023-.567-.023-.197 0-.518.074-.789.371-.271.297-1.036 1.014-1.036 2.475 0 1.457 1.061 2.871 1.209 3.07.149.198 2.09 3.19 5.064 4.478.708.306 1.26.489 1.69.626.711.226 1.358.194 1.87.111.571-.094 1.756-.717 2.003-1.409.246-.693.246-1.286.173-1.409-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </motion.a>

      {/* Interactive Admin Editor Sidebar */}
      {isAdminOpen && (
        <Suspense fallback={null}>
          <AdminEditor
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            siteConfig={siteConfig}
            onUpdate={handleUpdateConfig}
            onReset={handleResetConfig}
          />
        </Suspense>
      )}

    </div>
  );
}
