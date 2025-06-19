import React, { useMemo, useState, useCallback } from "react";
import { OrdersContext, FullscreenContext, OrderDisplayContext, BoxOrdersContext, ConfirmContext } from "./Context";
import FullscreenModal from "../prompts/FullscreenModal";
import { Order, Item } from "../types";
import { useBoxOrders } from "./useContext";
import ConfirmModal from "../prompts/ConfirmModal";

interface ProviderProps {
    children: React.ReactNode;
}

const OrdersProvider: React.FC<ProviderProps> = ({ children }) => {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const value = useMemo(() => ({ orders, setOrders }), [orders]);
    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

const OrderDisplayProvider: React.FC<ProviderProps> = ({ children }) => {
    const [orderDisplay, setOrderDisplay] = useState<Order[] | null>(null);
    const [selectedItems, setSelectedItems] = useState<Set<Item>>(new Set());
    const { boxOrders: rawBoxOrders, setBoxOrders } = useBoxOrders();
    const boxOrders = rawBoxOrders ?? [];

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
            console.log("SelectedItems Set:", newSet);
            return newSet;
        });
    }, []);

    const handleConfirm = useCallback(() => {
        console.log("Confirming items:", Array.from(selectedItems));
        let newOrderDisplay = orderDisplay ? [...orderDisplay] : [];
        let newBoxOrders = [...boxOrders];
        selectedItems.forEach((item) => {
            const isBoxed = boxOrders.includes(item.orderNumber);
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
                // TODO: Add into QueuePile Context
            }
        });
        setOrderDisplay(newOrderDisplay);
        console.log(newBoxOrders);
        setBoxOrders(newBoxOrders);
        setSelectedItems(new Set());
    }, [selectedItems, boxOrders, orderDisplay, setOrderDisplay, setBoxOrders]);

    const value = useMemo(() => ({
        orderDisplay,
        setOrderDisplay,
        selectedItems,
        setSelectedItems,
        handleSelect,
        handleConfirm
    }), [orderDisplay, selectedItems, handleSelect, handleConfirm]);

    return <OrderDisplayContext.Provider value={value}>{children}</OrderDisplayContext.Provider>;
};

const BoxOrdersProvider: React.FC<ProviderProps> = ({ children }) => {
    const [boxOrders, setBoxOrdersState] = useState<string[]>([]);
    const setBoxOrders = (updater: string[] | ((prev: string[]) => string[])) => {
        setBoxOrdersState(prev =>
            typeof updater === "function" ? (updater as (prev: string[]) => string[])(prev) : updater
        );
    };
    const value = useMemo(() => ({ boxOrders, setBoxOrders }), [boxOrders]);
    return <BoxOrdersContext.Provider value={value}>{children}</BoxOrdersContext.Provider>;
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

const Providers: React.FC<ProviderProps> = ({ children }) => {
    return (
        <ConfirmProvider>
            <OrdersProvider>
                <BoxOrdersProvider>
                    <OrderDisplayProvider>
                        <FullscreenProvider>
                            {children}
                        </FullscreenProvider>
                    </OrderDisplayProvider>
                </BoxOrdersProvider>
            </OrdersProvider>
        </ConfirmProvider>
    );
};

export default Providers;
