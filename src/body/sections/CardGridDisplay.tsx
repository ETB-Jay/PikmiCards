import React from 'react';
import { useBoxOrders, useOrders } from '../../context/useContext';
import { useMemo, memo, useCallback } from 'react';
import { Order } from '../../types';
import { useConfirm } from '../../context/useContext';
import { findOrderByID } from '../../context/orderFunctions';

const CustomerInfoBadge: React.FC<React.PropsWithChildren<object>> = ({ children }) => (
    <p className="bg-black/50 px-1.5 py-0.5 font-semibold rounded-2xl text-white ring-2 ring-black">{children}</p>
);

interface CustomerInfoProps {
    order: Order;
    index: number;
}

const CustomerInfo = memo(({ order, index }: CustomerInfoProps) => {
    const { openConfirm } = useConfirm();
    const { orders } = useOrders();

    const orderData = findOrderByID(orders, order.order);

    if (!orderData) {
        return;
    }

    return (
        <div
            className="relative flex flex-col h-full w-full cursor-pointer rounded-lg shadow border-2 border-green-950 text-green-100 bg-green-smoke-600/60 hover:bg-green-smoke-600/70 backdrop-blur-md transition-all overflow-hidden text-xs sm:text-sm duration-150 hover:shadow-lg hover:scale-[1.01]"
            onClick={e => { e.stopPropagation(); openConfirm(order); }}
        >
            <div className='flex flex-col h-full justify-center p-2'>
                <div className='flex flex-row flex-wrap gap-3 items-center min-w-0 text-xs'>
                    <p className="font-semibold max-w-2/9 md:max-w-1/3 truncate">{orderData.customerName}</p>
                    <CustomerInfoBadge><img src="/Cart.svg" alt="Box" className="w-4 h-4 inline-block align-middle mr-1" />{index}</CustomerInfoBadge>
                    <CustomerInfoBadge><img src="/Picked.svg" alt="Picked" className="w-4 h-4 inline-block align-middle mr-1" />{order.retrievedItems.length}</CustomerInfoBadge>
                    <CustomerInfoBadge><img src="/NotPicked.svg" alt="Not Picked" className="w-4 h-4 inline-block align-middle mr-1" />{order.unretrievedItems.length}</CustomerInfoBadge>
                </div>
            </div>
        </div>
    );
});

CustomerInfo.displayName = 'CustomerInfo';

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
        <div className="flex-1 rounded-lg grid grid-cols-1 p-2 sm:grid-cols-2 gap-2 auto-rows-fr h-full w-full overflow-y-auto">
            {ordersToDisplay}
        </div>
    );
});

CardGridDisplay.displayName = 'CardGridDisplay';

export default CardGridDisplay;
