import React, { useState } from 'react';
import { Sparkles, HelpCircle, Layers, Sliders, Check, FileText, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomDesign, ProductType } from '../types';
import { COLOR_PRESETS, FONT_PAIRINGS, FINISH_OPTIONS } from '../data';

interface StudioProps {
  onDesignSubmit: (design: CustomDesign) => void;
}

export default function Studio({ onDesignSubmit }: StudioProps) {
  const [productType, setProductType] = useState<ProductType>('woven-labels');
  const [brandName, setBrandName] = useState('CREATIVE COUTURE');
  const [tagline, setTagline] = useState('100% ORGANIC COTTON • MADE IN PK');
  const [fontStyle, setFontStyle] = useState<'serif' | 'sans' | 'display' | 'mono'>('display');
  const [selectedColor, setSelectedColor] = useState(COLOR_PRESETS[3]); // Luxury Navy
  const [customBg, setCustomBg] = useState(COLOR_PRESETS[3].hex);
  const [customText, setCustomText] = useState(COLOR_PRESETS[3].text);
  const [widthMm, setWidthMm] = useState(65);
  const [heightMm, setHeightMm] = useState(25);
  const [finish, setFinish] = useState('Damask Standard');
  const [quantity, setQuantity] = useState(2000);
  const [success, setSuccess] = useState(false);

  const productTabs: { id: ProductType; label: string }[] = [
    { id: 'woven-labels', label: 'Woven Label' },
    { id: 'satin-labels', label: 'Satin Label' },
    { id: 'printed-labels', label: 'Printed Care Label' },
    { id: 'hang-tags', label: 'Apparel Hang Tag' },
    { id: 'barcode-stickers', label: 'Barcode Sticker' },
    { id: 'packaging-boxes', label: 'Cardboard Box' },
    { id: 'insert-cards', label: 'In-Box Card' },
    { id: 'printed-bags', label: 'Printed Paper Bag' }
  ];

  const STUDIO_FINISH_OPTIONS: Record<string, string[]> = {
    'woven-labels': ['Damask Standard', 'Satin Backing', 'Ultrasonic Sealed Edge', 'Metallic Thread Accent'],
    'satin-labels': ['Polyester Satin Loop', 'Soft Edge Satin Flat', 'Center-Fold Satin Ribbon'],
    'printed-labels': ['Nylon Taffeta Print', 'Cotton Care Weave', 'Poly-Cotton Comfort Tape'],
    'hang-tags': ['Matte Finished Board', 'Uncoated Recycled Kraft', 'Luxury Velvet-Coated', 'Spot-UV Textured Board'],
    'barcode-stickers': ['Permanent Semi-Gloss Paper', 'Thermal Polypropylene (Waterproof)', 'Easy-Peel Removable Adhesive'],
    'packaging-boxes': ['Rigid Cardboard Kraft', 'Folding Paper Duplex', 'Rigid Board Velvet Wrap', 'Slide-Out Drawer Style'],
    'insert-cards': ['Heavy Matte Coated', 'Spot UV Textured Card', 'Eco Recycled Paperboard'],
    'printed-bags': ['Art Paper Matt Lam', 'Craft Paper Natural Twist', 'Premium Gloss Laminated']
  };

  const handleProductTypeChange = (type: ProductType) => {
    setProductType(type);
    const options = STUDIO_FINISH_OPTIONS[type] || [];
    setFinish(options[0] || '');
    if (type === 'woven-labels') {
      setWidthMm(65);
      setHeightMm(25);
    } else if (type === 'satin-labels') {
      setWidthMm(60);
      setHeightMm(30);
    } else if (type === 'printed-labels') {
      setWidthMm(50);
      setHeightMm(20);
    } else if (type === 'hang-tags') {
      setWidthMm(50);
      setHeightMm(90);
    } else if (type === 'barcode-stickers') {
      setWidthMm(50);
      setHeightMm(25);
    } else if (type === 'packaging-boxes') {
      setWidthMm(220);
      setHeightMm(160);
    } else if (type === 'insert-cards') {
      setWidthMm(100);
      setHeightMm(150);
    } else if (type === 'printed-bags') {
      setWidthMm(250);
      setHeightMm(350);
    }
  };

  const handlePresetColor = (preset: typeof COLOR_PRESETS[0]) => {
    setSelectedColor(preset);
    setCustomBg(preset.hex);
    setCustomText(preset.text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalDesign: CustomDesign = {
      productType,
      brandName: brandName.toUpperCase(),
      tagline: tagline.toUpperCase(),
      fontStyle,
      textColor: customText,
      bgColor: customBg,
      finishType: finish,
      widthMm,
      heightMm,
      quantity
    };
    onDesignSubmit(finalDesign);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section id="studio" className="py-10 bg-white border-t border-[#E7E8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-[#F5A623]/10 text-[#171B54] rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase">
            Interactive Design Room
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl mt-2 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#171B54] via-[#E31E2B] to-[#F5A623]">
              The Digital Prototyping Canvas
            </span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 mt-1 max-w-lg mx-auto">
            Design your custom labeling or packaging layout live. Toggle finishes, sizes, and instant estimated parameters below.
          </p>
        </div>

        {/* Dynamic Canvas Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Left Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-[#F5F6FB]/70 border border-[#E7E8F2] rounded-2xl p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product Selection Tab Bar */}
              <div>
                <label className="block font-sans font-bold text-[10px] text-[#171B54] tracking-wider uppercase mb-1.5">
                  Select Product Base
                </label>
                <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin scrollbar-thumb-gray-200" style={{ scrollbarWidth: 'thin' }}>
                  {productTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleProductTypeChange(tab.id)}
                      className={`whitespace-nowrap font-sans text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all cursor-pointer shrink-0 ${
                        productType === tab.id
                          ? 'bg-[#171B54] text-white border-[#171B54] shadow-sm'
                          : 'bg-white text-gray-600 border-[#E7E8F2] hover:bg-gray-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography Input Card */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-[#E7E8F2]">
                <div className="border-b border-gray-100 pb-1.5">
                  <span className="font-sans font-bold text-xs text-[#171B54]">Label Typography</span>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Brand Name / Headline</label>
                  <input
                    type="text"
                    maxLength={25}
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full font-sans text-sm border border-[#E7E8F2] rounded-lg px-3 py-2 bg-[#F5F6FB] focus:outline-none focus:border-[#171B54] text-[#171B54] font-semibold uppercase"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Tagline / Fabric Care Subtext</label>
                  <input
                    type="text"
                    maxLength={35}
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full font-sans text-xs border border-[#E7E8F2] rounded-lg px-3 py-2 bg-[#F5F6FB] focus:outline-none focus:border-[#171B54] text-gray-600 uppercase"
                  />
                </div>
              </div>

              {/* Font Style Selection */}
              <div>
                <label className="block font-sans font-bold text-[11px] text-[#171B54] tracking-wider uppercase mb-2">
                  Typography Style
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['display', 'serif', 'sans', 'mono'] as const).map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setFontStyle(style)}
                      className={`font-mono text-[10px] uppercase font-bold p-2.5 rounded-lg border transition-all cursor-pointer ${
                        fontStyle === style
                          ? 'bg-[#171B54]/10 text-[#171B54] border-[#171B54]'
                          : 'bg-white text-gray-500 border-[#E7E8F2] hover:bg-gray-50'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Presets */}
              <div>
                <label className="block font-sans font-bold text-[11px] text-[#171B54] tracking-wider uppercase mb-2">
                  Luxury Thread &amp; Board Colors
                </label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handlePresetColor(preset)}
                      style={{ backgroundColor: preset.hex }}
                      className="w-8 h-8 rounded-full border border-gray-200 shadow-sm relative focus:outline-none transition-transform hover:scale-110 cursor-pointer flex items-center justify-center"
                      title={preset.name}
                    >
                      {customBg === preset.hex && (
                        <Check size={14} style={{ color: preset.text }} className="font-bold" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Finishing Technique & Dimensions Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans font-bold text-[11px] text-[#171B54] tracking-wider uppercase mb-1.5">
                    Finish Pattern
                  </label>
                  <select
                    value={finish}
                    onChange={(e) => setFinish(e.target.value)}
                    className="w-full font-sans text-xs border border-[#E7E8F2] bg-white rounded-lg px-2.5 py-2.5 text-gray-700 focus:outline-none"
                  >
                    {(STUDIO_FINISH_OPTIONS[productType] || []).map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-sans font-bold text-[11px] text-[#171B54] tracking-wider uppercase mb-1.5">
                    Specs Dimensions (mm)
                  </label>
                  <div className="flex items-center gap-1.5 bg-white border border-[#E7E8F2] rounded-lg px-2.5 py-1.5">
                    <input
                      type="number"
                      min={10}
                      max={400}
                      value={widthMm}
                      onChange={(e) => setWidthMm(Math.max(10, parseInt(e.target.value) || 10))}
                      className="w-10 text-center font-mono text-xs focus:outline-none text-[#171B54] font-bold"
                    />
                    <span className="text-gray-400 text-[10px]">✕</span>
                    <input
                      type="number"
                      min={10}
                      max={400}
                      value={heightMm}
                      onChange={(e) => setHeightMm(Math.max(10, parseInt(e.target.value) || 10))}
                      className="w-10 text-center font-mono text-xs focus:outline-none text-[#171B54] font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Order Quantities Slider */}
              <div className="bg-white p-4 rounded-xl border border-[#E7E8F2]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-sans font-bold text-xs text-[#171B54]">Production Vol (Units)</span>
                  <span className="font-mono text-xs font-bold text-[#E31E2B] bg-[#E31E2B]/5 px-2.5 py-0.5 rounded-full">
                    {quantity.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={productType === 'packaging-boxes' ? 500 : 1000}
                  max={20000}
                  step={500}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full accent-[#171B54] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-gray-400 mt-1">
                  <span>MIN: {productType === 'packaging-boxes' ? '500' : '1,000'}</span>
                  <span>MAX: 20,000+</span>
                </div>
              </div>

              {/* Submit / Populate Quote */}
              <button
                type="submit"
                className="w-full text-center bg-gradient-to-r from-[#171B54] to-[#1E293B] text-white font-sans font-bold text-sm py-4 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                Send Prototype to Quote Form
              </button>

            </form>
          </div>

          {/* Interactive Live Mock Preview Canvas (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Combined Preview + Spec Readout Card Block */}
            <div className="w-full rounded-2xl border border-[#E7E8F2] flex flex-col relative shadow-md overflow-hidden bg-[#F5F6FB] h-[340px] sm:h-[370px]">
              
              {/* The active vector canvas area */}
              <div className="w-full flex-1 p-4 sm:p-6 flex items-center justify-center relative overflow-hidden">
                {/* Blurred background photo of premium fabric/textile */}
                {/* PLACEHOLDER IMAGE — replace with real Print Vision photography */}
                <img 
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?fm=jpg&q=80&w=800&auto=format&fit=crop" 
                  alt="Background texture" 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover blur-[5px] opacity-15 scale-105 pointer-events-none" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#E7E8F2]/40 via-[#F5F6FB]/70 to-white/40 pointer-events-none"></div>

                <div className="absolute top-3 left-4 font-mono text-[9px] text-gray-400 uppercase tracking-widest pointer-events-none">
                  PREVIEW PRE-PROOF CANVAS
                </div>
                <div className="absolute top-3 right-4 flex items-center gap-1 bg-[#171B54]/5 border border-[#171B54]/10 rounded-full px-2.5 py-0.5 pointer-events-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="font-mono text-[8px] text-[#171B54] font-bold">LIVE VECTOR Proof</span>
                </div>

                {/* Dynamic Mock Content Renderer */}
                <AnimatePresence mode="wait">
                <motion.div
                  key={productType + fontStyle + customBg + customText + brandName}
                  initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.95, rotateY: 15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative flex items-center justify-center w-full h-full"
                >
                  
                  {/* Woven Apparel Label Render */}
                  {productType === 'woven-labels' && (
                    <div 
                      style={{ 
                        backgroundColor: customBg, 
                        color: customText,
                        width: `${Math.min(280, widthMm * 4.0)}px`,
                        height: `${Math.min(140, heightMm * 4.0)}px`
                      }}
                      className="rounded shadow-2xl relative flex flex-col justify-center px-6 border-y-2 border-dashed border-white/20 select-none overflow-hidden"
                    >
                      {/* Realistic Press border guidelines */}
                      <div className="absolute inset-1 border border-dashed border-current opacity-30 pointer-events-none rounded"></div>
                      
                      <div className="text-center relative z-10">
                        <h4 className={`${FONT_PAIRINGS[fontStyle]} text-base sm:text-lg break-words leading-tight uppercase`}>
                          {brandName || 'BRAND NAME'}
                        </h4>
                        {tagline && (
                          <p className="font-mono text-[8px] uppercase mt-2 opacity-80 tracking-wider">
                            {tagline}
                          </p>
                        )}
                      </div>

                      {/* Press technical alignment lines overlay */}
                      <div className="absolute inset-y-0 right-2 w-1.5 flex flex-col justify-between py-2 opacity-25">
                        <div className="h-0.5 w-full bg-current"></div>
                        <div className="h-0.5 w-full bg-current"></div>
                        <div className="h-0.5 w-full bg-current"></div>
                      </div>
                    </div>
                  )}

                  {/* Satin Labels Render */}
                  {productType === 'satin-labels' && (
                    <div 
                      style={{ 
                        background: `linear-gradient(90deg, ${customBg} 0%, rgba(255,255,255,0.15) 50%, ${customBg} 100%)`, 
                        backgroundColor: customBg,
                        color: customText,
                        width: `${Math.min(280, widthMm * 4.0)}px`,
                        height: `${Math.min(140, heightMm * 4.0)}px`
                      }}
                      className="rounded-md shadow-2xl relative flex flex-col justify-center px-8 border-y border-white/30 select-none overflow-hidden"
                    >
                      {/* Satin ribbon gleam effect */}
                      <div className="absolute inset-y-0 left-1/4 w-1 bg-white/20 blur-[2px] pointer-events-none"></div>
                      <div className="absolute inset-y-0 right-1/4 w-2 bg-white/10 blur-[4px] pointer-events-none"></div>
                      <div className="text-center relative z-10">
                        <h4 className={`${FONT_PAIRINGS[fontStyle]} text-base sm:text-lg break-words leading-tight uppercase font-medium tracking-wide`}>
                          {brandName || 'BRAND NAME'}
                        </h4>
                        {tagline && (
                          <p className="font-mono text-[8px] uppercase mt-2 opacity-90 tracking-wider">
                            {tagline}
                          </p>
                        )}
                      </div>
                      <div className="absolute bottom-2 right-3 font-mono text-[7px] opacity-40">SATIN GLOSS</div>
                    </div>
                  )}

                  {/* Printed Care Labels Render */}
                  {productType === 'printed-labels' && (
                    <div 
                      style={{ 
                        backgroundColor: '#FAFAFA', 
                        color: '#222222',
                        width: `${Math.min(280, widthMm * 4.0)}px`,
                        height: `${Math.min(140, heightMm * 4.0)}px`
                      }}
                      className="rounded shadow-xl relative flex flex-col justify-between p-4 border border-gray-200 select-none overflow-hidden"
                    >
                      <div className="absolute inset-1 border border-dashed border-gray-300 pointer-events-none"></div>
                      <div className="text-center mt-1 z-10">
                        <h4 className={`${FONT_PAIRINGS[fontStyle]} text-sm sm:text-base break-words font-black tracking-tight text-gray-800 uppercase`}>
                          {brandName || 'BRAND NAME'}
                        </h4>
                        <p className="font-mono text-[7px] text-gray-500 uppercase tracking-widest mt-0.5">
                          CARE INSTRUCTIONS
                        </p>
                      </div>
                      
                      {/* Washing symbols row */}
                      <div className="flex items-center justify-center gap-3 my-2 text-gray-600 opacity-80 shrink-0">
                        <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
                          <path d="M4 10c1 0 2-1 3-1s2 1 3 1 2-1 3-1 2 1 3 1" />
                          <path d="M2 11l2 8h16l2-8" />
                        </svg>
                        <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
                          <polygon points="12,3 22,21 2,21" />
                        </svg>
                        <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
                          <path d="M7 19h12a3 3 0 0 0 3-3V11a3 3 0 0 0-3-3H7a5 5 0 0 0-5 5v3a3 3 0 0 0 3 3z" />
                          <path d="M17 11h.01" />
                        </svg>
                        <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="9" />
                        </svg>
                      </div>

                      <div className="text-center border-t border-gray-100 pt-1">
                        <p className="font-mono text-[8px] text-gray-400 break-words leading-tight uppercase">
                          {tagline || '100% COTTON • WASH COLD'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Apparel Hang Tag Render */}
                  {productType === 'hang-tags' && (
                    <div className="relative mt-8">
                      {/* Hanging string */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-amber-800/60 z-0"></div>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-amber-900/30 bg-[#F5F6FB]"></div>
                      
                      {/* Main card body */}
                      <div 
                        style={{ 
                          backgroundColor: customBg, 
                          color: customText,
                          width: `${Math.min(180, widthMm * 3.0)}px`,
                          height: `${Math.min(240, heightMm * 2.5)}px`
                        }}
                        className="rounded-xl shadow-2xl relative flex flex-col justify-between p-5 z-10 border border-black/10 select-none overflow-hidden"
                      >
                        {/* Eyelet hole */}
                        <div className="w-3 h-3 rounded-full bg-[#F5F6FB] border border-black/15 shadow-inner mx-auto mb-1 shrink-0 relative flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-transparent border border-amber-800/40"></div>
                        </div>

                        {/* Mid print */}
                        <div className="text-center my-auto">
                          <h4 className={`${FONT_PAIRINGS[fontStyle]} text-base sm:text-lg break-words uppercase leading-tight`}>
                            {brandName || 'BRAND NAME'}
                          </h4>
                        </div>

                        {/* Bottom technical barcode print */}
                        <div className="mt-2 border-t border-current/20 pt-2 flex flex-col items-center">
                          <p className="font-mono text-[7px] uppercase tracking-widest opacity-85 text-center leading-normal">
                            {tagline || '100% SECURE BRANDED RUN'}
                          </p>
                          <div className="barcode-accent opacity-50 w-full max-w-[100px] mt-1.5 h-3"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Barcode Stickers Render */}
                  {productType === 'barcode-stickers' && (
                    <div 
                      style={{ 
                        backgroundColor: '#FFFFFF', 
                        color: '#111827',
                        width: `${Math.min(280, widthMm * 4.0)}px`,
                        height: `${Math.min(140, heightMm * 4.0)}px`
                      }}
                      className="rounded-lg shadow-xl relative flex flex-col justify-between p-4 border border-gray-200 select-none overflow-hidden"
                    >
                      {/* Header block */}
                      <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                        <span className="font-display font-bold text-[9px] text-[#171B54] uppercase tracking-tight">
                          {brandName || 'BRAND NAME'}
                        </span>
                        <span className="font-mono text-[7px] text-gray-400">MODEL PK-990</span>
                      </div>

                      {/* Scanner Line */}
                      <div className="my-auto flex flex-col items-center">
                        <div className="barcode-accent w-full max-w-[180px] text-[#111827] h-8"></div>
                        <span className="font-mono text-[8px] tracking-[0.3em] mt-1 text-[#111827] font-bold">
                          *PV-{quantity}-2026*
                        </span>
                      </div>

                      {/* Bottom disclaimer */}
                      <div className="flex justify-between items-center text-[7px] font-mono text-gray-500 pt-1 border-t border-gray-55">
                        <span>QTY EST: {quantity.toLocaleString()}</span>
                        <span className="font-bold text-[#E31E2B] uppercase">{finish}</span>
                      </div>
                    </div>
                  )}

                  {/* Rigid Box Gift Packs Mock Fold */}
                  {productType === 'packaging-boxes' && (
                    <div className="relative">
                      {/* Box Shadow Back Wall */}
                      <div className="absolute -inset-2 bg-slate-900/10 rounded-2xl blur-md"></div>
                      
                      {/* Top Lid fold */}
                      <div 
                        style={{ 
                          backgroundColor: customBg, 
                          color: customText,
                          width: `${Math.min(240, widthMm * 1.2)}px`,
                          height: `${Math.min(180, heightMm * 1.2)}px`
                        }}
                        className="rounded-2xl shadow-2xl relative flex flex-col justify-between p-6 border-r-4 border-b-4 border-black/10 select-none overflow-hidden"
                      >
                        {/* Lid groove lines */}
                        <div className="absolute top-0 inset-x-0 h-1 bg-black/5"></div>
                        <div className="absolute left-0 inset-y-0 w-1 bg-black/5"></div>

                        {/* Crest */}
                        <div className="border border-current/15 rounded-xl p-3 flex flex-col items-center justify-center my-auto">
                          <h4 className={`${FONT_PAIRINGS[fontStyle]} text-sm sm:text-base break-words leading-tight uppercase text-center`}>
                            {brandName || 'BRAND NAME'}
                          </h4>
                          {tagline && (
                            <p className="font-mono text-[7px] uppercase mt-1 opacity-70 tracking-wider text-center">
                              {tagline}
                            </p>
                          )}
                        </div>

                        {/* Label Finish */}
                        <div className="flex justify-between items-center font-mono text-[7px] opacity-60">
                          <span>DIMS: {widthMm}x{heightMm}mm</span>
                          <span className="uppercase text-[6px] bg-white/10 px-1.5 py-0.5 rounded">
                            {finish}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* In-Box Card Render */}
                  {productType === 'insert-cards' && (
                    <div 
                      style={{ 
                        backgroundColor: customBg, 
                        color: customText,
                        width: `${Math.min(180, widthMm * 2.0)}px`,
                        height: `${Math.min(240, heightMm * 1.5)}px`
                      }}
                      className="rounded-2xl shadow-2xl relative flex flex-col justify-between p-5 border-4 border-double border-current/20 select-none overflow-hidden"
                    >
                      <div className="absolute inset-1.5 border border-current/10 rounded-lg"></div>
                      <div className="text-center mt-2 z-10">
                        <div className="flex justify-center mb-1">
                          <Sparkles size={14} className="text-amber-500 animate-pulse" />
                        </div>
                        <h4 className={`${FONT_PAIRINGS[fontStyle]} text-base sm:text-lg break-words leading-tight uppercase tracking-wide`}>
                          {brandName || 'THANK YOU'}
                        </h4>
                      </div>

                      <div className="my-auto text-center px-1 z-10">
                        <p className="font-serif italic text-[11px] leading-relaxed opacity-90">
                          "Your support means the world to our Faisalabad weavers. We hope you love your new garment."
                        </p>
                      </div>

                      <div className="border-t border-current/10 pt-2 text-center z-10">
                        <p className="font-mono text-[7px] uppercase tracking-widest opacity-80">
                          {tagline || 'USE CODE: THANKYOU10'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Printed Paper Bag Render */}
                  {productType === 'printed-bags' && (
                    <div className="relative mt-8">
                      {/* Cord handles */}
                      <div className="absolute -top-10 left-[35%] w-0.5 h-10 bg-gray-400 rounded"></div>
                      <div className="absolute -top-10 left-[65%] w-0.5 h-10 bg-gray-400 rounded"></div>
                      <div className="absolute -top-10 left-[35%] right-[35%] h-3 border-t-2 border-x-2 border-gray-400 rounded-t-xl"></div>
                      
                      <div 
                        style={{ 
                          backgroundColor: customBg, 
                          color: customText,
                          width: `${Math.min(200, widthMm * 0.8)}px`,
                          height: `${Math.min(240, heightMm * 0.7)}px`
                        }}
                        className="rounded-t shadow-2xl relative flex flex-col justify-between p-5 border-b-4 border-black/15 select-none overflow-hidden"
                      >
                        {/* Top handle rivets */}
                        <div className="flex justify-around px-6 mt-1 shrink-0">
                          <div className="w-2 h-2 rounded-full bg-black/30 flex items-center justify-center">
                            <div className="w-0.5 h-0.5 rounded-full bg-black/60"></div>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-black/30 flex items-center justify-center">
                            <div className="w-0.5 h-0.5 rounded-full bg-black/60"></div>
                          </div>
                        </div>

                        {/* Brand emblem */}
                        <div className="border border-current/15 rounded-full p-2 w-12 h-12 flex items-center justify-center mx-auto my-auto aspect-square">
                          <h4 className={`${FONT_PAIRINGS[fontStyle]} text-[9px] break-words leading-tight uppercase text-center`}>
                            {brandName ? brandName.split(' ')[0] : 'BRAND'}
                          </h4>
                        </div>

                        <div className="mt-auto border-t border-current/10 pt-2 text-center">
                          <h5 className={`${FONT_PAIRINGS[fontStyle]} text-[10px] tracking-wider font-bold uppercase`}>
                            {brandName || 'BRAND NAME'}
                          </h5>
                          <p className="font-mono text-[6px] uppercase tracking-widest mt-0.5 opacity-70">
                            {tagline || 'FAISALABAD PACKAGING'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
              </div>

              {/* Combined Spec readout card inside the main card at the bottom */}
              <div className="bg-white/85 backdrop-blur-sm border-t border-[#E7E8F2] px-5 py-2.5 flex items-center justify-between text-left shrink-0 z-10">
                <div className="flex items-center gap-2.5">
                  <FileText size={14} className="text-[#171B54]" />
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-[11px] text-[#171B54]">Prototype Specs Locked</span>
                    <span className="font-sans text-[10px] text-gray-500 leading-none mt-0.5">Dimensions ready for custom plates.</span>
                  </div>
                </div>
                <div className="font-mono text-xs text-[#E31E2B] font-bold">
                  {widthMm}✕{heightMm}mm
                </div>
              </div>

            </div>

            {/* Short review trust line instead of technical calibration card */}
            <div className="mt-3 text-center">
              <span className="font-sans text-[11px] text-gray-400">
                ✓ Your specs are reviewed by our production team before any print run begins
              </span>
            </div>

          </div>

        </div>

        {/* Informational Toast Message */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 right-6 z-50 bg-[#171B54] text-white px-6 py-4 rounded-xl shadow-2xl border border-[#F5A623] flex items-center gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-sm">Design Transferred!</span>
                <span className="font-sans text-xs text-gray-300">We have populated the Quote Form below with your customized specs.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
