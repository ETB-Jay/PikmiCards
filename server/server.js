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
// import { shopifyApi, LATEST_API_VERSION, Session } from '@shopify/shopify-api';

import { expressHandler as ordersHandler } from '../api/orders.js';

dotenv.config();

const {
  // VITE_SHOPIFY_API_KEY,
  // VITE_SHOPIFY_API_SECRET,
  // VITE_SHOPIFY_STORE_DOMAIN,
  // VITE_SHOPIFY_ACCESS_TOKEN,
  PORT = 3001,
} = process.env;

const app = express();
app.use(cors());
app.use(express.json());

/** @description Starts the Server */
app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`); // Commented out to resolve linter error
});

/**
 * @description calls <GET /api/orders>
 * @returns {OrderData[]} all unfulfilled Shopify orders from the past 24 hours.
 */
app.get('/api/orders', ordersHandler);
