import React, { useMemo, useState, useCallback } from "react";
import { OrdersContext, FullscreenContext, OrderDisplayContext, BoxOrdersContext, ConfirmContext, ModalContext, QueuePileContext } from "./Context";
import FullscreenModal from "../prompts/FullscreenModal";
import { Order, Item } from "../types";
import { useBoxOrders, useQueuePile } from "./useContext";
import ConfirmModal from "../prompts/ConfirmModal";
import UserBoxModal from "../prompts/UserBoxModal";

interface ProviderProps {
    children: React.ReactNode;
}

const OrdersProvider = ({ children }: ProviderProps) => {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const value = useMemo(() => ({ orders, setOrders }), [orders]);
    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

const OrderDisplayProvider = ({ children }: ProviderProps) => {
    const [orderDisplay, setOrderDisplay] = useState<Order[] | null>(null)
    const [selectedItems, setSelectedItems] = useState<Set<Item>>(new Set());
    const { boxOrders, setBoxOrders } = useBoxOrders();
    const { queuePile, setQueuePile } = useQueuePile();

    const handleSelect = useCallback((item: Item) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            let found: Item | undefined = undefined;
            for (let i of newSet) {
                if (i.orderNumber === item.orderNumber && i.itemName === item.itemName) {
                    found = i;
                    break;
                }
            }
            if (found) {
                newSet.delete(found);
            } else {
                newSet.add(item);
            }
            return newSet;
        });
    }, []);

    const handleClear = useCallback(() => {
        setSelectedItems(new Set())
    }, [])

    const handleConfirm = useCallback(() => {
        let newOrderDisplay = orderDisplay ? [...orderDisplay] : [];
        let newBoxOrders = [...(boxOrders || [])];
        let newQueuePile = [...queuePile];
        selectedItems.forEach((item) => {
            const isBoxed = boxOrders?.includes(item.orderNumber);
            newOrderDisplay = newOrderDisplay.map(order =>
                String(order.orderNumber) === item.orderNumber
                    ? { ...order, items: order.items.filter(i => i.itemName !== item.itemName) }
                    : order
            ).filter(order => order.items.length > 0);
            if (isBoxed) {
                if (!newBoxOrders.includes(String(item.orderNumber))) {
                    newBoxOrders.push(String(item.orderNumber));
                }
            } else {
                newQueuePile.push(item);
            }
        });
        setOrderDisplay(newOrderDisplay);
        setBoxOrders(newBoxOrders);
        setQueuePile(newQueuePile);
        setSelectedItems(new Set());
    }, [selectedItems, boxOrders, orderDisplay, setOrderDisplay, setBoxOrders, queuePile, setQueuePile]);

    const value = useMemo(() => ({
        orderDisplay,
        setOrderDisplay,
        selectedItems,
        setSelectedItems,
        handleSelect,
        handleConfirm,
        handleClear
    }), [orderDisplay, selectedItems, handleSelect, handleConfirm, handleClear]);

    return <OrderDisplayContext.Provider value={value}>{children}</OrderDisplayContext.Provider>;
};

const BoxOrdersProvider: React.FC<ProviderProps> = ({ children }) => {
    const [boxOrders, setBoxOrdersState] = useState<string[]>([]);
    const setBoxOrders = useCallback(
        (updater: string[] | ((prev: string[]) => string[])) => {
            setBoxOrdersState(prev =>
                typeof updater === "function" ? (updater as (prev: string[]) => string[])(prev) : updater
            );
        },
        []
    );
    const value = useMemo(() => ({ boxOrders, setBoxOrders }), [boxOrders, setBoxOrders]);
    return <BoxOrdersContext.Provider value={value}>{children}</BoxOrdersContext.Provider>;
};

const QueuePileProvider: React.FC<ProviderProps> = ({ children }) => {
    const [queuePile, setQueuePileState] = useState<Item[]>([]);
    const setQueuePile = (updater: Item[] | ((prev: Item[]) => Item[])) => {
        setQueuePileState(prev => {
            const next = typeof updater === "function" ? (updater as (prev: Item[]) => Item[])(prev) : updater;
            return next;
        });
    };
    const value = useMemo(() => ({ queuePile, setQueuePile }), [queuePile]);
    return <QueuePileContext.Provider value={value}>{children}</QueuePileContext.Provider>;
};

const FullscreenProvider: React.FC<ProviderProps> = ({ children }) => {
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

const ModalProvider: React.FC<ProviderProps> = ({ children }) => {
    const [modalData, setModalData] = useState<any>(null);
    const openModal = useCallback((order: any) => setModalData(order), []);
    const closeModal = useCallback(() => setModalData(null), []);
    const value = useMemo(() => ({ modalData, openModal, closeModal }), [modalData, openModal, closeModal]);
    return (
        <ModalContext.Provider value={value}>
            {children}
            <UserBoxModal open={!!modalData} order={modalData} onClose={closeModal} />
        </ModalContext.Provider>
    );
};

const Providers = ({ children }: ProviderProps) => {
    return (
        <OrdersProvider>
            <BoxOrdersProvider>
                <QueuePileProvider>
                    <OrderDisplayProvider>
                        <ConfirmProvider>
                            <FullscreenProvider>
                                <ModalProvider>
                                    {children}
                                </ModalProvider>
                            </FullscreenProvider>
                        </ConfirmProvider>
                    </OrderDisplayProvider>
                </QueuePileProvider>
            </BoxOrdersProvider>
        </OrdersProvider>
    );
};

export default Providers;
