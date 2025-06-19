import React from "react";
import Header from "./header/Header";
import CardPicker from "./body/CardPicker";
import { useEffect, useMemo, memo, useState } from "react";
import { getOrders, filterOrdersByLocation } from "./shopifyQuery";
import { useOrders, useOrderDisplay, useBoxOrders } from "./context/useContext";

const App: React.FC = () => {
    const { orders, setOrders } = useOrders();
    const { setOrderDisplay } = useOrderDisplay();
    const { setBoxOrders } = useBoxOrders();
    const [location, setLocation] = useState("Oakville");

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await getOrders();
                console.log(data);
                setOrders(data);
            } catch (err) {
                console.error("Error loading orders:", err);
            }
        };
        loadOrders();
    }, [setOrders]);

    const filteredOrders = useMemo(() => filterOrdersByLocation(orders || [], location), [orders, location]);

    useEffect(() => {
        if (!orders) return;
        setOrderDisplay(filteredOrders);
        const IDs = filteredOrders
            .slice(0, 20)
            .map(order => order.orderNumber);
        console.log(IDs);
        setBoxOrders(IDs);
    }, [filteredOrders, setOrderDisplay, orders]);

    return (
        <div className={"min-h-screen relative overflow-hidden"}>
            <div className={"absolute inset-0 w-full h-full bg-water-flow z-0"} />
            <div className={"flex flex-col p-5 md:h-[calc(100vh-2.5rem)] w-full gap-4 select-none relative z-10"}>
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
