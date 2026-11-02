import React, { useState } from 'react';
import type { AppPage, EnvironmentType } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';
import { ENVIRONMENTS_DATA } from '../data/phrases';
import { passService } from '../services/passService';
import {
  HeartPulse,
  Train,
  GraduationCap,
  Landmark,
  Building2,
  AlertTriangle,
  MessageSquare,
  QrCode,
  Video,
  Users,
  ArrowRight,
  Volume2,
  ChevronRight,
  Sparkles,
  Compass,
  Camera,
  Wifi,
  WifiOff,
  Clock,
  Layers,
  HardDrive,
  BarChart3,
  Search,
  CheckCircle2,
  ChevronLeft,
} from 'lucide-react';
import { speakText } from '../utils/speech';

interface DashboardPageProps {
  onNavigate: (page: AppPage, initialPhrase?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const {
    userMode,
    setUserMode,
    activeLanguage,
    signDialect,
    triggerScreenFlash,
    announce,
    isOffline,
    setIsCommandPaletteOpen,
    setIsNotificationsOpen,
    unreadNotificationsCount,
    isKioskMode,
    toggleKioskMode,
  } = useAccessibility();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [selectedEnv, setSelectedEnv] = useState<EnvironmentType>('hospital');
  const [playingPhrase, setPlayingPhrase] = useState<string | null>(null);

  const currentEnvData = ENVIRONMENTS_DATA[selectedEnv];
  const userProfile = passService.getProfile();

  const handleSpeakPhrase = (text: string) => {
    setPlayingPhrase(text);
    triggerScreenFlash();
    speakText(
      text,
      activeLanguage.code === 'hi' ? 'hi-IN' : 'en-US',
      0.95,
      () => {},
      () => setPlayingPhrase(null)
    );
    announce(`Speaking: ${text}`);
  };

  const environmentsList: {
    id: EnvironmentType;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
  }[] = [
    {
      id: 'hospital',
      title: 'Hospital OPD & Triage',
      subtitle: 'Doctor, radiology, pain, dosage',
      icon: <HeartPulse className="w-5 h-5 text-brand-coral" />,
      color: 'border-brand-coral/40',
      bg: 'hover:bg-rose-50/50',
    },
    {
      id: 'railway',
      title: 'Railway & Transit',
      subtitle: 'Ticketing, platforms, delay text',
      icon: <Train className="w-5 h-5 text-brand-violet" />,
      color: 'border-brand-violet/40',
      bg: 'hover:bg-purple-50/50',
    },
    {
      id: 'college',
      title: 'Colleges & Labs',
      subtitle: 'Lectures, exams, accommodations',
      icon: <GraduationCap className="w-5 h-5 text-brand-mint-dark" />,
      color: 'border-brand-mint/40',
      bg: 'hover:bg-emerald-50/50',
    },
    {
      id: 'bank',
      title: 'Banks & Financial Desks',
      subtitle: 'Cash, KYC, card PIN privacy',
      icon: <Landmark className="w-5 h-5 text-amber-600" />,
      color: 'border-brand-yellow/50',
      bg: 'hover:bg-amber-50/50',
    },
    {
      id: 'government',
      title: 'Civic Offices & Registrar',
      subtitle: 'UDID cards, pensions, voter ID',
      icon: <Building2 className="w-5 h-5 text-brand-violet" />,
      color: 'border-brand-violet/40',
      bg: 'hover:bg-indigo-50/50',
    },
  ];

  const sidebarLinks: {
    page: AppPage;
    label: string;
    icon: React.ReactNode;
    badge?: string;
    isEmergency?: boolean;
  }[] = [
    { page: 'talk', label: 'Two-Way Talk', icon: <MessageSquare className="w-4 h-4 text-brand-coral" /> },
    { page: 'situations', label: 'Situations', icon: <Layers className="w-4 h-4 text-brand-violet" /> },
    { page: 'emergency', label: 'Emergency SOS', icon: <AlertTriangle className="w-4 h-4 text-alert-600" />, isEmergency: true },
    { page: 'signcheck', label: 'Sign Check Lab', icon: <Camera className="w-4 h-4 text-brand-mint-dark" />, badge: 'AI' },
    { page: 'signconnect', label: 'SignConnect', icon: <Video className="w-4 h-4 text-brand-yellow" /> },
    { page: 'qrpass', label: 'QR Pass', icon: <QrCode className="w-4 h-4 text-brand-coral" /> },
    { page: 'humanconnect', label: 'Interpreter VRS', icon: <Users className="w-4 h-4 text-amber-600" />, badge: 'Demo' },
    { page: 'visualguides', label: 'Visual Guides', icon: <Compass className="w-4 h-4 text-brand-mint-dark" /> },
    { page: 'queue', label: 'Queue Assist', icon: <Clock className="w-4 h-4 text-brand-violet" />, badge: 'H-104' },
    { page: 'offline', label: 'Offline Centre', icon: <HardDrive className="w-4 h-4 text-amber-600" /> },
    { page: 'institution', label: 'Analytics', icon: <BarChart3 className="w-4 h-4 text-brand-charcoal" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Application Toolbar */}
      <div className="p-4 rounded-3xl bg-white border border-brand-violet/20 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Left: Mode switcher + Kiosk toggle */}
        <div className="flex items-center gap-2">
          <div
            className="p-1 rounded-2xl bg-gray-100 flex items-center gap-1 text-xs font-bold"
            role="radiogroup"
            aria-label="Communication mode selection"
          >
            <button
              onClick={() => setUserMode('deaf')}
              role="radio"
              aria-checked={userMode === 'deaf'}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                userMode === 'deaf'
                  ? 'bg-brand-violet text-white shadow-sm'
                  : 'text-gray-600 hover:text-brand-charcoal'
              }`}
            >
              🤟 Deaf Mode
            </button>
            <button
              onClick={() => setUserMode('hearing')}
              role="radio"
              aria-checked={userMode === 'hearing'}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                userMode === 'hearing'
                  ? 'bg-brand-coral text-white shadow-sm'
                  : 'text-gray-600 hover:text-brand-charcoal'
              }`}
            >
              🎙️ Hearing Staff
            </button>
          </div>

