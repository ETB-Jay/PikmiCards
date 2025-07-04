import React, { useEffect, memo, useContext } from 'react';
import Header from '../header/Header';
import CardPicker from '../body/CardPicker';
import { useOrders, useOrderDisplay } from '../context/useContext';
import { MainContainer } from '../components/containers';
import { LocationContext } from '../context/Context';

/**
 * LoadingSpinner displays an animated loading indicator for orders.
 * @returns Loading Spinner component
 */
const LoadingSpinner = memo((): React.ReactElement => (
    <div className="flex flex-col items-center justify-center gap-4 h-full w-full">
        <div className="animate-float-spin">
            <div className="relative flex flex-row flex-nowrap items-center justify-center animate-fly-horizontal">
                <div className="spaceship-fire spaceship-fire-horizontal" />
                <img
                    src="/spaceship.png"
                    alt="Ship"
                    className="relative z-10 h-20 w-auto drop-shadow-xl"
                />
            </div>
        </div>
        <span className="text-xl font-bold text-green-smoke-900 drop-shadow-sm tracking-wide">
            Loading Orders
            <span className="loading-dots" />
        </span>
    </div>
));

/**
 * Pick is the main page for picking orders.
 * Handles order loading, filtering, and layout.
 * @returns Order Picking component
 */
const Pick = memo((): React.ReactElement => {
    const { orders, fetchOrders, fromOrderDataToOrder } = useOrders();
    const { orderDisplay, setOrderDisplay } = useOrderDisplay();
    const { location } = useContext(LocationContext);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                await fetchOrders();
            } catch (error) {
                console.error(`Failed to fetch orders ${error}`);
            }
        };
        loadOrders();
    }, []);

    useEffect(() => {
        if (orders.length === 0) return;
        const filteredOrders = fromOrderDataToOrder(orders, location);
        console.log(filteredOrders);
        console.log(location);
        if (filteredOrders) setOrderDisplay(filteredOrders);
    }, [orders, location]);

    return (
        <MainContainer>
            {orderDisplay.length === 0 ?
                <LoadingSpinner /> :
                <>
                    <Header />
                    <CardPicker />
                </>
            }
        </MainContainer>
    );
});

export default Pick;
