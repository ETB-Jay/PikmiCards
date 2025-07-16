// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────────
/**
 * @description OrderData represents a Shopify Order with its associated data.
 */
interface OrderData {
  orderID: OrderID;
  customerName: string | null;
  numberItems: number;
  deliveryMethod: string | null;
  items: ItemData[];
  fulfillmentLocation: Location;
}

/**
 * @description ItemData represents a Shopify Item with its associated data.
 */
interface ItemData {
  itemID: ItemID;
  orderID: OrderID;
  itemName: string;
  itemQuantity: number;
  itemLocation: Location;
  itemSet: string | null;
  itemRarity: string | null;
  itemPrinting: string | null;
  imageUrl: string;
}

/**
 * @description Order represents a Shopify Order's local state.
 */
interface Order {
  orderID: OrderID;
  location: Location;
  box: number | null;
  items: Item[];
}

/**
 * @description Item represents a Shopify Item's local state.
 */
interface Item {
  itemID: ItemID;
  orderID: OrderID;
  status: Status;
  set: string;
  box: number | null;
}

/**
 * @description User is a user in the system.
 */
interface User {
  username: string;
  password: string;
}

/**
 * @description ConfirmResponse is a response back to Shopify.
 */
interface ConfirmResponse {
  employee: string;
  location: Location;
}

// ─ Types ─────────────────────────────────────────────────────────────────────────────────────────────
/**
 * @description OrderID is a unique identifier for an Order.
 */
type OrderID = string;

/**
 * @description ItemID is a unique identifier for an Item.
 */
type ItemID = string;

/**
 * @description Location details which store the item should be picked.
 */
type Location = 'Oakville' | 'Newmarket' | 'Guelph';

/**
 * @description Status details the item's current status in the picking process.
 */
type Status = 'unPicked' | 'queue' | 'inBox';

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export type { OrderData, ItemData, Order, Item, ConfirmResponse, OrderID, ItemID, Location, Status, User };
