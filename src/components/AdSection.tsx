import React, { useState } from 'react';
import { ExternalLink, Info, Sparkles, X, ShieldCheck, Zap } from 'lucide-react';
import { ADS_DATA } from '../data/clinicData.ts';
import { safeGetStorage, safeSetStorage } from '../utils/logic.ts';

const AD_DISMISSED_KEY = 'faceplant_ad_minimized';

export const AdSection: React.FC = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    return safeGetStorage<boolean>(AD_DISMISSED_KEY, false);
  });

  const ad = ADS_DATA[currentAdIndex];

  const handleToggleMinimize = () => {
    const next = !isMinimized;
    setIsMinimized(next);
    safeSetStorage(AD_DISMISSED_KEY, next);
  };

  const handleNextAd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentAdIndex((prev) => (prev + 1) % ADS_DATA.length);
  };

  if (isMinimized) {
    return (
      <aside aria-label="Sponsored Partners" className="w-full bg-slate-100 border-t border-slate-200 py-2 px-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-600 uppercase tracking-wider text-[10px] bg-slate-200 px-1.5 py-0.5 rounded">
              Ad Partner
            </span>
            <span>Sponsored health & aesthetic innovations</span>
          </div>
          <button
            onClick={handleToggleMinimize}
            className="text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer"
          >
            Show Sponsored Partner
          </button>
        </div>
      </aside>
    );
  }

  const renderIcon = () => {
    if (ad.icon === 'ShieldCheck') return <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />;
    if (ad.icon === 'Zap') return <Zap className="w-5 h-5 text-amber-500 shrink-0" />;
    return <Sparkles className="w-5 h-5 text-indigo-500 shrink-0" />;
  };

  return (
    <aside aria-label="Sponsored Medical Technology" className="w-full bg-gradient-to-r from-blue-50/80 via-slate-50 to-indigo-50/80 border-y border-slate-200/90 py-3.5 px-4 shadow-inner relative transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left Side: Tag & Sponsor Info */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="w-9 h-9 rounded-lg bg-white shadow-xs border border-blue-100 flex items-center justify-center shrink-0">
            {renderIcon()}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                Sponsored • {ad.badge}
              </span>
              <span className="text-xs font-semibold text-slate-800">{ad.sponsor}</span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 font-medium line-clamp-1">
              {ad.tagline} — <span className="text-slate-500 font-normal">{ad.description}</span>
            </p>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
          <button
            onClick={handleNextAd}
            title="Next sponsor"
            className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1 rounded hover:bg-slate-200/60 transition cursor-pointer"
          >
            Next Partner ({currentAdIndex + 1}/{ADS_DATA.length})
          </button>
          <a
            href={ad.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 px-3 py-1.5 rounded-md shadow-2xs hover:shadow-xs transition cursor-pointer"
          >
            <span>{ad.cta}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={handleToggleMinimize}
            title="Minimize advertisement"
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition cursor-pointer"
            aria-label="Minimize advertisement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
