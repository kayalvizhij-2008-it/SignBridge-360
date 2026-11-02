import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  WifiOff,
  X,
} from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useAccessibility();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="assertive"
      aria-label="Soundless visual notifications"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const icon =
          toast.type === 'alert' ? (
            <AlertTriangle className="w-5 h-5 text-alert-600 shrink-0" />
          ) : toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : toast.type === 'offline' ? (
            <WifiOff className="w-5 h-5 text-amber-600 shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-brand-violet shrink-0" />
          );

        const borderColor =
          toast.type === 'alert'
            ? 'border-alert-600/40 bg-red-50/95 text-red-950'
            : toast.type === 'success'
            ? 'border-emerald-500/40 bg-emerald-50/95 text-emerald-950'
            : toast.type === 'offline'
            ? 'border-amber-500/40 bg-amber-50/95 text-amber-950'
            : 'border-brand-violet/40 bg-white/95 text-brand-charcoal';

        return (
          <div
            key={toast.id}
            role="alert"
            className={`pointer-events-auto p-4 rounded-2xl border shadow-xl backdrop-blur-md flex items-start justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200 ${borderColor}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{icon}</div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider">{toast.title}</h4>
                <p className="text-xs text-gray-700 mt-0.5 leading-relaxed">{toast.message}</p>
              </div>
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-700 transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
