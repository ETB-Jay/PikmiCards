// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactElement } from 'react';

import ConfirmBar from '../components/cards/ConfirmBar';
import BasicContainer from '../components/containers/GridContainer';
import { cn } from '../context/functions';
import CardGridDisplay from './sections/CardGridDisplay';
import QueuePile from './sections/QueuePile';
import ToPick from './sections/ToPick';

/**
 * CardPicker is the main layout for the picking workflow.
 * It displays the ToPick, CardGridDisplay, and QueuePile sections in a grid.
 */
const CardPicker = (): ReactElement => {
  return (
    <div
      className={cn(
        'mx-auto grid h-fit min-h-[76vh] w-full max-w-screen-2xl gap-2',
        'grid-cols-1',
        'lg:auto-rows-auto lg:grid-cols-2',
        'pb-5'
      )}
    >
      <BasicContainer className="h-fit w-full lg:row-span-2">
        <ToPick />
      </BasicContainer>
      <BasicContainer className="h-full w-full">
        <CardGridDisplay />
      </BasicContainer>
      <BasicContainer className="h-full min-h-30 w-full">
        <QueuePile />
      </BasicContainer>
      <ConfirmBar />
    </div>
  );
};
CardPicker.displayName = 'CardPicker';

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default CardPicker;
