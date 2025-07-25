// ─ Imports ───────────────────────────────────────────────────────────────────────────────────────
import RefreshIcon from "@mui/icons-material/Refresh";
import { memo, ReactElement } from "react";

import Button from "../../components/ui/Button";
import { useOrders } from "../../context/useContext";

/** @description RefreshButton displays a button to refresh the order list */
const RefreshButton = memo((): ReactElement => {
  const { fetchOrders } = useOrders();

  return (
    <Button
      label="Refresh"
      icon={<RefreshIcon fontSize="small" />}
      onAction={() => {
        fetchOrders();
      }}
    />
  );
});

RefreshButton.displayName = "RefreshButton";

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────
export default RefreshButton;
