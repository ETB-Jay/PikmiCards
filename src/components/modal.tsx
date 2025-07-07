// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { PropsWithChildren } from 'react';

import { ItemData } from '../types';
import { useOrderDisplay } from '../context/useContext';

/**
 * Modal UI components for PikmiCards.
 * Includes Button, Tags, and SectionTitle for use in modals and cards.
 *
 * @module modal
 */

/**
 * Button component for modal actions.
 * @param label - The button label text.
 * @param icon - Optional icon element.
 * @param className - Additional CSS classes.
 * @param ...props - Standard button props.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

const Button = ({ label, icon, ...props }: ButtonProps) => (
  <button
    type='button'
    className="inline-flex items-center justify-center gap-2 px-2 py-1 rounded-md font-bold text-white bg-green-smoke-700/60 border border-green-smoke-900 shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-smoke-800 focus:ring-offset-2 hover:from-green-smoke-600 hover:to-green-smoke-400 disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:opacity-80 cursor-pointer w-fit max-w-30"
    {...props}
  >
    {icon}
    <span className="font-bold text-sm BFont">
      {label}
    </span>
  </button>
);

/**
 * Tags component displays item tags (quantity, printing, box, rarity, set).
 * @param item - The item to display tags for.
 * @param className - Additional CSS classes.
 */
const Tags: React.FC<PropsWithChildren<{
  item: ItemData,
  className?: string
}>> = ({ item, className = '' }) => {
  const { orderDisplay } = useOrderDisplay();

  const tags: { value: string; icon?: string; alt?: string }[] = [];
  tags.push({
    icon: '/Cart.svg',
    alt: 'Cart',
    value: String(item.itemQuantity)
  });
  if (item.itemPrinting) {
    tags.push({
      value: item.itemPrinting.split(/\s+/).map(tag => tag[0]).join('')
    });
  }
  if (item.itemRarity) { tags.push({ value: item.itemRarity }); }
  if (item.itemSet) { tags.push({ value: item.itemSet }); }

  const order = orderDisplay.find((order): order is import('../types').Order =>
    order.orderID === item.orderID
  );
  if (order && order.box) {
    tags.push({
      icon: '/ClosedBox.svg',
      alt: 'Box',
      value: String(order.box)
    });
  }

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.value + tag.icon || ''}
          className={`bg-green-900 text-white py-0.5 px-1.5 rounded-2xl ring-2 ring-green-950 text-xs font-semibold text-center flex items-center gap-1 ${className}`}
        >
          {tag.icon && (
            <img
              src={tag.icon}
              alt={tag.alt || ''}
              className="inline w-3 h-3 mr-1"
            />
          )}
          {tag.value}
        </span>
      ))}
    </div>
  );
};

/**
 * SectionTitle component for section headers (modals, pages, etc).
 * @param children - The section title content.
 * @param className - Additional CSS classes (e.g., for color).
 */
const SectionTitle = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <h2 className={`text-2xl font-bold text-green-smoke-300 ${className}`}>{children}</h2>
);

/**
 * TagPill component for displaying tags, pills, or highlighted text.
 * @param children - The tag content.
 * @param className - Additional CSS classes.
 */
const TagPill = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <span className={`rounded-2xl px-1.5 py-0.5 text-xs font-semibold text-center block text-wrap mb-1.5 ${className}`}>
    {children}
  </span>
);

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export { Button, Tags, SectionTitle, TagPill }; 
