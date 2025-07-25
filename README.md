# PikmiCards

<div align="center">
  <img height="350" alt="banner" src="https://github.com/user-attachments/assets/4931c28c-3acd-4eaf-9789-39b0024b900b" />
  <br/>
  <br/>
  <p>
    <a href="#"><img src="https://img.shields.io/badge/version-1.0.0-blue" alt="version" /></a>
    <a href="#"><img src="https://img.shields.io/badge/license-MIT-green" alt="license" /></a>
    <a href="#"><img src="https://img.shields.io/badge/build-passing-brightgreen" alt="build" /></a>
  </p>
  <p><b>Pikmicards</b> is a TCG card picking system originally designed by Michael Zhang for Enter the Battlefield (ETB), built with React, Tailwind CSS, Firebase Authentication, and Shopify's GraphQL Admin API.</p>
</div>

---

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Development](#development)
- [Scripts](#scripts)
- [Core Technologies](#core-technologies)
- [Updates & Support](#updates--support)
- [License](#license)

---

## Features
- **Location & Refresh Controls:** Change the displayed location and refresh orders. _Note: Only use these if you are ready to reset your uncommitted process._
- **Picklist:** View items that have yet to be picked.
- **Box Grid:** See orders waiting to be committed (top right).
- **Queue Pile:** Items waiting to be placed in a box (bottom right).
- **Navigation:** Toggle between Orders and Guide pages, and log out securely.

## Screenshots
<p align="center">
  <img width="100%" alt="Preview" src="https://github.com/user-attachments/assets/6b9626cb-c6b0-41aa-bb99-b579b25d3e48" />
</p>

---

## Development

### Requirements
- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/ETB-Jay/PikmiCards.git
   cd pikmicards
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following:
   ```env
   VITE_SHOPIFY_API_KEY=your_key
   VITE_SHOPIFY_API_SECRET=your_secret
   VITE_SHOPIFY_STORE_DOMAIN=your_store.myshopify.com
   VITE_SHOPIFY_ACCESS_TOKEN=your_access_token
   PORT=5173
   ```

### Running the App
- **Start the backend server:**
  ```sh
  npm run server
  ```
- **Start the frontend (Vite dev server):**
  ```sh
  npm run dev
  ```
- Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Scripts
- `npm run dev` — Start the Vite development server
- `npm run build` — Build the app for production
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint on the codebase
- `npm run server` — Start the Express backend server

---

## Core Technologies
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, MUI Icons
- **Backend:** Node.js, Express, Shopify API, dotenv, cors, Firebase Authentication
- **State Management:** React Context + Custom Hooks
- **Linting/Formatting:** ESLint, Prettier
- **Hosting:** Vercel

---

## Updates & Support
From **2025-05-05** to **2025-08-29**, Michael Zhang will be conducting preliminary updates and bug fixing as the store adapts to the system. Please contact Jay or Kris for his contact information.

After this period, the new maintainer will be responsible for the system. For repository or credential information (e.g., environment variables, API keys), either generate new ones or contact Michael through Jay or Kris.

---

## License
[MIT](LICENSE) 
