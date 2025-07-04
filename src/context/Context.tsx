import { createContext } from 'react';
import { Order, OrderData, ItemID, Location } from '../types';

/** @description OrdersContextType stores the fetched order data from Shopify */
interface OrdersContextType {

    /** @description The list of all orders */
    orders: OrderData[];

    /** 
     * @description Function that updates the order state
     * @param order - a list of OrderData
    */
    setOrders: (order: OrderData[]) => void;
    /** @description Function that pulls data from the Shopify server backend */
    fetchOrders: () => Promise<void>;

    /** 
     * @description Function that converts OrderData[] to Order[]
     * @param orders - a list of OrderData
     * @param location -  the currently selected location
     * @returns a list of Order that match orders
     */
    fromOrderDataToOrder: (order: OrderData[], location: Location) => Order[];

};

const OrdersContext = createContext<OrdersContextType>({
    orders: [],
    setOrders: () => { },
    fetchOrders: async () => { },
    fromOrderDataToOrder: () => [],
});

OrdersContext.displayName = 'OrdersContext';


/** @description OrderDisplayContextType manages the displayed orders */
interface OrderDisplayContextType {

    /** @description The list of all displayed orders */
    orderDisplay: Order[];

    /** 
     * @description Function to update orderDisplay 
     * @param orders - A list of Order
    */
    setOrderDisplay: (orders: Order[]) => void;

    /** @description A set containing the selected ItemIDs */
    selectedItems: Set<ItemID>;

    /** 
     * @description Function to update selectedItems 
     * @param selectedItems - A set of ItemID
    */
    setSelectedItems: (Items: Set<ItemID>) => void;

    /** 
     * @description Function to select or deselect an item by its ID.
     * @param itemID - The selected itemID
     */
    handleSelect: (itemID: ItemID) => void;

    /** @description Function to confirm the current selection. */
    handleConfirm: () => void;

    /** @description Function to clear the current selection. */
    handleClear: () => void;

}
const OrderDisplayContext = createContext<OrderDisplayContextType>({
    orderDisplay: [],
    setOrderDisplay: () => { },
    selectedItems: new Set(),
    setSelectedItems: () => { },
    handleSelect: () => { },
    handleConfirm: () => { },
    handleClear: () => { }
});
OrderDisplayContext.displayName = 'OrderDisplayContext';


/** @description FullscreenContextType manages the fullscreen mdoal state */
interface FullscreenContextType {
    /**
     * @description Function to open the fullscreen modal with a given imageURL
     * @param imageURL - a valid imageURL
     */
    openFullscreen: (imageUrl: string) => void;
    /**
     * @description Function to close the fullscreen modal. Wipes the current imageURL
     * @requires openFullscreen was called before
     */
    closeFullscreen: () => void;
}
const FullscreenContext = createContext<FullscreenContextType>({
    openFullscreen: () => { },
    closeFullscreen: () => { }
});
FullscreenContext.displayName = 'FullscreenContext';


/** @description ConfirmContextType manages the confirm modal state */
interface ConfirmContextType {
    /** @description The order currently being confirmed, or null if none */
    confirm: Order | null;
    /** 
     * @description Function to open the confirmation modal with a given order
     * @param order The order to be displayed 
     */
    openConfirm: (order: Order) => void;
    /** @description Function to confirm the confirmation modal. Calls closeConfirm to close the order after*/
    confirmConfirm: () => void;
    /** @description Function to close the confirmation modal. Wipes the current order */
    closeConfirm: () => void;
}
/**
 * React context for confirmation modal state and actions.
 */
const ConfirmContext = createContext<ConfirmContextType>({
    confirm: null,
    openConfirm: () => { },
    confirmConfirm: () => { },
    closeConfirm: () => { },
});
ConfirmContext.displayName = 'ConfirmContext';

// Location context for global location state
interface LocationContextType {
    location: Location;
    setLocation: (location: Location) => void;
}
const LocationContext = createContext<LocationContextType>({
    location: 'Oakville',
    setLocation: () => {},
});
LocationContext.displayName = 'LocationContext';

export type { OrdersContextType, OrderDisplayContextType, FullscreenContextType, ConfirmContextType };
export { OrdersContext, OrderDisplayContext, FullscreenContext, ConfirmContext, LocationContext };