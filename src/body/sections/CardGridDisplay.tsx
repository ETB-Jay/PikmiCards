import { useBoxOrders, useOrders } from "../../context/useContext";
import { useMemo, memo, useCallback } from "react";
import { Order, OrderData } from "../../types";
import { useConfirm } from "../../context/useContext";
import { findOrderByID } from "../../context/orderFunctions";

interface CustomerInfoProps {
    order: Order;
    index: number;
}

const CustomerInfo = memo(({ order, index }: CustomerInfoProps) => {
    const { openConfirm } = useConfirm()
    const { orders } = useOrders()

    const orderData = findOrderByID(orders, order.order)

    if (!orderData) {
        return;
    }

    const deliveryBackground = useCallback((order: OrderData): {bg: string, hover: string, border: string, text: string} => {
        const delivery = order.deliveryMethod;
        if (delivery === "In-Store Pick-up Oakville") {
            return { bg: "bg-brown-200", hover: "hover:bg-brown-400", border: "border-brown-100", text: "text-brown-900" };
        } else if (delivery === "In-Store Pick-up Newmarket") {
            return { bg: "bg-black-olive-200", hover: "hover:bg-black-olive-400", border: "border-black-olive-100", text: "text-black-olive-900" };
        } else {
            return { bg: "bg-sandy-brown-200", hover: "hover:bg-sandy-brown-400", border: "border-brown-100", text: "text-sandy-brown-900" };
        }
    }, []);

    const cardClass = useMemo(() => {
        const { bg, hover, border, text } = deliveryBackground(orderData);
        return `relative flex flex-col h-full w-full min-w-0 cursor-pointer rounded-lg p-1 shadow border ${bg} ${hover} ${border} ${text} transition-all overflow-hidden text-xs sm:text-sm transition-colors duration-150 hover:shadow-lg hover:scale-[1.01]`;
    }, [order, deliveryBackground]);

    return (
        <div className={cardClass} onClick={e => { e.stopPropagation(); openConfirm(order); }}>
            <div className='flex flex-col h-full justify-between'>
                <div className='flex flex-row flex-wrap gap-2 items-center p-1 min-w-0 text-xs'>
                    <p className="font-semibold max-w-1/3 truncate">{orderData.customerName}</p>
                    <p className="bg-black/20 px-2 py-0.5 font-semibold rounded-2xl border text-black">📦 {index}</p>
                    <p className="bg-black/20 px-2 py-0.5 font-semibold rounded-2xl border text-black">🏷️ {order.retrievedItems.length}</p>
                    <p className="bg-black/20 px-2 py-0.5 font-semibold rounded-2xl border text-black">📂 {order.unretrievedItems.length}</p>
                </div>
            </div>
        </div>
    );
});

CustomerInfo.displayName = "CustomerInfo";

const CardGridDisplay = memo(() => {
    const { boxOrders } = useBoxOrders();

    const renderOrder = useCallback((order: Order, index: number) => (
        <CustomerInfo
            key={order.order}
            order={order}
            index={index + 1}
        />
    ), []);

    const ordersToDisplay = useMemo(() =>
        boxOrders.map(renderOrder),
        [boxOrders, renderOrder]
    );

    return (
        <div className="flex-1 p-1 sm:p-2 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-2 auto-rows-fr h-full w-full overflow-y-auto">
            {ordersToDisplay}
        </div>
    );
});

CardGridDisplay.displayName = "CardGridDisplay";

export default CardGridDisplay;
