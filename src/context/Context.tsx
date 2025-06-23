import { createContext } from "react";
import { OrderData, Order, OrderID, ItemID, ItemData } from "../types";


interface OrdersContextType {
    orders: OrderData[];
    setOrders: (orders: OrderData[]) => void;
    fetchOrders: () => Promise<void>;
    filterOrdersByLocation: (orders: OrderData[], location: string) => OrderData[];
    getOrderKeys: (orders: OrderData[]) => Order[];
    getItemKeys: (order: OrderData) => ItemID[];
    findItemByID: (orders: OrderData[], orderID: OrderID, itemID: ItemID) => ItemData | undefined;
    findOrderByID: (orders: OrderData[] | null, orderID: OrderID) => OrderData | undefined;
}
const OrdersContext = createContext<OrdersContextType>({
    orders: [],
    setOrders: () => {},
    fetchOrders: async () => {},
    filterOrdersByLocation: () => [],
    getOrderKeys: () => [],
    getItemKeys: () => [],
    findItemByID: () => undefined,
    findOrderByID: () => undefined
});
OrdersContext.displayName = "OrdersContext";


interface OrderDisplayContextType {
    orderDisplay: Order[];
    setOrderDisplay: (orders: Order[]) => void;
    selectedItems: Set<ItemID>;
    setSelectedItems: (Items: Set<ItemID>) => void;
    handleSelect: (itemID: ItemID) => void;
    handleConfirm: () => void;
    handleClear: () => void;
}
const OrderDisplayContext = createContext<OrderDisplayContextType>({
    orderDisplay: [],
    setOrderDisplay: () => {},
    selectedItems: new Set(),
    setSelectedItems: () => {},
    handleSelect: () => {},
    handleConfirm: () => {},
    handleClear: () => {}
});
OrderDisplayContext.displayName = "OrderDisplayContext";


interface BoxOrdersContextType {
    boxOrders: Order[];
    setBoxOrders: (updater: Order[] | ((prev: Order[]) => Order[])) => void;
}
const BoxOrdersContext = createContext<BoxOrdersContextType>({
    boxOrders: [],
    setBoxOrders: () => { }
});
BoxOrdersContext.displayName = "BoxOrdersContext";


interface QueuePileContextType {
    queuePile: ItemID[];
    setQueuePile: (updater: ItemID[] | ((prev: ItemID[]) => ItemID[])) => void;
}
const QueuePileContext = createContext<QueuePileContextType>({
    queuePile: [],
    setQueuePile: () => { },
});
QueuePileContext.displayName = "QueuePileContext";


interface FullscreenContextType {
    openFullscreen: (imageUrl: string) => void;
    closeFullscreen: () => void;
}
const FullscreenContext = createContext<FullscreenContextType>({ openFullscreen: () => {}, closeFullscreen: () => {} });
FullscreenContext.displayName = "FullscreenContext";

interface ConfirmContextType {
    confirm: Order | null;
    openConfirm: (order: Order) => void;
    closeConfirm: () => void;
}
const ConfirmContext = createContext<ConfirmContextType>({ confirm: null, openConfirm: () => {}, closeConfirm: () => {} });
ConfirmContext.displayName = "ConfirmContext";


export {
    OrdersContext,
    FullscreenContext,
    OrderDisplayContext,
    BoxOrdersContext,
    ConfirmContext,
    QueuePileContext,
};
