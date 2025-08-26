// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { twMerge } from "tailwind-merge";

import { OrderData, ItemData, ItemID, Order, Status, StoreLocations, Item } from "../types";

// ─ Utility Functions ────────────────────────────────────────────────────────────────────────────

/**
 * Finds an order by its ID and location.
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
 * Gets all item IDs for an order.
 * @param order - The order to extract item IDs from
 * @returns Array of item IDs
 */
const getItemKeys = (order: OrderData): ItemID[] => order.items.map((item) => item.itemID);

/**
 * Converts a list of OrderData to Order objects with item keys.
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
      itemName: item.itemName,
      itemRarity: item.itemRarity,
      set: item.itemSet ?? "",
      status: "unPicked" as Status,
      box: null,
    })),
  }));

/**
 * Finds an item by its item ID, with optional filtering by order and location.
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
 * Merges TailwindCSS classes together using tailwind-merge.
 * @param inputs - The class strings to merge, filters out falsy values
 * @returns The merged Tailwind classes as a single string
 */
const cn = (...inputs: (string | undefined | null | false)[]): string => {
  return twMerge(...inputs.filter(Boolean));
};

/** returnLarger compares two Items by set, then rarity (custom order), then box, then itemID */
function returnLarger(item1: Item, item2: Item): number {
  // First compare by set
  const set1 = item1.set || "";
  const set2 = item2.set || "";
  if (set1 !== set2) {
    return set1.localeCompare(set2);
  }

  // Then compare by rarity with custom order
  const rarityOrder = ["Common", "Uncommon", "Rare", "Mythic"];
  const rarity1 = item1.itemRarity || "";
  const rarity2 = item2.itemRarity || "";

  if (rarity1 !== rarity2) {
    const index1 = rarityOrder.indexOf(rarity1);
    const index2 = rarityOrder.indexOf(rarity2);

    // If both rarities are in the defined order, sort by that order
    if (index1 !== -1 && index2 !== -1) {
      return index1 - index2;
    }

    // If only one is in the defined order, prioritize it
    if (index1 !== -1) {
      return -1;
    }
    if (index2 !== -1) {
      return 1;
    }

    // If neither is in the defined order, sort alphabetically
    return rarity1.localeCompare(rarity2);
  }

  // Finally compare by itemName
  const name1 = item1.itemName || "";
  const name2 = item2.itemName || "";
  return name1.localeCompare(name2);
}

/** splitByLast gets the content after the last occurence of a delimeter */
function getLast(str: string, delimiter: string) {
  const index = str.lastIndexOf(delimiter);
  if (index === -1) {
    return str;
  }
  return str.substring(index + delimiter.length);
}

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export {
  findOrderDataByOrder,
  getItemKeys,
  getOrderKeys,
  findItemDataByID,
  cn,
  returnLarger,
  getLast,
};
