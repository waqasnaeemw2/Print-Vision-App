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

        {/* Double Column Graphically Rich Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT COLUMN: The Advantage Bento Grid (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {advantages.map((adv, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="bg-white border border-[#E7E8F2] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative group"
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

          {/* RIGHT COLUMN: The Interactive Calibration loom (5 Cols) */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#171B54] text-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between h-full border border-white/10 relative overflow-hidden"
            >
              {/* Dynamic glowing mesh background */}
              <div className="absolute -inset-10 bg-radial-gradient from-emerald-500/10 via-transparent to-transparent opacity-50 blur-3xl"></div>
              
              <div className="relative z-10">
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <Sliders size={18} className="text-[#F5A623] animate-pulse" />
                    <span className="font-display font-black text-sm uppercase tracking-wider text-amber-400">
                      Press Simulator Board
                    </span>
                  </div>
                  <span className="font-mono text-[9px] bg-red-500/20 text-[#FFC1C1] px-2 py-0.5 rounded border border-red-500/30">
                    CALIBRATED LIVE
                  </span>
                </div>

                {/* Animated Press Visual Loom Graphics */}
                <div className="bg-slate-950/80 rounded-2xl p-6 border border-white/5 relative aspect-square max-h-[280px] sm:max-h-[300px] flex flex-col items-center justify-center overflow-hidden">
                  
                  {/* Grid overlay representing print plates */}
                  <div className="absolute inset-2 grid grid-cols-8 grid-rows-8 gap-0.5 opacity-5 pointer-events-none">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className="border border-white"></div>
                    ))}
                  </div>

                  {/* Dynamic Color Alignment Target */}
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    
                    {/* Concentric Calibration Rings */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-spin" style={{ animationDuration: '30s' }}></div>
                    <div className="absolute inset-6 rounded-full border border-white/10 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                    <div className="absolute inset-12 rounded-full border border-dashed border-white/30"></div>
                    
                    {/* Crosshair guidelines */}
                    <div className="absolute inset-x-0 h-0.5 bg-white/20"></div>
                    <div className="absolute inset-y-0 w-0.5 bg-white/20"></div>

                    {/* Interactive Plate dots rendering plate offsets */}
                    {Object.entries(plateOffsets).map(([key, config]) => (
                      <motion.div
                        key={key}
                        animate={{
                          x: selectedPlate === key ? 0 : config.x * 6,
                          y: selectedPlate === key ? 0 : config.y * 6,
                          scale: selectedPlate === key ? 1.5 : 1
                        }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="absolute w-5 h-5 rounded-full flex items-center justify-center mix-blend-screen"
                        style={{ backgroundColor: config.color }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-90"></div>
                      </motion.div>
                    ))}

                    {/* Registration status marker */}
                    <div className="absolute -bottom-2 font-mono text-[9px] uppercase tracking-widest text-[#F5A623]">
                      Offset separation gauge
                    </div>
                  </div>

                  {/* Real-time feedback overlay */}
                  <div className="absolute bottom-2 left-4 right-4 flex justify-between items-center bg-slate-900/60 backdrop-blur border border-white/5 rounded-lg px-3 py-1.5 text-[10px] font-mono">
                    <span className="text-gray-400">STATUS:</span>
                    <span className={Math.abs(plateOffsets[selectedPlate].x) < 0.1 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold animate-pulse'}>
                      {selectedPlate.toUpperCase()} LOCKED
                    </span>
                  </div>
                </div>

                {/* Calibration Plate Selector Controls */}
                <div className="mt-6">
                  <span className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-2.5">
                    Select Active Plate Layer for Verification:
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {(['cyan', 'magenta', 'yellow', 'black'] as const).map((plate) => (
                      <button
                        key={plate}
                        type="button"
                        onClick={() => setSelectedPlate(plate)}
                        className={`py-2 px-1 rounded-xl text-[10px] font-mono uppercase font-black transition-all border cursor-pointer ${
                          selectedPlate === plate
                            ? 'bg-white text-[#171B54] border-white shadow-md font-extrabold'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {plate}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Real-time speed and telemetry sliders */}
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex justify-between font-mono text-[10px] text-gray-400 mb-1">
                      <span>HEIDELBERG SPEED LIMIT</span>
                      <span className="font-bold text-emerald-400">{pressSpeed.toLocaleString()} IMPRESSIONS / HR</span>
                    </div>
                    <input
                      type="range"
                      min={4000}
                      max={12000}
                      step={500}
                      value={pressSpeed}
                      onChange={(e) => setPressSpeed(parseInt(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>

                  <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-3 text-left">
                    <div className="flex items-center gap-2">
                      <Gauge size={16} className="text-emerald-400" />
                      <div className="flex flex-col">
                        <span className="font-sans font-bold text-[11px] leading-tight text-white">Press Spectro Density</span>
                        <span className="text-[9px] font-mono text-gray-400">Ink-layer thickness matching</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-[#F5A623]">{(95 + (pressSpeed / 2500)).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Quality Standards Lock Badge */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-gray-400">
                <span>GERMAN REIDELBERG SPEEDMASTERS</span>
                <span>FSD RUNS 2026</span>
              </div>
            </motion.div>
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
