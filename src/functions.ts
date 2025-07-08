const renderItem = useCallback((item: ItemData, index: number) => {
  const itemKey = getItemKey(item, index);
  return (
    <OrderCardConfirmModal
        key= { itemKey }
  item = { item }
  onImageClick = {() => setPreviewItem((prev) => (prev?.itemID === item.itemID ? null : item))}
      />
    );
  }, []);

const onConfirm = () => {
  const removeIdx = orderDisplay.findIndex(
    (orderItem) => orderItem.orderID === orderData.orderID
  );
  if (removeIdx === -1) {
    return;
  }

  const newOrderDisplay = [...orderDisplay];

  if (newOrderDisplay.length > 24) {
    // Prepare the swapped-in order with the correct box number
    const swapIdx = 24;
    const swappedOrder = { ...newOrderDisplay[swapIdx], box: removeIdx + 1 };
    swappedOrder.items = swappedOrder.items.map((item) => ({ ...item, box: removeIdx + 1 }));
    // Replace the removed order with the swapped-in order
    newOrderDisplay.splice(removeIdx, 1, swappedOrder);
    // Remove the duplicate at the end
    newOrderDisplay.splice(swapIdx, 1);
  } else {
    // Just remove the order
    newOrderDisplay.splice(removeIdx, 1);
  }

  setOrderDisplay(newOrderDisplay);
  onClose();
};


/**
 * LocationOption displays a selectable location option in the dropdown.
 * @param newLocation - The location string for this option.
 * @param currentLocation - The currently selected location.
 * @param onSelect - Function to select this location.
 */
const LocationOption = ({ newLocation, currentLocation, onSelect }: {
  newLocation: Location, currentLocation: Location, onSelect: (location: Location) => void;
}) => {
  const handleClick = () => {
    if (currentLocation !== newLocation) {
      onSelect(newLocation);
    }
  };

  return (
    <div
      className="cursor-pointer rounded px-3 transition-colors hover:bg-black/10"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleClick();
        }
      }}
    >
      <span className="BFont text-sm font-semibold text-green-950">{newLocation}</span>
    </div>
  );
};

LocationOption.displayName = 'LocationOption';

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      prompt(false);
    }
  };

  const handleLocationSelect = (newLocation: Location) => {
    setLocation(newLocation);
  };

  
  const refresh = useCallback(async () => {
    try {
      setOrderDisplay([]);
      await fetchOrders();
    } catch {
      // ignore
    }
  }, [fetchOrders, setOrderDisplay]);

  /**
 * @description returnLarger compares two Items by set, then box, then itemID
 */
