import React from 'react';
import { MessageSquare, Heart, Shield, Sparkles, Waves } from 'lucide-react';

export const CanvasFallback: React.FC = () => {
  return (
    <div
      className="relative w-full h-[450px] sm:h-[520px] rounded-3xl bg-gradient-to-br from-brand-violet/10 via-brand-coral/10 to-brand-mint/15 border border-brand-violet/20 flex items-center justify-center overflow-hidden p-6 shadow-2xl"
      aria-label="3D Accessibility Communication Interactive Illustration"
    >
      {/* Background Animated Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 rounded-full border border-brand-violet/20 animate-spin-slow opacity-60" />
        <div className="w-96 h-96 rounded-full border border-brand-coral/20 animate-pulse-subtle" />
        <div className="w-[450px] h-[450px] rounded-full border border-brand-mint/15" />
      </div>

      {/* Central Interactive Gesture Visual */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-brand-violet to-brand-coral p-1 shadow-glass-glow flex items-center justify-center animate-float-slow">
            <div className="w-full h-full bg-white/95 rounded-[22px] flex items-center justify-center relative overflow-hidden">
              <span className="text-5xl" role="img" aria-label="Sign Language Hands">
                🤝
              </span>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-yellow flex items-center justify-center text-xs font-bold text-brand-charcoal">
                360°
              </div>
            </div>
          </div>

          {/* Floating contextual badges */}
          <div className="absolute -top-4 -left-12 px-3 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-brand-violet/30 shadow-md flex items-center gap-2 text-xs font-semibold text-brand-charcoal animate-float-delayed">
            <MessageSquare className="w-4 h-4 text-brand-violet" />
            <span>Two-Way Live</span>
          </div>

          <div className="absolute -bottom-3 -right-12 px-3 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-brand-coral/30 shadow-md flex items-center gap-2 text-xs font-semibold text-brand-charcoal animate-float-slow">
            <Heart className="w-4 h-4 text-brand-coral" />
            <span>SignConnect AI</span>
          </div>

          <div className="absolute top-1/2 -right-16 -translate-y-1/2 px-3 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-brand-mint/30 shadow-md flex items-center gap-2 text-xs font-semibold text-brand-charcoal animate-pulse">
            <Shield className="w-4 h-4 text-brand-mint-dark" />
            <span>Offline-First</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-violet/10 text-brand-violet text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive 3D Accessibility Space</span>
        </div>
        <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
          <Waves className="w-3.5 h-3.5 text-brand-mint-dark" />
          Seamless bridging between Deaf & Hearing communicators
        </p>
      </div>
    </div>
  );
};
