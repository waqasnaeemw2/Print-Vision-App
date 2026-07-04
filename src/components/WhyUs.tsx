import React from 'react';
import { Award, Zap, Award as DollarIcon, Compass, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyUs() {
  const advantages = [
    {
      icon: <Award size={20} className="text-[#F5A623]" />,
      title: 'Press-Proof Colour Integrity',
      description: 'We run specialized spectrophotometer color checks to ensure your logo and Care Instructions match your brand specs perfectly run after run.'
    },
    {
      icon: <Zap size={20} className="text-[#E31E2B]" />,
      title: 'Faisalabad Production Speeds',
      description: 'Rooted directly in Pakistan’s textile heartland. We sync with your garment production cycle so tags and packaging arrive before packing begins.'
    },
    {
      icon: <Layers size={20} className="text-blue-500" />,
      title: 'Multi-Embellishment Tooling',
      description: 'From velvet soft-touch laminate layers, Spot-UV raised varnishes, and custom gold hot foils—we carry the widest technical array in town.'
    },
    {
      icon: <RefreshCw size={20} className="text-emerald-500" />,
      title: 'OEKO-TEX Certified Soft Threads',
      description: 'Our woven brand labels are made using hypoallergenic, dye-fast polyester threads, guaranteeing skin comfort inside babywear and bedding.'
    }
  ];

  return (
    <section id="why" className="py-16 bg-[#F5F6FB] border-t border-[#E7E8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#E31E2B]/10 text-[#171B54] rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase">
            The Quality Standard
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#171B54] mt-3 tracking-tight">
            Engineered For Apparel Brands
          </h2>
          <p className="font-sans text-sm text-gray-500 mt-2 max-w-lg mx-auto">
            We do not just print cardboards—we provide commercial brand identifiers. Here is why top home textile manufacturers trust our production plates.
          </p>
        </div>

        {/* Advantage Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((adv, index) => (
            <motion.div
              whileHover={{ y: -6 }}
              key={index}
              className="bg-white border border-[#E7E8F2] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#F5F6FB] border border-[#E7E8F2] flex items-center justify-center mb-5 shrink-0">
                  {adv.icon}
                </div>
                <h3 className="font-display font-bold text-sm text-[#171B54]">
                  {adv.title}
                </h3>
                <p className="font-sans text-xs text-gray-500 mt-3 leading-relaxed">
                  {adv.description}
                </p>
              </div>
              
              {/* Card micro footnote */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[8px] font-mono text-gray-400">
                <span>CERTIFIED PV-FSD</span>
                <span>ADVANTAGE 0{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand partners footnote */}
        <div className="mt-16 bg-white border border-[#E7E8F2] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <Sparkles size={20} className="text-[#F5A623] shrink-0" />
            <div className="flex flex-col">
              <span className="font-sans font-bold text-xs text-[#171B54]">Custom Fabric Sample Kits Available</span>
              <span className="font-sans text-[11px] text-gray-500 leading-normal">
                Want to feel thread density before confirming a run? Request our Physical Sample Kit. We deliver it directly to your office.
              </span>
            </div>
          </div>
          <a 
            href="#contact" 
            className="bg-[#171B54] hover:bg-[#1E293B] text-white font-sans font-bold text-xs px-6 py-3.5 rounded-full transition-transform hover:-translate-y-0.5 cursor-pointer shrink-0"
          >
            Order Free Sample Kit
          </a>
        </div>

      </div>
    </section>
  );
}
