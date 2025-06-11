const handleShopifyQuery = async () => {
  try {
    console.log('Making request to /api/orders...');
    const response = await fetch('http://localhost:3000/api/orders?limit=250', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    console.log(data)
    const filteredData = data.orders.map(customer => ({
      first_name: customer.billing_address?.first_name,
      last_name: customer.billing_address?.last_name,
      note: customer.note,
      items: customer.line_items.map(item => ({
        name: item.name,
        product_id: item.product_id,
        quantity: item.quantity
      }))
    }))
    return filteredData
  } catch (error) {
    console.error('Shopify API error:', error);
  }
};

export default handleShopifyQuery