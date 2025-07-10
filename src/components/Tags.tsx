// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ItemData } from '../types';
import { useOrderDisplay } from '../context/useContext';

import { TagPill } from './formComponents';
import { FlexRow } from './containers';

/**
 * Tags component displays item tags (quantity, printing, box, rarity, set).
 * Shows: quantity, printing (abbreviated), rarity, set, and box (if available).
 * @param item - The item to display tags for.
 * @param className - Additional CSS classes.
 */
const Tags = ({ item }: { item: ItemData }) => {
  const { orderDisplay } = useOrderDisplay();

  const tags: { value: string; icon?: string; alt?: string }[] = [];
  tags.push({ icon: '/Cart.svg', alt: 'Cart', value: String(item.itemQuantity) });
  if (item.itemPrinting) {
    tags.push({ value: item.itemPrinting });
  }
  if (item.itemRarity) {
    tags.push({ value: item.itemRarity });
  }
  if (item.itemSet) {
    tags.push({ value: item.itemSet });
  }

  const order = orderDisplay.find(
    (order): order is import('../types').Order => order.orderID === item.orderID
  );
  if (order && order.box) {
    tags.push({
      icon: '/ClosedBox.svg',
      alt: 'Box',
      value: String(order.box),
    });
  }

  return (
    <FlexRow>
      {tags.map((tag) => (
        <TagPill key={`${tag.value}-${tag.icon || ''}-${item.itemID}`}>
          {tag.icon && <img src={tag.icon} alt={tag.alt || ''} className="mr-1 inline h-3 w-3" />}
          {tag.value}
        </TagPill>
      ))}
    </FlexRow>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Tags;
