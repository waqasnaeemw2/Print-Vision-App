import React, { useState } from 'react';
import { X, Settings, Sparkles, RefreshCw, Save, Clipboard, FileCode, Check, Image, Layout, Tag, ShieldAlert, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CatalogItem } from '../types';

interface AdminEditorProps {
  isOpen: boolean;
  onClose: () => void;
  siteConfig: {
    hero: {
      headline: string;
      description: string;
      subtext: string;
      images: string[];
    };
    catalogItems: CatalogItem[];
    contact: {
      address: string;
      phone: string;
      email: string;
      whatsapp: string;
    };
  };
  onUpdate: (newConfig: any) => void;
  onReset: () => void;
}

export default function AdminEditor({ isOpen, onClose, siteConfig, onUpdate, onReset }: AdminEditorProps) {
  const [activeTab, setActiveTab] = useState<'hero' | 'catalog' | 'contact'>('hero');
  const [selectedCatalogId, setSelectedCatalogId] = useState<string>(siteConfig.catalogItems[0]?.id || '');
  const [copied, setCopied] = useState(false);
  const [showCodeExport, setShowCodeExport] = useState(false);

  // Local editable copy
  const [localHero, setLocalHero] = useState({ ...siteConfig.hero });
  const [localCatalogItems, setLocalCatalogItems] = useState([...siteConfig.catalogItems]);
  const [localContact, setLocalContact] = useState({ ...siteConfig.contact });

  // Handle local text inputs
  const handleHeroChange = (field: string, value: string) => {
    setLocalHero(prev => ({ ...prev, [field]: value }));
  };

  const handleHeroImageChange = (index: number, value: string) => {
    const nextImages = [...localHero.images];
    nextImages[index] = value;
    setLocalHero(prev => ({ ...prev, images: nextImages }));
  };

  const handleCatalogChange = (id: string, field: keyof CatalogItem, value: any) => {
    setLocalCatalogItems(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleContactChange = (field: string, value: string) => {
    setLocalContact(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate({
      hero: localHero,
      catalogItems: localCatalogItems,
      contact: localContact
    });
    // Trigger notification
    alert('Changes saved and applied instantly! To make them permanent, click "Export Config Code" and replace your static code.');
  };

  const handleResetClick = () => {
    if (confirm('Are you sure you want to reset all customized text and images back to defaults?')) {
      onReset();
      // Reset local states
      setLocalHero({ ...siteConfig.hero });
      setLocalCatalogItems([...siteConfig.catalogItems]);
      setLocalContact({ ...siteConfig.contact });
      onClose();
    }
  };

  // Generate complete TypeScript source code for /src/data.ts based on the active user edits!
  const generateDataTsCode = () => {
    const formattedCatalogItems = JSON.stringify(localCatalogItems, null, 2);
    
    return `import { CatalogItem } from './types';

export const CATALOG_ITEMS: CatalogItem[] = ${formattedCatalogItems};

export const FINISH_OPTIONS = {
  'woven-labels': ['Damask Standard', 'Satin Backing', 'Ultrasonic Sealed Edge', 'Metallic Thread Accent'],
  'hang-tags': ['Matte Finished Board', 'Uncoated Recycled Kraft', 'Luxury Velvet-Coated', 'Spot-UV Textured Board'],
  'barcode-stickers': ['Permanent Semi-Gloss Paper', 'Thermal Polypropylene (Waterproof)', 'Easy-Peel Removable Adhesive'],
  'packaging-boxes': ['Rigid Cardboard Kraft', 'Folding Paper Duplex', 'Rigid Board velvet Wrap', 'Slide-Out Drawer Style']
};

export const FONT_PAIRINGS = {
  serif: 'font-serif font-medium tracking-normal',
  sans: 'font-sans font-bold tracking-tight',
  display: 'font-display font-semibold tracking-tight uppercase',
  mono: 'font-mono font-medium tracking-wider'
};

export const COLOR_PRESETS = [
  { name: 'Cosmic Slate', hex: '#111827', text: '#F9FAFB' },
  { name: 'Crimson Scarlet', hex: '#E31E2B', text: '#FFFFFF' },
  { name: 'Metallic Gold', hex: '#D4AF37', text: '#111B47' },
  { name: 'Luxury Navy', hex: '#111B47', text: '#FFFFFF' },
  { name: 'Premium Cream', hex: '#FDFBF7', text: '#111B47' },
  { name: 'Emerald Velvet', hex: '#0B3C1D', text: '#E5D3B3' },
  { name: 'Carbon Black', hex: '#1C1F33', text: '#FFFFFF' }
];

// Helper formula to compute pricing instantly inside our premium UI Estimator
export function calculatePrintCost(
  type: string,
  quantity: number,
  width: number,
  height: number,
  withPremiumEffects: boolean
): { basePricePerUnit: number; totalPrice: number; setupFee: number; productionDays: number; materialCost: number } {
  let basePricePerUnit = 0.8; 
  let setupFee = 1500; 
  let productionDays = 7;
  let multiplier = 1.0;

  switch (type) {
    case 'woven-labels':
      basePricePerUnit = 2.5;
      setupFee = 2500;
      productionDays = 10;
      break;
    case 'hang-tags':
      basePricePerUnit = 3.5;
      setupFee = 1800;
      productionDays = 7;
      break;
    case 'barcode-stickers':
      basePricePerUnit = 0.4;
      setupFee = 800;
      productionDays = 4;
      break;
    case 'packaging-boxes':
      basePricePerUnit = 45.0;
      setupFee = 5000;
      productionDays = 14;
      break;
    case 'insert-cards':
      basePricePerUnit = 4.0;
      setupFee = 1200;
      productionDays = 5;
      break;
    case 'printed-bags':
      basePricePerUnit = 28.0;
      setupFee = 3500;
      productionDays = 12;
      break;
    default:
      basePricePerUnit = 5.0;
      setupFee = 1500;
  }

  // Size multipliers
  const area = (width * height) / 1000; 
  if (area > 5) {
    multiplier += (area - 5) * 0.05;
  }

  if (withPremiumEffects) {
    multiplier += 0.35; 
    productionDays += 2; 
  }

  // Volume discounts
  let volumeDiscount = 1.0;
  if (quantity >= 10000) volumeDiscount = 0.65; 
  else if (quantity >= 5000) volumeDiscount = 0.75;
  else if (quantity >= 2000) volumeDiscount = 0.85;
  else if (quantity >= 1000) volumeDiscount = 0.92;

  const finalUnitCost = Number((basePricePerUnit * multiplier * volumeDiscount).toFixed(2));
  const materialCost = Number((finalUnitCost * quantity * 0.75).toFixed(2));
  const totalPrice = Math.ceil(finalUnitCost * quantity + setupFee);

  return {
    basePricePerUnit: finalUnitCost,
    totalPrice,
    setupFee,
    productionDays,
    materialCost
  };
}
`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateDataTsCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeCatalogItem = localCatalogItems.find(item => item.id === selectedCatalogId);

  // Ready presets for images in case user wants clean replacements
  const imagePresets = [
    { label: 'Damask Woven Label', url: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=600' },
    { label: 'Bespoke Swing Tag', url: 'https://images.unsplash.com/photo-1698932646779-916299619ad2?auto=format&fit=crop&q=80&w=600' },
    { label: 'Apparel rigid packaging box', url: 'https://images.unsplash.com/photo-1656543802898-41c8c46683a7?auto=format&fit=crop&q=80&w=600' },
    { label: 'Thermal scanner sticker', url: 'https://images.unsplash.com/photo-1616400619175-5ebd300900cf?auto=format&fit=crop&q=80&w=600' },
    { label: 'Matte thank you card', url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=600' },
    { label: 'Rope shopping paper bag', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0f172a]"
          />

          {/* Sliding drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#111B47] text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Settings className="text-[#F5A623] animate-spin-slow" size={20} />
                <div>
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider">Site Administration</h3>
                  <span className="text-[10px] text-gray-400 font-mono">EDIT DETAILS &amp; CHOOSE IMAGES</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-100 bg-[#F5F6FB] px-4 shrink-0">
              <button
                onClick={() => { setActiveTab('hero'); setShowCodeExport(false); }}
                className={`flex-1 py-3.5 text-center font-sans font-bold text-xs border-b-2 transition-all ${
                  activeTab === 'hero' && !showCodeExport
                    ? 'border-[#111B47] text-[#111B47]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                1. Hero Canvas
              </button>
              <button
                onClick={() => { setActiveTab('catalog'); setShowCodeExport(false); }}
                className={`flex-1 py-3.5 text-center font-sans font-bold text-xs border-b-2 transition-all ${
                  activeTab === 'catalog' && !showCodeExport
                    ? 'border-[#111B47] text-[#111B47]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                2. Catalog Items
              </button>
              <button
                onClick={() => { setActiveTab('contact'); setShowCodeExport(false); }}
                className={`flex-1 py-3.5 text-center font-sans font-bold text-xs border-b-2 transition-all ${
                  activeTab === 'contact' && !showCodeExport
                    ? 'border-[#111B47] text-[#111B47]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                3. Brand Details
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
              {showCodeExport ? (
                // Code Export Mode
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <ShieldAlert size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-sans font-bold text-xs text-[#111B47]">Save changes permanently!</h4>
                      <p className="font-sans text-[11px] text-gray-600 mt-1 leading-relaxed">
                        To save your edits permanently so that they load even if you clear your browser cache, copy the generated TS code below and paste it to completely replace the code inside your <code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-800">src/data.ts</code> file.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      onClick={handleCopyCode}
                      className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-md transition-all active:scale-95"
                    >
                      {copied ? <Check size={12} className="text-emerald-400" /> : <Clipboard size={12} />}
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                    <textarea
                      readOnly
                      value={generateDataTsCode()}
                      className="w-full h-80 font-mono text-[10px] bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 focus:outline-none overflow-y-auto block select-all"
                    />
                  </div>

                  <button
                    onClick={() => setShowCodeExport(false)}
                    className="w-full text-center bg-gray-100 hover:bg-gray-200 text-[#111B47] font-sans font-bold text-xs py-3 rounded-lg transition-all"
                  >
                    ← Back to Editing Details
                  </button>
                </div>
              ) : (
                <>
                  {/* TAB 1: HERO CANVAS */}
                  {activeTab === 'hero' && (
                    <div className="space-y-5">
                      <div className="bg-[#111B47]/5 border border-[#111B47]/10 rounded-xl p-3">
                        <span className="font-mono text-[10px] font-bold text-[#111B47] block">SECTION: HERO BLOCK</span>
                        <span className="text-[11px] text-gray-500 leading-relaxed block mt-0.5">Edit main title, taglines and primary images showing in the top collage.</span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Elite Chip (Top subtext)</label>
                        <input
                          type="text"
                          value={localHero.subtext}
                          onChange={(e) => handleHeroChange('subtext', e.target.value)}
                          className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#111B47] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Headline Text</label>
                        <textarea
                          rows={3}
                          value={localHero.headline}
                          onChange={(e) => handleHeroChange('headline', e.target.value)}
                          className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#111B47] focus:outline-none resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Hero Description</label>
                        <textarea
                          rows={4}
                          value={localHero.description}
                          onChange={(e) => handleHeroChange('description', e.target.value)}
                          className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#111B47] focus:outline-none resize-none leading-relaxed"
                        />
                      </div>

                      {/* Image URLs collage */}
                      <div className="space-y-3.5 border-t border-gray-100 pt-4">
                        <label className="block text-[11px] font-bold text-[#111B47] uppercase tracking-wide">
                          Collage Images (Top Showcase)
                        </label>
                        
                        {localHero.images.map((imgUrl, idx) => (
                          <div key={idx} className="bg-slate-50 border border-gray-100 rounded-xl p-3 space-y-2">
                            <span className="font-mono text-[9px] text-gray-400 block uppercase font-bold">Showcase Image {idx + 1}</span>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={imgUrl}
                                onChange={(e) => handleHeroImageChange(idx, e.target.value)}
                                className="flex-1 font-mono text-[10px] border border-gray-200 bg-white rounded-lg px-2 py-1.5 focus:outline-none"
                                placeholder="Paste image URL here..."
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: CATALOG ITEMS */}
                  {activeTab === 'catalog' && (
                    <div className="space-y-5">
                      <div className="bg-[#111B47]/5 border border-[#111B47]/10 rounded-xl p-3">
                        <span className="font-mono text-[10px] font-bold text-[#111B47] block">SECTION: APPAREL ACCESSORY CATALOG</span>
                        <span className="text-[11px] text-gray-500 leading-relaxed block mt-0.5">Customize title, specs, and image URL for each main accessory.</span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1.5">Select Product to Edit</label>
                        <select
                          value={selectedCatalogId}
                          onChange={(e) => setSelectedCatalogId(e.target.value)}
                          className="w-full font-sans text-xs border border-gray-200 bg-white rounded-lg p-2.5 focus:border-[#111B47] focus:outline-none"
                        >
                          {localCatalogItems.map(item => (
                            <option key={item.id} value={item.id}>{item.title} ({item.type})</option>
                          ))}
                        </select>
                      </div>

                      {activeCatalogItem && (
                        <div className="space-y-4 border-t border-gray-100 pt-4">
                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Product Title</label>
                            <input
                              type="text"
                              value={activeCatalogItem.title}
                              onChange={(e) => handleCatalogChange(selectedCatalogId, 'title', e.target.value)}
                              className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#111B47] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Short Description</label>
                            <textarea
                              rows={2}
                              value={activeCatalogItem.shortDescription}
                              onChange={(e) => handleCatalogChange(selectedCatalogId, 'shortDescription', e.target.value)}
                              className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#111B47] focus:outline-none resize-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Technical Specs Detail</label>
                            <textarea
                              rows={3}
                              value={activeCatalogItem.fullDescription}
                              onChange={(e) => handleCatalogChange(selectedCatalogId, 'fullDescription', e.target.value)}
                              className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#111B47] focus:outline-none resize-none leading-relaxed"
                            />
                          </div>

                          {/* Image URL with live presets */}
                          <div className="space-y-2">
                            <label className="block text-[11px] font-bold text-[#111B47] uppercase tracking-wide">Product Image URL</label>
                            <input
                              type="text"
                              value={activeCatalogItem.imageUrl}
                              onChange={(e) => handleCatalogChange(selectedCatalogId, 'imageUrl', e.target.value)}
                              className="w-full font-mono text-[10px] border border-gray-200 rounded-lg p-2.5 focus:outline-none bg-slate-50"
                              placeholder="Unsplash URL or image link..."
                            />

                            {/* Presets Row to quickly replace broken images with working, styled ones */}
                            <div>
                              <span className="block text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Working Presets (Auto-fix bad links)</span>
                              <div className="flex flex-wrap gap-1.5">
                                {imagePresets.map((preset, pIdx) => (
                                  <button
                                    key={pIdx}
                                    type="button"
                                    onClick={() => handleCatalogChange(selectedCatalogId, 'imageUrl', preset.url)}
                                    className="inline-flex items-center gap-1 bg-gray-100 hover:bg-amber-100 border border-transparent hover:border-amber-300 rounded px-2 py-1 text-[9px] font-sans text-gray-600 transition-colors"
                                  >
                                    <Image size={10} className="text-[#F5A623]" />
                                    {preset.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: CONTACT BRAND DETAILS */}
                  {activeTab === 'contact' && (
                    <div className="space-y-5">
                      <div className="bg-[#111B47]/5 border border-[#111B47]/10 rounded-xl p-3">
                        <span className="font-mono text-[10px] font-bold text-[#111B47] block">SECTION: BRAND LOGISTICS DESK</span>
                        <span className="text-[11px] text-gray-500 leading-relaxed block mt-0.5">Update procurement hotline coordinates rendered in header and footer.</span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Physical Office Address</label>
                        <input
                          type="text"
                          value={localContact.address}
                          onChange={(e) => handleContactChange('address', e.target.value)}
                          className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#111B47] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Procurement Direct Dial Phone</label>
                        <input
                          type="text"
                          value={localContact.phone}
                          onChange={(e) => handleContactChange('phone', e.target.value)}
                          className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#111B47] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Logistics Email Inbox</label>
                        <input
                          type="email"
                          value={localContact.email}
                          onChange={(e) => handleContactChange('email', e.target.value)}
                          className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#111B47] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">WhatsApp Procurement Hotline (Standard format: e.g. 923027000073)</label>
                        <input
                          type="text"
                          value={localContact.whatsapp}
                          onChange={(e) => handleContactChange('whatsapp', e.target.value)}
                          className="w-full font-mono text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#111B47] focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer buttons */}
            <div className="bg-[#F5F6FB] border-t border-gray-100 p-4 space-y-2 shrink-0">
              {!showCodeExport && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center justify-center gap-1.5 bg-[#111B47] hover:bg-[#1E293B] text-white font-sans font-bold text-xs py-3 rounded-lg shadow transition-all active:translate-y-0.5 cursor-pointer"
                  >
                    <Save size={14} />
                    Apply Changes
                  </button>
                  <button
                    onClick={handleResetClick}
                    className="flex items-center justify-center gap-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-sans font-bold text-xs py-3 rounded-lg transition-all active:translate-y-0.5 cursor-pointer"
                  >
                    <RefreshCw size={14} />
                    Reset to Defaults
                  </button>
                </div>
              )}

              {!showCodeExport ? (
                <button
                  onClick={() => setShowCodeExport(true)}
                  className="w-full flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-sans font-bold text-xs py-3 rounded-lg shadow transition-all active:translate-y-0.5 cursor-pointer"
                >
                  <FileCode size={14} />
                  Export permanent src/data.ts Code
                </button>
              ) : (
                <button
                  onClick={() => setShowCodeExport(false)}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-sans font-bold text-xs py-3 rounded-lg transition-all"
                >
                  Return to Details Editor
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
