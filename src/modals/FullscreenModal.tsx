// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from "react";

import { ImageDisplay, ModalContainer } from "../components";
import { cn } from "../context/functions";

/** FullscreenModal displays an image in a fullscreen modal overlay. */
const FullscreenModal = memo(({ image }: { image: string }) => (
  <ModalContainer>
    {image && (
      <ImageDisplay
        imageUrl={image}
        className={cn(
          "max-h-[70vh] w-auto rounded-3xl object-contain shadow-[0_0_30px_4px_black]",
          "ring-2 ring-offset-2"
        )}
        alt="Fullscreen Image Preview"
        mode="fullscreen"
      />
    )}
  </ModalContainer>
));
FullscreenModal.displayName = "FullscreenModal";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default FullscreenModal;
