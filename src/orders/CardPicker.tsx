// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactElement, useState } from 'react';

import ConfirmBar from '../components/cards/ConfirmBar';
import BasicContainer from '../components/containers/GridContainer';
import Filter from '../components/ui/Filter';
import { cn } from '../context/functions';
import CardGridDisplay from './sections/CardGridDisplay';
import QueuePile from './sections/QueuePile';
import ToPick from './sections/ToPick';

import type { Filters } from '../types';

/**
 * CardPicker is the main layout for the picking workflow.
 * It displays the ToPick, CardGridDisplay, and QueuePile sections in a grid.
 */
const CardPicker = (): ReactElement => {
  const [filters, setFilters] = useState<Filters>({
    box: 0,
    game: "",
    set: ""
  });

  return (
    <div
      className={cn(
        'm-auto px-5 grid h-fit min-h-[76vh] w-full max-w-screen-2xl gap-2',
        'grid-cols-1',
        'lg:auto-rows-auto lg:grid-cols-2',
        'py-2'
      )}
    >
      <BasicContainer className="h-fit w-full lg:row-span-2">
        <Filter onChange={setFilters} /> 
        <ToPick filters={filters} />
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
