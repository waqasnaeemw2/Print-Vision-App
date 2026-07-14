import { CatalogItem } from './types';

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'woven-labels-1',
    type: 'woven-labels',
    title: 'High-Density Damask Woven Labels',
    shortDescription: 'Ultra-fine weave textile branding with silky-smooth finished edges.',
    fullDescription: 'The gold standard in apparel branding. Loomed using premium 50-denier polyester threads in ultra-high density (up to 120 threads/cm). Available with sonic-seal hot cut edges to prevent neck irritation, and finished in centerfold, end-fold, or loop configurations.',
    imageUrl: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Density', value: 'Damask High-Density (50D)' },
      { label: 'Material', value: '100% Cotton-Soft Polyester' },
      { label: 'Edge Finish', value: 'Ultrasonic Soft Cut / Heat Cut' },
      { label: 'Folds Offered', value: 'Centerfold, End Fold, Loop Fold, Miter Fold' }
    ],
    features: ['Up to 8 colors per design', 'Non-fade dyes', 'OEKO-TEX® Standard 100 Certified', 'Extreme skin comfort']
  },
  {
    id: 'hang-tags-1',
    type: 'hang-tags',
    title: 'Luxury Die-Cut Hang Tags',
    shortDescription: 'Heavyweight cardstock with bespoke textured paper and gold-gilt edges.',
    fullDescription: 'Elevate your clothing line with heavy-duty luxury swing tags. Made from 400-700 GSM premium boards, imported kraft, or eco-conscious textured paper. Fully customizable with matte/gloss lamination, spot UV, gold foil stamping, and complete eyelet string attachments.',
    imageUrl: 'https://images.unsplash.com/photo-1698932646779-916299619ad2?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Weight Range', value: '350 GSM to 800 GSM Duplex board' },
      { label: 'Special Effects', value: 'Spot UV, Hot Foil (Gold/Silver), Debossing' },
      { label: 'String Types', value: 'Waxed Cotton, Elastic, Nylon Cord, Brass Pin' },
      { label: 'Eyelet Options', value: 'Metal Eyelet (Gold/Black/Silver), No Eyelet' }
    ],
    features: ['Crisp offset colour fidelity', 'FSC-Certified eco papers available', 'Custom contour die-cut shapes', 'Pre-assembled options']
  },
  {
    id: 'packaging-boxes-1',
    type: 'packaging-boxes',
    title: 'Premium Rigid Apparel & Gift Boxes',
    shortDescription: 'Eco-friendly kraft and luxury cardboard gift packaging.',
    fullDescription: 'Unboxing is where loyalty is made. Our packaging boxes are custom engineered from thick cardboard wrapped in premium paper, designed for blankets, bedsheets, luxury apparel, and wedding registry packs. Feature solid structural design and precision magnetic closures.',
    imageUrl: 'https://images.unsplash.com/photo-1656543802898-41c8c46683a7?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Style', value: 'Lid & Tray, Magnetic Bookcase, Folding Flat-pack' },
      { label: 'Lining Options', value: 'Tissue paper inlay, molded velvet, raw kraft' },
      { label: 'Minimum Order', value: '500 units' },
      { label: 'Finishing', value: 'Anti-scratch matte lamination, textured cloth wrap' }
    ],
    features: ['Structural strength for shipping', 'Sourced from high-density rigid board', '100% recyclable materials', 'Custom dimensions']
  },
  {
    id: 'barcode-stickers-1',
    type: 'barcode-stickers',
    title: 'Precision Thermal Barcode Stickers',
    shortDescription: 'Scan-accurate retail pricing and inventory stickers.',
    fullDescription: 'Eliminate scanning failures at the check-out register. Print Vision manufactures highly accurate barcoding stickers with long-lasting premium adhesives. We print linear (Code 128, EAN) or matrix barcodes (QR Codes) on gloss paper or tear-proof polyester sheets.',
    imageUrl: 'https://images.unsplash.com/photo-1616400619175-5ebd300900cf?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Adhesive Grade', value: 'High-tack permanent, peelable/removable' },
      { label: 'Print Resolution', value: '600 DPI crisp scan thermal print' },
      { label: 'Format Type', value: 'Roll form (automatic application) or Sheet form' },
      { label: 'Standard Sizes', value: '38mm x 25mm, 50mm x 25mm (Fully customizable)' }
    ],
    features: ['Zero smudge ink technology', 'Perfect readability on all POS scanner laser grades', 'Pre-sequenced serial printing', 'Moisture resistant']
  },
  {
    id: 'satin-labels-1',
    type: 'satin-labels',
    title: 'Premium Silky Satin Printed Labels',
    shortDescription: 'Luxurious silky-soft printed brand ribbons for high-end shirts and activewear.',
    fullDescription: 'Add an elegant, soft feel to your apparel. Our silky satin printed labels are manufactured using premium double-face satin ribbons. Printed using wash-resistant, non-fade ink to survive rigorous washing cycles while providing premium skin comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Ribbon Type', value: 'Double-Face Silky Polyester Satin' },
      { label: 'Print Ink', value: 'Anti-Fade Eco Wash Resistant Inks' },
      { label: 'Folds Offered', value: 'Loop Fold, Flat Ribbon Cut, Centerfold' },
      { label: 'Edge Style', value: 'Pre-Sealed Ultrasonic Soft-Cut' }
    ],
    features: ['Silky soft skin contact', 'High-definition text legibility', 'Withstands harsh enzyme washes']
  },
  {
    id: 'printed-bags-1',
    type: 'printed-bags',
    title: 'Crafted Printed Paper Shopping Bags',
    shortDescription: 'Reinforced paper carrier bags with bespoke custom rope handles.',
    fullDescription: 'Turn every customer walking out of your boutique into a mobile billboard. Our high-end paper shopping bags feature fully printed interiors, reinforced base card inserts, and hand-knotted cotton rope or ribbon handles.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    specs: [
      { label: 'Rope Types', value: 'PP Cord, Cotton Flat Ribbon, Twined Kraft Handle' },
      { label: 'Reinforcement', value: 'Splayed bottom card & heavy turn-top card' },
      { label: 'Load Limit', value: 'Up to 7 kg depending on size' },
      { label: 'Eco Profile', value: 'Water-based eco inks, biodegradable' }
    ],
    features: ['Satin-smooth or rustic kraft paper bases', 'Fully customizable side-gusset prints', 'Luxury retail-ready construction']
  }
];

