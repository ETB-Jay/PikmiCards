// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import React, { memo, useCallback } from 'react';

import { ModalContainer } from '../components/containers';

/**
 * FullscreenModal component for displaying images in fullscreen overlay.
 * Used for item image previews.
 *
 * @module FullscreenModal
 */

// ─ Constants ─────────────────────────────────────────────────────────────────────────────────────────
const FULLSCREEN_MODAL_ALT = "Fullscreen Modal Image";

/**
 * Props for the FullscreenModal component.
 * @property image - The image URL to display.
 * @property onClose - Function to close the modal.
 * @property children - Optional additional content.
 */
interface FullscreenModalProps {
    image?: string;
    onClose: () => void;
    children?: React.ReactNode;
}

/**
 * FullscreenModal displays an image in a fullscreen modal overlay.
 * @param image - The image URL to display.
 * @param onClose - Function to close the modal.
 * @param children - Optional additional content.
 * @returns {JSX.Element}
 */
const FullscreenModal: React.FC<FullscreenModalProps> = memo(({ image, onClose, children }: FullscreenModalProps) => {
    const handleModalClick = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
        event.stopPropagation();
    };

    return (
        <ModalContainer
          className="flex flex-col gap-4 items-center justify-center"
          onClick={event => event.stopPropagation()}
          onClose={handleModalClick}
        >
            {image && (
                <div
                  className="max-h-[70vh] w-auto object-contain rounded-3xl ring-2 ring-offset-2 shadow-[0_0_30px_4px_black]"
                  onClick={handleImageClick}
                  tabIndex={0}
                  role="button"
                  onKeyDown={event => {
                      if (event.key === 'Enter' || event.key === ' ') {
                          handleImageClick(event as any);
                      }
                  }}
                >
                    <img
                      src={image}
                      className="max-h-[70vh] w-auto object-contain rounded-3xl ring-2 ring-offset-2 shadow-[0_0_30px_4px_black]"
                      alt={FULLSCREEN_MODAL_ALT}
                    />
                </div>
            )}
            {children}
        </ModalContainer>
    );
});

FullscreenModal.displayName = 'FullscreenModal';

export default FullscreenModal; 