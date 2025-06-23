import { OrderData, OrderID, ItemData, ItemID, Order } from "../types";

const findOrderByID = (orders: OrderData[] | null, orderID: OrderID): OrderData | undefined => {
    return orders?.find(order => order.orderID === orderID);
};

const filterOrdersByLocation = (orders: OrderData[], location: string): OrderData[] => {
    if (!orders) return [];
    return orders
        .map((order: OrderData) => {
            const foundOrder = findOrderByID(orders, order.orderID);
            return {
                ...order,
                items: foundOrder?.items?.filter((item: ItemData) =>
                    item.itemLocation?.toLowerCase().includes(location.toLowerCase())
                ) || []
            };
        })
        .filter((order: OrderData) => order.items && order.items.length > 0);
};

const getItemKeys = (order: OrderData): ItemID[] => {
    if (!order) return [];
    return order.items.map((item: ItemData) => item.itemID);
};

const getOrderKeys = (orders: OrderData[]): Order[] => {
    if (!orders) return [];
    return orders.map((order: OrderData) => {
        return {
            order: order.orderID,
            retrievedItems: [],
            unretrievedItems: getItemKeys(order)
        };
    });
};

const findItemByID = (orders: OrderData[], orderID: OrderID, itemID: ItemID): ItemData | undefined => {
    const order = findOrderByID(orders, orderID);
    return order?.items.find(item => item.itemID === itemID);
};

export { findOrderByID, filterOrdersByLocation, getItemKeys, getOrderKeys, findItemByID }