// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement } from "react";

/**
 * Text renders a styled paragraph.
 * @param text - The paragraph text to display
 */
const Text = memo(
  ({ text }: { text: string }): ReactElement => (
    <p className="text-md font-semibold text-white">{text}</p>
  )
);
Text.displayName = "Text";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Text;
