import { useBoxOrders, useOrders } from "../../context/useContext";
import { useMemo, memo, useCallback, useContext } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Order } from "../../types";
import { useConfirm } from "../../context/useContext";
import { ModalContext } from "../../context/Context";

interface CustomerInfoProps {
    order: Order;
    index: number;
}

const CustomerInfo = memo(({ order, index }: CustomerInfoProps) => {
    const { openConfirm } = useConfirm();
    const { openModal } = useContext(ModalContext);

    const deliveryBackground = useCallback((order: Order): {bg: string, hover: string, border: string, text: string} => {
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
        const { bg, hover, border, text } = deliveryBackground(order);
        return `relative flex flex-col h-full w-full min-w-0 cursor-pointer rounded-lg p-1 shadow border ${bg} ${hover} ${border} ${text} transition-all overflow-hidden text-xs sm:text-sm transition-colors duration-150 hover:shadow-lg hover:scale-[1.02]`;
    }, [order, deliveryBackground]);

    return (
        <div className={cardClass} onClick={() => openModal(order)}>
            <div className='flex flex-col h-full justify-between'>
                <div className='flex flex-row flex-wrap gap-2 items-center p-1 min-w-0 text-xs'>
                    <p className="font-semibold max-w-1/3 truncate">{order.customerName}</p>
                    <p className="bg-black/20 px-2 py-0.5 font-semibold rounded-2xl border text-black">📦 {index}</p>
                    <p className="bg-black/20 px-2 py-0.5 font-semibold rounded-2xl border text-black">🏷️ {order.numberItems}</p>
                    <div className="flex gap-1 ml-auto flex-wrap min-w-0">
                        <button 
                            className='bg-green-400/20 border border-green-400/80 text-green-950 p-1 rounded-2xl hover:bg-green-500/30 cursor-pointer transition-colors duration-150 flex items-center justify-center'
                            onClick={e => { e.stopPropagation(); openConfirm(order); }}
                        >
                            <CheckIcon sx={{ fontSize: "1rem" }} />
                        </button>
                        <button 
                            className='bg-red-400/20 border border-red-400/80 text-red-950 p-1 rounded-2xl hover:bg-red-500/30 cursor-pointer transition-colors duration-150 flex items-center justify-center'
                            onClick={e => e.stopPropagation()}
                        >
                            <ClearIcon sx={{ fontSize: "1rem" }} />
                        </button>
                    </div>
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
        <div className="flex-1 p-1 sm:p-2 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-2 auto-rows-fr h-full w-full overflow-y-auto">
            {ordersToDisplay}
        </div>
    );
});

CardGridDisplay.displayName = "CardGridDisplay";

export default CardGridDisplay;
