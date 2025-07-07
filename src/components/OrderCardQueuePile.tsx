import React from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { ItemData, OrderID } from '../types';
import { useFullscreen, useOrderDisplay } from '../context/useContext';

import { ImageDisplay } from './ImageDisplay';

interface OrderCardQueuePileProps {
  item: ItemData;
  selected: boolean;
  onCardClick?: () => void;
}

const OrderCardQueuePile = ({ item, selected, onCardClick }: OrderCardQueuePileProps) => {
  const { openFullscreen } = useFullscreen();
  const { orderDisplay } = useOrderDisplay();

  const detectInBox = (orderID: OrderID) => {
    const wow = orderDisplay.some(order => (order.box !== null && order.orderID === orderID))
    if (wow) {return 'brightness-50';}
  };

  const cardClass = `flex flex-row gap-3 items-center justify-start shadow-lg rounded-lg transition-all min-w-fit min-h-fit p-2 ${selected ? 'bg-green-smoke-800/70 hover:bg-green-smoke-900/70 cursor-pointer hover:scale-102' : 'bg-green-smoke-600/60 hover:bg-green-smoke-600/70 cursor-pointer hover:scale-101'}`;
  const checkboxIcon = selected ? <CheckBoxIcon style={{ color: 'white' }} /> : <CheckBoxOutlineBlankIcon style={{ color: 'white' }} />;
  return (
    <div
      className={`${cardClass} ${detectInBox(item.orderID)}`}
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
        <div className='absolute top-0 right-0 m-1 bg-black/70 rounded-full p-1 z-10 flex items-center justify-center'>
          {checkboxIcon}
        </div>
        <div className='absolute bg-black/70 ring-2 ring-black text-white rounded-2xl px-1 bottom-2 left-2 text-xs z-10'>
          {item.itemQuantity}
        </div>
        <ImageDisplay
          imageUrl={item.imageUrl}
          alt={item.itemName || 'Unnamed'}
          className="h-full w-full object-contain max-w-full max-h-full"
          onClick={() => openFullscreen(item.imageUrl)}
        />
      </div>
    </div>
  );
};

export default OrderCardQueuePile; 