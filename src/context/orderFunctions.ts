// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { OrderData, OrderID, ItemData, ItemID, Order, Status } from '../types';

// ─ Utility Functions ─────────────────────────────────────────────────────────────────────────────────
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
 * Gets all item IDs for an order.
 * @param order - The order to extract item IDs from.
 * @returns Array of item IDs.
 */
const getItemKeys = (order: OrderData): ItemID[] => {
    return order.items.map((item: ItemData) => item.itemID);
};

/**
 * Converts a list of OrderData to Order objects with item keys.
 * @param orders - The list of orders.
 * @returns Array of Order objects.
 */
const getOrderKeys = (orders: OrderData[]): Order[] => {
    return orders.map((order: OrderData) => {
        return {
            orderID: order.orderID,
            location: order.items[0]?.itemLocation,
            box: null,
            items: order.items.map(item => ({
                itemID: item.itemID,
                orderID: order.orderID,
                status: 'unPicked' as Status,
                box: null
            }))
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
const findItemByID = (
    orders: OrderData[], 
    orderID: OrderID, 
    itemID: ItemID
): ItemData | undefined => {
    const order = findOrderByID(orders, orderID);
    return order?.items.find(item => item.itemID === itemID);
};

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export { findOrderByID, getItemKeys, getOrderKeys, findItemByID };
