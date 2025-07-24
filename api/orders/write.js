import { LATEST_API_VERSION, Session, shopifyApi } from '@shopify/shopify-api';
// eslint-disable-next-line import/no-unresolved
import '@shopify/shopify-api/adapters/node';
import dotenv from 'dotenv';
import process from 'process';

// eslint-disable-next-line import-x/extensions, import/namespace
import { writeOrders } from '../ordersUtils.js';

dotenv.config();

const {
  VITE_SHOPIFY_API_KEY,
  VITE_SHOPIFY_API_SECRET,
  VITE_SHOPIFY_STORE_DOMAIN,
  VITE_SHOPIFY_ACCESS_TOKEN,
} = process.env;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST method
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Check for required environment variables
    if (!VITE_SHOPIFY_API_KEY || !VITE_SHOPIFY_API_SECRET || !VITE_SHOPIFY_STORE_DOMAIN || !VITE_SHOPIFY_ACCESS_TOKEN) {
      throw new Error('Missing required Shopify environment variables');
    }

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
    console.error('Error in orders/write:', err);
    res.status(500).json({ error: err.message });
  }
}