import { useOrders, useFullscreen } from '../../context/useContext'

function QueuePile() {
    const { orders } = useOrders()
    const { openFullscreen } = useFullscreen()

    const remainingOrders = orders.slice(21)

    return (
        <div className="h-full flex flex-col shadow-2xl shadow-brown-500 rounded-2xl bg-brown-700 px-3 py-1">
            <h1 className="font-bold text-silver-300 drop-shadow-2xl mb-1">Queue Pile</h1>
            <div className="flex flex-row flex-grow overflow-x-auto overflow-y-hidden gap-2 whitespace-nowrap container-snap h-20">
                {remainingOrders.map((order) => (
                    order.items?.map((item) => (
                        <div key={`${order.orderNumber}-${item.itemName}`} className="relative h-16 flex-shrink-0">
                            <img
                                className="h-full w-full object-contain cursor-pointer hover:brightness-50 shadow-brown-900 shadow-md hover:shadow-lg transition-all rounded"
                                src={item.imageUrl}
                                alt={item.itemName}
                                onClick={() => openFullscreen(item.imageUrl)}
                                loading="lazy"
                            />
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}

export default QueuePile
