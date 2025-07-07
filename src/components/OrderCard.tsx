// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { useCallback, memo } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { useFullscreen, useOrderDisplay } from '../context/useContext';
import { ItemData } from '../types';

import { ImageDisplay } from './ImageDisplay';
import { Tags, TagPill } from './modal';

/**
 * Props for the OrderCard component.
 * @property {ItemData} item - The item to display in the card.
 * @property {boolean | null} selected - If the card is selected or not. Null if not selectable
 * @property {boolean} large- Whether to the card is a large display or not
 * @property {function | undefined} onImageClick - Optional function to call when the image is clicked
 */
interface CardProps {
    item: ItemData;
    selected: boolean | null;
    large: boolean;
    onImageClick?: () => void;
}

/**
 * OrderCard component.
 * Displays an item card with image, selection state, and tags.
 * Used in picking and confirmation UIs.
 *
 * @module OrderCard
 */
const OrderCard = memo(({ item, selected, large, onImageClick }: CardProps) => {
    const { openFullscreen } = useFullscreen();
    const { handleSelect } = useOrderDisplay();

    const handleImageClick = useCallback((event: React.MouseEvent) => {
        event.stopPropagation();
        if (onImageClick) {
            onImageClick();
        } else {
            openFullscreen(item.imageUrl);
        }
    }, [onImageClick, openFullscreen, item.imageUrl]);

    const handleCardClick = useCallback(() => {
        if (selected === null) {return;}
        handleSelect(item.itemID);
    }, [handleSelect, item, selected]);

    let cardBgClass = '';
    if (selected === null) {
      cardBgClass = 'bg-green-smoke-600/20';
    } else if (selected) {
      cardBgClass = 'bg-green-smoke-800/70 hover:bg-green-smoke-900/70 cursor-pointer hover:scale-102';
    } else {
      cardBgClass = 'bg-green-smoke-600/60 hover:bg-green-smoke-600/70 cursor-pointer hover:scale-101';
    }
    const cardHeightClass = large ? '' : ' h-full';

    let checkboxIconElement = null;
    if (selected) {
      checkboxIconElement = <CheckBoxIcon style={{ color: 'white' }} />;
    } else {
      checkboxIconElement = <CheckBoxOutlineBlankIcon style={{ color: 'white' }} />;
    }

    let checkboxIcon = null;
    if (!large && !onImageClick) {
      checkboxIcon = (
        <div className='absolute top-0 right-0 m-1 bg-black/70 rounded-full p-1 z-10 flex items-center justify-center'>
          {checkboxIconElement}
        </div>
      );
    }

    let quantityBadge = null;
    if (!large) {
      quantityBadge = (
        <div className='absolute bg-black/70 ring-2 ring-black text-white rounded-2xl px-1 bottom-2 left-2 text-xs z-10'>
          {item.itemQuantity}
        </div>
      );
    }

    let itemNameSpan = null;
    if (large && item.itemName) {
      itemNameSpan = (
        <div className="font-semibold mb-2 text-silver-100 text-sm md:text-md">
          {item.itemName}
        </div>
      );
    }

    let largeDetails = null;
    if (large) {
      largeDetails = (
        <div className="flex flex-col h-full w-full max-w-[calc(100%-6.5rem)] min-w-0">
          {itemNameSpan}
          <div className="flex flex-row flex-wrap min-w-0 gap-2 sm:gap-3">
            <Tags item={item} />
          </div>
        </div>
      );
    }

    return (
        <div
          className={`flex flex-row gap-3 items-center justify-start shadow-lg rounded-lg transition-all min-w-fit min-h-fit p-2 ${cardBgClass}${cardHeightClass}`}
          onClick={handleCardClick}
          tabIndex={0}
          role="button"
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              handleCardClick();
            }
          }}
        >
            <div className={`relative h-22 w-auto ${selected === null && 'h-30'}`}>
                {checkboxIcon}
                {quantityBadge}
                <ImageDisplay
                  imageUrl={item.imageUrl}
                  alt={item.itemName || 'Unnamed'}
                  onClick={handleImageClick}
                  className="h-full w-full object-contain max-w-full max-h-full"
                />
            </div>
            {largeDetails}
        </div>
    );
});

OrderCard.displayName = "OrderCard";

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default OrderCard;
