import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

export function Hero({ onJumpToWallpapers, onJumpToArticles }) {
  const bgImageUrl = "https://4kwallpapers.com/images/walls/thumbs_3t/17194.jpg"; // Replace with the actual path to your image

  return (
    <section className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Fully Visible, High-Resolution Background Image Filling 100% Full Screen */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImageUrl}
          alt="Windows XP Bliss Wallpaper"
          className="w-full h-full object-cover object-center"
        />
        
        {/* Soft bottom-only gradient so wallpaper gracefully blends into gallery */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content - Centered with Crisp White Typography matching the reference screenshot */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 py-20 text-center flex flex-col items-center max-w-4xl mx-auto">
        
        {/* Large Elegant Heading */}
        <h1 className="font-instrument-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.06] tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)]">
          WALLPAPERS <span className="italic font-normal">and</span> ESSAYS{' '}
          <br className="hidden sm:inline" />
          <span className="italic font-normal">for</span> THE PC ENTHUSIAST
        </h1>

        {/* Clean, Readable Subtitle */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-white/95 max-w-lg leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          Handcrafted minimalist wallpapers and quiet hardware thoughts.
        </p>

        {/* Action Buttons matching the reference screenshot */}
        <div className="mt-9 flex flex-row items-center gap-3.5">
          {/* Primary White Pill Button */}
          <button
            onClick={onJumpToWallpapers}
            className="px-7 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white text-neutral-950 hover:bg-neutral-100 flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-103 active:scale-97"
          >
            <span>Browse Wallpapers</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Transparent Glass Blur Pill Button */}
          <button
            onClick={onJumpToArticles}
            className="px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-black/25 hover:bg-black/40 border border-white/40 backdrop-blur-md flex items-center gap-2 transition-all cursor-pointer shadow-md hover:scale-103 active:scale-97"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read Articles</span>
          </button>
        </div>

      </div>
    </section>
  );
}
