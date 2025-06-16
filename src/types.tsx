interface Item {
    itemName: string;
    itemQuantity: number;
    itemLocation: string;
    itemStatus: string | null;
    imageUrl: string;
}

interface Order {
    orderId: string;
    orderNumber: string;
    customerName: string | null;
    deliveryMethod: string | null;
    items: Item[];
}

interface LocationContextType {
    location: string;
    setLocation: (location: string) => void;
}

interface DisplayContextType {
    display: "default" | "location";
    setDisplay: (display: "default" | "location") => void;
}

interface OrdersContextType {
    orders: Order[] | null;
    setOrders: (orders: Order[] | null) => void;
}

interface OrderDisplayContextType {
    orderDisplay: Order[] | null;
    setOrderDisplay: (orders: Order[] | null) => void;
}

interface FullscreenContextType {
    openFullscreen: (imageUrl: string) => void;
    closeFullscreen: () => void;
}

interface FullscreenModalProps {
    image: string;
    onClose: () => void;
}

export type {
    Item,
    Order,
    LocationContextType,
    DisplayContextType,
    OrdersContextType,
    OrderDisplayContextType,
    FullscreenContextType,
    FullscreenModalProps
} 