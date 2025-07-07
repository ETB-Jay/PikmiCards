import React from 'react';

import { ItemData } from '../types';
import { useFullscreen } from '../context/useContext';

import { ImageDisplay } from './ImageDisplay';
import { Tags } from './modal';

interface OrderCardToPickProps {
  item: ItemData;
  selected: boolean;
  onCardClick?: () => void;
}

const OrderCardToPick = ({ item, selected, onCardClick }: OrderCardToPickProps) => {
  const { openFullscreen } = useFullscreen();
  const cardClass = `flex flex-row gap-3 items-center justify-start shadow-lg rounded-lg transition-all min-w-fit min-h-fit p-2 ${selected ? 'bg-green-smoke-800/70 hover:bg-green-smoke-900/70 cursor-pointer hover:scale-102' : 'bg-green-smoke-600/60 hover:bg-green-smoke-600/70 cursor-pointer hover:scale-101'}`;
  return (
    <div
      className={cardClass}
      onClick={onCardClick}
      tabIndex={0}
      role="button"
      onKeyDown={event => {
        if (onCardClick && (event.key === 'Enter' || event.key === ' ')) {
          onCardClick();
        }
      }}
    >
      <div className="relative h-22 w-auto">
        <ImageDisplay
          imageUrl={item.imageUrl}
          alt={item.itemName || 'Unnamed'}
          className="h-full w-full object-contain max-w-full max-h-full"
          onClick={() => openFullscreen(item.imageUrl)}
        />
      </div>
      <div className="flex flex-col h-full w-full max-w-[calc(100%-6.5rem)] min-w-0">
        <div className="font-semibold mb-2 text-silver-100 text-sm md:text-md">
          {item.itemName}
        </div>
        <div className="flex flex-row flex-wrap min-w-0 gap-2 sm:gap-3">
          <Tags item={item} />
        </div>
      </div>
    </div>
  );
};

export default OrderCardToPick; 