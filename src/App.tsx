import { useEffect, memo, useState } from "react";
import Header from "./header/Header";
import CardPicker from "./body/CardPicker";
import { useOrders, useOrderDisplay, useBoxOrders } from "./context/useContext";
import spaceship from "./assets/Spaceship.png";

const LoadingSpinner = memo(() => (
    <div className="flex flex-col items-center gap-4 w-full">
        <div className="relative w-1/2 h-10 rounded-full p-1 overflow-hidden bg-pulse-radial">
            <img
                src={spaceship}
                alt="Olimar Ship"
                className="absolute top-1/2 left-0 -translate-y-1/2 h-2/3 animate-spaceship"
            />
        </div>
        <span className="text-xl font-bold text-white drop-shadow-sm tracking-wide">Loading Orders...</span>
    </div>
));

const App = () => {
    const { orders, fetchOrders, filterOrdersByLocation, getOrderKeys } = useOrders();
    const { orderDisplay, setOrderDisplay } = useOrderDisplay();
    const { setBoxOrders } = useBoxOrders();
    const [location, setLocation] = useState("Oakville");

    useEffect(() => {
        const loadOrders = async () => {
            try {
                console.log(orders)
                await fetchOrders();
            } catch (err) {
                console.error("Error")
            }
        };
        loadOrders();
    }, []);

    useEffect(() => {
        if (!orders) return;
        const filteredOrders = filterOrdersByLocation(orders, location);
        const filteredOrderKeys = getOrderKeys(filteredOrders)
        setOrderDisplay(filteredOrderKeys);
        setBoxOrders(filteredOrderKeys.slice(0, 20));
    }, [orders]);

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center relative overflow-y-hidden">
            <div className="absolute flex content-center inset-0 w-full h-full bg-water-flow z-0" />
            {orderDisplay.length === 0 ?
                <LoadingSpinner /> :
                <div className="flex flex-col items-center justify-center p-5 lg:h-[calc(100vh-3rem)] w-full gap-4 select-none relative z-10">
                    <Header
                        location={location}
                        setLocation={setLocation}
                    />
                    <CardPicker />
                </div>
            }
        </div>
    );
};

export default memo(App);
