import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

const Container = ({ className, children }) => {
    return (
        <div className={`overflow-y-hidden inset-shadow-black ${className}`}>
            {children}
        </div>
    )
}

const FullscreenModal = ({ image, onClose }) => {
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
}

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

const CustomerInfo = ({ order }) => {
    return (
        <div className={`relative grid rounded p-1 ${deliveryBackground(order)}`}>
            <div className='flex flex-row'>
                <div className="text-left text-xs font-semibold w-20">
                    <p>{order.customerName}</p>
                </div>
                <div className="absolute right-1 top-0 text-gray-950/50 font-bold text-2xl">{order.boxNumber}</div>
            </div>
            <CheckIcon className="hover:brightness-50 cursor-pointer" sx={{ color: "green" }} />
            <ClearIcon className="hover:brightness-50 cursor-pointer" sx={{ color: "darkred" }} />
        </div>
    )
}


export { CustomerInfo, FullscreenModal, Container }
