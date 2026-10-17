import React, { useState } from 'react';
import { Sliders, Check, Zap, Eye, Gauge, X } from 'lucide-react';
import { useAnimation } from '../context/AnimationContext.tsx';
import type { AnimationIntensity, AnimationSpeed } from '../types/index.ts';

export const AnimationControlsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { speed, intensity, setSpeed, setIntensity } = useAnimation();

  const speeds: { id: AnimationSpeed; label: string; desc: string }[] = [
    { id: 'slow', label: 'SLOW', desc: 'Relaxed fades & movement (1.8x)' },
    { id: 'normal', label: 'NORMAL', desc: 'Balanced natural transitions (1.0x)' },
    { id: 'fast', label: 'FAST', desc: 'Snappy quick response (0.5x)' },
    { id: 'off', label: 'OFF', desc: 'Instant transitions / zero motion' },
  ];

  const intensities: { id: AnimationIntensity; label: string; desc: string }[] = [
    { id: 'subtle', label: 'SUBTLE', desc: 'Light opacity & gentle shift' },
    { id: 'medium', label: 'MEDIUM', desc: 'Balanced elevation & scale' },
    { id: 'strong', label: 'STRONG', desc: 'Expressive movement & depth' },
  ];

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-slate-900/90 backdrop-blur-md text-white hover:bg-blue-600 px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 text-xs font-semibold group cursor-pointer border border-slate-700/60"
        title="Adjust Animation & Motion Controls"
        aria-label="Adjust Animation & Motion Controls"
      >
        <Sliders className="w-4 h-4 group-hover:rotate-45 transition-transform" />
        <span className="hidden sm:inline">Motion: {speed.toUpperCase()}</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Gauge className="w-5 h-5 text-blue-200" />
                <h3 className="font-bold text-lg text-white">Animation & Motion Controls</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
                aria-label="Close motion controls"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Animation Speed */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Animation Speed
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {speeds.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSpeed(s.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                        speed === s.id
                          ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-600/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{s.label}</span>
                        {speed === s.id && <Check className="w-4 h-4 text-blue-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-tight">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Animation Intensity */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Animation Intensity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {intensities.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setIntensity(item.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        intensity === item.id
                          ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-600/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <span className="font-bold text-xs block">{item.label}</span>
                      <p className="text-[10px] text-slate-500 mt-1">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
                <div className="flex items-center justify-between mb-1.5 font-medium text-slate-700">
                  <span>Current Setting:</span>
                  <span className="font-bold text-blue-600">
                    {speed.toUpperCase()} • {intensity.toUpperCase()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Settings are automatically saved in your browser localStorage. Respects system reduced-motion preferences.
                </p>
              </div>

              {/* Apply / Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl shadow-xs transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
