// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { memo } from 'react';

import { FlexColCenter } from '../../components/containers';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const LOADING_TEXT = 'Loading';

/** @description loadingAnimation renders a spaceship loading indicator */
const LoadingAnimation = memo(
  (): React.ReactElement => (
    <FlexColCenter className="w-full h-full gap-4">
      <div className="animate-float-spin">
        <div className="relative flex flex-row items-center justify-center animate-fly-horizontal">
          <div className="spaceship-fire spaceship-fire-horizontal" />
          <img
            src="/spaceship.png"
            alt=""
            className="relative z-10 w-auto h-20 drop-shadow-xl"
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
