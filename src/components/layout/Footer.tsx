import React from 'react';
import type { AppPage } from '../../types';
import { ShieldCheck, Heart, Sparkles, Wifi, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: AppPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-brand-charcoal text-white pt-16 pb-12 border-t border-brand-charcoal-light relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-coral/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-violet via-brand-coral to-brand-yellow p-0.5">
                <div className="w-full h-full bg-brand-charcoal rounded-[10px] flex items-center justify-center font-black text-white text-lg">
                  SB
                </div>
              </div>
              <span className="font-extrabold text-2xl font-display tracking-tight text-white">
                SignBridge <span className="text-brand-coral">360</span>
              </span>
            </div>

            <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
              Breaking communication barriers between Deaf, hard-of-hearing, and hearing communities
              across healthcare, transport, banking, and governance with intuitive 3D, offline AI, and human empathy.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-mint/15 text-brand-mint text-xs font-semibold border border-brand-mint/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                Engineered towards WCAG 2.2 AAA Guidelines
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-yellow/15 text-brand-yellow text-xs font-semibold border border-brand-yellow/30">
                <Wifi className="w-3.5 h-3.5" />
                Offline-First PWA
              </span>
            </div>
          </div>

          {/* Quick Core Tools */}
          <div>
            <h4 className="font-bold text-sm text-brand-yellow uppercase tracking-wider mb-4">
              Core Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-brand-coral transition-colors flex items-center gap-1"
                >
                  <span>Communication Hub</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('talk')}
                  className="hover:text-brand-coral transition-colors flex items-center gap-1"
                >
                  <span>Two-Way Talk (TTS/STT)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('signconnect')}
                  className="hover:text-brand-coral transition-colors flex items-center gap-1"
                >
                  <span>SignConnect Library</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('emergency')}
                  className="text-brand-coral font-bold hover:text-brand-coral-light transition-colors flex items-center gap-1"
                >
                  <span>Emergency Express SOS</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
            </ul>
          </div>

          {/* Specialized Modules */}
          <div>
            <h4 className="font-bold text-sm text-brand-mint uppercase tracking-wider mb-4">
              Assistance & Pass
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => onNavigate('visualguides')}
                  className="hover:text-brand-mint transition-colors flex items-center gap-1"
                >
                  <span>Visual Public Service Guides</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('qrpass')}
                  className="hover:text-brand-mint transition-colors flex items-center gap-1"
                >
                  <span>QR Communication Pass</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('humanconnect')}
                  className="hover:text-brand-mint transition-colors flex items-center gap-1"
                >
                  <span>HumanConnect Interpreter</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('queue')}
                  className="hover:text-brand-mint transition-colors flex items-center gap-1"
                >
                  <span>Silent Queue Navigator</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('institution')}
                  className="hover:text-brand-mint transition-colors flex items-center gap-1"
                >
                  <span>Institution Analytics</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Environments */}
          <div>
            <h4 className="font-bold text-sm text-brand-coral uppercase tracking-wider mb-4">
              Environments
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-coral" />
                <span>Hospitals & Trauma Triage</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-violet" />
                <span>Railways & Metro Terminals</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-mint" />
                <span>Colleges & Academic Labs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                <span>Banks & Financial Desks</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-violet-light" />
                <span>Government & Civic Offices</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-brand-coral inline fill-brand-coral" /> for universal inclusion.
            © 2026 SignBridge 360 Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-300">
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
              Three.js • R3F • Motion • Tailwind • Web Speech API
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
