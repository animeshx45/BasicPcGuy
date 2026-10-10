import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { WallpaperGraphic } from './WallpaperGraphic';

export function EditorialSection({ 
  articles = [], 
  isLoading = false,
  onSelectArticle,
  isDark = false,
  isMainPage = false,
  limit = null,
  onViewAll = null,
  onBackToHome = null
}) {
  const [activeArticle, setActiveArticle] = useState(null);

  const handleArticleClick = async (art) => {
    if (onSelectArticle) {
      const fullArt = await onSelectArticle(art.id);
      setActiveArticle(fullArt || art);
    } else {
      setActiveArticle(art);
    }
  };

  const displayItems = isMainPage && limit ? articles.slice(0, limit) : articles;

  return (
    <section id="articles-section" className={`w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16 border-t ${
      isDark ? 'border-neutral-800' : 'border-neutral-200'
    }`}>
      
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
            {isMainPage ? 'Editorial & Essays' : `Editorial Archive • ${articles.length} Articles`}
          </span>
          <h2 className={`font-instrument-serif text-3xl sm:text-4xl font-normal ${
            isDark ? 'text-white' : 'text-neutral-950'
          }`}>
            {isMainPage ? 'Articles & Essays' : 'All Articles & Essays'}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <p className={`text-xs sm:text-sm max-w-xs ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Quiet thoughts on computing, design, and software culture.
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
              <span>View All Articles ({articles.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="py-20 text-center font-sans text-sm text-neutral-400 animate-pulse">
          Loading articles...
        </div>
      )}

      {/* Empty State */}
      {!isLoading && articles.length === 0 && (
        <div className={`py-16 text-center rounded-2xl border border-dashed p-8 my-8 ${
          isDark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-300 text-neutral-600'
        }`}>
          <p className="font-medium text-base mb-1">New essays coming soon</p>
          <p className="text-xs opacity-75">
            Check back shortly for new thoughts on hardware and calm computing.
          </p>
        </div>
      )}

      {/* Articles Grid */}
      {!isLoading && displayItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {displayItems.map((art) => (
            <article
              key={art.id || art.slug}
              onClick={() => handleArticleClick(art)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Large Rounded Artwork Preview */}
              <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 bg-neutral-900">
                <WallpaperGraphic 
                  wallpaper={art}
                  type={art.coverImage || art.imageUrl || 'bliss'} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103" 
                />
                
                {/* Badge on top-left of image */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 px-3 py-1 rounded-md bg-[#2563eb] text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-md select-none pointer-events-none">
                  {art.badge || 'ARTICLE'}
                </div>
              </div>

              {/* Typography & Details below the card */}
              <div className="mt-4 sm:mt-5 flex flex-col space-y-1.5">
                {/* Meta Date & Category */}
                <div className={`text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase flex items-center gap-1.5 ${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  <span>{art.publishedAt || '2026'}</span>
                  <span className="opacity-50">|</span>
                  <span>{art.metaCategory || 'ESSAY'}</span>
                </div>

                {/* Bold Title */}
                <h3 className={`text-2xl sm:text-3xl font-semibold tracking-tight transition-colors leading-snug ${
                  isDark 
                    ? 'text-white group-hover:text-blue-400' 
                    : 'text-neutral-950 group-hover:text-blue-600'
                }`}>
                  {art.title}
                </h3>

                {/* Concise Description */}
                <p className={`text-sm sm:text-base leading-relaxed line-clamp-2 ${
                  isDark ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  {art.excerpt || art.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Main page CTA: Read All Articles */}
      {isMainPage && onViewAll && articles.length > displayItems.length && (
        <div className="mt-12 text-center">
          <button
            onClick={onViewAll}
            className={`inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold transition-all cursor-pointer shadow-md hover:scale-103 active:scale-97 border ${
              isDark
                ? 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700'
                : 'bg-neutral-950 hover:bg-neutral-800 text-white border-neutral-900'
            }`}
          >
            <span>Read All Articles & Essays ({articles.length} Total)</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* Reader Modal (Wide Horizontal Widescreen Magazine Format) */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto no-scrollbar bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveArticle(null)}
        >
          <div 
            className={`w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl rounded-3xl border shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:max-h-[88vh] ${
              isDark 
                ? 'bg-[#0f1019] border-neutral-800 text-neutral-100' 
                : 'bg-white border-neutral-200 text-neutral-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile close button at top-right */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 z-20 md:hidden p-2 rounded-full bg-black/60 text-white backdrop-blur-sm cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            {/* LEFT COLUMN: Large Artwork, Badges & Publication Info */}
            <div className={`w-full md:w-[46%] lg:w-[48%] flex flex-col justify-between p-6 sm:p-8 border-b md:border-b-0 md:border-r ${
              isDark ? 'border-neutral-800/80 bg-neutral-950/40' : 'border-neutral-200/80 bg-neutral-50/50'
            }`}>
              
              {/* Badges / Meta above artwork */}
              <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-400 mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-blue-600 text-white shadow-xs">
                  {activeArticle.badge || 'ARTICLE'}
                </span>
                <span>•</span>
                <span>{activeArticle.publishedAt || '2026'}</span>
                {activeArticle.readTime && (
                  <>
                    <span>•</span>
                    <span>{activeArticle.readTime}</span>
                  </>
                )}
              </div>

              {/* Large Artwork Frame */}
              <div className="relative aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/11] w-full rounded-2xl overflow-hidden shadow-xl border border-neutral-800/20 dark:border-neutral-700/50 my-auto bg-neutral-900">
                <WallpaperGraphic 
                  wallpaper={activeArticle}
                  type={activeArticle.coverImage || activeArticle.imageUrl || 'bliss'} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Publication footnote on bottom left */}
              <div className="mt-5 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>Basic PC Guy Publication</span>
                <span>{activeArticle.metaCategory || 'ESSAY'}</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Header, Subtitle & Scrollable Reading Section */}
            <div className="w-full md:w-[54%] lg:w-[52%] flex flex-col justify-between p-6 sm:p-8 lg:p-10 relative">
              
              {/* Desktop Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                className={`hidden md:flex absolute top-6 right-6 p-2 rounded-full transition-colors cursor-pointer ${
                  isDark 
                    ? 'text-neutral-400 hover:text-white hover:bg-neutral-800/80' 
                    : 'text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Article Header */}
              <div className="space-y-3 pr-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.18]">
                  {activeArticle.title}
                </h2>

                {activeArticle.subtitle && (
                  <p className={`text-sm sm:text-base italic pl-3 border-l-2 py-0.5 leading-relaxed ${
                    isDark ? 'border-blue-500 text-neutral-300' : 'border-blue-500 text-neutral-600'
                  }`}>
                    {activeArticle.subtitle}
                  </p>
                )}
              </div>

              {/* Scrollable Reading Text - Smooth Scrolling without Clunky Native Scrollbar */}
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 my-5 pr-1 max-h-[46vh] sm:max-h-[50vh] md:max-h-[52vh] text-sm sm:text-base leading-relaxed">
                {Array.isArray(activeArticle.content) ? (
                  activeArticle.content.map((paragraph, i) => (
                    <p key={i} className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                      {paragraph}
                    </p>
                  ))
                ) : (
                  (activeArticle.content || activeArticle.excerpt || '')
                    .split('\n\n')
                    .filter(Boolean)
                    .map((paragraph, i) => (
                      <p key={i} className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                        {paragraph}
                      </p>
                    ))
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-mono">
                  Finished reading
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className={`px-6 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                    isDark 
                      ? 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700' 
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                  }`}
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
