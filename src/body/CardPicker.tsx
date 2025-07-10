// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';

import { ChildrenAndClassProps } from '../interfaces';

import ToPick from './sections/ToPick';
import QueuePile from './sections/QueuePile';
import CardGridDisplay from './sections/CardGridDisplay';

/** @description GridContainer wraps content in a styled flex column with optional className. */
const GridContainer = memo(({ children, className = '' }: ChildrenAndClassProps) => {
  return <div className={`flex flex-col rounded-2xl bg-white/20 p-2 ${className}`}>{children}</div>;
});
GridContainer.displayName = 'GridContainer';

/**
 * CardPicker is the main layout for the picking workflow.
 * It displays the ToPick, CardGridDisplay, and QueuePile sections in a grid.
 */
const CardPicker = (): React.ReactElement => {
  return (
    <div className="grid h-full max-h-[calc(95vh-3.75rem)] w-full grid-cols-1 gap-2 lg:grid-cols-[45%_54.5%] lg:grid-rows-[calc(99.5%-8rem)_8rem] lg:gap-[0.5%] xl:grid-cols-[39%_60.5%]">
      <GridContainer className="row-span-2 max-h-[70vh] lg:max-h-none">
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
