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

import process from 'process';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION, Session } from '@shopify/shopify-api';

import { expressHandler, writeOrders } from '../api/orders.js';

dotenv.config();

const {
  PORT = 3001,
} = process.env;

const app = express();
app.use(cors());
app.use(express.json());

/** @description Starts the Server */
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});

/**
 * @description calls <GET /api/orders>
 * @returns {OrderData[]} all unfulfilled Shopify orders from the past 24 hours.
 */
app.get('/api/orders', expressHandler);

app.post('/api/orders/write', async (req, res) => {
  try {
    const {
      VITE_SHOPIFY_API_KEY,
      VITE_SHOPIFY_API_SECRET,
      VITE_SHOPIFY_STORE_DOMAIN,
      VITE_SHOPIFY_ACCESS_TOKEN,
    } = process.env;
    console.log('Incoming /api/orders/write request body:', req.body);
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
    const { orderID, field } = req.body;
    if (!orderID || !field) {
      console.error('Missing orderID or field in request body:', req.body);
      return res.status(400).json({ error: 'Missing orderID or field in request body' });
    }
    console.log('Calling writeOrders with:', { orderID, field });
    // Log the metafields variable before mutation
    // The actual metafields variable is constructed inside writeOrders, but you can log the input here
    const result = await writeOrders(client, orderID, field);
    res.status(200).json(result.response.body.errors.graphQLErrors[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 