import { useEffect, memo, useState } from "react";
import Header from "./header/Header";
import CardPicker from "./body/CardPicker";
import { useOrders, useOrderDisplay, useBoxOrders } from "./context/useContext";
import spaceship from "./assets/Spaceship.png";
import { filterOrdersByLocation, getOrderKeys } from "./context/orderFunctions";
import { MainContainer } from "./components";

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

const App = memo(() => {
    const { orders, fetchOrders } = useOrders();
    const { orderDisplay, setOrderDisplay } = useOrderDisplay();
    const { setBoxOrders, boxOrders } = useBoxOrders();
    const [location, setLocation] = useState("Oakville");

    useEffect(() => {
        const loadOrders = async () => {
            try {
                await fetchOrders();
            } catch (err) {
                console.error("Error")
            }
        };
        loadOrders();
    }, []);

    useEffect(() => {
        if (orders.length === 0) return;
        const filteredOrders = filterOrdersByLocation(orders, location);
        const filteredOrderKeys = getOrderKeys(filteredOrders);
        const isSameOrderDisplay = orderDisplay.length === filteredOrderKeys.length && orderDisplay.every((v, i) => v.order === filteredOrderKeys[i].order);
        if (!isSameOrderDisplay) {
            setOrderDisplay(filteredOrderKeys);
        }
        const newBoxOrders = filteredOrderKeys.slice(0, 20);
        const isSameBoxOrders = boxOrders.length === newBoxOrders.length && boxOrders.every((v, i) => v.order === newBoxOrders[i].order);
        if (!isSameBoxOrders) {
            setBoxOrders(newBoxOrders);
        }
    }, [orders, location, filterOrdersByLocation, getOrderKeys, setOrderDisplay, setBoxOrders, orderDisplay, boxOrders]);

    return (
        <MainContainer>
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
        </MainContainer>
    );
});

export default App;
