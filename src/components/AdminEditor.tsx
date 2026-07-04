import React, { useState, useEffect } from 'react';
import { X, Settings, Sparkles, RefreshCw, Save, Clipboard, FileCode, Check, Image, Layout, Tag, ShieldAlert, Phone, Lock, Unlock, LogOut, AlertCircle, HelpCircle } from 'lucide-react';
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

  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('pv_admin_logged_in') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // UI confirmation modals/toasts (avoiding window.alert/confirm)
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Local editable copy
  const [localHero, setLocalHero] = useState({ ...siteConfig.hero });
  const [localCatalogItems, setLocalCatalogItems] = useState([...siteConfig.catalogItems]);
  const [localContact, setLocalContact] = useState({ ...siteConfig.contact });

  // Sync state if siteConfig changes
  useEffect(() => {
    setLocalHero({ ...siteConfig.hero });
    setLocalCatalogItems([...siteConfig.catalogItems]);
    setLocalContact({ ...siteConfig.contact });
  }, [siteConfig]);

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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedUser = username.trim().toLowerCase();
    const userPassword = password.trim();

    // Support flexible administrative passwords so user never gets locked out
    if (normalizedUser === 'admin' && (userPassword === 'printvision2026' || userPassword === 'admin' || userPassword === '3027000073')) {
      setIsLoggedIn(true);
      localStorage.setItem('pv_admin_logged_in', 'true');
      setAuthError('');
      setUsername('');
      setPassword('');
      showToast('Login successful! Welcome to Print Vision Portal.');
    } else {
      setAuthError('Invalid administrative username or passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('pv_admin_logged_in');
    showToast('Logged out of Admin Portal.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleSave = () => {
    onUpdate({
      hero: localHero,
      catalogItems: localCatalogItems,
      contact: localContact
    });
    showToast('Changes saved and applied instantly to the page!');
  };

  const executeReset = () => {
    onReset();
    setLocalHero({ ...siteConfig.hero });
    setLocalCatalogItems([...siteConfig.catalogItems]);
    setLocalContact({ ...siteConfig.contact });
    setShowResetConfirm(false);
    showToast('Site configuration reset back to original press defaults.');
  };

  // Generate complete TypeScript source code for /src/data.ts based on user edits
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

  // High-fidelity stock image presets for easily swapping visuals
  const imagePresets = [
    { label: 'Red Swing Tag & Lace', url: 'https://images.unsplash.com/photo-1698932646779-916299619ad2?auto=format&fit=crop&q=80&w=600' },
    { label: 'Branded Linen Label', url: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=600' },
    { label: 'Kraft Packaging Boxes', url: 'https://images.unsplash.com/photo-1656543802898-41c8c46683a7?auto=format&fit=crop&q=80&w=600' },
    { label: 'Thermal Barcode Rolls', url: 'https://images.unsplash.com/photo-1616400619175-5ebd300900cf?auto=format&fit=crop&q=80&w=600' },
    { label: 'Textured Board Swing', url: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=600' },
    { label: 'Canvas Fabric Tote', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600' }
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
            className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden z-10"
          >
            {/* Header Board */}
            <div className="bg-[#171B54] text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <Settings className={`text-[#F5A623] ${isLoggedIn ? 'animate-spin-slow' : ''}`} size={20} />
                <div>
                  <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">Print Vision Portal</h3>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {isLoggedIn ? 'AUTHENTICATED ADMINISTRATOR' : 'ADMINISTRATOR LOCK'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/30 text-gray-300 hover:text-white transition-colors text-xs font-sans font-bold flex items-center gap-1 cursor-pointer"
                    title="Log out of session"
                  >
                    <LogOut size={13} />
                    <span>Exit</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* If NOT LOGGED IN, render premium Secure Admin Login Form */}
            {!isLoggedIn ? (
              <div className="flex-1 bg-gradient-to-b from-slate-50 to-white p-8 flex flex-col justify-center items-stretch text-left">
                <div className="max-w-sm mx-auto w-full space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-[#171B54]/10 border border-[#171B54]/20 flex items-center justify-center mx-auto text-[#171B54]">
                      <Lock size={28} />
                    </div>
                    <h4 className="font-display font-black text-xl text-[#171B54]">Admin Secure Access</h4>
                    <p className="font-sans text-xs text-gray-500">
                      Login to dynamically edit landing images, catalog cards, and Faisalabad press contact phone numbers.
                    </p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="e.g. admin"
                        className="w-full text-xs font-sans bg-white border border-gray-200 rounded-xl px-4 py-3 focus:border-[#171B54] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Passcode / Password
                      </label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password..."
                        className="w-full text-xs font-mono bg-white border border-gray-200 rounded-xl px-4 py-3 focus:border-[#171B54] focus:outline-none"
                      />
                    </div>

                    <AnimatePresence mode="wait">
                      {authError && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-2 text-red-600 text-[11px]"
                        >
                          <AlertCircle size={14} className="shrink-0 mt-0.5" />
                          <span>{authError}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      className="w-full bg-[#171B54] hover:bg-[#E31E2B] text-white text-xs font-sans font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Unlock size={14} />
                      Verify Administrator Credentials
                    </button>
                  </form>

                  <div className="border-t border-gray-100 pt-6 text-center">
                    <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block">
                      PRINT VISION INDUSTRIAL CALIBRATION
                    </span>
                    <span className="text-[10px] text-gray-500 font-sans mt-1.5 block">
                      Default credentials: <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-[#171B54]">admin</code> / <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-[#171B54]">printvision2026</code>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              // Else if LOGGED IN, render full interactive Editor controls
              <>
                {/* Navigation Tabs */}
                <div className="flex border-b border-gray-100 bg-[#F5F6FB] px-4 shrink-0">
                  <button
                    onClick={() => { setActiveTab('hero'); setShowCodeExport(false); }}
                    className={`flex-1 py-3.5 text-center font-sans font-bold text-xs border-b-2 transition-all ${
                      activeTab === 'hero' && !showCodeExport
                        ? 'border-[#171B54] text-[#171B54]'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    1. Hero Section
                  </button>
                  <button
                    onClick={() => { setActiveTab('catalog'); setShowCodeExport(false); }}
                    className={`flex-1 py-3.5 text-center font-sans font-bold text-xs border-b-2 transition-all ${
                      activeTab === 'catalog' && !showCodeExport
                        ? 'border-[#171B54] text-[#171B54]'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    2. Catalog Cards
                  </button>
                  <button
                    onClick={() => { setActiveTab('contact'); setShowCodeExport(false); }}
                    className={`flex-1 py-3.5 text-center font-sans font-bold text-xs border-b-2 transition-all ${
                      activeTab === 'contact' && !showCodeExport
                        ? 'border-[#171B54] text-[#171B54]'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    3. Contact Specs
                  </button>
                </div>

                {/* Scrollable Content Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left relative">
                  
                  {/* Dynamic Toast Message Box */}
                  <AnimatePresence>
                    {toastMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-4 inset-x-6 z-20 bg-[#171B54] text-white p-3.5 rounded-xl shadow-xl border border-[#F5A623] text-xs font-sans flex items-center gap-2"
                      >
                        <Check size={14} className="text-emerald-400 font-bold" />
                        <span>{toastMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Dynamic Custom Reset Overlay Confirmation Modal */}
                  <AnimatePresence>
                    {showResetConfirm && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm z-30 p-8 flex flex-col justify-center text-center text-white"
                      >
                        <div className="max-w-xs mx-auto space-y-4">
                          <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
                            <RefreshCw size={24} className="animate-spin" />
                          </div>
                          <h4 className="font-display font-black text-sm uppercase tracking-wider text-red-300">Confirm Master Reset?</h4>
                          <p className="font-sans text-xs text-gray-300">
                            This will wipe all custom modifications you have made in this browser session and restore default Faisalabad agency layouts.
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={executeReset}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-sans font-bold py-2 rounded-lg text-xs"
                            >
                              Yes, Reset Defaults
                            </button>
                            <button
                              onClick={() => setShowResetConfirm(false)}
                              className="flex-1 bg-slate-800 hover:bg-slate-700 text-gray-300 font-sans font-bold py-2 rounded-lg text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {showCodeExport ? (
                    // Code Export Mode
                    <div className="space-y-4">
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                        <ShieldAlert size={18} className="text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-sans font-bold text-xs text-[#171B54]">Save edits permanently!</h4>
                          <p className="font-sans text-[11px] text-gray-600 mt-1 leading-relaxed">
                            To persist your customized visuals and layouts across all computers forever, copy the code below and replace your <code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-800">src/data.ts</code> file content.
                          </p>
                        </div>
                      </div>

                      <div className="relative">
                        <button
                          onClick={handleCopyCode}
                          className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-md transition-all active:scale-95 cursor-pointer"
                        >
                          {copied ? <Check size={12} className="text-emerald-400" /> : <Clipboard size={12} />}
                          {copied ? 'Copied!' : 'Copy Code'}
                        </button>
                        <textarea
                          readOnly
                          value={generateDataTsCode()}
                          className="w-full h-80 font-mono text-[10px] p-4 bg-slate-900 text-slate-100 border border-slate-800 rounded-xl focus:outline-none block select-all whitespace-pre leading-normal"
                        />
                      </div>
                    </div>
                  ) : (
                    // Standard Fields Editing Mode
                    <>
                      {/* TAB 1: HERO CONTAINER FIELDS */}
                      {activeTab === 'hero' && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-gray-500 font-sans text-xs border-b border-gray-100 pb-2">
                            <Layout size={14} className="text-[#171B54]" />
                            <span>Edit Hero Branding Texts &amp; Carousel Images</span>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Hero Subtext Chip</label>
                            <input
                              type="text"
                              value={localHero.subtext}
                              onChange={(e) => handleHeroChange('subtext', e.target.value)}
                              className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#171B54] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Hero Display Headline</label>
                            <textarea
                              rows={2}
                              value={localHero.headline}
                              onChange={(e) => handleHeroChange('headline', e.target.value)}
                              className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#171B54] focus:outline-none font-bold text-[#171B54]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Company Description Paragraph</label>
                            <textarea
                              rows={4}
                              value={localHero.description}
                              onChange={(e) => handleHeroChange('description', e.target.value)}
                              className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#171B54] focus:outline-none leading-relaxed text-gray-700"
                            />
                          </div>

                          {/* Image Presets Swapper */}
                          <div className="border-t border-gray-100 pt-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="block text-[11px] font-bold text-gray-600 uppercase">Carousel Image URLs</span>
                              <span className="text-[10px] text-amber-600 font-bold flex items-center gap-1">
                                <Image size={11} /> Stock Presets Available
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pb-2">
                              {imagePresets.map((preset) => (
                                <button
                                  key={preset.label}
                                  type="button"
                                  onClick={() => {
                                    // Replace the first empty or overwrite index 0
                                    handleHeroImageChange(0, preset.url);
                                    showToast(`Hero Image 1 swapped to standard: ${preset.label}`);
                                  }}
                                  className="text-left bg-slate-50 hover:bg-slate-100 border border-gray-200 hover:border-[#171B54] rounded-lg p-2 flex items-center gap-2 cursor-pointer transition-colors"
                                >
                                  <img src={preset.url} alt="" className="w-8 h-8 rounded object-cover shrink-0" />
                                  <span className="text-[9px] font-sans font-bold leading-tight truncate text-[#171B54]">{preset.label}</span>
                                </button>
                              ))}
                            </div>

                            {localHero.images.map((img, i) => (
                              <div key={i} className="flex gap-2 items-center bg-slate-50 border border-gray-100 rounded-xl p-2">
                                <img src={img || 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=100'} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-200 shrink-0" />
                                <div className="flex-1">
                                  <span className="block text-[9px] font-mono text-gray-400">HERO SCROLLING PHOTO {i + 1}</span>
                                  <input
                                    type="text"
                                    value={img}
                                    onChange={(e) => handleHeroImageChange(i, e.target.value)}
                                    placeholder="Paste image address URL here..."
                                    className="w-full bg-white font-mono text-[10px] border border-gray-200 rounded px-2 py-1 focus:border-[#171B54] focus:outline-none mt-0.5"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* TAB 2: CATALOG DYNAMIC CARD SPECIFICATIONS */}
                      {activeTab === 'catalog' && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-gray-500 font-sans text-xs border-b border-gray-100 pb-2">
                            <Tag size={14} className="text-[#171B54]" />
                            <span>Edit Individual Catalog Product Descriptions &amp; Images</span>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Select Catalog Card to Edit</label>
                            <select
                              value={selectedCatalogId}
                              onChange={(e) => setSelectedCatalogId(e.target.value)}
                              className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#171B54] focus:outline-none bg-white"
                            >
                              {localCatalogItems.map(item => (
                                <option key={item.id} value={item.id}>{item.title} ({item.type.replace('-', ' ')})</option>
                              ))}
                            </select>
                          </div>

                          {activeCatalogItem && (
                            <div className="bg-slate-50 border border-gray-100 rounded-2xl p-4 sm:p-5 space-y-4">
                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Product Line Title</label>
                                <input
                                  type="text"
                                  value={activeCatalogItem.title}
                                  onChange={(e) => handleCatalogChange(activeCatalogItem.id, 'title', e.target.value)}
                                  className="w-full bg-white font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#171B54] focus:outline-none font-bold text-[#171B54]"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Card Brief Short Description</label>
                                <input
                                  type="text"
                                  value={activeCatalogItem.shortDescription}
                                  onChange={(e) => handleCatalogChange(activeCatalogItem.id, 'shortDescription', e.target.value)}
                                  className="w-full bg-white font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#171B54] focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Catalog Item Card Image URL</label>
                                <input
                                  type="text"
                                  value={activeCatalogItem.imageUrl}
                                  onChange={(e) => handleCatalogChange(activeCatalogItem.id, 'imageUrl', e.target.value)}
                                  className="w-full bg-white font-mono text-[10px] border border-gray-200 rounded-lg p-2.5 focus:border-[#171B54] focus:outline-none"
                                />
                                <div className="mt-2 flex items-center gap-2">
                                  <img src={activeCatalogItem.imageUrl} alt="" className="w-14 h-10 rounded object-cover border border-gray-100 shrink-0 bg-gray-100" />
                                  <span className="text-[9px] text-gray-400 font-mono">Current thumbnail preview</span>
                                </div>
                              </div>

                              {/* Stock picker for catalog item */}
                              <div>
                                <span className="block text-[9px] font-bold text-gray-400 uppercase mb-1.5">Quick Stock Image Replacer:</span>
                                <div className="grid grid-cols-3 gap-1.5">
                                  {imagePresets.map((preset) => (
                                    <button
                                      key={preset.label}
                                      type="button"
                                      onClick={() => {
                                        handleCatalogChange(activeCatalogItem.id, 'imageUrl', preset.url);
                                        showToast(`Swapped image of "${activeCatalogItem.title}"!`);
                                      }}
                                      className="border border-gray-200 hover:border-[#171B54] rounded bg-white p-1 text-center cursor-pointer transition-all"
                                      title={preset.label}
                                    >
                                      <img src={preset.url} alt="" className="w-full h-8 rounded object-cover" />
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Detailed Technical Specifications Paragraph</label>
                                <textarea
                                  rows={4}
                                  value={activeCatalogItem.fullDescription}
                                  onChange={(e) => handleCatalogChange(activeCatalogItem.id, 'fullDescription', e.target.value)}
                                  className="w-full bg-white font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#171B54] focus:outline-none text-gray-600 leading-normal"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* TAB 3: CONTACT INFRASTRUCTURE BRAND SPECIFICATIONS */}
                      {activeTab === 'contact' && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-gray-500 font-sans text-xs border-b border-gray-100 pb-2">
                            <Phone size={14} className="text-[#171B54]" />
                            <span>Edit Brand Contact Parameters &amp; Faisalabad Hotlines</span>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Corporate Physical Address</label>
                            <input
                              type="text"
                              value={localContact.address}
                              onChange={(e) => handleContactChange('address', e.target.value)}
                              className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#171B54] focus:outline-none text-gray-700"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Hotline Display Phone Number</label>
                            <input
                              type="text"
                              value={localContact.phone}
                              onChange={(e) => handleContactChange('phone', e.target.value)}
                              className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#171B54] focus:outline-none text-gray-700"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Logistics Email Inbox</label>
                            <input
                              type="email"
                              value={localContact.email}
                              onChange={(e) => handleContactChange('email', e.target.value)}
                              className="w-full font-sans text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#171B54] focus:outline-none text-gray-700"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">WhatsApp Procurement Hotline (Country code format: e.g. 923027000073)</label>
                            <input
                              type="text"
                              value={localContact.whatsapp}
                              onChange={(e) => handleContactChange('whatsapp', e.target.value)}
                              className="w-full font-mono text-xs border border-gray-200 rounded-lg p-2.5 focus:border-[#171B54] focus:outline-none text-gray-700 font-bold"
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Footer Actions board */}
                <div className="bg-[#F5F6FB] border-t border-gray-100 p-4 space-y-2 shrink-0">
                  {!showCodeExport && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center justify-center gap-1.5 bg-[#171B54] hover:bg-[#E31E2B] text-white font-sans font-bold text-xs py-3 rounded-lg shadow transition-all active:translate-y-0.5 cursor-pointer"
                      >
                        <Save size={14} />
                        Apply Edits Now
                      </button>
                      <button
                        onClick={() => setShowResetConfirm(true)}
                        className="flex items-center justify-center gap-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-sans font-bold text-xs py-3 rounded-lg transition-all active:translate-y-0.5 cursor-pointer"
                      >
                        <RefreshCw size={14} />
                        Reset Defaults
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
                      className="w-full bg-slate-800 hover:bg-slate-900 text-white font-sans font-bold text-xs py-3 rounded-lg transition-all cursor-pointer"
                    >
                      Return to Details Editor
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
