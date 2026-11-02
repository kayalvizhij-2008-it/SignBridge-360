import React, { useState } from 'react';
import type { AppPage, PublicServiceGuide, VisualGuideStep } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';
import {
  HeartPulse,
  Train,
  Landmark,
  CheckSquare,
  Square,
  Printer,
  ArrowRight,
  FileText,
  Clock,
  Compass,
} from 'lucide-react';

interface VisualGuidesPageProps {
  onNavigate: (page: AppPage, initialPhrase?: string) => void;
}

export const VisualGuidesPage: React.FC<VisualGuidesPageProps> = ({ onNavigate }) => {
  const { announce } = useAccessibility();

  const [activeGuideId, setActiveGuideId] = useState<string>('guide-hospital');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [staffModalStep, setStaffModalStep] = useState<VisualGuideStep | null>(null);

  const guides: PublicServiceGuide[] = [
    {
      id: 'guide-hospital',
      title: 'Hospital Outpatient & Triage Walkthrough',
      environment: 'hospital',
      summary: 'Navigating arrival, triage scoring, physician exam, and prescription pick-up without auditory reliance.',
      estimatedTime: '45–60 mins',
      requiredDocuments: ['National ID / Aadhaar / Passport', 'Medical Insurance Card', 'Previous Prescriptions / Lab Reports'],
      steps: [
        {
          stepNumber: 1,
          title: 'Reception Desk & Disability Disclosure',
          instruction: 'Approach the reception desk. Present your SignBridge QR Pass or show the "I am Deaf / Hard of Hearing" card on screen.',
          visualCue: 'Look for Counter 1 or "General Registration" overhead sign.',
          iconName: 'Building',
          tipsForDeafUser: 'Request the receptionist to write down the Room Number and Doctor Name on your token slip.',
          tipsForHearingStaff: 'Face the patient directly, remove protective mask if behind acrylic screen, and provide written token slip.',
        },
        {
          stepNumber: 2,
          title: 'Nurse Vital Check & Visual Pain Scale',
          instruction: 'The triage nurse will check blood pressure and temperature. Point directly on the visual 1–10 pain chart to indicate severity.',
          visualCue: 'Triage desk usually has a colored visual pain scale poster (Green 1-3 to Red 8-10).',
          iconName: 'HeartPulse',
          tipsForDeafUser: 'If in severe pain, use the Emergency Express SOS card on your phone.',
          tipsForHearingStaff: 'Do not call patient names into the crowded waiting area with audio alone. Use optical beacons or tap the shoulder gently.',
        },
        {
          stepNumber: 3,
          title: 'Consultation Room Entry',
          instruction: 'Wait in the designated waiting lounge. Watch for the green optical light beacon or your token number on the LED screen.',
          visualCue: 'Room Door 4B with illuminated green LED beacon.',
          iconName: 'Door',
          tipsForDeafUser: 'Keep your SignBridge Two-Way Talk open ready for the physician conversation.',
          tipsForHearingStaff: 'Allow the Deaf visitor to place their smartphone on the desk with Two-Way Talk active.',
        },
        {
          stepNumber: 4,
          title: 'Pharmacy Prescription Pickup',
          instruction: 'Proceed to Pharmacy Counter 7. Hand over the prescription. Verify the dosage icons on the medicine envelope.',
          visualCue: 'Pharmacy icon with green cross symbol.',
          iconName: 'Pill',
          tipsForDeafUser: 'Ensure the pharmacist writes: Morning (☀️), Afternoon (⛅), or Night (🌙) next to each tablet.',
          tipsForHearingStaff: 'Clearly write dosages in bold numerical print. Do not rely on oral instructions.',
        },
      ],
    },
    {
      id: 'guide-railway',
      title: 'Railway Station & Platform Change Guide',
      environment: 'railway',
      summary: 'Handling last-minute platform updates, finding accessible ramps, and boarding disabled coaches safely.',
      estimatedTime: '20–30 mins',
      requiredDocuments: ['Confirmed Train Ticket / PNR SMS', 'Government Disability Concession Card / Photo ID'],
      steps: [
        {
          stepNumber: 1,
          title: 'Concourse Signage & PNR Status Totem',
          instruction: 'Enter main railway concourse. Scan your PNR on the interactive touch totem or check the high-contrast LED departure board.',
          visualCue: 'Large overhead LED matrix display board.',
          iconName: 'Train',
          tipsForDeafUser: 'Avoid relying on PA speakers. Audio platform updates are delayed; visual LED displays refresh every 60 seconds.',
          tipsForHearingStaff: 'Station attendants should point to the LED board or write platform numbers on paper.',
        },
        {
          stepNumber: 2,
          title: 'Handling an Unannounced Platform Change',
          instruction: 'If crowds start moving rapidly or the LED board flashes a new platform number, check the SignBridge Silent Queue Navigator.',
          visualCue: 'Flashing yellow warning tag on central display: "TRAIN 1245 ➔ REASSIGNED PLATFORM 5".',
          iconName: 'AlertTriangle',
          tipsForDeafUser: 'Immediately seek the Station Master or Tourist Information desk with your phone screen showing "Which Platform?".',
          tipsForHearingStaff: 'Never broadcast critical platform shifts solely over loudspeakers.',
        },
        {
          stepNumber: 3,
          title: 'Elevator & Ramp Navigation to Platform',
          instruction: 'Follow the yellow tactile paving or directional elevator signs to reach the designated platform without carrying heavy bags up stairs.',
          visualCue: 'Blue universal wheelchair/elevator signage.',
          iconName: 'ArrowUp',
          tipsForDeafUser: 'Elevators have mirror walls and floor-level indicator lights.',
          tipsForHearingStaff: 'Ensure elevator visual arrival lights are operational.',
        },
        {
          stepNumber: 4,
          title: 'Boarding the Designated Accessible Coach',
          instruction: 'Locate the coach marked with the Universal Access symbol (usually Coach D1 or adjacent to guard van).',
          visualCue: 'International Symbol of Access painted on carriage door.',
          iconName: 'CheckCircle',
          tipsForDeafUser: 'Show ticket to the Traveling Ticket Examiner (TTE) using your phone.',
          tipsForHearingStaff: 'TTE should acknowledge ticket visually with an affirmative nod or stamp.',
        },
      ],
    },
    {
      id: 'guide-bank',
      title: 'Bank KYC Verification & Cash Transaction',
      environment: 'bank',
      summary: 'Discreet, secure financial visits for biometric KYC, cash deposits, and card unblocking.',
      estimatedTime: '15–25 mins',
      requiredDocuments: ['Original ID Card (Aadhaar / SSN / Driver License)', 'Bank Passbook / Cheque Book', '2 Passport Photos'],
      steps: [
        {
          stepNumber: 1,
          title: 'Take Token & Show Communication Preference',
          instruction: 'Select "Customer Service" on the touchscreen kiosk. When called, present your QR Communication Pass to Desk 5.',
          visualCue: 'Kiosk touchscreen dispensing printed token slip.',
          iconName: 'Landmark',
          tipsForDeafUser: 'Your pass specifies: "Please write withdrawal amounts and fee numbers on screen."',
          tipsForHearingStaff: 'Respect privacy. Do not shout balance numbers across the open bank branch.',
        },
        {
          stepNumber: 2,
          title: 'Biometric KYC Fingerprint Verification',
          instruction: 'The officer will place the biometric scanner forward. Look for the green light on the scanner before pressing your thumb.',
          visualCue: 'Optical fingerprint scanner with green/red status light.',
          iconName: 'Fingerprint',
          tipsForDeafUser: 'Press firmly until the green light illuminates on the scanner.',
          tipsForHearingStaff: 'Point clearly to the scanner glass without expecting spoken instructions.',
        },
        {
          stepNumber: 3,
          title: 'Secure PIN Keypad Entry',
          instruction: 'Enter your 4-digit PIN on the shielded POS keypad. Check the visual screen confirmation.',
          visualCue: 'Shielded rubber keypad with privacy shroud.',
          iconName: 'Lock',
          tipsForDeafUser: 'Never write your secret PIN on paper. Only enter it into the keypad yourself.',
          tipsForHearingStaff: 'Look away while customer inputs their confidential PIN.',
        },
        {
          stepNumber: 4,
          title: 'Receipt & Transaction Verification',
          instruction: 'Inspect the printed deposit slip or withdrawal receipt to verify amounts before leaving the teller counter.',
          visualCue: 'Printed counter acknowledgment receipt.',
          iconName: 'Receipt',
          tipsForDeafUser: 'Check the date and exact amount figures.',
          tipsForHearingStaff: 'Hand receipt directly to customer with a clear smile.',
        },
      ],
    },
  ];

  const currentGuide = guides.find((g) => g.id === activeGuideId)!;

  const toggleStepCompleted = (guideId: string, stepNumber: number) => {
    const key = `${guideId}-${stepNumber}`;
    setCompletedSteps((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    announce(`Step ${stepNumber} toggled`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-violet/15 via-brand-mint/15 to-brand-yellow/15 border border-brand-violet/25 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-brand-violet shadow-sm mb-2">
            <Compass className="w-3.5 h-3.5 text-brand-mint-dark" />
            <span>Public Service Navigator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-charcoal font-display">
            Visual Public Service Guides
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
            Step-by-step illustrated workflows for hospitals, railway stations, and banks.
            Follow landmarks, check off completed steps, and avoid reliance on loudspeaker announcements.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-5 py-3 rounded-2xl bg-brand-charcoal text-white text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-brand-charcoal/90 transition-colors shadow-sm"
        >
          <Printer className="w-4 h-4 text-brand-yellow" />
          <span>Print / Save Checklist</span>
        </button>
      </div>

      {/* Guide Category Selector Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {guides.map((g) => {
          const isSelected = activeGuideId === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setActiveGuideId(g.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-md scale-105'
                  : 'bg-white hover:bg-gray-100 text-brand-charcoal border-gray-200'
              }`}
            >
              {g.environment === 'hospital' ? (
                <HeartPulse className="w-4 h-4 text-brand-coral" />
              ) : g.environment === 'railway' ? (
                <Train className="w-4 h-4 text-brand-violet" />
              ) : (
                <Landmark className="w-4 h-4 text-amber-600" />
              )}
              <span>{g.title.split(' ')[0]} Guide</span>
            </button>
          );
        })}
      </div>

      {/* Main Guide Detail Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-brand-violet/20 shadow-glass space-y-8">
        {/* Guide Overview Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-brand-violet tracking-wider">
              {currentGuide.environment.toUpperCase()} INTERACTION ROADMAP
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-charcoal font-display">
              {currentGuide.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
              {currentGuide.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-2xl bg-gray-50 border text-xs text-gray-600 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-violet" />
              <span>Est: {currentGuide.estimatedTime}</span>
            </div>

            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2 rounded-2xl bg-brand-violet text-white text-xs font-bold flex items-center gap-1.5 hover:bg-brand-violet-dark transition-colors"
            >
              <span>Open Phrases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Required Documents Badge */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-amber-700" />
            <span>Documents to Bring Before You Go:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {currentGuide.requiredDocuments.map((doc, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-white text-amber-950 font-medium border border-amber-200"
              >
                ✓ {doc}
              </span>
            ))}
          </div>
        </div>

        {/* Step-by-Step Illustrated Cards */}
        <div className="space-y-6">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-charcoal">
            Step-by-Step Visual Walkthrough ({currentGuide.steps.length} Steps)
          </h3>

          <div className="space-y-4">
            {currentGuide.steps.map((step) => {
              const isChecked = !!completedSteps[`${currentGuide.id}-${step.stepNumber}`];

              return (
                <div
                  key={step.stepNumber}
                  className={`p-6 rounded-3xl border-2 transition-all ${
                    isChecked
                      ? 'bg-emerald-50/50 border-emerald-300 opacity-90'
                      : 'bg-white border-gray-200 hover:border-brand-violet/40 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Step Number Badge */}
                      <div
                        className={`w-10 h-10 rounded-2xl font-black text-sm flex items-center justify-center shrink-0 ${
                          isChecked
                            ? 'bg-emerald-600 text-white'
                            : 'bg-brand-violet text-white shadow-sm'
                        }`}
                      >
                        {step.stepNumber}
                      </div>

                      <div className="space-y-2">
                        <h4
                          className={`text-lg font-bold font-display ${
                            isChecked ? 'line-through text-gray-500' : 'text-brand-charcoal'
                          }`}
                        >
                          {step.title}
                        </h4>

                        <p className="text-sm text-gray-700 leading-relaxed">
                          {step.instruction}
                        </p>

                        {/* Landmark / Visual Cue */}
                        <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-xs text-brand-charcoal font-medium flex items-center gap-2">
                          <Compass className="w-4 h-4 text-brand-violet shrink-0" />
                          <span><strong>Visual Landmark:</strong> {step.visualCue}</span>
                        </div>

                        {/* Co-Design Tips for Deaf User & Hearing Staff */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                          <div className="p-3 rounded-xl bg-gray-50 border">
                            <span className="font-bold text-brand-violet block mb-0.5">
                              🤟 Tip for You (Deaf Communicator):
                            </span>
                            <span className="text-gray-600">{step.tipsForDeafUser}</span>
                          </div>

                          <div className="p-3 rounded-xl bg-gray-50 border">
                            <span className="font-bold text-brand-coral block mb-0.5">
                              🎙️ Expectation from Staff:
                            </span>
                            <span className="text-gray-600">{step.tipsForHearingStaff}</span>
                          </div>
                        </div>

                        {/* Action buttons: Show to staff & speak */}
                        <div className="pt-2 flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => setStaffModalStep(step)}
                            className="px-3.5 py-1.5 rounded-xl bg-brand-charcoal text-white hover:bg-brand-charcoal/90 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                          >
                            <span>Show to Staff (Large Card)</span>
                            <ArrowRight className="w-3.5 h-3.5 text-brand-yellow" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Step Checkbox Button */}
                    <button
                      onClick={() => toggleStepCompleted(currentGuide.id, step.stepNumber)}
                      className={`p-2 rounded-xl transition-colors shrink-0 ${
                        isChecked
                          ? 'text-emerald-600 hover:text-emerald-700'
                          : 'text-gray-400 hover:text-brand-violet'
                      }`}
                      title={isChecked ? 'Mark step as incomplete' : 'Mark step as done'}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-7 h-7" />
                      ) : (
                        <Square className="w-7 h-7" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Show to Staff Large Card Modal */}
        {staffModalStep && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="staff-card-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setStaffModalStep(null)}
          >
            <div
              className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border-4 border-brand-violet animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-brand-violet text-white text-xs font-black uppercase">
                    Show Across Counter
                  </span>
                  <span className="text-xs text-gray-400">Step {staffModalStep.stepNumber}</span>
                </div>
                <button
                  onClick={() => setStaffModalStep(null)}
                  className="px-3 py-1 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700"
                >
                  Close [ESC]
                </button>
              </div>

              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-wider text-brand-coral block">
                  Notice for Counter Staff:
                </span>
                <h3 id="staff-card-title" className="text-xl sm:text-2xl font-black text-brand-charcoal leading-snug">
                  {staffModalStep.instruction}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                <span className="font-bold block">🎙️ Communication Request:</span>
                <p>{staffModalStep.tipsForHearingStaff}</p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t">
                <span className="text-xs text-gray-500 font-semibold">
                  SignBridge 360 Visual Access
                </span>
                <button
                  onClick={() => setStaffModalStep(null)}
                  className="px-6 py-2.5 rounded-xl bg-brand-charcoal text-white font-bold text-xs shadow-sm hover:bg-brand-charcoal/90"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
