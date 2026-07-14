import React, { useState } from 'react';
import { Users, Printer, Award, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface TrustStat {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

interface TrustStripProps {
  stats?: {
    brandsServedValue?: number;
    brandsServedSuffix?: string;
    brandsServedLabel?: string;
    
    labelsPrintedValue?: number;
    labelsPrintedSuffix?: string;
    labelsPrintedLabel?: string;
    
    isoLabel?: string;
    
    turnaroundValue?: number;
    turnaroundSuffix?: string;
    turnaroundLabel?: string;
  };
}

function StatCountUp({ value, suffix, duration = 1.5 }: { value: number; suffix: string; duration?: number }) {
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
      {Math.round(current).toLocaleString()}
      {suffix}
    </motion.span>
  );
}

export default function TrustStrip({ stats }: TrustStripProps) {
  const brandsValue = stats?.brandsServedValue ?? 500;
  const brandsSuffix = stats?.brandsServedSuffix ?? '+';
  const brandsLabel = stats?.brandsServedLabel ?? 'Brands Served';

  const labelsValue = stats?.labelsPrintedValue ?? 10;
  const labelsSuffix = stats?.labelsPrintedSuffix ?? 'M+';
  const labelsLabel = stats?.labelsPrintedLabel ?? 'Labels Printed Annually';

  const isoLabel = stats?.isoLabel ?? 'ISO 9001:2015 Certified';

  const turnaroundValue = stats?.turnaroundValue ?? 48;
  const turnaroundSuffix = stats?.turnaroundSuffix ?? 'HR';
  const turnaroundLabel = stats?.turnaroundLabel ?? 'Sample Turnaround';

  const items = [
    {
      icon: <Users size={20} className="text-[#F5A623]" />,
      component: <StatCountUp value={brandsValue} suffix={brandsSuffix} />,
      label: brandsLabel,
    },
    {
      icon: <Printer size={20} className="text-emerald-400" />,
      component: <StatCountUp value={labelsValue} suffix={labelsSuffix} />,
      label: labelsLabel,
    },
    {
      icon: <Award size={20} className="text-blue-400" />,
      component: <span className="font-display font-black">{isoLabel}</span>,
      label: 'Quality Standard Assurance',
    },
    {
      icon: <Clock size={20} className="text-[#E31E2B]" />,
      component: <StatCountUp value={turnaroundValue} suffix={turnaroundSuffix} />,
      label: turnaroundLabel,
    },
  ];

  return (
    <div id="trust-strip" className="relative z-20 bg-[#171B54] py-8 border-y border-white/10 overflow-hidden">
      {/* Absolute faint grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px)] bg-[size:40px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 items-center justify-items-center">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex items-center gap-3.5 text-left w-full max-w-[240px] sm:max-w-none justify-start sm:justify-center lg:justify-center group"
            >
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <div className="font-display font-black text-lg sm:text-xl text-white tracking-tight flex items-center leading-tight">
                  {item.component}
                </div>
                <span className="font-sans text-[11px] text-gray-300 mt-0.5 uppercase tracking-wider font-semibold leading-none">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
