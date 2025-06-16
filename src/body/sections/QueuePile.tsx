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
        <ScrollContainer className='flex-row'>
            {queueItems.map((item) => (
                <div key={`${item.orderNumber}-${item.itemName}`} className="relative flex-shrink-0">
                    <ImageDisplay
                        imageUrl={item.imageUrl}
                        alt={item.itemName}
                        onClick={() => openFullscreen(item.imageUrl)}
                        className="w-full object-contain rounded"
                    />
                </div>
            ))}
        </ScrollContainer>
    )
}

export default QueuePile
