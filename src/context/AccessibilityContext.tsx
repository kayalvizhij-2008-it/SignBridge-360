import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { UserMode, FontSize, Language, ToastMessage } from '../types';

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🌐' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];

interface AccessibilityContextType {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  cycleFontSize: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  soundAndFlash: boolean;
  toggleSoundAndFlash: () => void;
  screenFlashActive: boolean;
  triggerScreenFlash: () => void;
  activeLanguage: Language;
  setActiveLanguage: (lang: Language) => void;
  signDialect: 'ISL' | 'ASL' | 'BSL';
  setSignDialect: (dialect: 'ISL' | 'ASL' | 'BSL') => void;
  isOffline: boolean;
  isOfflineSimulation: boolean;
  toggleOfflineSimulation: () => void;
  screenReaderAnnouncement: string;
  announce: (message: string) => void;
  clearLocalUserData: () => void;

  // Phase 3 Kiosk & Functional Component Additions
  isKioskMode: boolean;
  toggleKioskMode: () => void;
  kioskIdleSeconds: number;
  resetKioskTimer: () => void;

  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;

  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  unreadNotificationsCount: number;
  markNotificationsAsRead: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userMode, setUserMode] = useState<UserMode>(() => {
    return (localStorage.getItem('sb_user_mode') as UserMode) || 'deaf';
  });

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('sb_high_contrast') === 'true';
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem('sb_font_size') as FontSize) || 'normal';
  });

  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    return (
      localStorage.getItem('sb_reduced_motion') === 'true' ||
      (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    );
  });

  const [soundAndFlash, setSoundAndFlash] = useState<boolean>(true);
  const [screenFlashActive, setScreenFlashActive] = useState<boolean>(false);
  const [activeLanguage, setActiveLanguageState] = useState<Language>(LANGUAGES[0]);
  const [signDialect, setSignDialectState] = useState<'ISL' | 'ASL' | 'BSL'>('ISL');
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [isOfflineSimulation, setIsOfflineSimulation] = useState<boolean>(false);
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState<string>('');

  // Kiosk Mode & Auto-clear
  const [isKioskMode, setIsKioskMode] = useState<boolean>(() => {
    return localStorage.getItem('sb_kiosk_mode') === 'true';
  });
  const [kioskIdleSeconds, setKioskIdleSeconds] = useState<number>(90);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Command Palette & Notifications
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>(2);

  // Manage Online/Offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update HTML class for High Contrast
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('sb_high_contrast', String(highContrast));
  }, [highContrast]);

  // Update HTML root font scaling
  useEffect(() => {
    const scale = fontSize === 'normal' ? '1' : fontSize === 'large' ? '1.15' : '1.3';
    document.documentElement.style.setProperty('--font-scale', scale);
    localStorage.setItem('sb_font_size', fontSize);
  }, [fontSize]);

  // Update Reduced Motion class
  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
    localStorage.setItem('sb_reduced_motion', String(reducedMotion));
  }, [reducedMotion]);

  // Update Kiosk Mode class
  useEffect(() => {
    if (isKioskMode) {
      document.documentElement.classList.add('kiosk-mode');
    } else {
      document.documentElement.classList.remove('kiosk-mode');
    }
    localStorage.setItem('sb_kiosk_mode', String(isKioskMode));
  }, [isKioskMode]);

  // Global Command+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset Kiosk Timer
  const resetKioskTimer = useCallback(() => {
    setKioskIdleSeconds(90);
  }, []);

  // Kiosk countdown timer
  useEffect(() => {
    if (!isKioskMode) return;

    const timer = setInterval(() => {
      setKioskIdleSeconds((prev) => {
        if (prev <= 1) {
          // Auto clear
          localStorage.removeItem('sb_saved_qr_profile');
          announce('Kiosk session auto-cleared after period of inactivity for privacy.');
          return 90;
        }
        return prev - 1;
      });
    }, 1000);

    const handleUserInteraction = () => resetKioskTimer();
    window.addEventListener('pointerdown', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      clearInterval(timer);
      window.removeEventListener('pointerdown', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [isKioskMode, resetKioskTimer]);

  const toggleHighContrast = () => setHighContrast((prev) => !prev);

  const cycleFontSize = () => {
    setFontSizeState((prev) => {
      if (prev === 'normal') return 'large';
      if (prev === 'large') return 'extra-large';
      return 'normal';
    });
  };

  const setFontSize = (size: FontSize) => setFontSizeState(size);

  const toggleReducedMotion = () => setReducedMotion((prev) => !prev);

  const toggleSoundAndFlash = () => setSoundAndFlash((prev) => !prev);

  const toggleKioskMode = () => {
    setIsKioskMode((prev) => {
      const next = !prev;
      announce(next ? 'Kiosk Touch Mode activated (1920x1080 display)' : 'Standard Responsive Mode active');
      return next;
    });
  };

  const triggerScreenFlash = () => {
    if (!soundAndFlash) return;
    setScreenFlashActive(true);
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([150, 80, 150]);
      } catch {
        // Ignored if unpermitted
      }
    }
    setTimeout(() => setScreenFlashActive(false), 900);
  };

  const setActiveLanguage = (lang: Language) => {
    setActiveLanguageState(lang);
    announce(`Spoken interface language switched to ${lang.name}`);
  };

  const setSignDialect = (dialect: 'ISL' | 'ASL' | 'BSL') => {
    setSignDialectState(dialect);
    announce(`Sign language dialect preference set to ${dialect}`);
  };

  const toggleOfflineSimulation = () => {
    setIsOfflineSimulation((prev) => {
      const next = !prev;
      announce(next ? 'Simulated Offline Mode activated' : 'Online network restored');
      return next;
    });
  };

  const announce = (message: string) => {
    setScreenReaderAnnouncement(message);
    setTimeout(() => setScreenReaderAnnouncement(''), 3000);
  };

  const clearLocalUserData = () => {
    localStorage.removeItem('sb_saved_qr_profile');
    localStorage.removeItem('sb_user_mode');
    localStorage.removeItem('sb_emergency_allergies');
    localStorage.removeItem('sb_emergency_blood');
    localStorage.removeItem('sb_emergency_ice_phone');
    announce('All local user data cleared from this device');
  };

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
    triggerScreenFlash();

    setTimeout(() => {
      dismissToast(id);
    }, toast.durationMs || 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markNotificationsAsRead = () => {
    setUnreadNotificationsCount(0);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        userMode,
        setUserMode: (mode) => {
          setUserMode(mode);
          localStorage.setItem('sb_user_mode', mode);
          announce(`Switched to ${mode === 'deaf' ? 'Deaf & Hard of Hearing' : 'Hearing Staff'} mode`);
        },
        highContrast,
        toggleHighContrast,
        fontSize,
        setFontSize,
        cycleFontSize,
        reducedMotion,
        toggleReducedMotion,
        soundAndFlash,
        toggleSoundAndFlash,
        screenFlashActive,
        triggerScreenFlash,
        activeLanguage,
        setActiveLanguage,
        signDialect,
        setSignDialect,
        isOffline: isOffline || isOfflineSimulation,
        isOfflineSimulation,
        toggleOfflineSimulation,
        screenReaderAnnouncement,
        announce,
        clearLocalUserData,

        isKioskMode,
        toggleKioskMode,
        kioskIdleSeconds,
        resetKioskTimer,

        toasts,
        showToast,
        dismissToast,

        isCommandPaletteOpen,
        setIsCommandPaletteOpen,

        isNotificationsOpen,
        setIsNotificationsOpen,
        unreadNotificationsCount,
        markNotificationsAsRead,
      }}
    >
      {/* Hidden ARIA Live region for screen readers */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {screenReaderAnnouncement}
      </div>

      {/* Visual Flash Alert Overlay for Deaf & Hard of Hearing alerts */}
      {screenFlashActive && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-50 pointer-events-none border-8 border-brand-coral bg-brand-coral/20 animate-pulse transition-opacity"
        />
      )}

      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
