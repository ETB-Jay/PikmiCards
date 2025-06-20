/**
 * @description Represents a Shopify item with its associated data.
 *
 * @property {string} orderNumber - The item's order number
 * @property {string} itemName - The item's name
 * @property {number} itemQuantity - The quantity of this item desired
 * @property {string} itemLocation - The location where this item should be picked
 * @property {string | null} itemSet - The set this item belongs to. If the item is not associated with a set this field is null
 * @property {string | null} itemRarity - The rarity of this item. If the item does not have a rarity this field is null
 * @property {string | null} itemPrinting - The condition of this item. If the item does not different conditions this field is null
 * @property {string} imageUrl - The URL to the item's image
 */
interface Item {
    orderNumber: string;
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
 * @property {string} orderNumber - The order number as displayed to the customer.
 * @property {string | null} customerName - The name of the customer who placed the order, if available.
 * @property {string} deliveryMethod - The delivery method for the order
 * @property {Item[]} items - The list of items included in the order.
 */
interface Order {
    orderID: string;
    orderNumber: string;
    customerName: string | null;
    numberItems: number;
    deliveryMethod: string | null;
    items: Item[];
}

export type {
    Item,
    Order
}; 
