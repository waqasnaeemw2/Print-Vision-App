import React from 'react';
import { ArrowRight, Sparkles, CheckCircle, Printer } from 'lucide-react';
import { motion } from 'motion/react';
import SmartImage from './SmartImage';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  headline?: string;
  description?: string;
  subtext?: string;
  images?: string[];
}

// Sophisticated animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
};

const subtextVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14
    }
  }
};

const headlineVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 65,
      damping: 15,
      mass: 1.1
    }
  }
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 16
    }
  }
};

const actionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15
    }
  }
};

const capabilityVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 14,
      staggerChildren: 0.12,
      delayChildren: 0.55
    }
  }
};

const capabilityItemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 12
    }
  }
};

// CMYK plate mark variants
const cmykPlateVariants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -180 },
  visible: (custom: number) => ({
    opacity: 0.15,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14,
      delay: custom * 0.12
    }
  })
};

// Elastic paper drop physics for textile brand assets
const card1Variants = {
  hidden: { opacity: 0, x: -90, y: -70, rotate: -30, scale: 0.75 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: -8,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 65,
      damping: 14,
      delay: 0.35
    }
  }
};

const card2Variants = {
  hidden: { opacity: 0, x: 90, y: -60, rotate: 30, scale: 0.75 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 6,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 65,
      damping: 14,
      delay: 0.45
    }
  }
};

const card3Variants = {
  hidden: { opacity: 0, x: -80, y: 80, rotate: -25, scale: 0.75 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: -4,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
      delay: 0.55
    }
  }
};

const card4Variants = {
  hidden: { opacity: 0, x: 80, y: 80, rotate: 25, scale: 0.75 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 8,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
      delay: 0.65
    }
  }
};

