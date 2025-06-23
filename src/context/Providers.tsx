import { ReactNode, useMemo, useState, useCallback } from "react";
import { OrdersContext, FullscreenContext, OrderDisplayContext, BoxOrdersContext, ConfirmContext, QueuePileContext } from "./Context";
import FullscreenModal from "../modals/FullscreenModal";
import { OrderData, ItemData, Order, OrderID, ItemID } from "../types";
import ConfirmModal from "../modals/ConfirmModal";
import { useBoxOrders, useQueuePile } from "./useContext";

interface ProviderProps {
    children: ReactNode;
}


const OrdersProvider = ({ children }: ProviderProps) => {
    const [orders, setOrders] = useState<OrderData[]>([]);

    const fetchOrders = async (): Promise<void> => {
        try {
            setOrders([])
            const response = await fetch("http://localhost:3001/api/orders");
            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }
            const orders = await response.json();
            setOrders(orders);
        } catch (error: unknown) {
            console.error("Error fetching orders:", error instanceof Error ? error.message : error);
            throw error;
        }
    };

    const findOrderByID = (orders: OrderData[] | null, orderID: OrderID): OrderData | undefined => {
        return orders?.find(order => order.orderID === orderID);
    };

    const filterOrdersByLocation = (orders: OrderData[], location: string): OrderData[] => {
        if (!orders) return [];
        return orders
            .map((order: OrderData) => {
                const foundOrder = findOrderByID(orders, order.orderID);
                return {
                    ...order,
                    items: foundOrder?.items?.filter((item: ItemData) =>
                        item.itemLocation?.toLowerCase().includes(location.toLowerCase())
                    ) || []
                };
            })
            .filter((order: OrderData) => order.items && order.items.length > 0);
    };

    const getItemKeys = useCallback((order: OrderData): ItemID[] => {
        if (!order) return []
        return order.items.map((item: ItemData) => { return item.itemID })
    }, [])

    const getOrderKeys = useCallback((orders: OrderData[]): Order[] => {
        if (!orders) return [];
        return orders.map((order: OrderData) => {
            return {
                order: order.orderID,
                retrievedItems: [],
                unretrievedItems: getItemKeys(order)
            }
        })
    }, [])

    const findItemByID = (orders: OrderData[], orderID: OrderID, itemID: ItemID): ItemData | undefined => {
        const order = findOrderByID(orders, orderID);
        return order?.items.find(item => item.itemID === itemID);
    };

    const value = useMemo(() => (
        { orders, setOrders, fetchOrders, filterOrdersByLocation, getOrderKeys, getItemKeys, findItemByID, findOrderByID }
    ), [orders, setOrders, fetchOrders, filterOrdersByLocation, getOrderKeys, getItemKeys, findItemByID, findOrderByID]);

    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};


const OrderDisplayProvider = ({ children }: ProviderProps) => {
    const { boxOrders, setBoxOrders } = useBoxOrders();
    const { queuePile, setQueuePile } = useQueuePile();
    const [orderDisplay, setOrderDisplay] = useState<Order[]>([]);
    const [selectedItems, setSelectedItems] = useState<Set<ItemID>>(new Set());

    const handleSelect = useCallback((itemID: ItemID) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemID)) {
                newSet.delete(itemID);
            } else {
                newSet.add(itemID);
            }
            return newSet;
        });
    }, []);

    const handleClear = useCallback(() => {
        setSelectedItems(new Set())
    }, [])

    const handleConfirm = useCallback(() => {
        let tempOrderDisplay = [...orderDisplay];
        let tempQueuePile = [...queuePile];
        let tempBoxOrders = [...boxOrders];

        const removeOrder = (orders: Order[], index: number, itemID: ItemID) => {
            const order = { ...orders[index] };
            order.unretrievedItems = order.unretrievedItems.filter(id => id !== itemID);
            if (!order.retrievedItems.includes(itemID)) {
                order.retrievedItems.push(itemID);
            }
            return order;
        }

        selectedItems.forEach((itemID: ItemID) => {
            // Remove from queuePile if present (do this first)
            const queueIndex = tempQueuePile.indexOf(itemID);
            if (queueIndex !== -1) {
                tempQueuePile.splice(queueIndex, 1);
            }
            const boxIndex = tempBoxOrders.findIndex(order => order.unretrievedItems.includes(itemID));
            if (boxIndex !== -1) {
                tempBoxOrders[boxIndex] = removeOrder(tempBoxOrders, boxIndex, itemID);
            } else if (!tempQueuePile.includes(itemID)) {
                tempQueuePile.push(itemID)
            }
            const displayIndex = tempOrderDisplay.findIndex(order => order.unretrievedItems.includes(itemID));
            if (displayIndex !== -1) tempOrderDisplay[displayIndex] = removeOrder(tempOrderDisplay, displayIndex, itemID);
        });

        console.log('setOrderDisplay', tempOrderDisplay);
        setOrderDisplay(tempOrderDisplay);
        console.log('setQueuePile', tempQueuePile);
        setQueuePile(tempQueuePile);
        console.log('setBoxOrders', tempBoxOrders);
        setBoxOrders(tempBoxOrders);
        console.log('setSelectedItems', new Set());
        setSelectedItems(new Set());
    }, [selectedItems, orderDisplay, queuePile, boxOrders, setOrderDisplay, setQueuePile, setBoxOrders, setSelectedItems]);

    const value = useMemo(() => ({
        orderDisplay,
        setOrderDisplay,
        selectedItems,
        setSelectedItems,
        handleSelect,
        handleConfirm,
        handleClear,
    }), [orderDisplay, selectedItems, handleSelect, handleClear, handleConfirm]);

    return <OrderDisplayContext.Provider value={value}>{children}</OrderDisplayContext.Provider>;
}


