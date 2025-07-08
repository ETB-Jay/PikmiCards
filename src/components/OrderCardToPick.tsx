import React from 'react';

import { ItemData } from '../types';
import { useFullscreen } from '../context/useContext';

import { ImageDisplay } from './ImageDisplay';
import { Tags } from './modal';

const OrderCardToPick = ({ item, selected, onCardClick }: OrderCardToPickProps) => {
  const { openFullscreen } = useFullscreen();
  return (
    <div
      className={cardClass}
      onClick={onCardClick}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (onCardClick && (event.key === 'Enter' || event.key === ' ')) {
          onCardClick();
        }
      }}
    >
      <div className="relative h-22 w-auto">
        <ImageDisplay
          imageUrl={item.imageUrl}
          alt={item.itemName || 'Unnamed'}
          className="h-full max-h-full w-full max-w-full object-contain"
          onClick={() => openFullscreen(item.imageUrl)}
        />
      </div>
      <div className="flex h-full w-full max-w-[calc(100%-6.5rem)] min-w-0 flex-col">
        <div className="text-silver-100 md:text-md mb-2 text-sm font-semibold">{item.itemName}</div>
        <div className="flex min-w-0 flex-row flex-wrap gap-2 sm:gap-3">
          <Tags item={item} />
        </div>
      </div>
    </div>
  );
};

export default OrderCardToPick;
