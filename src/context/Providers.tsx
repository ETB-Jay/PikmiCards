import { ReactNode, useMemo, useState, useCallback } from "react";
import { OrdersContext, FullscreenContext, OrderDisplayContext, BoxOrdersContext, ConfirmContext, QueuePileContext } from "./Context";
import FullscreenModal from "../modals/FullscreenModal";
import { OrderData, ItemData, Order, OrderID, ItemID } from "../types";
import ConfirmModal from "../modals/ConfirmModal";
import { useBoxOrders, useQueuePile, useOrders } from "./useContext";

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

        selectedItems.forEach((itemID: ItemID) => {
            // Update boxOrders: remove from unretrieved, add to retrieved
            tempBoxOrders = tempBoxOrders.map(order => ({
                ...order,
                unretrievedItems: order.unretrievedItems.filter(id => id !== itemID),
                retrievedItems: order.unretrievedItems.includes(itemID)
                    ? [...order.retrievedItems, itemID]
                    : order.retrievedItems,
            }));

            // Update orderDisplay: remove from unretrieved, add to retrieved
            const orderIdx = tempOrderDisplay.findIndex(order => order.unretrievedItems.includes(itemID));
            if (orderIdx !== -1) {
                const order = { ...tempOrderDisplay[orderIdx] };
                order.unretrievedItems = order.unretrievedItems.filter(id => id !== itemID);
                order.retrievedItems = [...order.retrievedItems, itemID];
                tempOrderDisplay[orderIdx] = order;
            }
        });

        // After all updates, add to queue pile if not in any unretrievedItems
        selectedItems.forEach((itemID: ItemID) => {
            const stillInGrid = tempOrderDisplay.some(order => order.unretrievedItems.includes(itemID));
            if (!stillInGrid && !tempQueuePile.includes(itemID)) {
                tempQueuePile.push(itemID);
            }
        });

        setOrderDisplay(tempOrderDisplay);
        setQueuePile(tempQueuePile);
        setBoxOrders(tempBoxOrders);
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
    const [queuePile, setQueuePileState] = useState<string[]>([]);
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
    const { orders, findOrderByID } = useOrders();
    const openConfirm = useCallback((order: Order) => setConfirm(order), []);
    const closeConfirm = useCallback(() => setConfirm(null), []);
    const value = useMemo(() => ({ confirm, openConfirm, closeConfirm }), [confirm, openConfirm, closeConfirm]);
    const orderData = confirm ? findOrderByID(orders, confirm.order) : null;
    return <ConfirmContext.Provider value={value}>
        {children}
        {orderData && (
            <ConfirmModal
                order={orderData}
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
