import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WallpaperGallery } from './components/WallpaperGallery';
import { WallpaperModal } from './components/WallpaperModal';
import { EditorialSection } from './components/EditorialSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { Check } from 'lucide-react';
import { getWallpapers, getWallpaperBySlug, getArticles, getArticleById } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [wallpapers, setWallpapers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loadingWallpapers, setLoadingWallpapers] = useState(true);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  const navigateTo = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch wallpapers from Spring Boot: GET /api/wallpapers
  const loadWallpapers = useCallback(async () => {
    setLoadingWallpapers(true);
    try {
      const data = await getWallpapers();
      setWallpapers(data);
    } catch (err) {
      console.error(err);
      setWallpapers([]);
    } finally {
      setLoadingWallpapers(false);
    }
  }, []);

  // Fetch articles from Spring Boot: GET /api/articles
  const loadArticles = useCallback(async () => {
    setLoadingArticles(true);
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      console.error(err);
      setArticles([]);
    } finally {
      setLoadingArticles(false);
    }
  }, []);

  // Load backend data on component mount
  useEffect(() => {
    loadWallpapers();
    loadArticles();
  }, [loadWallpapers, loadArticles]);

  // Handle wallpaper click: GET /api/wallpapers/{slug}
  const handleSelectWallpaper = async (wp) => {
    try {
      if (wp.slug) {
        const fullWp = await getWallpaperBySlug(wp.slug);
        setSelectedWallpaper(fullWp || wp);
      } else {
        setSelectedWallpaper(wp);
      }
    } catch {
      setSelectedWallpaper(wp);
    }
  };

  // Handle article click: GET /api/articles/{id}
  const handleSelectArticle = async (id) => {
    try {
      return await getArticleById(id);
    } catch {
      return null;
    }
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col justify-between ${
      isDark ? 'bg-[#0d0e18] text-[#f4f4f6]' : 'bg-[#fafaf9] text-[#18181b]'
    }`}>
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`px-4 py-2 rounded-full text-xs font-mono shadow-lg flex items-center gap-2 border ${
            isDark 
              ? 'bg-neutral-900 text-white border-neutral-700' 
              : 'bg-neutral-950 text-white border-neutral-800'
          }`}>
            <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col">
        {/* Navigation Header */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={navigateTo}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />

        {/* Distinct Page Routing by activeTab */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <div className="animate-in fade-in duration-200">
              <Hero
                isDark={isDark}
                onJumpToWallpapers={() => {
                  const el = document.getElementById('wallpapers-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onJumpToArticles={() => {
                  const el = document.getElementById('articles-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
              <WallpaperGallery
                wallpapers={wallpapers}
                isLoading={loadingWallpapers}
                onSelectWallpaper={handleSelectWallpaper}
                isDark={isDark}
                onShowToast={showToast}
                isMainPage={true}
                limit={4}
                onViewAll={() => navigateTo('wallpapers')}
              />
              <EditorialSection
                articles={articles}
                isLoading={loadingArticles}
                onSelectArticle={handleSelectArticle}
                isDark={isDark}
                isMainPage={true}
                limit={4}
                onViewAll={() => navigateTo('articles')}
              />
            </div>
          )}

          {activeTab === 'wallpapers' && (
            <div className="animate-in fade-in duration-200">
              <WallpaperGallery
                wallpapers={wallpapers}
                isLoading={loadingWallpapers}
                onSelectWallpaper={handleSelectWallpaper}
                isDark={isDark}
                onShowToast={showToast}
                isMainPage={false}
                onBackToHome={() => navigateTo('home')}
              />
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="animate-in fade-in duration-200">
              <EditorialSection
                articles={articles}
                isLoading={loadingArticles}
                onSelectArticle={handleSelectArticle}
                isDark={isDark}
                isMainPage={false}
                onBackToHome={() => navigateTo('home')}
              />
            </div>
          )}

          {activeTab === 'about' && (
            <div className="animate-in fade-in duration-200">
              <AboutSection
                isDark={isDark}
              />
            </div>
          )}
        </main>
      </div>

      {/* New Clean Footer */}
      <Footer
        isDark={isDark}
        activeTab={activeTab}
        setActiveTab={navigateTo}
      />

      {/* Wallpaper Detail & Download Modal */}
      {selectedWallpaper && (
        <WallpaperModal
          wallpaper={selectedWallpaper}
          onClose={() => setSelectedWallpaper(null)}
          onShowToast={showToast}
          isDark={isDark}
        />
      )}

    </div>
  );
}