export default function Hero({ 
  onScrollToSection,
  headline = "High-Speed Commercial Apparel Print & Packaging",
  description = "We operate advanced offset, flexographic, and rotary printing presses in Faisalabad. From luxury textured hang tags, rigid gift packages, and barcode systems, to premium woven brand labels—crafted through partner mills and fully guaranteed by us—we run long-run branding specs under tight quality checks.",
  subtext = "PAKISTAN'S ELITE PRINTING PRESS HUB • FAISALABAD",
  images = [
    "https://images.unsplash.com/photo-1698932646779-916299619ad2?fm=jpg&q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1603252109303-2751441dd157?fm=jpg&q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1656543802898-41c8c46683a7?fm=jpg&q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616400619175-5ebd300900cf?fm=jpg&q=80&w=400&auto=format&fit=crop"
  ]
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F6FB] via-white to-white pt-10 pb-24 lg:pt-16 lg:pb-32">
      {/* Absolute luxury background swirly grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#171B54_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
      
      {/* Decorative CMYK Plate Marks in Background */}
      <div className="absolute top-12 right-12 z-0 pointer-events-none hidden xl:flex gap-4">
        <motion.div custom={1} variants={cmykPlateVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#00FFFF] animate-spin-slow flex items-center justify-center">
            <span className="text-[8px] font-mono font-bold text-[#00FFFF]">C</span>
          </div>
          <span className="text-[7px] font-mono mt-1 text-[#00FFFF]">CYAN PLATE</span>
        </motion.div>
        
        <motion.div custom={2} variants={cmykPlateVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#FF00FF] animate-spin-slow flex items-center justify-center">
            <span className="text-[8px] font-mono font-bold text-[#FF00FF]">M</span>
          </div>
          <span className="text-[7px] font-mono mt-1 text-[#FF00FF]">MAGENTA</span>
        </motion.div>
        
        <motion.div custom={3} variants={cmykPlateVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#FFFF00] animate-spin-slow flex items-center justify-center">
            <span className="text-[8px] font-mono font-bold text-[#FFFF00]">Y</span>
          </div>
          <span className="text-[7px] font-mono mt-1 text-[#FFFF00]">YELLOW</span>
        </motion.div>
        
        <motion.div custom={4} variants={cmykPlateVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#111B47] animate-spin-slow flex items-center justify-center">
            <span className="text-[8px] font-mono font-bold text-[#111B47]">K</span>
          </div>
          <span className="text-[7px] font-mono mt-1 text-[#111B47]">BLACK</span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Copy (6 Cols for a balanced grid and layout precision) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col items-start text-left lg:pr-6"
          >
            {/* Elegant luxury chip */}
            <motion.div 
              variants={subtextVariants}
              className="inline-flex items-center gap-2 bg-[#171B54]/5 text-[#171B54] border border-[#171B54]/10 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-wider uppercase mb-5"
            >
              <Sparkles size={12} className="text-[#F5A623] animate-pulse" />
              {subtext}
            </motion.div>

            {/* Main Display Heading */}
            <div className="overflow-hidden py-1">
              <motion.h1 
                variants={headlineVariants}
                className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-[3.75rem] text-[#171B54] tracking-tighter leading-[1.05]"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#171B54] via-[#E31E2B] to-[#F5A623]">
                  {headline}
                </span>
              </motion.h1>
            </div>

            {/* Description Lede */}
            <motion.p 
              variants={descriptionVariants}
              className="mt-5 font-sans text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xl text-left font-medium"
            >
              {description}
            </motion.p>

            {/* Call to Actions */}
            <motion.div 
              variants={actionVariants}
              className="mt-8 flex flex-row items-center gap-2.5 sm:gap-4 w-full sm:w-auto"
            >
              <motion.button 
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onScrollToSection('studio')}
                className="group flex items-center justify-center gap-1.5 sm:gap-2.5 bg-[#171B54] hover:bg-[#E31E2B] text-white font-sans font-extrabold text-xs sm:text-sm md:text-base px-3.5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap flex-1 sm:flex-initial"
              >
                Launch Customizer Studio
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 shrink-0 hidden min-[380px]:inline" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.03, backgroundColor: "rgba(23, 27, 84, 0.05)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onScrollToSection('estimator')}
                className="font-sans font-extrabold text-xs sm:text-sm md:text-base text-[#171B54] border border-[#171B54]/25 hover:border-[#171B54] rounded-full px-3.5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 transition-all cursor-pointer whitespace-nowrap flex-1 sm:flex-initial text-center bg-white/50 backdrop-blur-sm"
              >
                Interactive Cost Estimator
              </motion.button>
            </motion.div>

            {/* Quick Micro-Capabilities */}
            <motion.div 
              variants={capabilityVariants}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-200/80 pt-6 w-full max-w-lg"
            >
              <motion.div variants={capabilityItemVariants} className="flex items-start gap-2.5">
                <Printer size={18} className="text-[#E31E2B] mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-xs text-[#171B54]">High-Speed Offset Presses</span>
                  <span className="font-sans text-[11px] text-gray-500">Heidelberg accuracy with 600 DPI dot alignment</span>
                </div>
              </motion.div>
              
              <motion.div variants={capabilityItemVariants} className="flex items-start gap-2.5">
                <CheckCircle size={18} className="text-[#F5A623] mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-xs text-[#171B54]">Double-Sided Premium Foil Trims</span>
                  <span className="font-sans text-[11px] text-gray-500">Spot-UV, gold-foil stamping, and velvety cardstocks</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero Visual Showcase (6 Cols - Larger, more immersive grid) */}
          <div className="lg:col-span-6 w-full flex items-center justify-center select-none overflow-visible">
            
            <div className="relative w-[360px] sm:w-[460px] h-[520px] sm:h-[600px] flex items-center justify-center">
              
              {/* Visual background circle swirl with high-quality loading spin-up */}
              <motion.div 
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] rounded-full bg-gradient-to-tr from-[#171B54]/5 via-[#E31E2B]/5 to-[#F5A623]/10 -z-10 animate-spin-slow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              ></motion.div>

              {/* Micro Badge: Active Print Press Status */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.7 }}
                className="absolute top-0 right-2 sm:right-6 z-30 bg-white/95 backdrop-blur shadow-xl rounded-xl p-2.5 border border-gray-100 flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-[#171B54] flex items-center justify-center text-white">
                  <Printer size={16} className="animate-pulse" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-sans font-bold text-[10px] text-[#171B54] uppercase tracking-wide">FSD Press Active</span>
                  <span className="font-mono text-[8px] text-emerald-500 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block"></span>
                    99.8% COLOR MATCH
                  </span>
                </div>
              </motion.div>

              {/* Custom laser sweep alignment bar overlay (UI/UFX) */}
              <div className="absolute top-8 bottom-8 left-4 right-4 border border-dashed border-[#E31E2B]/10 rounded-3xl pointer-events-none -z-10">
                {/* Vertical glint sweep */}
                <motion.div 
                  animate={{ y: ['0%', '100%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                  className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#E31E2B]/50 to-transparent shadow-[0_0_12px_rgba(227,30,43,0.8)]"
                />
              </div>

              {/* -------------------- 4 COLLAGE PRODUCTS VISUALS (With elastic tilted positions) -------------------- */}

              {/* VISUAL 1: Premium FSC Art-Card Hang Tag */}
              <motion.div 
                variants={card1Variants}
                initial="hidden"
                animate="visible"
                whileHover={{ rotate: -2, scale: 1.05, zIndex: 40 }}
                className="absolute w-[155px] sm:w-[190px] h-[210px] sm:h-[250px] top-4 sm:top-6 left-2 sm:left-4 rounded-2xl overflow-hidden border-[4px] border-white shadow-lg z-10 hover:shadow-2xl transition-all duration-300 group flex items-stretch cursor-pointer bg-white"
              >
                <div className="relative w-full h-full flex flex-col p-2">
                  <div className="flex-1 rounded-xl overflow-hidden relative border border-gray-100">
                    <SmartImage 
                      src={images[0]} 
                      alt="Premium Garment Swing Tag" 
                      productType="hang-tags"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-1.5 sm:mt-2 flex flex-col text-left px-1 shrink-0">
                    <span className="font-sans font-extrabold text-[9px] sm:text-[11px] text-[#171B54] uppercase tracking-wide">Hang Tags</span>
                    <span className="font-mono text-[7px] sm:text-[8px] text-gray-500">SPEC: FSC 600GSM</span>
                  </div>
                </div>
              </motion.div>

              {/* VISUAL 2: Partner-Woven Soft Collar Brand Label */}
              <motion.div 
                variants={card2Variants}
                initial="hidden"
                animate="visible"
                whileHover={{ rotate: 1, scale: 1.05, zIndex: 40 }}
                className="absolute w-[155px] sm:w-[190px] h-[210px] sm:h-[250px] top-16 sm:top-20 right-2 sm:right-4 rounded-2xl overflow-hidden border-[4px] border-white shadow-lg z-20 hover:shadow-2xl transition-all duration-300 group flex items-stretch cursor-pointer bg-white"
              >
                <div className="relative w-full h-full flex flex-col p-2">
                  <div className="flex-1 rounded-xl overflow-hidden relative border border-gray-100">
                    <SmartImage 
                      src={images[1]} 
                      alt="Fine woven brand label inside collar" 
                      productType="woven-labels"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-1.5 sm:mt-2 flex flex-col text-left px-1 shrink-0">
                    <span className="font-sans font-extrabold text-[9px] sm:text-[11px] text-[#E31E2B] uppercase tracking-wide">Woven Labels</span>
                    <span className="font-mono text-[7px] sm:text-[8px] text-gray-500">100% QUALITY ASSURED</span>
                  </div>
                </div>
              </motion.div>

              {/* VISUAL 3: Luxury Custom Rigid Cardboard Packaging Box */}
              <motion.div 
                variants={card3Variants}
                initial="hidden"
                animate="visible"
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 40 }}
                className="absolute w-[155px] sm:w-[190px] h-[210px] sm:h-[250px] bottom-16 sm:bottom-12 left-2 sm:left-4 rounded-2xl overflow-hidden border-[4px] border-white shadow-xl z-25 hover:shadow-2xl transition-all duration-300 group flex items-stretch cursor-pointer bg-white"
              >
                <div className="relative w-full h-full flex flex-col p-2">
                  <div className="flex-1 rounded-xl overflow-hidden relative border border-gray-100">
                    <SmartImage 
                      src={images[2]} 
                      alt="Luxury Rigid Cardboard Box" 
                      productType="packaging-boxes"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-1.5 sm:mt-2 flex flex-col text-left px-1 shrink-0">
                    <span className="font-sans font-extrabold text-[9px] sm:text-[11px] text-[#F5A623] uppercase tracking-wide">Rigid Packaging</span>
                    <span className="font-mono text-[7px] sm:text-[8px] text-gray-500">PREMIUM RIGID BOX</span>
                  </div>
                </div>
              </motion.div>

              {/* VISUAL 4: Precision Thermal Barcoding Sticker */}
              <motion.div 
                variants={card4Variants}
                initial="hidden"
                animate="visible"
                whileHover={{ rotate: 2, scale: 1.05, zIndex: 40 }}
                className="absolute w-[155px] sm:w-[190px] h-[210px] sm:h-[250px] bottom-4 sm:bottom-4 right-2 sm:right-4 rounded-2xl overflow-hidden border-[4px] border-white shadow-lg z-30 hover:shadow-2xl transition-all duration-300 group flex items-stretch cursor-pointer bg-white"
              >
                <div className="relative w-full h-full flex flex-col p-2">
                  <div className="flex-1 rounded-xl overflow-hidden relative border border-gray-100">
                    <SmartImage 
                      src={images[3]} 
                      alt="Precision POS Thermal Barcode sticker" 
                      productType="barcode-stickers"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-1.5 sm:mt-2 flex flex-col text-left px-1 shrink-0">
                    <span className="font-sans font-extrabold text-[9px] sm:text-[11px] text-[#111B47] uppercase tracking-wide">POS Stickers</span>
                    <span className="font-mono text-[7px] sm:text-[8px] text-gray-500">BARCODE / STICKER</span>
                  </div>
                </div>
              </motion.div>

              {/* Barcode Accent Bottom center */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[#171B54]/25 w-44 z-0 select-none">
                <div className="barcode-accent"></div>
                <span className="font-mono text-[8px] block text-center mt-1">PRESS CALIBRATION PV-FSD</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
