import React, { useEffect, memo, useState } from "react";
import Header from "./header/Header";
import CardPicker from "./body/CardPicker";
import { getOrders, filterOrdersByLocation } from "./shopifyQuery";
import { useOrders, useOrderDisplay, useBoxOrders } from "./context/useContext";

const App: React.FC = () => {
    const { orders, setOrders } = useOrders();
    const { setOrderDisplay } = useOrderDisplay();
    const { setBoxOrders } = useBoxOrders();
    const [location, setLocation] = useState("Oakville");

    useEffect(() => {
        if (orders && orders.length > 0) return;
        const loadOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (err) {
                // Optionally handle error globally
            }
        };
        loadOrders();
    }, [orders, setOrders]);

    useEffect(() => {
        if (!orders) return;
        const filteredOrders = filterOrdersByLocation(orders, location);
        setOrderDisplay(filteredOrders);
        setBoxOrders(filteredOrders.slice(0, 20).map(order => order.orderNumber));
    }, [orders, location, setOrderDisplay, setBoxOrders]);

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center relative overflow-y-hidden">
            <div className="absolute flex content-center inset-0 w-full h-full bg-water-flow z-0" />
            <div className="flex flex-col items-center justify-center p-5 lg:h-[calc(100vh-3rem)] w-full gap-4 select-none relative z-10">
                <Header 
                    location={location} 
                    setLocation={setLocation} 
                />
                <CardPicker />
            </div>
        </div>
    );
};

export default memo(App);
