// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import React, { memo, useMemo, useCallback } from 'react';

/**
 * Displays an image with optional click and error handlers.
 * @param {ImageDisplayProps} props - The props for the image display.
 */
const ImageDisplay = memo(
  ({ imageUrl, alt, onClick, className = '', onError }: ImageDisplayProps) => {

    return (
      <span
        tabIndex={0}
        role="button"
        onClick={handleClick}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleClick(event as unknown as React.MouseEvent<HTMLImageElement>);
          }
        }}
        onError={onError}
      >
        <img className={imageClass} src={imageUrl} alt={alt} loading="lazy" />
      </span>
    );
  }
);

ImageDisplay.displayName = 'ImageDisplay';

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export { ImageDisplay };