          <button
            onClick={toggleKioskMode}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              isKioskMode
                ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-sm'
                : 'bg-white border-gray-200 text-gray-600 hover:text-brand-charcoal'
            }`}
            title="Toggle Kiosk Display Mode (72px touch targets)"
          >
            {isKioskMode ? '🖥️ Kiosk Active' : '🖥️ Kiosk Mode'}
          </button>
        </div>

        {/* Center: Search & Command Palette shortcut */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex-1 max-w-sm hidden md:flex items-center justify-between px-4 py-2 rounded-2xl bg-brand-warmWhite border border-gray-200 text-xs text-gray-500 hover:border-brand-violet hover:bg-white transition-all shadow-inner"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <span>Search screens, phrases, guides...</span>
          </span>
          <kbd className="px-1.5 py-0.5 rounded bg-white border text-[10px] font-mono font-bold text-gray-400">
            Ctrl+K
          </kbd>
        </button>

        {/* Right: Network Status + Notifications */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('offline')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isOffline
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
            }`}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-700" />
                <span>Offline</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-700" />
                <span>Online</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            aria-label="View notifications and visual alerts"
          >
            <Clock className="w-4 h-4 text-brand-violet" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-coral text-white text-[9px] font-black flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('emergency')}
            className="px-3 py-1.5 rounded-xl bg-alert-600 text-white text-xs font-black uppercase flex items-center gap-1.5 shadow-sm hover:bg-red-700 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>SOS</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Collapsible Navigation Sidebar (3 cols) + Main Workspace (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar Navigation */}
        <div className={`lg:col-span-3 space-y-4 ${isSidebarCollapsed ? 'lg:col-span-1' : ''}`}>
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-brand-violet/20 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-xs font-black uppercase text-brand-charcoal tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Modules</span>
              </span>
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden lg:flex p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700"
                aria-label="Toggle sidebar collapse"
              >
                {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

            <nav className="space-y-1.5" aria-label="Dashboard module shortcuts">
              {sidebarLinks.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`w-full p-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all text-left ${
                    item.isEmergency
                      ? 'bg-alert-600/10 text-alert-600 hover:bg-alert-600 hover:text-white'
                      : 'hover:bg-brand-violet/10 text-brand-charcoal hover:text-brand-violet'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isSidebarCollapsed && item.badge && (
                    <span className="px-1.5 py-0.5 rounded-md bg-brand-violet/10 text-brand-violet text-[9px] font-black uppercase">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* User Profile Summary Card */}
          {!isSidebarCollapsed && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-brand-violet/10 to-brand-coral/10 border border-brand-violet/20 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-violet text-white font-black text-sm flex items-center justify-center">
                  🤟
                </div>
                <div>
                  <h4 className="text-xs font-black text-brand-charcoal">{userProfile.name}</h4>
                  <p className="text-[10px] text-gray-500">{signDialect} Standard • Large Font</p>
                </div>
              </div>

              <div className="text-[11px] text-gray-600 pt-1 border-t border-brand-violet/15 space-y-1">
                <div className="flex items-center justify-between">
                  <span>Pass Barcode:</span>
                  <span className="text-emerald-700 font-bold">Generated</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Privacy Shield:</span>
                  <span className="text-brand-mint-dark font-bold">100% Local</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('qrpass')}
                className="w-full py-2 rounded-xl bg-white border border-brand-violet/20 text-brand-violet text-xs font-bold hover:bg-brand-violet hover:text-white transition-all shadow-sm"
              >
                View My Pass
              </button>
            </div>
          )}
        </div>

        {/* Main Workspace (9 cols) */}
        <div className={`space-y-6 ${isSidebarCollapsed ? 'lg:col-span-11' : 'lg:col-span-9'}`}>
          {/* 3 Top Action & Status Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Tile 1: Two-Way Talk */}
            <div
              onClick={() => onNavigate('talk')}
              className="p-5 rounded-3xl bg-white border border-brand-coral/30 shadow-sm hover:shadow-card-hover transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-brand-coral/15 flex items-center justify-center text-brand-coral">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-coral transition-colors" />
              </div>
              <div>
                <h3 className="text-base font-bold text-brand-charcoal font-display">Two-Way Talk</h3>
                <p className="text-xs text-gray-500 mt-0.5">Live speech-to-text dialogue with on-screen font resizing.</p>
              </div>
            </div>

            {/* Tile 2: Queue Status Widget (Sample data) */}
            <div
              onClick={() => onNavigate('queue')}
              className="p-5 rounded-3xl bg-white border border-brand-violet/30 shadow-sm hover:shadow-card-hover transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-brand-violet/15 flex items-center justify-center text-brand-violet">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  2 Ahead
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-brand-charcoal font-display">Token: H-104</h3>
                  <span className="text-[10px] text-gray-400">(Sample)</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Room 3B • Est. wait ~6 mins. Visual strobe ready.</p>
              </div>
            </div>

            {/* Tile 3: Interpreter Relay Status */}
            <div
              onClick={() => onNavigate('humanconnect')}
              className="p-5 rounded-3xl bg-white border border-brand-yellow/40 shadow-sm hover:shadow-card-hover transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-brand-yellow/20 flex items-center justify-center text-amber-700">
                  <Users className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                  Standby
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-brand-charcoal font-display">Video Relay (VRS)</h3>
                  <span className="text-[10px] text-gray-400">(Demo)</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Certified sign interpreter available on demand.</p>
              </div>
            </div>
          </div>

          {/* Situation Selector & Quick Phrases */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-brand-violet/20 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-brand-violet">
                  Contextual Assistance
                </span>
                <h3 className="text-xl font-black text-brand-charcoal font-display">
                  Public Service Phraselist
                </h3>
              </div>

              <button
                onClick={() => onNavigate('situations')}
                className="text-xs font-bold text-brand-violet hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Open Complete Situation Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Environment Category Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {environmentsList.map((env) => {
                const isSelected = selectedEnv === env.id;
                return (
                  <button
                    key={env.id}
                    onClick={() => setSelectedEnv(env.id)}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-brand-charcoal text-white shadow-sm'
                        : 'bg-brand-warmWhite hover:bg-gray-100 text-brand-charcoal border border-gray-200'
                    }`}
                  >
                    {env.icon}
                    <span>{env.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Action Phrases in Selected Environment */}
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider">
                1-Tap Voice Synthesizer & Chat Transfer (Sample content):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentEnvData.quickPhrases.slice(0, 6).map((phrase, idx) => {
                  const isPlaying = playingPhrase === phrase;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-brand-warmWhite border border-brand-violet/15 flex items-center justify-between gap-3 hover:border-brand-violet/40 transition-colors text-xs"
                    >
                      <span className="font-semibold text-brand-charcoal flex-1">{phrase}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleSpeakPhrase(phrase)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isPlaying
                              ? 'bg-brand-coral text-white'
                              : 'bg-white border text-gray-600 hover:text-brand-coral'
                          }`}
                          title="Speak phrase aloud"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onNavigate('talk', phrase)}
                          className="p-1.5 rounded-lg bg-white border text-brand-violet hover:bg-brand-violet hover:text-white transition-colors"
                          title="Send to Two-Way Talk"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Row: Useful Onboarding & Sign Gesture Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Onboarding Guidance */}
            <div className="p-6 rounded-3xl bg-brand-mint/10 border border-brand-mint/30 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-mint-dark" />
                <h4 className="text-sm font-black text-brand-charcoal font-display">
                  Quick Communication Guidance
                </h4>
              </div>

              <ul className="space-y-2 text-xs text-gray-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-brand-mint-dark font-black">•</span>
                  <span><strong>Show QR Pass to Receptionist:</strong> One scan explains your dialect and preferred written communication mode.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-mint-dark font-black">•</span>
                  <span><strong>Soundless Optical Strobes:</strong> When your queue token is called, your screen will pulse gently.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-mint-dark font-black">•</span>
                  <span><strong>Emergency SOS:</strong> High-contrast cards display full-screen instructions without sound.</span>
                </li>
              </ul>
            </div>

            {/* Card 2: AI Sign Recognition Lab Tile */}
            <div className="p-6 rounded-3xl bg-brand-violet/10 border border-brand-violet/25 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-violet/20 text-brand-violet text-[10px] font-black uppercase">
                    Experimental Prototype
                  </span>
                  <span className="text-xs text-gray-400">21-Joint Mesh</span>
                </div>
                <h4 className="text-sm font-black text-brand-charcoal font-display">
                  AI Sign Gesture Recognition Lab
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Test browser camera hand-tracking against 6 foundational signs with real-time confidence telemetry.
                </p>
              </div>

              <button
                onClick={() => onNavigate('signcheck')}
                className="w-full py-2.5 rounded-xl bg-brand-violet text-white text-xs font-bold hover:bg-brand-violet/90 transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Open Sign Recognition Lab</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
