// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';

import { ModalContainer } from '../components';
import { cn } from '../context/functions';

/** FullscreenModal displays an image in a fullscreen modal overlay. */
const FullscreenModal = memo(({ image }: { image: string }) => {
  return (
    <ModalContainer>
      {image && (
        <img
          src={image}
          className={cn(
            'max-h-[70vh] w-auto rounded-3xl object-contain shadow-[0_0_30px_4px_black] ring-2 ring-offset-2'
          )}
          alt=""
        />
      )}
    </ModalContainer>
  );
});
FullscreenModal.displayName = 'FullscreenModal';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default FullscreenModal;
