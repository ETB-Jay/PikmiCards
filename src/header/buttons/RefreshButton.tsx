import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, PromptText } from "../components";
import { useOrderDisplay, useOrders } from "../../context/useContext";
import { getOrders } from "../../shopifyQuery";
import { Order, Item } from "../../types";
import { memo, useCallback } from "react";

interface RefreshButtonProps {
    location: string;
}

const RefreshButton = memo(({ location }: RefreshButtonProps) => {
    const { setOrders } = useOrders();
    const { setOrderDisplay } = useOrderDisplay();

    const refresh = useCallback(async () => {
        try {
            setOrders(null);
            setOrderDisplay(null);
            const data = await getOrders();
            setOrders(data);
            
            const filteredOrders = data?.map((order: Order) => ({
                ...order,
                items: order.items?.filter((item: Item) =>
                    item.itemLocation?.toLowerCase().includes(location.toLowerCase())
                )
            })).filter((order: Order) => order.items && order.items.length > 0) || [];
            
            setOrderDisplay(filteredOrders);
        } catch (err) {
            console.error("Error loading orders:", err);
        }
    }, [setOrders, setOrderDisplay, location]);

    return (
        <Button onClick={refresh}>
            <RefreshIcon />
            <PromptText label="Refresh" />
        </Button>
    );
});

RefreshButton.displayName = "RefreshButton";

export default RefreshButton;
