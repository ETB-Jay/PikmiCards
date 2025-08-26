// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
/**
 * OrderData represents a Shopify Order with its associated data as received from Shopify's API.
 * @property orderID - A Shopify order's unique identifier
 * @property email - The associated customer's email address
 * @property phone - The associated customer's phone number
 * @property requiresShipping - If the order requires shopping
 * @property customerName - The associated customer's name
 * @property numberItems - The total number of items in the order
 * @property deliveryMethod - The order's delivery method
 * @property items - The list of ItemData
 * @property fulfillmentLocation - The location where the order is fulfilled
 * @property orderNumber - The Shopify order's number
 * @property paid - The payment status of the Shopify order.
 */
interface OrderData {
  orderID: OrderID;
  email: string;
  phone: string;
  requiresShipping: boolean;
  customerName: string | null;
  numberItems: number;
  deliveryMethod: string | null;
  items: ItemData[];
  fulfillmentLocation: StoreLocations;
  orderNumber: string;
  paid: string;
}

/**
 * ItemData represents a Shopify Item with its associated data as received from Shopify's API.
 * @property itemID - A Shopify items's unique identifier
 * @property orderID - The Shopify order that this item belongs to
 * @property itemName - The item's name
 * @property itemQuantity - The quantity of this item in the associated order
 * @property itemLocation - The item's current location
 * @property itemSet - The set the item belongs to (if any)
 * @property itemRarity - The rarity of the item (if any)
 * @property itemPrinting - The item's print (if any)
 * @property imageUrl - The item's image URL
 * @property price - The item's price in CAD
 */
interface ItemData {
  itemID: ItemID;
  orderID: OrderID;
  itemName: string;
  itemQuantity: number;
  itemLocation: StoreLocations;
  itemBrand: string | null;
  itemSet: string | null;
  itemRarity: string | null;
  itemPrinting: string | null;
  imageUrl: string;
  price: string | null;
}

/**
 * Order represents a Shopify Order's local state, including box assignment and item picking status.
 * @property orderID - Unique identifier for the order
 * @property location - Store location for the order
 * @property box - Box number assigned to the order (nullable if not boxed)
 * @property items - Array of Item objects representing the picking state of each item
 */
interface Order {
  orderID: OrderID;
  location: StoreLocations;
  box: number | null;
  items: Item[];
}

/**
 * Item represents a Shopify Item's local state, including picking status and box assignment.
 * @property itemID - Unique identifier for the item
 * @property orderID - The Shopify order that this item belongs to
 * @property status - Current picking status of the item ('unPicked', 'queue', or 'inBox')
 * @property set - Set or collection the item belongs to
 * @property box - Box number assigned to the item (null if not boxed)
 */
interface Item {
  itemID: ItemID;
  itemName: string;
  orderID: OrderID;
  itemRarity: string | null;
  itemBrand: string | null;
  status: Status;
  set: string;
  box: number | null;
}

/**
 * User represents a user in the system.
 * @property email - User's email address
 * @property password - User's password
 */
interface User {
  email: string;
  password: string;
}

/**
 * ConfirmResponse is a response sent back to Shopify after an action is confirmed.
 * @property employee - Name or identifier of the employee confirming the action
 * @property location - Store location where the confirmation took place
 */
interface ConfirmResponse {
  employee: string;
  location: StoreLocations;
}

/**
 * Filters is the list of Filters
 * @property boxMin - Minimum box number to filter by (null means no minimum)
 * @property boxMax - Maximum box number to filter by (null means no maximum)
 * @property game - The game/brand to filter by
 * @property set - The set name to filter by
 * @property rarity - Set of rarities to filter by
 */
interface Filters {
  boxMin: number | null;
  boxMax: number | null;
  game: string;
  set: string;
  rarity: Set<string>;
}

/**
 * GridDimensions is the dimensions of the grid
 * @property height - Height of the Grids
 * @property width - Width of the Grids
 */
interface GridDimensions {
  height: number;
  width: number;
}

// ─ Variables ────────────────────────────────────────────────────────────────────────────────────
/** OrderID is a unique identifier for an Order (string, typically Shopify order ID) */
type OrderID = string;

/** ItemID is a unique identifier for an Item (string, typically Shopify line item ID) */
type ItemID = string;

/**
 * StoreLocations represents the location details for where
 * an item or order is stored or fulfilled
 */
type StoreLocations = string;

/**
 * Status details the item's current status in the picking process.
 * - 'unPicked': Item has not been picked yet
 * - 'queue': Item is queued for boxing or further processing
 * - 'inBox': Item has been picked and placed in a box
 */
type Status = "unPicked" | "queue" | "inBox";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export type {
  OrderData,
  ItemData,
  Order,
  Item,
  ConfirmResponse,
  OrderID,
  ItemID,
  StoreLocations,
  Status,
  User,
  Filters,
  GridDimensions,
};
