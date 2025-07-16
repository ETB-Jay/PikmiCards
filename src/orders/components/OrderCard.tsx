// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useCallback } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { Item, ItemData } from '../../types';
import { useFullscreen, useOrderDisplay, useOrders } from '../../context/useContext';
import { findItemDataByID, cn } from '../../context/functions';

import { ImageDisplay } from './ImageDisplay';
import { Tags } from './Tags';

interface OrderCardProps {
  item: Item | ItemData;
  largeDisplay: boolean;
  selectable: boolean;
  onImageClick?: (url: string) => void;
}

/**
 * @description OrderCard displays an item or item data with image, tags, and selection logic.
 */
const OrderCard = ({ item, largeDisplay, selectable, onImageClick }: OrderCardProps) => {
  const { openFullscreen } = useFullscreen();
  const { orders } = useOrders();
  const { selectedItems, handleSelect } = useOrderDisplay();

  const isItem = (obj: any): obj is Item => 'status' in obj;

  const itemData = isItem(item)
    ? findItemDataByID(orders, item.itemID)
    : (item as ItemData);

  const selected = itemData ? selectedItems.has(item.itemID) : false;

  const handleImageClick = useCallback((ev?: React.SyntheticEvent) => {
    if (ev) { ev.stopPropagation(); }
    if (itemData) {
      if (onImageClick) { onImageClick(itemData.imageUrl); }
      else { openFullscreen(itemData.imageUrl); }
    }
  }, [onImageClick, itemData, openFullscreen]);

  const handleCardClick = useCallback((ev: React.MouseEvent | React.KeyboardEvent) => {
    ev.stopPropagation();
    if (!itemData) { return; }
    if (selectable) { handleSelect(itemData.itemID); }
    else { handleImageClick(); }
  }, [selectable, handleSelect, itemData, handleImageClick]);

  const cardClass = `bg-green-smoke-800/60 hover:bg-green-smoke-800/80 active:bg-green-smoke-900/80 hover:scale-102 cursor-pointer flex flex-row gap-3 object-contain p-2 h-fit rounded-xl transition-all relative ${selectable && selected ? ' brightness-90 opacity-70 ring-2 ring-green-950' : ''}`;

  if (!itemData) { return null; }

  // Icon for selection state (for small card view)
  let selectionIcon = null;
  if (selectable) {
    selectionIcon = selected ? (
      <CheckBoxIcon className="text-green-500" />
    ) : (
      <CheckBoxOutlineBlankIcon className="text-white" />
    );
  }

  // Handler for clicking the selection icon only
  const handleSelectionIconClick = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    handleSelect(itemData.itemID);
  };

  // Keyboard accessibility for selection icon
  const handleSelectionIconKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      handleSelectionIconClick(ev as any);
    }
  };

  let selectionAriaLabel = 'Select item';
  if (selected) { selectionAriaLabel = 'Deselect item'; }

  const cardContent = largeDisplay ? (
    (() => {
      const tags = <Tags item={itemData} />;
      return (
        <div className={cn("flex flex-col flex-1 min-w-0")}>
          <span className={cn("mb-2 text-sm font-semibold text-silver-100 md:text-md text-wrap")}>
            {itemData.itemName}
          </span>
          <div className={cn("flex flex-row flex-wrap min-w-0 gap-2 sm:gap-3")}>
            {tags}
          </div>
        </div>
      );
    })()
  ) : (
    <>
      <div className='absolute bottom-2 left-2 text-white px-1.5 py-0.5 text-xs font-semibold bg-black/80 rounded-2xl'>
        {itemData.itemQuantity}
      </div>
      <div
        className="absolute top-2 right-2"
        onClick={handleSelectionIconClick}
        onKeyDown={handleSelectionIconKeyDown}
        tabIndex={0}
        role="button"
        aria-label={selectionAriaLabel}
      >
        {selectionIcon}
      </div>
    </>
  );

  return (
    <div
      className={cn(cardClass)}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={itemData.itemName || 'Order card'}
      onKeyDown={(ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          handleCardClick(ev);
        }
      }}
    >
      <ImageDisplay
        imageUrl={itemData.imageUrl}
        alt={itemData.itemName || 'Unnamed'}
        className={cn("inline-block object-contain w-auto transition-all cursor-pointer h-22 hover:opacity-80 hover:brightness-40")}
        onClick={handleImageClick}
      />
      {cardContent}
    </div>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default OrderCard;
