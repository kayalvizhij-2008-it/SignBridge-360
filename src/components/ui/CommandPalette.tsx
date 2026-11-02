import React, { useState, useEffect, useRef } from 'react';
import type { AppPage } from '../../types';
import { useAccessibility } from '../../context/AccessibilityContext';
import {
  Search,
  MessageSquare,
  AlertTriangle,
  QrCode,
  Users,
  Clock,
  BarChart3,
  Compass,
  Video,
  WifiOff,
  Eye,
  Type,
  LayoutGrid,
  Zap,
  Sparkles,
  Layers,
  Monitor,
} from 'lucide-react';

interface CommandPaletteProps {
  onNavigate: (page: AppPage, initialPhrase?: string) => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Actions' | 'Situations' | 'Accessibility';
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigate }) => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    toggleHighContrast,
    cycleFontSize,
    toggleReducedMotion,
    toggleKioskMode,
    toggleOfflineSimulation,
  } = useAccessibility();

  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  const close = () => setIsCommandPaletteOpen(false);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-dashboard',
      category: 'Navigation',
      label: 'Main Communication Dashboard',
      description: 'Central hub for gestures, queues, and rapid actions',
      icon: <LayoutGrid className="w-4 h-4 text-brand-violet" />,
      action: () => {
        onNavigate('dashboard');
        close();
      },
      keywords: ['home', 'overview', 'hub'],
    },
    {
      id: 'nav-talk',
      category: 'Navigation',
      label: 'Two-Way Talk (TTS / STT)',
      description: 'Live speech-to-text dialogue between Deaf & hearing staff',
      icon: <MessageSquare className="w-4 h-4 text-brand-coral" />,
      action: () => {
        onNavigate('talk');
        close();
      },
      keywords: ['chat', 'speech', 'voice', 'captions'],
    },
    {
      id: 'nav-situations',
      category: 'Navigation',
      label: 'Situation-Based Assistance',
      description: 'Contextual workflows for Hospital, Transit, Bank, College, Civic',
      icon: <Layers className="w-4 h-4 text-brand-mint-dark" />,
      action: () => {
        onNavigate('situations');
        close();
      },
      keywords: ['environments', 'hospital', 'railway', 'bank', 'police'],
    },
    {
      id: 'nav-emergency',
      category: 'Navigation',
      label: 'Emergency Express SOS',
      description: 'High-visibility critical life safety communication cards',
      icon: <AlertTriangle className="w-4 h-4 text-alert-600" />,
      action: () => {
        onNavigate('emergency');
        close();
      },
      keywords: ['sos', 'doctor', 'help', 'ambulance', 'fire'],
    },
    {
      id: 'nav-signcheck',
      category: 'Navigation',
      label: 'AI Sign Recognition Lab',
      description: 'Live camera landmark tracking for 6 benchmark foundational signs',
      icon: <Sparkles className="w-4 h-4 text-brand-yellow" />,
      action: () => {
        onNavigate('signcheck');
        close();
      },
      keywords: ['camera', 'ai', 'recognition', 'landmarks', 'model'],
    },
    {
      id: 'nav-signconnect',
      category: 'Navigation',
      label: 'SignConnect Gesture Library',
      description: 'Validated sign demonstrations across ISL, ASL, BSL with slow motion',
      icon: <Video className="w-4 h-4 text-brand-violet" />,
      action: () => {
        onNavigate('signconnect');
        close();
      },
      keywords: ['library', 'isl', 'asl', 'bsl', 'learn'],
    },
    {
      id: 'nav-qrpass',
      category: 'Navigation',
      label: 'QR Communication Pass',
      description: 'Generate offline pass or simulate receptionist scan',
      icon: <QrCode className="w-4 h-4 text-brand-mint-dark" />,
      action: () => {
        onNavigate('qrpass');
        close();
      },
      keywords: ['pass', 'barcode', 'qr', 'privacy'],
    },
    {
      id: 'nav-humanconnect',
      category: 'Navigation',
      label: 'HumanConnect Interpreter Bridge',
      description: 'On-demand simulated Video Relay Service (VRS) call',
      icon: <Users className="w-4 h-4 text-amber-600" />,
      action: () => {
        onNavigate('humanconnect');
        close();
      },
      keywords: ['vrs', 'relay', 'human', 'call'],
    },
    {
      id: 'nav-visualguides',
      category: 'Navigation',
      label: 'Visual Public Service Guides',
      description: 'Illustrated procedures with interactive step checklists',
      icon: <Compass className="w-4 h-4 text-brand-coral" />,
      action: () => {
        onNavigate('visualguides');
        close();
      },
      keywords: ['guides', 'steps', 'walkthrough', 'directions'],
    },
    {
      id: 'nav-queue',
      category: 'Navigation',
      label: 'Silent Queue Navigator',
      description: 'Optical screen alerts and visual counter directions',
      icon: <Clock className="w-4 h-4 text-brand-violet" />,
      action: () => {
        onNavigate('queue');
        close();
      },
      keywords: ['token', 'ticket', 'counter', 'wait'],
    },
    {
      id: 'nav-offline',
      category: 'Navigation',
      label: 'Offline Accessibility Centre',
      description: 'Offline phrase packs, download manager, and sync status',
      icon: <WifiOff className="w-4 h-4 text-amber-600" />,
      action: () => {
        onNavigate('offline');
        close();
      },
      keywords: ['offline', 'cache', 'download', 'pwa'],
    },
    {
      id: 'nav-institution',
      category: 'Navigation',
      label: 'Institution Accessibility Analytics',
      description: 'Compliance dashboards, traffic throughput, and CSV export',
      icon: <BarChart3 className="w-4 h-4 text-brand-charcoal" />,
      action: () => {
        onNavigate('institution');
        close();
      },
      keywords: ['analytics', 'metrics', 'compliance', 'csv'],
    },

    // Actions & Situations
    {
      id: 'act-hospital-pain',
      category: 'Situations',
      label: 'Hospital: "I have severe pain"',
      description: 'Jump to Two-Way Talk with medical pain emergency text',
      icon: <MessageSquare className="w-4 h-4 text-alert-600" />,
      action: () => {
        onNavigate('talk', 'I am experiencing severe chest and stomach pain. Please fetch a triage doctor.');
        close();
      },
      keywords: ['hospital', 'doctor', 'pain', 'triage'],
    },
    {
      id: 'act-railway-platform',
      category: 'Situations',
      label: 'Railway: "Which platform does my train leave from?"',
      description: 'Jump to Two-Way Talk with transit inquiry',
      icon: <MessageSquare className="w-4 h-4 text-brand-violet" />,
      action: () => {
        onNavigate('talk', 'Which platform does the Express train depart from? Has it changed?');
        close();
      },
      keywords: ['train', 'platform', 'delay', 'transit'],
    },
    {
      id: 'act-bank-kyc',
      category: 'Situations',
      label: 'Bank: "I need to complete biometric KYC"',
      description: 'Jump to Two-Way Talk with banking inquiry',
      icon: <MessageSquare className="w-4 h-4 text-brand-yellow" />,
      action: () => {
        onNavigate('talk', 'I am here to complete biometric KYC verification. Please guide my fingers.');
        close();
      },
      keywords: ['bank', 'kyc', 'biometrics', 'fingerprint'],
    },

    // Accessibility Commands
    {
      id: 'a11y-contrast',
      category: 'Accessibility',
      label: 'Toggle High Contrast Theme',
      description: 'Strict AAA black and neon yellow theme for low vision',
      icon: <Eye className="w-4 h-4 text-brand-yellow" />,
      action: () => {
        toggleHighContrast();
        close();
      },
      keywords: ['dark', 'high contrast', 'vision'],
    },
    {
      id: 'a11y-font',
      category: 'Accessibility',
      label: 'Cycle Text Size (Normal / Large / Extra Large)',
      description: 'Adjust global root font scaling for optimal readability',
      icon: <Type className="w-4 h-4 text-brand-violet" />,
      action: () => {
        cycleFontSize();
        close();
      },
      keywords: ['font', 'text', 'size', 'zoom'],
    },
    {
      id: 'a11y-motion',
      category: 'Accessibility',
      label: 'Toggle Reduced Motion Mode',
      description: 'Disable 3D rotations, heavy parallax, and loops',
      icon: <Zap className="w-4 h-4 text-brand-coral" />,
      action: () => {
        toggleReducedMotion();
        close();
      },
      keywords: ['motion', 'animation', 'vestibular'],
    },
    {
      id: 'a11y-kiosk',
      category: 'Accessibility',
      label: 'Toggle Kiosk Display Mode (1920x1080)',
      description: 'Enlarge touch targets to 72px–96px and enable privacy auto-clear',
      icon: <Monitor className="w-4 h-4 text-brand-mint-dark" />,
      action: () => {
        toggleKioskMode();
        close();
      },
      keywords: ['kiosk', 'touch', '1080p', 'fullscreen'],
    },
    {
      id: 'a11y-offline',
      category: 'Accessibility',
      label: 'Simulate Offline Mode Toggle',
      description: 'Test offline phrase caching and disconnected resilience',
      icon: <WifiOff className="w-4 h-4 text-amber-600" />,
      action: () => {
        toggleOfflineSimulation();
        close();
      },
      keywords: ['offline', 'network', 'simulate'],
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(term) ||
      cmd.description.toLowerCase().includes(term) ||
      cmd.category.toLowerCase().includes(term) ||
      cmd.keywords?.some((k) => k.toLowerCase().includes(term))
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command search palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-150"
      onClick={close}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl border border-brand-violet/25 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, screen name, or situation phrase..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full text-sm sm:text-base font-semibold text-brand-charcoal placeholder:text-gray-400 focus:outline-none bg-transparent"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded-lg bg-gray-100 border text-[11px] font-mono text-gray-500">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-10 text-center text-xs text-gray-500">
              No matching commands or navigation routes found for "{search}".
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full p-3 rounded-2xl text-left flex items-center justify-between gap-3 transition-colors ${
                    isSelected
                      ? 'bg-brand-violet text-white shadow-sm'
                      : 'hover:bg-gray-100 text-brand-charcoal'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-gray-100'
                      }`}
                    >
                      {cmd.icon}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold flex items-center gap-2">
                        <span>{cmd.label}</span>
                        <span
                          className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded-md ${
                            isSelected ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {cmd.category}
                        </span>
                      </div>
                      <p
                        className={`text-xs line-clamp-1 ${
                          isSelected ? 'text-white/80' : 'text-gray-500'
                        }`}
                      >
                        {cmd.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-bold shrink-0 ${
                      isSelected ? 'text-white/90' : 'text-gray-400'
                    }`}
                  >
                    Select ↵
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-6 py-3 border-t bg-gray-50/80 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white border text-[10px] font-mono">↑</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white border text-[10px] font-mono">↓</kbd>
            <span>Navigate</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white border text-[10px] font-mono">↵</kbd>
            <span>Execute</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white border text-[10px] font-mono">ESC</kbd>
            <span>Close</span>
          </span>
        </div>
      </div>
    </div>
  );
};
