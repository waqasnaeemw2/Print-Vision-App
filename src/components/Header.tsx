import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShoppingBag, Eye, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  phone?: string;
}

export default function Header({ onScrollToSection, phone = "0302-7000073" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Branding Studio', id: 'studio' },
    { name: 'Digital Catalog', id: 'catalog' },
    { name: 'Cost Estimator', id: 'estimator' },
    { name: 'Why Print Vision', id: 'why' },
    { name: 'Get a Quote', id: 'contact' },
    { name: 'Admin Portal 🔒', id: 'admin' }
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onScrollToSection(id);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 shadow-sm border-b border-[#E7E8F2]/80 backdrop-blur-md py-3' 
        : 'bg-white/50 border-b border-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo Brandmark */}
          <div className="cursor-pointer py-1" onClick={() => handleLinkClick('top')}>
            <Logo height={42} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="font-sans font-semibold text-sm text-gray-700 hover:text-[#171B54] relative py-1 transition-colors cursor-pointer group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F5A623] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Call-to-action actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`} 
              className="hidden xl:flex items-center gap-2 font-mono text-xs font-semibold text-[#171B54] bg-[#F5F6FB] hover:bg-[#E7E8F2] border border-[#E7E8F2] rounded-full px-4 py-2 transition-all cursor-pointer"
            >
              <Phone size={14} className="text-[#E31E2B]" />
              {phone}
            </a>
            <button 
              onClick={() => handleLinkClick('contact')}
              className="flex items-center gap-2 font-sans font-bold text-xs bg-gradient-to-r from-[#171B54] to-[#1E293B] text-white hover:opacity-95 rounded-full px-5 py-2.5 shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              Request Sample Kit
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-[#171B54] transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer (Smooth slide-down) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-b border-[#E7E8F2] overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3 flex flex-col">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="w-full text-left font-sans font-semibold text-base text-gray-700 hover:text-[#171B54] py-2 border-b border-gray-50 hover:pl-2 transition-all cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a 
                  href="tel:03027000073" 
                  className="flex items-center justify-center gap-2 font-mono text-sm font-semibold text-[#171B54] bg-[#F5F6FB] border border-[#E7E8F2] rounded-full py-3"
                >
                  <Phone size={15} className="text-[#E31E2B]" />
                  0302-7000073
                </a>
                <button 
                  onClick={() => handleLinkClick('contact')}
                  className="w-full font-sans font-bold text-sm bg-[#171B54] text-white text-center rounded-full py-3"
                >
                  Get Immediate Pricing
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
