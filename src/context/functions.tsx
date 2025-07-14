// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { OrderData, ItemData, ItemID, Order, Status, Location } from '../types';

/**
 * Finds an order by its ID.
 * @param orderDataList - The list of orders.
 * @param order - The order ID to search for.
 * @param location - The fulfillment Location
 * @returns The matching OrderData or undefined.
 */
const findOrderDataByOrder = (orderDataList: OrderData[] | null, order: Order, location: Location): OrderData | undefined => {
  return orderDataList?.find((orderData) => {
    return (orderData.orderID === order.orderID &&
      orderData.fulfillmentLocation.includes(location))
  });
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
      items: order.items.map((item) => ({
        itemID: item.itemID,
        orderID: order.orderID,
        set: item.itemSet ?? '',
        status: 'unPicked' as Status,
        box: null,
      })),
    };
  });
};

/**
 * Finds an item by its order and item ID.
 * @param orders - The list of orders.
 * @param orderID - The order ID.
 * @param itemID - The item ID.
 * @param location -  The location of the order
 * @returns The matching ItemData or undefined.
 */
const findItemByID = (
  orderDataList: OrderData[],
  order: Order,
  itemID: ItemID,
  location: Location
): ItemData | undefined => {
  const orderData = findOrderDataByOrder(orderDataList, order, location);
  return orderData?.items.find((item) => item.itemID === itemID);
};

export { findOrderDataByOrder, getItemKeys, getOrderKeys, findItemByID };
