<div align="center">

# PIKMICARDS

![version](https://img.shields.io/badge/version-1.0.0-blue)
![license](https://img.shields.io/badge/license-MIT-green)
![build](https://img.shields.io/badge/build-passing-brightgreen)

<img src="https://github.com/user-attachments/assets/8b17ef49-e956-45ac-9df1-71b34775fcba" width="300" />

**PikmiCards** is a TCG card picking system originally designed by Michael Zhang using [React.js](https://react.dev/), [tailwindcss](https://tailwindcss.com/), and [React Router](https://reactrouter.com/).
[Shopify](https://www.shopify.com/ca) is used as the backend for this project. The data was primarily extracted using its [GraphQL tool](https://shopify.dev/docs/api/admin-graphql). 

</div>

<br>

## 📝 | FEATURES AND USAGE
<p align="center">
  <img src="https://github.com/user-attachments/assets/b3f42b31-3261-43e9-9d1e-24088e23e0bf"/>
</p>


**Picklist:** Items that have yet to be picked are displayed on the left


**Queue Pile:** Items that are waiting to be placed in a box are displayed on the bottom right


**Box Grid:** Orders that are waiting to be committed are displayed on the top right


**Use the Buttons in the header to:**
- Switch Locations
- Reload Customer List
- Switch Pages


## 🖥️ | DEVELOPMENT

### Requirements
- Node.js (v18+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
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

## Project Structure

```
pikmicards/
  ├── api/                # Express API handlers (orders)
  ├── public/             # Static assets (SVGs, PNGs, favicon)
  ├── server/             # Express server
  ├── src/
  │   ├── body/           # Main picking workflow components
  │   ├── components/     # Reusable UI components (containers, modals, etc.)
  │   ├── context/        # React context providers and hooks
  │   ├── header/         # Header and navigation
  │   ├── modals/         # Modal components
  │   ├── pages/          # App pages (Login, Pick, Guide)
  │   ├── root.css        # Custom and Tailwind CSS
  │   └── types.tsx       # TypeScript types and interfaces
  ├── package.json
  ├── tsconfig.json
  └── vite.config.js
```

## Core Technologies

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, OGL (WebGL), MUI Icons
- **Backend:** Node.js, Express, Shopify API, dotenv, cors
- **State Management:** React Context + Custom Hooks
- **Linting/Formatting:** ESLint, Prettier
- **Hosting:** Vercel

## 🐛 | UPDATES AND BUG FIXING
From 2025-05-05 to 2025-08-29, Michael Zhang will be conducting preliminary updates and bug fixing as the store adapts to the system. Please ask either Jay or Kris to get his contact information.

After this period, it will be the responsibility of the new "tech guy" to manage the system. For additional information regarding the repository and any creditionals (i.e. Environment Variables, API Keys), please either create new ones for the system or contact Michael through Jay or Kris to obtain the old ones.

## License

> _Specify your license here (MIT, Apache-2.0, etc.)_
