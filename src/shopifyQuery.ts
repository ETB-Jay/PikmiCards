import { Order, Item } from "./types";

const getOrders = async (): Promise<Order[]> => {
    try {
        const response = await fetch("http://localhost:3001/api/orders");
        if (!response.ok) {
            throw new Error("Failed to fetch orders");
        }
        const orders = await response.json();
        return orders;
    } catch (error: unknown) {
        console.error("Error fetching orders:", error instanceof Error ? error.message : String(error));
        throw error;
    }
};

const filterOrdersByLocation = (orders: Order[], location: string): Order[] => {
    if (!orders) return [];
    return orders
        .map((order: Order) => ({
            ...order,
            items: order.items?.filter((item: Item) =>
                item.itemLocation?.toLowerCase().includes(location.toLowerCase())
            )
        }))
        .filter((order: Order) => order.items && order.items.length > 0);
};

export { getOrders, filterOrdersByLocation };
