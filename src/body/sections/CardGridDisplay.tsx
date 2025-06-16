import { useOrderDisplay } from '../../context/useContext'
import { useMemo, memo, useCallback } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { Order } from '../../types'

function CardGridDisplay() {
    const { orderDisplay } = useOrderDisplay()

    const CustomerInfo = memo(({ order }: { order: Order }) => {
        const handleCheck = useCallback(() => {
            // Add check functionality
        }, [])

        const handleClear = useCallback(() => {
            // Add clear functionality
        }, [])

        const deliveryBackground = (order: Order): string => {
            const delivery = order.deliveryMethod
            if (delivery === "In-Store Pick-up Oakville") {
                return "bg-orange-400/50 border-orange-900"
            } else if (delivery === "In-Store Pick-up Newmarket") {
                return "bg-white/40 border-white"
            } else {
                return "bg-brown-800/50 border-brown-900"
            }
        }

        return (
            <div className={`relative grid rounded-lg p-2 hover:shadow-xl transition-all border-2 ${deliveryBackground(order)}`}>
                <div className='flex flex-row items-center justify-between gap-1.5'>
                    <div className="text-left min-w-0 flex-1">
                        <p className="text-teal-50 font-semibold text-xs truncate">{order.customerName}</p>
                        <p className="text-teal-200/60 text-[10px] mt-0.5 truncate">Order {order.orderNumber}</p>
                    </div>
                    <div className="flex flex-col gap-1 flex-shrink-0">
                        <CheckIcon 
                            className="hover:brightness-90 cursor-pointer transition-transform hover:scale-110" 
                            sx={{ color: "rgb(20, 184, 166)", fontSize: '1.25rem' }} 
                            onClick={handleCheck} 
                        />
                        <ClearIcon 
                            className="hover:brightness-90 cursor-pointer transition-transform hover:scale-110" 
                            sx={{ color: "rgb(153, 246, 228)", fontSize: '1.25rem' }} 
                            onClick={handleClear} 
                        />
                    </div>
                </div>
            </div>
        )
    })

    const boxOrders = useMemo(() =>
        orderDisplay?.slice(0, 20) || [],
        [orderDisplay]
    )

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-fr h-full w-full p-2">
            {boxOrders.map((order) => (
                <CustomerInfo
                    key={order.orderNumber}
                    order={order}
                />
            ))}
        </div>
    )
}

export default memo(CardGridDisplay)
