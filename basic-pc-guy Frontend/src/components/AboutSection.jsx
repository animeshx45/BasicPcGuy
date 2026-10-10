import React, { useState, useEffect } from 'react';
import { Cpu, Monitor, ShieldCheck, Heart } from 'lucide-react';
import { SocialIcons } from './SocialIcons';
import { Logo } from './Logo';
import { getAbout } from '../services/api';

export function AboutSection({ isDark = false }) {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadAbout() {
      try {
        const data = await getAbout();
        if (isMounted && data) {
          setAboutData(data);
        }
      } catch (err) {
        console.warn('Could not load backend /api/about:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadAbout();
    return () => { isMounted = false; };
  }, []);

  // Icon selector helper
  const getPillarIcon = (iconName, idx) => {
    const key = (iconName || '').toLowerCase();
    if (key.includes('monitor') || key.includes('display')) return <Monitor className="w-4 h-4 text-blue-500" />;
    if (key.includes('shield') || key.includes('security')) return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
    if (key.includes('cpu') || key.includes('hardware')) return <Cpu className="w-4 h-4 text-amber-500" />;
    if (idx === 0) return <Monitor className="w-4 h-4 text-blue-500" />;
    if (idx === 1) return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
    return <Heart className="w-4 h-4 text-rose-500" />;
  };

  const title = aboutData?.title || 'A Quiet Haven for Calm Computing';
  const subtitle = aboutData?.subtitle || 'About Basic PC Guy';
  const descriptions = Array.isArray(aboutData?.description)
    ? aboutData.description
    : typeof aboutData?.description === 'string'
      ? aboutData.description.split('\n\n').filter(Boolean)
      : [
          'Basic PC Guy is an independent project dedicated to clean desktops and calm aesthetics for the PC ecosystem.',
          'Every wallpaper is handcrafted with care for personal computers and mobile setups. Free for everyone, with zero ads, zero trackers, and zero bloat.'
        ];

  const pillars = Array.isArray(aboutData?.pillars) && aboutData.pillars.length > 0
    ? aboutData.pillars
    : [
        {
          title: 'Crisp Fidelity',
          description: 'Carefully calibrated for desktop monitors and phones.',
          icon: 'monitor'
        },
        {
          title: 'Zero Bloat',
          description: 'No trackers, no popup ads, and no paywalls.',
          icon: 'shield'
        },
        {
          title: 'Independent & Free',
          description: 'Free to download for personal desk setups and battle-stations.',
          icon: 'cpu'
        }
      ];

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-14 sm:py-20 animate-in fade-in duration-200">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header with Logo */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <span className={`text-[11px] font-mono uppercase tracking-widest block mb-1 ${
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              {subtitle}
            </span>
            <h1 className={`font-instrument-serif text-3xl sm:text-5xl font-normal ${
              isDark ? 'text-white' : 'text-neutral-950'
            }`}>
              {title}
            </h1>
          </div>
          <Logo isDark={isDark} iconOnly={true} size="lg" />
        </div>

        {/* Story description */}
        <div className={`space-y-4 text-base sm:text-lg leading-relaxed ${
          isDark ? 'text-neutral-300' : 'text-neutral-700'
        }`}>
          {descriptions.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border ${
                isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-200 shadow-2xs'
              }`}
            >
              <div className={`font-medium text-sm flex items-center gap-2 mb-1.5 ${
                isDark ? 'text-white' : 'text-neutral-950'
              }`}>
                {getPillarIcon(pillar.icon, idx)}
                <span>{pillar.title}</span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Social channels connect */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200 dark:border-neutral-800">
          <span className="text-xs font-mono text-neutral-400">
            Follow on social media:
          </span>
          <SocialIcons isDark={isDark} />
        </div>

      </div>
    </div>
  );
}
