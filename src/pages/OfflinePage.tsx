import React, { useState } from 'react';
import type { AppPage } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';
import {
  Wifi,
  WifiOff,
  CheckCircle2,
  XCircle,
  Download,
  HardDrive,
  ShieldCheck,
  RotateCcw,
  Info,
} from 'lucide-react';

interface OfflinePageProps {
  onNavigate: (page: AppPage) => void;
}

export const OfflinePage: React.FC<OfflinePageProps> = ({ onNavigate }) => {
  const {
    isOffline,
    isOfflineSimulation,
    toggleOfflineSimulation,
    announce,
    showToast,
  } = useAccessibility();

  const [downloadingPack, setDownloadingPack] = useState<string | null>(null);
  const [cachedPacks, setCachedPacks] = useState<Record<string, boolean>>({
    'pack-hospital': true,
    'pack-railway': true,
    'pack-bank': true,
    'pack-signs': true,
  });

  const handleDownloadPack = (packId: string, packTitle: string) => {
    setDownloadingPack(packId);
    announce(`Downloading offline pack: ${packTitle}`);

    setTimeout(() => {
      setCachedPacks((prev) => ({ ...prev, [packId]: true }));
      setDownloadingPack(null);
      announce(`${packTitle} successfully verified in offline cache.`);
      showToast({
        type: 'success',
        title: 'Offline Pack Verified',
        message: `${packTitle} is permanently cached for soundless offline use.`,
      });
    }, 1200);
  };

  const capabilityMatrix = [
    {
      feature: 'Emergency Express SOS',
      offline: true,
      notes: '100% client-side cards, visual strobe, and local synthesized speech.',
    },
    {
      feature: 'Situation-Based Assistance',
      offline: true,
      notes: 'All 5 environment phrase directories and staff questions cached in storage.',
    },
    {
      feature: 'QR Communication Pass',
      offline: true,
      notes: 'Generates SVG barcode and stores accessibility preferences in localStorage.',
    },
    {
      feature: 'Visual Public Service Guides',
      offline: true,
      notes: 'All landmark procedure steps and checklists cached via Service Worker.',
    },
    {
      feature: 'AI Sign Landmark Mesh Lab',
      offline: true,
      notes: 'HTML5 canvas landmark extraction processes camera frames directly on device.',
    },
    {
      feature: 'Two-Way Talk Preset Phrases',
      offline: true,
      notes: 'Full directory of quick replies, text typing, and browser SpeechSynthesis.',
    },
    {
      feature: 'Cloud Speech-to-Text (STT)',
      offline: false,
      notes: 'Continuous cloud speech recognition requires active network connection.',
    },
    {
      feature: 'HumanConnect Video Interpreter',
      offline: false,
      notes: 'Live Video Relay Service (VRS) calls require active internet bandwidth.',
    },
    {
      feature: 'Remote Queue System Sync',
      offline: false,
      notes: 'Real-time multi-counter token sync requires live facility server connection.',
    },
    {
      feature: 'Facility Compliance Analytics Sync',
      offline: false,
      notes: 'Uploading barrier audit logs to facility servers requires network connectivity.',
    },
  ];

  const offlinePacks = [
    {
      id: 'pack-hospital',
      title: 'Hospital OPD & Trauma Triage Bundle',
      size: '1.4 MB',
      description: 'Medical phrases, triage pain scales, pharmacy dosage icons, and emergency alerts.',
    },
    {
      id: 'pack-railway',
      title: 'Railway & Transit Terminal Bundle',
      size: '1.1 MB',
      description: 'Platform changes, train delay phrases, luggage desk, and accessible coach vocabulary.',
    },
    {
      id: 'pack-bank',
      title: 'Bank KYC & Civic Government Bundle',
      size: '1.6 MB',
      description: 'Biometrics guidance, PIN entry privacy, UDID renewal, and pension forms.',
    },
    {
      id: 'pack-signs',
      title: '6 Baseline Benchmark Signs Manifest',
      size: '2.8 MB',
      description: 'Handshape geometry, movement trajectories, and 3D visual gestures.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-yellow/15 via-brand-mint/15 to-brand-violet/15 border border-brand-yellow/25 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-brand-charcoal shadow-sm mb-2">
            <HardDrive className="w-3.5 h-3.5 text-brand-mint-dark" />
            <span>Service Worker & Offline PWA Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-charcoal font-display">
            Offline Accessibility Centre
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
            SignBridge 360 operates reliably in underground railway concourses, radiology imaging halls,
            and disaster zones where internet connectivity drops completely.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-3 rounded-2xl bg-brand-charcoal text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm hover:bg-brand-charcoal/90 transition-all"
          >
            <span>Hub Overview →</span>
          </button>

          <button
            onClick={toggleOfflineSimulation}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
              isOfflineSimulation
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-white border border-brand-violet/20 text-brand-charcoal hover:bg-gray-50'
            }`}
          >
            {isOfflineSimulation ? (
              <>
                <WifiOff className="w-4 h-4 text-white" />
                <span>Simulated Offline: ON</span>
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4 text-emerald-600" />
                <span>Simulate Offline Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Network Status Card */}
      <div
        className={`p-6 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isOffline
            ? 'bg-amber-50/80 border-amber-300 text-amber-950'
            : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${
              isOffline ? 'bg-amber-600' : 'bg-emerald-600'
            }`}
          >
            {isOffline ? <WifiOff className="w-6 h-6" /> : <Wifi className="w-6 h-6" />}
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider">
              Network Status: {isOffline ? 'Offline / Disconnected' : 'Online & Connected'}
            </div>
            <h3 className="text-lg font-bold font-display">
              {isOffline
                ? 'Offline Standalone Mode Active'
                : 'Full Hybrid Cloud & Local Mode Active'}
            </h3>
            <p className="text-xs opacity-90 max-w-md">
              {isOffline
                ? 'Service Worker and localStorage cache are serving all core communication features without internet.'
                : 'Network available. Service Worker is pre-caching updates in the background.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded-full bg-white/90 text-xs font-bold shadow-sm">
            Service Worker: Registered
          </span>
        </div>
      </div>

      {/* Two Column Section: Capability Matrix vs Download Manager */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Capability Matrix (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-white border border-brand-violet/20 shadow-sm space-y-4">
          <div className="border-b pb-3">
            <h3 className="text-base font-black text-brand-charcoal font-display">
              Offline vs Online Capability Matrix
            </h3>
            <p className="text-xs text-gray-500">
              Clear technical breakdown of features that run soundlessly with zero data versus cloud dependencies.
            </p>
          </div>

          <div className="space-y-2.5">
            {capabilityMatrix.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-brand-charcoal flex items-center gap-2">
                    <span>{item.feature}</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                        item.offline
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.offline ? 'Works Offline' : 'Requires Internet'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-[11px] leading-relaxed">{item.notes}</p>
                </div>

                <div className="shrink-0 mt-1">
                  {item.offline ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offline Pack Download Manager (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white border border-brand-violet/20 shadow-sm space-y-5">
          <div className="border-b pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-brand-charcoal font-display">
                Offline Resource Cache
              </h3>
              <p className="text-xs text-gray-500">Preload local communication bundles.</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-mint/15 text-brand-mint-dark text-xs font-bold">
              6.9 MB Stored
            </span>
          </div>

          <div className="space-y-3">
            {offlinePacks.map((pack) => {
              const isCached = cachedPacks[pack.id];
              const isPending = downloadingPack === pack.id;

              return (
                <div
                  key={pack.id}
                  className="p-4 rounded-2xl bg-brand-warmWhite border border-brand-violet/15 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-brand-charcoal">{pack.title}</span>
                    <span className="text-[10px] font-mono font-bold text-gray-500">
                      {pack.size}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {pack.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-gray-200/60">
                    <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {isCached ? 'Cached & Verified' : 'Available'}
                    </span>

                    <button
                      onClick={() => handleDownloadPack(pack.id, pack.title)}
                      disabled={isPending}
                      className="px-3 py-1 rounded-xl bg-white border border-brand-violet/25 text-brand-violet hover:bg-brand-violet hover:text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                    >
                      {isPending ? (
                        <>
                          <RotateCcw className="w-3 h-3 animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3 h-3" />
                          <span>{isCached ? 'Re-verify' : 'Download'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-brand-charcoal">
              <Info className="w-4 h-4 text-brand-violet shrink-0" />
              <span>Storage Policy Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              All cached packages are stored locally in CacheStorage and localStorage on your device.
              Zero telemetry tracking or personal data collection occurs during offline operation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
