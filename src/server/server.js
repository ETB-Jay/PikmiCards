import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.get('/api/orders', async (req, res) => {
  console.log('Received request to /api/orders');
  try {
    const shopName = import.meta.env.VITE_SHOPIFY_SHOP_NAME;
    const accessToken = import.meta.env.VITE_SHOPIFY_ACCESS_TOKEN;

    if (!shopName || !accessToken) {
      throw new Error('Missing Shopify credentials in environment variables');
    }

    console.log('Making request to Shopify API...');
    const response = await fetch(
      `https://${shopName}/admin/api/2024-01/orders.json`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Shopify API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Successfully fetched orders');
    res.json(data);
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch orders' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET /');
  console.log('- GET /api/orders');
  console.log('Environment variables loaded:', {
    shopName: import.meta.env.VITE_SHOPIFY_SHOP_NAME ? 'Set' : 'Not set',
    accessToken: import.meta.env.VITE_SHOPIFY_ACCESS_TOKEN ? 'Set' : 'Not set'
  });
}); 