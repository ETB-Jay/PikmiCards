import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useOrderDisplay, useFullscreen, useLocation } from '../../context/useContext'
import { useState, useMemo, memo } from 'react';
import { ScrollContainer, ImageDisplay, Tags } from '../components'

const Card = memo(({ item, onImageClick }) => {
    if (!item) return null

    const handleImageClick = () => {
        if (item.imageUrl) {
            onImageClick(item.imageUrl)
        }
    }

    return (
        <div className='flex flex-row gap-3 items-start bg-brown-700 shadow-[0px_0px_3px_2px_rgba(0,0,0,0.25)] p-2 rounded'>
            <div className='relative h-35 min-w-25'>
                <ImageDisplay
                    imageUrl={item.imageUrl}
                    alt={item.itemName || 'Product Image'}
                    onClick={handleImageClick}
                    onError={(e) => {
                        e.target.src = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
                    }}
                />
            </div>
            <div className='flex flex-col justify-between h-full max-w-[calc(100%-6.5rem)]'>
                <div className="font-bold text-wrap">
                    <span className='block text-wrap rounded-2xl mb-2 text-silver-200 font-semibold'>{item.itemName || 'Unnamed Product'}</span>
                    <Tags tags={[
                        <><ShoppingCartIcon fontSize='small' />{item.itemQuantity}</>,
                        item.itemStatus && <>{item.itemStatus}</>,
                        <>BOX #</>
                    ]} />
                </div>
            </div>
        </div>
    )
})

const SelectionToggle = memo(({ selecting, onToggle }) => {
    const Icon = selecting ? CheckBoxIcon : CheckBoxOutlineBlankIcon
    return (
        <Icon
            className="cursor-pointer hover:brightness-50"
            sx={{ color: 'white' }}
            onClick={onToggle}
        />
    )
})

function ToPick() {
    const { orderDisplay } = useOrderDisplay()
    const { location } = useLocation()
    const { openFullscreen } = useFullscreen()
    const [selecting, setSelecting] = useState(false)

    const allItems = useMemo(() =>
        orderDisplay?.flatMap(order =>
            order.items?.map(item => ({
                ...item,
                orderNumber: order.orderNumber,
                boxNumber: order.boxNumber
            })) || []
        ) || [],
        [orderDisplay]
    )

    return (
        <ScrollContainer>
            <div className='flex flex-row justify-between items-center'>
                <h1 className="sticky top-0 font-bold rounded-sm px-2 text-silver-300 drop-shadow-2xl z-20">Cards to Pick From Set - {location}</h1>
                <SelectionToggle
                    selecting={selecting}
                    onToggle={() => setSelecting(prev => !prev)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-4 p-2 h-full">
                    {allItems.map((item) => (
                        <Card
                            key={`${item.orderNumber}-${item.itemName}`}
                            item={item}
                            onImageClick={openFullscreen}
                        />
                    ))}
                </div>
            </div>
        </ScrollContainer>
    )
}

export default ToPick