import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { memo, useCallback } from 'react'

// Common Container Components
const Container = memo(({ className, children }) => {
    return (
        <div className={`overflow-y-hidden inset-shadow-black ${className}`}>
            {children}
        </div>
    )
})

const ScrollContainer = memo(({ className, children }) => {
    return (
        <div className={`flex flex-col h-full overflow-y-scroll rounded container-snap ${className}`}>
            {children}
        </div>
    )
})

// Common Image Components
const ImageDisplay = memo(({ imageUrl, alt, onClick, className = "", onError }) => {
    return (
        <img
            className={`h-full cursor-pointer rounded-sm hover:brightness-50 shadow-brown-900 shadow-md hover:shadow-lg transition-all ${className}`}
            src={imageUrl}
            alt={alt}
            onClick={onClick}
            onError={onError}
            loading="lazy"
        />
    )
})

const FullscreenModal = memo(({ image, onClose }) => {
    return (
        <div
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center cursor-pointer backdrop-blur-xs"
            onClick={onClose}
        >
            <img
                src={image}
                className="h-3/4 w-auto object-contain rounded-2xl"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    )
})

// Common UI Components
const LoadingSpinner = memo(() => {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-silver-300 border-t-transparent rounded-full animate-[spin_1s_linear_infinite]"></div>
            <p className="text-silver-300 font-semibold">Loading Orders...</p>
        </div>
    )
})

const Tags = memo(({ tags }) => {
    return (
        <div className='flex flex-row flex-wrap gap-2'>
            {tags
                .filter((tag) => (
                    tag !== null && tag !== undefined && tag !== ''
                ))
                .map((tag, index) => (
                    <span key={index} className="flex flex-row items-center justify-center text-nowrap bg-black-olive-800 border-2 border-black/50 rounded-2xl px-2 py-0.5 text-white text-xs gap-2">
                        {tag}
                    </span>
                ))}
        </div>
    )
})

// Common Utility Functions
const deliveryBackground = (order) => {
    const delivery = order.deliveryMethod
    if (delivery === "In-Store Pick-up Oakville") {
        return "bg-green-smoke-200"
    } else if (delivery === "In-Store Pick-up Newmarket") {
        return "bg-sandy-brown-300"
    } else {
        return "bg-silver-300"
    }
}

const CustomerInfo = memo(({ order }) => {
    const handleCheck = useCallback(() => {
        // Add check functionality
    }, [])

    const handleClear = useCallback(() => {
        // Add clear functionality
    }, [])

    return (
        <div className={`relative grid rounded p-1 ${deliveryBackground(order)}`}>
            <div className='flex flex-row'>
                <div className="text-left text-xs font-semibold w-20">
                    <p>{order.customerName}</p>
                </div>
                <div className="absolute right-1 top-0 text-gray-950/50 font-bold text-2xl">{order.boxNumber}</div>
            </div>
            <CheckIcon className="hover:brightness-50 cursor-pointer" sx={{ color: "green" }} onClick={handleCheck} />
            <ClearIcon className="hover:brightness-50 cursor-pointer" sx={{ color: "darkred" }} onClick={handleClear} />
        </div>
    )
})

export { 
    CustomerInfo, 
    FullscreenModal, 
    Container,
    ScrollContainer,
    ImageDisplay,
    LoadingSpinner,
    Tags,
    deliveryBackground
}
