// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactEventHandler, SyntheticEvent } from 'react';

import { cn } from '../../context/functions';

// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
interface ImageDisplayProps {
  imageUrl: string;
  alt?: string;
  onClick?: ReactEventHandler;
  onError?: ReactEventHandler;
  className?: string;
}

/**
 * Displays an image with optional click and error handlers.
 * @param imageUrl - The URL of the image to display
 * @param alt - Alternative text for the image
 * @param onClick - Optional click handler function
 * @param onError - Optional error handler function
 * @param className - Additional CSS classes
 */
const ImageDisplay = memo(
  ({ imageUrl, alt = 'image button', onClick, onError, className = '' }: ImageDisplayProps) => {
    const handleClick = (ev: SyntheticEvent) => {
      if (onClick) {
        onClick(ev);
      }
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
export default ImageDisplay;
