// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, ReactElement, useCallback, useMemo, useState } from "react";

import ConfirmBar from "../components/cards/ConfirmBar";
import BasicContainer from "../components/containers/GridContainer";
import Filter from "../components/ui/Filter";
import { cn } from "../context/functions";
import CardGridDisplay from "./sections/CardGridDisplay";
import QueuePile from "./sections/QueuePile";
import ToPick from "./sections/ToPick";

import type { Filters } from "../types";

/** CardPicker displays the card picker components */
const CardPicker = memo((): ReactElement => {
  const [filters, setFilters] = useState<Filters>({
    boxMin: null,
    boxMax: null,
    game: "",
    set: "",
    rarity: new Set<string>(),
  });

  const handleFiltersChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  const gridClassName = useMemo(
    () =>
      cn(
        "m-auto px-5 grid h-fit min-h-[76vh] w-full max-w-screen-2xl gap-2",
        "grid-cols-1",
        "lg:grid-rows-[auto_1fr] lg:grid-cols-2",
        "py-2"
      ),
    []
  );

  return (
    <div className={gridClassName}>
      <BasicContainer className="h-fit lg:row-span-2">
        <Filter onChange={handleFiltersChange} />
        <ToPick filters={filters} />
      </BasicContainer>
      <BasicContainer>
        <CardGridDisplay />
      </BasicContainer>
      <BasicContainer className="min-h-30">
        <QueuePile />
      </BasicContainer>
      <ConfirmBar />
    </div>
  );
});
CardPicker.displayName = "CardPicker";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default CardPicker;
