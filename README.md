<div align="center">

<img height="500" alt="PikmiCardsBanner" src="https://github.com/user-attachments/assets/412b9291-10b6-4e12-b026-9f1fbb247350" />

##

<br> 


![version](https://img.shields.io/badge/version-1.0.0-blue)
![license](https://img.shields.io/badge/license-MIT-green)
![build](https://img.shields.io/badge/build-passing-brightgreen)

**PikmiCards** is a TCG card picking system originally designed by Michael Zhang for Enter the Battlefield (ETB) using [React.js](https://react.dev/), [tailwindcss](https://tailwindcss.com/), and [React Router](https://reactrouter.com/).
[Shopify](https://www.shopify.com/ca) is used as the backend for this project. The data was primarily extracted using the company's [GraphQL tool](https://shopify.dev/docs/api/admin-graphql). 

</div>

<br>

## 📝 | FEATURES AND USAGE
<p align="center">
  <img width="1917" height="856" alt="Preview" src="https://github.com/user-attachments/assets/6b9626cb-c6b0-41aa-bb99-b579b25d3e48" />
</p>

**1 - Location and Refresh Buttons:** Changes the currently displayed location and allows orders to be refreshed. **ONLY USE THESE ONCE YOU ARE OK WITH RESETTING YOUR UNCOMMITTED PROCESS**

**2 - Picklist:** Items that have yet to be picked

**3 - Box Grid:** Orders that are waiting to be committed are displayed on the top right

**4 - Queue Pile:** Items that are waiting to be placed in a box are displayed on the bottom right

**5 - Pages** Allows the User to toggle between the _Orders_ and _Guide_ pages. It also allows the user to logout. 

## 🖥️ | DEVELOPMENT

### Requirements
- Node.js (v18+ recommended)
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

   Create a `.env` file in the root with the following (for Shopify API access):

   ```
   VITE_SHOPIFY_API_KEY=your_key
   VITE_SHOPIFY_API_SECRET=your_secret
   VITE_SHOPIFY_STORE_DOMAIN=your_store.myshopify.com
   VITE_SHOPIFY_ACCESS_TOKEN=your_access_token
   PORT
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

### Scripts

- `npm run dev` — Start the Vite development server
- `npm run build` — Build the app for production
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint on the codebase
- `npm run server` — Start the Express backend server

## Core Technologies

- **Frontend:** React, TypeScript, Vite, Tailwind CSS,  MUI Icons
- **Backend:** Node.js, Express, Shopify API, dotenv, cors, Firebase Authentication
- **State Management:** React Context + Custom Hooks
- **Linting/Formatting:** ESLint, Prettier
- **Hosting:** Vercel

## 🐛 | UPDATES AND BUG FIXING
From 2025-05-05 to 2025-08-29, Michael Zhang will be conducting preliminary updates and bug fixing as the store adapts to the system. Please ask either Jay or Kris to get his contact information.

After this period, it will be the responsibility of the new "tech guy" to manage the system. For additional information regarding the repository and any creditionals (i.e. Environment Variables, API Keys), please either create new ones for the system or contact Michael through Jay or Kris to obtain the old ones.

## License
MIT 
