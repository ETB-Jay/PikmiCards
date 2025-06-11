import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

const FullscreenModal = ({ image, onClose }) => {
    return (
        <div
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center cursor-pointer backdrop-blur-xs"
            onClick={onClose}
        >
            <img
                src={image}
                className="h-1/2 w-auto object-contain rounded-2xl"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    )
}

const CustomerInfo = ({ index }) => {
    return (
        <div className="relative grid bg-white border-1 border-black p-1">
            <div className='flex flex-row'>
                <div className="text-left text-sm font-bold">
                    <p>Customer</p>
                </div>
                <div className="absolute right-1 top-0 text-gray-950/50 font-bold text-2xl">{index}</div>
            </div>
            <CheckIcon className="hover:brightness-50 cursor-pointer" sx={{ color: "green" }} />
            <ClearIcon className="hover:brightness-50 cursor-pointer" sx={{ color: "darkred" }} />
        </div>
    )
}



export { CustomerInfo, FullscreenModal }
