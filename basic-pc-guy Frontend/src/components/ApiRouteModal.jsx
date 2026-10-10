import React, { useState } from 'react';
import { X, Code2, Copy, Check, FileJson, Server, Globe, Download } from 'lucide-react';

export function ApiRouteModal({ onClose, onShowToast }) {
  const [activeTab, setActiveTab] = useState('urls');
  const [copiedKey, setCopiedKey] = useState(null);

  const copyCode = (code, key) => {
    navigator.clipboard?.writeText(code);
    setCopiedKey(key);
    onShowToast(`Copied ${key} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const URL_MAPPINGS = [
    {
      type: 'GET (Page)',
      path: '/',
      purpose: 'Landing Page: Hero, Featured 8K Wallpapers, Recent Essays, Battlestation Blueprint'
    },
    {
      type: 'GET (Page)',
      path: '/wallpapers',
      purpose: 'Wallpaper Index Catalog with filterable category parameters (?category=schematics)'
    },
    {
      type: 'GET (Page)',
      path: '/wallpapers/:slug',
      purpose: 'Wallpaper Detail Page with interactive aspect ratio visualizer and color palette'
    },
    {
      type: 'GET (Download)',
      path: '/wallpapers/:slug/download/:variant',
      purpose: 'Direct High-Resolution File Stream (e.g., /wallpapers/bliss-redux-8k/download/desktop-8k)'
    },
    {
      type: 'GET (Page)',
      path: '/reviews',
      purpose: 'Hardware Reviews & Retrospectives Index'
    },
    {
      type: 'GET (Page)',
      path: '/reviews/:slug',
      purpose: 'Article / Essay detail reader page'
    },
    {
      type: 'GET (Page)',
      path: '/battlestations',
      purpose: 'Minimalist Workspace Gear & Hardware specs breakdown'
    },
    {
      type: 'GET (Page)',
      path: '/mercantile',
      purpose: 'Merchandise & Desk Mat store'
    },
    {
      type: 'GET (Feed)',
      path: '/feed.xml / /rss.xml',
      purpose: 'Full RSS feed for new wallpapers and published essays'
    },
    {
      type: 'REST API',
      path: 'GET /api/v1/wallpapers',
      purpose: 'Returns paginated list of wallpapers with metadata, category filtering, search'
    },
    {
      type: 'REST API',
      path: 'GET /api/v1/wallpapers/:slug',
      purpose: 'Returns single wallpaper entity with all resolution download endpoints & palettes'
    },
    {
      type: 'REST API',
      path: 'GET /api/v1/wallpapers/:slug/download/:variant',
      purpose: 'Increments download counter and 302 redirects to signed CDN asset URL (S3/Cloudflare R2)'
    },
    {
      type: 'REST API',
      path: 'GET /api/v1/articles',
      purpose: 'Returns list of hardware reviews, reading times, tags, and cover assets'
    },
    {
      type: 'REST API',
      path: 'GET /api/v1/merch',
      purpose: 'Returns mercantile items, inventory badges, and prices'
    },
    {
      type: 'REST API',
      path: 'POST /api/v1/newsletter/subscribe',
      purpose: 'Subscribes user email to wallpaper release dispatches'
    },
    {
      type: 'REST API',
      path: 'POST /api/v1/tipjar/checkout',
      purpose: 'Initializes Stripe / Ko-fi payment intent for coffee tips'
    }
  ];

  const WALLPAPER_JSON_SCHEMA = `{
  "id": "bliss-redux-8k",
  "slug": "bliss-redux-8k",
  "title": "Bliss Redux: 8K Horizon",
  "subtitle": "A quiet, modern tribute to the hill that defined personal computing.",
  "category": "nostalgia",
  "featured": true,
  "publishedAt": "2026-09-28T00:00:00.000Z",
  "story": "In 1996, Charles O’Rear snapped a photograph in Sonoma County that would grace over a billion CRT monitors...",
  "palette": ["#0f766e", "#38bdf8", "#84cc16", "#f8fafc"],
  "accentColor": "#38bdf8",
  "downloadsCount": 14280,
  "tags": ["Windows", "Nostalgia", "Minimalist", "Landscape", "8K"],
  "downloads": {
    "desktop-4k": {
      "formatId": "desktop-4k",
      "aspectRatio": "16:9",
      "dimensions": "3840x2160",
      "filename": "BasicPCGuy_BlissRedux_4K.png",
      "filesizeBytes": 6710886,
      "filesizeFormatted": "6.4 MB",
      "downloadUrl": "/wallpapers/bliss-redux-8k/download/desktop-4k",
      "cdnUrl": "https://cdn.basicpcguy.com/wallpapers/bliss_redux_4k.png",
      "mimeType": "image/png"
    },
    "desktop-8k": {
      "formatId": "desktop-8k",
      "aspectRatio": "16:9",
      "dimensions": "7680x4320",
      "filename": "BasicPCGuy_BlissRedux_8K.png",
      "filesizeBytes": 19084083,
      "filesizeFormatted": "18.2 MB",
      "downloadUrl": "/wallpapers/bliss-redux-8k/download/desktop-8k",
      "cdnUrl": "https://cdn.basicpcguy.com/wallpapers/bliss_redux_8k.png",
      "mimeType": "image/png"
    },
    "ultrawide": {
      "formatId": "ultrawide",
      "aspectRatio": "21:9",
      "dimensions": "3440x1440",
      "filename": "BasicPCGuy_BlissRedux_Ultrawide.png",
      "filesizeBytes": 8493465,
      "filesizeFormatted": "8.1 MB",
      "downloadUrl": "/wallpapers/bliss-redux-8k/download/ultrawide",
      "cdnUrl": "https://cdn.basicpcguy.com/wallpapers/bliss_redux_uw.png",
      "mimeType": "image/png"
    },
    "surface": {
      "formatId": "surface",
      "aspectRatio": "3:2",
      "dimensions": "2880x1920",
      "filename": "BasicPCGuy_BlissRedux_Surface_3x2.png",
      "filesizeBytes": 6186598,
      "filesizeFormatted": "5.9 MB",
      "downloadUrl": "/wallpapers/bliss-redux-8k/download/surface",
      "cdnUrl": "https://cdn.basicpcguy.com/wallpapers/bliss_redux_surface.png",
      "mimeType": "image/png"
    },
    "mobile": {
      "formatId": "mobile",
      "aspectRatio": "9:16",
      "dimensions": "1290x2796",
      "filename": "BasicPCGuy_BlissRedux_Mobile.png",
      "filesizeBytes": 3984588,
      "filesizeFormatted": "3.8 MB",
      "downloadUrl": "/wallpapers/bliss-redux-8k/download/mobile",
      "cdnUrl": "https://cdn.basicpcguy.com/wallpapers/bliss_redux_mobile.png",
      "mimeType": "image/png"
    }
  }
}`;

  const ARTICLE_JSON_SCHEMA = `{
  "id": "death-of-rgb-stealth-pc",
  "slug": "death-of-rgb-stealth-pc",
  "title": "The Quiet Rebellion: Building a Zero-RGB Stealth Workstation",
  "subtitle": "No rainbow cycles. No proprietary bloatware suites. Just industrial matte black and silent bearings.",
  "category": "Hardware Review",
  "date": "2026-09-21T00:00:00.000Z",
  "readTimeMinutes": 8,
  "author": {
    "name": "Basic PC Guy",
    "handle": "@thebasicpcguy",
    "avatarUrl": "https://basicpcguy.com/avatar.jpg"
  },
  "coverImage": {
    "url": "https://cdn.basicpcguy.com/articles/stealth-cover.png",
    "alt": "FormD T1 stealth PC with all-black Noctua fans"
  },
  "excerpt": "At some point, personal computing began looking like a carnival midway. We traded thermal focus for 32-zone diffused diffusers...",
  "contentMarkdown": "## The Case for Optical Silence\\n\\nMy workspace has one rule...",
  "tags": ["Hardware", "SFF", "Noctua", "Minimalism", "Workstation"]
}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white max-w-4xl w-full rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-[#fafaf9]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-neutral-900">
                Backend Architecture & API Specifications
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                Full URL mapping and database entity schema documentation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-6 pt-4 border-b border-neutral-100 flex gap-2 bg-neutral-50">
          <button
            onClick={() => setActiveTab('urls')}
            className={`px-4 py-2 font-medium text-xs sm:text-sm rounded-t-xl transition-colors cursor-pointer ${
              activeTab === 'urls'
                ? 'bg-white text-neutral-900 border-t border-x border-neutral-200 font-semibold'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Webpage & API URLs (16 Endpoints)
          </button>
          <button
            onClick={() => setActiveTab('wallpaper-schema')}
            className={`px-4 py-2 font-medium text-xs sm:text-sm rounded-t-xl transition-colors cursor-pointer ${
              activeTab === 'wallpaper-schema'
                ? 'bg-white text-neutral-900 border-t border-x border-neutral-200 font-semibold'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Wallpaper JSON Entity
          </button>
          <button
            onClick={() => setActiveTab('article-schema')}
            className={`px-4 py-2 font-medium text-xs sm:text-sm rounded-t-xl transition-colors cursor-pointer ${
              activeTab === 'article-schema'
                ? 'bg-white text-neutral-900 border-t border-x border-neutral-200 font-semibold'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Article / Essay JSON Entity
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'urls' && (
            <div className="space-y-3">
              <p className="text-xs text-neutral-500 font-mono mb-4">
                List of all frontend routes and backend REST controller mappings to connect your React app to Express / Nest.js / FastAPI / Spring Boot:
              </p>
              <div className="border border-neutral-200 rounded-2xl overflow-hidden divide-y divide-neutral-100">
                {URL_MAPPINGS.map((item, idx) => (
                  <div key={idx} className="p-3.5 hover:bg-neutral-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          item.type.includes('API') 
                            ? 'bg-blue-100 text-blue-700' 
                            : item.type.includes('Download')
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-neutral-200 text-neutral-800'
                        }`}>
                          {item.type}
                        </span>
                        <code className="text-xs font-mono font-semibold text-neutral-900">
                          {item.path}
                        </code>
                      </div>
                      <p className="text-xs text-neutral-500 font-sans">
                        {item.purpose}
                      </p>
                    </div>
                    <button
                      onClick={() => copyCode(item.path, `url-${idx}`)}
                      className="self-start sm:self-center p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-400 hover:text-neutral-900 transition-colors"
                      title="Copy path"
                    >
                      {copiedKey === `url-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wallpaper-schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-500">
                  Target Entity: Wallpaper.json (Includes multi-resolution file variants)
                </span>
                <button
                  onClick={() => copyCode(WALLPAPER_JSON_SCHEMA, 'wallpaper-schema')}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-neutral-900 text-white hover:bg-neutral-800"
                >
                  {copiedKey === 'wallpaper-schema' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy JSON</span>
                </button>
              </div>
              <pre className="p-4 bg-neutral-950 text-neutral-200 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-neutral-800">
                {WALLPAPER_JSON_SCHEMA}
              </pre>
            </div>
          )}

          {activeTab === 'article-schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-500">
                  Target Entity: Article.json (Reviews, essays, reading time)
                </span>
                <button
                  onClick={() => copyCode(ARTICLE_JSON_SCHEMA, 'article-schema')}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-neutral-900 text-white hover:bg-neutral-800"
                >
                  {copiedKey === 'article-schema' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy JSON</span>
                </button>
              </div>
              <pre className="p-4 bg-neutral-950 text-neutral-200 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-neutral-800">
                {ARTICLE_JSON_SCHEMA}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <span className="font-mono">Ready to bind to Prisma / TypeORM / Mongoose / Spring Data</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-neutral-900 text-white font-medium hover:bg-neutral-800 cursor-pointer"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
