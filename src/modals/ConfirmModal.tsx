// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useState, memo, useMemo } from 'react';

import {
  Button,
  SectionTitle,
  Empty,
  ImageDisplay,
  ScrollContainer,
  FlexColCenter,
  FlexRow,
  ModalContainer,
  OrderCard,
  SelectEmployee,
  Tags,
  TagPill,
  EmptyImage,
} from '../components';
import { findOrderDataByOrder, cn } from '../context/functions';
import { useConfirm, useStoreLocation, useOrderDisplay, useOrders } from '../context/useContext';
import { Order, ItemData, OrderData } from '../types';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const UNRETRIEVED_TITLE = 'Unretrieved Items';
const RETRIEVED_TITLE = 'Retrieved Items';
const EMPTY_PREVIEW_TEXT = 'Click an item to preview';
const EMPTY_PREVIEW_ALT = 'No preview selected';
const EMPTY_BOX_TEXT = 'No unretrieved items';

/** TagPillContent renders a label-value pair for use in a TagPill. */
const TagPillContent = ({ label, value }: { label: string; value: string | null | undefined }) => {
  const colon = ':';
  return [
    <span key="label" className="mr-1 font-bold">
      {String(label)}
      {colon}
    </span>,
    <span key="value" className="font-normal">
      {value ?? ''}
    </span>,
  ];
};

