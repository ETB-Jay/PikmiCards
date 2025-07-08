const text = {
  
} 







const SPACESHIP_ALT = 'Spaceship illustration';
const LOADING_TEXT = 'Loading Orders';
// ─ Constants ──────────────────────────────────────────────────────────────────────────────────────
const LOGIN_TITLE = 'Login';
const LOGIN_BUTTON_TEXT = 'Sign In';
const LOGIN_IMAGE_ALT = 'Login Illustration';


// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const getItemKey = (item: ItemData, index: number) => `${item.orderID}-${item.itemID}-${index}`;
const EMPTY_TEXT = 'None';
const EMPTY_ALT = 'Empty Box';
const UNRETRIEVED_TITLE = 'Unretrieved Items';
const RETRIEVED_TITLE = 'Retrieved Items';
const NO_PREVIEW_TEXT = 'No Preview';

const CONFIRM_BUTTON_TEXT = 'Confirm';
const CLEAR_BUTTON_TEXT = 'Clear Items';

const logoAlt = 'PikmiCards Logo';
const pickOrdersLabel = 'Pick Orders';
const guideLabel = 'Guide';
const logoutLabel = 'Logout';

const cardClass = `flex flex-row gap-3 items-center justify-start shadow-lg rounded-lg transition-all min-w-fit min-h-fit p-2 
  ${selected ? 'bg-green-smoke-800/70 hover:bg-green-smoke-900/70 cursor-pointer hover:scale-102' : 'bg-green-smoke-600/60 hover:bg-green-smoke-600/70 cursor-pointer hover:scale-101'}`;

const EMPTY_QUEUE_TEXT = 'Queue is empty';

const CARD_IMAGE_ALT_1 = 'Box Number';
const CARD_IMAGE_ALT_2 = 'Picked';
const CARD_IMAGE_ALT_3 = 'Unpicked';

const GUIDE_TEXT = {
  githubAlt: 'Github',
  title: 'Guide to using PikmiCards',
  subtitle: 'How to use PikmiCards effectively',
  keywords: {
    picklist: 'Picklist',
    queue: 'Queue Pile',
    box: 'Box Grid',

    picker: 'Picker',
    guide: 'Guide',
    logout: 'Login Page',
  },
  header: {
    hamburger: [
      'The hamburger icon displays the sidebar, letting the user swap between the',
      ',',
      'and',
    ],
    location:
      'The location can be changed by selecting the location button (defaults to the Oakville location). This will refresh the page so make sure to confirm any orders beforehand',
    refresh:
      'Refresh the order list with the refresh button. This will also reset any progress made.',
  },
  pick: {
    picklist: {
      subtitle: ['Items in the', 'are displayed in a grid on the left'],
      features: [
        "Click on an item's image to see the item more clearly",
        'Click on the rest of the grid to select the item and confirm it',
      ],
    },
    queue: {
      subtitle: ['Items in the', 'are displayed in the bottom right'],
      features: [
        "Click on an item's image to see the item more clearly",
        "If an item's order has appeared on the box and is currently in the queue pile, then the item will be highlighted a dark brown and will appear at the front of the list",
        'Items can be confirmed by clicking the square icon',
      ],
    },
    box: {
      subtitle: ['Items in the', 'are displayed on the top right'],
      features: [
        'Click on a box to see the order details and confirm the order',
        'Once an order has been confirmed, a new order will take its place',
      ],
    },
  },
};

const FULLSCREEN_MODAL_ALT = 'Fullscreen Modal Image';


CustomerInfo.displayName = 'CustomerInfo';