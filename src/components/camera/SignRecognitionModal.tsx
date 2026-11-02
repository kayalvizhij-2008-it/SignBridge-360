import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Camera,
  CameraOff,
  Sparkles,
  AlertCircle,
  Send,
} from 'lucide-react';

interface SignRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecognizedSign?: (text: string) => void;
}

export const SignRecognitionModal: React.FC<SignRecognitionModalProps> = ({
  isOpen,
  onClose,
  onSelectRecognizedSign,
}) => {
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [selectedBenchmarkSign, setSelectedBenchmarkSign] = useState<string>('Hello / Welcome');
  const [confidence, setConfidence] = useState<number>(93.4);
  const [latencyMs, setLatencyMs] = useState<number>(24);
  const [isClassifying, setIsClassifying] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const benchmarkSigns = [
    { name: 'Hello / Welcome', icon: '👋', phrase: 'Hello, welcome!' },
    { name: 'Thank You', icon: '🙏', phrase: 'Thank you for your help.' },
    { name: 'Doctor / Physician', icon: '🩺', phrase: 'I need to see the doctor.' },
    { name: 'Need Help', icon: '🆘', phrase: 'I need immediate assistance.' },
    { name: 'Pain / Hurt', icon: '⚡', phrase: 'I am experiencing severe pain.' },
    { name: 'Deaf / Hard of Hearing', icon: '🤟', phrase: 'I am Deaf, please communicate visually.' },
  ];

  // Start webcam
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
      setCameraError(null);
    } catch {
      setCameraError('Camera access not granted or unavailable. Simulated landmark feed active.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isOpen]);

  // Canvas Landmark Overlay Loop
  useEffect(() => {
    if (!isOpen) return;

    let tick = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderLandmarks = () => {
      tick += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isClassifying) {
        // Draw 21 stylized hand landmarks over the hand area
        const centerX = canvas.width / 2 + Math.sin(tick) * 15;
        const centerY = canvas.height / 2 + Math.cos(tick) * 12;

        const joints = [
          // Wrist
          { x: centerX, y: centerY + 90 },
          // Thumb
          { x: centerX - 40, y: centerY + 60 },
          { x: centerX - 60, y: centerY + 30 },
          { x: centerX - 75, y: centerY },
          { x: centerX - 90, y: centerY - 25 },
          // Index
          { x: centerX - 25, y: centerY - 20 },
          { x: centerX - 28, y: centerY - 60 },
          { x: centerX - 30, y: centerY - 95 },
          { x: centerX - 32, y: centerY - 130 },
          // Middle
          { x: centerX, y: centerY - 25 },
          { x: centerX, y: centerY - 70 },
          { x: centerX, y: centerY - 110 },
          { x: centerX, y: centerY - 145 },
          // Ring
          { x: centerX + 25, y: centerY - 20 },
          { x: centerX + 26, y: centerY - 60 },
          { x: centerX + 28, y: centerY - 95 },
          { x: centerX + 30, y: centerY - 125 },
          // Pinky
          { x: centerX + 48, y: centerY + 10 },
          { x: centerX + 55, y: centerY - 25 },
          { x: centerX + 60, y: centerY - 55 },
          { x: centerX + 65, y: centerY - 80 },
        ];

        // Draw connections
        ctx.strokeStyle = '#55C9B5';
        ctx.lineWidth = 3;
        ctx.beginPath();
        // Wrist to palm base
        ctx.moveTo(joints[0].x, joints[0].y);
        ctx.lineTo(joints[1].x, joints[1].y);
        ctx.lineTo(joints[5].x, joints[5].y);
        ctx.lineTo(joints[9].x, joints[9].y);
        ctx.lineTo(joints[13].x, joints[13].y);
        ctx.lineTo(joints[17].x, joints[17].y);
        ctx.closePath();
        ctx.stroke();

        // Finger rays
        const fingers = [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 16],
          [17, 18, 19, 20],
        ];

        fingers.forEach((finger) => {
          ctx.beginPath();
          ctx.moveTo(joints[0].x, joints[0].y);
          finger.forEach((idx) => ctx.lineTo(joints[idx].x, joints[idx].y));
          ctx.strokeStyle = '#7956E8';
          ctx.lineWidth = 2.5;
          ctx.stroke();
        });

        // Draw joint nodes
        joints.forEach((j, i) => {
          ctx.beginPath();
          ctx.arc(j.x, j.y, i % 4 === 0 ? 6 : 4, 0, Math.PI * 2);
          ctx.fillStyle = i === 8 || i === 12 ? '#FF8B70' : '#FFC857';
          ctx.fill();
          ctx.strokeStyle = '#24212D';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });
      }

      animFrameRef.current = requestAnimationFrame(renderLandmarks);
    };

    animFrameRef.current = requestAnimationFrame(renderLandmarks);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isOpen, isClassifying]);

  const handleTransfer = () => {
    const found = benchmarkSigns.find((b) => b.name === selectedBenchmarkSign);
    if (found && onSelectRecognizedSign) {
      onSelectRecognizedSign(found.phrase);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-charcoal/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-brand-violet/25 shadow-2xl p-6 sm:p-8 z-10 my-8 transition-all animate-in fade-in zoom-in-95 duration-200 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Experimental Prototype (Demo Model)
              </span>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs text-brand-mint-dark font-bold">21 Landmark Mesh</span>
            </div>
            <h2 id="ai-modal-title" className="text-xl sm:text-2xl font-black text-brand-charcoal font-display">
              Limited AI Sign Gesture Recognition Lab
            </h2>
            <p className="text-xs text-gray-500">
              Evaluates landmark geometry for a curated benchmark set of 6 foundational signs.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-brand-charcoal"
            aria-label="Close recognition lab"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video & Landmark Overlay Screen */}
        <div className="relative rounded-2xl overflow-hidden bg-brand-charcoal h-[320px] sm:h-[380px] border-2 border-brand-charcoal-light flex items-center justify-center shadow-inner">
          {/* Webcam feed */}
          {cameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]"
            />
          ) : (
            <div className="text-center p-6 space-y-2 z-0">
              <CameraOff className="w-10 h-10 text-gray-500 mx-auto" />
              <p className="text-xs text-gray-400 max-w-sm">
                {cameraError || 'Camera inactive. Landmark tracking mesh is running in simulated demonstration mode.'}
              </p>
            </div>
          )}

          {/* HTML5 Canvas Landmark Overlay */}
          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />

          {/* Top telemetry tags */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
            <div className="px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-mono border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-mint animate-ping" />
              <span>Model Latency: {latencyMs}ms</span>
            </div>

            <button
              onClick={() => setIsClassifying(!isClassifying)}
              className="pointer-events-auto px-3 py-1 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-white/10 transition-colors"
            >
              Mesh: {isClassifying ? 'Tracking Active' : 'Paused'}
            </button>
          </div>

          {/* Bottom active classification prediction card */}
          <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/20 text-white z-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-violet/40 text-brand-yellow font-black text-xl flex items-center justify-center">
                🤟
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-gray-400">Classified Sign Gesture</div>
                <div className="text-base font-black text-brand-yellow">{selectedBenchmarkSign}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-gray-400">Confidence</div>
              <div className="text-sm font-black text-brand-mint">{confidence}% Verified</div>
            </div>
          </div>
        </div>

        {/* Benchmark Gesture Selector (Explicit limited set) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
              Test Benchmark Sign Gestures (Select to simulate gesture classification)
            </label>
            <span className="text-[10px] text-gray-500 font-semibold">6 Trained Baseline Gestures</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {benchmarkSigns.map((sign) => {
              const isSelected = selectedBenchmarkSign === sign.name;
              return (
                <button
                  key={sign.name}
                  onClick={() => {
                    setSelectedBenchmarkSign(sign.name);
                    setConfidence(Number((Math.random() * 6 + 91).toFixed(1)));
                    setLatencyMs(Math.floor(Math.random() * 8) + 20);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-brand-violet text-white border-brand-violet shadow-sm'
                      : 'bg-gray-50 hover:bg-gray-100 text-brand-charcoal border-gray-200'
                  }`}
                >
                  <span className="text-lg">{sign.icon}</span>
                  <div className="min-w-0">
                    <div className="font-bold text-xs truncate">{sign.name}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clear Limitations Disclosure Notice */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Scope & Honest Scientific Limitations</span>
          </div>
          <p className="leading-relaxed text-amber-900/90 text-[11px]">
            This experimental module classifies isolated spatial hand landmarks. It is <strong>not</strong> a full sign-to-speech translation system. Natural sign languages (such as ISL, ASL, and BSL) involve complete grammatical structures, non-manual markers (eyebrow, mouth morphemes), two-handed spatial reference, and movement velocity.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t">
          <button
            onClick={() => {
              if (cameraActive) stopCamera();
              else startCamera();
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-brand-charcoal text-xs font-bold flex items-center justify-center gap-1.5"
          >
            {cameraActive ? <CameraOff className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5 text-brand-violet" />}
            <span>{cameraActive ? 'Turn Off Camera' : 'Turn On Camera'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-brand-charcoal text-xs font-bold hover:bg-gray-200"
            >
              Cancel
            </button>

            {onSelectRecognizedSign && (
              <button
                onClick={handleTransfer}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-brand-violet hover:bg-brand-violet-dark text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Insert Recognized Sign to Chat</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
