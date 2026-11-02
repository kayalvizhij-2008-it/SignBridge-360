import React, { useState } from 'react';
import type { AppPage, EnvironmentType } from '../types';
import { DETAILED_SITUATIONS } from '../data/situationsData';
import { useAccessibility } from '../context/AccessibilityContext';
import { speakText } from '../utils/speech';
import {
  HeartPulse,
  Train,
  GraduationCap,
  Landmark,
  Building2,
  Volume2,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Info,
} from 'lucide-react';

interface SituationsPageProps {
  onNavigate: (page: AppPage, initialPhrase?: string) => void;
}

export const SituationsPage: React.FC<SituationsPageProps> = ({ onNavigate }) => {
  const { announce, triggerScreenFlash } = useAccessibility();
  const [activeEnv, setActiveEnv] = useState<EnvironmentType>('hospital');

  const workflow = DETAILED_SITUATIONS[activeEnv];

  const handleSpeak = (text: string) => {
    speakText(text);
    triggerScreenFlash();
    announce(`Spoken aloud: ${text}`);
  };

  const envTabs: { id: EnvironmentType; label: string; icon: React.ReactNode }[] = [
    { id: 'hospital', label: 'Hospital OPD', icon: <HeartPulse className="w-4 h-4 text-brand-coral" /> },
    { id: 'railway', label: 'Railway Transit', icon: <Train className="w-4 h-4 text-brand-violet" /> },
    { id: 'college', label: 'Colleges & Labs', icon: <GraduationCap className="w-4 h-4 text-brand-mint-dark" /> },
    { id: 'bank', label: 'Bank & KYC Desks', icon: <Landmark className="w-4 h-4 text-brand-yellow" /> },
    { id: 'government', label: 'Civic Offices', icon: <Building2 className="w-4 h-4 text-brand-violet" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-violet/15 via-brand-coral/15 to-brand-yellow/15 border border-brand-violet/25 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-brand-violet shadow-sm mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Contextual Service Walkthroughs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-charcoal font-display">
            Situation-Based Public Service Workflows
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
            Tailored communication kits engineered for the unique acoustic, vocabulary, and urgency
            characteristics of public counters.
          </p>
        </div>

        <button
          onClick={() => onNavigate('talk')}
          className="px-5 py-3 rounded-2xl bg-brand-charcoal text-white text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-brand-charcoal/90 transition-colors shadow-sm shrink-0"
        >
          <MessageSquare className="w-4 h-4 text-brand-coral" />
          <span>Launch Two-Way Talk</span>
        </button>
      </div>

      {/* Environment Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border border-brand-violet/20 shadow-sm">
        {envTabs.map((tab) => {
          const isActive = activeEnv === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveEnv(tab.id);
                announce(`Switched to ${tab.label} workflow`);
              }}
              className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                isActive
                  ? 'bg-brand-violet text-white shadow-sm'
                  : 'text-gray-600 hover:text-brand-charcoal hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Situation View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Dialogues & Phrases (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Situation Header Card */}
          <div className="p-6 rounded-3xl bg-white border border-brand-violet/20 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-brand-violet/10 text-brand-violet text-xs font-black uppercase tracking-wider">
                {workflow.badge}
              </span>
              <span className="text-xs text-gray-400">Sample content</span>
            </div>
            <h2 className="text-2xl font-black text-brand-charcoal font-display">
              {workflow.title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {workflow.summary}
            </p>
          </div>

          {/* Urgent Action Phrases */}
          <div className="p-6 rounded-3xl bg-red-50/70 border border-red-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-alert-600 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-alert-600 animate-pulse" />
              <span>Priority Situation Phrases (1-Tap Speak & Transfer)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {workflow.urgentPhrases.map((phrase, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-red-200/90 shadow-sm flex flex-col justify-between gap-3 text-xs"
                >
                  <p className="font-semibold text-brand-charcoal leading-snug">{phrase}</p>
                  <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                    <button
                      onClick={() => handleSpeak(phrase)}
                      className="px-2.5 py-1 rounded-lg bg-brand-coral/15 hover:bg-brand-coral hover:text-white text-brand-coral font-bold text-[11px] flex items-center gap-1 transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Speak</span>
                    </button>
                    <button
                      onClick={() => onNavigate('talk', phrase)}
                      className="text-[11px] font-bold text-brand-violet hover:underline flex items-center gap-1"
                    >
                      <span>To Talk</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dialogue Pairs (Staff question -> Deaf responses) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-brand-violet/20 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-black text-brand-charcoal font-display">
                  Frequent Counter Dialogue Scenarios
                </h3>
                <p className="text-xs text-gray-500">
                  Select a common hearing staff prompt to reveal one-tap verified response phrases.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {workflow.dialoguePairs.map((pair, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-brand-warmWhite border border-brand-violet/15 space-y-3"
                >
                  {/* Staff prompt */}
                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-brand-coral text-white text-[10px] font-black uppercase shrink-0 mt-0.5">
                      Hearing Staff
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-brand-charcoal">
                      "{pair.staffPrompt}"
                    </p>
                  </div>

                  {/* Quick responses */}
                  <div className="pl-3 border-l-2 border-brand-violet/30 space-y-2">
                    <span className="text-[10px] font-black uppercase text-brand-violet tracking-wider block">
                      Tap Response to Send to Two-Way Talk:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {pair.userResponses.map((res, rIdx) => (
                        <button
                          key={rIdx}
                          onClick={() => onNavigate('talk', res)}
                          className="px-3 py-2 rounded-xl bg-white border border-brand-violet/25 text-brand-charcoal hover:border-brand-violet hover:bg-brand-violet/5 text-xs font-semibold text-left transition-all shadow-sm flex items-center gap-2 group"
                        >
                          <span className="flex-1">{res}</span>
                          <ArrowRight className="w-3 h-3 text-brand-violet opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Vocabulary & Staff Tips (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Specialized Vocabulary Glossary */}
          <div className="p-6 rounded-3xl bg-white border border-brand-violet/20 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <BookOpen className="w-4 h-4 text-brand-violet" />
              <h3 className="text-sm font-black text-brand-charcoal font-display">
                Key Technical Vocabulary
              </h3>
            </div>

            <div className="space-y-3">
              {workflow.vocabulary.map((vocab, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-1.5 text-xs"
                >
                  <div className="font-bold text-brand-charcoal flex items-center justify-between">
                    <span>{vocab.term}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-violet/10 text-brand-violet font-semibold">
                      Term
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-violet font-medium">
                    🤟 Sign: {vocab.signDescription}
                  </p>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    💡 Meaning: {vocab.plainMeaning}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines for Hearing Counter Staff */}
          <div className="p-6 rounded-3xl bg-brand-yellow/15 border border-brand-yellow/30 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-800" />
              <h3 className="text-sm font-black text-amber-950 font-display">
                Tips for Hearing Staff
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs text-amber-950 leading-relaxed">
              {workflow.tipsForStaff.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
