import React, { useState } from 'react';
import { Award, Zap, Layers, RefreshCw, Sparkles, Cpu, CheckCircle2, Sliders, Gauge } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyUs() {
  const [pressSpeed, setPressSpeed] = useState(8500); // impressions per hour
  const [inkDensity, setInkDensity] = useState(98.4); // spectrophotometer density percentage
  const [selectedPlate, setSelectedPlate] = useState<'cyan' | 'magenta' | 'yellow' | 'black'>('cyan');

  const advantages = [
    {
      icon: <Award size={24} className="text-[#F5A623]" />,
      title: 'Pantone® & Color Spectrometer Integrity',
      description: 'Print Vision implements automated colorimeter-locked offset plate checks. We guarantee 100% color consistency between your primary luxury fabrics and brand hang tags, run after run.'
    },
    {
      icon: <Zap size={24} className="text-[#E31E2B]" />,
      title: 'Faisalabad Direct High-Speed Hub',
      description: 'Based in the heart of Pakistan’s textile capital. We synchronize print plate runs with your knitting schedules to eliminate downtime—ensuring premium Swings and Labels arrive before packaging begins.'
    },
    {
      icon: <Layers size={24} className="text-blue-500" />,
      title: 'Premium Multi-Tactile Tooling',
      description: 'Expand your brand’s touchpoints. We specialize in velvet-soft matte lamination, high-build Spot UV finishes, micro-embossed textured cardboards, and real hot-stamped gold foil trims.'
    },
    {
      icon: <RefreshCw size={24} className="text-emerald-500" />,
      title: 'OEKO-TEX® Certified Dye Integrity',
      description: 'Our partner mills utilize only hyper-dense, skin-safe, hypoallergenic polyester yarns. Fully resistant to commercial laundry friction and harsh enzyme washes, keeping tags crisp.'
    }
  ];

  // Visual offsets for interactive calibration display
  const plateOffsets = {
    cyan: { x: 0, y: 0, color: '#00AEEF' },
    magenta: { x: -1.5, y: 1, color: '#EC008C' },
    yellow: { x: 1, y: -1, color: '#FFF200' },
    black: { x: 0, y: 0.5, color: '#000000' }
  };

  return (
    <section id="why" className="py-24 bg-gradient-to-b from-[#F5F6FB] via-white to-[#F5F6FB] border-t border-[#E7E8F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#E31E2B]/10 text-[#E31E2B] rounded-full px-4 py-1.5 font-mono text-xs font-bold tracking-widest uppercase"
          >
            <Cpu size={12} className="animate-spin" />
            The Print Vision Calibration
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl text-[#171B54] mt-4 tracking-tight leading-none"
          >
            Engineered For Elite Apparel Brands
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            We do not just manufacture standard paper tags. We build precision brand assets. Rooted in Faisalabad, Print Vision utilizes modern German machinery to run perfect identity plates for Pakistan's leading fashion exporters.
          </motion.p>
        </div>

        {/* Advantage Bento Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((adv, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="bg-white border border-[#E7E8F2] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative group text-left"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E31E2B]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl"></div>
                
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F6FB] border border-[#E7E8F2] flex items-center justify-center mb-6 shrink-0 transition-transform group-hover:rotate-6">
                    {adv.icon}
                  </div>
                  <h3 className="font-display font-black text-base text-[#171B54] tracking-tight">
                    {adv.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-gray-500 mt-3 leading-relaxed">
                    {adv.description}
                  </p>
                </div>
                
                {/* Footer metadata element */}
                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-[9px] font-mono text-gray-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={10} className="text-emerald-500" />
                    CERTIFIED SPEC
                  </span>
                  <span className="font-bold">PV-FSD-0{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Brand partner quality footnote */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white border border-[#E7E8F2] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0">
              <Sparkles size={22} className="text-amber-600" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-sm text-[#171B54]">Order Free Physical Pre-Proof Material Kits</span>
              <span className="font-sans text-xs sm:text-sm text-gray-500 leading-normal mt-0.5">
                We deliver a custom bound folder featuring physical woven labels, embossed rigid boards, and textured tag stocks. Test weight, color, and finish beforehand.
              </span>
            </div>
          </div>
          <a 
            href="#contact" 
            className="bg-[#171B54] hover:bg-[#E31E2B] text-white font-sans font-bold text-xs sm:text-sm px-8 py-4 rounded-full transition-transform hover:-translate-y-0.5 cursor-pointer shrink-0 text-center shadow-lg"
          >
            Request Swatch Kit
          </a>
        </motion.div>

      </div>
    </section>
  );
}
