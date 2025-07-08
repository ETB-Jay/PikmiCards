// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { memo, useCallback } from 'react';

import { ModalContainer } from '../components/containers';


/**
 * FullscreenModal displays an image in a fullscreen modal overlay.
 * @param image - The image URL to display.
 * @param onClose - Function to close the modal.
 * @param children - Optional additional content.
 */
const FullscreenModal = memo(({ image, onClose, children }: FullscreenModalProps) => {
    const handleModalClick = useCallback(() => {
      onClose();
    }, [onClose]);

    const handleImageClick = (event: MouseEvent) => {
      event.stopPropagation();
    };

    return (
      <ModalContainer
        className="flex flex-col items-center justify-center gap-4"
        onClick={(ev: Event) => ev.stopPropagation()}
        onClose={handleModalClick}
      >
        {image && (
          <div
            className="max-h-[70vh] w-auto rounded-3xl object-contain shadow-[0_0_30px_4px_black] ring-2 ring-offset-2"
            onClick={handleImageClick}
            tabIndex={0}
            role="button"
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                handleImageClick(event as any);
              }
            }}
          >
            <img
              src={image}
              className="max-h-[70vh] w-auto rounded-3xl object-contain shadow-[0_0_30px_4px_black] ring-2 ring-offset-2"
              alt={FULLSCREEN_MODAL_ALT}
            />
          </div>
        )}
        {children}
      </ModalContainer>
    );
  }
);

FullscreenModal.displayName = 'FullscreenModal';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default FullscreenModal;
