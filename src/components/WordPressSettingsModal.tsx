import React, { useState, useEffect } from 'react';
import { X, Key, Globe, User, Check, Settings, ShieldCheck, Activity, Link, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WordPressConfig } from '../types';

interface WordPressSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WordPressSettingsModal({ isOpen, onClose }: WordPressSettingsModalProps) {
  const [siteUrl, setSiteUrl] = useState('');
  const [username, setUsername] = useState('');
  const [appPassword, setAppPassword] = useState('');
  const [postType, setPostType] = useState<'post' | 'page' | 'product'>('product');
  const [status, setStatus] = useState<'publish' | 'draft'>('draft');

  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; user?: any } | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load existing config from localStorage
    const stored = localStorage.getItem('pv_wordpress_config');
    if (stored) {
      try {
        const config: WordPressConfig = JSON.parse(stored);
        setSiteUrl(config.siteUrl || '');
        setUsername(config.username || '');
        setAppPassword(config.appPassword || '');
        setPostType(config.postType || 'product');
        setStatus(config.status || 'draft');
      } catch (err) {
        console.error('Error loading WordPress local config', err);
      }
    }
  }, [isOpen]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const config: WordPressConfig = {
      siteUrl: siteUrl.trim(),
      username: username.trim(),
      appPassword: appPassword.trim(),
      postType,
      status
    };
    localStorage.setItem('pv_wordpress_config', JSON.stringify(config));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const response = await fetch('/api/wordpress/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          siteUrl: siteUrl.trim(),
          username: username.trim(),
          appPassword: appPassword.trim()
        })
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setTestResult({
          success: true,
          message: resData.message,
          user: resData.user
        });
      } else {
        setTestResult({
          success: false,
          message: resData.error || 'Authentication test failed. Check URL and credentials.'
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `Could not connect to server. Error: ${err.message}`
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#171B54]/40 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-[#171B54] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Settings size={20} className="text-[#F5A623] animate-spin-slow" />
                <div>
                  <h3 className="font-display font-bold text-base tracking-tight">WordPress Integration Hub</h3>
                  <p className="text-[10px] text-gray-300 font-sans">Connect dynamic product prototypes directly to your CMS via REST API</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Form */}
            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 flex-1 text-left">
              
              {/* API Info Notice */}
              <div className="bg-[#F5F6FB] border-l-4 border-[#171B54] p-3.5 rounded-r-xl">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck size={18} className="text-[#171B54] mt-0.5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-xs text-[#171B54]">Secure Server-Side Proxying</span>
                    <span className="font-sans text-[11px] text-gray-600 leading-normal">
                      Your credentials are saved locally in your browser and proxied via our secure server route to completely bypass browser CORS locks. We never log or store your API keys on our server databases.
                    </span>
                  </div>
                </div>
              </div>

              {/* URL */}
              <div>
                <label className="block font-sans font-bold text-[11px] text-[#171B54] tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
                  <Globe size={13} className="text-gray-400" />
                  WordPress Site URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://yourwordpresssite.com"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  className="w-full font-sans text-sm border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:outline-none focus:border-[#171B54] text-[#171B54]"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">Specify the root address of your WordPress site (with or without http/https).</span>
              </div>

              {/* Username & Application Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans font-bold text-[11px] text-[#171B54] tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
                    <User size={13} className="text-gray-400" />
                    REST API Username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full font-sans text-sm border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:outline-none focus:border-[#171B54] text-[#171B54]"
                  />
                </div>
                <div>
                  <label className="block font-sans font-bold text-[11px] text-[#171B54] tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
                    <Key size={13} className="text-gray-400" />
                    Application Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={appPassword}
                    onChange={(e) => setAppPassword(e.target.value)}
                    className="w-full font-sans text-sm border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:outline-none focus:border-[#171B54] text-[#171B54] tracking-widest font-mono"
                  />
                </div>
              </div>

              {/* WP Help Info Alert */}
              <div className="text-[10px] text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-200/60 flex items-start gap-1.5">
                <HelpCircle size={14} className="text-gray-400 mt-0.5 shrink-0" />
                <span>
                  <b>How to get an Application Password:</b> Go to your WordPress Dashboard &gt; <b>Users</b> &gt; <b>Profile</b>. Scroll down to the <b>Application Passwords</b> section. Type "Print Vision" as the app name, click <b>Add New</b>, and copy the generated 16-character code.
                </span>
              </div>

              {/* Mapping / Publishing Settings */}
              <div className="border-t border-gray-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans font-bold text-[11px] text-[#171B54] tracking-wider uppercase mb-1.5">
                    Target Post Type
                  </label>
                  <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value as any)}
                    className="w-full font-sans text-sm border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:outline-none focus:border-[#171B54] text-[#171B54] cursor-pointer"
                  >
                    <option value="product">WooCommerce Product 🛍️</option>
                    <option value="post">Standard WordPress Post 📝</option>
                    <option value="page">Standard WordPress Page 📄</option>
                  </select>
                </div>
                <div>
                  <label className="block font-sans font-bold text-[11px] text-[#171B54] tracking-wider uppercase mb-1.5">
                    Publishing Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full font-sans text-sm border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:outline-none focus:border-[#171B54] text-[#171B54] cursor-pointer"
                  >
                    <option value="draft">Save as Draft (Safe) 📥</option>
                    <option value="publish">Publish Live immediately 🚀</option>
                  </select>
                </div>
              </div>

              {/* Test Result Indicator */}
              {testResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                    testResult.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}
                >
                  {testResult.success ? (
                    <>
                      {testResult.user?.avatar ? (
                        <img src={testResult.user.avatar} className="w-8 h-8 rounded-full border border-emerald-300" alt="Avatar" />
                      ) : (
                        <Check size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <p className="font-bold">WordPress Connection Operational!</p>
                        <p className="text-[11px] opacity-90">{testResult.message}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-600 font-bold">!</div>
                      <div>
                        <p className="font-bold">Connection Refused</p>
                        <p className="text-[11px] opacity-90">{testResult.message}</p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* Bottom Buttons */}
              <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row items-center gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={testing || !siteUrl || !username || !appPassword}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-sans font-bold text-xs border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Activity size={14} className={testing ? 'animate-pulse' : ''} />
                  {testing ? 'Verifying Link...' : 'Test WP Link'}
                </button>

                <button
                  type="submit"
                  disabled={saved}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-sans font-bold text-xs bg-[#171B54] text-white hover:bg-[#202773] disabled:bg-emerald-600 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  {saved ? (
                    <>
                      <Check size={14} />
                      Config Synced!
                    </>
                  ) : (
                    'Save Configuration'
                  )}
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
