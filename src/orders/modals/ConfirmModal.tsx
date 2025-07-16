// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { useState, memo, useMemo } from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

import { Order, ItemData } from '../../types';
import { ModalContainer, ScrollContainer, FlexColCenter, FlexRow } from '../../components/containers';
import { Button, SectionTitle, Empty } from '../../components/formComponents';
import { useConfirm, useLocation, useOrderDisplay, useOrders } from '../../context/useContext';
import { findOrderDataByOrder, cn } from '../../context/functions';
import OrderCard from '../components/OrderCard';
import { Tags, TagPill } from '../components/Tags';
import { ImageDisplay } from '../components/ImageDisplay';
import SelectEmployee from '../components/SelectEmployee';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const UNRETRIEVED_TITLE = 'Unretrieved Items';
const RETRIEVED_TITLE = 'Retrieved Items';
const EMPTY_PREVIEW_TEXT = 'Click an item to preview';
const EMPTY_BOX_TEXT = "No unretrieved items"

// ─ Memoized Components ───────────────────────────────────────────────────────────────────────────
const DisplayContent = memo(({ content, onSelect }: { content: ItemData[]; onSelect: (item: ItemData) => void }) => (
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
));
DisplayContent.displayName = "DisplayContent";

const DisplayItems = memo(({ content, title, onSelect }: { content: ItemData[]; title: string; onSelect: (item: ItemData) => void }) => {
  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <div className={cn("p-2 rounded-2xl bg-black/10")}>
        <ScrollContainer className={cn("flex-row flex-wrap w-full max-h-35")}>
          <DisplayContent content={content} onSelect={onSelect} />
        </ScrollContainer>
      </div>
    </>
  );
});
DisplayItems.displayName = "DisplayItems";

const PreviewContent = memo(({ previewItem }: { previewItem: ItemData | null }) => (
  previewItem ? (
    <div className={cn("flex flex-col items-center gap-2")}>
      <ImageDisplay imageUrl={previewItem.imageUrl} className={cn("w-auto h-full max-h-80")} />
      <span className={cn("text-sm font-medium truncate text-green-smoke-100 whitespace-nowrap")}>
        {previewItem.itemName}
      </span>
      <Tags item={previewItem} />
    </div>
  ) : (
    <div className={cn("text-gray-400")}>{EMPTY_PREVIEW_TEXT}</div>
  )
));
PreviewContent.displayName = "PreviewContent";

/**
 * @description ConfirmModal displays a modal for confirming order completion and viewing item details.
 */
const ConfirmModal = memo(({ order }: { order: Order }) => {
  const { orders } = useOrders();
  const { orderDisplay } = useOrderDisplay();
  const { onConfirm } = useConfirm();
  const { location } = useLocation();
  const [previewItem, setPreviewItem] = useState<ItemData | null>(null);
  const [employee, setEmployee] = useState<string>('');

  const orderData = findOrderDataByOrder(orders, order, location);

  const itemMap = useMemo(() => {
    if (!orderData) { return {} };
    return Object.fromEntries(
      orderData.items.map(item => [item.itemID, item])
    );
  }, [orderData]);

  if (!orderData) { return null; }

  const getItemsByFilter = (filterFn: (status: string) => boolean) =>
    order.items
      .filter(item => filterFn(item.status))
      .map(item => itemMap[item.itemID])
      .filter(Boolean) as ItemData[];

  const unretrievedItems = getItemsByFilter(status => status !== 'inBox');
  const retrievedItems = getItemsByFilter(status => status === 'inBox');

  const handleConfirm = () => {
    onConfirm(order, orderDisplay, employee, location);
  };

  const canConfirm = ((retrievedItems.length === orderData.numberItems) && employee);

  return (
    <ModalContainer>
      <div
        className={cn("flex min-w-[70vw] flex-row items-center justify-center gap-5")}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={cn("flex flex-col items-center justify-center w-full gap-4")}>
          <FlexColCenter className={cn("w-full gap-4")}>
            <div className={cn("flex flex-col gap-2")}>
              <span
                id="modal-title"
                className={cn("text-lg font-bold text-center text-white")}
              >
                {orderData.customerName}
              </span>
              <FlexRow className={cn("gap-2")}>
                <TagPill className={cn("bg-green-smoke-300/40 ring-2")}>{orderData.orderID}</TagPill>
                <TagPill className={cn("bg-green-smoke-300/40 ring-2")}>
                  {orderData.deliveryMethod}
                </TagPill>
              </FlexRow>
            </div>

            <div className={cn("flex flex-col w-full h-full gap-3 flex-1/2")}>
              <DisplayItems content={unretrievedItems} title={UNRETRIEVED_TITLE} onSelect={setPreviewItem} />
              <DisplayItems content={retrievedItems} title={RETRIEVED_TITLE} onSelect={setPreviewItem} />
            </div>

            <FlexRow className={cn("justify-center gap-4")}>
              <SelectEmployee confirmedEmployee={employee} setConfirmedEmployee={setEmployee} />
              <Button
                icon={<ThumbUpAltIcon />}
                label="Confirm"
                onClick={handleConfirm}
                disabled={!canConfirm}
              />
            </FlexRow>
          </FlexColCenter>
        </div>

        <div className={cn("flex-col items-center justify-center hidden w-full h-full p-5 flex-2/3 rounded-2xl bg-black/10 md:flex")}>
          <PreviewContent previewItem={previewItem} />
        </div>
      </div>
    </ModalContainer>
  );
});
ConfirmModal.displayName = 'ConfirmModal';

// ─ Exports ───────────────────────────────────────────────────────────────────────────────────────────
export default ConfirmModal;
