import React, { useState } from 'react';
import type { AppPage } from '../../types';
import { useAccessibility } from '../../context/AccessibilityContext';
import { NotificationCenter } from '../ui/NotificationCenter';
import {
  MessageSquare,
  Video,
  AlertTriangle,
  QrCode,
  Users,
  Clock,
  BarChart3,
  Home,
  Menu,
  X,
  Sparkles,
  LayoutGrid,
  Compass,
  Briefcase,
  Camera,
  WifiOff,
  Search,
  Bell,
} from 'lucide-react';

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const {
    userMode,
    setUserMode,
    setIsCommandPaletteOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    unreadNotificationsCount,
  } = useAccessibility();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact consistent navigation order specified in requirements:
  // Home · Dashboard · Talk · Situations · Emergency · Sign Check · Sign Library · My Pass · Interpreter · Guides · Queue · Offline · Insights
  const navItems: { page: AppPage; label: string; icon: React.ReactNode; isAlert?: boolean }[] = [
    { page: 'landing', label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
    { page: 'dashboard', label: 'Dashboard', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { page: 'talk', label: 'Talk', icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { page: 'situations', label: 'Situations', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { page: 'emergency', label: 'Emergency', icon: <AlertTriangle className="w-3.5 h-3.5" />, isAlert: true },
    { page: 'signcheck', label: 'Sign Check', icon: <Camera className="w-3.5 h-3.5" /> },
    { page: 'signconnect', label: 'Sign Library', icon: <Video className="w-3.5 h-3.5" /> },
    { page: 'qrpass', label: 'My Pass', icon: <QrCode className="w-3.5 h-3.5" /> },
    { page: 'humanconnect', label: 'Interpreter', icon: <Users className="w-3.5 h-3.5" /> },
    { page: 'visualguides', label: 'Guides', icon: <Compass className="w-3.5 h-3.5" /> },
    { page: 'queue', label: 'Queue', icon: <Clock className="w-3.5 h-3.5" /> },
    { page: 'offline', label: 'Offline', icon: <WifiOff className="w-3.5 h-3.5" /> },
    { page: 'institution', label: 'Insights', icon: <BarChart3 className="w-3.5 h-3.5" /> },
  ];

  const handleNavClick = (page: AppPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-brand-warmWhite/90 backdrop-blur-xl border-b border-brand-violet/15 shadow-sm transition-colors">
      <div className="max-w-[1536px] mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-2">
          {/* Logo & Brand Identity */}
          <div
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNavClick('landing')}
            aria-label="SignBridge 360 - Return to homepage"
          >
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-violet via-brand-coral to-brand-yellow p-0.5 shadow-glass-glow transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-black text-brand-violet text-lg tracking-tighter">
                SB
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-coral opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-coral"></span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg font-display tracking-tight text-brand-charcoal">
                  SignBridge
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-brand-violet/10 text-brand-violet font-extrabold text-[11px]">
                  360°
                </span>
              </div>
              <span className="text-[9px] font-semibold tracking-wider text-gray-500 uppercase -mt-0.5">
                Breaking Barriers
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden 2xl:flex items-center gap-0.5 overflow-x-auto py-1 scrollbar-none"
            aria-label="Main menu"
          >
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              if (item.isAlert) {
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`mx-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-sm shrink-0 ${
                      isActive
                        ? 'bg-brand-coral text-white ring-2 ring-brand-coral ring-offset-2'
                        : 'bg-brand-coral/15 text-brand-coral hover:bg-brand-coral hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-2 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 shrink-0 ${
                    isActive
                      ? 'bg-brand-violet text-white shadow-sm'
                      : 'text-brand-charcoal/80 hover:text-brand-charcoal hover:bg-brand-violet/10'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Intermediate Desktop Navigation (xl to 2xl): Primary Navigation */}
          <nav
            className="hidden xl:flex 2xl:hidden items-center gap-1 overflow-x-auto py-1 scrollbar-none"
            aria-label="Primary menu"
          >
            {[
              { page: 'dashboard', label: 'Dashboard', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
              { page: 'talk', label: 'Talk', icon: <MessageSquare className="w-3.5 h-3.5" /> },
              { page: 'situations', label: 'Situations', icon: <Briefcase className="w-3.5 h-3.5" /> },
              { page: 'emergency', label: 'Emergency', icon: <AlertTriangle className="w-3.5 h-3.5" />, isAlert: true },
              { page: 'signcheck', label: 'Sign Check', icon: <Camera className="w-3.5 h-3.5" /> },
              { page: 'qrpass', label: 'My Pass', icon: <QrCode className="w-3.5 h-3.5" /> },
              { page: 'humanconnect', label: 'Interpreter', icon: <Users className="w-3.5 h-3.5" /> },
              { page: 'queue', label: 'Queue', icon: <Clock className="w-3.5 h-3.5" /> },
              { page: 'offline', label: 'Offline', icon: <WifiOff className="w-3.5 h-3.5" /> },
            ].map((item) => {
              const isActive = currentPage === item.page;
              if (item.isAlert) {
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page as AppPage)}
                    className="mx-0.5 px-2 py-1.5 rounded-xl text-xs font-bold bg-brand-coral/15 text-brand-coral hover:bg-brand-coral hover:text-white flex items-center gap-1"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              }
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page as AppPage)}
                  className={`px-2 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                    isActive
                      ? 'bg-brand-violet text-white shadow-sm'
                      : 'text-brand-charcoal/80 hover:bg-brand-violet/10'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Toolbar Actions */}
          <div className="flex items-center gap-2 relative">
            {/* Command Palette / Search Trigger */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-brand-violet/20 hover:border-brand-violet text-brand-charcoal text-xs font-medium flex items-center gap-2 shadow-sm transition-all"
              title="Search and jump to features (Cmd+K / Ctrl+K)"
              aria-label="Open command palette search"
            >
              <Search className="w-3.5 h-3.5 text-brand-violet" />
              <span className="hidden sm:inline text-gray-500 text-[11px]">Search</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-[9px] font-mono text-gray-500">
                ⌘K
              </kbd>
            </button>

            {/* Notification Bell with Visual Unread Badge */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2 rounded-xl border transition-all relative ${
                  isNotificationsOpen
                    ? 'bg-brand-violet text-white border-brand-violet'
                    : 'bg-white border-brand-violet/20 hover:bg-brand-violet/10 text-brand-charcoal'
                }`}
                title="Notifications and visual alerts"
                aria-label="Toggle notifications panel"
                aria-expanded={isNotificationsOpen}
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-coral text-[9px] font-black text-white">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Mounted Notification Center Dropdown */}
              <NotificationCenter
                onNavigateToQueue={() => handleNavClick('queue')}
                onNavigateToInstitution={() => handleNavClick('institution')}
              />
            </div>

            {/* User Mode Switcher: Deaf vs Hearing */}
            <div className="hidden md:flex items-center gap-1 pl-1">
              <div
                className="p-1 rounded-2xl bg-white/80 border border-brand-violet/20 shadow-inner flex items-center gap-1"
                role="radiogroup"
                aria-label="Communication mode selection"
              >
                <button
                  onClick={() => setUserMode('deaf')}
                  role="radio"
                  aria-checked={userMode === 'deaf'}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    userMode === 'deaf'
                      ? 'bg-brand-violet text-white shadow-sm'
                      : 'text-gray-600 hover:text-brand-charcoal'
                  }`}
                >
                  <span>🤟 Deaf</span>
                </button>
                <button
                  onClick={() => setUserMode('hearing')}
                  role="radio"
                  aria-checked={userMode === 'hearing'}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    userMode === 'hearing'
                      ? 'bg-brand-coral text-white shadow-sm'
                      : 'text-gray-600 hover:text-brand-charcoal'
                  }`}
                >
                  <span>🎙️ Hearing</span>
                </button>
              </div>
            </div>

            {/* Mobile Emergency SOS + Menu Hamburger */}
            <div className="flex xl:hidden items-center gap-1.5">
              <button
                onClick={() => handleNavClick('emergency')}
                className="px-2.5 py-1.5 rounded-xl bg-brand-coral text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                aria-label="Open emergency screen"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>SOS</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/90 border border-brand-violet/20 text-brand-charcoal hover:bg-gray-100 transition-colors"
                aria-label="Toggle navigation drawer"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-2xl border-b border-brand-violet/20 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          {/* Mobile User Mode switcher */}
          <div className="flex items-center justify-center p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setUserMode('deaf')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                userMode === 'deaf' ? 'bg-brand-violet text-white shadow-sm' : 'text-gray-600'
              }`}
            >
              🤟 Deaf Mode
            </button>
            <button
              onClick={() => setUserMode('hearing')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                userMode === 'hearing' ? 'bg-brand-coral text-white shadow-sm' : 'text-gray-600'
              }`}
            >
              🎙️ Hearing Mode
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto pr-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 text-left transition-all ${
                    item.isAlert
                      ? 'bg-brand-coral/15 text-brand-coral col-span-2 ring-1 ring-brand-coral/30'
                      : isActive
                      ? 'bg-brand-violet text-white shadow-sm'
                      : 'bg-brand-warmWhite text-brand-charcoal hover:bg-gray-100 border border-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1 text-brand-mint-dark font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              SignBridge 360 AI Suite
            </span>
            <span>v2.5 Production</span>
          </div>
        </div>
      )}
    </header>
  );
};
