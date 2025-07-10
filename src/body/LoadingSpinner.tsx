// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { memo } from 'react';

import { FlexColCenter } from '../components/containers';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const LOADING_TEXT = 'Loading';

/** @description loadingAnimation renders a spaceship loading indicator */
const LoadingAnimation = memo(
  (): React.ReactElement => (
    <FlexColCenter className="h-full w-full gap-4">
      <div className="animate-float-spin">
        <div className="animate-fly-horizontal relative flex flex-row items-center justify-center">
          <div className="spaceship-fire spaceship-fire-horizontal" />
          <img
            src="/spaceship.png"
            alt=""
            className="relative z-10 h-20 w-auto drop-shadow-xl"
            draggable={false}
          />
        </div>
      </div>
      <span className="text-xl font-bold tracking-wide text-white drop-shadow-sm">
        {LOADING_TEXT}
        <span className="loading-dots" />
      </span>
    </FlexColCenter>
  )
);
LoadingAnimation.displayName = 'LoadingAnimation';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default LoadingAnimation;
