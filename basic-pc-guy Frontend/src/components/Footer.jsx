import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { SocialIcons } from './SocialIcons';

export function Footer({ isDark = false, activeTab, setActiveTab }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id) => {
    if (setActiveTab) {
      setActiveTab(id);
      scrollToTop();
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full border-t transition-colors duration-200 mt-20 ${
      isDark 
        ? 'bg-[#080911] border-neutral-800 text-neutral-400' 
        : 'bg-white border-neutral-200 text-neutral-600'
    }`}>
      
      <div className="w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16 max-w-7xl mx-auto">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-neutral-200 dark:border-neutral-800/80">
          
          {/* Brand & About (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center text-left group cursor-pointer"
              aria-label="Back to home"
            >
              <Logo isDark={isDark} iconOnly={false} size="default" />
            </button>
            
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed">
              Handcrafted minimalist wallpapers and quiet thoughts for your workspace. Free for personal use, with zero ads.
            </p>

            <div className="pt-1">
              <SocialIcons isDark={isDark} />
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className={`text-xs uppercase tracking-wider font-semibold font-mono ${
              isDark ? 'text-white' : 'text-neutral-950'
            }`}>
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className={`hover:text-[#ff6000] cursor-pointer transition-colors ${
                    activeTab === 'home' ? 'text-[#ff6000] font-medium' : ''
                  }`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('wallpapers')}
                  className={`hover:text-[#ff6000] cursor-pointer transition-colors ${
                    activeTab === 'wallpapers' ? 'text-[#ff6000] font-medium' : ''
                  }`}
                >
                  Wallpapers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('articles')}
                  className={`hover:text-[#ff6000] cursor-pointer transition-colors ${
                    activeTab === 'articles' ? 'text-[#ff6000] font-medium' : ''
                  }`}
                >
                  Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className={`hover:text-[#ff6000] cursor-pointer transition-colors ${
                    activeTab === 'about' ? 'text-[#ff6000] font-medium' : ''
                  }`}
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Wallpapers by Device (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className={`text-xs uppercase tracking-wider font-semibold font-mono ${
              isDark ? 'text-white' : 'text-neutral-950'
            }`}>
              Wallpapers
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handleNavClick('wallpapers')}
                  className="hover:text-[#ff6000] cursor-pointer transition-colors text-neutral-500 dark:text-neutral-400"
                >
                  Windows Wallpapers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('wallpapers')}
                  className="hover:text-[#ff6000] cursor-pointer transition-colors text-neutral-500 dark:text-neutral-400"
                >
                  Mac Wallpapers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('wallpapers')}
                  className="hover:text-[#ff6000] cursor-pointer transition-colors text-neutral-500 dark:text-neutral-400"
                >
                  Android Wallpapers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('wallpapers')}
                  className="hover:text-[#ff6000] cursor-pointer transition-colors text-neutral-500 dark:text-neutral-400"
                >
                  View All Works
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 dark:text-neutral-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© {currentYear} Basic PC Guy.</span>
            <span>Independent & free.</span>
          </div>

          <button
            onClick={scrollToTop}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer border ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white' 
                : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
