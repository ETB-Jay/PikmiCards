// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { memo } from 'react';

import { FlexColCenter } from '../components/containers';
import { cn } from '../context/functions';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const LOADING_TEXT = 'Loading';

// Progress prop for loading animation

interface LoadingAnimationProps {
  progress?: number;
}

/**
 * @description LoadingAnimation renders a spaceship loading indicator with optional progress.
 */
const LoadingAnimation = memo(({ progress }: LoadingAnimationProps): React.ReactElement => (
  <FlexColCenter className={cn("w-full h-full gap-4")}>
    <div className={cn("animate-float-spin")}>
      <div className={cn("relative flex flex-row items-center justify-center animate-fly-horizontal")}>
        <div className={cn("spaceship-fire spaceship-fire-horizontal")} />
        <img
          src="/spaceship.png"
          alt={LOADING_TEXT}
          className={cn("relative z-10 w-auto h-20 drop-shadow-xl")}
          draggable={false}
        />
      </div>
    </div>
    <span className={cn("text-xl font-bold tracking-wide text-white drop-shadow-sm")}>
      {LOADING_TEXT}
      <span className={cn("loading-dots")} />
    </span>
    {typeof progress === 'number' && (
      <div className={cn("w-64 max-w-full flex flex-col items-center mt-2")}>
        <div className={cn("w-full h-3 bg-gray-700 rounded-full overflow-hidden")}>
          {/* eslint-disable-next-line @shopify/jsx-no-hardcoded-content*/}
          <div
            className={cn("h-full bg-blue-400 transition-all duration-300")}
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
            aria-label={`Loading progress: ${Math.round(progress)}%`}
          />
        </div>
        {/* eslint-disable-next-line @shopify/jsx-no-hardcoded-content*/}
        <span className={cn("text-sm text-white mt-1")}>{`${Math.round(progress)}%`}</span>
      </div>
    )}
  </FlexColCenter>
));
LoadingAnimation.displayName = 'LoadingAnimation';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default LoadingAnimation;
