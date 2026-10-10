import React from 'react';

// Helper to extract image URL from any wallpaper object or field
export function getWallpaperImage(wp) {
  if (!wp) return null;
  if (typeof wp === 'string') return wp;

  // 1. Direct image properties
  if (wp.imageUrl) return wp.imageUrl;
  if (wp.image) return wp.image;
  if (wp.poster) return wp.poster;
  if (wp.posterImage) return wp.posterImage;
  if (wp.coverImage) return wp.coverImage;
  if (wp.thumbnail) return wp.thumbnail;

  // 2. If bgType is already a URL or image path
  if (typeof wp.bgType === 'string' && (
    wp.bgType.startsWith('http://') || 
    wp.bgType.startsWith('https://') || 
    wp.bgType.startsWith('/') ||
    /\.(png|jpe?g|webp|svg|gif|avif)/i.test(wp.bgType)
  )) {
    return wp.bgType;
  }

  // 3. Extract from downloads (handles both object and stringified JSON format)
  if (wp.downloads) {
    let dl = wp.downloads;
    if (typeof dl === 'string') {
      try {
        const clean = dl.replace(/'/g, '"');
        dl = JSON.parse(clean);
      } catch {
        const match = dl.match(/https?:\/\/[^\s"',]+\.(png|jpe?g|webp|svg|gif|avif)/i) || dl.match(/https?:\/\/[^\s"',]+/i);
        if (match) return match[0];
      }
    }
    if (typeof dl === 'object' && dl !== null) {
      const priorities = ['desktop-4k', 'desktop-8k', 'ultrawide', 'surface', 'mobile'];
      for (const k of priorities) {
        if (dl[k]?.url) return dl[k].url;
      }
      for (const val of Object.values(dl)) {
        if (typeof val === 'string' && val.startsWith('http')) return val;
        if (val?.url) return val.url;
      }
    }
  }

  // 4. Fallback to bgType procedural name if present
  if (wp.bgType) return wp.bgType;

  return null;
}

export function WallpaperGraphic({ type, wallpaper, className = '' }) {
  const [imageError, setImageError] = React.useState(false);

  // Resolve target source from wallpaper object or type argument
  const target = wallpaper 
    ? getWallpaperImage(wallpaper) 
    : (typeof type === 'object' && type !== null ? getWallpaperImage(type) : type);

  // If target is a direct image URL (http, https, data:, relative, or file path)
  const isImageUrl = typeof target === 'string' && (
    target.startsWith('http://') || 
    target.startsWith('https://') || 
    target.startsWith('/') || 
    target.startsWith('./') ||
    target.startsWith('data:') ||
    target.startsWith('blob:') ||
    /\.(png|jpe?g|webp|svg|gif|avif)(\?.*)?$/i.test(target)
  );

  if (isImageUrl && !imageError) {
    // Normalize relative path if needed
    const resolvedSrc = target.startsWith('http') || target.startsWith('/') || target.startsWith('data:') || target.startsWith('blob:')
      ? target
      : `/${target}`;

    return (
      <div className={`relative overflow-hidden w-full h-full bg-neutral-900 ${className}`}>
        <img
          src={resolvedSrc}
          alt="Wallpaper Preview"
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  switch (target) {
    case 'mosaic':
      return (
        <div className={`relative overflow-hidden w-full h-full bg-[#1e1b4b] ${className}`}>
          {/* Vibrant Vector Mosaic matching the user's screenshot */}
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradCyan" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="gradOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff5722" />
                <stop offset="100%" stopColor="#ff9800" />
              </linearGradient>
              <linearGradient id="gradPinkPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e91e63" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="gradBluePurple" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id="gradRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="25%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="75%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="gradLimeYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#84cc16" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
              <linearGradient id="gradSun" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
              <linearGradient id="gradVioletCyan" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>

            {/* Top row elements */}
            {/* Top left arch */}
            <path d="M0,0 L120,0 L120,180 A60,60 0 0,1 60,240 L0,240 Z" fill="url(#gradCyan)" stroke="#ffffff" strokeWidth="2.5" />
            <path d="M60,120 A60,60 0 0,1 180,120 L180,240 L60,240 Z" fill="url(#gradBluePurple)" stroke="#ffffff" strokeWidth="2.5" />
            
            {/* Center-left arch */}
            <path d="M180,120 L300,120 L300,240 L180,240 Z" fill="url(#gradOrange)" stroke="#ffffff" strokeWidth="2.5" />
            <path d="M180,0 L300,0 L300,120 A60,60 0 0,0 240,60 L180,120 Z" fill="url(#gradLimeYellow)" stroke="#ffffff" strokeWidth="2.5" />

            {/* Center wavy horizon */}
            <path d="M120,0 L320,0 L320,100 Q400,140 480,90 Q560,40 640,90 L640,0 Z" fill="url(#gradSun)" stroke="#ffffff" strokeWidth="2.5" />
            
            {/* Top-right arch */}
            <path d="M480,90 A80,80 0 0,1 640,90 L640,240 L480,240 Z" fill="url(#gradPinkPurple)" stroke="#ffffff" strokeWidth="2.5" />
            <path d="M640,0 L800,0 L800,200 A80,80 0 0,1 720,280 L640,280 Z" fill="url(#gradVioletCyan)" stroke="#ffffff" strokeWidth="2.5" />

            {/* Middle Section: Waves & Geo blocks */}
            <path d="M0,240 Q150,180 300,260 T600,230 Q700,270 800,220 L800,340 L0,340 Z" fill="url(#gradRainbow)" stroke="#ffffff" strokeWidth="3" />
            
            {/* Large Semi-circle Sun */}
            <circle cx="200" cy="340" r="90" fill="url(#gradOrange)" stroke="#ffffff" strokeWidth="3" />

            {/* Triangles & Grid in Center */}
            <path d="M320,240 L460,240 L460,380 L320,380 Z" fill="url(#gradBluePurple)" stroke="#ffffff" strokeWidth="2.5" />
            <polygon points="320,240 460,380 320,380" fill="url(#gradCyan)" stroke="#ffffff" strokeWidth="2.5" />
            <polygon points="320,240 460,240 460,380" fill="url(#gradSun)" stroke="#ffffff" strokeWidth="2.5" />

            {/* Bottom Section Curves & Arches */}
            <path d="M0,340 Q180,440 360,360 T720,400 L800,380 L800,500 L0,500 Z" fill="url(#gradPinkPurple)" stroke="#ffffff" strokeWidth="3" />
            
            <circle cx="300" cy="480" r="70" fill="url(#gradLimeYellow)" stroke="#ffffff" strokeWidth="3" />
            <circle cx="680" cy="460" r="90" fill="url(#gradBluePurple)" stroke="#ffffff" strokeWidth="3" />
            <path d="M460,340 L600,340 L600,500 L460,500 Z" fill="url(#gradOrange)" stroke="#ffffff" strokeWidth="2.5" />
            <path d="M460,380 A60,60 0 0,1 580,380 L580,500 L460,500 Z" fill="url(#gradCyan)" stroke="#ffffff" strokeWidth="2.5" />
          </svg>
        </div>
      );

    case 'lil-pc-guy':
      return (
        <div className={`relative overflow-hidden w-full h-full bg-[#9c6644] ${className}`}>
          {/* Corkboard texture background */}
          <div 
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage: 'radial-gradient(#b07d5b 15%, transparent 16%), radial-gradient(#875438 15%, transparent 16%)',
              backgroundColor: '#a36d4b',
              backgroundPosition: '0 0, 8px 8px',
              backgroundSize: '16px 16px'
            }}
          />

          {/* Film Photo pinned on left */}
          <div className="absolute top-6 left-12 w-32 h-44 bg-neutral-900 rounded-sm shadow-xl p-2 transform -rotate-3 border border-neutral-800 flex flex-col justify-between">
            <div className="w-full h-28 bg-neutral-950 rounded-xs flex items-center justify-center overflow-hidden border border-neutral-800/60">
              <div className="w-12 h-14 bg-amber-200/90 rounded-lg flex flex-col items-center justify-center p-1 shadow-sm">
                <div className="w-8 h-6 bg-blue-500 rounded-md flex items-center justify-center text-[7px] font-bold text-white">
                  :)
                </div>
                <div className="w-5 h-4 bg-amber-300 rounded-b-md mt-1" />
              </div>
            </div>
            <div className="h-4 flex items-center justify-between px-1">
              <span className="text-[6px] font-mono text-neutral-400">EXP 2026</span>
              <span className="text-[6px] font-mono text-neutral-400">PC-01</span>
            </div>
          </div>

          {/* Large Die-cut Mascot Sticker on left-center */}
          <div className="absolute top-10 left-6 z-20 transform -rotate-6 filter drop-shadow-lg">
            <div className="bg-white p-1 rounded-2xl border-2 border-white shadow-md">
              <div className="w-24 h-28 bg-[#60a5fa] rounded-xl flex flex-col items-center justify-between p-2 relative overflow-hidden">
                {/* Two-tone Face like the Finder / PC buddy */}
                <div className="absolute inset-y-0 left-0 w-1/2 bg-[#2563eb]" />
                
                {/* Antenna / Floppy button */}
                <div className="w-3 h-3 rounded-full bg-red-500 border border-white z-10 -mt-1 shadow-xs" />
                
                {/* Screen Eyes & Smile */}
                <div className="z-10 flex items-center justify-center gap-3 mt-4">
                  <div className="w-2 h-2.5 rounded-full bg-neutral-900" />
                  <div className="w-2 h-2.5 rounded-full bg-neutral-900" />
                </div>
                <div className="z-10 w-4 h-2 border-b-2 border-neutral-900 rounded-full mb-2" />

                {/* Feet */}
                <div className="z-10 flex gap-2">
                  <div className="w-4 h-3 bg-white rounded-t-sm" />
                  <div className="w-4 h-3 bg-white rounded-t-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Pinned White Sketch Sheet on right */}
          <div className="absolute top-8 right-6 w-56 h-48 bg-white/95 rounded-lg shadow-2xl p-3 transform rotate-2 border border-neutral-200">
            {/* Red Pushpin */}
            <div className="absolute -top-2 right-12 w-4 h-4 rounded-full bg-red-600 border border-red-800 shadow-md flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-red-300" />
            </div>

            {/* Pencil Sketches of PC Mascot variations */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-neutral-300/80 rounded p-1.5 flex flex-col items-center justify-center bg-neutral-50/50">
                  <div className="w-7 h-6 rounded border border-neutral-500 flex items-center justify-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                  </div>
                  <div className="w-3 h-0.5 bg-neutral-400 mt-1" />
                </div>
              ))}
            </div>
            <div className="mt-2 text-right">
              <span className="text-[8px] font-mono text-neutral-400">LIL_PC_GUY // DRAFT 4</span>
            </div>
          </div>
        </div>
      );

    case 'bliss':
      return (
        <div className={`relative overflow-hidden w-full h-full bg-[#0284c7] ${className}`}>
          {/* Sky Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0284c7] via-[#38bdf8] to-[#bae6fd]" />
          <div className="absolute top-[15%] left-[8%] w-[42%] h-[28%] bg-white/60 blur-xl rounded-full pointer-events-none" />
          <div className="absolute top-[20%] right-[12%] w-[48%] h-[32%] bg-white/50 blur-2xl rounded-full pointer-events-none" />
          <svg viewBox="0 0 1000 600" className="absolute bottom-0 left-0 w-full h-[68%]" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hillBack" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#84cc16" />
                <stop offset="100%" stopColor="#4d7c0f" />
              </linearGradient>
              <linearGradient id="hillFront" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a3e635" />
                <stop offset="50%" stopColor="#65a30d" />
                <stop offset="100%" stopColor="#3f6212" />
              </linearGradient>
            </defs>
            <path d="M0,320 Q240,160 520,240 T1000,180 L1000,600 L0,600 Z" fill="url(#hillBack)" opacity="0.9" />
            <path d="M0,280 Q320,110 680,260 T1000,210 L1000,600 L0,600 Z" fill="url(#hillFront)" />
          </svg>
        </div>
      );

    case 'silicon':
      return (
        <div className={`relative overflow-hidden w-full h-full bg-[#09090b] ${className}`}>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, #3f3f46 1px, transparent 1px),
                linear-gradient(to right, #18181b 1px, transparent 1px),
                linear-gradient(to bottom, #18181b 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
          <div className="absolute inset-[14%] border border-amber-500/25 rounded-lg p-3 grid grid-cols-4 gap-2 bg-neutral-900/40 backdrop-blur-xs">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border border-amber-600/30 rounded p-1.5 flex flex-col justify-between bg-black/50">
                <span className="text-[7px] font-mono text-amber-400">CCX_0{i}</span>
                <div className="h-1 w-full bg-amber-500/30 rounded-xs" />
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-3 flex justify-between px-4 text-[8px] font-mono text-neutral-500">
            <span>5nm LITHOGRAPHY</span>
            <span className="text-amber-500/80">INFINITY FABRIC</span>
          </div>
        </div>
      );

    case 'bios':
      return (
        <div className={`relative overflow-hidden w-full h-full bg-[#022c22] ${className}`}>
          <div className="absolute inset-3 border border-teal-500/35 rounded flex flex-col justify-between p-3.5 bg-[#042f2e]/90 font-mono">
            <div className="space-y-1 text-[9px] text-teal-300/90 leading-tight">
              <div className="text-teal-200 font-bold tracking-wider">PHOENIX - AWARD BIOS v4.51PG</div>
              <div className="text-teal-400/70 text-[8px]">MAIN SETUP UTILITY • NO MEMORY ERROR</div>
              <div className="h-px bg-teal-500/30 my-1.5" />
              <div className="flex justify-between text-[8px]">
                <span>Base Memory: 640 KB</span>
                <span className="text-teal-200">Extended: 65472 KB</span>
              </div>
              <div className="text-teal-300/80 text-[8px] mt-1">&gt; DEL: Enter Setup | F1: Continue</div>
            </div>
            <div className="text-right text-[8px] text-teal-400/60">
              BASIC_PC_GUY // RETRO
            </div>
          </div>
        </div>
      );

    case 'topo':
      return (
        <div className={`relative overflow-hidden w-full h-full bg-[#f8fafc] dark:bg-[#0f172a] ${className}`}>
          <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d="M-50,200 C200,100 400,320 850,180" fill="none" stroke="#94a3b8" strokeWidth="1.5" opacity="0.6" />
            <path d="M-50,220 C220,120 420,340 850,200" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.7" />
            <path d="M-50,240 C240,140 440,360 850,220" fill="none" stroke="#475569" strokeWidth="2" opacity="0.8" />
            <path d="M-50,260 C260,160 460,380 850,240" fill="none" stroke="#94a3b8" strokeWidth="1.2" opacity="0.6" />
            <path d="M-50,280 C280,180 480,400 850,260" fill="none" stroke="#334155" strokeWidth="2.5" opacity="0.9" />
          </svg>
          <div className="absolute bottom-3 left-4 text-[9px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase">
            3440 × 1440 UW • 1800R
          </div>
        </div>
      );

    case 'noctua':
      return (
        <div className={`relative overflow-hidden w-full h-full bg-[#fdf8f4] ${className}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#3d2614] via-[#8b5e34] to-[#f7ede2] opacity-85" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-white/25 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#3d2614]/50 border border-[#d4a373]/50" />
            </div>
          </div>
          <div className="absolute bottom-3 right-3 text-[8px] font-mono text-[#fdf8f4]/90 tracking-wider">
            140MM SSO2 BEARING
          </div>
        </div>
      );

    case 'trace':
      return (
        <div className={`relative overflow-hidden w-full h-full bg-black ${className}`}>
          <svg viewBox="0 0 600 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d="M0,100 L200,100 L280,180 L450,180 L520,250 L600,250" fill="none" stroke="#b45309" strokeWidth="2" opacity="0.8" />
            <path d="M0,120 L190,120 L270,200 L440,200 L510,270 L600,270" fill="none" stroke="#d97706" strokeWidth="1" opacity="0.6" />
            <circle cx="280" cy="180" r="3" fill="#f59e0b" />
            <circle cx="450" cy="180" r="3" fill="#f59e0b" />
            <circle cx="520" cy="250" r="3" fill="#f59e0b" />
          </svg>
          <div className="absolute top-3 right-3 text-[8px] font-mono text-amber-500/90 border border-amber-900/50 px-2 py-0.5 rounded bg-black/80">
            0-NIT TRUE BLACK
          </div>
        </div>
      );

    case 'surface':
      return (
        <div className={`relative overflow-hidden w-full h-full bg-[#f5f5f4] dark:bg-[#1c1917] ${className}`}>
          <div className="absolute inset-6 border border-neutral-300 dark:border-neutral-700 rounded-lg flex items-center justify-center">
            <div className="text-center font-mono">
              <div className="text-xs tracking-widest text-neutral-500 dark:text-neutral-400">RATIO 3:2</div>
              <div className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">2880 × 1920</div>
            </div>
          </div>
          <div className="absolute bottom-3 left-4 text-[8px] font-mono text-neutral-400">
            ANODIZED ALUMINUM
          </div>
        </div>
      );

    case 'thinkpad':
      return (
        <div className={`relative overflow-hidden w-full h-full bg-[#121214] ${className}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-14 h-14 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <span className="text-[9px] font-mono text-neutral-500">G</span>
              </div>
              <div className="absolute -right-14 top-0 w-14 h-14 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <span className="text-[9px] font-mono text-neutral-500">H</span>
              </div>
              <div className="absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#dc2626] border-2 border-red-950 shadow-md flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-red-300" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-3 right-4 text-[8px] font-mono text-neutral-500">
            TRACKPOINT
          </div>
        </div>
      );

    default:
      return (
        <div className={`w-full h-full bg-gradient-to-tr from-slate-900 via-indigo-950 to-neutral-900 flex items-center justify-center relative overflow-hidden ${className}`}>
          <div className="absolute inset-0 bg-radial from-blue-500/10 to-transparent pointer-events-none" />
          <span className="font-mono text-xs text-neutral-400 tracking-wider">BASIC PC GUY</span>
        </div>
      );
  }
}
