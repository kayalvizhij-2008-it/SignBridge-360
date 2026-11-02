import React, { useState } from 'react';
import type { QueueItem } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';
import {
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Smartphone,
  Compass,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QueueAssistancePage: React.FC = () => {
  const { triggerScreenFlash, announce } = useAccessibility();

  const [activeTicket, setActiveTicket] = useState<QueueItem>({
    tokenNumber: 'B-104',
    serviceName: 'Radiology & X-Ray Examination',
    counterNumber: 'Room 4B',
    floorLevel: 'First Floor, East Wing',
    status: 'waiting',
    peopleAhead: 2,
    estimatedMinutes: 5,
    directions: [
      'Take Elevator or Ramp B to Floor 1.',
      'Follow the Blue Floor Line towards Diagnostics Wing.',
      'Look for the green illuminated beacon outside Door 4B.',
    ],
  });

  const [isCalled, setIsCalled] = useState<boolean>(false);
  const [notifySms, setNotifySms] = useState<boolean>(true);

  // Simulate token called
  const handleSimulateCall = () => {
    setIsCalled(true);
    setActiveTicket((prev) => ({
      ...prev,
      status: 'calling',
      peopleAhead: 0,
      estimatedMinutes: 0,
    }));
    triggerScreenFlash();
    announce('Your token B-104 is now being called to Room 4B!');

    // Trigger celebratory confetti for accessible arrival
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // Ignored
    }
  };

  const handleTakeNewToken = (service: string, room: string) => {
    const randomNum = Math.floor(Math.random() * 80) + 110;
    const newToken: QueueItem = {
      tokenNumber: `C-${randomNum}`,
      serviceName: service,
      counterNumber: room,
      floorLevel: 'Ground Floor, Main Concourse',
      status: 'waiting',
      peopleAhead: 4,
      estimatedMinutes: 9,
      directions: [
        'Proceed straight past Main Security.',
        `Find ${room} near the digital signage totem.`,
        'Present your token slip or digital screen to the desk clerk.',
      ],
    };
    setActiveTicket(newToken);
    setIsCalled(false);
    announce(`New ticket generated: ${newToken.tokenNumber} for ${service}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-violet/15 via-brand-mint/15 to-brand-yellow/15 border border-brand-violet/25 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-brand-violet shadow-sm mb-2">
            <Clock className="w-3.5 h-3.5 text-brand-mint-dark" />
            <span>Soundless Queue Assistance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-charcoal font-display">
            Silent Appointment & Turn Navigator
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
            Never miss an auditory room announcement again. Get optical screen flashes,
            step-by-step visual walking routes, and real-time countdowns for your active token.
          </p>
        </div>

        {/* Demo Button to trigger your turn */}
        <button
          onClick={handleSimulateCall}
          className="px-5 py-3 rounded-2xl bg-brand-coral hover:bg-brand-coral/90 text-white text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 shadow-coral-glow transition-all"
        >
          <Sparkles className="w-4 h-4 text-brand-yellow" />
          <span>Simulate Turn Called!</span>
        </button>
      </div>

      {/* ACTIVE CALL FLASH BANNER WHEN TURN IS CALLED */}
      {isCalled && (
        <div className="p-6 rounded-3xl bg-brand-yellow border-4 border-brand-charcoal text-brand-charcoal shadow-2xl animate-bounce flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-brand-charcoal text-brand-yellow flex items-center justify-center font-black text-2xl shrink-0">
              🔔
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-brand-charcoal/80">
                NOW SERVING • PLEASE PROCEED
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display leading-tight">
                TOKEN {activeTicket.tokenNumber} ➔ PROCEED TO {activeTicket.counterNumber}!
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsCalled(false)}
            className="px-5 py-2.5 rounded-xl bg-brand-charcoal text-white font-bold text-xs shrink-0"
          >
            I am on my way
          </button>
        </div>
      )}

      {/* MAIN ACTIVE TOKEN VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Active Large Token Card (7 cols) */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-brand-violet/20 shadow-card-hover space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                Active Civic Appointment
              </span>
              <h3 className="text-xl font-black text-brand-charcoal font-display">
                {activeTicket.serviceName}
              </h3>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                activeTicket.status === 'calling'
                  ? 'bg-brand-yellow text-brand-charcoal animate-pulse'
                  : 'bg-brand-violet/10 text-brand-violet'
              }`}
            >
              {activeTicket.status === 'calling' ? 'Calling Now' : 'In Queue'}
            </span>
          </div>

          {/* Huge Token Number Display */}
          <div className="p-8 rounded-3xl bg-gradient-to-tr from-brand-violet/10 via-brand-coral/10 to-brand-mint/15 border-2 border-brand-violet/20 text-center space-y-2">
            <div className="text-xs font-bold uppercase text-gray-500 tracking-widest">
              Your Visual Token Number
            </div>
            <div className="text-6xl sm:text-7xl font-black font-display text-brand-charcoal tracking-tight">
              {activeTicket.tokenNumber}
            </div>
            <div className="text-sm font-bold text-brand-coral">
              Destination: {activeTicket.counterNumber} ({activeTicket.floorLevel})
            </div>
          </div>

          {/* Wait Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50 border text-center">
              <span className="text-[11px] font-bold text-gray-400 uppercase block mb-1">
                People Ahead
              </span>
              <span className="text-2xl font-black text-brand-charcoal">
                {activeTicket.peopleAhead} {activeTicket.peopleAhead === 1 ? 'person' : 'people'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border text-center">
              <span className="text-[11px] font-bold text-gray-400 uppercase block mb-1">
                Est. Waiting Time
              </span>
              <span className="text-2xl font-black text-brand-mint-dark">
                ~{activeTicket.estimatedMinutes} mins
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border text-center col-span-2 sm:col-span-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase block mb-1">
                Visual Alert
              </span>
              <span className="text-sm font-black text-brand-violet flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-brand-mint-dark" />
                Active
              </span>
            </div>
          </div>

          {/* Visual Step-by-Step Directions */}
          <div className="pt-4 border-t space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-brand-violet" />
              <span>Visual Walking Directions to {activeTicket.counterNumber}</span>
            </h4>

            <div className="space-y-2.5">
              {activeTicket.directions.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-brand-warmWhite border border-gray-200 flex items-center gap-3 text-xs sm:text-sm font-semibold text-brand-charcoal"
                >
                  <div className="w-7 h-7 rounded-xl bg-brand-violet text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quick Department Switch & Token Dispensary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-brand-violet/20 shadow-glass space-y-4">
            <h3 className="text-lg font-black text-brand-charcoal font-display border-b pb-3">
              Take a New Appointment Token
            </h3>
            <p className="text-xs text-gray-500">
              Select any counter to instantly generate a visual token with zero paper waste.
            </p>

            <div className="space-y-2.5">
              {[
                { name: 'Hospital Pharmacy & Prescriptions', counter: 'Counter 7 (Ground Floor)' },
                { name: 'Railway Accessible Coach Booking', counter: 'Counter 2 (Concourse)' },
                { name: 'Bank KYC & Signature Verification', counter: 'Desk 5 (First Floor)' },
                { name: 'Disability Certificate Renewal (UDID)', counter: 'Room 12 (Civic Wing)' },
              ].map((svc, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTakeNewToken(svc.name, svc.counter.split('(')[0].trim())}
                  className="w-full p-4 rounded-2xl bg-gray-50 hover:bg-brand-violet/10 border border-gray-200 hover:border-brand-violet/40 text-left transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-brand-charcoal">
                      {svc.name}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{svc.counter}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-violet group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* SMS & Screen Alert Notification Settings */}
          <div className="p-5 rounded-3xl bg-brand-warmWhite border border-brand-violet/15 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-charcoal">
                <Smartphone className="w-4 h-4 text-brand-violet" />
                <span>SMS Vibration Alert</span>
              </div>
              <input
                type="checkbox"
                checked={notifySms}
                onChange={(e) => setNotifySms(e.target.checked)}
                className="w-4 h-4 rounded text-brand-violet focus:ring-brand-violet"
              />
            </div>
            <p className="text-[11px] text-gray-500">
              Sends an SMS reminder to your phone when you are next in line so you can walk freely in the waiting hall.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
