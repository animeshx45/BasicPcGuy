import React from 'react';

export function Logo({ className = '', iconOnly = false, isDark = false, forceWhite = false, size = 'default' }) {
  // Dimensions
  const iconSizes = {
    sm: 'w-7 h-7',
    default: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const currentIconSize = iconSizes[size] || iconSizes.default;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Custom Vector PC Guy Logo Mark */}
      <div 
        className={`${currentIconSize} relative rounded-xl flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-105 shadow-sm ${
          forceWhite
            ? 'bg-gradient-to-b from-neutral-800 to-neutral-900 border border-white/25 shadow-black/40'
            : isDark 
              ? 'bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-700/80 shadow-black/40' 
              : 'bg-gradient-to-b from-neutral-900 to-neutral-950 text-white border border-neutral-800 shadow-neutral-900/20'
        }`}
      >
        <svg 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Monitor Screen Outer Bezel */}
          <rect 
            x="3" 
            y="4" 
            width="26" 
            height="18" 
            rx="3.5" 
            fill={isDark ? '#171717' : '#1e1e1e'} 
            stroke={isDark ? '#404040' : '#333333'} 
            strokeWidth="1.2" 
          />

          {/* Screen Display Area */}
          <rect 
            x="5" 
            y="6" 
            width="22" 
            height="14" 
            rx="2" 
            fill={isDark ? '#0a0a0a' : '#0f0f10'} 
          />

          {/* Stylized Desktop Graphics / Scanline & Prompt */}
          {/* Subtle Horizon hill curve (tribute to Bliss) */}
          <path 
            d="M5 16 C10 13, 16 17, 27 12 L27 20 L5 20 Z" 
            fill={isDark ? '#262626' : '#222225'} 
          />
          <path 
            d="M5 17.5 C12 15, 18 18, 27 15 L27 20 L5 20 Z" 
            fill={isDark ? '#3b82f6' : '#2563eb'} 
            opacity="0.85" 
          />

          {/* Terminal prompt symbol '> _' on screen */}
          <path 
            d="M7.5 9 L9.5 10.5 L7.5 12" 
            stroke={isDark ? '#38bdf8' : '#60a5fa'} 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <line 
            x1="11.5" 
            y1="12" 
            x2="14" 
            y2="12" 
            stroke={isDark ? '#38bdf8' : '#60a5fa'} 
            strokeWidth="1.2" 
            strokeLinecap="round" 
          />

          {/* Glowing power status LED */}
          <circle 
            cx="24.5" 
            cy="8.5" 
            r="1" 
            fill="#10b981" 
          />

          {/* Monitor Stand Neck */}
          <path 
            d="M14 22 L14 25.5 L18 25.5 L18 22" 
            fill={isDark ? '#404040' : '#2d2d2d'} 
          />

          {/* Monitor Stand Base */}
          <rect 
            x="10" 
            y="25.5" 
            width="12" 
            height="2.5" 
            rx="1.25" 
            fill={isDark ? '#525252' : '#3f3f46'} 
          />
        </svg>
      </div>

      {/* Brand Text */}
      {!iconOnly && (
        <div className="flex flex-col text-left">
          <span className={`font-semibold tracking-tight leading-none text-base sm:text-lg font-sans ${
            forceWhite ? 'text-white drop-shadow-sm' : isDark ? 'text-white' : 'text-neutral-900'
          }`}>
            Basic PC Guy
          </span>
          <span className={`text-[10px] font-mono tracking-wider uppercase mt-1 ${
            forceWhite ? 'text-white/80 drop-shadow-xs' : isDark ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Wallpapers & Hardware
          </span>
        </div>
      )}
    </div>
  );
}
