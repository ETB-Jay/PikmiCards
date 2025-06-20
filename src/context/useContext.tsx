import { useContext } from "react";
import { OrdersContext, FullscreenContext, OrderDisplayContext, BoxOrdersContext, ConfirmContext, QueuePileContext } from "./Context";

const useOrders = () => {
    const context = useContext(OrdersContext);
    if (!context) {
        throw new Error("useOrders must be used in the OrdersProvider");
    }
    return context;
};

const useOrderDisplay = () => {
    const context = useContext(OrderDisplayContext);
    if (!context) {
        throw new Error("useOrderDisplay must be used in the OrderDisplayProvider");
    }
    return context;
};

const useFullscreen = () => {
    const context = useContext(FullscreenContext);
    if (!context) {
        throw new Error("useFullscreen must be used within a FullscreenProvider");
    }
    return context;
};

const useBoxOrders = () => {
    const context = useContext(BoxOrdersContext);
    if (!context) {
        throw new Error("useBoxOrders must be used in the BoxOrdersProvider");
    }
    return context;
};

const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error("useConfirm must be used in the ConfirmProvider");
    }
    return context;
};

const useQueuePile = () => {
    const context = useContext(QueuePileContext);
    if (!context) {
        throw new Error("useQueuePile must be used in the QueuePileProvider");
    }
    return context;
};

export { useOrders, useFullscreen, useOrderDisplay, useBoxOrders, useConfirm, useQueuePile };
