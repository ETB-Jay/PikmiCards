import React from 'react';

import { ItemData } from '../types';

import { ImageDisplay } from './ImageDisplay';

const OrderCardConfirmModal = ({ item, onImageClick }: OrderCardConfirmModalProps) => {
  return (
    <div className="bg-green-smoke-600/20 relative flex min-h-fit min-w-fit flex-row items-center justify-start gap-3 rounded-lg p-2 shadow-lg transition-all">
      <div className="relative h-30 w-auto">
        <ImageDisplay
          imageUrl={item.imageUrl}
          alt={item.itemName || 'Unnamed'}
          onClick={onImageClick}
          className="h-full max-h-full w-full max-w-full object-contain"
        />
      </div>
      <div className="absolute bottom-2 left-2 z-10 rounded-2xl bg-black/70 px-1 text-xs text-white ring-2 ring-black">
        {item.itemQuantity}
      </div>
    </div>
  );
};

export default OrderCardConfirmModal;
