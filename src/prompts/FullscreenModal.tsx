import React, { memo, useCallback, PropsWithChildren, ReactNode } from "react";

interface FullscreenModalProps extends PropsWithChildren<{}> {
    image?: string;
    onClose: () => void;
    children?: ReactNode;
}

const FullscreenModal = memo(({ image, onClose, children }: FullscreenModalProps) => {
    const handleModalClick = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleImageClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);

    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen z-100 bg-black/50 flex items-center justify-center cursor-pointer backdrop-blur-sm select-none"
            onClick={handleModalClick}
        >
            <div className="prompt-animate flex flex-col gap-4 items-center justify-center">
                {image && (
                    <img
                        src={image}
                        className="h-4/5 w-auto object-contain max-w-[90vw] max-h-[90vh]"
                        onClick={handleImageClick}
                        alt="Fullscreen view"
                    />
                )}
                {children}
            </div>
        </div>
    );
});

FullscreenModal.displayName = "FullscreenModal";

export default FullscreenModal; 