export function returnLarger(item1: Item, item2: Item): number {
  const shallowCompare = (first: string | number | null, second: string | number | null) => {
    if (!first) { return 1; }
    if (!second) { return -1; }
    if (first > second) { return 1; }
    if (first < second) { return -1; }
    return 0;
  };
  let result = shallowCompare(item1.set, item2.set);
  if (result !== 0) { return result; }
  result = shallowCompare(item1.box, item2.box);
  if (result !== 0) { return result; }
  result = shallowCompare(item1.itemID, item2.itemID);
  return result;
}

  const detectInBox = (orderID: OrderID) => {
    const wow = orderDisplay.some((order) => order.box !== null && order.orderID === orderID);
    if (wow) { return 'brightness-50'; }
  };

    const renderItem = useCallback(
      (item: { orderID: OrderID; itemID: ItemID }, index: number) => {
        const itemData = findItemByID(orders, item.orderID, item.itemID);
        if (!itemData) {
          return null;
        }
        const itemKey = getItemKey(itemData, index);
        const selected = selectedItems.has(item.itemID);
        return (
          <OrderCardToPick
            key={itemKey}
            item={itemData}
            selected={selected}
            onCardClick={() => handleSelect(item.itemID)}
          />
        );
      },
      [orders, selectedItems, handleSelect]
    );

    
    
      const getItemKey = (item: ItemData, index: number) => `${item.orderID}-${item.itemID}-${index}`;
    
      const itemsToPick = useMemo(() => {
        return orderDisplay.flatMap((order) =>
          order.items.filter((item) => item.status === 'unPicked')
        ).sort(returnLarger);
      }, [orderDisplay]);
    
    
      const cards = useMemo(() => itemsToPick.map(renderItem), [itemsToPick, renderItem]);
    
      const itemLabel = selectedItems.size === 1 ? 'Item' : 'Items';
      const confirmButton = useMemo(() => { if (selectedItems.size === 0) { return null; }

      


        const getItemKey = (item: ItemData, index: number) => `${item.orderID}-${item.itemID}-${index}`;

  const renderItem = useCallback(
    (itemID: string, index: number) => {
      let itemData: ItemData | undefined;
      for (const order of orders) {
        itemData = order.items.find((item) => item.itemID === itemID);
        if (itemData) {
          break;
        }
      }
      if (!itemData) {
        return null;
      }
      const itemKey = getItemKey(itemData, index);
      const selected = selectedItems.has(itemID);
      return (
        <OrderCardQueuePile
          key={itemKey}
          item={itemData}
          selected={selected}
          onCardClick={() => handleSelect(itemID)}
        />
      );
    },
    [orders, selectedItems, handleSelect]
  );

  const { orderDisplay } = useOrderDisplay();
  const queueItemIDs = orderDisplay.flatMap((order) =>
    order.items.filter((item) => item.status === 'queue').map((item) => item.itemID)
  );
  const items = useMemo(() => queueItemIDs.map(renderItem), [queueItemIDs, renderItem]);

    // Count items by status
  const retrievedCount = order.items.filter((item) => item.status === 'inBox').length;
  const unretrievedCount = order.items.filter((item) => item.status !== 'inBox').length;

  const ariaLabel = orderData.customerName ? orderData.customerName : 'Order';

  
    const orderData = findOrderByID(orders, order.orderID);
  
    if (!orderData) { return; }
  
    const unretrievedContent =
      unretrievedItems.length > 0 ? unretrievedItems.map(renderItem) : <Empty />;
    const retrievedContent = retrievedItems.length > 0 ? retrievedItems.map(renderItem) : <Empty />;
    const previewContent =
      previewItem ? (
        <>
          <img
            src={previewItem.imageUrl}
            alt={previewItem.itemName || 'Preview'}
            className="mb-2 h-full max-h-[45vh] w-full rounded-xl object-contain"
          />
          <p className="mb-3 font-semibold text-white">{previewItem.itemName}</p>
          <div className="flex w-full flex-row flex-wrap items-center justify-center text-2xl">
            <Tags item={previewItem} />
          </div>
        </>
      ) : (
        <FlexColCenter className="h-full w-full text-white opacity-60">
          <span className="text-lg">{NO_PREVIEW_TEXT}</span>
        </FlexColCenter>
      );


      
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;
    const newError: { username?: string; password?: string; general?: string } = {};
    if (!username.trim()) {
      newError.username = 'Username is required.';
      hasError = true;
    }
    if (!password.trim()) {
      newError.password = 'Password is required.';
      hasError = true;
    }
    if (hasError) {
      setError(newError);
      return;
    }
    if (username !== 'ETBETB' || password !== 'ETBETB') {
      setError({ general: 'Invalid Username/Password' });
      return;
    }
    try {
      login({ username, password });
      setError({});
    } catch {
      setError({ general: 'Login failed. Please try again.' });
    }
  };

  // ─ Imports ──────────────────────────────────────────────────────────────────────────────────────────
import { OrderData, OrderID, ItemData, ItemID, Order, Status } from '../types';

// ─ Utility Functions ─────────────────────────────────────────────────────────────────────────────────

/**
 * Finds an order by its ID.
 * @param orders - The list of orders.
 * @param orderID - The order ID to search for.
 * @returns The matching OrderData or undefined.
 */
const findOrderByID = (orders: OrderData[] | null, orderID: OrderID): OrderData | undefined => {
  return orders?.find((order) => order.orderID === orderID);
};

/**
 * Gets all item IDs for an order.
 * @param order - The order to extract item IDs from.
 * @returns Array of item IDs.
 */
const getItemKeys = (order: OrderData): ItemID[] => {
  return order.items.map((item: ItemData) => item.itemID);
};

/**
 * Converts a list of OrderData to Order objects with item keys.
 * @param orders - The list of orders.
 * @returns Array of Order objects.
 */
const getOrderKeys = (orders: OrderData[]): Order[] => {
  return orders.map((order: OrderData) => {
    return {
      orderID: order.orderID,
      location: order.items[0]?.itemLocation,
      box: null,
      items: order.items.map((item) => ({
        itemID: item.itemID,
        orderID: order.orderID,
        set: item.itemSet ?? '',
        status: 'unPicked' as Status,
        box: null,
      })),
    };
  });
};

/**
 * Finds an item by its order and item ID.
 * @param orders - The list of orders.
 * @param orderID - The order ID.
 * @param itemID - The item ID.
 * @returns The matching ItemData or undefined.
 */
const findItemByID = (
  orders: OrderData[],
  orderID: OrderID,
  itemID: ItemID
): ItemData | undefined => {
  const order = findOrderByID(orders, orderID);
  return order?.items.find((item) => item.itemID === itemID);
};


    const imageClass = useMemo(
      () =>
        `h-full cursor-pointer rounded-lg hover:brightness-50 hover:shadow-lg transition-all ${className}`,
      [className]
    );

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        onClick?.(event);
      },
      [onClick]
    );


    
  const renderOrder = useCallback(
    (order: Order, index: number) => (
      <CustomerInfo key={order.orderID} order={order} index={index + 1} />
    ),
    []
  );

  const ordersToDisplay = useMemo(() => {
    const filtered = orderDisplay.slice(0, 24);
    return filtered.map((order, idx) => renderOrder(order, idx));
  }, [orderDisplay, renderOrder]);