import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  inverse?: boolean;
  height?: number;
}

export default function Logo({ className = '', iconOnly = false, inverse = false, height = 40 }: LogoProps) {
  // Brand Colors
  const blueColor = inverse ? '#FFFFFF' : '#212A85'; // Deep brand blue
  const redColor = inverse ? '#FF5E62' : '#E31E2B';  // Brand red
  const goldColor = '#F1AC19';                        // Brand gold/yellow
  const greyColor = inverse ? 'rgba(255,255,255,0.7)' : '#5A5B5E';
  const lineColor = inverse ? 'rgba(255,255,255,0.3)' : '#8A8C8E';

  // Scale calculations for inline rendering
  const width = iconOnly ? height : (height * 3.4);

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`} style={{ height: `${height}px` }}>
      {/* Stylized P brandmark with overlapping swooshes */}
      <svg 
        viewBox="0 0 100 100" 
        style={{ height: '100%', width: 'auto' }} 
        className="shrink-0 overflow-visible"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Stem of "P" (Red with bottom gradient) */}
        <path 
          d="M38 12 C44 12 60 12 66 12 C82 12 88 23 88 35 C88 47 78 57 65 57 C58 57 53 57 48 57 L41 90 L18 90 L38 12 Z" 
          fill={redColor} 
        />
        
        {/* Dark Blue Shadow/Gradient overlay at the very bottom left stem for 3D look */}
        <path 
          d="M41 90 L18 90 L26 56 C26 56 31 75 41 90 Z" 
          fill="#110B4F" 
          opacity="0.3"
        />

        {/* Separator Gap (White outline simulation to give perfect contrast overlay) */}
        <path 
          d="M14 42 C20 48 40 50 56 38 C75 24 88 15 94 15 C80 34 58 58 35 68 C22 73 14 71 8 64 Z" 
          fill={inverse ? '#171B54' : '#FFFFFF'} 
          className="transition-colors duration-300"
        />

        {/* Overlapping Blue Checkmark Swoosh */}
        <path 
          d="M16 44 C22 50 38 51 54 40 C72 26 86 16 92 16 C80 33 59 55 37 64 C24 69 16 67 10 60 Z" 
          fill={blueColor} 
        />

        {/* Overlapping Gold swoosh bottom loop */}
        <path 
          d="M13 50 C20 63 32 80 57 80 C74 80 84 70 87 60 C81 65 72 70 59 70 C38 70 23 58 13 50 Z" 
          fill={goldColor} 
        />
      </svg>

      {/* Brand Text Columns */}
      {!iconOnly && (
        <div className="flex flex-col justify-center h-full text-left font-sans">
          {/* Main Name ROW */}
          <div className="flex items-baseline font-bold tracking-tight uppercase" style={{ fontSize: `${height * 0.42}px`, lineHeight: 1.1 }}>
            <span style={{ color: blueColor }}>PRINT</span>
            <span style={{ color: redColor, marginLeft: '4px' }}>VISION</span>
          </div>
          
          {/* Thin grey separator line */}
          <div className="w-full my-0.5" style={{ height: '1.2px', backgroundColor: lineColor }} />

          {/* Subtext description tagline */}
          <span 
            className="font-medium tracking-wide italic" 
            style={{ 
              color: greyColor, 
              fontSize: `${height * 0.17}px`, 
              lineHeight: 1.1,
              whiteSpace: 'nowrap'
            }}
          >
            Branding, Printing & Packaging Solutions
          </span>
        </div>
      )}
    </div>
  );
}
