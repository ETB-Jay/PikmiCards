import React, { useCallback, memo } from 'react';
import { useFullscreen, useOrderDisplay } from '../context/useContext';
import { ItemData } from '../types';
import { ImageDisplay } from './ImageDisplay';
import { Tags } from './modal';

/**
 * Props for the OrderCard component.
 * @property {ItemData} item - The item to display in the card.
 * @property {string} [className] - Additional CSS classes for the card.
 * @property {boolean | null} selected - If the card is selected or not. Null if not selectable
 * @property {boolean} large- Whether to the card is a large display or not
 * @property {function | undefined} onImageClick - Optional function to call when the image is clicked
 */
interface CardProps {
    item: ItemData;
    className?: string;
    selected: boolean | null;
    large: boolean;
    itemKey: string;
    onImageClick?: () => void;
}

const OrderCard = memo(({ item, selected, large, onImageClick }: CardProps) => {
    const { openFullscreen } = useFullscreen();
    const { handleSelect } = useOrderDisplay();

    const handleImageClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (onImageClick) {
            onImageClick();
        } else {
            openFullscreen(item.imageUrl);
        }
    }, [onImageClick, openFullscreen, item.imageUrl]);

    const handleCardClick = useCallback(() => {
        if (selected === null) return;
        handleSelect(item.itemID);
    }, [handleSelect, item, selected]);

    return (
        <div
            className={`flex flex-row gap-3 items-center justify-start shadow-lg rounded-lg transition-all min-w-fit min-h-fit p-2
                        ${selected === null ? 'bg-green-smoke-600/20' : selected ? 'bg-green-smoke-800/70 hover:bg-green-smoke-900/70 cursor-pointer hover:scale-102' : 'bg-green-smoke-600/60 hover:bg-green-smoke-600/70 cursor-pointer hover:scale-101'}
                        ${large ? '': ' h-full'}`}
            onClick={handleCardClick}
        >
            <div className={`relative h-22 w-auto ${selected === null && 'h-30'}`}>
                {!large && <div className='absolute bg-black/70 ring-2 ring-black text-white rounded-2xl px-1 bottom-2 left-2 text-xs z-10'>{item.itemQuantity}</div>}
                <ImageDisplay
                    imageUrl={item.imageUrl}
                    alt={item.itemName || 'Unnamed'}
                    onClick={handleImageClick}
                    className="h-full w-full object-contain max-w-full max-h-full"
                />
            </div>
            {large &&
                <div className={`flex flex-col h-full w-fit max-w-[calc(100%-6.5rem)] min-w-0`}>
                    {item.itemName && (
                        <span className="block text-wrap rounded-2xl mb-1.5 text-silver-100 text-sm md:text-md font-semibold">
                            {item.itemName}
                        </span>
                    )}
                    <div className={'flex flex-row flex-wrap min-w-0 gap-2 sm:gap-3'}>
                        <Tags item={item} />
                    </div>
                </div>
            }
        </div>
    );
});

export default OrderCard;
