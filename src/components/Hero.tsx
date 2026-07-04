import React from 'react';
import { ArrowRight, Sparkles, CheckCircle, Award, Printer, ShieldCheck, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F6FB] via-white to-white pt-10 pb-24 lg:pt-16 lg:pb-32">
      {/* Absolute luxury background swirly grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#171B54_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
      
      {/* Decorative CMYK Plate Marks in Background */}
      <div className="absolute top-12 right-12 z-0 opacity-15 pointer-events-none hidden xl:flex gap-4">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#00FFFF] animate-spin-slow flex items-center justify-center">
            <span className="text-[8px] font-mono font-bold text-[#00FFFF]">C</span>
          </div>
          <span className="text-[7px] font-mono mt-1 text-[#00FFFF]">CYAN PLATE</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#FF00FF] animate-spin-slow flex items-center justify-center">
            <span className="text-[8px] font-mono font-bold text-[#FF00FF]">M</span>
          </div>
          <span className="text-[7px] font-mono mt-1 text-[#FF00FF]">MAGENTA</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#FFFF00] animate-spin-slow flex items-center justify-center">
            <span className="text-[8px] font-mono font-bold text-[#FFFF00]">Y</span>
          </div>
          <span className="text-[7px] font-mono mt-1 text-[#FFFF00]">YELLOW</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#111B47] animate-spin-slow flex items-center justify-center">
            <span className="text-[8px] font-mono font-bold text-[#111B47]">K</span>
          </div>
          <span className="text-[7px] font-mono mt-1 text-[#111B47]">BLACK</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Copy (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Elegant luxury chip */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#171B54]/5 text-[#171B54] border border-[#171B54]/10 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-wider uppercase mb-6"
            >
              <Sparkles size={12} className="text-[#F5A623] animate-pulse" />
              PAKISTAN'S ELITE PRINTING PRESS HUB • FAISALABAD
            </motion.div>

            {/* Main Display Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#171B54] tracking-tight leading-[1.05]"
            >
              High-Speed Commercial <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#171B54] via-[#E31E2B] to-[#F5A623]">
                Apparel Print &amp; Packaging
              </span>
            </motion.h1>

            {/* Description Lede */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 font-sans text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl"
            >
              We operate advanced offset, flexographic, and rotary printing presses in Faisalabad. From luxury textured hang tags, rigid gift packages, and barcode systems, to premium woven brand labels—crafted through partner mills and fully guaranteed by us—we run long-run branding specs under tight quality checks.
            </motion.p>

            {/* Call to Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 flex flex-wrap gap-4 items-center"
            >
              <button 
                onClick={() => onScrollToSection('studio')}
                className="group flex items-center gap-2 bg-[#171B54] hover:bg-[#1E293B] text-white font-sans font-bold text-sm px-7 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Launch Customizer Studio
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              
              <button 
                onClick={() => onScrollToSection('estimator')}
                className="font-sans font-bold text-sm text-[#171B54] hover:bg-[#171B54]/5 border border-gray-300 rounded-full px-6 py-4 transition-all cursor-pointer"
              >
                Interactive Cost Estimator
              </button>
            </motion.div>

            {/* Quick Micro-Capabilities */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-200/80 pt-8 w-full max-w-lg"
            >
              <div className="flex items-start gap-2.5">
                <Printer size={18} className="text-[#E31E2B] mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-xs text-[#171B54]">High-Speed Offset Presses</span>
                  <span className="font-sans text-[11px] text-gray-500">Heidelberg accuracy with 600 DPI dot alignment</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle size={18} className="text-[#F5A623] mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-xs text-[#171B54]">Double-Sided Premium Foil Trims</span>
                  <span className="font-sans text-[11px] text-gray-500">Spot-UV, gold-foil stamping, and velvety cardstocks</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual Showcase (5 Cols) - Highly Animated Collage with 4 Visuals */}
          <div className="lg:col-span-5 relative h-[520px] sm:h-[580px] w-full flex items-center justify-center select-none overflow-visible">
            
            {/* Visual background circle swirl */}
            <div className="absolute w-[380px] sm:w-[460px] h-[380px] sm:h-[460px] rounded-full bg-gradient-to-tr from-[#171B54]/5 via-[#E31E2B]/5 to-[#F5A623]/10 -z-10 animate-spin-slow"></div>

            {/* Micro Badge: Active Print Press Status */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute top-0 right-4 sm:right-10 z-30 bg-white/95 backdrop-blur shadow-xl rounded-xl p-2.5 border border-gray-100 flex items-center gap-2.5"
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
            <div className="absolute top-8 bottom-8 left-12 right-12 border border-dashed border-[#E31E2B]/10 rounded-3xl pointer-events-none -z-10">
              {/* Vertical glint sweep */}
              <motion.div 
                animate={{ y: ['0%', '100%', '0%'] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#E31E2B]/50 to-transparent shadow-[0_0_12px_rgba(227,30,43,0.8)]"
              />
            </div>

            {/* -------------------- 4 COLLAGE PRODUCTS VISUALS -------------------- */}

            {/* VISUAL 1: Premium FSC Art-Card Hang Tag */}
            <motion.div 
              initial={{ opacity: 0, x: -50, y: -40, rotate: -15, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: -8, scale: 1 }}
              whileHover={{ rotate: -2, scale: 1.05, zIndex: 40 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="absolute w-[150px] sm:w-[185px] h-[210px] sm:h-[260px] top-12 left-2 sm:left-4 rounded-xl overflow-hidden border-[4px] border-white shadow-lg z-10 hover:shadow-2xl transition-all duration-300 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1698932646779-916299619ad2?fm=jpg&q=80&w=400&auto=format&fit=crop" 
                alt="Premium Garment Swing Tag" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 left-2 bg-[#171B54] text-white px-2 py-0.5 rounded text-[8px] font-mono tracking-wider uppercase">
                SPEC: FSC 600GSM
              </div>
            </motion.div>

            {/* VISUAL 2: Partner-Woven Soft Collar Brand Label */}
            <motion.div 
              initial={{ opacity: 0, x: 50, y: -40, rotate: 15, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 6, scale: 1 }}
              whileHover={{ rotate: 1, scale: 1.05, zIndex: 40 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="absolute w-[160px] sm:w-[190px] h-[140px] sm:h-[160px] top-24 right-2 sm:right-6 rounded-xl overflow-hidden border-[4px] border-white shadow-lg z-20 hover:shadow-2xl transition-all duration-300 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1603252109303-2751441dd157?fm=jpg&q=80&w=400&auto=format&fit=crop" 
                alt="Fine woven brand label inside collar" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 left-2 bg-[#E31E2B] text-white px-2 py-0.5 rounded text-[8px] font-mono tracking-wider uppercase">
                PARTNER WOVEN • 100% QA
              </div>
            </motion.div>

            {/* VISUAL 3: Luxury Custom Rigid Cardboard Packaging Box */}
            <motion.div 
              initial={{ opacity: 0, x: -40, y: 50, rotate: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: -4, scale: 1 }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 40 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute w-[170px] sm:w-[210px] h-[150px] sm:h-[185px] bottom-16 left-6 sm:left-12 rounded-xl overflow-hidden border-[4px] border-white shadow-xl z-25 hover:shadow-2xl transition-all duration-300 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1656543802898-41c8c46683a7?fm=jpg&q=80&w=400&auto=format&fit=crop" 
                alt="Luxury Rigid Cardboard Box" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 left-2 bg-[#F5A623] text-[#111B47] px-2 py-0.5 rounded text-[8px] font-mono tracking-wider font-bold uppercase">
                RIGID PACKAGING
              </div>
            </motion.div>

            {/* VISUAL 4: Precision Thermal Barcoding Sticker */}
            <motion.div 
              initial={{ opacity: 0, x: 40, y: 50, rotate: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 8, scale: 1 }}
              whileHover={{ rotate: 2, scale: 1.05, zIndex: 40 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="absolute w-[150px] sm:w-[175px] h-[140px] sm:h-[160px] bottom-10 right-4 sm:right-8 rounded-xl overflow-hidden border-[4px] border-white shadow-lg z-30 hover:shadow-2xl transition-all duration-300 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1616400619175-5ebd300900cf?fm=jpg&q=80&w=400&auto=format&fit=crop" 
                alt="Precision POS Thermal Barcode sticker" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 left-2 bg-[#111B47] text-white px-2 py-0.5 rounded text-[8px] font-mono tracking-wider uppercase">
                BARCODE / STICKER
              </div>
            </motion.div>

            {/* Barcode Accent Bottom center */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[#171B54]/25 w-44 z-0 select-none">
              <div className="barcode-accent"></div>
              <span className="font-mono text-[8px] block text-center mt-1">PRESS CALIBRATION PV-FSD</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
