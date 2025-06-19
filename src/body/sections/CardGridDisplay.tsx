import { useBoxOrders, useOrders } from "../../context/useContext";
import { useMemo, memo, useCallback } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Order } from "../../types";
import { useConfirm } from "../../context/useContext";

interface CustomerInfoProps {
    order: Order;
    index: number;
}

const CustomerInfo = memo(({ order, index }: CustomerInfoProps) => {
    const { openConfirm } = useConfirm();

    const deliveryBackground = useCallback((order: Order): string => {
        const delivery = order.deliveryMethod;
        if (delivery === "In-Store Pick-up Oakville") {
            return "bg-brown-200 border-brown-100 text-brown-900";
        } else if (delivery === "In-Store Pick-up Newmarket") {
            return "bg-black-olive-200 border-black-olive-100 text-black-olive-900";
        } else {
            return "bg-sandy-brown-200 border-brown-100 text-sandy-brown-900";
        }
    }, []);

    const cardClass = useMemo(() =>
        `relative grid rounded-lg h-full p-1 hover:shadow-xl text-xs transition-all border-2 ${deliveryBackground(order)}`,
        [order, deliveryBackground]
    );

    return (
        <div className={cardClass}>
            <div className='flex flex-col'>
                <div className='flex flex-row flex-wrap gap-2 '>
                    <p className="font-semibold truncate">{order.customerName}</p>
                    <p className="bg-black/20 px-1 rounded-2xl border-1 text-black">{order.orderNumber}</p>
                    <p className="bg-black/20 px-1 rounded-2xl border-1 text-black">{index}</p>
                    <button 
                        className='bg-green-400/20 border border-green-400/80 text-green-950 px-2 rounded-2xl hover:bg-green-200/40 cursor-pointer transition flex items-center justify-center'
                        onClick={() => openConfirm(order)}
                    >
                        <CheckIcon sx={{ fontSize: "1rem" }} />
                    </button>
                    <button className='bg-red-400/20 border border-red-400/80 text-red-950 px-2 rounded-2xl hover:bg-red-200/40 cursor-pointer transition flex items-center justify-center'>
                        <ClearIcon sx={{ fontSize: "1rem" }} />
                    </button>
                </div>
            </div>
        </div>
    );
});

CustomerInfo.displayName = "CustomerInfo";

const CardGridDisplay = memo(() => {
    const { boxOrders } = useBoxOrders();
    const { orders } = useOrders();

    const boxOrderObjects = useMemo(() => {
        if (!orders || !boxOrders) return [];
        const orderMap = new Map(orders.map(order => [order.orderNumber, order]));
        return boxOrders
            .map(orderNumber => orderMap.get(orderNumber))
            .filter(Boolean) as Order[];
    }, [orders, boxOrders]);

    const renderOrder = useCallback((order: Order, index: number) => (
        <CustomerInfo
            key={order.orderNumber}
            order={order}
            index={index + 1}
        />
    ), []);

    const ordersToDisplay = useMemo(() =>
        boxOrderObjects.map(renderOrder),
        [boxOrderObjects, renderOrder]
    );

    return (
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-1 auto-rows-fr h-full w-full overflow-y-scroll">
            {ordersToDisplay}
        </div>
    );
});

CardGridDisplay.displayName = "CardGridDisplay";

export default CardGridDisplay;
