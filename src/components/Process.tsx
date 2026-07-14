import React from 'react';
import { Palette, ShieldAlert, Printer, Truck, ArrowRight, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import Magnetic from './Magnetic';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
}

export default function Process() {
  const steps: ProcessStep[] = [
    {
      number: "01",
      title: "Design & Spec Lock",
      description: "Submit or calibrate vectors. We lock plate layout, margins, and exact color codes.",
      icon: <Palette size={20} className="text-[#F5A623]" />,
      imageUrl: "https://images.unsplash.com/photo-1541462608141-2758a6e4852f?fm=jpg&q=80&w=400&auto=format&fit=crop"
    },
    {
      number: "02",
      title: "Proof Validation",
      description: "Approve custom virtual proofs or receive physical swatch kits in Hand before run.",
      icon: <ShieldAlert size={20} className="text-[#E31E2B]" />,
      imageUrl: "https://images.unsplash.com/photo-1505356822725-085e18f4d0b9?fm=jpg&q=80&w=400&auto=format&fit=crop"
    },
    {
      number: "03",
      title: "High-Speed Production",
      description: "Our Faisalabad presses run your offset, rotary, or rigid packaging specifications.",
      icon: <Printer size={20} className="text-blue-500" />,
      imageUrl: "https://images.unsplash.com/photo-1616400619175-5ebd300900cf?fm=jpg&q=80&w=400&auto=format&fit=crop"
    },
    {
      number: "04",
      title: "Logistics Dispatch",
      description: "Sealed cargo delivery direct to your knitting mills or global shipping docks.",
      icon: <Truck size={20} className="text-emerald-500" />,
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?fm=jpg&q=80&w=400&auto=format&fit=crop"
    }
  ];

  return (
    <section id="process" className="py-24 bg-white border-t border-[#E7E8F2] relative overflow-hidden text-center">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#171B54]/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#171B54]/10 text-[#171B54] rounded-full px-4 py-1.5 font-mono text-xs font-bold tracking-widest uppercase"
          >
            <Settings size={12} className="animate-spin" />
            Execution Cycle
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl mt-4 tracking-tight leading-none pb-2"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#171B54] via-[#E31E2B] to-[#F5A623]">
              How We Execute Your Run
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            From initial artwork alignment on our digital pre-press monitors to container loading in Faisalabad—every step is synchronized for commercial-grade speed and consistency.
          </motion.p>
        </div>

        {/* Timeline Grid Container */}
        <div className="max-w-6xl mx-auto relative">
          
          {/* Desktop SVG Connecting Line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-[24px] h-[4px] z-0 hidden md:block">
            {/* Background trace */}
            <svg className="w-full h-full overflow-visible">
              <line 
                x1="0%" 
                y1="50%" 
                x2="100%" 
                y2="50%" 
                stroke="#E7E8F2" 
                strokeWidth="2.5" 
                strokeDasharray="4 4"
              />
              {/* Animated active path */}
              <motion.line 
                x1="0%" 
                y1="50%" 
                x2="100%" 
                y2="50%" 
                stroke="url(#gradient-line-desktop)" 
                strokeWidth="3" 
                strokeDasharray="1000"
                strokeDashoffset="1000"
                initial={{ strokeDashoffset: 1000 }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradient-line-desktop" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F5A623" />
                  <stop offset="35%" stopColor="#E31E2B" />
                  <stop offset="70%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Mobile SVG Connecting Line */}
          <div className="absolute left-[24px] top-[40px] bottom-[40px] w-[4px] z-0 block md:hidden">
            <svg className="w-full h-full overflow-visible">
              <line 
                x1="50%" 
                y1="0%" 
                x2="50%" 
                y2="100%" 
                stroke="#E7E8F2" 
                strokeWidth="2.5" 
                strokeDasharray="4 4"
              />
              <motion.line 
                x1="50%" 
                y1="0%" 
                x2="50%" 
                y2="100%" 
                stroke="url(#gradient-line-mobile)" 
                strokeWidth="3" 
                strokeDasharray="1000"
                strokeDashoffset="1000"
                initial={{ strokeDashoffset: 1000 }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradient-line-mobile" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F5A623" />
                  <stop offset="35%" stopColor="#E31E2B" />
                  <stop offset="70%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Steps list */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-6 md:gap-0 group"
              >
                {/* Desktop: Step Image sits above everything */}
                <div className="hidden md:block w-full h-32 rounded-xl overflow-hidden relative mb-6 shadow-sm border border-gray-100">
                  {/* PLACEHOLDER IMAGE — replace with real Print Vision photography */}
                  <img
                    src={step.imageUrl}
                    alt={step.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#171B54]/10 group-hover:bg-[#171B54]/0 transition-colors duration-300"></div>
                </div>

                {/* Icon Circle */}
                <div className="relative shrink-0 md:mb-6">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-[#E7E8F2] flex items-center justify-center shadow-md relative z-10 group-hover:border-[#171B54] group-hover:shadow-lg transition-all duration-300">
                    {step.icon}
                  </div>
                  {/* Outer glow aura on hover */}
                  <div className="absolute -inset-1 rounded-full bg-[#171B54]/5 scale-0 group-hover:scale-105 transition-transform duration-300 -z-0"></div>
                </div>

                {/* Content */}
                <div className="flex-1 md:flex-none">
                  {/* Mobile Step Image sits inside content right column */}
                  <div className="block md:hidden w-full h-28 rounded-xl overflow-hidden relative mb-4 shadow-sm border border-gray-100">
                    {/* PLACEHOLDER IMAGE — replace with real Print Vision photography */}
                    <img
                      src={step.imageUrl}
                      alt={step.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#171B54]/10 group-hover:bg-[#171B54]/0 transition-colors duration-300"></div>
                  </div>

                  <div className="flex items-center gap-2 md:justify-center">
                    <span className="font-mono text-xs font-black text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                      {step.number}
                    </span>
                    <h3 className="font-display font-black text-base text-[#171B54] tracking-tight group-hover:text-[#E31E2B] transition-colors">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed md:max-w-[220px] md:mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Footnote inside Process */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Magnetic>
            <a
              href="#estimator"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#171B54] to-[#1d236b] hover:from-[#E31E2B] hover:to-red-600 text-white font-sans font-bold text-xs px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Calculate Production Cost Now
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Magnetic>
        </motion.div>

      </div>
    </section>
  );
}
