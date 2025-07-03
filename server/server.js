/**
 * @fileoverview Server for fetches Shopify orders from the website
 * 
 * Pulls all unfulfilled Shopify orders from the psat 24 hours with the following conditions/format:
 * - Pulls as an OrderData[]
 * - In reverse order (so most recent orders are pulled first)
 * 
 * Requires the following .env variables
 * - VITE_SHOPIFY_API_KEY
 * - VITE_SHOPIFY_API_SECRET
 * - VITE_SHOPIFY_STORE_DOMAIN
 * - VITE_SHOPIFY_ACCESS_TOKEN
 * - PORT (optional, defaults to 3001)
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION, Session } from '@shopify/shopify-api';
import process from 'process';

dotenv.config();

const {
    VITE_SHOPIFY_API_KEY,
    VITE_SHOPIFY_API_SECRET,
    VITE_SHOPIFY_STORE_DOMAIN,
    VITE_SHOPIFY_ACCESS_TOKEN,
    PORT = 3001
} = process.env;

const app = express();
app.use(cors());
app.use(express.json());

/** @description Starts the Server */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/** 
 * @description calls <GET /api/orders>
 * @returns {OrderData[]} all unfulfilled Shopify orders from the past 24 hours.
 */
app.get('/api/orders', async (req, res) => {
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
            scopes: ['read_orders'],
            hostName: VITE_SHOPIFY_STORE_DOMAIN,
            apiVersion: LATEST_API_VERSION,
            isEmbeddedApp: true,
        });
        const client = new shopify.clients.Graphql({ session });
        const orders = await getOrders(client);
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error.response?.body?.errors || error.message || error);
        if (error.response?.body?.errors) {
            return res.status(400).json({ error: error.response.body.errors });
        }
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

/**
 * @description Fetches all unfulfilled Shopify orders from the last 24 hours. 
 * 
 * @param {GraphQLClient} client - Shopify GraphQL Client
 * @returns {Promise<OrderData[]>} Array of OrderData[]
 */
const getOrders = async (client) => {
    let orders = [];
    let hasNextPage = true;
    let cursor = null;

    while (hasNextPage) {
        const query = `
        {
            orders(first: 1, 
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
                        fulfillmentOrders(first: 1) {
                            edges {
                                node {
                                    assignedLocation {location {name}}
                                    lineItems(first: 50) {
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

        if (!ordersData?.edges) {
            console.error('Invalid response format:', response);
            throw new Error('Invalid response from Shopify API');
        }

        const temp = ordersData.edges.map((edge) => {
            const order = edge.node;

            /**
             * Converts a string to Title Case.
             * @param {string} str
             * @returns {string}
             */
            const toTitleCase = (str) => str
                .replace(/\w\S*/g, (text) => text.charAt(0)
                    .toUpperCase() + text.substring(1)
                        .toLowerCase());

            if (!order) {
                console.error(`Invalid Order Data: ${edge}`);
                return null;
            }

            return {
                // see types.tsx for more information
                orderID: order.id,
                customerName: order.customer?.displayName ? toTitleCase(order.customer.displayName) : null,
                numberItems: order.currentSubtotalLineItemsQuantity,
                deliveryMethod: order.shippingLines?.edges?.[0]?.node?.title,
                items: order.fulfillmentOrders?.edges?.flatMap((fulfillEdge) => {
                    if (!fulfillEdge?.node) {
                        console.error('Invalid line item data:', fulfillEdge);
                        return [];
                    }
                    const locationName = fulfillEdge.node?.assignedLocation?.location?.name;
                    return fulfillEdge.node?.lineItems?.edges?.map((itemEdge) => {
                        const item = itemEdge.node?.lineItem;
                        const tags = item?.product?.tags;
                        if (!item) {
                            console.error('Invalid line item:', itemEdge);
                            return null;
                        }
                        return {
                            itemID: item.id,
                            orderID: order.id,
                            itemName: item.name?.split(' - ').slice(0, -1).join(' - ') || item.name,
                            itemQuantity: item.quantity,
                            itemLocation: locationName,
                            itemSet: tags?.find((tag) => tag.startsWith('Set_'))?.replace('Set_', '') || null,
                            itemRarity: tags?.find((tag) => tag.startsWith('Rarity_'))?.replace('Rarity_', '') || null,
                            itemPrinting: item.variant?.title !== 'Default Title' ? item.variant?.title : null,
                            imageUrl: item.variant?.image?.url || item.product?.featuredImage?.url || 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
                        };
                    }).filter(Boolean) || [];
                }).filter(Boolean) || []
            };
        }).filter(Boolean);

        orders = [...orders, ...temp];
        hasNextPage = ordersData.pageInfo.hasNextPage;
        if (hasNextPage) {
            cursor = ordersData.edges[ordersData.edges.length - 1].cursor;
        }
    }
    return orders;
};