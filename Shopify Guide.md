# Shopify Guide

## Project File Structure

```
src/
  types.tsx
  root.css
  interfaces.tsx
  main.tsx
  components/
    SelectEmployee.tsx
    formComponents.tsx
    containers.tsx
    OrderCard.tsx
    Tags.tsx
    Background.tsx
    ImageDisplay.tsx
  pages/
    Pick.tsx
    Login.tsx
    Guide.tsx
  modals/
    ConfirmModal.tsx
    FullscreenModal.tsx
  header/
    Header.tsx
    buttons/
      LocationButton.tsx
      DetermineLocation.tsx
      RefreshButton.tsx
  context/
    Providers.tsx
    functions.tsx
    Context.tsx
    useContext.tsx
    useLocalStorage.jsx
    ProtectedRoute.jsx
  body/
    CardPicker.tsx
    LoadingSpinner.tsx
    sections/
      CardGridDisplay.tsx
      ToPick.tsx
      QueuePile.tsx
```

---

## 📁 File/Module Reference

### `src/types.tsx`
**Description:** Declares the types used throughout the program

#### Fields:
- **orderID** (`OrderID`): The order's unique identifier.
- **customerName** (`string | null`): The customer's name.
- **numberItems** (`number`): The number of individual items purchased by the customer.
- **deliveryMethod** (`string | null`): The order's delivery method.
- **items** (`ItemData[]`): The list of the items purchased by the customer.
- **fulfillmentLocation** (`Location`): The fulfillment location for the order.

---

### `src/root.css`
**Description:** _Global CSS styles for the application._

---

### `src/interfaces.tsx`
**Description:** _Interface definitions for shared types._

---

### `src/main.tsx`
**Description:** _App entry point._

---

### `src/components/`
**Description:** _Shared and reusable UI components._

- `SelectEmployee.tsx` — Employee selection component
- `formComponents.tsx` — Shared form UI components
- `containers.tsx` — Layout and container components
- `OrderCard.tsx` — Displays an order card
- `Tags.tsx` — Tag display component
- `Background.tsx` — Background visual component
- `ImageDisplay.tsx` — Displays images for items/orders

---

### `src/pages/`
**Description:** _Top-level pages/routes for the app._

- `Pick.tsx` — Main picking workflow page
- `Login.tsx` — Login page for authentication
- `Guide.tsx` — User guide/help page

---

### `src/modals/`
**Description:** _Modal dialog components._

- `ConfirmModal.tsx` — Modal for confirming order completion
- `FullscreenModal.tsx` — Modal for fullscreen image display

---

### `src/header/`
**Description:** _Header and navigation components._

- `Header.tsx` — Main header/navigation bar

#### `src/header/buttons/`
- `LocationButton.tsx` — Button for selecting location
- `DetermineLocation.tsx` — Dropdown for choosing a location
- `RefreshButton.tsx` — Button to refresh data/orders

---

### `src/context/`
**Description:** _React context providers and hooks._

- `Providers.tsx` — Wraps all context providers for the app
- `functions.tsx` — Utility functions for context logic
- `Context.tsx` — Context type definitions and context creation
- `useContext.tsx` — Custom hooks for accessing context values
- `useLocalStorage.jsx` — Hook for using localStorage with React state
- `ProtectedRoute.jsx` — Route protection for authenticated access

---

### `src/body/`
**Description:** _Main body components for the app._

- `CardPicker.tsx` — Card picking workflow component
- `LoadingSpinner.tsx` — Loading spinner animation

#### `src/body/sections/`
- `CardGridDisplay.tsx` — Displays a grid of order cards
- `ToPick.tsx` — List of items/orders to pick
- `QueuePile.tsx` — Queue of orders/items to be picked

---

Test Case Ideas

Filter Requirements
⦁	item must not be fulfilled
⦁	item must be from the past 48 hours
⦁	item must not have been labelled as picked from the metafield

Orders
⦁	

Items
⦁	


To-Do List
⦁	Refactor orders.js to be more readable
⦁	Cleanup the types to be consistent with orders.js 
⦁	Redesign each module to follow consistent logic 

---

### Type Details

#### `OrderData`
- **orderID** (`OrderID`): The order's unique identifier.
- **customerName** (`string | null`): The customer's name.
- **numberItems** (`number`): The number of individual items purchased by the customer.
- **deliveryMethod** (`string | null`): The order's delivery method.
- **items** (`ItemData[]`): The list of the items purchased by the customer.
- **fulfillmentLocation** (`Location`): The fulfillment location for the order.

#### `ItemData`
- **itemID** (`ItemID`): The item's unique identifier.
- **orderID** (`OrderID`): The order the item belongs to.
- **itemName** (`string`): The item's display name.
- **itemQuantity** (`number`): The quantity of this item desired.
- **itemLocation** (`Location`): The location of the item.
- **itemSet** (`string | null`): The item's set. null if DNE.
- **itemRarity** (`string | null`): The item's rarity. null if DNE.
- **itemPrinting** (`string | null`): The item's condition. null if DNE.
- **imageUrl** (`string`): The url to the item's image.

#### `Order`
- **orderID** (`OrderID`): The order's unique identifier.
- **location** (`Location`): The order's location.
- **box** (`number | null`): The order's current box number. null otherwise.
- **items** (`Item[]`): A list of items associated with the order.

#### `Item`
- **itemID** (`ItemID`): The item's unique identifier.
- **orderID** (`OrderID`): The unique identifier of the order containing the item.
- **status** (`Status`): The item's current local status.
- **set** (`string`): The set the item belongs to.
- **box** (`number | null`): The order's current box number. null otherwise.

#### `User`
- **username** (`string`): Username of user.
- **password** (`string`): Password of user.

#### `ConfirmResponse`
- **employee** (`string`): Name of employee who confirmed the response.
- **location** (`Location`): Location where the response was confirmed.

#### Type Aliases
- **OrderID**: `string` — Unique identifier for an Order.
- **ItemID**: `string` — Unique identifier for an Item.
- **Location**: `'Oakville' | 'Newmarket' | 'Guelph'` — Store location.
- **Status**: `'unPicked' | 'queue' | 'inBox'` — Item's current status in the picking process.

---


