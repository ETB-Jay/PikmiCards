import React from 'react';

import { ItemData } from '../types';

import { ImageDisplay } from './ImageDisplay';

interface OrderCardConfirmModalProps {
  item: ItemData;
  onImageClick: () => void;
}

const OrderCardConfirmModal = ({ item, onImageClick }: OrderCardConfirmModalProps) => {
  return (
    <div className="flex flex-row relative gap-3 items-center justify-start shadow-lg rounded-lg transition-all min-w-fit min-h-fit p-2 bg-green-smoke-600/20">
      <div className="relative h-30 w-auto">
        <ImageDisplay
          imageUrl={item.imageUrl}
          alt={item.itemName || 'Unnamed'}
          onClick={onImageClick}
          className="h-full w-full object-contain max-w-full max-h-full"
        />
      </div>
      <div className='absolute bg-black/70 ring-2 ring-black text-white rounded-2xl px-1 bottom-2 left-2 text-xs z-10'>
        {item.itemQuantity}
      </div>
    </div>
  );
};

export default OrderCardConfirmModal; 