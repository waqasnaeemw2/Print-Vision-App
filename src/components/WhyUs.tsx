import React from 'react';
import { Award, Zap, Layers, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface WhyUsProps {
  whyUsConfig?: {
    badge: string;
    title: string;
    description: string;
    advantages: { title: string; description: string }[];
  };
}

export default function WhyUs({ whyUsConfig }: WhyUsProps) {
  const defaultAdvantages = [
    {
      icon: <Award size={20} className="text-[#F5A623]" />,
      title: 'Precision Color Matching',
      description: 'We align labels and trims with exact Pantone specs using automated spectrophotometer checks.',
      imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?fm=jpg&q=80&w=400&auto=format&fit=crop"
    },
    {
      icon: <Zap size={20} className="text-[#E31E2B]" />,
      title: 'Faisalabad Direct Hub',
      description: 'Based in Pakistan’s textile capital, syncing with your knitting schedules to eliminate downtime.',
      imageUrl: "https://images.unsplash.com/photo-1528469133791-aa493335b0f2?fm=jpg&q=80&w=400&auto=format&fit=crop"
    },
    {
      icon: <Layers size={20} className="text-blue-500" />,
      title: 'Premium Multi-Tactile Tooling',
      description: 'Specializing in velvet-soft lamination, Spot UV, textured cardboards, and hot foil trims.',
      imageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?fm=jpg&q=80&w=400&auto=format&fit=crop"
    },
    {
      icon: <RefreshCw size={20} className="text-emerald-500" />,
      title: 'Resilient Dye Integrity',
      description: 'Skin-safe, hypoallergenic spools resistant to washing friction and heavy laundry cycles.',
      imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?fm=jpg&q=80&w=400&auto=format&fit=crop"
    }
  ];

  const finalBadge = whyUsConfig?.badge || 'Why Brands Choose Us';
  const finalTitle = whyUsConfig?.title || 'Engineered For Elite Apparel Brands';
  const finalDescription = whyUsConfig?.description || 'We do not just manufacture standard paper tags. We build precision brand assets. Rooted in Faisalabad, Print Vision utilizes modern, state-of-the-art print machinery to run perfect identity plates for Pakistan\'s leading fashion exporters.';
  
  const advantagesList = (whyUsConfig?.advantages || defaultAdvantages).map((adv: any, index: number) => {
    const fallback = defaultAdvantages[index] || defaultAdvantages[0];
    return {
      icon: fallback.icon,
      title: adv.title || fallback.title,
      description: adv.description || fallback.description,
      imageUrl: fallback.imageUrl
    };
  });

  return (
    <section id="why" className="py-20 bg-gradient-to-b from-[#F5F6FB] via-white to-[#F5F6FB] border-t border-[#E7E8F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#E31E2B]/10 text-[#E31E2B] rounded-full px-4 py-1.5 font-mono text-xs font-bold tracking-widest uppercase"
          >
            {finalBadge}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl mt-4 tracking-tight leading-none pb-2"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#171B54] via-[#E31E2B] to-[#F5A623]">
              {finalTitle}
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            {finalDescription}
          </motion.p>
        </div>

        {/* Advantage Bento Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantagesList.map((adv, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-white border border-[#E7E8F2] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left"
              >
                <div>
                  {/* Card Image */}
                  <div className="w-full h-36 overflow-hidden relative border-b border-[#E7E8F2]">
                    {/* PLACEHOLDER IMAGE — replace with real Print Vision photography */}
                    <img 
                      src={adv.imageUrl} 
                      alt={adv.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-[#171B54]/10 group-hover:bg-[#171B54]/0 transition-colors duration-300"></div>
                  </div>

                  <div className="p-5">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F6FB] border border-[#E7E8F2] flex items-center justify-center mb-4 shrink-0 transition-transform group-hover:rotate-6">
                      {adv.icon}
                    </div>
                    <h3 className="font-display font-black text-sm text-[#171B54] tracking-tight">
                      {adv.title}
                    </h3>
                    <p className="font-sans text-[11px] sm:text-xs text-gray-500 mt-2 leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                </div>
                
                {/* Footer metadata element */}
                <div className="px-5 pb-5 pt-3 border-t border-gray-50 flex items-center justify-between text-[9px] font-mono text-gray-400">
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
            className="bg-[#171B54] hover:bg-[#E31E2B] text-white font-sans font-bold text-xs sm:text-sm px-8 py-4 rounded-full transition-transform hover:-translate-y-0.5 cursor-pointer shrink-0 text-center shadow-lg animate-none"
          >
            Request Swatch Kit
          </a>
        </motion.div>

      </div>
    </section>
  );
}