export const DEFAULT_PRICING_RULES = [
  { type: 'woven-labels', label: 'Woven Labels', basePrice: 2.5, setupFee: 2500, productionDays: 10, minQty: 1000 },
  { type: 'printed-labels', label: 'Printed Tape Labels', basePrice: 1.5, setupFee: 1200, productionDays: 6, minQty: 1000 },
  { type: 'hang-tags', label: 'Apparel Hang Tags', basePrice: 3.5, setupFee: 1800, productionDays: 7, minQty: 1000 },
  { type: 'barcode-stickers', label: 'Barcode POS Stickers', basePrice: 0.4, setupFee: 800, productionDays: 4, minQty: 2000 },
  { type: 'packaging-boxes', label: 'Rigid Cardboard Boxes', basePrice: 45.0, setupFee: 5000, productionDays: 14, minQty: 500 },
  { type: 'satin-labels', label: 'Premium Satin Labels', basePrice: 2.0, setupFee: 1000, productionDays: 5, minQty: 1000 },
  { type: 'printed-bags', label: 'Laminated Paper Bags', basePrice: 28.0, setupFee: 3500, productionDays: 12, minQty: 1000 }
];

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
  let basePricePerUnit = 0.8; // PK Rs equivalent indicator scale or cent-indicator scaled
  let setupFee = 1500; // Rs setup fee indicator
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
    case 'satin-labels':
      basePricePerUnit = 2.0;
      setupFee = 1000;
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
  const area = (width * height) / 1000; // normalized scale
  if (area > 5) {
    multiplier += (area - 5) * 0.05;
  }

  if (withPremiumEffects) {
    multiplier += 0.35; // foil/spot UV adds 35% to unit cost
    productionDays += 2; // custom dyes/plates take longer
  }

  // Volume discounts
  let volumeDiscount = 1.0;
  if (quantity >= 10000) volumeDiscount = 0.65; // 35% discount
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
