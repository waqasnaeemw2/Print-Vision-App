import React, { useState } from 'react';
import { Tag, Check, ArrowRight, ShieldCheck, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CatalogItem, ProductType } from '../types';
import { CATALOG_ITEMS } from '../data';
import SmartImage from './SmartImage';

interface CatalogProps {
  catalogItems?: CatalogItem[];
}

export default function Catalog({ catalogItems }: CatalogProps) {
  const [selectedCategory, setSelectedColor] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<CatalogItem | null>(null);

  const categories = [
    { value: 'all', label: 'All Packaging' },
    { value: 'woven-labels', label: 'Woven Labels' },
    { value: 'hang-tags', label: 'Apparel Hang Tags' },
    { value: 'packaging-boxes', label: 'Gift Boxes' },
    { value: 'barcode-stickers', label: 'Barcode Stickers' },
    { value: 'insert-cards', label: 'In-Box Cards & Bags' }
  ];

  const itemsToUse = catalogItems || CATALOG_ITEMS;

  const filteredItems = selectedCategory === 'all'
    ? itemsToUse
    : itemsToUse.filter(item => item.type === selectedCategory || (selectedCategory === 'insert-cards' && (item.type === 'insert-cards' || item.type === 'printed-bags')));

  return (
    <section id="catalog" className="py-16 bg-white border-t border-[#E7E8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-[#171B54]/5 text-[#171B54] rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase">
            Product Line Catalog
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#171B54] mt-3 tracking-tight">
            Explore Brand Accessories
          </h2>
          <p className="font-sans text-sm text-gray-500 mt-2 max-w-lg mx-auto">
            From inside collars to exterior box shipments—inspect our certified technical specifications designed to withstand commercial washes and transit wear.
          </p>
        </div>

        {/* Filter Navigation Menu */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedColor(cat.value)}
              className={`font-sans text-xs font-bold px-5 py-2.5 rounded-full border transition-all cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-[#171B54] text-white border-[#171B54] shadow-md'
                  : 'bg-[#F5F6FB] text-gray-600 border-transparent hover:bg-gray-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Catalog Responsive Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group flex flex-col justify-between h-full bg-[#F5F6FB]/40 hover:bg-white border border-[#E7E8F2] hover:border-amber-400 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Product Imagery */}
                <div className="h-56 overflow-hidden relative">
                  <SmartImage 
                    src={item.imageUrl} 
                    alt={item.title} 
                    productType={item.type}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-mono text-[9px] text-[#171B54] font-bold uppercase shadow-sm border border-gray-100">
                    {item.type.replace('-', ' ')}
                  </div>
                  <button 
                    onClick={() => setActiveItem(item)}
                    className="absolute inset-0 bg-[#171B54]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white font-sans font-bold text-xs gap-1.5"
                  >
                    <Eye size={16} />
                    View Technical Specs
                  </button>
                </div>

                {/* Card Body content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-black text-xl text-[#171B54] group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-gray-500 mt-2.5 leading-relaxed">
                      {item.shortDescription}
                    </p>
                  </div>

                  {/* Micro Specs List */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-gray-200/50">
                    {item.specs.slice(0, 2).map((spec, index) => (
                      <div key={index} className="flex justify-between font-sans text-[11px]">
                        <span className="text-gray-400">{spec.label}:</span>
                        <span className="font-bold text-[#171B54] truncate max-w-[150px]">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions footer */}
                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[#E31E2B] font-bold tracking-wider uppercase flex items-center gap-1">
                      <ShieldCheck size={12} />
                      Commercial washproof
                    </span>
                    <button 
                      onClick={() => handleLinkSelect(item)}
                      className="font-sans font-bold text-xs text-[#171B54] hover:text-[#E31E2B] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      Specifications
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Pop-up detailed panel */}
        <AnimatePresence>
          {activeItem && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#0f172a]/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25 }}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col justify-between text-left"
              >
                {/* Imagery cover */}
                <div className="h-60 relative shrink-0">
                  <SmartImage 
                    src={activeItem.imageUrl} 
                    alt={activeItem.title} 
                    productType={activeItem.type}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <button 
                    onClick={() => setActiveItem(null)}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 border border-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                  <div className="absolute bottom-4 left-6">
                    <span className="font-mono text-[9px] text-[#F3E5AB] uppercase tracking-widest font-bold block mb-1">
                      SPECIFICATION MANUAL
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {activeItem.title}
                    </h3>
                  </div>
                </div>

                {/* Specs Body details */}
                <div className="p-6 sm:p-8 space-y-6 flex-1">
                  <div>
                    <h4 className="font-sans font-bold text-xs text-[#171B54] uppercase tracking-wider mb-2">Technical Description</h4>
                    <p className="font-sans text-xs text-gray-500 leading-relaxed">
                      {activeItem.fullDescription}
                    </p>
                  </div>

                  {/* Split specs and highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Specs columns */}
                    <div>
                      <h4 className="font-sans font-bold text-xs text-[#171B54] uppercase tracking-wider mb-2.5">Specs Sheet</h4>
                      <div className="space-y-2.5 border-t border-gray-100 pt-2.5">
                        {activeItem.specs.map((spec, i) => (
                          <div key={i} className="flex flex-col font-sans text-xs border-b border-gray-50 pb-2">
                            <span className="text-gray-400 font-medium text-[10px] uppercase mb-0.5">{spec.label}</span>
                            <span className="font-bold text-[#171B54]">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features list */}
                    <div>
                      <h4 className="font-sans font-bold text-xs text-[#171B54] uppercase tracking-wider mb-2.5">Key Assets</h4>
                      <ul className="space-y-2 pt-2.5 border-t border-gray-100">
                        {activeItem.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 font-sans text-xs text-gray-600">
                            <Check size={14} className="text-[#E31E2B] mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 bg-[#F5F6FB] border border-[#E7E8F2] p-4 rounded-xl flex items-center gap-2">
                        <Tag size={16} className="text-[#F5A623]" />
                        <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                          Free digital proofing on order setup
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Modal action */}
                <div className="bg-[#F5F6FB] border-t border-gray-100 p-4 flex items-center justify-between shrink-0">
                  <span className="font-mono text-[10px] text-gray-400">FAISALABAD TEXTILE DIRECTORY</span>
                  <a
                    href="#contact"
                    onClick={() => setActiveItem(null)}
                    className="bg-[#171B54] hover:bg-[#1E293B] text-white font-sans font-bold text-xs px-5 py-2.5 rounded-full transition-transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Discuss Specs With Specialist
                  </a>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );

  function handleLinkSelect(item: CatalogItem) {
    setActiveItem(item);
  }
}
