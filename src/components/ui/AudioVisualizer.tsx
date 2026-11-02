import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Mic } from 'lucide-react';

interface AudioVisualizerProps {
  isActive: boolean;
  isListening?: boolean;
  label?: string;
  className?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isActive,
  isListening = false,
  label = 'Sound Level & Voice Activity',
  className = '',
}) => {
  const [levels, setLevels] = useState<number[]>([15, 25, 40, 20, 10, 30, 60, 45, 20]);

  useEffect(() => {
    if (!isActive) {
      setLevels([8, 8, 8, 8, 8, 8, 8, 8, 8]);
      return;
    }

    const interval = setInterval(() => {
      setLevels((prev) =>
        prev.map(() => {
          if (isListening) {
            return Math.floor(Math.random() * 80) + 15;
          }
          return Math.floor(Math.random() * 30) + 10;
        })
      );
    }, 120);

    return () => clearInterval(interval);
  }, [isActive, isListening]);

  const avgLevel = Math.round(levels.reduce((a, b) => a + b, 0) / levels.length);
  const isSpeechLoud = avgLevel > 45;

  return (
    <div
      className={`p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-brand-violet/15 flex items-center gap-3.5 shadow-sm ${className}`}
      aria-label="Environmental noise level visual indicator"
      role="region"
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
          isActive
            ? isSpeechLoud
              ? 'bg-brand-coral/20 text-brand-coral'
              : 'bg-brand-mint/20 text-brand-mint-dark'
            : 'bg-gray-100 text-gray-400'
        }`}
      >
        {isActive ? (
          isListening ? (
            <Mic className="w-5 h-5 animate-pulse" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between text-xs font-semibold text-brand-charcoal/80 mb-1.5">
          <span className="truncate">{label}</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
              isActive
                ? isSpeechLoud
                  ? 'bg-brand-coral text-white'
                  : 'bg-brand-mint text-brand-charcoal'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {isActive ? (isSpeechLoud ? 'Speech Active' : 'Normal / Quiet') : 'Standby'}
          </span>
        </div>

        {/* Animated frequency bar levels for visual feedback */}
        <div className="flex items-end gap-1.5 h-6 px-1">
          {levels.map((lvl, idx) => (
            <div
              key={idx}
              className="flex-1 rounded-full transition-all duration-100"
              style={{
                height: `${Math.max(lvl, 15)}%`,
                backgroundColor:
                  lvl > 60
                    ? '#FF8B70'
                    : lvl > 35
                    ? '#7956E8'
                    : '#55C9B5',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
