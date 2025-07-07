/**
 * RefreshButton component for reloading orders from the server.
 * Used in the header for manual refresh.
 *
 * @module RefreshButton
 */
// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import React, { memo, useCallback } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';

import { useOrderDisplay, useOrders } from '../../context/useContext';
import { Button } from '../../components/modal';

/**
 * RefreshButton displays a button to refresh the order list.
 * @returns {JSX.Element}
 */
const RefreshButton = memo(() => {
  const { fetchOrders } = useOrders();
  const { orderDisplay, setOrderDisplay } = useOrderDisplay();

  const refresh = useCallback(async () => {
    try {
      setOrderDisplay([]);
      await fetchOrders();
    } catch { 
      // ignore
    }
  }, [fetchOrders, setOrderDisplay]);

  return (
    <>
      <Button
        label="Refresh"
        icon={<RefreshIcon />}
        onClick={() => { refresh(); }}
        disabled={!orderDisplay}
      />
    </>
  );
});

RefreshButton.displayName = 'RefreshButton';

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default RefreshButton;
