import { useOrderDisplay, useOrders } from "../../context/useContext";
import { memo, useCallback } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, PromptText } from "../components";

const RefreshButton = memo(() => {
    const { fetchOrders } = useOrders();
    const { orderDisplay, setOrderDisplay } = useOrderDisplay();

    const refresh = useCallback(async () => {
        try {
            setOrderDisplay(null)
            await fetchOrders();
        } catch (err) {
            console.error("Error")
        }
    }, []);

    return (
        <Button onClick={refresh} disabled={!orderDisplay}>
            <RefreshIcon />
            <PromptText label="Refresh" />
        </Button>
    );
});

RefreshButton.displayName = "RefreshButton";

export default RefreshButton;
