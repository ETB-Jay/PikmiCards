const getOrders = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/orders');
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        const orders = await response.json();
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        throw error;
    }
};

export default getOrders; 