import React from 'react';
import { Phone, Mail, MapPin, Globe, Shield } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111B47] text-white pt-16 pb-8 relative overflow-hidden border-t border-white/5">
      {/* Absolute layout pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_1px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Brand info (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <div className="mb-4 cursor-pointer" onClick={() => onScrollToSection('top')}>
              <Logo height={42} inverse={true} />
            </div>
            <p className="font-sans text-xs text-gray-300 leading-relaxed max-w-sm">
              Established in the textile capital of Faisalabad, Print Vision operates high-precision commercial printing presses, supplying global apparel brands with vibrant branding, luxury foil trims, and secure barcode label systems. We offer premium woven labels sourced through audited partners.
            </p>
            <div className="mt-6 flex items-center gap-1.5 font-mono text-[9px] text-[#F3E5AB] uppercase tracking-widest font-bold">
              <Shield size={12} className="text-[#F5A623]" />
              ISO 9001:2015 &amp; FSC Certified Printing
            </div>
          </div>

          {/* Site Directory (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#F5A623] mb-4">Workspace</h4>
            <ul className="space-y-2.5 font-sans text-xs text-gray-300">
              <li>
                <button onClick={() => onScrollToSection('studio')} className="hover:text-white transition-colors cursor-pointer">
                  Branding Studio
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  Apparel Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('estimator')} className="hover:text-white transition-colors cursor-pointer">
                  Cost Estimator
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('why')} className="hover:text-white transition-colors cursor-pointer">
                  Advantage Suite
                </button>
              </li>
            </ul>
          </div>

          {/* Products (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#F5A623] mb-4">Print Lines</h4>
            <ul className="space-y-2.5 font-sans text-xs text-gray-300">
              <li>
                <button onClick={() => onScrollToSection('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  High-Density Damask Woven
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  Luxury Die-Cut Hang Tags
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  Rigid Gift &amp; Blanket Boxes
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  POS Thermal Barcodes
                </button>
              </li>
            </ul>
          </div>

          {/* Logistics Address (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#F5A623] mb-4">Logistics Desk</h4>
            <ul className="space-y-3.5 font-sans text-xs text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#E31E2B] mt-0.5 shrink-0" />
                <span>Eid Gah Road, Faisalabad, Punjab, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#E31E2B] shrink-0" />
                <a href="tel:03027000073" className="hover:text-white transition-colors">0302-7000073</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#E31E2B] shrink-0" />
                <a href="mailto:info@printvisionpk.com" className="hover:text-white transition-colors">info@printvisionpk.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom row copyrights and barcode accent decoration */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-mono text-[10px] text-gray-400">
              © {currentYear} Print Vision Pakistan Ltd. All rights reserved.
            </span>
            <span className="font-mono text-[8px] text-gray-500 mt-1 uppercase tracking-widest">
              Commercial Registration • FSD Textile Association #338-990-1
            </span>
          </div>

          {/* Barcode line */}
          <div className="text-white/20 w-48 select-none">
            <div className="barcode-accent"></div>
            <span className="font-mono text-[8px] block text-center mt-1 uppercase tracking-widest">
              Press-Verified Quality Proof
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
