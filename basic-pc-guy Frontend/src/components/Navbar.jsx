import React, { useState } from 'react';
import { Sun, Moon, X, Menu } from 'lucide-react';
import { Logo } from './Logo';
import { SocialIcons } from './SocialIcons';

export function Navbar({ activeTab, setActiveTab, isDark, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'wallpapers', label: 'Wallpapers' },
    { id: 'articles', label: 'Articles' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHeroTransparent = activeTab === 'home' && !isScrolled;

  const headerClasses = activeTab === 'home'
    ? `fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isHeroTransparent
          ? 'bg-transparent border-b border-transparent text-white'
          : `backdrop-blur-md shadow-sm border-b ${
              isDark 
                ? 'bg-neutral-950/85 border-neutral-800 text-neutral-100' 
                : 'bg-white/85 border-neutral-200/80 text-neutral-900'
            }`
      }`
    : `sticky top-0 z-40 w-full border-b transition-colors duration-200 backdrop-blur-md ${
        isDark 
          ? 'bg-neutral-950/90 border-neutral-800 text-neutral-100' 
          : 'bg-white/90 border-neutral-200/80 text-neutral-900'
      }`;

  return (
    <>
      <header className={headerClasses}>
        <div className="w-full px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <button 
            onClick={() => { 
              setActiveTab('home'); 
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
            }}
            className="flex items-center text-left group cursor-pointer"
            aria-label="Basic PC Guy Home"
          >
            <Logo isDark={isDark} forceWhite={isHeroTransparent} size="default" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className={`hidden md:flex items-center gap-1.5 p-1 rounded-full transition-all ${
            isHeroTransparent
              ? 'bg-black/25 backdrop-blur-md border border-white/20 shadow-sm'
              : 'bg-neutral-100/70 dark:bg-neutral-900/70 border border-neutral-200/50 dark:border-neutral-800'
          }`}>
            {navLinks.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isHeroTransparent
                      ? isActive
                        ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                        : 'text-white/85 hover:text-white hover:bg-white/10'
                      : isActive
                        ? isDark 
                          ? 'bg-neutral-800 text-white shadow-xs' 
                          : 'bg-white text-neutral-950 shadow-xs'
                        : isDark
                          ? 'text-neutral-400 hover:text-white'
                          : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Socials & Theme Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Social Icons (Instagram, Twitter, GitHub, LinkedIn) */}
            <div className={`hidden lg:flex items-center pr-2 border-r ${
              isHeroTransparent 
                ? 'border-white/20' 
                : isDark ? 'border-neutral-800' : 'border-neutral-200'
            }`}>
              <SocialIcons isDark={isDark} forceWhite={isHeroTransparent} />
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`p-2 rounded-lg transition-colors cursor-pointer border ${
                isHeroTransparent
                  ? 'bg-black/25 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm'
                  : isDark 
                    ? 'bg-neutral-900 border-neutral-800 text-amber-300 hover:bg-neutral-800' 
                    : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100 shadow-2xs'
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg border transition-colors cursor-pointer ${
                isHeroTransparent
                  ? 'bg-black/25 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm'
                  : isDark 
                    ? 'bg-neutral-900 border-neutral-800 text-white' 
                    : 'bg-neutral-50 border-neutral-200 text-neutral-900'
              }`}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-50 md:hidden flex flex-col justify-between p-6 transition-all duration-200 ${
          isDark ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'
        }`}>
          <div className="flex items-center justify-between border-b pb-4 border-neutral-200 dark:border-neutral-800">
            <Logo isDark={isDark} size="default" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center justify-center space-y-6 my-auto">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="font-instrument-serif text-3xl sm:text-4xl hover:opacity-75 transition-opacity cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Social Icons & Mode Switch */}
          <div className="border-t pt-5 space-y-4 border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-center">
              <SocialIcons isDark={isDark} />
            </div>

            <button
              onClick={toggleTheme}
              className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-medium border cursor-pointer ${
                isDark 
                  ? 'bg-neutral-900 border-neutral-800 text-amber-300' 
                  : 'bg-neutral-100 border-neutral-200 text-neutral-800'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{isDark ? 'Light' : 'Dark'} Mode</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
