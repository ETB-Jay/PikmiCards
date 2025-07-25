// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { initializeApp } from "firebase/app";

/** Firebase configuration object using environment variables */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

/** Initialized Firebase app instance */
const app = initializeApp(firebaseConfig);

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default app;
