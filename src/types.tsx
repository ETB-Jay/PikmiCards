/**
 * @description OrderData represents a Shopify Order with its associated data.
 * 
 * @property {OrderID} orderID - The Order's unique identifier.
 * @property {string} customerName - The customer's name.
 * @property {string} deliveryMethod - The order's delivery method.
 * @property {number} numberItems - The number of individual items purchased by the Customer
 * @property {ItemData[]} items - The list of the items purchased by the customer.
*/
interface OrderData {
    orderID: OrderID;
    customerName: string | null;
    numberItems: number;
    deliveryMethod: string | null;
    items: ItemData[];
}

/**
 * @description ItemData represents a Shopify Item with its associated data.
 * 
 * @property {ItemID} itemID - The item's unique identifier.
 * @property {OrderID} orderID - The order the item belongs to.
 * @property {string} itemName - The item's display name.
 * @property {number} itemQuantity - The quantity of this item desired.
 * @property {Location} itemLocation - The location of the item.
 * @property {string | null} itemSet - The item's set. null if DNE.
 * @property {string | null} itemRarity - The item's rarity. null if DNE.
 * @property {string | null} itemPrinting - The items' condition. null if DNE
 * @property {string} imageURL - The url to the item's image.
 */
interface ItemData {
    itemID: ItemID;
    orderID: OrderID;
    itemName: string;
    itemQuantity: number;
    itemLocation: string;
    itemSet: string | null;
    itemRarity: string | null;
    itemPrinting: string | null;
    imageUrl: string;
}

/**
 * @description Order represents a Shopify Order's local state.
 * 
 * Note that Orders should be split by location prior to being put into this format
 * 
 * @property {OrderID} orderID - The order's unique identifier.
 * @requires orderID cannot have duplicates outside of the same order in a different location.
 * @property {Location} location - The order's location.
 * @property {number | null} box - The order's current box number. null otherwise.
 * @requires box must be a non-negative integer between 1 and 20 inclusive or null.
 * @property {ItemID[]} items - A list of items associated with the order
 */
interface Order {
    order: OrderID;
    location: Location;
    box: number | null;
    items: ItemID[];
}

/**
 * @description Item represents a Shopify Item's local state.
 * 
 * @property {ItemID} itemID - The item's unique identifier.
 * @property {Status} status - The item's current local status.
 */
interface Item {
    item: ItemID;
    status: Status;
}

/** 
 * @description OrderID is a unique identifier for an Order.
 * @requires OrderID no duplicates can be found.
*/
type OrderID = string;

/** 
 * @description ItemID is a unique identifier for an Item.
 * @requires ItemID no duplicates can be found.
*/
type ItemID = string;

/** @description Location details which store the item should be picked. */
type Location = 'Oakville' | 'Newmarket' | 'Guelph';

/** @description Status details the item's current status in the picking process. */
type Status = 'unPicked' | 'queue' | 'inBox';

export type {
    OrderData, ItemData, Order, Item, OrderID, ItemID
};
