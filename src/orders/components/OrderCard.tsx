// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useCallback } from 'react';

import { Item, OrderData, ItemData } from '../../types';
import { useFullscreen, useOrderDisplay, useOrders } from '../../context/useContext';

import { ImageDisplay } from './ImageDisplay';
import Tags from './Tags';

// ─ OrderCard ─────────────────────────────────────────────────────────────────--

interface OrderCardProps {
  item: Item | ItemData;
  largeDisplay: boolean;
  selectable: boolean;
  onImageClick?: (url: string) => void;
}

function findItemDataByID(orders: OrderData[], itemID: string): ItemData | undefined {
  for (const order of orders) {
    const found = order.items.find((item) => item.itemID === itemID);
    if (found) { return found; }
  }
  return undefined;
}

const OrderCard = ({ item, largeDisplay, selectable, onImageClick }: OrderCardProps) => {
  const { openFullscreen } = useFullscreen();
  const { orders } = useOrders();
  const { selectedItems, handleSelect } = useOrderDisplay();

  const isItem = (obj: any): obj is Item => 'status' in obj;

  const itemData = isItem(item)
    ? findItemDataByID(orders, item.itemID)
    : (item as ItemData);

  const selected = itemData ? selectedItems.has(item.itemID) : false;

  const handleImageClick = useCallback(
    () =>
      itemData &&
      (onImageClick ? onImageClick(itemData.imageUrl) : openFullscreen(itemData.imageUrl)),
    [onImageClick, itemData, openFullscreen]
  );

  const handleCardClick = useCallback(() => {
    if (!itemData) { return; }
    if (selectable) { handleSelect(itemData.itemID); }
    else { handleImageClick(); }
  }, [selectable, handleSelect, itemData, handleImageClick]);

  const cardClass = `bg-green-smoke-800/60 hover:bg-green-smoke-800/80 active:bg-green-smoke-900/80 hover:scale-102 cursor-pointer flex flex-row gap-3 object-contain p-2 h-fit rounded-xl transition-all${selectable && selected ? ' brightness-90 opacity-60 ring-2 ring-green-950' : ''}`;

  if (!itemData) { return null; }

  return (
    <div
      className={cardClass}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={itemData.itemName || 'Order card'}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleCardClick();
        }
      }}
    >
      <ImageDisplay
        imageUrl={itemData.imageUrl}
        alt={itemData.itemName || 'Unnamed'}
        className="inline-block object-contain w-auto transition-all cursor-pointer h-22 hover:opacity-80 hover:brightness-40"
        onClick={handleImageClick}
      />
      {largeDisplay && (
        <div className="flex flex-col flex-1 min-w-0">
          <div className="mb-2 text-sm font-semibold text-silver-100 md:text-md text-wrap">
            {itemData.itemName}
          </div>
          <div className="flex flex-row flex-wrap min-w-0 gap-2 sm:gap-3">
            <Tags item={itemData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
