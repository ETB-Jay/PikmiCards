import { useOrderDisplay, useFullscreen } from '../../context/useContext'
import { useMemo, memo } from 'react';
import { ScrollContainer, ImageDisplay } from '../components'

interface Item {
    imageUrl: string;
    itemName: string | null;
    itemQuantity: number;
    itemStatus: string | null;
    orderNumber: string;
    boxNumber: string;
}

interface TagsProps {
    tags: string[];
}

interface CardProps {
    item: Item;
    onImageClick: (url: string) => void;
}

function ToPick() {
    const { orderDisplay } = useOrderDisplay()
    const { openFullscreen } = useFullscreen()

    const Tags = memo(({ tags }: TagsProps) => {
        return (
            <div className='flex flex-row flex-wrap gap-2'>
                {tags
                    .filter((tag) => (
                        tag !== null && tag !== undefined && tag !== ''
                    ))
                    .map((tag, index) => (
                        <span key={index} className="flex flex-row items-center justify-center text-nowrap bg-green-950 border border-green-400/30 rounded-2xl px-2 py-0.5 text-silver-100 text-xs gap-2">
                            {tag}
                        </span>
                    ))}
            </div>
        )
    })
    
    const Card = memo(({ item, onImageClick }: CardProps) => {
        if (!item) return null
    
        const handleImageClick = () => {
            if (item.imageUrl) {
                onImageClick(item.imageUrl)
            }
        }
    
        return (
            <div className='flex flex-row gap-3 items-start bg-green-smoke-600/70 border-brown-950 border-1 shadow-[0px_0px_3px_2px_rgba(0,0,0,0.25)] p-2 rounded'>
                <div className='relative h-20 min-w-14'>
                    <ImageDisplay
                        imageUrl={item.imageUrl}
                        alt={item.itemName || 'Product Image'}
                        onClick={handleImageClick}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.src = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
                        }}
                    />
                </div>
                <div className='flex flex-col justify-between h-full max-w-[calc(100%-6.5rem)]'>
                    <div className="font-bold text-wrap">
                        <span className='block text-wrap rounded-2xl mb-2 text-silver-200 text-sm font-semibold'>{item.itemName || 'Unnamed Product'}</span>
                        <Tags tags={[
                            `${item.itemQuantity}`,
                            item.itemStatus || '',
                            'BOX #'
                        ]} />
                    </div>
                </div>
            </div>
        )
    })

    const allItems = useMemo(() =>
        orderDisplay?.flatMap(order =>
            order.items?.map(item => ({
                ...item,
                orderNumber: order.orderNumber,
                boxNumber: order.orderNumber // Using orderNumber as boxNumber since boxNumber doesn't exist
            })) || []
        ) || [],
        [orderDisplay]
    )

    return (
        <ScrollContainer className='p-3'>
            {allItems.map((item) => (
                <Card
                    key={`${item.orderNumber}-${item.itemName}`}
                    item={item}
                    onImageClick={openFullscreen}
                />
            ))}
        </ScrollContainer>
    )
}

export default ToPick