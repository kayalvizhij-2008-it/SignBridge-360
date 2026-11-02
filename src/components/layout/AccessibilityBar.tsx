import React from 'react';
import { useAccessibility, LANGUAGES } from '../../context/AccessibilityContext';
import { Eye, Type, Zap, Bell, CheckCircle2, Globe } from 'lucide-react';

export const AccessibilityBar: React.FC = () => {
  const {
    highContrast,
    toggleHighContrast,
    fontSize,
    cycleFontSize,
    reducedMotion,
    toggleReducedMotion,
    soundAndFlash,
    toggleSoundAndFlash,
    triggerScreenFlash,
    activeLanguage,
    setActiveLanguage,
    signDialect,
    setSignDialect,
    isOffline,
    isKioskMode,
    toggleKioskMode,
    kioskIdleSeconds,
  } = useAccessibility();

  return (
    <aside
      className="bg-brand-charcoal text-white text-xs py-2 px-4 border-b border-brand-charcoal-light relative z-40 transition-colors"
      aria-label="Accessibility quick settings toolbar"
    >
      {/* Skip to Main Content Link for Keyboard / Screen Reader Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-brand-yellow focus:text-brand-charcoal focus:font-black focus:rounded-2xl focus:shadow-2xl focus:border-2 focus:border-brand-charcoal"
      >
        Skip to Main Content
      </a>

      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Accessibility Controls */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          <span className="font-bold tracking-wider uppercase text-[10px] text-brand-yellow flex items-center gap-1.5 mr-1">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
            Accessibility Bar
          </span>

          {/* High Contrast Mode Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
              highContrast
                ? 'bg-brand-yellow text-brand-charcoal font-bold border-brand-yellow'
                : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20'
            }`}
            aria-pressed={highContrast}
            title="Toggle High Contrast Mode for vision assistance"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>High Contrast: {highContrast ? 'ON' : 'OFF'}</span>
          </button>

          {/* Font Size Scaling */}
          <button
            onClick={cycleFontSize}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center gap-1.5 transition-all"
            title="Increase font size (Normal -> Large -> Extra Large)"
          >
            <Type className="w-3.5 h-3.5 text-brand-mint" />
            <span>
              Text:{' '}
              {fontSize === 'normal'
                ? '100%'
                : fontSize === 'large'
                ? '115%'
                : '130%'}
            </span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={toggleReducedMotion}
            className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
              reducedMotion
                ? 'bg-brand-violet text-white font-bold border-brand-violet'
                : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20'
            }`}
            aria-pressed={reducedMotion}
            title="Toggle Reduced Motion"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Reduced Motion: {reducedMotion ? 'ON' : 'OFF'}</span>
          </button>

          {/* Kiosk Mode Toggle */}
          <button
            onClick={toggleKioskMode}
            className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
              isKioskMode
                ? 'bg-brand-coral text-white font-bold border-brand-coral'
                : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20'
            }`}
            title="Toggle Kiosk Mode (Large 72px touch targets & idle reset)"
          >
            <span>🖥️ Kiosk: {isKioskMode ? `${kioskIdleSeconds}s` : 'OFF'}</span>
          </button>

          {/* Sound & Screen Flash Alert */}
          <button
            onClick={toggleSoundAndFlash}
            className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
              soundAndFlash
                ? 'bg-white/15 text-brand-coral-light border-brand-coral/40'
                : 'bg-white/5 text-gray-400 border-white/10'
            }`}
            title="Toggle Visual & Sound Alert signals"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Visual Alerts: {soundAndFlash ? 'Active' : 'Muted'}</span>
          </button>

          {/* Test Screen Flash */}
          <button
            onClick={triggerScreenFlash}
            className="px-2 py-1 rounded-lg bg-brand-coral/20 hover:bg-brand-coral/40 text-brand-coral-light border border-brand-coral/40 text-[11px] font-medium transition-colors"
            title="Simulate visual beacon flash"
          >
            Test Flash
          </button>
        </div>

        {/* Right: Language, Dialect & Offline State */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Sign Dialect Selector */}
          <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg border border-white/20">
            <span className="text-[10px] text-gray-400 font-bold">Sign:</span>
            {(['ISL', 'ASL', 'BSL'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setSignDialect(d)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-black transition-colors ${
                  signDialect === d ? 'bg-brand-violet text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Offline status pill */}
          <div className="hidden lg:flex items-center gap-1.5 text-brand-mint text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isOffline ? 'Offline Standalone' : 'Offline Cached'}</span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg border border-white/20">
            <Globe className="w-3.5 h-3.5 text-brand-yellow" />
            <select
              value={activeLanguage.code}
              onChange={(e) => {
                const found = LANGUAGES.find((l) => l.code === e.target.value);
                if (found) setActiveLanguage(found);
              }}
              className="bg-transparent text-white text-xs border-none outline-none cursor-pointer pr-1"
              aria-label="Select application language"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-brand-charcoal text-white">
                  {lang.flag} {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </aside>
  );
};
