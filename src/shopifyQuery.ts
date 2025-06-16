const getOrders = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/orders');
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        const orders = await response.json();
        return orders;
    } catch (error: unknown) {
        console.error('Error fetching orders:', error instanceof Error ? error.message : String(error));
        throw error;
    }
};

export default getOrders;