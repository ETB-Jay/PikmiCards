// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ItemData } from '../../types';
import { useOrderDisplay } from '../../context/useContext';
import { FlexColCenter, FlexRow } from '../../components/containers';
import { TagPill } from '../../components/formComponents';

/**
 * Tags component displays item tags (quantity, printing, box, rarity, set).
 * Shows: quantity, printing (abbreviated), rarity, set, and box (if available).
 * @param item - The item to display tags for.
 * @param className - Additional CSS classes.
 */
const Tags = ({ item, className = '' }: { item: ItemData; className?: string }) => {
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
    (order): order is import('../../types').Order => order.orderID === item.orderID
  );
  if (order && order.box) {
    tags.push({
      icon: '/ClosedBox.svg',
      alt: 'Box',
      value: String(order.box),
    });
  }

  return (
    <FlexRow
      className={`flex-wrap items-center justify-start gap-1 min-h-[24px] ${className}`}
    >
      {tags.map((tag) => (
        <TagPill
          key={`${tag.value}-${tag.icon || ''}-${item.itemID}`}
          className="inline-flex items-center px-2 py-0.5 gap-1.5 bg-green-smoke-800/60 hover:bg-green-smoke-700/60 transition-colors"
        >
          {tag.icon && (
            <img
              src={tag.icon}
              alt={tag.alt || ''}
              className="flex-shrink-0 object-contain w-3 h-3"
            />
          )}
          <span className="text-xs font-medium whitespace-nowrap">{tag.value}</span>
        </TagPill>
      ))}
    </FlexRow>
  );
};

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Tags;
