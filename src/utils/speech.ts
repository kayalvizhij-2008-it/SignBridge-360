// Web Speech API Utilities with graceful fallbacks

export const isTtsSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

// Check for SpeechRecognition or webkitSpeechRecognition
export const isSttSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
  );
};

export const speakText = (
  text: string,
  lang: string = 'en-US',
  rate: number = 0.95,
  onStart?: () => void,
  onEnd?: () => void
): void => {
  if (!isTtsSupported()) {
    console.warn('Text-to-speech is not supported in this browser.');
    if (onStart) onStart();
    setTimeout(() => {
      if (onEnd) onEnd();
    }, 1000);
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate; // Slightly slower for enhanced clarity
  utterance.pitch = 1.0;

  // Attempt to select an expressive voice
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    const matchedVoice = voices.find((v) => v.lang.startsWith(lang.slice(0, 2)));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = (): void => {
  if (isTtsSupported()) {
    window.speechSynthesis.cancel();
  }
};

export interface SpeechRecognizerWrapper {
  start: () => void;
  stop: () => void;
  isListening: boolean;
}

export const createSpeechRecognizer = (
  onTranscript: (text: string, isFinal: boolean) => void,
  onError?: (err: string) => void,
  onStateChange?: (listening: boolean) => void
): SpeechRecognizerWrapper => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognitionClass) {
    let simulated = false;
    return {
      start: () => {
        if (onStateChange) onStateChange(true);
        simulated = true;
        // Simulated fallback transcript
        const samplePhrases = [
          "Hello, please how can I help you today?",
          "Your token number is 104 at counter 3.",
          "Please show me your identity card.",
          "The doctor will examine you in five minutes."
        ];
        const randomPhrase = samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
        setTimeout(() => {
          if (simulated) {
            onTranscript(randomPhrase, true);
            if (onStateChange) onStateChange(false);
          }
        }, 2500);
      },
      stop: () => {
        simulated = false;
        if (onStateChange) onStateChange(false);
      },
      isListening: false,
    };
  }

  const recognition = new SpeechRecognitionClass();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  let listening = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onresult = (event: any) => {
    let interim = '';
    let final = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final += event.results[i][0].transcript;
      } else {
        interim += event.results[i][0].transcript;
      }
    }

    if (final) {
      onTranscript(final.trim(), true);
    } else if (interim) {
      onTranscript(interim.trim(), false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onerror = (event: any) => {
    listening = false;
    if (onStateChange) onStateChange(false);
    if (onError) onError(event.error || 'Speech recognition error');
  };

  recognition.onend = () => {
    listening = false;
    if (onStateChange) onStateChange(false);
  };

  return {
    start: () => {
      try {
        recognition.start();
        listening = true;
        if (onStateChange) onStateChange(true);
      } catch (e) {
        console.warn('SpeechRecognition start failed or already active:', e);
      }
    },
    stop: () => {
      try {
        recognition.stop();
        listening = false;
        if (onStateChange) onStateChange(false);
      } catch (e) {
        console.warn('SpeechRecognition stop failed:', e);
      }
    },
    get isListening() {
      return listening;
    },
  };
};
