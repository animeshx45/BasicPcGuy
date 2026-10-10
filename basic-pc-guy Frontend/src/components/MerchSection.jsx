import React, { useState } from 'react';
import { ShoppingBag, ArrowUpRight, Check, Heart, ShieldCheck, Truck } from 'lucide-react';
import { MERCH_ITEMS, SUPPORTER_TIERS } from '../data/merch';
import { WallpaperGraphic } from './WallpaperGraphic';

export function MerchSection({ onShowToast }) {
  const [orderedId, setOrderedId] = useState(null);

  const handleOrder = (item) => {
    setOrderedId(item.id);
    onShowToast(`Simulated Order: Added "${item.title}" to cart!`);
    setTimeout(() => setOrderedId(null), 2500);
  };

  return (
    <section id="merch-section" className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 border-t border-neutral-200/70">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-neutral-200/70">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">
            The Mercantile
          </span>
          <h2 className="font-instrument-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-950 font-normal">
            Physical Artifacts for Your Battlestation
          </h2>
        </div>
        <p className="text-neutral-500 text-sm max-w-md">
          Small-batch desk mats, CNC brass keycaps, and commemorative pins. Crafted with the same zero-compromise precision as our digital renders.
        </p>
      </div>

      {/* Merch Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {MERCH_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-400 p-5 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md"
          >
            <div className="space-y-4">
              {/* Product preview */}
              <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100 relative border border-neutral-100">
                <WallpaperGraphic type={item.imageType} aspect="1/1" className="group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-2.5 right-2.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/95 text-neutral-800 shadow-xs">
                  {item.badge}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-neutral-400">{item.category}</span>
                <h3 className="font-instrument-serif text-xl text-neutral-900 group-hover:text-black leading-snug mt-0.5">
                  {item.title}
                </h3>
                <div className="text-sm font-semibold text-neutral-900 mt-1">{item.price}</div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">
                {item.description}
              </p>

              <ul className="space-y-1 text-[11px] text-neutral-500 font-mono">
                {item.specs.map((s, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-neutral-400" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleOrder(item)}
              className="mt-6 w-full py-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-medium flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-xs"
            >
              {orderedId === item.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Batch Item</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Battlestation Gear Showcase */}
      <div className="bg-[#fafaf9] rounded-3xl border border-neutral-200/80 p-8 sm:p-12 mb-16">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
            Workspace Blueprint
          </span>
          <h3 className="font-instrument-serif text-3xl sm:text-4xl text-neutral-900 mt-1">
            The Reference Battlestation
          </h3>
          <p className="text-neutral-600 text-sm mt-2 leading-relaxed">
            Every wallpaper and essay on Basic PC Guy is tested and color-calibrated on this exact daily-driver configuration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div className="space-y-1 bg-white p-4 rounded-xl border border-neutral-200/60 shadow-xs">
            <span className="text-[11px] font-mono text-neutral-400">DISPLAY</span>
            <div className="font-semibold text-neutral-800">Alienware 34" QD-OLED</div>
            <p className="text-xs text-neutral-500">3440×1440 @ 175Hz • 99.3% DCI-P3 calibrated with Calman.</p>
          </div>

          <div className="space-y-1 bg-white p-4 rounded-xl border border-neutral-200/60 shadow-xs">
            <span className="text-[11px] font-mono text-neutral-400">CHASSIS & CPU</span>
            <div className="font-semibold text-neutral-800">FormD T1 v2.1 + 7800X3D</div>
            <p className="text-xs text-neutral-500">9.95L CNC anodized black SFF chassis. Zero RGB headers connected.</p>
          </div>

          <div className="space-y-1 bg-white p-4 rounded-xl border border-neutral-200/60 shadow-xs">
            <span className="text-[11px] font-mono text-neutral-400">ACOUSTICS</span>
            <div className="font-semibold text-neutral-800">Noctua NF-A12x25 Chromax</div>
            <p className="text-xs text-neutral-500">Sterrox liquid-crystal polymer fans running at a constant 680 RPM.</p>
          </div>

          <div className="space-y-1 bg-white p-4 rounded-xl border border-neutral-200/60 shadow-xs">
            <span className="text-[11px] font-mono text-neutral-400">KEYBOARD</span>
            <div className="font-semibold text-neutral-800">Mode Sonnet (75%)</div>
            <p className="text-xs text-neutral-500">Brass accent weight, lubed Gateron Oil King linear switches, GMK Minimal.</p>
          </div>
        </div>
      </div>

    </section>
  );
}
