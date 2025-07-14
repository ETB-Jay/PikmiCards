// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { useMemo, memo } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { useOrderDisplay } from '../../../context/useContext';
import { ScrollContainer } from '../../../components/containers';
import { Button } from '../../../components/formComponents';
import OrderCard from '../../components/OrderCard';
import { Item } from '../../../types';

const CONFIRM_BUTTON_TEXT = 'Confirm';
const CLEAR_BUTTON_TEXT = 'Clear Items';

/** @description ToPick is a memoized component that renders the list of items to pick and confirmation controls. */
const ToPick = (): React.ReactElement => {
  const { orderDisplay, selectedItems, handleConfirm, handleClear } = useOrderDisplay();

  const confirmButton = useMemo(() => {
    if (selectedItems.size === 0) { return null; }
    return (
      <>
        <Button
          icon={<CheckIcon />}
          onClick={handleConfirm}
          className="w-fit cursor-pointer rounded-full bg-teal-600/50 px-3 py-1.5 text-xs font-medium text-white shadow ring-2 ring-teal-900 transition-all duration-150 hover:bg-teal-700/50 active:bg-teal-800/50"
          label={`${CONFIRM_BUTTON_TEXT} ${selectedItems.size}`}
        />
        <Button
          icon={<ClearIcon />}
          onClick={handleClear}
          className="w-fit cursor-pointer rounded-full bg-red-500/50 px-3 py-1.5 text-xs font-medium text-white shadow ring-2 ring-red-900 transition-all duration-150 hover:bg-red-600/50 active:bg-red-700/50"
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
      if (value1! < value2!) { return -1;}
    }
    return 0;
  }

  const items: Item[] = orderDisplay.flatMap((order) => order.items).filter(item => item.status === 'unPicked').sort(returnLarger);

  return (
    <div className="flex h-full w-full flex-col">
      <ScrollContainer className="flex-1 overflow-y-scroll p-2">
        {items.map((item: Item) => (
          <OrderCard key={item.itemID + item.orderID} item={item} largeDisplay selectable />
        ))}
      </ScrollContainer>
      {confirmButton && (
        <div className="bg-green-smoke-800/80 border-black-olive-900 sticky bottom-0 z-20 flex flex-row justify-center gap-3 rounded-b-2xl border-t p-2 shadow-lg backdrop-blur-md">
          {confirmButton}
        </div>
      )}
    </div>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default memo(ToPick);
