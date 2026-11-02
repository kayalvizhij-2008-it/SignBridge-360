import React from 'react';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.08em',
      shimmerDuration = '2.5s',
      borderRadius = '100px',
      background = 'linear-gradient(135deg, #7956E8 0%, #FF8B70 100%)',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            '--spread': '90deg',
            '--shimmer-color': shimmerColor,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            '--cut': shimmerSize,
            '--bg': background,
          } as React.CSSProperties
        }
        className={`group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/20 px-6 py-3 text-white font-medium shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${className}`}
        ref={ref}
        {...props}
      >
        {/* Shimmer sparkle */}
        <div className="absolute inset-0 -z-10 overflow-hidden [border-radius:var(--radius)]">
          <div className="absolute inset-0 h-full w-full bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] bg-[length:200%_100%] animate-shimmer" />
        </div>

        {/* Backdrop color */}
        <div
          className="absolute inset-0 -z-20 [background:var(--bg)] [border-radius:var(--radius)]"
        />

        {children}
      </button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';
