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


  return (
    <Button
      label="Refresh"
      icon={<RefreshIcon />}
      onClick={() => {
        refresh();
      }}
      disabled={!orderDisplay}
      hideSmall
    />
  );
});

RefreshButton.displayName = 'RefreshButton';

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default RefreshButton;
