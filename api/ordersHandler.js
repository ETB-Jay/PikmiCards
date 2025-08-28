import { shopifyApi, LATEST_API_VERSION, Session } from "@shopify/shopify-api";
import process from "process";

// eslint-disable-next-line import-x/extensions, import/namespace
import { getOrders, writeOrders } from "./ordersUtils.js";

const {
  VITE_SHOPIFY_API_KEY,
  VITE_SHOPIFY_API_SECRET,
  VITE_SHOPIFY_STORE_DOMAIN,
  VITE_SHOPIFY_ACCESS_TOKEN,
} = process.env;

async function getOrdersHandler(req, res) {
  try {
    if (
      !VITE_SHOPIFY_API_KEY ||
      !VITE_SHOPIFY_API_SECRET ||
      !VITE_SHOPIFY_STORE_DOMAIN ||
      !VITE_SHOPIFY_ACCESS_TOKEN
    ) {
      res.status(500).json({ error: "Missing required Shopify environment variables." });
      return;
    }

    const session = new Session({
      id: `offline_${VITE_SHOPIFY_STORE_DOMAIN}`,
      shop: VITE_SHOPIFY_STORE_DOMAIN,
      state: "offline",
      isOnline: false,
      accessToken: VITE_SHOPIFY_ACCESS_TOKEN,
    });

    const shopify = shopifyApi({
      apiKey: VITE_SHOPIFY_API_KEY,
      apiSecretKey: VITE_SHOPIFY_API_SECRET,
      scopes: ["read_orders", "write_orders", "write_metaobjects", "read_metaobjects"],
      hostName: VITE_SHOPIFY_STORE_DOMAIN,
      apiVersion: LATEST_API_VERSION,
      isEmbeddedApp: true,
    });

    const client = new shopify.clients.Graphql({ session });

    const orders = await getOrders(client);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// --- Write Orders ---
async function writeOrdersHandler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (
    !VITE_SHOPIFY_API_KEY ||
    !VITE_SHOPIFY_API_SECRET ||
    !VITE_SHOPIFY_STORE_DOMAIN ||
    !VITE_SHOPIFY_ACCESS_TOKEN
  ) {
    res.status(500).json({ error: "Missing required Shopify environment variables." });
    return;
  }

  const session = new Session({
    id: `offline_${VITE_SHOPIFY_STORE_DOMAIN}`,
    shop: VITE_SHOPIFY_STORE_DOMAIN,
    state: "offline",
    isOnline: false,
    accessToken: VITE_SHOPIFY_ACCESS_TOKEN,
  });

  const shopify = shopifyApi({
    apiKey: VITE_SHOPIFY_API_KEY,
    apiSecretKey: VITE_SHOPIFY_API_SECRET,
    scopes: ["read_orders", "write_orders", "write_metaobjects", "read_metaobjects"],
    hostName: VITE_SHOPIFY_STORE_DOMAIN,
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: true,
  });

  const client = new shopify.clients.Graphql({ session });
  const { orderID, value } = req.body;

  try {
    // Handle both single and batched updates
    if (Array.isArray(req.body)) {
      // Batched updates
      const results = [];
      for (const update of req.body) {
        if (!update.orderID || update.value === undefined) {
          return res.status(400).json({ error: "Missing orderID or value in batched request" });
        }
        const result = await writeOrders(client, update.orderID, update.value);
        results.push(result);
      }
      res.status(200).json(results);
    } else {
      // Single update (backward compatibility)
      if (!orderID || value === undefined) {
        return res.status(400).json({ error: "Missing orderID or value in request body" });
      }
      const result = await writeOrders(client, orderID, value);
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export { getOrdersHandler, writeOrdersHandler };
