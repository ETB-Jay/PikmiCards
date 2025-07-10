// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';

import { ModalContainer } from '../components/containers';

const FULLSCREEN_IMAGE_LABEL = 'Close fullscreen image';

interface FullscreenModalProps {
  image: string;
  children?: React.ReactNode;
}

/**
 * FullscreenModal displays an image in a fullscreen modal overlay.
 * @param image - The image URL to display.
 * @param children - Optional additional content.
 */
const FullscreenModal = memo(({ image, children }: FullscreenModalProps) => {
  return (
    <ModalContainer className="flex flex-col items-center justify-center gap-4">
      {image && (
        <div
          className="max-h-[70vh] w-auto rounded-3xl object-contain shadow-[0_0_30px_4px_black] ring-2 ring-offset-2"
          tabIndex={0}
          role="button"
          aria-label={FULLSCREEN_IMAGE_LABEL}
          onClick={(ev) => ev.stopPropagation()}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
              ev.stopPropagation();
            }
          }}
        >
          <img
            src={image}
            className="max-h-[70vh] w-auto rounded-3xl object-contain shadow-[0_0_30px_4px_black] ring-2 ring-offset-2"
            alt=""
          />
        </div>
      )}
      {children}
    </ModalContainer>
  );
});

FullscreenModal.displayName = 'FullscreenModal';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default FullscreenModal;
