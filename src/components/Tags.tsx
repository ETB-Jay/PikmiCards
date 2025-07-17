// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';

import { ItemData } from '../types';
import { useOrderDisplay } from '../context/useContext';
import { ChildrenAndClassProps } from '../interfaces';
import { cn } from '../context/functions';

import { FlexRow } from './containers';


/**
 * @description TagPill renders a pill containing information about something.
 */
const TagPill = memo(({ children, className = '' }: ChildrenAndClassProps): React.ReactNode => (
    <span className={cn("flex flex-nowrap gap-1 items-center justify-center rounded-2xl bg-green-900 px-1.5 py-0.5 text-center text-xs font-semibold text-wrap text-white ring-2 ring-green-950", className)}>
      {children}
    </span>
  )
);
TagPill.displayName = 'TagPill';

/**
 * @description Tags component displays item tags (quantity, printing, box, rarity, set).
 */
const Tags = ({ item, className = '' }: { item: ItemData; className?: string }) => {
  const { orderDisplay } = useOrderDisplay();

  const tags: { value: string; icon?: string; alt?: string }[] = [];
  tags.push({ icon: '/Cart.svg', alt: 'Cart', value: String(item.itemQuantity) });
  if (item.itemPrinting) { tags.push({ value: item.itemPrinting }); }
  if (item.itemRarity) { tags.push({ value: item.itemRarity }); }
  if (item.itemSet) { tags.push({ value: item.itemSet }); }

  const order = orderDisplay.find((order => order.orderID === item.orderID));

  if (order && order.box) {
    tags.push({
      icon: '/ClosedBox.svg',
      alt: 'Box',
      value: String(order.box),
    });
  }

  return (
    <FlexRow className={cn("flex-wrap items-center justify-start gap-1 min-h-[24px]", className)}>
      {tags.map((tag) => (
        <TagPill
          key={`${tag.value}-${tag.icon || ''}-${item.itemID}`}
          className={cn("inline-flex items-center px-2 py-0.5 gap-1.5 transition-colors")}
        >
          {tag.icon && (
            <img
              src={tag.icon}
              alt={tag.alt || ''}
              className={cn("flex-shrink-0 object-contain w-3 h-3")}
            />
          )}
          <span className={cn("text-xs font-medium whitespace-nowrap")}>{tag.value}</span>
        </TagPill>
      ))}
    </FlexRow>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export { Tags, TagPill };
