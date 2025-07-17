import { shopifyApi, LATEST_API_VERSION, Session } from '@shopify/shopify-api';

// Utility function to fetch orders from Shopify
async function getOrders(client) {
  let orders = [];
  let hasNextPage = true;
  let cursor = null;

  try {
    while (hasNextPage) {
      const query = `
    {
      orders(first: 50, 
        after: ${cursor ? `"${cursor}"` : 'null'}, 
        query: "created_at:>${new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()} AND fulfillment_status:unfulfilled", 
        reverse: true) {
        edges {
          cursor
          node {
            id
            currentSubtotalLineItemsQuantity
            customer {displayName}
            shippingLines(first: 1) {edges {node {title}}}
            metafield(namespace: "custom", key: "picked") {
              value
            }
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
                          variant {
                            title
                            image {
                              url
                            }
                          }
                          product {
                            featuredImage {
                              url
                            }
                            tags
                          }
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

      if (!ordersData?.edges) { throw new Error('Invalid response from Shopify API'); }

      const temp = ordersData.edges
        .flatMap((edge) => {
          const order = edge.node;
          if (!order) { return []; }
          let pickedLocations = [];
          try {
            pickedLocations = JSON.parse(order.metafield.value).map((picked) => `ETB ${picked.location}`);
          } catch {
            pickedLocations = [];
          }

          const toTitleCase = (str) =>
            str.replace(
              /\w\S*/g,
              (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
            );

          return (order.fulfillmentOrders?.edges || [])
            .map((fulfillEdge) => {
              if (!fulfillEdge?.node) { return null; }
              const locationName = fulfillEdge.node?.assignedLocation?.location?.name;
              if (pickedLocations.includes(locationName)) { return []; }
              const items = (fulfillEdge.node?.lineItems?.edges || [])
                .map((itemEdge) => {
                  const item = itemEdge.node?.lineItem;
                  const tags = item?.product?.tags;
                  if (!item) { return null; }
                  return {
                    itemID: item.id,
                    orderID: order.id,
                    itemName: item.name.split(" - ")[0] || item.name,
                    itemQuantity: item.quantity,
                    itemLocation: locationName,
                    itemSet: tags?.find((tag) => tag.startsWith('Set_'))?.replace('Set_', '') || null,
                    itemRarity: tags?.find((tag) => tag.startsWith('Rarity_'))?.replace('Rarity_', '') || null,
                    itemPrinting: item.variant?.title === 'Default Title' ? null : item.variant?.title,
                    imageUrl:
                      item.variant?.image?.url ||
                      item.product?.featuredImage?.url ||
                      'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png',
                  };
                }).filter(Boolean);
              if (items.length === 0) { return null; }
              return {
                orderID: order.id,
                customerName: order.customer?.displayName
                  ? toTitleCase(order.customer.displayName)
                  : null,
                tags: order.tags || [],
                numberItems: items.length,
                deliveryMethod: order.shippingLines?.edges?.[0]?.node?.title,
                fulfillmentLocation: locationName,
                items,
              };
            }).filter(Boolean);
        }).filter((order) => order && order.items && order.items.length > 0);

      orders = [...orders, ...temp];
      hasNextPage = ordersData.pageInfo.hasNextPage;
      if (hasNextPage) { cursor = ordersData.edges[ordersData.edges.length - 1].cursor; }
    }
    return orders;
  } catch (err) {
    throw new Error(err);
  }
}

// --- Write Orders ---
async function writeOrders(client, orderID, value) {
  const getMetafieldQuery = `
    query GetOrderMetafields($id: ID!) {
      order(id: $id) {
        metafield(namespace: "custom", key: "picked") {
          value
        }
      }
    }
  `;

  let currentMetafield = [];
  try {
    const metafieldResponse = await client.request(getMetafieldQuery, { variables: { id: orderID } });
    const metafieldValue =
      metafieldResponse.body?.order?.metafield?.value ||
      metafieldResponse.order?.metafield?.value ||
      null;
    currentMetafield = metafieldValue ? JSON.parse(metafieldValue) : [];
  } catch {
    currentMetafield = [];
  }

  const mutation = `
    mutation OrderUpdate($input: OrderInput!) {
      orderUpdate(input: $input) {
        order {
          id
          metafields(first: 1, namespace: "custom") {
            edges {
              node {
                id
                namespace
                key
                value
                type
              }
            }
          }
        }
        userErrors {
          field
          message
        }
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
  if (orderUpdate?.userErrors && orderUpdate.userErrors.length > 0) {
    throw new Error(JSON.stringify(orderUpdate.userErrors));
  }
  return orderUpdate;
}

export { getOrders, writeOrders }; 