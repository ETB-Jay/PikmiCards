// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactElement, memo } from "react";

import Section from "./Section";
import {
  Text,
  ImageDisplay,
  PikmicardGuideBannerIcon,
  CardPickedIcon,
  CardsIcon,
  OpenBoxIcon,
} from "../components";
import { cn } from "../context/functions";

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const PICK_THEN_CONFIRM_STEPS = [
  {
    title: "Pick Items",
    description:
      "Go through the Item Card list and pick the items in any order you prefer",
    icon: <CardsIcon className="h-6 w-6 text-purple-300" />,
  },
  {
    title: "Confirm Selection",
    description: "Confirm the picked and organize them into their respective boxes",
    icon: <CardPickedIcon className="h-6 w-6 text-purple-300" />,
  },
  {
    title: "Fulfill Orders",
    description:
      "Organize orders into boxes and fulfill each one. Don't forget to process QueuePile orders!",
    icon: <OpenBoxIcon className="h-6 w-6 text-purple-300" />,
  },
];

const PICK_AND_CONFIRM_TOGETHER_STEPS = [
  {
    title: "Pick Items",
    description: "Go through the Item Card list and pick the items by set",
    icon: <CardsIcon className="h-6 w-6 text-blue-300" />,
  },
  {
    title: "Confirm Selection",
    description: "Confirm the picked items and organize them into their respective boxes",
    icon: <CardPickedIcon className="h-6 w-6 text-blue-300" />,
  },
  {
    title: "Fulfill Orders",
    description:
      "Repeat the process until orders turn green, then organize and fulfill each completed order",
    icon: <OpenBoxIcon className="h-6 w-6 text-blue-300" />,
  },
];

const IMPORTANT_NOTES_STEPS = [
  {
    title: "ItemPick List Sorting",
    description:
      "The ItemPick list is sorted by Set, Box Number, itemID, and then Alphabetical",
  },
  {
    title: "Order Confirmation",
    description: "Orders can be confirmed only after an employee name has been selected",
  },
  {
    title: "Queue Priority",
    description:
      "Items in the queue pile will automatically appear in the front of the list if their box" +
      "is now in the grid. Make sure to organize these asap",
  },
  {
    title: "Adding Locations",
    description:
      "Location filters are automatically applied when you create a new location." +
      "Simply add the location and it will only display the relevant orders.",
  },
];

// ─ Components ───────────────────────────────────────────────────────────────────────────────────
/**
 * Guide page component with user instructions.
 * Displays sections for picklist, queue, and box grid usage instructions.
 * @returns The guide page component with navigation header and instruction sections
 */
const Guide = memo(
  (): ReactElement => (
    <div className={cn("flex h-full w-full max-w-6xl flex-col gap-10 p-6")}>
      <div className={cn("flex h-fit flex-row items-end justify-center gap-3")}>
        <PikmicardGuideBannerIcon className="h-fit max-w-lg" />
      </div>

      <div
        className={cn(
          "w-full rounded-lg bg-green-950/30 p-2 shadow-lg backdrop-blur-sm"
        )}
      >
        <ImageDisplay imageUrl="display.png" mode="fullscreen" />
      </div>

      <Text text="There are 2 methods to use Pikmicards:" />
      <div className="flex flex-row gap-6">
        <Section
          title="Pick, then Confirm"
          variant="primary"
          steps={PICK_THEN_CONFIRM_STEPS}
        />

        <Section
          title="Pick and Confirm Together"
          variant="secondary"
          steps={PICK_AND_CONFIRM_TOGETHER_STEPS}
        />
      </div>

      <Section
        title="Other Important Notes"
        variant="accent"
        steps={IMPORTANT_NOTES_STEPS}
      />
    </div>
  )
);
Guide.displayName = "Guide";

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Guide;
