// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { twMerge } from "tailwind-merge"

import { OrderData, ItemData, ItemID, Order, Status, Location } from '../types';

/**
 * @description Finds an order by its ID and location.
 * @param {OrderData[] | null} orderDataList - The list of orders.
 * @param {Order} order - The order to search for.
 * @param {Location} location - The fulfillment location.
 * @returns {OrderData | undefined} The matching OrderData or undefined.
 */
const findOrderDataByOrder = (orderDataList: OrderData[] | null, order: Order, location: Location): OrderData | undefined => {
  return orderDataList?.find((orderData) => {
    return (orderData.orderID === order.orderID &&
      orderData.fulfillmentLocation.includes(location))
  });
};

/**
 * @description Gets all item IDs for an order.
 * @param {OrderData} order - The order to extract item IDs from.
 * @returns {ItemID[]} Array of item IDs.
 */
const getItemKeys = (order: OrderData): ItemID[] => {
  return order.items.map((item: ItemData) => item.itemID);
};

/**
 * @description Converts a list of OrderData to Order objects with item keys.
 * @param {OrderData[]} orders - The list of orders.
 * @returns {Order[]} Array of Order objects.
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
 * @description Finds an item by its item ID, with optional filtering by order and location.
 * @param {OrderData[]} orders - The list of orders.
 * @param {string} itemID - The item ID to search for.
 * @param {Order} [order] - (Optional) The specific order to match.
 * @param {Location} [location] - (Optional) The location of the order.
 * @returns {ItemData | undefined} The matching ItemData or undefined.
 */
function findItemDataByID(
  orders: OrderData[],
  itemID: string,
  order?: Order,
  location?: Location
): ItemData | undefined {
  if (order && location) {
    const orderData = findOrderDataByOrder(orders, order, location);
    return orderData?.items.find((item) => item.itemID === itemID);
  }

  for (const orderData of orders) {
    const found = orderData.items.find((item) => item.itemID === itemID);
    if (found) { return found; }
  }

  return undefined;
}

/**
 * @description Merges TailwindCSS classes together.
 * @param {...(string | undefined | null | false)[]} inputs - The strings to merge.
 * @returns {string} The merged Tailwind classes.
 */
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(...inputs.filter(Boolean));
}


export { findOrderDataByOrder, getItemKeys, getOrderKeys, findItemDataByID, cn };
