// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { SVGProps, memo } from 'react';

const ClosedBoxIcon = memo((props: SVGProps<SVGSVGElement>) => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 12.7938V42.1753L27.4792 53M3 12.7938L27.4792 3L53 13.8247M3 12.7938L14.9792 17.9485M27.4792 53L53 43.7216V13.8247M27.4792 53L27.4792 23.6186M27.4792 23.6186L53 13.8247M27.4792 23.6186L14.9792 17.9485M40.2396 8.41237L14.9792 17.9485M14.9792 17.9485L14.4583 18.9794"
      stroke="white"
      strokeWidth="5"
    />
  </svg>
));
ClosedBoxIcon.displayName = 'ClosedBoxIcon';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default ClosedBoxIcon;
