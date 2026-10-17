import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AnimationIntensity, AnimationSettings, AnimationSpeed } from '../types/index.ts';
import { safeGetStorage, safeSetStorage } from '../utils/logic.ts';

interface AnimationContextType {
  speed: AnimationSpeed;
  intensity: AnimationIntensity;
  setSpeed: (speed: AnimationSpeed) => void;
  setIntensity: (intensity: AnimationIntensity) => void;
  getTransitionDuration: (baseDuration?: number) => number;
}

const STORAGE_KEY = 'faceplant_anim_settings';

const defaultSettings: AnimationSettings = {
  speed: 'normal',
  intensity: 'medium',
};

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AnimationSettings>(() => {
    return safeGetStorage<AnimationSettings>(STORAGE_KEY, defaultSettings);
  });

  useEffect(() => {
    safeSetStorage(STORAGE_KEY, settings);

    // Apply speed class to document root
    const root = document.documentElement;
    root.classList.remove('anim-speed-slow', 'anim-speed-fast', 'anim-speed-off');
    if (settings.speed === 'slow') {
      root.classList.add('anim-speed-slow');
    } else if (settings.speed === 'fast') {
      root.classList.add('anim-speed-fast');
    } else if (settings.speed === 'off') {
      root.classList.add('anim-speed-off');
    }
  }, [settings]);

  const setSpeed = (speed: AnimationSpeed) => {
    setSettings((prev) => ({ ...prev, speed }));
  };

  const setIntensity = (intensity: AnimationIntensity) => {
    setSettings((prev) => ({ ...prev, intensity }));
  };

  const getTransitionDuration = (baseDuration: number = 0.4): number => {
    if (settings.speed === 'off') return 0.001;
    if (settings.speed === 'fast') return baseDuration * 0.5;
    if (settings.speed === 'slow') return baseDuration * 1.8;
    return baseDuration;
  };

  return (
    <AnimationContext.Provider
      value={{
        speed: settings.speed,
        intensity: settings.intensity,
        setSpeed,
        setIntensity,
        getTransitionDuration,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
