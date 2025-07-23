// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactElement, memo } from 'react';

import { Title, Subtitle, Description, Text } from '../components';
import { cn } from '../context/functions';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────
const GUIDE_TEXT = {
  githubAlt: 'Github',
  title: 'Guide to using PikmiCards',
  subtitle: 'How to use PikmiCards effectively',
  keywords: {
    picklist: 'Picklist',
    queue: 'Queue Pile',
    box: 'Box Grid',

    picker: 'Picker',
    guide: 'Guide',
    logout: 'Login Page',
  },
  header: {
    hamburger: [
      'The hamburger icon displays the sidebar, letting the user swap between the',
      ',',
      'and',
    ],
    location:
      'The location can be changed by selecting the location button (defaults to the Oakville location). This will refresh the page so make sure to confirm any orders beforehand',
    refresh:
      'Refresh the order list with the refresh button. This will also reset any progress made.',
  },
  pick: {
    picklist: {
      subtitle: ['Items in the', 'are displayed in a grid on the left'],
      features: [
        "Click on an item's image to see the item more clearly",
        'Click on the rest of the grid to select the item and confirm it',
      ],
    },
    queue: {
      subtitle: ['Items in the', 'are displayed in the bottom right'],
      features: [
        "Click on an item's image to see the item more clearly",
        "If an item's order has appeared on the box and is currently in the queue pile, then the item will be highlighted a dark brown and will appear at the front of the list",
        'Items can be confirmed by clicking the square icon',
      ],
    },
    box: {
      subtitle: ['Items in the', 'are displayed on the top right'],
      features: [
        'Click on a box to see the order details and confirm the order',
        'Once an order has been confirmed, a new order will take its place',
      ],
    },
  },
};

// ─ Components ───────────────────────────────────────────────────────────────────────────────────
/**
 * @description Section renders a guide section with title, subtitle, and feature list.
 * @param title - The section title
 * @param subtitleParts - Array of subtitle text parts
 * @param features - Array of feature descriptions
 */
const Section = ({
  title,
  subtitleParts,
  features,
}: {
  title: string;
  subtitleParts: string[];
  features: string[];
}) => (
  <div className={cn('mb-4 flex w-full flex-col rounded-xl bg-green-900/20 p-4 shadow')}>
    <Subtitle text={title} />
    <Description text={subtitleParts.join(' ')} />
    <ul
      className={cn('ml-8 list-outside list-disc break-words whitespace-pre-line text-green-100')}
    >
      {features.map((feature) => (
        <li className={cn('break-words whitespace-pre-line')} key={feature}>
          <Text text={feature} />
        </li>
      ))}
    </ul>
  </div>
);

/**
 * @description Guide page component with user instructions.
 * Displays sections for picklist, queue, and box grid usage instructions.
 * @returns The guide page component with navigation header and instruction sections
 */
const Guide = memo((): ReactElement => (
  <div className={cn('flex h-full w-full max-w-screen-lg flex-col gap-2')}>
    <div className={cn('flex flex-col')}>
      <Title text={GUIDE_TEXT.title} />
      <Subtitle text={GUIDE_TEXT.subtitle} />
    </div>
    <Section
      title={GUIDE_TEXT.keywords.picklist}
      subtitleParts={GUIDE_TEXT.pick.picklist.subtitle}
      features={GUIDE_TEXT.pick.picklist.features}
    />
    <Section
      title={GUIDE_TEXT.keywords.queue}
      subtitleParts={GUIDE_TEXT.pick.queue.subtitle}
      features={GUIDE_TEXT.pick.queue.features}
    />
    <Section
      title={GUIDE_TEXT.keywords.box}
      subtitleParts={GUIDE_TEXT.pick.box.subtitle}
      features={GUIDE_TEXT.pick.box.features}
    />
  </div>
));
Guide.displayName = "Guide"

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Guide;
