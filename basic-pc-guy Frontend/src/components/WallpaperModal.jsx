import React, { useState } from 'react';
import { X, ArrowLeft, ExternalLink, Maximize2, Monitor, Laptop, Smartphone } from 'lucide-react';
import { WallpaperGraphic } from './WallpaperGraphic';

// Helper to resolve device-specific image URL
export function getDeviceWallpaperUrl(wallpaper, deviceType) {
  if (!wallpaper) return null;
  const key = deviceType.toLowerCase();

  // 1. Direct property (e.g. windowsUrl, macUrl, androidUrl)
  if (wallpaper[`${key}Url`]) return wallpaper[`${key}Url`];

  // 2. downloads map (e.g. downloads: { windows: "...", mac: "...", android: "..." })
  if (wallpaper.downloads) {
    let dl = wallpaper.downloads;
    if (typeof dl === 'string') {
      try { dl = JSON.parse(dl.replace(/'/g, '"')); } catch {}
    }
    if (typeof dl === 'object' && dl !== null) {
      if (dl[key]) {
        const val = dl[key];
        return typeof val === 'string' ? val : (val.url || null);
      }
      // If mobile requested and phone/mobile exists in legacy map
      if (key === 'android' && (dl.mobile || dl.phone)) {
        const val = dl.mobile || dl.phone;
        return typeof val === 'string' ? val : (val.url || null);
      }
      // First available url in downloads
      for (const val of Object.values(dl)) {
        if (typeof val === 'string' && val.startsWith('http')) return val;
        if (val?.url) return val.url;
      }
    }
  }

  // 3. General image URL fallbacks
  if (wallpaper.imageUrl) return wallpaper.imageUrl;
  if (wallpaper.image) return wallpaper.image;
  if (wallpaper.coverImage) return wallpaper.coverImage;
  if (wallpaper.poster) return wallpaper.poster;
  if (typeof wallpaper.bgType === 'string' && wallpaper.bgType.startsWith('http')) return wallpaper.bgType;

  return null;
}

export function WallpaperModal({ wallpaper, onClose, onShowToast, isDark = false }) {
  // Full-screen preview state: null, 'windows', 'mac', 'android'
  const [fullscreenDevice, setFullscreenDevice] = useState(null);

  if (!wallpaper) return null;

  // Handles clicking on Windows, Mac, or Android:
  // Opens the full-resolution image in a new browser tab so users can use native browser save/download functionality
  const handleOpenImage = (deviceType) => {
    const url = getDeviceWallpaperUrl(wallpaper, deviceType);

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      if (onShowToast) {
        onShowToast(`Opened ${deviceType.toUpperCase()} wallpaper in browser. Right-click or hold to save!`);
      }
    } else {
      if (onShowToast) {
        onShowToast(`No image link found for ${deviceType.toUpperCase()}.`);
      }
    }
  };

  const platforms = [
    { id: 'windows', label: 'Windows', icon: Monitor, desc: 'PC & Desktop Displays' },
    { id: 'mac', label: 'Mac', icon: Laptop, desc: 'MacBook & Studio Displays' },
    { id: 'android', label: 'Android', icon: Smartphone, desc: 'Phones & Tablets' },
  ];

  // Full-Screen Preview Overlay
  if (fullscreenDevice) {
    const activeUrl = getDeviceWallpaperUrl(wallpaper, fullscreenDevice);

    return (
      <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
        
        {/* Full-Screen Top Header Bar */}
        <div className="w-full px-4 sm:px-8 py-4 flex items-center justify-between border-b border-white/10 bg-black/75 backdrop-blur-md z-20">
          <button
            onClick={() => setFullscreenDevice(null)}
            className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {/* Quick Switcher: Windows || Mac || Android */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold">
            {['windows', 'mac', 'android'].map((dev, idx) => (
              <React.Fragment key={dev}>
                {idx > 0 && <span className="text-neutral-600">||</span>}
                <button
                  onClick={() => setFullscreenDevice(dev)}
                  className={`capitalize transition-colors cursor-pointer ${
                    fullscreenDevice === dev 
                      ? 'text-[#ff6000] underline font-bold' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {dev}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Open Image in Browser & Close */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenImage(fullscreenDevice)}
              className="px-4 py-1.5 rounded-full bg-[#ff6000] hover:bg-[#e05500] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
              title="Open full image in browser to save"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Browser</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Wallpaper Stage */}
        <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-8 overflow-hidden relative">
          {fullscreenDevice === 'android' ? (
            // Android Phone Portrait
            <div className="relative aspect-[9/16] h-[78vh] sm:h-[82vh] max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-neutral-800 bg-black">
              <WallpaperGraphic 
                wallpaper={wallpaper} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-black/90 rounded-full" />
            </div>
          ) : fullscreenDevice === 'mac' ? (
            // Mac 16:10
            <div className="relative aspect-[16/10] w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 bg-black">
              <WallpaperGraphic 
                wallpaper={wallpaper} 
                className="w-full h-full object-cover" 
              />
            </div>
          ) : (
            // Windows 16:9
            <div className="relative aspect-[16/9] w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 bg-black">
              <WallpaperGraphic 
                wallpaper={wallpaper} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
        </div>

        {/* Bottom Instruction Bar */}
        <div className="w-full py-3 text-center text-xs font-sans text-neutral-400 border-t border-white/10 bg-black/60 backdrop-blur-md">
          {activeUrl ? (
            <span>Click <strong>Open in Browser</strong> above, then right-click or hold the image to save.</span>
          ) : (
            <span>Right-click or hold the preview image above to save.</span>
          )}
        </div>

      </div>
    );
  }

  // Standard Modal View
  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto no-scrollbar bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-2xl rounded-3xl shadow-2xl border overflow-hidden flex flex-col max-h-[92vh] ${
          isDark 
            ? 'bg-[#0d0e18] border-neutral-800 text-neutral-100' 
            : 'bg-white border-neutral-200 text-neutral-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className={`px-6 sm:px-8 pt-6 pb-4 border-b flex items-start justify-between ${
          isDark ? 'border-neutral-800' : 'border-neutral-200'
        }`}>
          <div>
            <h2 className={`text-xl sm:text-2xl font-bold tracking-wider uppercase font-sans ${
              isDark ? 'text-white' : 'text-neutral-950'
            }`}>
              DOWNLOAD
            </h2>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mt-0.5">
              {wallpaper.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isDark 
                ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' 
                : 'text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100'
            }`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto no-scrollbar p-6 sm:p-8 space-y-6 flex-1 flex flex-col items-center">
          
          {/* Description */}
          <p className={`text-sm sm:text-base leading-relaxed text-center max-w-lg ${
            isDark ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            {wallpaper.story || wallpaper.subtitle}
          </p>

          {/* Central Multi-Device Mockup Card */}
          <div 
            onClick={() => setFullscreenDevice('windows')}
            className={`group relative aspect-square sm:aspect-[16/10] w-full max-w-lg rounded-2xl sm:rounded-3xl overflow-hidden border shadow-lg cursor-pointer flex items-center justify-center transition-all duration-300 ${
              isDark 
                ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700' 
                : 'bg-neutral-50 border-neutral-200/90 hover:border-neutral-300 shadow-sm'
            }`}
            title="Click to view full screen preview"
          >
            <div className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-6">
              {/* Laptop screen */}
              <div className="relative w-[72%] aspect-[16/10] rounded-xl overflow-hidden border-2 border-neutral-700 shadow-2xl bg-black">
                <WallpaperGraphic 
                  wallpaper={wallpaper} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-neutral-900 rounded-b-sm" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[110%] h-2 bg-neutral-600 rounded-b-md" />
              </div>

              {/* Tablet */}
              <div className="absolute left-[10%] bottom-[14%] w-[26%] aspect-[3/4] rounded-xl overflow-hidden border-2 border-neutral-700 shadow-2xl bg-black transform -rotate-3 z-20">
                <WallpaperGraphic 
                  wallpaper={wallpaper} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Phone */}
              <div className="absolute right-[10%] bottom-[12%] w-[20%] aspect-[9/19] rounded-xl overflow-hidden border-2 border-neutral-700 shadow-2xl bg-black transform rotate-2 z-20">
                <WallpaperGraphic 
                  wallpaper={wallpaper} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-6 h-2 bg-neutral-900 rounded-full" />
              </div>
            </div>

            {/* Hover Fullscreen Badge */}
            <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Screen</span>
            </div>
          </div>

          {/* Windows || Mac || Android Text Switcher matching the reference */}
          <div className="flex items-center justify-center gap-3 text-lg sm:text-xl font-bold pt-1">
            <button
              onClick={() => handleOpenImage('windows')}
              className="text-[#ff6000] hover:underline cursor-pointer transition-colors"
            >
              Windows
            </button>
            <span className="text-neutral-400 select-none">||</span>
            <button
              onClick={() => handleOpenImage('mac')}
              className="text-[#ff6000] hover:underline cursor-pointer transition-colors"
            >
              Mac
            </button>
            <span className="text-neutral-400 select-none">||</span>
            <button
              onClick={() => handleOpenImage('android')}
              className="text-[#ff6000] hover:underline cursor-pointer transition-colors"
            >
              Android
            </button>
          </div>

          {/* Quick Platform Cards with Direct Links */}
          <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {platforms.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => handleOpenImage(p.id)}
                  className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer group shadow-xs ${
                    isDark
                      ? 'bg-neutral-900/80 border-neutral-800 hover:border-[#ff6000] hover:bg-neutral-900 text-white'
                      : 'bg-neutral-50 border-neutral-200 hover:border-[#ff6000] hover:bg-white text-neutral-900'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl transition-colors ${
                    isDark ? 'bg-neutral-800 group-hover:bg-[#ff6000]/20' : 'bg-neutral-200/70 group-hover:bg-[#ff6000]/15'
                  }`}>
                    <Icon className="w-5 h-5 text-[#ff6000]" />
                  </div>
                  <span className="text-xs font-bold leading-none mt-1">{p.label}</span>
                  <span className="text-[10px] text-neutral-400 font-sans">{p.desc}</span>
                  <span className="text-[10px] font-mono text-[#ff6000] flex items-center gap-1 mt-1 font-semibold group-hover:underline">
                    <span>Open Image</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-neutral-400 text-center pt-1">
            Clicking any option opens the high-resolution image in your browser tab for direct saving.
          </div>

        </div>
      </div>
    </div>
  );
}
