import React, { useState, useEffect, useRef } from 'react';
import type { AppPage, ChatMessage } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';
import { speakText, createSpeechRecognizer } from '../utils/speech';
import { AudioVisualizer } from '../components/ui/AudioVisualizer';
import { SIGN_LIBRARY_ITEMS } from '../data/signLibrary';
import { SignRecognitionModal } from '../components/camera/SignRecognitionModal';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  RotateCcw,
  Sparkles,
  Type,
  Trash2,
  Copy,
  Check,
  Video,
  X,
  Plus,
  Download,
  Camera,
} from 'lucide-react';

interface TwoWayTalkPageProps {
  initialPhrase?: string;
  onNavigate: (page: AppPage) => void;
}

export const TwoWayTalkPage: React.FC<TwoWayTalkPageProps> = ({ initialPhrase }) => {
  const {
    userMode,
    triggerScreenFlash,
    activeLanguage,
    announce,
  } = useAccessibility();

  // Chat message state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'deaf',
      text: 'Hello, I am Deaf. Please speak clearly towards my device or type here.',
      timestamp: '10:14 AM',
      signId: 'sign-hello',
    },
    {
      id: 'msg-2',
      sender: 'hearing',
      text: 'Good morning! Welcome to the counter. How can I assist you today?',
      timestamp: '10:15 AM',
      signId: 'sign-hello',
    },
  ]);

  const [inputText, setInputText] = useState(initialPhrase || '');
  const [activeSender, setActiveSender] = useState<'deaf' | 'hearing'>(userMode);
  const [isListening, setIsListening] = useState(false);
  const [localFontSize, setLocalFontSize] = useState<number>(18);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedSignPreview, setSelectedSignPreview] = useState<string | null>(null);
  const [isSignRecognitionOpen, setIsSignRecognitionOpen] = useState<boolean>(false);
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.95);
  const [exportNotice, setExportNotice] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognizerRef = useRef<ReturnType<typeof createSpeechRecognizer> | null>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Keep sender in sync if user changes global userMode
  useEffect(() => {
    setActiveSender(userMode);
  }, [userMode]);

  // Handle Speech-to-Text
  const toggleListening = () => {
    if (isListening) {
      recognizerRef.current?.stop();
      setIsListening(false);
      announce('Microphone stopped');
    } else {
      const recognizer = createSpeechRecognizer(
        (transcript, isFinal) => {
          setInputText(transcript);
          if (isFinal) {
            handleSendMessage(transcript, 'hearing');
          }
        },
        (error) => {
          console.warn('STT Error:', error);
          setIsListening(false);
        },
        (listening) => {
          setIsListening(listening);
        }
      );
      recognizerRef.current = recognizer;
      recognizer.start();
      announce('Microphone listening');
    }
  };

  const handleSendMessage = (textToSend?: string, senderOverride?: 'deaf' | 'hearing') => {
    const finalContent = (textToSend || inputText).trim();
    if (!finalContent) return;

    const sender = senderOverride || activeSender;

    // Detect if this message matches any sign library item
    const lower = finalContent.toLowerCase();
    const matchedSign = SIGN_LIBRARY_ITEMS.find((s) =>
      lower.includes(s.title.toLowerCase().split('/')[0].trim()) ||
      s.tags.some((t) => lower.includes(t))
    );

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender,
      text: finalContent,
      timestamp: timeString,
      signId: matchedSign ? matchedSign.id : undefined,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // If Deaf person sent it, automatically speak it out loud for the hearing person
    if (sender === 'deaf') {
      speakText(finalContent, activeLanguage.code === 'hi' ? 'hi-IN' : 'en-US', speechSpeed);
    } else {
      // If hearing person sent it, flash screen for Deaf person
      triggerScreenFlash();
    }

    announce(`New message from ${sender === 'deaf' ? 'Deaf user' : 'Hearing staff'}: ${finalContent}`);
  };

  const handleSpeakMessage = (msg: ChatMessage) => {
    speakText(
      msg.text,
      activeLanguage.code === 'hi' ? 'hi-IN' : 'en-US',
      speechSpeed,
      () => {},
      () => {}
    );
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export conversation history as text file
  const handleExportHistory = () => {
    const textContent = messages
      .map((m) => `[${m.timestamp}] ${m.sender === 'deaf' ? 'Deaf Communicator' : 'Hearing Staff'}: ${m.text}`)
      .join('\n\n');
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `signbridge-conversation-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setExportNotice(true);
    announce('Conversation transcript downloaded');
    setTimeout(() => setExportNotice(false), 2500);
  };

  const quickChips = [
    'Yes, I understand.',
    'Please write it down on screen.',
    'Where is the counter?',
    'Please speak a bit slower.',
    'I need a qualified sign interpreter.',
    'Thank you for your assistance!',
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header & Conversation Controls */}
      <div className="p-5 rounded-3xl bg-white border border-brand-violet/20 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-mint-dark animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-brand-charcoal font-display">
              Two-Way Talk Interface
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-brand-violet/10 text-brand-violet font-bold text-xs">
              Live Speech & Sign Bridge
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Back-and-forth dialogue between Deaf and hearing conversationalists with text-to-speech and sign suggestions.
          </p>
        </div>

        {/* Text-size Controls, AI Sign Camera, and Actions */}
        <div className="flex items-center flex-wrap gap-2">
          {/* AI Sign Camera Button */}
          <button
            onClick={() => setIsSignRecognitionOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-brand-violet/10 hover:bg-brand-violet hover:text-white text-brand-violet text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Open camera sign recognition lab"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>AI Sign Cam (Demo)</span>
          </button>

          {/* In-app Text Size Adjuster */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
            <Type className="w-3.5 h-3.5 text-gray-500 ml-1.5" />
            <button
              onClick={() => setLocalFontSize((f) => Math.max(14, f - 2))}
              className="px-2 py-1 rounded-lg hover:bg-white text-brand-charcoal"
              title="Decrease chat text size"
            >
              A-
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => setLocalFontSize((f) => Math.min(28, f + 2))}
              className="px-2 py-1 rounded-lg hover:bg-white text-brand-charcoal font-bold"
              title="Increase chat text size"
            >
              A+
            </button>
          </div>

          {/* Speech Speed selector */}
          <div className="hidden sm:flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-xl text-xs font-semibold text-gray-700">
            <span>TTS:</span>
            <select
              value={speechSpeed}
              onChange={(e) => setSpeechSpeed(Number(e.target.value))}
              className="bg-transparent border-none text-xs font-bold cursor-pointer outline-none"
            >
              <option value={0.8}>0.8x Slow</option>
              <option value={0.95}>1.0x Normal</option>
              <option value={1.2}>1.2x Fast</option>
            </select>
          </div>

          {/* Export Transcript */}
          <button
            onClick={handleExportHistory}
            className="p-2 rounded-xl text-gray-500 hover:text-brand-charcoal hover:bg-gray-100 transition-colors"
            title="Download conversation history (.txt)"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Clear Chat */}
          <button
            onClick={() => setMessages([])}
            className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Clear all messages"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center justify-between">
          <span>Conversation transcript exported as text file.</span>
          <Check className="w-4 h-4 text-emerald-600" />
        </div>
      )}

      {/* Audio Visualizer Bar */}
      <AudioVisualizer
        isActive={true}
        isListening={isListening}
        label={
          isListening
            ? '🎙️ Staff Speaking... Live speech-to-text active'
            : 'Environmental Sound Level Indicator'
        }
      />

      {/* CONVERSATION MESSAGE STREAM */}
      <div className="min-h-[420px] max-h-[550px] overflow-y-auto p-4 sm:p-6 rounded-3xl bg-white border border-brand-violet/20 shadow-glass space-y-4">
        {messages.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center text-gray-400 space-y-2">
            <Sparkles className="w-8 h-8 text-brand-violet opacity-40 animate-bounce" />
            <p className="text-sm font-semibold text-gray-600">Conversation transcript is empty.</p>
            <p className="text-xs">Type a message or press the microphone to begin talking.</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isDeaf = msg.sender === 'deaf';
            const matchedSign = msg.signId
              ? SIGN_LIBRARY_ITEMS.find((s) => s.id === msg.signId)
              : null;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isDeaf ? 'items-start' : 'items-end'}`}
              >
                {/* Sender Tag */}
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isDeaf
                        ? 'bg-brand-violet/15 text-brand-violet'
                        : 'bg-brand-coral/15 text-brand-coral'
                    }`}
                  >
                    {isDeaf ? '🤟 Deaf Communicator' : '🎙️ Hearing Staff'}
                  </span>
                  <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                </div>

                {/* Bubble Container */}
                <div
                  className={`max-w-xl sm:max-w-2xl p-4 sm:p-5 rounded-3xl shadow-sm border transition-all ${
                    isDeaf
                      ? 'bg-gradient-to-br from-purple-50/80 to-white border-brand-violet/25 text-brand-charcoal rounded-tl-sm'
                      : 'bg-gradient-to-br from-rose-50/80 to-amber-50/50 border-brand-coral/25 text-brand-charcoal rounded-tr-sm'
                  }`}
                >
                  <p
                    className="leading-relaxed font-medium break-words"
                    style={{ fontSize: `${localFontSize}px` }}
                  >
                    {msg.text}
                  </p>

                  {/* Message Action Strip */}
                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {/* Speak Out Loud button */}
                      <button
                        onClick={() => handleSpeakMessage(msg)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 text-xs font-semibold text-brand-charcoal flex items-center gap-1.5 transition-colors"
                        title="Speak this message aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-brand-violet" />
                        <span>Speak</span>
                      </button>

                      {/* Replay flash */}
                      <button
                        onClick={() => triggerScreenFlash()}
                        className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-brand-coral transition-colors"
                        title="Flash screen alert"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      {/* Copy message */}
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-brand-charcoal transition-colors"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-brand-mint-dark" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Matched Sign Language gesture tag */}
                    {matchedSign && (
                      <button
                        onClick={() => setSelectedSignPreview(matchedSign.id)}
                        className="px-3 py-1 rounded-xl bg-brand-violet text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-brand-violet-dark transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>View Sign: {matchedSign.title.split('/')[0]}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* QUICK RESPONSE PHRASE CHIPS */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
          Quick Responses (1-Tap Send):
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-brand-violet hover:text-white border border-brand-violet/20 text-xs font-semibold text-brand-charcoal transition-all shadow-2xs"
            >
              <Plus className="w-3 h-3 inline mr-1 opacity-60" />
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* INPUT AREA */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-brand-violet/30 shadow-card-hover space-y-3">
        {/* Active Sender Selection Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">Sending as:</span>
            <div className="p-1 bg-gray-100 rounded-xl flex items-center gap-1 text-xs font-bold">
              <button
                onClick={() => setActiveSender('deaf')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeSender === 'deaf'
                    ? 'bg-brand-violet text-white shadow-xs'
                    : 'text-gray-600'
                }`}
              >
                🤟 Deaf User
              </button>
              <button
                onClick={() => setActiveSender('hearing')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeSender === 'hearing'
                    ? 'bg-brand-coral text-white shadow-xs'
                    : 'text-gray-600'
                }`}
              >
                🎙️ Hearing Staff
              </button>
            </div>
          </div>

          <span className="text-xs text-gray-400">Press Enter or Send</span>
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Speech-To-Text Microphone button */}
          <button
            onClick={toggleListening}
            className={`p-3.5 sm:p-4 rounded-2xl transition-all shadow-sm flex items-center justify-center shrink-0 ${
              isListening
                ? 'bg-brand-coral text-white animate-pulse ring-4 ring-brand-coral/20'
                : 'bg-brand-warmWhite hover:bg-gray-100 text-brand-charcoal border border-gray-200'
            }`}
            title={isListening ? 'Stop listening' : 'Start speech-to-text recognition'}
            aria-label="Toggle speech to text"
          >
            {isListening ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5" />}
          </button>

          {/* Large Text Area / Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              activeSender === 'deaf'
                ? 'Type your message here (will be spoken aloud for hearing staff)...'
                : 'Hearing staff: Type here or click mic to speak...'
            }
            className="flex-1 px-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm sm:text-base text-brand-charcoal outline-none focus:border-brand-violet focus:bg-white transition-all"
          />

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-coral text-white font-bold text-sm shadow-coral-glow hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-40 disabled:pointer-events-none shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>

      {/* POPUP PREVIEW MODAL FOR SIGN GESTURE */}
      {selectedSignPreview && (() => {
        const sign = SIGN_LIBRARY_ITEMS.find((s) => s.id === selectedSignPreview);
        if (!sign) return null;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-lg rounded-3xl bg-white border border-brand-violet/20 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-brand-violet/15 text-brand-violet flex items-center justify-center">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-brand-charcoal">{sign.title}</h3>
                    <span className="text-xs text-brand-violet font-semibold">{sign.language} Standard Gesture</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSignPreview(null)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Animated Gesture Visualization Screen */}
              <div className="relative h-56 rounded-2xl bg-gradient-to-tr from-brand-violet/10 via-brand-coral/10 to-brand-yellow/15 border border-brand-violet/20 flex flex-col items-center justify-center overflow-hidden p-4">
                <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center text-4xl mb-2 animate-bounce">
                  🤟
                </div>
                <div className="text-sm font-bold text-brand-charcoal">{sign.title}</div>
                <div className="text-xs text-gray-600 text-center max-w-xs mt-1">
                  {sign.description}
                </div>
              </div>

              {/* Step-by-Step Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-gray-50 border">
                  <strong>Handshape:</strong> {sign.handshape}
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border">
                  <strong>Movement:</strong> {sign.movement}
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border">
                  <strong>Facial Expression:</strong> {sign.expression}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedSignPreview(null)}
                  className="px-5 py-2.5 rounded-xl bg-brand-charcoal text-white font-bold text-xs"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* AI SIGN RECOGNITION CAMERA MODAL */}
      <SignRecognitionModal
        isOpen={isSignRecognitionOpen}
        onClose={() => setIsSignRecognitionOpen(false)}
        onSelectRecognizedSign={(phrase) => {
          setInputText(phrase);
          announce(`Imported recognized sign phrase: ${phrase}`);
        }}
      />
    </div>
  );
};
