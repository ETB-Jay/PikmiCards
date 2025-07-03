import React from 'react';
import { memo, useMemo, useCallback } from 'react';

/**
 * ImageDisplay component.
 * Displays an image with optional click and error handlers.
 * Used for item images in cards and modals.
 *
 * @module ImageDisplay
 */

/**
 * Props for the ImageDisplay component.
 * @property {string} imageUrl - The URL of the image to display.
 * @property {string} alt - The alt text for the image.
 * @property {(e: React.MouseEvent) => void} [onClick] - Optional click handler for the image.
 * @property {string} [className] - Additional CSS classes for the image.
 * @property {(e: React.SyntheticEvent<HTMLImageElement>) => void} [onError] - Optional error handler for the image.
 */
interface ImageDisplayProps {
    imageUrl: string;
    alt: string;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
    onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * Displays an image with optional click and error handlers.
 * @param {ImageDisplayProps} props - The props for the image display.
 * @returns {JSX.Element}
 */
const ImageDisplay = memo(({ imageUrl, alt, onClick, className = '', onError }: ImageDisplayProps) => {
    const imageClass = useMemo(() =>
        `h-full cursor-pointer rounded-lg hover:brightness-50 hover:shadow-lg transition-all ${className}`,
        [className]
    );

    const handleClick = useCallback((e: React.MouseEvent) => {
        onClick?.(e);
    }, [onClick]);

    return (
        <>
            <img
                className={imageClass}
                src={imageUrl}
                alt={alt}
                onClick={handleClick}
                onError={onError}
                loading={'lazy'}
            />
        </>
    );
});

export { ImageDisplay }; 