import React from 'react';
import {
  RotateCcw,
  Users,
  AlertCircle,
  FolderOpen,
} from 'lucide-react';

interface LoadingSkeletonProps {
  label?: string;
  lines?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  label = 'Loading communication interface...',
  lines = 3,
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="p-8 rounded-3xl bg-white border border-brand-violet/15 shadow-sm space-y-4 max-w-xl mx-auto my-8 animate-pulse"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gray-200" />
        <div className="space-y-1.5 flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>

      <div className="space-y-2 pt-2">
        {Array.from({ length: lines }).map((_, idx) => (
          <div
            key={idx}
            className="h-3 bg-gray-200 rounded"
            style={{ width: `${100 - idx * 15}%` }}
          />
        ))}
      </div>

      <p className="text-xs text-gray-500 font-semibold pt-2 text-center">
        {label}
      </p>
    </div>
  );
};

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div
      role="region"
      aria-label={title}
      className="p-10 rounded-3xl bg-white/80 border border-brand-violet/20 shadow-sm text-center max-w-md mx-auto my-8 space-y-4"
    >
      <div className="w-16 h-16 rounded-3xl bg-brand-violet/10 flex items-center justify-center text-brand-violet mx-auto shadow-sm">
        {icon || <FolderOpen className="w-8 h-8" />}
      </div>

      <div>
        <h3 className="text-lg font-black text-brand-charcoal font-display">{title}</h3>
        <p className="text-xs text-gray-600 mt-1 leading-relaxed max-w-sm mx-auto">{description}</p>
      </div>

      {actionLabel && onAction && (
        <div className="pt-2">
          <button
            onClick={onAction}
            className="px-6 py-3 rounded-2xl bg-brand-violet text-white text-xs font-bold hover:bg-brand-violet/90 transition-all shadow-sm"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
};

interface ErrorStateProps {
  errorMessage: string;
  onRetry?: () => void;
  onRequestInterpreter?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  errorMessage,
  onRetry,
  onRequestInterpreter,
}) => {
  return (
    <div
      role="alert"
      className="p-8 rounded-3xl bg-red-50/90 border border-red-200 shadow-sm text-center max-w-lg mx-auto my-8 space-y-5"
    >
      <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 mx-auto">
        <AlertCircle className="w-7 h-7" />
      </div>

      <div>
        <h3 className="text-base font-black text-red-950">We encountered a communication problem</h3>
        <p className="text-xs text-red-800/90 mt-1.5 leading-relaxed max-w-md mx-auto">
          {errorMessage}
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-red-300 text-red-900 text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        )}

        {onRequestInterpreter && (
          <button
            onClick={onRequestInterpreter}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-violet text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-brand-violet/90 transition-colors shadow-sm"
          >
            <Users className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Ask for a Human Interpreter</span>
          </button>
        )}
      </div>
    </div>
  );
};
