// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactElement, memo } from "react";

import { cn } from "../../context/functions";

/**
 * @description Subtitle renders a medium, bold subheading.
 * @param text - The subtitle text to display
 */
const Subtitle = memo(({ text }: { text: string }): ReactElement => (
  <h2
    className={cn(
      "mb-3 text-2xl font-semibold text-white",
      "relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-24",
      "after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-purple-600"
    )}
  >
    {text}
  </h2>
)
);
Subtitle.displayName = "Subtitle";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Subtitle;
