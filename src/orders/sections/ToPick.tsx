// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { useMemo, memo } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { useOrderDisplay } from '../../context/useContext';
import { ScrollContainer } from '../../components/containers';
import { Button, Empty } from '../../components/formComponents';
import OrderCard from '../../components/OrderCard';
import { Item } from '../../types';
import { cn } from '../../context/functions';

const CONFIRM_BUTTON_TEXT = 'Confirm';
const CLEAR_BUTTON_TEXT = 'Clear Items';

/**
 * @description ToPick is a memoized component that renders the list of items to pick and confirmation controls.
 */
const ToPick = (): React.ReactElement => {
  const { orderDisplay, selectedItems, handleConfirm, handleClear } = useOrderDisplay();

  const confirmButton = useMemo(() => {
    if (selectedItems.size === 0) { return null; }
    return (
      <>
        <Button
          icon={<div className='flex flex-row gap-2 text-center text-lg items-center justify-center'><CheckIcon />{selectedItems.size}</div>}
          onClick={handleConfirm}
          className={cn("w-fit cursor-pointer rounded-full bg-teal-600/50 px-3 py-1.5 text-xs font-medium text-white shadow ring-2 ring-teal-900 transition-all duration-150 hover:bg-teal-700/50 active:bg-teal-800/50")}
          label={`${CONFIRM_BUTTON_TEXT}`}
        />
        <Button
          icon={<ClearIcon />}
          onClick={handleClear}
          className={cn("w-fit cursor-pointer rounded-full bg-red-500/50 px-3 py-1.5 text-xs font-medium text-white shadow ring-2 ring-red-900 transition-all duration-150 hover:bg-red-600/50 active:bg-red-700/50")}
          label={CLEAR_BUTTON_TEXT}
        />
      </>
    );
  }, [selectedItems, handleConfirm, handleClear]);

  /**
   * @description returnLarger compares two Items by set, then box, then itemID
   */ function returnLarger(item1: Item, item2: Item): number {
    const keys: (keyof Item)[] = ['set', 'box', 'itemID'];
    for (const key of keys) {
      const value1 = item1[key];
      const value2 = item2[key];
      if (value1 == null && value2 != null) { return 1; }
      if (value1 != null && value2 == null) { return -1; }
      if (value1! > value2!) { return 1; }
      if (value1! < value2!) { return -1; }
    }
    return 0;
  }

  const DisplayItems = ({ items }: { items: Item[] }) => {
    return (items.length > 0 ? (
      items.map((item: Item) => (
        <OrderCard
          key={item.orderID + item.itemID + item.box}
          item={item}
          largeDisplay
          selectable
        />
      ))
    ) : (
      <Empty text='No Items to Pick' />
    ))
  };
  DisplayItems.displayName = 'DisplayItems'


  const items: Item[] = orderDisplay.flatMap((order) => order.items).filter(item => item.status === 'unPicked').sort(returnLarger);

  return (
    <div className={cn("flex flex-col w-full h-full")}>
      <ScrollContainer className={cn("flex-1 p-2 overflow-y-scroll")}>
        <DisplayItems items={items} />
      </ScrollContainer>
      {confirmButton && (
        <div className={cn("fixed top-1/3 right-0 md:sticky z-20 flex flex-row justify-center gap-3 p-2 shadow-lg bg-green-smoke-800/80 border-black-olive-900 rounded-2xl rounded-r-none md:rounded-b-2xl backdrop-blur-md")}>
          {confirmButton}
        </div>
      )}
    </div>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default memo(ToPick);
