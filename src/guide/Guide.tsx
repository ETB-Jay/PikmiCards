// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { MainContainer } from '../components/containers';
import Header from '../header/Header';
import { cn } from '../context/functions';
import { Title, Subtitle, Description, Text } from '../components/formComponents';

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

const Section = ({
  title,
  subtitleParts,
  features,
}: {
  title: string;
  subtitleParts: string[];
  features: string[];
}) => (
  <div className={cn("flex flex-col p-4 mb-4 shadow rounded-xl bg-green-900/20")}>
    <Subtitle text={title} />
    <Description text={subtitleParts.join(' ')} />
    <ul className={cn("ml-8 text-green-100 break-words whitespace-pre-line list-disc list-outside")}>
      {features.map((feature) => (
        <li className={cn("break-words whitespace-pre-line")} key={feature}>
          <Text text={feature} />
        </li>
      ))}
    </ul>
  </div>
);

/**
 * @description Guide page component with user instructions.
 */
function Guide(): React.ReactElement {
  return (
    <MainContainer>
      <Header pick={false} />
      <div className={cn("flex flex-col h-full max-h-[calc(95vh-5rem)] w-full gap-2")}>
        <div className={cn("flex flex-col")}>
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
    </MainContainer>
  );
}

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Guide;
