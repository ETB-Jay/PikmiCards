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
 * @param className - Additional CSS classes for the button.
 * @param ...props - Standard button props.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  hideSmall?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, icon, className = '', hideSmall = false, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={` bg-green-smoke-700/60 border-green-smoke-900 focus:ring-green-smoke-800 hover:brightness-75 inline-flex w-fit max-w-30 cursor-pointer items-center justify-center gap-2 rounded-md border px-2 py-1 font-bold text-white shadow-lg transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-400 disabled:opacity-80 ${className}`}
      {...props}
    >
      {icon}
      <span className={`BFont text-xs font-bold ${hideSmall && 'hidden sm:flex'}`}>{label}</span>
    </button>
  )
);
Button.displayName = 'Button';

/**
 * Tags component displays item tags (quantity, printing, box, rarity, set).
 * Shows: quantity, printing (abbreviated), rarity, set, and box (if available).
 * @param item - The item to display tags for.
 * @param className - Additional CSS classes.
 */
const Tags = ({ item, className = '' }: { item: ItemData; className?: string }) => {
  const { orderDisplay } = useOrderDisplay();

  const tags: { value: string; icon?: string; alt?: string }[] = [];
  tags.push({
    icon: '/Cart.svg',
    alt: 'Cart',
    value: String(item.itemQuantity),
  });
  if (item.itemPrinting) {
    tags.push({
      value: item.itemPrinting
        .split(/\s+/)
        .map((tag) => tag[0])
        .join(''),
    });
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
    <div className="flex flex-row flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={`${tag.value}-${tag.icon || ''}-${item.itemID || item.orderID || ''}`}
          className={`flex items-center gap-1 rounded-2xl bg-green-900 px-1.5 py-0.5 text-center text-xs font-semibold text-white ring-2 ring-green-950 ${className}`}
        >
          {tag.icon && <img src={tag.icon} alt={tag.alt || ''} className="mr-1 inline h-3 w-3" />}
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
const SectionTitle = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => <h2 className={`text-green-smoke-300 text-lg font-bold ${className}`}>{children}</h2>;

/**
 * TagPill component for displaying tags, pills, or highlighted text.
 * @param children - The tag content.
 * @param className - Additional CSS classes.
 */
const TagPill = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`mb-1.5 block rounded-2xl px-1.5 py-0.5 text-center text-xs font-semibold text-wrap ${className}`}
  >
    {children}
  </span>
);

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export { Button, Tags, SectionTitle, TagPill };
