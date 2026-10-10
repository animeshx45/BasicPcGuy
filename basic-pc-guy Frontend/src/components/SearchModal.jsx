import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { WallpaperGraphic } from './WallpaperGraphic';

export function SearchModal({ wallpapers, isOpen, onClose, onSelectWallpaper }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = wallpapers.filter((wp) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      wp.title.toLowerCase().includes(q) ||
      wp.subtitle.toLowerCase().includes(q) ||
      wp.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-md flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div 
        className="bg-white max-w-2xl w-full rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center gap-3 bg-[#fafaf9]">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search wallpapers (e.g., Bliss, OLED, 8K, ThinkPad)..."
            className="w-full text-base sm:text-lg bg-transparent focus:outline-hidden text-neutral-900 placeholder:text-neutral-400 font-sans"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-400 hover:text-neutral-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {results.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 text-sm font-mono">
              No matching wallpapers found for "{query}"
            </div>
          ) : (
            results.map((wp) => (
              <div
                key={wp.id}
                onClick={() => {
                  onSelectWallpaper(wp);
                  onClose();
                }}
                className="p-3 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 flex items-center justify-between gap-4 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-14 h-10 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                    <WallpaperGraphic type={wp.bgType} aspect="16/10" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-instrument-serif text-lg text-neutral-900 group-hover:text-black truncate">
                      {wp.title}
                    </h4>
                    <p className="text-xs text-neutral-500 font-mono truncate">
                      {wp.tags.join(' • ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-neutral-400 group-hover:text-neutral-900 shrink-0">
                  <span className="text-xs font-mono hidden sm:inline">View Formats</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400 px-5">
          <span>ESC to close</span>
          <span>Showing {results.length} results</span>
        </div>
      </div>
    </div>
  );
}
