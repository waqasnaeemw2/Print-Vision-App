import React, { useState, useEffect } from 'react';
import { Sliders, HelpCircle, Calendar, ShieldCheck, DollarSign, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductType, EstimateResult } from '../types';
import { DEFAULT_PRICING_RULES } from '../data';
import Magnetic from './Magnetic';

interface EstimatorProps {
  onEstimateSelect: (estimate: { type: ProductType; quantity: number; costBreakdown: EstimateResult }) => void;
  pricingRules?: { type: string; label: string; basePrice: number; setupFee: number; productionDays: number; minQty: number }[];
}

export default function Estimator({ onEstimateSelect, pricingRules }: EstimatorProps) {
  const rulesList = pricingRules && pricingRules.length > 0 ? pricingRules : DEFAULT_PRICING_RULES;

  const [productType, setProductType] = useState<ProductType>(rulesList[0]?.type as ProductType || 'woven-labels');
  const [quantity, setQuantity] = useState(3000);
  const [widthMm, setWidthMm] = useState(55);
  const [heightMm, setHeightMm] = useState(25);
  const [premiumFinish, setPremiumFinish] = useState(false);
  const [estimate, setEstimate] = useState<EstimateResult>({
    basePricePerUnit: 0,
    totalPrice: 0,
    setupFee: 0,
    productionDays: 0,
    materialCost: 0
  });

  const products = rulesList.map(r => ({
    value: r.type as ProductType,
    label: r.label,
    minQty: r.minQty
  }));

  const [withPremiumEffects, setWithPremiumEffects] = useState(false);

  // Recalculate instantly whenever options change
  useEffect(() => {
    // Dynamic calculate function
    const selectedRule = rulesList.find(r => r.type === productType) || rulesList[0];
    if (!selectedRule) return;

    let basePricePerUnit = selectedRule.basePrice;
    let setupFee = selectedRule.setupFee;
    let productionDays = selectedRule.productionDays;
    let multiplier = 1.0;

    // Size multipliers
    const area = (widthMm * heightMm) / 1000;
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

    setEstimate({
      basePricePerUnit: finalUnitCost,
      totalPrice,
      setupFee,
      productionDays,
      materialCost
    });
  }, [productType, quantity, widthMm, heightMm, withPremiumEffects, rulesList]);

  const handleApplyEstimate = () => {
    onEstimateSelect({
      type: productType,
      quantity,
      costBreakdown: estimate
    });
  };

  return (
    <section id="estimator" className="py-16 bg-[#F5F6FB] border-t border-[#E7E8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#E31E2B]/10 text-[#E31E2B] rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase"
          >
            Instantly Translucid Costs
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-3xl sm:text-4xl text-[#171B54] mt-3 tracking-tight"
          >
            Production Cost Estimator
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm text-gray-500 mt-2 max-w-lg mx-auto"
          >
            Input parameters and compute a high-fidelity estimated quote instantly. We offer transparent pricing structures.
          </motion.p>
        </div>

        {/* Estimator Interface */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          
          {/* Controls Form Left (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E7E8F2] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Product selector grid */}
              <div>
                <label className="block font-sans font-bold text-[11px] text-[#171B54] tracking-wider uppercase mb-3">
                  1. Choose Print Line Base
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {products.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => {
                        setProductType(p.value);
                        setQuantity(p.value === 'packaging-boxes' ? 500 : 1000);
                      }}
                      className={`text-center font-sans text-xs font-bold p-3 rounded-xl border transition-all cursor-pointer ${
                        productType === p.value
                          ? 'bg-[#171B54] text-white border-[#171B54] shadow-sm'
                          : 'bg-[#F5F6FB] text-gray-700 border-transparent hover:bg-gray-100/80'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume scale */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block font-sans font-bold text-[11px] text-[#171B54] tracking-wider uppercase">
                    2. Adjust Volume Quantity (Units)
                  </label>
                  <span className="font-mono text-xs font-bold text-[#E31E2B] bg-[#E31E2B]/5 px-3 py-1 rounded-full">
                    {quantity.toLocaleString()} units
                  </span>
                </div>
                <input
                  type="range"
                  min={productType === 'packaging-boxes' ? 500 : 1000}
                  max={25000}
                  step={500}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full accent-[#171B54] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-gray-400 mt-1">
                  <span>MIN: {productType === 'packaging-boxes' ? '500' : '1,000'}</span>
                  <span>10K (Volume Discount)</span>
                  <span>25,000+ (Enterprise)</span>
                </div>
              </div>

              {/* Size Inputs and Finishes */}
              <div className="border-t border-gray-100 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Dimensions */}
                <div>
                  <label className="block font-sans font-bold text-[11px] text-[#171B54] tracking-wider uppercase mb-2">
                    3. Target Size Specs (mm)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <span className="text-[9px] font-mono text-gray-400 block mb-1">WIDTH (W)</span>
                      <input
                        type="number"
                        min={10}
                        max={300}
                        value={widthMm}
                        onChange={(e) => setWidthMm(Math.max(10, parseInt(e.target.value) || 10))}
                        className="w-full font-mono font-bold text-xs border border-[#E7E8F2] rounded-lg px-3 py-2.5 bg-[#F5F6FB] focus:outline-none focus:border-[#171B54]"
                      />
                    </div>
                    <span className="text-gray-400 font-bold mt-4">✕</span>
                    <div className="flex-1">
                      <span className="text-[9px] font-mono text-gray-400 block mb-1">HEIGHT (H)</span>
                      <input
                        type="number"
                        min={10}
                        max={300}
                        value={heightMm}
                        onChange={(e) => setHeightMm(Math.max(10, parseInt(e.target.value) || 10))}
                        className="w-full font-mono font-bold text-xs border border-[#E7E8F2] rounded-lg px-3 py-2.5 bg-[#F5F6FB] focus:outline-none focus:border-[#171B54]"
                      />
                    </div>
                  </div>
                </div>

                {/* Premium Finishes toggler */}
                <div>
                  <label className="block font-sans font-bold text-[11px] text-[#171B54] tracking-wider uppercase mb-2">
                    4. Embellishment upgrade
                  </label>
                  <button
                    type="button"
                    onClick={() => setWithPremiumEffects(!withPremiumEffects)}
                    className={`w-full text-left font-sans text-xs p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      withPremiumEffects
                        ? 'bg-amber-500/10 text-amber-900 border-amber-500'
                        : 'bg-[#F5F6FB] text-gray-500 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold">Add Gold Foil / Spot UV</span>
                      <span className="text-[10px] text-gray-400">Adds custom printing plates/dies</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      withPremiumEffects ? 'bg-amber-500 border-transparent text-white' : 'border-gray-300'
                    }`}>
                      {withPremiumEffects && '✓'}
                    </div>
                  </button>
                </div>

              </div>

            </div>

            {/* Quality assurance badges */}
            <div className="mt-8 border-t border-gray-100 pt-6 flex items-center gap-3">
              <ShieldCheck size={20} className="text-[#171B54]" />
              <p className="font-sans text-[11px] text-gray-500 leading-normal">
                Estimates are based on current raw material pricing indices in Faisalabad. Bulk delivery logistics are pre-computed in standard deadlines.
              </p>
            </div>
          </div>

          {/* Breakdown Receipt Card Right (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-stretch">
            <div className="bg-[#171B54] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-2xl relative overflow-hidden">
              
              {/* Card glossy decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-tr from-[#E31E2B]/10 to-[#F5A623]/25 rounded-full blur-2xl -z-0"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calculator size={18} className="text-[#F5A623]" />
                    <span className="font-display font-bold text-sm tracking-tight">Est Invoice Breakdown</span>
                  </div>
                  <span className="font-mono text-[9px] text-[#F3E5AB] tracking-widest uppercase">PV-Quote Proof</span>
                </div>

                {/* Big Unit Cost Display */}
                <div className="text-center py-4 border-b border-white/5 mb-6">
                  <span className="text-gray-300 font-sans text-xs uppercase tracking-wider block">Estimated Price per Unit</span>
                  <div className="flex items-baseline justify-center gap-1.5 mt-2">
                    <span className="font-display font-bold text-4xl sm:text-5xl text-[#F3E5AB]">
                      Rs. {estimate.basePricePerUnit}
                    </span>
                    <span className="font-sans text-xs text-gray-300">/ unit</span>
                  </div>
                </div>

                {/* Line Item list */}
                <div className="space-y-4 font-sans text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Target Print Line:</span>
                    <span className="font-bold uppercase tracking-wider">{productType.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Order Quantity:</span>
                    <span className="font-mono font-bold text-[#F3E5AB]">{quantity.toLocaleString()} pcs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300 flex items-center gap-1">
                      Plates &amp; Mold Setup Fee:
                      <span className="text-[9px] text-gray-400" title="One-off fee for custom printing plates & machinery setup">ⓘ</span>
                    </span>
                    <span className="font-mono">Rs. {estimate.setupFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Production Turnaround:</span>
                    <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
                      <Calendar size={13} />
                      {estimate.productionDays} Business Days
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-4 mt-2">
                    <span className="text-gray-300 font-bold text-sm">Estimated Total Range:</span>
                    <span className="font-display font-bold text-xl text-[#F5A623]">
                      Rs. {estimate.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Proceed to Form */}
              <div className="mt-8 pt-6 border-t border-white/10 relative z-10 space-y-4">
                <Magnetic>
                  <a
                    href="#contact"
                    onClick={handleApplyEstimate}
                    className="block text-center w-full bg-gradient-to-r from-[#F5A623] to-amber-500 hover:opacity-95 text-[#171B54] font-sans font-bold text-sm py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Confirm Quote &amp; Request Samples
                  </a>
                </Magnetic>

                <span className="font-mono text-[8px] text-center block text-gray-400 mt-2 uppercase tracking-widest">
                  Setup fee refunded on orders over 10,000 units
                </span>
              </div>

            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
