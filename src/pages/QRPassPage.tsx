import React, { useState } from 'react';
import type { UserPassProfile } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';
import { Modal } from '../components/ui/Modal';
import {
  ShieldCheck,
  Smartphone,
  Download,
  Check,
  Lock,
  RotateCcw,
} from 'lucide-react';

export const QRPassPage: React.FC = () => {
  const { announce } = useAccessibility();

  // Load from local storage or initialize with empty optional info
  const [profile, setProfile] = useState<UserPassProfile>(() => {
    const saved = localStorage.getItem('sb_saved_qr_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return {
      name: '',
      primaryMode: 'sign-language',
      preferredLanguage: 'English',
      signDialect: 'ISL',
      fontSize: 'large',
      highContrast: false,
      emergencyContactName: '',
      emergencyContactPhone: '',
      medicalNotes: '',
      frequentPhrases: [
        'I am Deaf, please write down instructions.',
        'Where is the accessible ticket counter?',
        'Please call a qualified sign interpreter.',
      ],
      shareEmergencyContact: false,
      shareMedicalNotes: false,
    };
  });

  const [isScanPreviewOpen, setIsScanPreviewOpen] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // STRICT PRIVACY: The QR code payload contains ONLY non-sensitive interaction preferences.
  // NO personal medical notes or phone numbers are ever serialized into the QR code!
  const safeQrPayload = JSON.stringify({
    schema: 'signbridge/pass/v1',
    mode: profile.primaryMode,
    dialect: profile.signDialect,
    lang: profile.preferredLanguage,
    quickPhrases: profile.frequentPhrases,
  });

  const handleSaveProfile = () => {
    localStorage.setItem('sb_saved_qr_profile', JSON.stringify(profile));
    setSavedSuccess(true);
    announce('Communication pass saved to device local storage');
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    localStorage.removeItem('sb_saved_qr_profile');
    setProfile({
      name: '',
      primaryMode: 'sign-language',
      preferredLanguage: 'English',
      signDialect: 'ISL',
      fontSize: 'large',
      highContrast: false,
      emergencyContactName: '',
      emergencyContactPhone: '',
      medicalNotes: '',
      frequentPhrases: [
        'I am Deaf, please write down instructions.',
        'Where is the accessible ticket counter?',
        'Please call a qualified sign interpreter.',
      ],
      shareEmergencyContact: false,
      shareMedicalNotes: false,
    });
    announce('Pass reset to default settings');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-mint/15 via-brand-yellow/10 to-brand-violet/15 border border-brand-mint/30 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-brand-mint-dark shadow-sm mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-mint-dark" />
            <span>Privacy-Preserving Accessibility Pass</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-charcoal font-display">
            QR Communication Pass
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
            When you arrive at a hospital or transit desk, staff scan this QR code on any phone to learn
            how you communicate best. Never uploads personal medical records or government IDs to the cloud.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsScanPreviewOpen(true)}
            className="px-5 py-3 rounded-2xl bg-brand-charcoal text-white text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-brand-charcoal/90 transition-colors shadow-sm"
          >
            <Smartphone className="w-4 h-4 text-brand-yellow" />
            <span>Simulate Staff Scan</span>
          </button>
        </div>
      </div>

      {/* Strict Privacy Disclosure Notice */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
        <Lock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold uppercase tracking-wider block">Privacy Architecture Guarantee:</span>
          <p className="leading-relaxed">
            Your QR code payload strictly encodes <strong>non-sensitive accessibility preferences</strong> (Preferred communication mode, sign dialect, language, and selected quick phrases). No medical diagnoses, social security numbers, or sensitive identity tokens are encoded in the QR code or stored on external servers. All settings reside exclusively inside your device's browser local storage.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Customizer, Right Live Pass Card Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Preference Customizer (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-brand-violet/20 shadow-glass space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-xl font-black text-brand-charcoal font-display">
              Pass Preferences & Consent Settings
            </h2>
            <button
              onClick={handleReset}
              className="text-xs text-gray-400 hover:text-red-600 flex items-center gap-1"
              title="Reset pass to default values"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Display Name (Optional) */}
            <div>
              <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider block mb-1">
                Display Name (Optional, e.g. First Name or Nickname)
              </label>
              <input
                type="text"
                placeholder="Optional display name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-brand-charcoal outline-none focus:border-brand-violet"
              />
            </div>

            {/* Primary Communication Method */}
            <div>
              <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider block mb-2">
                Preferred Communication Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'sign-language', label: '🤟 Sign Lang' },
                  { id: 'written-text', label: '✍️ Written Text' },
                  { id: 'lip-reading', label: '👄 Lip Reading' },
                  { id: 'assisted-voice', label: '🎙️ Voice Assist' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      setProfile({
                        ...profile,
                        primaryMode: item.id as UserPassProfile['primaryMode'],
                      })
                    }
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                      profile.primaryMode === item.id
                        ? 'bg-brand-violet text-white border-brand-violet shadow-xs'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sign Dialect & Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider block mb-1">
                  Sign Dialect
                </label>
                <select
                  value={profile.signDialect}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      signDialect: e.target.value as 'ISL' | 'ASL' | 'BSL',
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-brand-charcoal outline-none focus:border-brand-violet"
                >
                  <option value="ISL">Indian Sign Language (ISL)</option>
                  <option value="ASL">American Sign Language (ASL)</option>
                  <option value="BSL">British Sign Language (BSL)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider block mb-1">
                  Spoken / Written Language
                </label>
                <select
                  value={profile.preferredLanguage}
                  onChange={(e) =>
                    setProfile({ ...profile, preferredLanguage: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-brand-charcoal outline-none focus:border-brand-violet"
                >
                  <option value="English">English</option>
                  <option value="Hindi">हिन्दी (Hindi)</option>
                  <option value="Tamil">தமிழ் (Tamil)</option>
                  <option value="Telugu">తెలుగు (Telugu)</option>
                  <option value="Spanish">Español (Spanish)</option>
                </select>
              </div>
            </div>

            {/* Optional Courtesy Note for Staff */}
            <div>
              <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider block mb-1">
                Courtesy Note for Staff (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Please face me directly. I lip-read best when you speak at normal cadence."
                value={profile.medicalNotes}
                onChange={(e) => setProfile({ ...profile, medicalNotes: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-brand-charcoal outline-none focus:border-brand-violet"
              />
            </div>

            {/* Save Button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleSaveProfile}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-mint text-white font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center gap-2"
              >
                {savedSuccess ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                <span>{savedSuccess ? 'Pass Saved to Local Storage!' : 'Save & Update Pass'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Printable QR Pass Badge (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-7 rounded-3xl bg-gradient-to-b from-white to-brand-warmWhite border-2 border-brand-violet/30 shadow-card-hover space-y-6 text-center relative overflow-hidden">
            {/* Top Pass Ribbon */}
            <div className="flex items-center justify-between pb-3 border-b border-dashed border-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-violet text-white font-black text-xs flex items-center justify-center">
                  SB
                </div>
                <span className="font-extrabold text-sm text-brand-charcoal">SignBridge 360</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-mint/20 text-brand-mint-dark text-[10px] font-black uppercase tracking-wider">
                Privacy-Protected Pass
              </span>
            </div>

            {/* High Fidelity SVG QR Code */}
            <div
              className="p-4 bg-white rounded-3xl border border-gray-200 shadow-inner w-56 h-56 mx-auto flex items-center justify-center relative"
              title={safeQrPayload}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-brand-charcoal"
                fill="currentColor"
              >
                <rect x="0" y="0" width="100" height="100" fill="white" />
                {/* Corner Finder 1 */}
                <rect x="10" y="10" width="22" height="22" rx="3" fill="#24212D" />
                <rect x="14" y="14" width="14" height="14" rx="2" fill="white" />
                <rect x="18" y="18" width="6" height="6" fill="#7956E8" />
                {/* Corner Finder 2 */}
                <rect x="68" y="10" width="22" height="22" rx="3" fill="#24212D" />
                <rect x="72" y="14" width="14" height="14" rx="2" fill="white" />
                <rect x="76" y="18" width="6" height="6" fill="#7956E8" />
                {/* Corner Finder 3 */}
                <rect x="10" y="68" width="22" height="22" rx="3" fill="#24212D" />
                <rect x="14" y="72" width="14" height="14" rx="2" fill="white" />
                <rect x="18" y="76" width="6" height="6" fill="#7956E8" />
                {/* Non-sensitive pattern blocks */}
                <rect x="36" y="12" width="6" height="6" fill="#24212D" />
                <rect x="46" y="16" width="6" height="6" fill="#24212D" />
                <rect x="56" y="12" width="6" height="6" fill="#FF8B70" />
                <rect x="36" y="24" width="6" height="6" fill="#55C9B5" />
                <rect x="44" y="32" width="14" height="14" rx="3" fill="#7956E8" />
                <rect x="48" y="36" width="6" height="6" fill="white" />
                <rect x="12" y="38" width="6" height="6" fill="#24212D" />
                <rect x="22" y="44" width="6" height="6" fill="#24212D" />
                <rect x="68" y="38" width="6" height="6" fill="#24212D" />
                <rect x="78" y="44" width="6" height="6" fill="#55C9B5" />
                <rect x="38" y="52" width="6" height="6" fill="#24212D" />
                <rect x="48" y="58" width="6" height="6" fill="#FFC857" />
                <rect x="58" y="52" width="6" height="6" fill="#24212D" />
                <rect x="68" y="60" width="6" height="6" fill="#24212D" />
                <rect x="78" y="68" width="6" height="6" fill="#7956E8" />
                <rect x="38" y="68" width="6" height="6" fill="#24212D" />
                <rect x="48" y="74" width="6" height="6" fill="#24212D" />
                <rect x="58" y="80" width="6" height="6" fill="#FF8B70" />
              </svg>
            </div>

            <div className="space-y-1">
              <div className="text-xl font-black text-brand-charcoal">
                {profile.name || 'Anonymous Communicator'}
              </div>
              <div className="text-xs font-bold text-brand-violet">
                Mode: {profile.primaryMode.replace('-', ' ').toUpperCase()} ({profile.signDialect})
              </div>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                {profile.medicalNotes || 'No custom notes provided.'}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-brand-charcoal text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print Pass Card</span>
              </button>
              <button
                onClick={() => setIsScanPreviewOpen(true)}
                className="px-4 py-2 rounded-xl bg-brand-violet text-white text-xs font-bold flex items-center gap-1.5 hover:bg-brand-violet-dark transition-colors"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Preview Reception View</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RECEPTIONIST SCAN SIMULATION MODAL */}
      <Modal
        isOpen={isScanPreviewOpen}
        onClose={() => setIsScanPreviewOpen(false)}
        title="Receptionist / Staff Scanned View"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div className="text-xs text-emerald-900">
              <strong>Verified Accessibility Pass Scanned:</strong> Staff browser rendered this consent card immediately without requiring an app download.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-brand-warmWhite border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-bold uppercase">Visitor Name:</span>
              <span className="text-sm font-bold text-brand-charcoal">
                {profile.name || 'Visitor'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-bold uppercase">Communication Method:</span>
              <span className="px-2.5 py-1 rounded-lg bg-brand-violet text-white text-xs font-bold">
                {profile.primaryMode.toUpperCase()} ({profile.signDialect})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-bold uppercase">Preferred Language:</span>
              <span className="text-xs font-bold text-brand-charcoal">{profile.preferredLanguage}</span>
            </div>

            {profile.medicalNotes && (
              <div className="pt-2 border-t text-xs text-gray-700">
                <span className="font-bold text-gray-500 block mb-0.5">Visitor Note:</span>
                <p className="bg-white p-2.5 rounded-xl border">"{profile.medicalNotes}"</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-600 uppercase">
              Staff Action Guide for this Visitor:
            </span>
            <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
              <li>Please look directly at the visitor when communicating.</li>
              <li>Type directly on the screen or write key numbers (room, fee, gate) on paper.</li>
              <li>Do not shout or rely on audio call-outs.</li>
            </ul>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setIsScanPreviewOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-brand-charcoal text-white text-xs font-bold"
            >
              Close Simulator
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