const BoxOrdersProvider = ({ children }: ProviderProps) => {
    const [boxOrders, setBoxOrdersState] = useState<Order[]>([]);

    const setBoxOrders = useCallback(
        (updater: Order[] | ((prev: Order[]) => Order[])) => {
            setBoxOrdersState(prev =>
                typeof updater === "function" ? (updater as (prev: Order[]) => Order[])(prev) : updater
            );
        },
        []
    );

    const value = useMemo(() => ({ boxOrders, setBoxOrders }), [boxOrders, setBoxOrders]);

    return <BoxOrdersContext.Provider value={value}>{children}</BoxOrdersContext.Provider>;
};


const QueuePileProvider = ({ children }: ProviderProps) => {
    const [queuePile, setQueuePileState] = useState<ItemID[]>([]);
    const setQueuePile = (updater: ItemID[] | ((prev: ItemID[]) => ItemID[])) => {
        setQueuePileState(prev => {
            const next = typeof updater === "function" ? (updater as (prev: ItemID[]) => ItemID[])(prev) : updater;
            return next;
        });
    };
    const value = useMemo(() => ({ queuePile, setQueuePile }), [queuePile]);
    return <QueuePileContext.Provider value={value}>{children}</QueuePileContext.Provider>;
};


const FullscreenProvider = ({ children }: ProviderProps) => {
    const [fullScreen, setFullScreen] = useState<string | null>(null);

    const openFullscreen = useCallback((imageUrl: string) => {
        setFullScreen(imageUrl);
    }, []);

    const closeFullscreen = useCallback(() => {
        setFullScreen(null);
    }, []);

    return (
        <FullscreenContext.Provider value={{ openFullscreen, closeFullscreen }}>
            {children}
            {fullScreen && (
                <FullscreenModal
                    image={fullScreen}
                    onClose={closeFullscreen}
                />
            )}
        </FullscreenContext.Provider>
    );
};

const ConfirmProvider: React.FC<ProviderProps> = ({ children }) => {
    const [confirm, setConfirm] = useState<Order | null>(null);
    const openConfirm = useCallback((order: Order) => setConfirm(order), []);
    const closeConfirm = useCallback(() => setConfirm(null), []);
    const value = useMemo(() => ({ confirm, openConfirm, closeConfirm }), [confirm, openConfirm, closeConfirm]);
    return <ConfirmContext.Provider value={value}>
        {children}
        {confirm && (
            <ConfirmModal
                order={confirm}
                onClose={closeConfirm}
            />
        )}
    </ConfirmContext.Provider>;
};

const Providers = ({ children }: ProviderProps) => {
    return (
        <OrdersProvider>
            <BoxOrdersProvider>
                <QueuePileProvider>
                    <OrderDisplayProvider>
                        <ConfirmProvider>
                            <FullscreenProvider>
                                {children}
                            </FullscreenProvider>
                        </ConfirmProvider>
                    </OrderDisplayProvider>
                </QueuePileProvider>
            </BoxOrdersProvider>
        </OrdersProvider>
    );
};

export default Providers;
