import { useOrderDisplay, useFullscreen } from '../../context/useContext'
import { ScrollContainer, ImageDisplay } from '../components'
import { useMemo } from 'react'

function QueuePile() {
    const { orderDisplay } = useOrderDisplay()
    const { openFullscreen } = useFullscreen()

    const remainingOrders = useMemo(() => 
        orderDisplay?.slice(21) || [],
        [orderDisplay]
    )

    const queueItems = useMemo(() => 
        remainingOrders.flatMap(order => 
            order.items?.map(item => ({
                ...item,
                orderNumber: order.orderNumber
            })) || []
        ),
        [remainingOrders]
    )

    return (
        <div className="h-full flex flex-col shadow-2xl shadow-brown-500 rounded-2xl bg-brown-700 px-3 py-1">
            <h1 className="font-bold text-silver-300 drop-shadow-2xl mb-1">Queue Pile</h1>
            <ScrollContainer className="flex-row flex-grow overflow-x-auto overflow-y-hidden gap-2 whitespace-nowrap container-snap h-20">
                {queueItems.map((item) => (
                    <div key={`${item.orderNumber}-${item.itemName}`} className="relative h-16 flex-shrink-0">
                        <ImageDisplay
                            imageUrl={item.imageUrl}
                            alt={item.itemName}
                            onClick={() => openFullscreen(item.imageUrl)}
                            className="w-full object-contain rounded"
                        />
                    </div>
                ))}
            </ScrollContainer>
        </div>
    )
}

export default QueuePile
