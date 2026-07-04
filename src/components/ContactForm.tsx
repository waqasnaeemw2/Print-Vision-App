import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductType, EstimateResult, CustomDesign } from '../types';

interface ContactFormProps {
  prefilledEstimate?: { type: ProductType; quantity: number; costBreakdown: EstimateResult } | null;
  prefilledDesign?: CustomDesign | null;
}

export default function ContactForm({ prefilledEstimate, prefilledDesign }: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState<string>('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Prefill details whenever estimate transfers
  useEffect(() => {
    if (prefilledEstimate) {
      setProduct(prefilledEstimate.type);
      setDetails(`Cost Estimate Selected:\n- Line: ${prefilledEstimate.type.replace('-', ' ')}\n- Quantity: ${prefilledEstimate.quantity} units\n- Est Base Price: Rs. ${prefilledEstimate.costBreakdown.basePricePerUnit}/unit\n- Est Setup Plate Fee: Rs. ${prefilledEstimate.costBreakdown.setupFee}\n- Est Production deadline: ${prefilledEstimate.costBreakdown.productionDays} Business Days\n- Est Total: Rs. ${prefilledEstimate.costBreakdown.totalPrice}`);
    }
  }, [prefilledEstimate]);

  // Prefill details whenever studio prototype transfers
  useEffect(() => {
    if (prefilledDesign) {
      setProduct(prefilledDesign.productType);
      setDetails(`Digital Prototype Specs:\n- Line: ${prefilledDesign.productType.replace('-', ' ')}\n- Brand Name Print: "${prefilledDesign.brandName}"\n- Care Tagline: "${prefilledDesign.tagline}"\n- Size Specs: ${prefilledDesign.widthMm}mm ✕ ${prefilledDesign.heightMm}mm\n- Label Finish: ${prefilledDesign.finishType}\n- Fabric Thread Base color: ${prefilledDesign.bgColor}\n- Weft Thread color: ${prefilledDesign.textColor}\n- Vol Run: ${prefilledDesign.quantity} units`);
    }
  }, [prefilledDesign]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Smooth mockup of server communication
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      
      // Open email with prefilled specifications as fallback
      const subject = encodeURIComponent(`PV Order Specs Request — ${product.toUpperCase() || 'Printing & Packaging'}`);
      const body = encodeURIComponent(
        `Hi Print Vision,\n\nI want to place an order based on these specifications:\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email}\n\n` +
        `${details}`
      );
      window.location.href = `mailto:info@printvisionpk.com?subject=${subject}&body=${body}`;
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 bg-white border-t border-[#E7E8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#171B54]/5 text-[#171B54] rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase">
            Start Your Run
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#171B54] mt-3 tracking-tight">
            Schedule Production
          </h2>
          <p className="font-sans text-sm text-gray-500 mt-2 max-w-lg mx-auto">
            Ready to transfer your prototype parameters? Populate your coordinates below and submit. Our logistics desk will review your plate casts within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Information Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-start gap-4 p-5 rounded-2xl border border-[#E7E8F2] bg-[#F5F6FB]/40">
              <div className="w-10 h-10 rounded-xl bg-[#171B54] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Phone size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-sm text-[#171B54]">Direct WhatsApp Hotline</span>
                <span className="font-mono text-sm text-gray-600 mt-1">
                  <a href="https://wa.me/923027000073" target="_blank" rel="noopener noreferrer" className="hover:text-[#E31E2B] transition-colors">
                    0302-7000073
                  </a>
                </span>
                <span className="font-sans text-[10px] text-gray-400 mt-1">Instant chat responses, 9AM to 7PM PKT</span>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl border border-[#E7E8F2] bg-[#F5F6FB]/40">
              <div className="w-10 h-10 rounded-xl bg-[#E31E2B] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Mail size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-sm text-[#171B54]">Procurement Desk Email</span>
                <span className="font-mono text-sm text-gray-600 mt-1">
                  <a href="mailto:info@printvisionpk.com" className="hover:text-[#171B54] transition-colors">
                    info@printvisionpk.com
                  </a>
                </span>
                <span className="font-sans text-[10px] text-gray-400 mt-1">For CAD files, vector PDFs, or bulk contract sheets</span>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl border border-[#E7E8F2] bg-[#F5F6FB]/40">
              <div className="w-10 h-10 rounded-xl bg-[#F5A623] flex items-center justify-center text-white shrink-0 shadow-sm">
                <MapPin size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-sm text-[#171B54]">Weaving Looms &amp; Offset Plant</span>
                <span className="font-sans text-sm text-gray-600 mt-1">
                  Eid Gah Road, Faisalabad, Pakistan
                </span>
                <span className="font-sans text-[10px] text-gray-400 mt-1">Visits available by appointment only</span>
              </div>
            </div>
          </div>

          {/* Luxury Interactive Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#171B54] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Absolute vector watermark decoration */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#E31E2B]/5 rounded-full blur-2xl -z-0"></div>

            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleSubmit} 
                  className="space-y-6 relative z-10"
                >
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="font-display font-bold text-xl">Submit Digital Invoice Specs</h3>
                    <p className="font-sans text-xs text-gray-300 mt-1">We will review your dimensions against our automated looms.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans font-bold text-[10px] text-gray-300 uppercase tracking-wider mb-2">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Waqas Naeem"
                        className="w-full font-sans text-sm border border-white/10 focus:border-[#F5A623] bg-white/5 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-sans font-bold text-[10px] text-gray-300 uppercase tracking-wider mb-2">
                        WhatsApp/Mobile (03XX)
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="03[0-9]{9}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g., 03027000073"
                        className="w-full font-mono text-sm border border-white/10 focus:border-[#F5A623] bg-white/5 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans font-bold text-[10px] text-gray-300 uppercase tracking-wider mb-2">
                      Corporate Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., procurement@brand.com"
                      className="w-full font-sans text-sm border border-white/10 focus:border-[#F5A623] bg-white/5 rounded-xl px-4 py-3 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-sans font-bold text-[10px] text-gray-300 uppercase tracking-wider mb-2">
                      Desired Product Line
                    </label>
                    <select
                      required
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      className="w-full font-sans text-sm border border-white/10 focus:border-[#F5A623] bg-white/5 rounded-xl px-4 py-3 text-white focus:outline-none [&>option]:text-black"
                    >
                      <option value="">Select a print category…</option>
                      <option value="woven-labels">Woven Labels</option>
                      <option value="printed-labels">Printed Labels</option>
                      <option value="hang-tags">Garment Hang Tags</option>
                      <option value="barcode-stickers">POS Barcode Stickers</option>
                      <option value="packaging-boxes">Custom Rigid Boxes</option>
                      <option value="insert-cards">In-Box Insert Cards</option>
                      <option value="printed-bags">Shopping Printed Bags</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans font-bold text-[10px] text-gray-300 uppercase tracking-wider mb-2">
                      Design Notes / Estimate specs
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Quantity, target fabric textures, colors requested, or transfer parameters from the Prototyping Studio above..."
                      className="w-full font-sans text-sm border border-white/10 focus:border-[#F5A623] bg-white/5 rounded-xl px-4 py-3 text-white focus:outline-none resize-y min-h-[100px]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-[#E31E2B] to-amber-500 hover:opacity-95 disabled:opacity-50 text-white font-sans font-bold text-sm py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send size={15} />
                    {submitting ? 'Connecting with Faisalabad desk...' : 'Transmit Production Specs →'}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 font-mono text-[9px] text-gray-400 uppercase tracking-widest pt-2">
                    <ShieldCheck size={12} />
                    Secure, spam-free corporate servers
                  </div>

                </motion.form>
              ) : (
                <motion.div 
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-6 relative z-10"
                >
                  <CheckCircle2 size={56} className="text-[#F5A623] animate-pulse" />
                  <div>
                    <h3 className="font-display font-bold text-2xl text-[#F3E5AB]">Transmission Successful!</h3>
                    <p className="font-sans text-xs text-gray-300 mt-2 max-w-sm leading-relaxed">
                      We have compiled your digital specifications into a draft email. Please click "Confirm Email Client" if your desktop mail app did not open automatically.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full max-w-xs pt-4">
                    <button
                      onClick={() => {
                        setSuccess(false);
                        setName('');
                        setPhone('');
                        setEmail('');
                        setProduct('');
                        setDetails('');
                      }}
                      className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-sans font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer"
                    >
                      Make Another Inquiry
                    </button>
                    <a
                      href={`mailto:info@printvisionpk.com?subject=Specs Request&body=${encodeURIComponent(details)}`}
                      className="bg-gradient-to-r from-[#F5A623] to-amber-500 text-[#171B54] font-sans font-bold text-xs py-3 rounded-xl block text-center"
                    >
                      Confirm Email Client Manual
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
