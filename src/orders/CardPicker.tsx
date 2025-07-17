// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';

import { ChildrenAndClassProps } from '../interfaces';
import { cn } from '../context/functions';

import ToPick from './sections/ToPick';
import QueuePile from './sections/QueuePile';
import CardGridDisplay from './sections/CardGridDisplay';

/**
 * @description GridContainer wraps content in a styled flex column with optional className.
 */
const GridContainer = memo(({ children, className = '' }: ChildrenAndClassProps) => {
  return <div className={cn("flex flex-col rounded-2xl bg-white/20 p-2 items-start justify-start", className)}>{children}</div>;
});
GridContainer.displayName = 'GridContainer';

/**
 * @description CardPicker is the main layout for the picking workflow.
 * It displays the ToPick, CardGridDisplay, and QueuePile sections in a grid.
 */
const CardPicker = (): React.ReactElement => {
  return (
    <div className={cn("grid h-full max-h-[calc(95vh-3.75rem)] w-full min-w-[calc(100vw-3rem)] grid-cols-1 gap-2 lg:grid-cols-[45%_54.5%] lg:grid-rows-[calc(99.5%-8rem)_8rem] lg:gap-[0.5%] xl:grid-cols-[39%_60.5%]")}>
      <GridContainer className={cn("row-span-2 max-h-[70vh] lg:max-h-none")}>
        <ToPick />
      </GridContainer>
      <GridContainer>
        <CardGridDisplay />
      </GridContainer>
      <GridContainer>
        <QueuePile />
      </GridContainer>
    </div>
  );
};

CardPicker.displayName = 'CardPicker';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default CardPicker;
