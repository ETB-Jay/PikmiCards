// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';

interface ImageDisplayProps {
  imageUrl: string;
  alt?: string;
  onClick?: React.ReactEventHandler<HTMLImageElement>;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  className?: string;
}

/** @description Displays an image with optional click and error handlers. */
const ImageDisplay = memo(
  ({ imageUrl, alt = 'image button', onClick, onError, className = '' }: ImageDisplayProps) => {
    const handleClick = (event: React.MouseEvent | React.KeyboardEvent) => {
      if (onClick) {
        onClick(event as any);
      }
    };

    return (
      <div
        tabIndex={0}
        role="button"
        aria-label={alt}
        onClick={handleClick}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleClick(event as unknown as React.MouseEvent<HTMLImageElement>);
          }
        }}
        onError={onError}
      >
        <img className={className} src={imageUrl} alt={alt} loading="lazy" />
      </div>
    );
  }
);

ImageDisplay.displayName = 'ImageDisplay';

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export { ImageDisplay };
