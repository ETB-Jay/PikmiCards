// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { SVGProps, memo } from "react";

/** Renders the empty placeholder image */
const EmptyImage = memo((props: SVGProps<SVGSVGElement>) => (
  <svg
    width="740"
    height="540"
    viewBox="0 0 740 540"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 520L20 20L720 20V520M20 520L720 520M20 520L301 260.5L427 369L528 314.5L720 520"
      stroke="white"
      strokeWidth="40"
    />
    <circle cx="500" cy="167" r="55" stroke="white" strokeWidth="40" />
  </svg>
));
EmptyImage.displayName = "EmptyImage";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default EmptyImage;
