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

/**
 * Responsive image for thumbnail or fullscreen display.
 */
const ImageDisplay = memo(
  ({
    imageUrl,
    alt = "image",
    onClick,
    className = "",
    widths = [80, 120, 256, 800, 1200],
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
      const srcSet = widths
        .map((ww) => `${imageUrl}${separator}width=${ww}&format=webp ${ww}w`)
        .join(", ");

      const sizes = mode === "fullscreen" ? "100vw" : "80px";
      const fetchPriority = mode === "thumbnail" ? "high" : "auto";
      const defaultWidth =
        mode === "fullscreen"
          ? widths[widths.length - 1]
          : widths.find((ww) => ww >= 80) || widths[0];

      return {
        src: `${imageUrl}${separator}width=${defaultWidth}&format=webp`,
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
          fetchPriority={imageProps.fetchPriority}
        />
      </div>
    );
  }
);
ImageDisplay.displayName = "ImageDisplay";

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default ImageDisplay;
