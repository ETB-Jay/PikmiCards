// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement } from "react";

import { FlexColCenter } from "../components";
import SpaceshipIcon from "../components/icons/SpaceshipIcon";
import { cn } from "../context/functions";

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const LOADING_TEXT = "Loading";

/** LoadingAnimation renders a spaceship loading indicator with optional progress. */
const LoadingAnimation = memo((): ReactElement => (
    <FlexColCenter className={cn("gap-4")}>
      <div className={cn("animate-float-spin")}>
        <div
          className={cn(
            "animate-fly-horizontal relative flex flex-row items-center justify-center"
          )}
        >
          <div className={cn("spaceship-fire spaceship-fire-horizontal")} />
          <SpaceshipIcon className={cn("relative z-10 h-20 w-auto drop-shadow-xl")} />
        </div>
      </div>
      <span className={cn("text-xl font-bold tracking-wide text-white drop-shadow-sm")}>
        {LOADING_TEXT}
        <span className={cn("loading-dots")} />
      </span>
    </FlexColCenter>
  )
);
LoadingAnimation.displayName = "LoadingAnimation";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default LoadingAnimation;
