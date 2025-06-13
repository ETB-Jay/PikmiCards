import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useOrders, useFullscreen } from '../../context/useContext'

function ToPick() {
    const { orders } = useOrders()
    const { openFullscreen } = useFullscreen()

    const Tags = ({ tags }) => {
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
    }

    const Card = ({ box, item }) => {
        if (!item) return null

        return (
            <div className='flex flex-row gap-3 items-start bg-brown-700 shadow-[0px_0px_3px_2px_rgba(0,0,0,0.25)] p-2 rounded'>
                <div className='relative h-35 min-w-25'>
                    <img
                        className="h-full cursor-pointer rounded-sm hover:brightness-50 shadow-brown-900 shadow-md hover:shadow-lg transition-all"
                        src={item.imageUrl}
                        alt={item.imageAlt || item.name}
                        onClick={() => openFullscreen(item.imageUrl)}
                        loading="lazy"
                    />
                </div>
                <div className='flex flex-col justify-between h-full max-w-[calc(100%-6.5rem)]'>
                    <div className="font-bold text-wrap">
                        <span className='block text-wrap rounded-2xl mb-2 text-silver-200 font-semibold'>{item.itemName || 'Unnamed Product'}</span>
                        <Tags tags={[
                            <><ShoppingCartIcon fontSize='small' />{item.itemQuantity}</>,
                            <>{item.itemStatus || null}</>,
                            <>{item.orderNumber}</>,
                            <>BOX #{box}</>
                        ]} />
                        
                    </div>
                </div>
            </div>
        )
    }

    const allItems = orders?.flatMap(order =>
        order.items?.map(item => ({
            ...item,
            orderNumber: order.orderNumber,
            boxNumber: order.boxNumber
        })) || []
    ) || []

    return (
        <div className='flex flex-col h-full overflow-y-scroll rounded container-snap'>
            <div className='flex flex-row justify-between items-center'>
                <h1 className="sticky top-0 font-bold rounded-sm px-2 text-silver-300 drop-shadow-2xl z-20">Cards to Pick From Set</h1>
                <CheckBoxOutlineBlankIcon />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-4 p-2 h-full">
                    {allItems.map((item) => (
                        <Card
                            box={item.boxNumber}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ToPick