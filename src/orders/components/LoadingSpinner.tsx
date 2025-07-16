// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { memo } from 'react';

import { FlexColCenter } from '../../components/containers';
import { cn } from '../../context/functions';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const LOADING_TEXT = 'Loading';

/**
 * @description LoadingAnimation renders a spaceship loading indicator.
 */
const LoadingAnimation = memo((): React.ReactElement => (
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
  </FlexColCenter>
)
);
LoadingAnimation.displayName = 'LoadingAnimation';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default LoadingAnimation;