/** Returns an array of order field objects for tag display. */
const getOrderFields = (orderData: OrderData) => [
  {
    label: 'Order ID',
    value:
      typeof orderData.orderID === 'string'
        ? orderData.orderID.replace(/^#/, '')
        : orderData.orderID,
  },
  { label: 'Delivery', value: orderData.deliveryMethod },
  { label: 'Email', value: orderData.email },
  { label: 'Phone', value: orderData.phone },
  { label: 'Requires Shipping', value: orderData.requiresShipping ? 'Yes' : 'No' },
  { label: 'Paid', value: orderData.paid },
];

/** Renders tag pills for customer/order fields. */
const CustomerTags = (orderFields: { label: string; value: string | null | undefined }[]) => (
  <div className="my-2 flex w-full flex-wrap items-center justify-center gap-2">
    {orderFields
      .filter(({ value }) => value)
      .map(({ label, value }) => (
        <TagPill key={label}>{TagPillContent({ label, value })}</TagPill>
      ))}
  </div>
);

/** Helper to get items by a filter on their status. */
const getItemsByFilter = (
  order: Order,
  itemMap: Record<string, ItemData>,
  filterFn: (status: string) => boolean
): ItemData[] =>
  order.items
    .filter((item) => filterFn(item.status))
    .map((item) => itemMap[item.itemID])
    .filter(Boolean) as ItemData[];

/** DisplayContent renders a list of items or an empty state. */
const DisplayContent = memo(
  ({ content, onSelect }: { content: ItemData[]; onSelect: (item: ItemData) => void }) =>
    content.length === 0 ? (
      <Empty text={EMPTY_BOX_TEXT} />
    ) : (
      <FlexRow>
        {content.map((item) => (
          <div
            key={item.itemID}
            onClick={() => onSelect(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter' || ev.key === ' ') {
                onSelect(item);
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            <OrderCard
              item={item}
              largeDisplay={false}
              selectable={false}
              onImageClick={() => onSelect(item)}
            />
          </div>
        ))}
      </FlexRow>
    )
);
DisplayContent.displayName = 'DisplayContent';

/** DisplayItems renders a titled section with scrollable item content. */
const DisplayItems = memo(
  ({
    content,
    title,
    onSelect,
  }: {
    content: ItemData[];
    title: string;
    onSelect: (item: ItemData) => void;
  }) => (
    <>
      <SectionTitle>{title}</SectionTitle>
      <div className={cn('rounded-2xl bg-black/10 p-2')}>
        <ScrollContainer className={cn('max-h-35 w-full flex-row flex-wrap')}>
          <DisplayContent content={content} onSelect={onSelect} />
        </ScrollContainer>
      </div>
    </>
  )
);
DisplayItems.displayName = 'DisplayItems';

/** PreviewContent displays a preview of the selected item, or a placeholder if none is selected. */
const PreviewContent = memo(({ previewItem }: { previewItem: ItemData | null }) =>
  previewItem ? (
    <div className={cn('flex flex-col items-center gap-2')}>
      <ImageDisplay imageUrl={previewItem.imageUrl} className={cn('h-full max-h-80 w-auto')} />
      <span className={cn('text-green-smoke-100 truncate text-sm font-medium whitespace-nowrap')}>
        {previewItem.itemName}
      </span>
      <Tags item={previewItem} className="items-center justify-center" />
    </div>
  ) : (
    <div className={cn('flex flex-col items-center justify-center w-full h-full')}> 
      <EmptyImage className="h-40 w-auto opacity-60 mb-2" />
      <span className="text-gray-400">{EMPTY_PREVIEW_ALT}</span>
    </div>
  )
);
PreviewContent.displayName = 'PreviewContent';

/** EmptyImagePreview displays the empty preview image and message. */
const EmptyImagePreview = memo(() => (
  <div className={cn('flex h-full w-full flex-col items-center justify-center gap-2')}>
    <img
      src="/EmptyImage.svg"
      alt={EMPTY_PREVIEW_ALT}
      className={cn('h-full max-h-30 w-full max-w-xs object-contain opacity-60')}
      style={{ display: 'block', margin: '0 auto' }}
    />
    <div className={cn('text-gray-400')}>{EMPTY_PREVIEW_TEXT}</div>
  </div>
));
EmptyImagePreview.displayName = 'EmptyImagePreview';

/** ConfirmModal displays a modal for confirming order completion and viewing item details. */
const ConfirmModal = memo(({ order }: { order: Order }) => {
  const { orders } = useOrders();
  const { orderDisplay } = useOrderDisplay();
  const { onConfirm } = useConfirm();
  const { storeLocation } = useStoreLocation();
  const [previewItem, setPreviewItem] = useState<ItemData | null>(null);
  const [employee, setEmployee] = useState<string>('');

  // Find the order data for the current order and location
  const orderData = findOrderDataByOrder(orders, order, storeLocation);

  // Map itemID to ItemData for quick lookup
  const itemMap = useMemo(() => {
    if (!orderData) {
      return {};
    }
    return Object.fromEntries(orderData.items.map((item) => [item.itemID, item]));
  }, [orderData]);

  if (!orderData) {
    return null;
  }

  const unretrievedItems = getItemsByFilter(order, itemMap, (status) => status !== 'inBox');
  const retrievedItems = getItemsByFilter(order, itemMap, (status) => status === 'inBox');

  /** Handler for confirming the order. */
  const handleConfirm = () => {
    onConfirm(order, orderDisplay, employee, storeLocation);
  };

  /** Only allow confirm if all items are retrieved and an employee is selected. */
  const canConfirm = (retrievedItems.length === orderData.numberItems) && employee;

  return (
    <ModalContainer>
      <div
        className={cn('flex min-w-[70vw] flex-row items-center justify-center gap-5')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={cn('flex w-full flex-col items-center justify-center gap-4')}>
          <FlexColCenter className={cn('w-full gap-4')}>
            <div className={cn('flex flex-col gap-2')}>
              <span id="modal-title" className={cn('text-center text-lg font-bold text-white')}>
                {orderData.customerName}
              </span>
              {CustomerTags(getOrderFields(orderData))}
            </div>
            <div className={cn('flex h-full w-full flex-1/2 flex-col gap-3')}>
              <DisplayItems
                content={unretrievedItems}
                title={UNRETRIEVED_TITLE}
                onSelect={setPreviewItem}
              />
              <DisplayItems
                content={retrievedItems}
                title={RETRIEVED_TITLE}
                onSelect={setPreviewItem}
              />
            </div>
            <FlexRow className={cn('!flex-nowrap justify-center gap-4')}>
              <SelectEmployee confirmedEmployee={employee} setConfirmedEmployee={setEmployee} />
              <Button
                icon={<ThumbUpAltIcon fontSize="small" />}
                label="Confirm"
                onAction={handleConfirm}
                disabled={!canConfirm}
              />
            </FlexRow>
          </FlexColCenter>
        </div>
        <div
          className={cn(
            'hidden h-full w-full flex-2/3 flex-col items-center justify-center rounded-2xl bg-black/10 p-5 md:flex'
          )}
        >
          <PreviewContent previewItem={previewItem} />
        </div>
      </div>
    </ModalContainer>
  );
});
ConfirmModal.displayName = 'ConfirmModal';

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default ConfirmModal;
