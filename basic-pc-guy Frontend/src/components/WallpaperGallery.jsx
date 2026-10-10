import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Download } from 'lucide-react';
import { WallpaperGraphic } from './WallpaperGraphic';

export function WallpaperGallery({ 
  wallpapers = [], 
  onSelectWallpaper, 
  isLoading = false,
  isDark = false,
  isMainPage = false,
  limit = null,
  onViewAll = null,
  onBackToHome = null
}) {
  const [activeCategory, setActiveCategory] = useState('all');

  // Dynamically derive categories from backend wallpaper items
  const dynamicCategories = [
    { id: 'all', label: 'All Works' },
    ...Array.from(new Set(wallpapers.map((w) => w.category).filter(Boolean))).map((cat) => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1)
    }))
  ];

  const filtered = wallpapers.filter((item) => {
    return activeCategory === 'all' || item.category === activeCategory;
  });

  const displayItems = isMainPage && limit ? filtered.slice(0, limit) : filtered;

  return (
    <section id="wallpapers-section" className="w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
      
      {/* Optional Back to Home link on full page */}
      {!isMainPage && onBackToHome && (
        <div className="mb-6">
          <button
            onClick={onBackToHome}
            className={`inline-flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer ${
              isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>
      )}

      {/* Section Header */}
      <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b ${
        isDark ? 'border-neutral-800' : 'border-neutral-200'
      }`}>
        <div>
          <span className={`text-[11px] font-mono uppercase tracking-widest block mb-1 ${
            isDark ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            {isMainPage ? 'Curated Collection' : `Complete Archive • ${wallpapers.length} Works`}
          </span>
          <h2 className={`font-instrument-serif text-3xl sm:text-4xl font-normal ${
            isDark ? 'text-white' : 'text-neutral-950'
          }`}>
            {isMainPage ? 'Featured Wallpapers' : 'All Wallpapers'}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <p className={`text-xs sm:text-sm max-w-xs ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Minimalist wallpapers for your workspace and devices.
          </p>

          {isMainPage && onViewAll && (
            <button
              onClick={onViewAll}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border whitespace-nowrap self-start sm:self-auto ${
                isDark 
                  ? 'bg-neutral-900 border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-white' 
                  : 'bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-50 hover:text-black shadow-xs'
              }`}
            >
              <span>View All Wallpapers ({wallpapers.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills (Shown on Full page, or when active in main page) */}
      {!isMainPage && dynamicCategories.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {dynamicCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? isDark 
                      ? 'bg-white text-black font-semibold' 
                      : 'bg-neutral-950 text-white font-semibold'
                    : isDark
                      ? 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                      : 'bg-white text-neutral-700 hover:text-neutral-950 border border-neutral-200 shadow-2xs'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="py-20 text-center font-sans text-sm text-neutral-400 animate-pulse">
          Loading wallpapers...
        </div>
      )}

      {/* Empty state */}
      {!isLoading && wallpapers.length === 0 && (
        <div className={`py-16 text-center rounded-2xl border border-dashed p-8 my-8 ${
          isDark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-300 text-neutral-600'
        }`}>
          <p className="font-medium text-base mb-1">New wallpapers coming soon</p>
          <p className="text-xs opacity-75">
            Check back shortly for fresh desktop and mobile designs.
          </p>
        </div>
      )}

      {/* Wallpapers Showcase Grid */}
      {!isLoading && displayItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {displayItems.map((wp) => (
            <article
              key={wp.id || wp.slug}
              onClick={() => onSelectWallpaper(wp)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Large Rounded Artwork Preview */}
              <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 bg-neutral-900">
                <WallpaperGraphic 
                  wallpaper={wp}
                  type={wp.imageUrl || wp.image || wp.poster || wp.posterImage || wp.coverImage || wp.thumbnail || wp.bgType} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                />
                
                {/* Vibrant Orange Tag Badge */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 px-3 py-1 rounded-md bg-[#ff6000] text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-md select-none pointer-events-none">
                  {wp.badge || 'WALLPAPER'}
                </div>

                {/* Direct Download Hover Button */}
                <div
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-black/65 hover:bg-[#ff6000] text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md hover:scale-110"
                  title="Download Wallpaper"
                >
                  <Download className="w-4 h-4" />
                </div>
              </div>

              {/* Typography & Details below the card */}
              <div className="mt-4 sm:mt-5 flex flex-col space-y-1.5">
                {/* Meta Date & Category */}
                <div className={`text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase flex items-center gap-1.5 ${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  <span>{wp.publishedAt || '2026'}</span>
                  <span className="opacity-50">|</span>
                  <span>{wp.metaCategory || wp.category || 'WALLPAPER'}</span>
                </div>

                {/* Bold Title */}
                <h3 className={`text-2xl sm:text-3xl font-semibold tracking-tight transition-colors leading-snug ${
                  isDark 
                    ? 'text-white group-hover:text-amber-400' 
                    : 'text-neutral-950 group-hover:text-amber-600'
                }`}>
                  {wp.title}
                </h3>

                {/* Concise Subtitle / Description */}
                <p className={`text-sm sm:text-base leading-relaxed line-clamp-2 ${
                  isDark ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  {wp.subtitle || wp.story}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Main page CTA: Explore All Wallpapers */}
      {isMainPage && onViewAll && wallpapers.length > displayItems.length && (
        <div className="mt-12 text-center">
          <button
            onClick={onViewAll}
            className={`inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold transition-all cursor-pointer shadow-md hover:scale-103 active:scale-97 border ${
              isDark
                ? 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700'
                : 'bg-neutral-950 hover:bg-neutral-800 text-white border-neutral-900'
            }`}
          >
            <span>Explore All Wallpapers ({wallpapers.length} Total)</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}

    </section>
  );
}
