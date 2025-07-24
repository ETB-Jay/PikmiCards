// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { twMerge } from 'tailwind-merge';

import { OrderData, ItemData, ItemID, Order, Status, StoreLocations, Item } from '../types';

// ─ Utility Functions ────────────────────────────────────────────────────────────────────────────

/**
 * @description Finds an order by its ID and location.
 * @param orderDataList - The list of orders to search through
 * @param order - The order to search for
 * @param storeLocation - The fulfillment location to match
 * @returns The matching OrderData or undefined if not found
 */
const findOrderDataByOrder = (
  orderDataList: OrderData[] | null,
  order: Order,
  storeLocation: StoreLocations
): OrderData | undefined =>
  orderDataList?.find(
    (orderData) =>
      orderData.orderID === order.orderID && orderData.fulfillmentLocation.includes(storeLocation)
  );

/**
 * @description Gets all item IDs for an order.
 * @param order - The order to extract item IDs from
 * @returns Array of item IDs
 */
const getItemKeys = (order: OrderData): ItemID[] =>
  order.items.map((item: ItemData) => item.itemID);

/**
 * @description Converts a list of OrderData to Order objects with item keys.
 * @param orders - The list of orders to convert
 * @returns Array of Order objects with default status and box values
 */
const getOrderKeys = (orders: OrderData[]): Order[] =>
  orders.map((order: OrderData) => ({
    orderID: order.orderID,
    location: order.items[0]?.itemLocation,
    box: null,
    items: order.items.map((item) => ({
      itemID: item.itemID,
      itemBrand: item.itemBrand,
      orderID: order.orderID,
      set: item.itemSet ?? '',
      status: 'unPicked' as Status,
      box: null,
    })),
  }));

/**
 * @description Finds an item by its item ID, with optional filtering by order and location.
 * @param orders - The list of orders to search through
 * @param itemID - The item ID to search for
 * @param order - Optional specific order to match
 * @param location - Optional location of the order
 * @returns The matching ItemData or undefined if not found
 */
const findItemDataByID = (
  orders: OrderData[],
  itemID: string,
  order?: Order,
  location?: StoreLocations
): ItemData | undefined => {
  if (order && location) {
    const orderData = findOrderDataByOrder(orders, order, location);
    return orderData?.items.find((item) => item.itemID === itemID);
  }

  for (const orderData of orders) {
    const found = orderData.items.find((item) => item.itemID === itemID);
    if (found) {
      return found;
    }
  }

  return undefined;
};

/**
 * @description Merges TailwindCSS classes together using tailwind-merge.
 * @param inputs - The class strings to merge, filters out falsy values
 * @returns The merged Tailwind classes as a single string
 */
const cn = (...inputs: (string | undefined | null | false)[]): string => {
  return twMerge(...inputs.filter(Boolean));
};

/** @description returnLarger compares two Items by set, then box, then itemID */
function returnLarger(item1: Item, item2: Item): number {
  const keys: (keyof Item)[] = ['set', 'box', 'itemID'];
  for (const key of keys) {
    const value1 = item1[key];
    const value2 = item2[key];
    if (value1 == null && value2 != null) {
      return 1;
    }
    if (value1 != null && value2 == null) {
      return -1;
    }
    if (value1! > value2!) {
      return 1;
    }
    if (value1! < value2!) {
      return -1;
    }
  }
  return 0;
}

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export { findOrderDataByOrder, getItemKeys, getOrderKeys, findItemDataByID, cn, returnLarger };
