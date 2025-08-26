/* eslint-disable import/namespace */
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  build: {
    // Enable minification and optimization
    minify: "terser",
    terserOptions: {
      compress: {
        // Remove console.log in production
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Let Vite handle chunk splitting automatically
        manualChunks: undefined,
        // Optimize chunk naming
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]"
      },
    },
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging (disable in production if needed)
    sourcemap: false,
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  optimizeDeps: {
    include: [
      "react", 
      "react-dom", 
      "react-router-dom",
      "@mui/icons-material",
      "firebase/app",
      "firebase/auth",
      "firebase/firestore"
    ],
    exclude: ["@shopify/shopify-api", "@shopify/graphql-client"]
  },
  // Development optimizations
  esbuild: {
    drop: ["console", "debugger"],
  },
});
