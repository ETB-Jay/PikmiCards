// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';

import { useOrderDisplay, useOrders } from '../../context/useContext';
import { Button } from '../../components/formComponents';

/** @description RefreshButton displays a button to refresh the order list */
const RefreshButton = memo((): React.ReactElement => {
  const { fetchOrders } = useOrders();
  const { orderDisplay } = useOrderDisplay();

  return (
    <Button
      label="Refresh"
      icon={<RefreshIcon />}
      onClick={() => {
        fetchOrders();
      }}
      disabled={!orderDisplay}
    />
  );
});

RefreshButton.displayName = 'RefreshButton';

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default RefreshButton;
