/**
 * @description Represents a Shopify item with its associated data.
 *
 * @property {string} itemID - The item's ID
 * @property {string} orderID - The order ID the item is a part of
 * @property {string} itemName - The item's name
 * @property {number} itemQuantity - The quantity of this item desired
 * @property {string} itemLocation - The location where this item should be picked
 * @property {string | null} itemSet - The set this item belongs to. 
 * @property {string | null} itemRarity - The rarity of this item. 
 * @property {string | null} itemPrinting - The condition of this item.
 * @property {string} imageUrl - The URL to the item's image
 */
interface ItemData {
    itemID: ItemID;
    orderID: OrderID;
    itemName: string;
    itemQuantity: number;
    itemLocation: string;
    itemSet: string | null;
    itemRarity: string| null;
    itemPrinting: string | null;
    imageUrl: string;
}

/**
 * @description Represents a customer order containing one or more items.
 *
 * @property {string} orderID - The unique identifier for the order.
 * @property {string | null} customerName - The name of the customer who placed the order. 
 * @property {string} deliveryMethod - The delivery method for the order.
 * @property {Item[]} items - The list of items included in the order.
 */
interface OrderData {
    orderID: OrderID;
    orderNumber: string;
    customerName: string | null;
    numberItems: number;
    deliveryMethod: string | null;
    items: ItemData[];
}

/**
 * @description Represents an order when represented inside a box
 * 
 * @property {string} orderID - The unique identifier for the order
 * @property {string[]} itemIDs - the itemIDs inside the order
 */
interface Order {
    order: OrderID;
    retrievedItems: ItemID[];
    unretrievedItems: ItemID[];
}

type OrderID = string
type ItemID = string

export type {
    OrderData, ItemData, Order, OrderID, ItemID
}; 
