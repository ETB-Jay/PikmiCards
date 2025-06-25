import React, { memo, useCallback, PropsWithChildren, ReactNode } from 'react';
import { ModalContainer } from '../components/containers';

interface FullscreenModalProps extends PropsWithChildren<object> {
    image?: string;
    onClose: () => void;
    children?: ReactNode;
}

const FullscreenModal: React.FC<FullscreenModalProps> = memo(({ image, onClose, children }: FullscreenModalProps) => {
    const handleModalClick = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleImageClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);

    return (
        <ModalContainer
            className="flex flex-col gap-4 items-center justify-center"
            onClick={e => e.stopPropagation()}
            onClose={handleModalClick}
        >
            {image && (
                <img
                    src={image}
                    className="max-h-[70vh] w-auto object-contain rounded-3xl ring-2 ring-offset-2 shadow-[0_0_30px_4px_black]"
                    onClick={handleImageClick}
                    alt="Fullscreen view"
                />
            )}
            {children}
        </ModalContainer>
    );
});

FullscreenModal.displayName = 'FullscreenModal';

export default FullscreenModal; 