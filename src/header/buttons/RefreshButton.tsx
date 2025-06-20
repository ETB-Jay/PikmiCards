import { useOrderDisplay, useOrders } from "../../context/useContext";
import { memo, useCallback } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, PromptText } from "../components";
import { getOrders } from "../../shopifyQuery";

const RefreshButton = memo(() => {
    const { setOrders } = useOrders();
    const { setOrderDisplay } = useOrderDisplay();

    const refresh = useCallback(async () => {
        try {
            setOrders(null);
            setOrderDisplay(null);
            const data = await getOrders();
            setOrders(data);
            setOrderDisplay(data);
        } catch (err) {
            return
        }
    }, [setOrders, setOrderDisplay]);

    return (
        <Button onClick={refresh}>
            <RefreshIcon />
            <PromptText label="Refresh" />
        </Button>
    );
});

RefreshButton.displayName = "RefreshButton";

export default RefreshButton;
