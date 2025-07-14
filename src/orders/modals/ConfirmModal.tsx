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
  const [employee, setEmployee] = useState<string>('')

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
      <ImageDisplay imageUrl={previewItem.imageUrl} className='w-auto h-full max-h-80' onClick={() => { }} />
      <span className="text-sm font-medium truncate text-green-smoke-100 text-nowrap">
        {previewItem.itemName}
      </span>
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
      <div className="flex min-w-[70vw] flex-row items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <FlexColCenter className="w-full gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-bold text-center text-white">
                {orderData.customerName}
              </span>
              <FlexRow className="gap-2">
                <TagPill className="bg-green-smoke-300/40 ring-2">{orderData.orderID}</TagPill>
                <TagPill className="bg-green-smoke-300/40 ring-2">
                  {orderData.deliveryMethod}
                </TagPill>
              </FlexRow>
            </div>
            <div className="flex flex-col w-full h-full gap-3 flex-1/2">
              <SectionTitle>{UNRETRIEVED_TITLE}</SectionTitle>
              <div className="p-2 rounded-2xl bg-black/10">
                <ScrollContainer className="flex-row flex-wrap w-full max-h-50">
                  {unretrievedContent}
                </ScrollContainer>
              </div>
              <SectionTitle>{RETRIEVED_TITLE}</SectionTitle>
              <div className="p-2 rounded-2xl bg-black/10">
                <ScrollContainer className="flex-row flex-wrap w-full max-h-50">
                  {retrievedContent}
                </ScrollContainer>
              </div>
            </div>
            <FlexRow className='justify-center gap-4'>
              <SelectEmployee confirmedEmployee={employee} setConfirmedEmployee={setEmployee} />
              <Button
                icon={<ThumbUpAltIcon />}
                label="Confirm"
                onClick={handleConfirm}
                disabled={unretrievedItems.length !== 0}
              />
            </FlexRow>
          </FlexColCenter>
        </div>
        <div className="flex-col items-center justify-center hidden w-full h-full p-5 flex-2/3 rounded-2xl bg-black/10 md:flex">
          {previewContent}
        </div>
      </div>
    </ModalContainer>
  );
});

ConfirmModal.displayName = 'ConfirmModal';

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default ConfirmModal;
