import { memo, ReactNode } from 'react'

interface ContainerProps {
    className?: string;
    children: ReactNode;
}

interface ImageDisplayProps {
    imageUrl: string;
    alt: string;
    onClick?: () => void;
    className?: string;
    onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

interface FullscreenModalProps {
    image: string;
    onClose: () => void;
}

const Container = memo(({ className, children }: ContainerProps) => {
    return (
        <div className={`rounded-2xl overflow-y-hidden ${className?.includes('bg-none') ? '' : 'bg-white/10 backdrop-blur-sm shadow-lg'} ${className}`}>
            {children}
        </div>
    )
})

const ScrollContainer = memo(({ className, children }: ContainerProps) => {
    return (
        <div className={`flex flex-col gap-2 h-full overflow-y-scroll rounded-lg bg-white/5 backdrop-blur-sm ${className}`}>
            {children}
        </div>
    )
})

const ImageDisplay = memo(({ imageUrl, alt, onClick, className = "", onError }: ImageDisplayProps) => {
    return (
        <img
            className={`h-full cursor-pointer rounded-lg hover:brightness-90 hover:shadow-lg transition-all ${className}`}
            src={imageUrl}
            alt={alt}
            onClick={onClick}
            onError={onError}
            loading="lazy"
        />
    )
})

const FullscreenModal = memo(({ image, onClose }: FullscreenModalProps) => {
    return (
        <div
            className="fixed inset-0 z-50 bg-teal-900/40 flex items-center justify-center cursor-pointer backdrop-blur-sm"
            onClick={onClose}
        >
            <img
                src={image}
                className="h-3/4 w-auto object-contain rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    )
})

export { 
    FullscreenModal, 
    Container,
    ScrollContainer,
    ImageDisplay
}
