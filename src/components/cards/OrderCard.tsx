// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  KeyboardEvent,
  memo,
  MouseEvent,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useMemo,
} from 'react';

import Tags from './Tags';
import { findItemDataByID, cn } from '../../context/functions';
import { useFullscreen, useOrderDisplay, useOrderSelection, useOrders } from '../../context/useContext';
import { Item, ItemData } from '../../types';
import BasicContainer from '../containers/BasicContainer';
import ImageDisplay from '../ui/ImageDisplay';

// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
interface OrderCardProps {
  item: Item | ItemData;
  largeDisplay: boolean;
  selectable: boolean;
  onImageClick?: (url: string) => void;
  imageLoading?: 'eager' | 'lazy';
}

/**
 * @description OrderCard displays an item or item data with image, tags, and selection logic.
 * @param item - The item or item data to display
 * @param largeDisplay - Whether to show the card in large display mode
 * @param selectable - Whether the card can be selected
 * @param onImageClick - Optional callback when image is clicked
 */
const OrderCard = memo(({
  item,
  largeDisplay,
  selectable,
  onImageClick,
  imageLoading = 'lazy'
}: OrderCardProps): ReactElement | null => {
  const { openFullscreen } = useFullscreen();
  const { orders } = useOrders();
  const { orderDisplay } = useOrderDisplay();
  const { selectedItems, handleSelect } = useOrderSelection();

  const isItem = (obj: any): obj is Item => 'status' in obj;

  const itemData: ItemData | undefined = isItem(item)
    ? findItemDataByID(orders, item.itemID)
    : (item as ItemData);

  const selected = itemData ? selectedItems.has(item.itemID) : false;
  const selectionAriaLabel = selected ? 'DeSelect item' : 'Select item';

  let selectionIcon = null;
  if (selectable) {
    selectionIcon = selected ? (
      <CheckBoxIcon className="text-green-500" />
    ) : (
      <CheckBoxOutlineBlankIcon className="text-white" />
    );
  }

  const inBoxCardClass = useMemo(() => {
    const itemOrder = orderDisplay.find(display => display.orderID === item.orderID);
    if (!itemOrder || itemOrder.box === null) { return '' };
    return 'bg-green-smoke-900'
  }, [orderDisplay, item.orderID]);

  const handleSelectionIconClick = useCallback(
    (ev: MouseEvent<HTMLDivElement>) => {
      ev.stopPropagation();
      if (itemData && selectable) {
        handleSelect(itemData.itemID);
      }
    },
    [itemData, handleSelect, selectable]
  );

  const handleSelectionIconKeyDown = useCallback(
    (ev: KeyboardEvent<HTMLDivElement>) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        handleSelectionIconClick(ev as any);
      }
    },
    [handleSelectionIconClick]
  );

  const cardContent = useMemo(() => {
    if (!itemData) { return null; }
    
    if (largeDisplay) {
      return (
        <div className={cn('flex min-w-0 flex-1 flex-col')}>
          <span className={cn('text-silver-100 md:text-md mb-2 text-sm font-semibold text-wrap')}>
            {itemData.itemName}
          </span>
          <div className={cn('flex min-w-0 flex-row flex-wrap gap-2 sm:gap-3')}>
            <Tags item={itemData} />
          </div>
        </div>
      );
    }
    
    return (
      <>
        <div className="absolute bottom-2 left-2 rounded-2xl bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">
          {itemData.itemQuantity}
        </div>
        {selectable && (
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
        )}
      </>
    );
  }, [
    largeDisplay,
    itemData,
    selectionIcon,
    selectionAriaLabel,
    handleSelectionIconClick,
    handleSelectionIconKeyDown,
    selectable,
  ]);

  const handleImageClick = useCallback(
    (ev?: SyntheticEvent) => {
      if (ev) {
        ev.stopPropagation();
      }
      if (itemData) {
        if (onImageClick) {
          onImageClick(itemData.imageUrl);
        } else {
          openFullscreen(itemData.imageUrl);
        }
      }
    },
    [onImageClick, itemData, openFullscreen]
  );

  const handleCardClick = useCallback(
    (ev: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
      ev.stopPropagation();
      if (!itemData) { return; }
      if (selectable) {
        handleSelect(itemData.itemID);
      } else if (onImageClick) {
        onImageClick(itemData.imageUrl);
      }
    },
    [selectable, handleSelect, itemData, onImageClick]
  );

  const cardClass = useMemo(() => cn(
    'relative flex flex-row gap-3 object-contain p-2 h-fit w-auto rounded-xl transition-all',
    'bg-green-smoke-800/60 hover:bg-green-smoke-800/80 active:bg-green-smoke-900/80 hover:scale-101 cursor-pointer',
    selectable && selected && 'brightness-90 opacity-70 ring-2 ring-green-950',
    inBoxCardClass
  ), [selectable, selected, inBoxCardClass]);

  if (!itemData) { return null; }

  return (
    <BasicContainer
      clickable={selectable}
      className={cn(cardClass, )}
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
        className={cn(
          'inline-block h-auto max-h-22 w-auto min-w-14 cursor-pointer object-contain transition-all hover:opacity-80 hover:brightness-40'
        )}
        onClick={handleImageClick}
        loading={imageLoading}
      />
      {cardContent}
    </BasicContainer>
  );
});
OrderCard.displayName = "OrderCard"

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default OrderCard;
