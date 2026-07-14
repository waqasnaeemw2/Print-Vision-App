import React, { useState } from 'react';
import { Award, Zap, Layers, RefreshCw, Sparkles, Cpu, CheckCircle2, Sliders, Gauge } from 'lucide-react';
import { motion } from 'motion/react';

interface WhyUsProps {
  whyUsConfig?: {
    badge: string;
    title: string;
    description: string;
    advantages: { title: string; description: string }[];
  };
}

function CountUp({ value, duration = 1.5, suffix = "", decimals = 0 }: { value: number; duration?: number; suffix?: string; decimals?: number }) {
  const [current, setCurrent] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <motion.span
      onViewportEnter={() => {
        if (hasAnimated) return;
        setHasAnimated(true);
        let start = 0;
        const end = value;
        const startTime = performance.now();

        const animate = (now: number) => {
          const elapsed = (now - startTime) / 1000;
          const progress = Math.min(elapsed / duration, 1);
          const ease = progress * (2 - progress); // easeOutQuad
          const currentVal = start + (end - start) * ease;
          setCurrent(currentVal);
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCurrent(end);
          }
        };
        requestAnimationFrame(animate);
      }}
    >
      {current.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </motion.span>
  );
}

export default function WhyUs({ whyUsConfig }: WhyUsProps) {
  const [pressSpeed, setPressSpeed] = useState(8500); // impressions per hour
  const [inkDensity, setInkDensity] = useState(98.4); // spectrophotometer density percentage
  const [selectedPlate, setSelectedPlate] = useState<'cyan' | 'magenta' | 'yellow' | 'black'>('cyan');
  const [calibratedPlates, setCalibratedPlates] = useState<Record<string, boolean>>({
    cyan: false,
    magenta: false,
    yellow: false,
    black: false
  });
  const [calibrationToast, setCalibrationToast] = useState<string | null>(null);

  const defaultAdvantages = [
    {
      icon: <Award size={24} className="text-[#F5A623]" />,
      title: 'Spectrophotometer Color Alignment',
      description: 'Print Vision implements automated colorimeter-guided offset plate checks to align label print colors with your fabric base. We prioritize high-grade consistency across all production batches.'
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
      title: 'Sustainably-Sourced Premium Dye Integrity',
      description: 'Our printing processes use high-density, hypoallergenic inks and yarns. Fully resistant to washing friction and rigorous commercial laundry cycles, keeping tags and labels looking crisp.'
    }
  ];

  const finalBadge = whyUsConfig?.badge || 'The Print Vision Calibration';
  const finalTitle = whyUsConfig?.title || 'Engineered For Elite Apparel Brands';
  const finalDescription = whyUsConfig?.description || 'We do not just manufacture standard paper tags. We build precision brand assets. Rooted in Faisalabad, Print Vision utilizes modern, state-of-the-art print machinery to run perfect identity plates for Pakistan\'s leading fashion exporters.';
  
  const advantagesList = (whyUsConfig?.advantages || defaultAdvantages).map((adv: any, index: number) => {
    const fallback = defaultAdvantages[index] || defaultAdvantages[0];
    return {
      icon: fallback.icon,
      title: adv.title || fallback.title,
      description: adv.description || fallback.description
    };
  });

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
            {finalBadge}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl text-[#171B54] mt-4 tracking-tight leading-none"
          >
            {finalTitle}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            {finalDescription}
          </motion.p>
        </div>

        {/* Interactive CMYK Calibration Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-16 bg-[#171B54] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-white/10"
        >
          {/* Subtle Grid overlay background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column: Interactive Swatches and Status */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full text-left">
              <div>
                <span className="font-mono text-xs text-[#F5A623] tracking-widest uppercase font-bold flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-ping"></span>
                  Active Press Control Panel
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl tracking-tight leading-none mb-4 text-white">
                  Industrial CMYK Plate Calibration
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                  Before high-speed printing runs in our Faisalabad facility, print plates must register within a 10-micron tolerance. Click each color swatch to toggle registration alignment.
                </p>
              </div>

              {/* Swatch Clickable Elements */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Select & Calibrate Plates:</span>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {Object.keys(plateOffsets).map((colorKey) => {
                    const key = colorKey as 'cyan' | 'magenta' | 'yellow' | 'black';
                    const isCalibrated = calibratedPlates[key];
                    const colorHex = plateOffsets[key].color;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedPlate(key);
                          setCalibratedPlates(prev => ({
                            ...prev,
                            [key]: !prev[key]
                          }));
                          if (!isCalibrated) {
                            setCalibrationToast(`${key.toUpperCase()} plate successfully registered!`);
                          } else {
                            setCalibrationToast(`${key.toUpperCase()} plate offset released.`);
                          }
                        }}
                        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all text-xs font-mono font-bold uppercase tracking-wider text-left cursor-pointer ${
                          selectedPlate === key
                            ? 'bg-white/15 border-white text-white'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/35'
                        }`}
                      >
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-white/20 transition-transform group-hover:scale-110 shrink-0" 
                          style={{ backgroundColor: colorHex }}
                        ></span>
                        <div className="flex flex-col">
                          <span>{key}</span>
                          <span className="text-[8px] font-medium text-gray-400">
                            {isCalibrated ? 'Registered 0.0' : 'Misaligned'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reset / All Calibrate Buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setCalibratedPlates({ cyan: true, magenta: true, yellow: true, black: true });
                    setCalibrationToast('All plates calibrated to 100% registration accuracy!');
                  }}
                  className="bg-gradient-to-r from-[#F5A623] to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#171B54] font-sans font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg flex items-center gap-1.5"
                >
                  Auto-Align All Plates
                </button>
                <button
                  onClick={() => {
                    setCalibratedPlates({ cyan: false, magenta: false, yellow: false, black: false });
                    setCalibrationToast('All plate offsets released to default misalignment.');
                  }}
                  className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-sans font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Reset Offsets
                </button>
              </div>

              {calibrationToast && (
                <div className="mt-4 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                  ✓ {calibrationToast}
                </div>
              )}
            </div>

            {/* Middle Column: Stacked Plate Registration Visual Canvas */}
            <div className="lg:col-span-4 flex items-center justify-center p-4">
              <div className="relative w-64 h-64 rounded-3xl bg-white border-2 border-white/20 flex items-center justify-center overflow-hidden shadow-inner select-none">
                {/* Tech Reticle Target Grid lines */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Concentric circles */}
                  <div className="absolute w-44 h-44 rounded-full border border-gray-100/80 border-dashed"></div>
                  <div className="absolute w-28 h-28 rounded-full border border-gray-200 border-dashed"></div>
                  <div className="absolute w-12 h-12 rounded-full border border-gray-300"></div>
                  {/* Center reticle */}
                  <div className="absolute w-full h-[1px] bg-gray-200"></div>
                  <div className="absolute h-full w-[1px] bg-gray-200"></div>
                </div>

                {/* Overlapping CMYK registration marks */}
                {Object.keys(plateOffsets).map((colorKey) => {
                  const key = colorKey as 'cyan' | 'magenta' | 'yellow' | 'black';
                  const isCalibrated = calibratedPlates[key];
                  const offset = plateOffsets[key];
                  
                  // Scale up the displacement so it is visible
                  const currentX = isCalibrated ? 0 : offset.x * 20;
                  const currentY = isCalibrated ? 0 : offset.y * 20;

                  return (
                    <motion.div
                      key={key}
                      animate={{
                        x: currentX,
                        y: currentY,
                        scale: selectedPlate === key ? 1.08 : 1
                      }}
                      transition={{ type: 'spring', stiffness: 90, damping: 12 }}
                      className="absolute w-14 h-14 rounded-full border-[1.5px] border-white/30 flex items-center justify-center"
                      style={{
                        backgroundColor: offset.color,
                        mixBlendMode: 'multiply',
                        opacity: 0.7,
                        zIndex: selectedPlate === key ? 20 : 10
                      }}
                    >
                      {/* Center registration dot */}
                      <div className="w-1.5 h-1.5 rounded-full bg-white/70"></div>
                    </motion.div>
                  );
                })}

                {/* Digital readout header inside grid */}
                <div className="absolute bottom-3 left-4 font-mono text-[9px] text-gray-400">
                  REF: CAL-FSD-2026
                </div>
                <div className="absolute top-3 right-4 font-mono text-[9px] text-gray-400 uppercase">
                  {Object.values(calibratedPlates).every(Boolean) ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      OPTIMAL REGISTRATION
                    </span>
                  ) : (
                    <span className="text-amber-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      CALIBRATION REQ
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Count-Up Indicators */}
            <div className="lg:col-span-3 flex flex-col gap-6 justify-center text-left">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Gauge size={18} className="text-amber-500" />
                  </div>
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Press Velocity</span>
                </div>
                <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                  <CountUp value={pressSpeed} suffix="" />
                </div>
                <span className="font-sans text-[11px] text-gray-300 mt-1 block">Impressions per hour (Rotary/Offset)</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Sliders size={18} className="text-blue-500" />
                  </div>
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Color Density</span>
                </div>
                <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                  <CountUp value={inkDensity} suffix="%" decimals={1} />
                </div>
                <span className="font-sans text-[11px] text-gray-300 mt-1 block">Spectrophotometer density lock</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Advantage Bento Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantagesList.map((adv, index) => (
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
