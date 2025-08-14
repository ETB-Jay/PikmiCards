// Utility function to fetch orders from Shopify
async function getOrders(client) {
  const orders = [];
  let hasNextPage = true;
  let cursor = null;
  const seenOrderKeys = new Set();

  const toTitleCase = (str) =>
    str.replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());

  try {
    while (hasNextPage) {
      const query = `
      {
        orders(first: 50, 
          after: ${cursor ? `"${cursor}"` : "null"}, 
          query: "created_at:>${new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()} AND fulfillment_status:unfulfilled"
          ) {
          edges {
            cursor
            node {
              id
              name
              email
              phone
              requiresShipping
              displayFinancialStatus
              currentSubtotalLineItemsQuantity
              customer {displayName}
              shippingLines(first: 1) {edges {node {title}}}
              metafield(namespace: "custom", key: "picked") { value }
              fulfillmentOrders(first: 2) {
                edges {
                  node {
                    assignedLocation {location {name}}
                    lineItems(first: 100) {
                      edges {
                        node {
                          lineItem {
                            id
                            name
                            quantity
                            variant { title image { url } }
                            product { featuredImage { url } tags }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          pageInfo {hasNextPage}
        }
      }`;

      const response = await client.request(query, {});
      const ordersData = response.data?.orders;
      if (!ordersData?.edges) { throw new Error("Invalid response from Shopify API"); }

      for (const edge of ordersData.edges) {
        const order = edge.node;
        if (!order) { continue; }

        let pickedLocations = [];
        if (order.metafield?.value) {
          try {
            pickedLocations = JSON.parse(order.metafield.value).map(
              (picked) => picked.location
            );
          } catch { /* ignore parse errors */ }
        }

        for (const fulfillEdge of order.fulfillmentOrders?.edges || []) {
          if (!fulfillEdge?.node) { continue; }
          const locationName = fulfillEdge.node?.assignedLocation?.location?.name;
          if (pickedLocations.includes(locationName)) { continue; }

          const items = [];
          for (const itemEdge of fulfillEdge.node?.lineItems?.edges || []) {
            const item = itemEdge.node?.lineItem;
            if (!item) { continue; }
            const tags = item?.product?.tags;
            items.push({
              itemID: item.id,
              orderID: order.id,
              itemName: item.name,
              itemQuantity: item.quantity,
              itemLocation: locationName,
              itemBrand: tags?.find((tag) => tag.startsWith("Brand_"))?.replace("Brand_", "") || null,
              itemSet: tags?.find((tag) => tag.startsWith("Set_"))?.replace("Set_", "") || null,
              itemRarity: tags?.find((tag) => tag.startsWith("Rarity_"))?.replace("Rarity_", "") || null,
              itemPrinting: item.variant?.title === "Default Title" ? null : item.variant?.title,
              imageUrl:
                item.variant?.image?.url ||
                item.product?.featuredImage?.url ||
                "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png",
            });
          }
          if (items.length === 0) { continue; }

          // Deduplicate by order number and location
          const orderKey = `${order.name}-${locationName}`;
          if (!seenOrderKeys.has(orderKey)) {
            orders.push({
              orderID: order.id,
              customerName: order.customer?.displayName
                ? toTitleCase(order.customer.displayName)
                : null,
              tags: order.tags || [],
              numberItems: items.length,
              deliveryMethod: order.shippingLines?.edges?.[0]?.node?.title,
              fulfillmentLocation: locationName,
              items,
              email: order.email || "",
              phone: order.phone || "",
              requiresShipping: order.requiresShipping,
              orderNumber: order.name,
              paid: order.displayFinancialStatus
            });
            seenOrderKeys.add(orderKey);
          }
        }
      }

      hasNextPage = ordersData.pageInfo.hasNextPage;
      if (hasNextPage) { cursor = ordersData.edges[ordersData.edges.length - 1].cursor; }
    }
    return orders;
  } catch (err) {
    throw new Error(err?.message || err);
  }
}

// --- Write Orders ---
async function writeOrders(client, orderID, value) {
  const getMetafieldQuery = `
    query GetOrderMetafields($id: ID!) {
      order(id: $id) {
        metafield(namespace: "custom", key: "picked") { value }
      }
    }
  `;

  let currentMetafield = [];
  try {
    const metafieldResponse = await client.request(getMetafieldQuery, { variables: { id: orderID } });
    const metafieldValue =
      metafieldResponse.data?.order?.metafield?.value ||
      metafieldResponse.order?.metafield?.value ||
      null;
    if (metafieldValue) { currentMetafield = JSON.parse(metafieldValue); }
  } catch { /* ignore parse errors */ }

  const mutation = `
    mutation OrderUpdate($input: OrderInput!) {
      orderUpdate(input: $input) {
        order {
          id
          metafields(first: 1, namespace: "custom") {
            edges { node { id namespace key value type } }
          }
        }
        userErrors { field message }
      }
    }
  `;

  const variables = {
    input: {
      id: orderID,
      metafields: [{
        key: "picked",
        namespace: "custom",
        type: "json",
        value: JSON.stringify([...currentMetafield, value])
      }]
    }
  };

  const response = await client.request(mutation, { variables });
  const orderUpdate = response.body?.orderUpdate || response.orderUpdate;
  if (orderUpdate?.userErrors?.length) {
    throw new Error(JSON.stringify(orderUpdate.userErrors));
  }
  return orderUpdate;
}

export { getOrders, writeOrders }; 