/* eslint-env node */
/* global process */
import '@shopify/shopify-api/adapters/node';
import dotenv from 'dotenv';
import { shopifyApi, LATEST_API_VERSION, Session } from '@shopify/shopify-api';

dotenv.config();

const {
  VITE_SHOPIFY_API_KEY,
  VITE_SHOPIFY_API_SECRET,
  VITE_SHOPIFY_STORE_DOMAIN,
  VITE_SHOPIFY_ACCESS_TOKEN,
} = process.env;

// Check for required environment variables
if (!VITE_SHOPIFY_API_KEY || !VITE_SHOPIFY_API_SECRET || !VITE_SHOPIFY_STORE_DOMAIN || !VITE_SHOPIFY_ACCESS_TOKEN) {
  throw new Error('Missing required Shopify environment variables. Please check your .env file.');
}

const getOrders = async (client) => {
  let orders = [];
  let hasNextPage = true;
  let cursor = null;

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
          pickedLocations = JSON.parse(order.metafield.value).map(picked => picked.location);
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
            if (pickedLocations.includes(locationName)) { return null; }
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
      }).filter(order => order && order.items && order.items.length > 0);

    orders = [...orders, ...temp];
    hasNextPage = ordersData.pageInfo.hasNextPage;
    if (hasNextPage) { cursor = ordersData.edges[ordersData.edges.length - 1].cursor; }
  }
  return orders;
};

const writeOrders = async (client, orderID, employee, location) => {
  const mutationQuery = `
  mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          key
          namespace
          value
          createdAt
          updatedAt
        }
        userErrors {
          field
          message
          code
        }
      }
    }
  `;

  const variables = {
    "metafields": [
      {
        "key": "picked",
        "namespace": "custom",
        "ownerId": orderID,
        "type": "json",
        "value": JSON.stringify([{
          employee,
          location
        }])
      }
    ]
  };

  try {
    const response = await client.request(mutationQuery, variables)
    return response
  } catch (err) {
    console.log(err)
  }

}

async function handler(req, res) {
  try {
    const session = new Session({
      id: `offline_${VITE_SHOPIFY_STORE_DOMAIN}`,
      shop: VITE_SHOPIFY_STORE_DOMAIN,
      state: 'offline',
      isOnline: false,
      accessToken: VITE_SHOPIFY_ACCESS_TOKEN,
    });
    const shopify = shopifyApi({
      apiKey: VITE_SHOPIFY_API_KEY,
      apiSecretKey: VITE_SHOPIFY_API_SECRET,
      scopes: ['read_orders', 'write_orders', 'write_metaobjects', 'read_metaobjects'],
      hostName: VITE_SHOPIFY_STORE_DOMAIN,
      apiVersion: LATEST_API_VERSION,
      isEmbeddedApp: true,
    });
    const client = new shopify.clients.Graphql({ session });
    const orders = await getOrders(client);
    res.status(200).json(orders);
  } catch (error) {
    if (error.response?.body?.errors) {
      res.status(400).json({ error: error.response.body.errors });
      return;
    }
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}

export default handler;
export const expressHandler = (req, res) => handler(req, res);
export { writeOrders }
