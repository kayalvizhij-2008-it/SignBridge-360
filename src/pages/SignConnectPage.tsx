import React, { useState, useRef, useEffect } from 'react';
import type { SignLibraryItem } from '../types';
import { SIGN_LIBRARY_ITEMS } from '../data/signLibrary';
import { useAccessibility } from '../context/AccessibilityContext';
import {
  Search,
  Play,
  Heart,
  Camera,
  CameraOff,
  Sparkles,
} from 'lucide-react';
import { SignRecognitionModal } from '../components/camera/SignRecognitionModal';

export const SignConnectPage: React.FC = () => {
  const { signDialect, setSignDialect, announce } = useAccessibility();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [items, setItems] = useState<SignLibraryItem[]>(SIGN_LIBRARY_ITEMS);
  const [activeSign, setActiveSign] = useState<SignLibraryItem>(SIGN_LIBRARY_ITEMS[0]);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [mirrorActive, setMirrorActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isAiCamOpen, setIsAiCamOpen] = useState<boolean>(false);

  const webcamRef = useRef<HTMLVideoElement>(null);
  const webcamStreamRef = useRef<MediaStream | null>(null);

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle Favorite
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
    announce('Favorite updated');
  };

  // Toggle Webcam Mirror Mode
  const toggleMirrorMode = async () => {
    if (mirrorActive) {
      if (webcamStreamRef.current) {
        webcamStreamRef.current.getTracks().forEach((track) => track.stop());
        webcamStreamRef.current = null;
      }
      setMirrorActive(false);
      setCameraError(null);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: 'user' },
        });
        webcamStreamRef.current = stream;
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }
        setMirrorActive(true);
        setCameraError(null);
        announce('Webcam practice mirror activated');
      } catch (err) {
        console.warn('Webcam permission error:', err);
        setCameraError('Camera access not available or permitted.');
      }
    }
  };

  useEffect(() => {
    return () => {
      if (webcamStreamRef.current) {
        webcamStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const categories = [
    { id: 'all', label: 'All Signs' },
    { id: 'everyday', label: 'Everyday' },
    { id: 'hospital', label: 'Hospital' },
    { id: 'emergency', label: 'Emergency' },
    { id: 'travel', label: 'Travel & Rail' },
    { id: 'education', label: 'Education' },
    { id: 'banking', label: 'Banking' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-coral/15 via-brand-yellow/10 to-brand-violet/15 border border-brand-coral/25 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-brand-coral shadow-sm mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Interactive 3D Sign Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-charcoal font-display">
            SignConnect Visual Library
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
            Explore authentic, validated sign demonstrations across ISL, ASL, and BSL.
            Study handshapes, motion trajectories, and practice alongside with real-time camera mirroring.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsAiCamOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-brand-violet text-white text-xs font-bold flex items-center gap-2 hover:bg-brand-violet/90 transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-brand-yellow" />
            <span>Launch AI Sign Cam (Demo)</span>
          </button>

          {/* Dialect Selector */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-brand-coral/20 shadow-sm">
            <span className="text-xs font-bold text-gray-500 pl-1">Dialect:</span>
            {(['ISL', 'ASL', 'BSL'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setSignDialect(d)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  signDialect === d
                    ? 'bg-brand-coral text-white shadow-sm'
                    : 'text-gray-600 hover:text-brand-charcoal'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Left Video & Breakdown, Right Searchable Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Video Player & Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-brand-violet/20 shadow-card-hover space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-brand-violet tracking-wider">
                  {activeSign.category} • {activeSign.language} Standard
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-charcoal font-display">
                  {activeSign.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleToggleFavorite(activeSign.id, e)}
                  className={`p-2.5 rounded-2xl border transition-all ${
                    activeSign.isFavorite
                      ? 'bg-red-50 text-red-500 border-red-200'
                      : 'bg-gray-50 text-gray-400 border-gray-200 hover:text-red-500'
                  }`}
                  title="Bookmark this sign"
                >
                  <Heart className={`w-5 h-5 ${activeSign.isFavorite ? 'fill-red-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Gesture Visualizer Display with Webcam Mirror Toggle */}
            <div className="relative rounded-2xl overflow-hidden bg-brand-charcoal min-h-[340px] sm:min-h-[380px] flex items-center justify-center border border-brand-charcoal-light shadow-inner">
              {/* Reference Animated Gesture Canvas */}
              <div
                className={`w-full h-full flex flex-col items-center justify-center p-8 transition-all ${
                  mirrorActive ? 'opacity-85 scale-90' : 'opacity-100'
                }`}
              >
                {/* 3D Stylized Sign Representation */}
                <div className="relative mb-4">
                  <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-brand-violet via-brand-coral to-brand-yellow p-1 shadow-glass-glow flex items-center justify-center">
                    <div className="w-full h-full bg-brand-charcoal rounded-[20px] flex items-center justify-center text-5xl">
                      🤟
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-brand-mint text-brand-charcoal text-[11px] font-bold">
                    {playbackSpeed}x Speed
                  </div>
                </div>

                <div className="text-center max-w-sm space-y-1">
                  <div className="text-lg font-bold text-white font-display">
                    Sign: {activeSign.title}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {activeSign.description}
                  </p>
                </div>
              </div>

              {/* Picture-in-Picture Webcam Mirror Mode */}
              {mirrorActive && (
                <div className="absolute bottom-4 right-4 w-44 sm:w-52 h-32 sm:h-36 rounded-2xl overflow-hidden border-2 border-brand-yellow shadow-2xl bg-black">
                  <video
                    ref={webcamRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform scale-x-[-1]"
                  />
                  <div className="absolute bottom-1 left-2 text-[10px] font-bold text-brand-yellow bg-black/60 px-1.5 py-0.5 rounded">
                    Your Hands (Mirror)
                  </div>
                </div>
              )}

              {/* Sample Demonstration watermark */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-black/50 backdrop-blur-md text-[10px] text-gray-300 font-semibold border border-white/10">
                Sample Demonstrator • {signDialect} Validated
              </div>
            </div>

            {/* Video Controls Bar: Slow-mo, Replay, Mirror Mode */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              {/* Playback speed controls */}
              <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-2xl text-xs font-bold text-brand-charcoal">
                <span className="text-gray-500 px-1">Speed:</span>
                {[0.5, 0.75, 1.0].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2.5 py-1 rounded-xl transition-all ${
                      playbackSpeed === spd
                        ? 'bg-brand-charcoal text-white shadow-xs'
                        : 'text-gray-600 hover:text-brand-charcoal'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {/* Practice Webcam Mirror Mode Button */}
              <button
                onClick={toggleMirrorMode}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                  mirrorActive
                    ? 'bg-brand-yellow text-brand-charcoal shadow-sm'
                    : 'bg-brand-warmWhite hover:bg-gray-100 text-brand-charcoal border border-gray-200'
                }`}
              >
                {mirrorActive ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4 text-brand-violet" />}
                <span>{mirrorActive ? 'Hide Camera Mirror' : 'Practice Mirror Mode'}</span>
              </button>
            </div>

            {cameraError && (
              <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                {cameraError}
              </div>
            )}

            {/* Step-by-Step Gesture Anatomy Breakdown */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-500">
                Linguistic Gesture Breakdown
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-1">
                  <div className="text-[11px] font-bold text-brand-violet uppercase">1. Handshape</div>
                  <div className="text-xs text-brand-charcoal font-medium">{activeSign.handshape}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-1">
                  <div className="text-[11px] font-bold text-brand-coral uppercase">2. Movement</div>
                  <div className="text-xs text-brand-charcoal font-medium">{activeSign.movement}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                  <div className="text-[11px] font-bold text-brand-mint-dark uppercase">3. Expression</div>
                  <div className="text-xs text-brand-charcoal font-medium">{activeSign.expression}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Searchable Library Directory (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search signs by name or keyword..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-brand-violet/20 text-sm text-brand-charcoal outline-none focus:border-brand-violet shadow-sm"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-charcoal text-white shadow-xs'
                    : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sign Cards List */}
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-gray-400 bg-white rounded-2xl border">
                No sign gestures match your search.
              </div>
            ) : (
              filteredItems.map((sign) => {
                const isSelected = activeSign.id === sign.id;
                return (
                  <div
                    key={sign.id}
                    onClick={() => {
                      setActiveSign(sign);
                      announce(`Selected sign: ${sign.title}`);
                    }}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-50 to-white border-brand-violet shadow-sm ring-2 ring-brand-violet/20'
                        : 'bg-white hover:bg-gray-50 border-gray-200/80'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-brand-charcoal truncate">
                          {sign.title}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[10px] font-bold">
                          {sign.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {sign.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => handleToggleFavorite(sign.id, e)}
                        className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${sign.isFavorite ? 'text-red-500 fill-red-500' : ''}`}
                        />
                      </button>
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                          isSelected
                            ? 'bg-brand-violet text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* AI Sign Cam Modal */}
      <SignRecognitionModal
        isOpen={isAiCamOpen}
        onClose={() => setIsAiCamOpen(false)}
        onSelectRecognizedSign={(text) => {
          const matched = items.find(
            (item) =>
              text.toLowerCase().includes(item.title.toLowerCase()) ||
              item.title.toLowerCase().includes(text.toLowerCase())
          );
          if (matched) {
            setActiveSign(matched);
          }
          setIsAiCamOpen(false);
          announce(`Selected recognized sign phrase: ${text}`);
        }}
      />
    </div>
  );
};
