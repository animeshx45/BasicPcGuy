import React, { useState } from 'react';
import { Heart, Coffee, Check, X, Shield, Sparkles } from 'lucide-react';
import { SUPPORTER_TIERS } from '../data/merch';

export function TipJarModal({ onClose, onShowToast }) {
  const [selectedTier, setSelectedTier] = useState('espresso');
  const [customAmount, setCustomAmount] = useState('5');
  const [processing, setProcessing] = useState(false);

  const handleTip = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onClose();
      onShowToast(`Thank you! Your coffee support keeps the 8K wallpaper CDN ad-free.`);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-2">
            <Heart className="w-6 h-6 fill-red-500" />
          </div>
          <h3 className="font-instrument-serif text-3xl text-neutral-950">
            Keep Basic PC Guy Ad-Free
          </h3>
          <p className="text-neutral-600 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
            No cookie banners, no popups, no ad trackers. Wallpapers are rendered at full 8K fidelity and hosted for everyone.
          </p>
        </div>

        {/* Tiers */}
        <div className="space-y-3 mb-6">
          {SUPPORTER_TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex items-start justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-50 shadow-xs'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="space-y-1 pr-3">
                  <div className="font-medium text-sm text-neutral-900 flex items-center gap-2">
                    <span>{tier.name}</span>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-800">
                      {tier.amount}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-normal">
                    {tier.description}
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 ${
                  isSelected ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300'
                }`}>
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <button
          onClick={handleTip}
          disabled={processing}
          className="w-full py-3.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 font-medium text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-xs cursor-pointer"
        >
          {processing ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Coffee className="w-4 h-4" />
              <span>Send Support via Coffee / Stripe</span>
            </>
          )}
        </button>

        <p className="text-center text-[10px] font-mono text-neutral-400 mt-4">
          One-time contribution • Powered by Stripe / Ko-fi integration
        </p>
      </div>
    </div>
  );
}
