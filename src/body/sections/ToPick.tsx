// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import React, { useMemo, memo, useCallback } from 'react';

import { useOrderDisplay, useOrders } from '../../context/useContext';
import { ScrollContainer } from '../../components/containers';
import OrderCardToPick from '../../components/OrderCardToPick';
import { ItemData, ItemID, OrderID } from '../../types';
import { findItemByID } from '../../context/orderFunctions';
import { Button } from '../../components/modal';
import { returnLarger } from '../../components/sort';

/**
 * ToPick section component.
 * Displays a list of items that need to be picked, with selection and confirmation controls.
 *
 * @description ToPick is a memoized component that renders the list of items to pick and confirmation controls.
 */
const ToPick = (): React.ReactElement => {
  const { orders } = useOrders();
  const { orderDisplay, selectedItems, handleConfirm, handleClear, handleSelect } =
    useOrderDisplay();

    return (
      <>
        <Button
          onClick={handleConfirm}
          className="w-fit cursor-pointer rounded-full bg-teal-600/50 px-3 py-1.5 text-xs font-medium text-white shadow ring-2 ring-teal-900 transition-all duration-150 hover:bg-teal-700/50 active:bg-teal-800/50"
          label={`${CONFIRM_BUTTON_TEXT} ${selectedItems.size} ${itemLabel}`}
        />
        <Button
          onClick={handleClear}
          className="w-fit cursor-pointer rounded-full bg-red-500/50 px-3 py-1.5 text-xs font-medium text-white shadow ring-2 ring-red-900 transition-all duration-150 hover:bg-red-600/50 active:bg-red-700/50"
          label={CLEAR_BUTTON_TEXT}
        />
      </>
    );
  }, [selectedItems.size, handleConfirm, handleClear, itemLabel]);

  return (
    <div className="flex h-full w-full flex-col">
      <ScrollContainer className="flex-1 overflow-y-auto px-2 py-1">
        {cards}
      </ScrollContainer>
      {confirmButton && (
        <div className="bg-green-smoke-800/80 border-black-olive-900 sticky bottom-0 z-20 flex flex-row justify-center gap-3 rounded-b-2xl border-t p-2 shadow-lg backdrop-blur-md">
          {confirmButton}
        </div>
      )}
    </div>
  );
};

ToPick.displayName = 'ToPick';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default memo(ToPick);
