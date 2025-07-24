// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement, ReactNode, useMemo } from 'react';

import TagPill from './TagPill';
import { cn } from '../../context/functions';
import { useOrderDisplay } from '../../context/useContext';
import { ItemData } from '../../types';
import FlexRow from '../containers/FlexRow';
import ClosedBoxIcon from '../icons/ClosedBoxIcon';
import ShoppingCartIcon from '../icons/ShoppingCartIcon';


/**
 * Tags component displays item tags (quantity, printing, box, rarity, set).
 * @param item - The item data to display tags for
 * @param className - Additional CSS classes
 */
const Tags = memo(
  ({ item, className = '' }: { item: ItemData; className?: string }): ReactElement => {
    const { orderDisplay } = useOrderDisplay();

    const tags = useMemo(() => {
      const tagList: { value: string; icon?: ReactNode; alt?: string; type: string }[] = [];
      
      tagList.push({ 
        icon: <ShoppingCartIcon className="h-3 w-3 flex-shrink-0 object-contain" />, 
        alt: 'Cart', 
        value: String(item.itemQuantity), 
        type: 'quantity' 
      });
      
      if (item.itemPrinting) { 
        tagList.push({ value: item.itemPrinting, type: 'printing' }); 
      }
      if (item.itemRarity) { 
        tagList.push({ value: item.itemRarity, type: 'rarity' }); 
      }
      if (item.itemSet) { 
        tagList.push({ value: item.itemSet, type: 'set' }); 
      }

      const order = orderDisplay.find((order) => order.orderID === item.orderID);
      if (order && order.box) {
        tagList.push({
          icon: <ClosedBoxIcon className="h-3 w-3 flex-shrink-0 object-contain" />, 
          alt: 'Box',
          value: String(order.box),
          type: 'box',
        });
      }

      return tagList;
    }, [item.itemQuantity, item.itemPrinting, item.itemRarity, item.itemSet, item.orderID, orderDisplay]);

    return (
      <FlexRow className={cn('min-h-[24px] flex-wrap items-center justify-start gap-1', className)}>
        {tags.map((tag) => (
          <TagPill
            key={`${tag.type}-${tag.value}-${item.itemID}`}
            className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 transition-colors')}
          >
            {tag.icon}
            <span className={cn('text-xs font-medium whitespace-nowrap')}>{tag.value}</span>
          </TagPill>
        ))}
      </FlexRow>
    );
  }
);
Tags.displayName = 'Tags';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Tags;
