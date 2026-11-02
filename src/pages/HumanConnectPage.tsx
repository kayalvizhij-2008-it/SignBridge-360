import React, { useState, useEffect, useRef } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import {
  Users,
  Video,
  Mic,
  MicOff,
  PhoneOff,
  MessageSquare,
  Camera,
  CameraOff,
  Send,
  Clock,
  Radio,
  CheckCircle2,
  Info,
} from 'lucide-react';

export const HumanConnectPage: React.FC = () => {
  const { announce } = useAccessibility();

  // Call states: 'idle' | 'searching' | 'connected' | 'ended'
  const [callState, setCallState] = useState<'idle' | 'searching' | 'connected' | 'ended'>('idle');

  // Request parameters
  const [selectedLanguage, setSelectedLanguage] = useState<'ISL' | 'ASL' | 'BSL'>('ISL');
  const [selectedSituation, setSelectedSituation] = useState<string>('medical');

  // Active call controls
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isCameraOff, setIsCameraOff] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    {
      sender: 'Priya Sharma (Demo Interpreter)',
      text: 'Hello, this is a simulated session with an ISL interpreter. I can translate between sign and spoken speech.',
      time: '10:02 AM',
    },
    {
      sender: 'You',
      text: 'Thank you! The doctor is about to explain my prescription.',
      time: '10:03 AM',
    },
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [callDuration, setCallDuration] = useState<number>(142); // seconds

  const userVideoRef = useRef<HTMLVideoElement>(null);
  const userStreamRef = useRef<MediaStream | null>(null);

  // Call timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (callState === 'connected') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartCall = async () => {
    setCallState('searching');
    announce('Initiating simulated interpreter connection');

    // Attempt webcam for self view
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      userStreamRef.current = stream;
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
    } catch {
      // Ignored
    }

    // Simulate connection delay
    setTimeout(() => {
      setCallState('connected');
      announce('Simulated connection established with demo interpreter');
    }, 2500);
  };

  const handleEndCall = () => {
    if (userStreamRef.current) {
      userStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    setCallState('ended');
    announce('Interpreter session concluded');
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [...prev, { sender: 'You', text: chatInput, time: now }]);
    setChatInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner with Clear Simulation Label */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-yellow/15 via-brand-coral/10 to-brand-violet/15 border border-brand-yellow/30 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-amber-800 shadow-sm mb-2">
            <Radio className="w-3.5 h-3.5 text-brand-coral animate-pulse" />
            <span>Interactive Video Relay Service (VRS) Simulation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-charcoal font-display">
            HumanConnect Video Interpreting
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
            High-fidelity demonstration of an on-demand video interpreting call.
            In production institutional deployments, this connects to licensed Video Relay Service (VRS) agencies.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-semibold max-w-xs">
          <strong>Notice:</strong> This interface is a live prototype simulation. Calls connect to a demonstration stream for facility testing.
        </div>
      </div>

      {/* STATE 1: IDLE / CONFIGURATION FORM */}
      {callState === 'idle' && (
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white border border-brand-violet/20 shadow-glass space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-black text-brand-charcoal font-display">
              Request a Video Interpreter Session
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Select your parameters below to test the connection and call interface.
            </p>
          </div>

          {/* Select Sign Dialect */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider block">
              1. Sign Language Dialect
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'ISL', name: 'Indian Sign Language (ISL)' },
                { id: 'ASL', name: 'American Sign Language (ASL)' },
                { id: 'BSL', name: 'British Sign Language (BSL)' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id as 'ISL' | 'ASL' | 'BSL')}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    selectedLanguage === lang.id
                      ? 'border-brand-violet bg-brand-violet/10 text-brand-violet font-black shadow-xs ring-2 ring-brand-violet/20'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 font-bold'
                  }`}
                >
                  <div className="text-lg font-black">{lang.id}</div>
                  <div className="text-[11px] font-medium">{lang.name.split('(')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Select Situation */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider block">
              2. Situation & Domain Context
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'medical', label: '🏥 Medical / ER' },
                { id: 'banking', label: '🏦 Bank / Loans' },
                { id: 'legal', label: '⚖️ Legal / Police' },
                { id: 'academic', label: '🎓 Academic / Exam' },
              ].map((sit) => (
                <button
                  key={sit.id}
                  onClick={() => setSelectedSituation(sit.id)}
                  className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border ${
                    selectedSituation === sit.id
                      ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-xs'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {sit.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect Action */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-4 h-4 text-brand-mint-dark" />
              <span>Average institutional response: <strong>18 seconds</strong></span>
            </div>

            <button
              onClick={handleStartCall}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-coral text-white font-extrabold text-sm shadow-coral-glow hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Video className="w-5 h-5" />
              <span>Launch Simulated Video Call</span>
            </button>
          </div>
        </div>
      )}

      {/* STATE 2: SEARCHING / RADAR MATCHING */}
      {callState === 'searching' && (
        <div className="max-w-xl mx-auto p-12 rounded-3xl bg-white border border-brand-violet/20 shadow-2xl text-center space-y-6">
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-brand-violet/20 animate-ping" />
            <div className="w-20 h-20 rounded-full bg-brand-violet/10 flex items-center justify-center text-brand-violet">
              <Users className="w-10 h-10 animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-brand-charcoal font-display">
              Matching Simulated {selectedLanguage} Interpreter...
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Connecting demo WebRTC session with realistic signing visualizer.
            </p>
          </div>
        </div>
      )}

      {/* STATE 3: LIVE ACTIVE VIDEO CALL INTERFACE */}
      {callState === 'connected' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Video Stage (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-brand-charcoal border-2 border-brand-charcoal-light shadow-2xl h-[420px] sm:h-[480px] flex flex-col justify-between p-4 sm:p-6">
              {/* Top Video Status Overlay */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10 text-white text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="font-bold">Priya Sharma (Simulated ISL Relay)</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-brand-yellow font-mono">{formatDuration(callDuration)}</span>
                </div>

                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10 text-amber-300 text-xs font-semibold">
                  <Info className="w-3.5 h-3.5" />
                  <span>Interactive Demonstration</span>
                </div>
              </div>

              {/* Central Simulated Live Interpreter Stream */}
              <div className="my-auto flex flex-col items-center justify-center text-center space-y-3">
                <div className="relative">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-brand-violet to-brand-coral p-1 shadow-glass-glow flex items-center justify-center">
                    <div className="w-full h-full bg-brand-charcoal rounded-full flex items-center justify-center text-5xl">
                      👩‍💼
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-2 rounded-full bg-brand-mint text-brand-charcoal font-black text-xs">
                    ISL Demo
                  </div>
                </div>

                <div className="text-white space-y-1">
                  <div className="text-xl font-bold font-display">Priya Sharma, Interpreter Demo Avatar</div>
                  <p className="text-xs text-gray-300">
                    Signing: "I am ready to translate doctor questions or medical advice."
                  </p>
                </div>
              </div>

              {/* Bottom Live Subtitles Bar */}
              <div className="z-10 bg-black/75 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-white text-xs sm:text-sm font-medium text-center">
                <span className="text-brand-yellow font-bold mr-1.5">[Live Captions]:</span>
                "Translating between spoken English and Indian Sign Language in real-time."
              </div>

              {/* Picture-in-Picture User Camera */}
              <div className="absolute bottom-20 right-6 w-32 sm:w-40 h-24 sm:h-28 rounded-2xl overflow-hidden border-2 border-brand-violet bg-black shadow-2xl z-20">
                <video
                  ref={userVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform scale-x-[-1]"
                />
                <div className="absolute bottom-1 left-2 text-[10px] font-bold text-white bg-black/60 px-1 rounded">
                  You
                </div>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="p-4 rounded-3xl bg-white border border-brand-violet/20 shadow-sm flex items-center justify-center gap-3">
              <button
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isMicMuted
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : 'bg-gray-100 text-brand-charcoal hover:bg-gray-200 border-gray-200'
                }`}
                title={isMicMuted ? 'Unmute microphone' : 'Mute microphone'}
              >
                {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsCameraOff(!isCameraOff)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isCameraOff
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : 'bg-gray-100 text-brand-charcoal hover:bg-gray-200 border-gray-200'
                }`}
                title={isCameraOff ? 'Turn camera on' : 'Turn camera off'}
              >
                {isCameraOff ? <CameraOff className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isChatOpen
                    ? 'bg-brand-violet text-white border-brand-violet'
                    : 'bg-gray-100 text-brand-charcoal hover:bg-gray-200 border-gray-200'
                }`}
                title="Toggle text side-chat"
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              <button
                onClick={handleEndCall}
                className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm flex items-center gap-2 shadow-sm transition-all"
                title="End interpreter call"
              >
                <PhoneOff className="w-5 h-5" />
                <span>End Session</span>
              </button>
            </div>
          </div>

          {/* Side-by-Side Live Notes / Chat Drawer (4 cols) */}
          {isChatOpen && (
            <div className="lg:col-span-4 p-5 rounded-3xl bg-white border border-brand-violet/20 shadow-glass flex flex-col h-[560px]">
              <div className="flex items-center justify-between pb-3 border-b mb-3">
                <div className="font-bold text-sm text-brand-charcoal">Interpreter Text Notes</div>
                <span className="text-[10px] text-gray-400">Prescriptions & Numbers</span>
              </div>

              {/* Messages container */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                {chatMessages.map((c, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl ${
                      c.sender === 'You'
                        ? 'bg-brand-violet/10 text-brand-charcoal ml-4'
                        : 'bg-gray-100 text-brand-charcoal mr-4'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-[10px] text-gray-500 mb-1">
                      <span>{c.sender}</span>
                      <span>{c.time}</span>
                    </div>
                    <p className="leading-relaxed font-medium">{c.text}</p>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="pt-3 border-t flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="Send prescription / account number..."
                  className="flex-1 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-brand-charcoal outline-none focus:border-brand-violet"
                />
                <button
                  onClick={handleSendChat}
                  className="p-2.5 rounded-xl bg-brand-violet text-white hover:bg-brand-violet-dark transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STATE 4: CALL ENDED SUMMARY */}
      {callState === 'ended' && (
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-brand-violet/20 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-brand-charcoal font-display">
            Interpreter Demonstration Concluded
          </h3>
          <p className="text-xs text-gray-500">
            Duration: {formatDuration(callDuration)} • Demo ISL Stream
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                setCallDuration(0);
                setCallState('idle');
              }}
              className="px-6 py-3 rounded-2xl bg-brand-charcoal text-white text-xs font-bold"
            >
              Start Another Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
