// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactEventHandler } from 'react';

import { cn } from '../context/functions';

interface ImageDisplayProps {
  imageUrl: string;
  alt?: string;
  onClick?: ReactEventHandler;
  onError?: ReactEventHandler;
  className?: string;
}

/** @description Displays an image with optional click and error handlers. */
const ImageDisplay = memo(
  ({ imageUrl, alt = 'image button', onClick, onError, className = '' }: ImageDisplayProps) => {
    const handleClick = (ev: React.MouseEvent | React.KeyboardEvent) => {
      if (onClick) { onClick(ev); }
    };

    return (
      <div
        tabIndex={0}
        role="button"
        aria-label={alt}
        onClick={handleClick}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            handleClick(ev);
          }
        }}
        onError={onError}
      >
        <img className={cn(className)} src={imageUrl} alt={alt} loading="lazy" />
      </div>
    );
  }
);

ImageDisplay.displayName = 'ImageDisplay';

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export { ImageDisplay };
