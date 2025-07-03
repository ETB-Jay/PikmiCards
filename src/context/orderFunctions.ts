import { OrderData, OrderID, ItemData, ItemID, Order } from '../types';

/**
 * Utility functions for manipulating and querying order and item data in PikmiCards.
 * Includes find, filter, and key extraction helpers.
 *
 * @module orderFunctions
 */

/**
 * Finds an order by its ID.
 * @param orders - The list of orders.
 * @param orderID - The order ID to search for.
 * @returns The matching OrderData or undefined.
 */
const findOrderByID = (orders: OrderData[] | null, orderID: OrderID): OrderData | undefined => {
    return orders?.find(order => order.orderID === orderID);
};

/**
 * Filters orders by item location.
 * @param orders - The list of orders.
 * @param location - The location string to filter by.
 * @returns Filtered list of orders with items at the given location.
 */
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

/**
 * Gets all item IDs for an order.
 * @param order - The order to extract item IDs from.
 * @returns Array of item IDs.
 */
const getItemKeys = (order: OrderData): ItemID[] => {
    if (!order) return [];
    return order.items.map((item: ItemData) => item.itemID);
};

/**
 * Converts a list of OrderData to Order objects with item keys.
 * @param orders - The list of orders.
 * @returns Array of Order objects.
 */
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

/**
 * Finds an item by its order and item ID.
 * @param orders - The list of orders.
 * @param orderID - The order ID.
 * @param itemID - The item ID.
 * @returns The matching ItemData or undefined.
 */
const findItemByID = (orders: OrderData[], orderID: OrderID, itemID: ItemID): ItemData | undefined => {
    const order = findOrderByID(orders, orderID);
    return order?.items.find(item => item.itemID === itemID);
};

export { findOrderByID, filterOrdersByLocation, getItemKeys, getOrderKeys, findItemByID };