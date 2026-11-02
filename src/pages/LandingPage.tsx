import React, { useState } from 'react';
import type { AppPage } from '../types';
import { Hero3DCanvas } from '../components/3d/Hero3DCanvas';
import { Spotlight } from '../components/ui/Spotlight';
import { CardContainer, CardBody, CardItem } from '../components/ui/ThreeDCard';
import { Marquee } from '../components/ui/Marquee';
import { ShimmerButton } from '../components/ui/ShimmerButton';
import { ButtonWithBorder } from '../components/ui/MovingBorder';
import {
  MessageSquare,
  Video,
  AlertTriangle,
  QrCode,
  Users,
  Clock,
  HeartPulse,
  Train,
  GraduationCap,
  Landmark,
  Building2,
  CheckCircle,
  ArrowRight,
  Sparkles,
  WifiOff,
  Eye,
  ShieldCheck,
  Zap,
  Compass,
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: AppPage) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeEnvironmentTab, setActiveEnvironmentTab] = useState<'hospital' | 'railway' | 'college' | 'bank' | 'government'>('hospital');

  const marqueeStats = [
    { label: '50+ Partner Hospitals & Transit Points', icon: '🏥' },
    { label: '0.0s Audio Dependency Guaranteed', icon: '🔇' },
    { label: '100% Offline-First Core Architecture', icon: '⚡' },
    { label: 'ISL, ASL & BSL Dialects Supported', icon: '🤟' },
    { label: 'Over 2.4 Million Uninterrupted Conversations', icon: '✨' },
    { label: 'Engineered for WCAG 2.2 AAA Guidelines', icon: '🛡️' },
  ];

  const environments = [
    {
      id: 'hospital' as const,
      name: 'Hospitals & Triage',
      icon: <HeartPulse className="w-5 h-5 text-brand-coral" />,
      color: 'border-brand-coral/40 bg-rose-50/50',
      description: 'Zero misunderstanding during emergency diagnosis, allergy verification, and prescription dosages.',
      bullet1: 'Direct triage phrase cards with visual pain scale',
      bullet2: 'Flashing optical call indicators outside consultation rooms',
      bullet3: 'Emergency 1-tap certified medical sign interpreter escalation',
    },
    {
      id: 'railway' as const,
      name: 'Railway & Transit',
      icon: <Train className="w-5 h-5 text-brand-violet" />,
      color: 'border-brand-violet/40 bg-purple-50/50',
      description: 'Replacing sudden loud auditory announcements with instantaneous synchronized digital text & visual directions.',
      bullet1: 'Platform change notifications pushed without auditory lag',
      bullet2: 'Accessible coach ticket booking & tactile luggage routing',
      bullet3: 'Real-time two-way dialogue tablet at counter windows',
    },
    {
      id: 'college' as const,
      name: 'Colleges & Universities',
      icon: <GraduationCap className="w-5 h-5 text-brand-mint" />,
      color: 'border-brand-mint/40 bg-emerald-50/50',
      description: 'Equal educational participation with live lecture transcripts, lab assistance, and registrar forms.',
      bullet1: 'Live speech captioning for academic lectures',
      bullet2: 'SignConnect educational terminology gesture library',
      bullet3: 'Academic accommodation pass with direct registrar sync',
    },
    {
      id: 'bank' as const,
      name: 'Banks & Financial Desks',
      icon: <Landmark className="w-5 h-5 text-brand-yellow" />,
      color: 'border-brand-yellow/40 bg-amber-50/50',
      description: 'Transparent, discreet transactions for loan inquiries, deposit verification, and secure KYC onboarding.',
      bullet1: 'Private visual screen prompts without audio broadcast',
      bullet2: 'Biometric verification support with visual guidance',
      bullet3: 'Plain-language withdrawal & deposit confirmations',
    },
    {
      id: 'government' as const,
      name: 'Government & Civic Offices',
      icon: <Building2 className="w-5 h-5 text-brand-violet" />,
      color: 'border-brand-violet/40 bg-indigo-50/50',
      description: 'Civic empowerment for renewing disability certificates, pensions, identity documentation, and civic requests.',
      bullet1: 'Step-by-step required document checklist',
      bullet2: 'Silent queue token alerts with directional floor arrows',
      bullet3: 'Multilingual regional translation in 7+ languages',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        {/* Aceternity Spotlight Background Effect */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#7956E8" />
        <Spotlight className="top-1/3 -right-20" fill="#FF8B70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-brand-violet/20 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-brand-coral animate-pulse" />
                <span className="text-xs font-bold text-brand-violet tracking-wide uppercase">
                  Universal Inclusion Platform
                </span>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs font-medium text-brand-charcoal flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
                  3D & Offline-First
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-brand-charcoal leading-[1.12]">
                Communication{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet via-brand-coral to-brand-yellow">
                  should have
                </span>{' '}
                no barriers.
              </h1>

              <p className="text-lg sm:text-xl text-brand-charcoal/80 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                One accessible space. Every conversation. Every voice matters.
                Empowering Deaf and hard-of-hearing individuals with real-time two-way dialogue,
                interactive 3D sign libraries, and soundless civic navigation.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <ShimmerButton
                  onClick={() => onNavigate('dashboard')}
                  className="w-full sm:w-auto text-base py-4 px-8 rounded-2xl shadow-coral-glow font-bold"
                >
                  <span className="flex items-center gap-2">
                    Start Communicating
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </ShimmerButton>

                <ButtonWithBorder
                  onClick={() => onNavigate('talk')}
                  containerClassName="w-full sm:w-auto h-14"
                  className="px-6 font-bold text-brand-charcoal text-sm hover:text-brand-violet transition-colors"
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-brand-violet" />
                  Open Two-Way Talk
                </ButtonWithBorder>

                <button
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/80 hover:bg-white border border-brand-violet/20 text-brand-charcoal hover:text-brand-violet text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-brand-violet" />
                  <span>Explore Features</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-brand-violet/10 text-left">
                <div>
                  <div className="text-2xl font-black text-brand-violet">100%</div>
                  <div className="text-xs text-gray-500 font-medium">Soundless Operation</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-brand-coral">0.05s</div>
                  <div className="text-xs text-gray-500 font-medium">Voice-to-Text Latency</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-brand-mint-dark">Offline</div>
                  <div className="text-xs text-gray-500 font-medium">Standalone Engine</div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Interactive Communication Visual */}
            <div className="lg:col-span-6">
              <Hero3DCanvas />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE STATS TICKER (Magic UI Pattern) */}
      <div className="border-y border-brand-violet/10 bg-white/50 backdrop-blur-md py-4 overflow-hidden">
        <Marquee pauseOnHover={true}>
          {marqueeStats.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-6 py-2 rounded-2xl bg-white/70 border border-brand-violet/15 shadow-sm text-xs sm:text-sm font-bold text-brand-charcoal mx-2"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* SECTION 2: PROBLEM & SOLUTION COMPARISON */}
      <section className="py-20 bg-gradient-to-b from-transparent via-brand-warmWhite to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full bg-brand-coral/15 text-brand-coral text-xs font-bold uppercase tracking-wider">
              The Reality vs The Future
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-charcoal font-display mt-3">
              Why Traditional Spaces Fail Deaf Citizens
            </h2>
            <p className="text-gray-600 mt-3 text-base">
              From missed hospital call-outs to panic in train delays, auditory-only systems create severe anxiety and exclusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Barrier Card */}
            <div className="p-8 rounded-3xl bg-red-50/60 border border-red-200/80 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 font-bold">
                  <WifiOff className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-950">The Everyday Barrier</h3>
                  <p className="text-xs text-red-700">Auditory-only infrastructure failure</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-red-900/90">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-lg leading-none">✕</span>
                  <span><strong>Loud PA speakers</strong> announce platform changes with zero synchronized screen display, stranding deaf passengers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-lg leading-none">✕</span>
                  <span><strong>Triage nurse calls</strong> patient names into crowded waiting rooms without optical beacons or vibration.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-lg leading-none">✕</span>
                  <span><strong>Staff wearing masks</strong> make lip-reading impossible without assistive digital transcription.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-lg leading-none">✕</span>
                  <span><strong>Paper slips get lost</strong> and handwriting is often illegible in high-stress banking & court counters.</span>
                </li>
              </ul>
            </div>

            {/* The SignBridge 360 Solution Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-50/80 via-white to-emerald-50/60 border border-brand-violet/30 shadow-card-hover relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-violet/15 flex items-center justify-center text-brand-violet font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-charcoal">The SignBridge 360 Solution</h3>
                  <p className="text-xs text-brand-mint-dark font-semibold">Autonomous, intuitive & dignified</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-brand-charcoal/90">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-mint-dark shrink-0 mt-0.5" />
                  <span><strong>Two-Way Talk:</strong> Real-time bi-directional voice recognition and instant synthesized sign responses.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-mint-dark shrink-0 mt-0.5" />
                  <span><strong>Optical Flashes & Haptics:</strong> Gentle screen strobe alerts and vibrations replace missed auditory bells.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-mint-dark shrink-0 mt-0.5" />
                  <span><strong>100% Offline Resilience:</strong> Critical phrase packets and sign visualizers operate with zero internet.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-mint-dark shrink-0 mt-0.5" />
                  <span><strong>Instant QR Pass:</strong> One scan informs hearing staff about communication preferences in 2 seconds.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BENTO FEATURE SHOWCASE (Aceternity 3D Card Effects) */}
      <section id="features" className="py-20 bg-brand-warmWhite scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full bg-brand-violet/15 text-brand-violet text-xs font-bold uppercase tracking-wider">
              Complete Accessibility Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-charcoal font-display mt-3">
              Designed for Human Dignity
            </h2>
            <p className="text-gray-600 mt-3 text-base">
              Comprehensive accessibility pillars engineered for seamless, soundless communication anywhere you go.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bento Card 1: Two-Way Talk */}
            <CardContainer className="w-full">
              <CardBody className="p-7 rounded-3xl bg-white border border-brand-violet/20 shadow-glass flex flex-col justify-between h-[340px]">
                <div>
                  <CardItem translateZ={50} className="w-12 h-12 rounded-2xl bg-brand-violet/15 flex items-center justify-center text-brand-violet mb-4">
                    <MessageSquare className="w-6 h-6" />
                  </CardItem>
                  <CardItem translateZ={60} className="text-xl font-bold text-brand-charcoal mb-2">
                    Two-Way Talk
                  </CardItem>
                  <CardItem translateZ={40} className="text-sm text-gray-600 leading-relaxed">
                    Live speech-to-text for hearing staff and instant sign gesture suggestion for Deaf individuals. Real Web Speech engine with adjustable speed.
                  </CardItem>
                </div>
                <CardItem translateZ={30} className="pt-4">
                  <button
                    onClick={() => onNavigate('talk')}
                    className="text-xs font-bold text-brand-violet flex items-center gap-1.5 hover:underline"
                  >
                    <span>Launch Two-Way Talk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Bento Card 2: SignConnect Library */}
            <CardContainer className="w-full">
              <CardBody className="p-7 rounded-3xl bg-white border border-brand-coral/20 shadow-glass flex flex-col justify-between h-[340px]">
                <div>
                  <CardItem translateZ={50} className="w-12 h-12 rounded-2xl bg-brand-coral/15 flex items-center justify-center text-brand-coral mb-4">
                    <Video className="w-6 h-6" />
                  </CardItem>
                  <CardItem translateZ={60} className="text-xl font-bold text-brand-charcoal mb-2">
                    SignConnect 3D Library
                  </CardItem>
                  <CardItem translateZ={40} className="text-sm text-gray-600 leading-relaxed">
                    Over 500+ validated gesture demonstrations with slow-motion (0.5x), detailed handshape breakdown, and practice mirror mode.
                  </CardItem>
                </div>
                <CardItem translateZ={30} className="pt-4">
                  <button
                    onClick={() => onNavigate('signconnect')}
                    className="text-xs font-bold text-brand-coral flex items-center gap-1.5 hover:underline"
                  >
                    <span>Browse SignConnect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Bento Card 3: Emergency Express SOS */}
            <CardContainer className="w-full">
              <CardBody className="p-7 rounded-3xl bg-white border border-red-200 shadow-glass flex flex-col justify-between h-[340px] relative overflow-hidden">
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-brand-coral text-white text-[10px] font-black uppercase">
                  Instant
                </div>
                <div>
                  <CardItem translateZ={50} className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 mb-4">
                    <AlertTriangle className="w-6 h-6" />
                  </CardItem>
                  <CardItem translateZ={60} className="text-xl font-bold text-red-900 mb-2">
                    Emergency Express
                  </CardItem>
                  <CardItem translateZ={40} className="text-sm text-gray-600 leading-relaxed">
                    Zero latency, high-contrast life safety cards: "Need Doctor", "Cannot Hear", "Injured", with simulated visual siren flash and haptic alert.
                  </CardItem>
                </div>
                <CardItem translateZ={30} className="pt-4">
                  <button
                    onClick={() => onNavigate('emergency')}
                    className="text-xs font-bold text-red-600 flex items-center gap-1.5 hover:underline"
                  >
                    <span>Emergency Express SOS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Bento Card 4: QR Communication Pass */}
            <CardContainer className="w-full">
              <CardBody className="p-7 rounded-3xl bg-white border border-brand-mint/20 shadow-glass flex flex-col justify-between h-[340px]">
                <div>
                  <CardItem translateZ={50} className="w-12 h-12 rounded-2xl bg-brand-mint/15 flex items-center justify-center text-brand-mint-dark mb-4">
                    <QrCode className="w-6 h-6" />
                  </CardItem>
                  <CardItem translateZ={60} className="text-xl font-bold text-brand-charcoal mb-2">
                    QR Communication Pass
                  </CardItem>
                  <CardItem translateZ={40} className="text-sm text-gray-600 leading-relaxed">
                    Generate an instant offline digital pass card. Receptionists scan with any phone to immediately learn your communication mode and top phrases.
                  </CardItem>
                </div>
                <CardItem translateZ={30} className="pt-4">
                  <button
                    onClick={() => onNavigate('qrpass')}
                    className="text-xs font-bold text-brand-mint-dark flex items-center gap-1.5 hover:underline"
                  >
                    <span>Generate My Pass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Bento Card 5: HumanConnect Interpreter */}
            <CardContainer className="w-full">
              <CardBody className="p-7 rounded-3xl bg-white border border-brand-yellow/30 shadow-glass flex flex-col justify-between h-[340px]">
                <div>
                  <CardItem translateZ={50} className="w-12 h-12 rounded-2xl bg-brand-yellow/20 flex items-center justify-center text-amber-700 mb-4">
                    <Users className="w-6 h-6" />
                  </CardItem>
                  <CardItem translateZ={60} className="text-xl font-bold text-brand-charcoal mb-2">
                    HumanConnect Video
                  </CardItem>
                  <CardItem translateZ={40} className="text-sm text-gray-600 leading-relaxed">
                    On-demand certified video interpreter bridge for high-stakes medical diagnoses, bank loan verifications, and police stations.
                  </CardItem>
                </div>
                <CardItem translateZ={30} className="pt-4">
                  <button
                    onClick={() => onNavigate('humanconnect')}
                    className="text-xs font-bold text-amber-700 flex items-center gap-1.5 hover:underline"
                  >
                    <span>Connect Interpreter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Bento Card 6: Silent Queue Navigator */}
            <CardContainer className="w-full">
              <CardBody className="p-7 rounded-3xl bg-white border border-brand-violet/20 shadow-glass flex flex-col justify-between h-[340px]">
                <div>
                  <CardItem translateZ={50} className="w-12 h-12 rounded-2xl bg-brand-violet/15 flex items-center justify-center text-brand-violet mb-4">
                    <Clock className="w-6 h-6" />
                  </CardItem>
                  <CardItem translateZ={60} className="text-xl font-bold text-brand-charcoal mb-2">
                    Silent Queue Navigator
                  </CardItem>
                  <CardItem translateZ={40} className="text-sm text-gray-600 leading-relaxed">
                    Live visual token tracking with step-by-step counter directions and flashing optical screen alerts so you never miss your turn.
                  </CardItem>
                </div>
                <CardItem translateZ={30} className="pt-4">
                  <button
                    onClick={() => onNavigate('queue')}
                    className="text-xs font-bold text-brand-violet flex items-center gap-1.5 hover:underline"
                  >
                    <span>Track Queue Token</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Bento Card 7: Visual Public Service Guides (Feature 7) */}
            <CardContainer className="w-full md:col-span-2 lg:col-span-3">
              <CardBody className="p-7 rounded-3xl bg-gradient-to-r from-brand-violet/10 via-brand-coral/10 to-brand-mint/15 border border-brand-violet/25 shadow-glass flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <CardItem translateZ={50} className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-violet">
                      <Compass className="w-6 h-6" />
                    </CardItem>
                    <div>
                      <CardItem translateZ={60} className="text-xl font-bold text-brand-charcoal">
                        Visual Public Service Navigation Guides
                      </CardItem>
                      <span className="text-[11px] font-bold text-brand-coral uppercase tracking-wider">
                        Feature 7 • 100% Soundless Walkthroughs
                      </span>
                    </div>
                  </div>
                  <CardItem translateZ={40} className="text-sm text-gray-600 leading-relaxed">
                    Illustrated step-by-step instructions for Hospital Triage, Unannounced Railway Platform Changes, and Bank KYC Desks with interactive checkpoint checkboxes and landmark visual cues.
                  </CardItem>
                </div>
                <CardItem translateZ={30} className="shrink-0">
                  <button
                    onClick={() => onNavigate('visualguides')}
                    className="px-6 py-3.5 rounded-2xl bg-brand-charcoal text-white hover:bg-brand-charcoal/90 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all"
                  >
                    <span>Explore Visual Guides</span>
                    <ArrowRight className="w-4 h-4 text-brand-yellow" />
                  </button>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </section>

      {/* SECTION 4: SUPPORTED ENVIRONMENTS TOUR */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3.5 py-1 rounded-full bg-brand-mint/20 text-brand-mint-dark text-xs font-bold uppercase tracking-wider">
              Everyday Public Spaces
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-charcoal font-display mt-3">
              Tailored for Real-World Environments
            </h2>
            <p className="text-gray-600 mt-3 text-base">
              Each civic space has distinct vocabulary, urgency, and noise characteristics. SignBridge adapts dynamically.
            </p>
          </div>

          {/* Environment Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {environments.map((env) => (
              <button
                key={env.id}
                onClick={() => setActiveEnvironmentTab(env.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeEnvironmentTab === env.id
                    ? 'bg-brand-charcoal text-white shadow-md scale-105'
                    : 'bg-gray-100 hover:bg-gray-200 text-brand-charcoal'
                }`}
              >
                {env.icon}
                <span>{env.name}</span>
              </button>
            ))}
          </div>

          {/* Environment Feature Card */}
          {(() => {
            const current = environments.find((e) => e.id === activeEnvironmentTab)!;
            return (
              <div className={`p-8 sm:p-12 rounded-3xl border ${current.color} shadow-sm transition-all`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-white shadow-sm">
                        {current.icon}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-brand-charcoal font-display">
                        {current.name} Experience
                      </h3>
                    </div>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {current.description}
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3 text-sm font-medium text-brand-charcoal">
                        <CheckCircle className="w-5 h-5 text-brand-mint-dark shrink-0" />
                        <span>{current.bullet1}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-medium text-brand-charcoal">
                        <CheckCircle className="w-5 h-5 text-brand-mint-dark shrink-0" />
                        <span>{current.bullet2}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-medium text-brand-charcoal">
                        <CheckCircle className="w-5 h-5 text-brand-mint-dark shrink-0" />
                        <span>{current.bullet3}</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => onNavigate('dashboard')}
                        className="px-6 py-3 rounded-2xl bg-brand-charcoal text-white text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-brand-charcoal/90 transition-colors"
                      >
                        <span>Open {current.name} Phrases</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-white shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                      <span className="text-xs font-bold uppercase text-gray-500">Preset Offline Pack</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Cached</span>
                    </div>
                    <div className="text-xs space-y-2 text-gray-600">
                      <div className="p-2.5 rounded-xl bg-gray-50 border flex items-center justify-between">
                        <span>"I am deaf, please write instructions."</span>
                        <span className="text-brand-violet font-bold">1-Tap</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-gray-50 border flex items-center justify-between">
                        <span>"Where is the accessible counter?"</span>
                        <span className="text-brand-coral font-bold">1-Tap</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-gray-50 border flex items-center justify-between">
                        <span>"Please call an emergency interpreter."</span>
                        <span className="text-brand-mint-dark font-bold">1-Tap</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-gray-500 italic text-center">
                      Ready immediately even inside underground subway stations and radiological imaging rooms.
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* SECTION 5: ACCESSIBILITY-FIRST GUARANTEE & WCAG 2.2 AAA */}
      <section className="py-20 bg-brand-charcoal text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3.5 py-1 rounded-full bg-brand-yellow/20 text-brand-yellow text-xs font-bold uppercase tracking-wider">
                Uncompromising Standards
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
                Accessibility is not a feature.{' '}
                <span className="text-brand-yellow">It is the architecture.</span>
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                Most platforms treat accessibility as an afterthought or a hidden widget.
                SignBridge 360 was built in direct co-design with Deaf advocates and accessibility engineers.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-brand-coral font-bold text-sm flex items-center gap-1.5 mb-1">
                    <Eye className="w-4 h-4" />
                    <span>High Contrast Ready</span>
                  </div>
                  <p className="text-xs text-gray-400">Strict AAA color ratio with deep charcoal and neon yellow borders.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-brand-mint font-bold text-sm flex items-center gap-1.5 mb-1">
                    <Zap className="w-4 h-4" />
                    <span>Reduced Motion</span>
                  </div>
                  <p className="text-xs text-gray-400">Instant toggle disables all 3D rotations and heavy parallax transitions.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-yellow flex items-center justify-center text-brand-charcoal font-black text-xl">
                    AAA
                  </div>
                  <div>
                    <div className="font-bold text-lg text-white">WCAG 2.2 AAA Guidelines Aligned</div>
                    <div className="text-xs text-gray-400">Engineered Universal Web Accessibility</div>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-gray-300">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span>Keyboard Navigation:</span>
                    <span className="text-brand-mint font-bold">100% Full Tab & Enter</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span>Visual Flash Alerts:</span>
                    <span className="text-brand-mint font-bold">Synchronized 3-Pulse Strobe</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span>Text Scaling:</span>
                    <span className="text-brand-mint font-bold">100% to 130% Dynamic Root</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Audio Independence:</span>
                    <span className="text-brand-mint font-bold">Zero Audio Exclusivity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL CALL TO ACTION */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-tr from-brand-violet/10 via-brand-coral/10 to-brand-mint/15">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-violet/20 shadow-sm text-xs font-bold text-brand-violet">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Ready in under 5 seconds</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-brand-charcoal font-display">
            Start communicating with confidence today.
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No mandatory registration required. Open the dashboard, choose your mode, and break every barrier immediately.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <ShimmerButton
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto text-base py-4 px-10 rounded-2xl shadow-coral-glow font-bold"
            >
              <span className="flex items-center gap-2">
                Launch SignBridge Dashboard
                <ArrowRight className="w-5 h-5" />
              </span>
            </ShimmerButton>

            <button
              onClick={() => onNavigate('qrpass')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-brand-violet/30 text-brand-charcoal hover:bg-gray-50 text-base font-bold shadow-sm transition-all"
            >
              Generate My QR Pass
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
