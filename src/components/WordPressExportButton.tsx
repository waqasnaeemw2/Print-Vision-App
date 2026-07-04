import React, { useState } from 'react';
import { Share2, Globe, ArrowRight, CheckCircle2, RotateCw, AlertTriangle, Settings, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WordPressConfig } from '../types';
import WordPressSettingsModal from './WordPressSettingsModal';

interface WordPressExportButtonProps {
  type: 'design' | 'estimate';
  data: any;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

export default function WordPressExportButton({ 
  type, 
  data, 
  className = '', 
  variant = 'secondary' 
}: WordPressExportButtonProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncStep, setSyncStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [successLink, setSuccessLink] = useState<string | null>(null);
  const [successPostType, setSuccessPostType] = useState<string>('product');

  // Steps description
  const steps = [
    'Preparing secure local specification variables...',
    'Building responsive HTML grid & tables mockup...',
    'Authenticating with WordPress REST API credentials...',
    'Creating draft WooCommerce product / post payload...'
  ];

  const handleExport = async () => {
    setError(null);
    setSuccessLink(null);
    
    // Check local storage config
    const stored = localStorage.getItem('pv_wordpress_config');
    if (!stored) {
      // Prompt user to enter settings first
      setShowSettings(true);
      return;
    }

    let config: WordPressConfig;
    try {
      config = JSON.parse(stored);
      if (!config.siteUrl || !config.username || !config.appPassword) {
        setShowSettings(true);
        return;
      }
    } catch (err) {
      setShowSettings(true);
      return;
    }

    // Start sync animation
    setSyncing(true);
    setSyncStep(0);

    // Stagger step updates for high-fidelity UI feedback
    const advanceStep = (targetStep: number) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setSyncStep(targetStep);
          resolve();
        }, 850);
      });
    };

    try {
      await advanceStep(1);
      await advanceStep(2);
      await advanceStep(3);

      const response = await fetch('/api/wordpress/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          config,
          type,
          data
        })
      });

      const resData = await response.json();
      
      if (response.ok && resData.success) {
        setSuccessLink(resData.link);
        setSuccessPostType(resData.postType || config.postType);
      } else {
        setError(resData.error || 'The WordPress server rejected the request. Ensure correct site URL & credentials.');
      }
    } catch (err: any) {
      setError(`Network error: ${err.message}. Ensure our full-stack server is reachable.`);
    } finally {
      // Leave progress modal open for user review
    }
  };

  // Styles based on variant
  const variantStyles = {
    primary: "bg-[#171B54] text-white hover:bg-[#202773] border border-transparent shadow-md",
    secondary: "bg-white text-[#171B54] hover:bg-gray-50 border border-gray-200/80 shadow-sm",
    accent: "bg-[#E31E2B] text-white hover:bg-[#c91a25] border border-transparent shadow-md"
  };

  return (
    <>
      <button
        type="button"
        onClick={handleExport}
        className={`inline-flex items-center gap-2 font-sans font-bold text-xs rounded-xl px-5 py-3 transition-all cursor-pointer ${variantStyles[variant]} ${className}`}
      >
        <Share2 size={13.5} className="text-[#F5A623]" />
        <span>Export to WordPress API</span>
      </button>

      {/* Connection missing configuration modal */}
      <WordPressSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* Syncing/Success/Error Modal Overlay */}
      <AnimatePresence>
        {syncing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#171B54]/40 backdrop-blur-sm"
              onClick={() => {
                if (!successLink && error) setSyncing(false); // Only close on error or success
                if (successLink) setSyncing(false);
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-10 p-6 sm:p-8 text-center"
            >
              {/* Stepper active/success */}
              {!successLink && !error ? (
                <div className="space-y-6">
                  {/* Glowing Spinner */}
                  <div className="flex justify-center">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <div className="absolute inset-0 border-4 border-[#171B54]/10 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-t-[#E31E2B] border-r-[#F5A623] rounded-full animate-spin"></div>
                      <Globe size={24} className="text-[#171B54] animate-pulse" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h4 className="font-display font-bold text-base text-[#171B54]">WordPress Synchronizing</h4>
                    <p className="text-xs text-gray-400 font-mono mt-1">REST API Proxy active</p>
                  </div>

                  {/* Progressive visual steps progress indicator */}
                  <div className="space-y-3.5 text-left bg-gray-50/80 border border-gray-100 rounded-xl p-4 max-w-sm mx-auto">
                    {steps.map((stepDesc, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="mt-0.5 shrink-0 flex items-center justify-center">
                          {syncStep > idx ? (
                            <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">✓</span>
                          ) : syncStep === idx ? (
                            <div className="w-4 h-4 rounded-full border-2 border-[#E31E2B] border-t-transparent animate-spin"></div>
                          ) : (
                            <span className="w-4 h-4 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[9px] font-mono font-bold">{idx + 1}</span>
                          )}
                        </div>
                        <span className={`font-sans text-[11px] leading-relaxed ${
                          syncStep === idx 
                            ? 'text-gray-900 font-semibold' 
                            : syncStep > idx 
                            ? 'text-gray-500 line-through decoration-gray-300' 
                            : 'text-gray-400'
                        }`}>
                          {stepDesc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : successLink ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={36} />
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-lg text-[#171B54]">WordPress Export Completed!</h4>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1.5 leading-relaxed">
                      Your custom Apparel specification has been compiled, formatted with high-speed calibration markdowns, and saved as a live draft!
                    </p>
                  </div>

                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 text-left max-w-xs mx-auto">
                    <span className="block text-[9px] font-mono font-bold text-emerald-700 tracking-wider uppercase mb-1">PUBLISHED OBJECT TYPE</span>
                    <span className="font-sans font-semibold text-xs text-emerald-900 capitalize flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {successPostType === 'product' ? 'WooCommerce Product Item 🛍️' : successPostType === 'page' ? 'WordPress Static Page 📄' : 'WordPress Standard Blog Post 📝'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5 max-w-xs mx-auto">
                    <a
                      href={successLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-sans font-bold text-xs rounded-xl py-3 shadow-md hover:bg-emerald-700 transition-colors"
                    >
                      <span>View live on WordPress</span>
                      <ArrowUpRight size={14} />
                    </a>

                    <button
                      type="button"
                      onClick={() => setSyncing(false)}
                      className="w-full text-center font-sans font-bold text-[11px] text-gray-500 hover:text-gray-700 py-1 cursor-pointer transition-colors"
                    >
                      Dismiss Portal
                    </button>
                  </div>
                </motion.div>
              ) : (
                // Error State
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-red-50 border-4 border-red-100 text-red-500 flex items-center justify-center mx-auto shadow-sm">
                    <AlertTriangle size={32} />
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-lg text-[#171B54]">Export Synchronize Failed</h4>
                    <p className="text-xs text-red-600 max-w-sm mx-auto mt-2 leading-relaxed font-semibold bg-red-50/80 p-3 rounded-lg border border-red-100">
                      {error}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 max-w-xs mx-auto pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowSettings(true);
                        setSyncing(false);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-sans font-bold text-xs rounded-xl py-3 transition-colors cursor-pointer"
                    >
                      <Settings size={13.5} />
                      Adjust Credentials
                    </button>

                    <button
                      type="button"
                      onClick={handleExport}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#171B54] hover:bg-[#202773] text-white font-sans font-bold text-xs rounded-xl py-3 transition-colors cursor-pointer"
                    >
                      <RotateCw size={13} />
                      Retry Export
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSyncing(false)}
                    className="block text-center font-sans font-bold text-[11px] text-gray-400 hover:text-gray-600 mx-auto cursor-pointer"
                  >
                    Cancel Sync
                  </button>
                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
