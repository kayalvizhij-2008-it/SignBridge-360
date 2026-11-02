import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { speakText, stopSpeech } from '../utils/speech';
import {
  AlertTriangle,
  HeartPulse,
  Bandage,
  VolumeX,
  PhoneCall,
  Users,
  X,
  Volume2,
  ShieldAlert,
  Flame,
  Info,
  Edit2,
  Check,
} from 'lucide-react';

interface EmergencyItem {
  id: string;
  title: string;
  subtitle: string;
  tts: string;
  icon: React.ReactNode;
  bg: string;
  text: string;
  border: string;
}

export const EmergencyExpressPage: React.FC = () => {
  const { triggerScreenFlash, announce } = useAccessibility();

  const [expandedEmergency, setExpandedEmergency] = useState<EmergencyItem | null>(null);
  const [isStrobeActive, setIsStrobeActive] = useState<boolean>(false);
  const [isEditingMedical, setIsEditingMedical] = useState<boolean>(false);

  // User-controlled optional medical profile (loaded from localStorage or empty)
  const [medicalProfile, setMedicalProfile] = useState<{
    bloodGroup: string;
    allergies: string;
    iceContact: string;
  }>(() => {
    const saved = localStorage.getItem('sb_emergency_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return {
      bloodGroup: '',
      allergies: '',
      iceContact: '',
    };
  });

  const saveMedicalProfile = () => {
    localStorage.setItem('sb_emergency_profile', JSON.stringify(medicalProfile));
    setIsEditingMedical(false);
    announce('Emergency profile saved to device');
  };

  const emergencyActions: EmergencyItem[] = [
    {
      id: 'em-help',
      title: 'NEED IMMEDIATE HELP',
      subtitle: 'General Emergency / Urgent Situation',
      tts: 'Emergency! I am Deaf and I need immediate assistance. Please help me right now!',
      icon: <AlertTriangle className="w-10 h-10 text-white" />,
      bg: 'bg-red-600',
      text: 'text-white',
      border: 'border-red-700',
    },
    {
      id: 'em-doctor',
      title: 'I NEED A DOCTOR',
      subtitle: 'Medical Triage / Chest Pain / Fainting',
      tts: 'Medical Emergency! I need a doctor or paramedic immediately. I cannot hear.',
      icon: <HeartPulse className="w-10 h-10 text-white" />,
      bg: 'bg-rose-700',
      text: 'text-white',
      border: 'border-rose-800',
    },
    {
      id: 'em-injured',
      title: 'I AM INJURED / PAIN',
      subtitle: 'Trauma / Physical Injury / Bleeding',
      tts: 'I am severely injured and in physical pain. Please assist me.',
      icon: <Bandage className="w-10 h-10 text-white" />,
      bg: 'bg-amber-600',
      text: 'text-white',
      border: 'border-amber-700',
    },
    {
      id: 'em-deaf',
      title: 'I CANNOT HEAR (I AM DEAF)',
      subtitle: 'Disability Disclosure Card for Police/Medics',
      tts: 'Please note: I am Deaf. I cannot hear your voice. Please face me and write down what you need.',
      icon: <VolumeX className="w-10 h-10 text-white" />,
      bg: 'bg-indigo-700',
      text: 'text-white',
      border: 'border-indigo-800',
    },
    {
      id: 'em-family',
      title: 'PLEASE CONTACT MY FAMILY',
      subtitle: medicalProfile.iceContact
        ? `Call ICE Contact: ${medicalProfile.iceContact}`
        : 'Please call my emergency contact',
      tts: medicalProfile.iceContact
        ? `Please call my emergency family contact immediately at ${medicalProfile.iceContact}.`
        : 'Please contact my emergency family contact immediately.',
      icon: <PhoneCall className="w-10 h-10 text-white" />,
      bg: 'bg-emerald-700',
      text: 'text-white',
      border: 'border-emerald-800',
    },
    {
      id: 'em-interpreter',
      title: 'I NEED A SIGN INTERPRETER',
      subtitle: 'Official Legal / Medical Rights',
      tts: 'I have a legal right to a qualified Sign Language Interpreter for this interaction. Please provide one.',
      icon: <Users className="w-10 h-10 text-white" />,
      bg: 'bg-purple-700',
      text: 'text-white',
      border: 'border-purple-800',
    },
  ];

  const handleSelectEmergency = (item: EmergencyItem) => {
    setExpandedEmergency(item);
    triggerScreenFlash();
    speakText(
      item.tts,
      'en-US',
      0.9,
      () => {},
      () => {}
    );
    announce(`Emergency alert displayed: ${item.title}`);
  };

  const handleCloseExpanded = () => {
    stopSpeech();
    setExpandedEmergency(null);
    setIsStrobeActive(false);
  };

  const toggleStrobe = () => {
    setIsStrobeActive((prev) => !prev);
    if (!isStrobeActive) {
      triggerScreenFlash();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Unequivocal Safety Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3 text-xs text-amber-950">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold uppercase tracking-wider block">Important Safety Notice:</span>
          <p className="leading-relaxed">
            This screen provides high-contrast visual disclosure cards and audible text-to-speech to show directly to nearby bystanders, nurses, or police. <strong>It does not automatically dispatch emergency services or dial 911/112.</strong> If you are in immediate life danger, have a bystander dial emergency services or connect using your designated emergency relay service.
          </p>
        </div>
      </div>

      {/* Top Urgent Alert Bar */}
      <div className="p-4 sm:p-6 rounded-3xl bg-red-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight">
              Emergency Express SOS
            </h1>
            <p className="text-xs sm:text-sm text-red-100 font-medium">
              Tap any card to display large visual message for first responders & speak audio alert.
            </p>
          </div>
        </div>

        {/* Visual Siren Strobe Button */}
        <button
          onClick={toggleStrobe}
          className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
            isStrobeActive
              ? 'bg-brand-yellow text-brand-charcoal animate-ping'
              : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
          }`}
          title="Flash screen to attract nearby bystander attention"
        >
          <Flame className="w-4 h-4" />
          <span>{isStrobeActive ? 'Optical Strobe Active' : 'Optical Siren Strobe'}</span>
        </button>
      </div>

      {/* Repeating Strobe Overlay */}
      {isStrobeActive && (
        <div
          className="fixed inset-0 z-50 pointer-events-none bg-red-600/30 animate-pulse border-8 border-brand-yellow"
          aria-hidden="true"
        />
      )}

      {/* 6 Large High-Contrast Emergency Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {emergencyActions.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelectEmergency(item)}
            className={`p-7 rounded-3xl text-left border-3 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex flex-col justify-between min-h-[220px] ${item.bg} ${item.border} ${item.text}`}
            aria-label={`${item.title}: ${item.subtitle}`}
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-white/20">
                {item.icon}
              </div>
              <span className="text-xs uppercase font-extrabold tracking-widest bg-black/25 px-2.5 py-1 rounded-full">
                TAP TO SHOW
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black font-display tracking-tight leading-tight">
                {item.title}
              </h2>
              <p className="text-xs text-white/90 font-medium leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* User-Controlled Optional Emergency Profile */}
      <div className="p-6 rounded-3xl bg-white border border-gray-300 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-charcoal">
              Optional Medical Card (Stored Locally On This Device)
            </h3>
            <p className="text-xs text-gray-500">
              Only populated if you choose to provide emergency details. Never transmitted to external servers.
            </p>
          </div>

          <button
            onClick={() => setIsEditingMedical(!isEditingMedical)}
            className="px-3.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-brand-charcoal text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            {isEditingMedical ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Edit2 className="w-3.5 h-3.5 text-brand-violet" />}
            <span>{isEditingMedical ? 'Done Editing' : 'Edit Details'}</span>
          </button>
        </div>

        {isEditingMedical ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase block mb-1">
                Blood Group (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. O+, A+, B-"
                value={medicalProfile.bloodGroup}
                onChange={(e) => setMedicalProfile({ ...medicalProfile, bloodGroup: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase block mb-1">
                Drug Allergies (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Penicillin, Sulfa"
                value={medicalProfile.allergies}
                onChange={(e) => setMedicalProfile({ ...medicalProfile, allergies: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase block mb-1">
                ICE Family Phone (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. +1 (555) 000-0000"
                value={medicalProfile.iceContact}
                onChange={(e) => setMedicalProfile({ ...medicalProfile, iceContact: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border text-sm"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end">
              <button
                onClick={saveMedicalProfile}
                className="px-5 py-2 rounded-xl bg-brand-charcoal text-white text-xs font-bold"
              >
                Save to Local Storage
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
            <div className="p-3.5 rounded-2xl bg-gray-50 border">
              <span className="text-gray-500 font-bold block mb-1">Blood Group:</span>
              <span className="text-sm font-black text-brand-charcoal">
                {medicalProfile.bloodGroup || 'Not specified (Optional)'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border">
              <span className="text-gray-500 font-bold block mb-1">Known Allergies:</span>
              <span className="text-sm font-black text-brand-coral">
                {medicalProfile.allergies || 'None specified'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border">
              <span className="text-gray-500 font-bold block mb-1">Emergency ICE Contact:</span>
              <span className="text-sm font-black text-brand-charcoal">
                {medicalProfile.iceContact || 'None provided'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* FULL-SCREEN EXPANDED EMERGENCY SHOW CARD */}
      {expandedEmergency && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-6 sm:p-12 animate-in fade-in duration-150"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/20">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-brand-yellow text-brand-charcoal font-black text-xs uppercase tracking-wider">
                Active Emergency Disclosure Card
              </span>
              <span className="text-xs text-gray-400">Show this screen directly to staff</span>
            </div>

            <button
              onClick={handleCloseExpanded}
              className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white flex items-center gap-2 font-bold text-sm"
              aria-label="Exit emergency display"
            >
              <X className="w-6 h-6" />
              <span>Dismiss</span>
            </button>
          </div>

          {/* Central Huge Visual Text Message */}
          <div className="my-auto text-center space-y-6 max-w-4xl mx-auto">
            <div className="w-24 h-24 rounded-3xl bg-red-600 flex items-center justify-center mx-auto shadow-2xl">
              {expandedEmergency.icon}
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-white font-display uppercase tracking-tight leading-none">
              {expandedEmergency.title}
            </h2>

            <p className="text-xl sm:text-3xl font-bold text-brand-yellow leading-snug">
              "{expandedEmergency.tts}"
            </p>

            <div className="p-4 rounded-2xl bg-white/10 text-white/90 text-sm max-w-xl mx-auto">
              Please write your reply on this phone screen or contact the ICE phone number below.
            </div>
          </div>

          {/* Bottom Audio Repeat & Close Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/20">
            <div className="text-xs text-gray-400">
              ICE Contact:{' '}
              <strong>{medicalProfile.iceContact || 'Self-navigating'}</strong>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  speakText(expandedEmergency.tts, 'en-US', 0.9);
                }}
                className="flex-1 sm:flex-initial px-6 py-4 rounded-2xl bg-brand-yellow text-brand-charcoal font-black text-base flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors"
              >
                <Volume2 className="w-5 h-5" />
                <span>Repeat Voice Alert</span>
              </button>

              <button
                onClick={handleCloseExpanded}
                className="px-6 py-4 rounded-2xl bg-white/20 text-white font-bold text-base hover:bg-white/30 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
