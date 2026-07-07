import React, { useState, useEffect } from 'react';
import { Tag, Box, Layers, Printer, FileText, ShoppingBag, Sparkles } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  productType?: string;
  imageFit?: 'cover' | 'contain' | 'fill';
  imageScale?: number;
  imageHeight?: number;
}

export default function SmartImage({ src, alt, className = '', productType = '', imageFit = 'cover', imageScale = 1, imageHeight }: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError || !src) {
    // Determine a corresponding icon and color based on product type
    let icon = <Layers size={40} className="text-[#171B54]/40" />;
    let bgClass = 'bg-gradient-to-tr from-slate-100 to-slate-200';
    let typeLabel = 'Brand Accessory';

    const cleanType = (productType || alt || '').toLowerCase();

    if (cleanType.includes('label')) {
      icon = <Layers size={44} className="text-[#E31E2B]/55" />;
      bgClass = 'bg-gradient-to-tr from-[#E31E2B]/5 via-white to-[#E31E2B]/10';
      typeLabel = 'Premium Woven Label';
    } else if (cleanType.includes('tag')) {
      icon = <Tag size={44} className="text-[#171B54]/55" />;
      bgClass = 'bg-gradient-to-tr from-[#171B54]/5 via-white to-[#171B54]/10';
      typeLabel = 'Luxury Hang Tag';
    } else if (cleanType.includes('box') || cleanType.includes('packaging')) {
      icon = <Box size={44} className="text-[#F5A623]/65" />;
      bgClass = 'bg-gradient-to-tr from-[#F5A623]/5 via-white to-[#F5A623]/10';
      typeLabel = 'Rigid Gift Box';
    } else if (cleanType.includes('sticker') || cleanType.includes('barcode')) {
      icon = <Printer size={44} className="text-gray-700/55" />;
      bgClass = 'bg-gradient-to-tr from-slate-100 via-white to-slate-200';
      typeLabel = 'Thermal Barcode';
    } else if (cleanType.includes('card') || cleanType.includes('insert')) {
      icon = <FileText size={44} className="text-blue-500/55" />;
      bgClass = 'bg-gradient-to-tr from-blue-50 via-white to-blue-100/50';
      typeLabel = 'Thank-You Insert';
    } else if (cleanType.includes('bag') || cleanType.includes('carrier')) {
      icon = <ShoppingBag size={44} className="text-emerald-500/55" />;
      bgClass = 'bg-gradient-to-tr from-emerald-50 via-white to-emerald-100/50';
      typeLabel = 'Paper Shopping Bag';
    }

    return (
      <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${bgClass} ${className}`}>
        <div className="p-4 rounded-full bg-white/85 shadow-sm border border-gray-100/80 mb-3 animate-pulse">
          {icon}
        </div>
        <span className="font-display font-bold text-xs text-[#171B54] tracking-tight">
          {alt || 'Product Proof Image'}
        </span>
        <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mt-1 block">
          {typeLabel} • Live Digital Rendering
        </span>
        <div className="mt-3 inline-flex items-center gap-1 bg-white/90 px-2 py-0.5 rounded-full border border-gray-100 text-[8px] font-mono text-amber-600 font-bold uppercase">
          <Sparkles size={10} />
          Verified Active Spec
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden relative">
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        className={`${className} transition-all duration-300`}
        style={{
          objectFit: imageFit,
          transform: `scale(${imageScale})`,
          height: imageHeight ? `${imageHeight}px` : undefined,
        }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
