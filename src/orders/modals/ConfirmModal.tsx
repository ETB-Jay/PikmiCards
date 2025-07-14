// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useState, memo } from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

import { Order, ItemData } from '../../types';
import { ModalContainer, ScrollContainer, FlexColCenter, FlexRow } from '../../components/containers';
import { Button, SectionTitle, TagPill, Empty } from '../../components/formComponents';
import { useConfirm, useLocation, useOrderDisplay, useOrders } from '../../context/useContext';
import { findOrderDataByOrder } from '../../context/functions';
import OrderCard from '../components/OrderCard';
import Tags from '../components/Tags';
import { ImageDisplay } from '../components/ImageDisplay';
import SelectEmployee from '../components/SelectEmployee';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const UNRETRIEVED_TITLE = 'Unretrieved Items';
const RETRIEVED_TITLE = 'Retrieved Items';
const EMPTY_PREVIEW_TEXT = 'Click an item to preview';

// Define ConfirmModalProps
interface ConfirmModalProps {
  order: Order;
  onClose: () => void;
}

/**
 * ConfirmModal displays a modal for confirming order completion and viewing item details.
 * @param order - The order to confirm.
 * @param onClose - Function to close the modal.
 */
const ConfirmModal = memo(({ order, onClose }: ConfirmModalProps) => {
  const { orders } = useOrders();
  const { orderDisplay } = useOrderDisplay();
  const { onConfirm } = useConfirm();
  const { location } = useLocation();
  const [previewItem, setPreviewItem] = useState<ItemData | null>(null);

  const orderData = findOrderDataByOrder(orders, order, location);
  if (!orderData) { return null; }

  // Define unretrievedItems and retrievedItems as before
  const unretrievedItems = order.items
    .filter((item) => item.status !== 'inBox')
    .map((item) => orderData.items.find((data: ItemData) => data.itemID === item.itemID))
    .filter(Boolean) as ItemData[];

  const retrievedItems = order.items
    .filter((item) => item.status === 'inBox')
    .map((item) => orderData.items.find((data: ItemData) => data.itemID === item.itemID))
    .filter(Boolean) as ItemData[];

  // Render unretrieved and retrieved items
  const handlePreviewKeyDown = (item: ItemData) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setPreviewItem(item);
    }
  };

  const unretrievedContent =
    unretrievedItems.length === 0 ? (
      <Empty text="No unretrieved items" />
    ) : (
      <FlexRow>
        {unretrievedItems.map((item) => (
          <div
            key={item.itemID}
            onClick={() => setPreviewItem(item)}
            role="button"
            tabIndex={0}
            onKeyDown={handlePreviewKeyDown(item)}
            style={{ cursor: 'pointer' }}
          >
            <OrderCard
              item={item}
              largeDisplay={false}
              selectable={false}
              onImageClick={() => setPreviewItem(item)}
            />
          </div>
        ))}
      </FlexRow>
    );

  const retrievedContent =
    retrievedItems.length === 0 ? (
      <Empty text="No retrieved items" />
    ) : (
      <div className="flex flex-row flex-wrap gap-2">
        {retrievedItems.map((item) => (
          <div
            key={item.itemID}
            onClick={() => setPreviewItem(item)}
            role="button"
            tabIndex={0}
            onKeyDown={handlePreviewKeyDown(item)}
            style={{ cursor: 'pointer' }}
          >
            <OrderCard
              item={item}
              largeDisplay={false}
              selectable={false}
              onImageClick={() => setPreviewItem(item)}
            />
          </div>
        ))}
      </div>
    );

  const previewContent = previewItem ? (
    <div className="flex flex-col items-center gap-2">
      <ImageDisplay imageUrl={previewItem.imageUrl} onClick={() => { }} />
      <Tags item={previewItem} />
    </div>
  ) : (
    <div className="text-gray-400">{EMPTY_PREVIEW_TEXT}</div>
  );

  const handleConfirm = () => {
    onConfirm(order, orderDisplay);
    onClose();
  };

  return (
    <ModalContainer className="" onClose={onClose}>
      <div className="flex min-w-[70vw] flex-row items-center justify-center gap-10">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <FlexColCenter className="w-full gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-center text-lg font-bold text-white">
                {orderData.customerName}
              </span>
              <FlexRow className="gap-2">
                <TagPill className="bg-green-smoke-300/40 ring-2">{orderData.orderID}</TagPill>
                <TagPill className="bg-green-smoke-300/40 ring-2">
                  {orderData.deliveryMethod}
                </TagPill>
              </FlexRow>
            </div>
            <div className="flex h-full w-full flex-1/2 flex-col gap-3">
              <SectionTitle>{UNRETRIEVED_TITLE}</SectionTitle>
              <div className="rounded-2xl bg-black/10 p-2">
                <ScrollContainer className="max-h-50 w-full flex-row flex-wrap">
                  {unretrievedContent}
                </ScrollContainer>
              </div>
              <SectionTitle>{RETRIEVED_TITLE}</SectionTitle>
              <div className="rounded-2xl bg-black/10 p-2">
                <ScrollContainer className="max-h-50 w-full flex-row flex-wrap">
                  {retrievedContent}
                </ScrollContainer>
              </div>
            </div>
            <FlexRow className='justify-center gap-4'>
              <SelectEmployee />
              <Button
                icon={<ThumbUpAltIcon />}
                label="Confirm"
                onClick={handleConfirm}
                disabled={unretrievedItems.length !== 0}
              />
            </FlexRow>
          </FlexColCenter>
        </div>
        <div className="hidden h-full min-h-[70vh] w-full flex-1/2 flex-col items-center justify-center rounded-2xl bg-black/10 p-5 md:flex">
          {previewContent}
        </div>
      </div>
    </ModalContainer>
  );
});

ConfirmModal.displayName = 'ConfirmModal';

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default ConfirmModal;
