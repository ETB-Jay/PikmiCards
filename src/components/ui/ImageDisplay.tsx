import { KeyboardEvent, memo, SyntheticEvent, useCallback, useMemo } from "react";

interface ImageDisplayProps {
  imageUrl: string;
  alt?: string;
  onClick?: (ev: SyntheticEvent) => void;
  className?: string;
  widths?: number[];
  loading?: "lazy" | "eager";
  mode?: "thumbnail" | "fullscreen";
}

/** Responsive image for thumbnail or fullscreen display */
const ImageDisplay = memo(
  ({
    imageUrl,
    alt = "image",
    onClick,
    className = "",
    widths = [60, 80, 120, 256, 800, 1200],
    loading = "lazy",
    mode = "thumbnail",
  }: ImageDisplayProps) => {
    const handleClick = useCallback(
      (ev: SyntheticEvent) => {
        onClick?.(ev);
      },
      [onClick]
    );

    const handleKeyDown = useCallback(
      (ev: KeyboardEvent) => {
        if (ev.key === "Enter" || ev.key === " ") {
          handleClick(ev);
        }
      },
      [handleClick]
    );

    const imageProps = useMemo(() => {
      const separator = imageUrl.includes("?") ? "&" : "?";

      // Use different compression settings based on mode
      const compressionParams =
        mode === "thumbnail" ? "&format=webp&quality=75" : "&format=webp&quality=85";

      const srcSet = widths
        .map((ww) => `${imageUrl}${separator}width=${ww}${compressionParams} ${ww}w`)
        .join(", ");

      // Reduced from 80px to 60px
      const sizes = mode === "fullscreen" ? "100vw" : "60px";
      const fetchPriority = mode === "thumbnail" ? "high" : "auto";

      // Use smaller default width for thumbnails
      const defaultWidth =
        mode === "fullscreen"
          ? widths[widths.length - 1]
          : widths.find((ww) => ww >= 60) || widths[0];

      return {
        src: `${imageUrl}${separator}width=${defaultWidth}${compressionParams}`,
        srcSet,
        sizes,
        fetchPriority,
      };
    }, [imageUrl, widths, mode]);

    return (
      <div
        tabIndex={0}
        role="button"
        aria-label={alt}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <img
          className={className}
          src={imageProps.src}
          srcSet={imageProps.srcSet}
          sizes={imageProps.sizes}
          alt={alt}
          loading={loading}
          fetchPriority={imageProps.fetchPriority as "high" | "auto" | "low" | undefined}
        />
      </div>
    );
  }
);
ImageDisplay.displayName = "ImageDisplay";

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────
export default ImageDisplay;
