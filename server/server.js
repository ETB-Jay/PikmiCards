import process from 'process';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION, Session } from '@shopify/shopify-api';

import { getOrders } from './getOrders.js';
import { writeOrders } from './writeOrders.js';

dotenv.config();

const {
  VITE_SHOPIFY_API_KEY,
  VITE_SHOPIFY_API_SECRET,
  VITE_SHOPIFY_STORE_DOMAIN,
  VITE_SHOPIFY_ACCESS_TOKEN,
  PORT = 3001,
} = process.env;

// Check for required environment variables
if (!VITE_SHOPIFY_API_KEY || !VITE_SHOPIFY_API_SECRET || !VITE_SHOPIFY_STORE_DOMAIN || !VITE_SHOPIFY_ACCESS_TOKEN) {
  throw new Error('Missing required Shopify environment variables. Please check your .env file.');
}

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});

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
});

app.post('/api/orders/write', async (req, res) => {
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
    const { orderID, value } = req.body;
    if (!orderID || value === undefined) {
      return res.status(400).json({ error: 'Missing orderID or value in request body' });
    }
    const result = await writeOrders(client, orderID, value);
    res.status(200).json(result);
  } catch (err) {
    console.error('Write order error:', err); // Add this line
    res.status(500).json({ error: err.message });
  }
}); 