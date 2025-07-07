// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { ReactNode } from 'react';

import ToPick from './sections/ToPick';
import QueuePile from './sections/QueuePile';
import CardGridDisplay from './sections/CardGridDisplay';

/**
 * GridContainer wraps content in a styled flex column with optional className.
 * @param content - The content to display inside the container.
 * @param className - Additional CSS classes for the container.
 */
const GridContainer = ({
  content,
  className = '',
}: {
  content: ReactNode;
  className: string | undefined;
}) => {
  return <div className={`flex flex-col rounded-2xl bg-white/20 p-2 ${className}`}>{content}</div>;
};

/**
 * CardPicker is the main layout for the picking workflow.
 * It displays the ToPick, CardGridDisplay, and QueuePile sections in a grid.
 */
const CardPicker = (): React.ReactElement => {
  return (
    <div className="grid h-full max-h-[calc(95vh-3.75rem)] w-full grid-cols-1 gap-2 lg:grid-cols-[45%_54.5%] lg:grid-rows-[calc(99.5%-8rem)_8rem] lg:gap-[0.5%] xl:grid-cols-[39%_60.5%]">
      <GridContainer content={<ToPick />} className="row-span-2 max-h-[70vh] lg:max-h-none" />
      <GridContainer content={<CardGridDisplay />} className="" />
      <GridContainer content={<QueuePile />} className="" />
    </div>
  );
};

CardPicker.displayName = 'CardPicker';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default CardPicker;
