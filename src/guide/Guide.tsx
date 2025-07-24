// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { ReactElement, memo } from 'react';

import { Subtitle, Text, ImageDisplay, PikmicardGuideBannerIcon, CardPickedIcon, CardsIcon, OpenBoxIcon } from '../components';
import { cn } from '../context/functions';

// ─ Constants ────────────────────────────────────────────────────────────────────────────────────


// ─ Components ───────────────────────────────────────────────────────────────────────────────────
interface StepData {
  title: string;
  description: string;
  icon?: ReactElement;
}

interface SectionProps {
  title: string;
  steps?: StepData[];
  variant?: 'primary' | 'secondary' | 'accent';
}

const Section = memo(({ title, steps, variant = 'primary' }: SectionProps): ReactElement => {
  const variantStyles = {
    primary: {
      container: 'bg-gradient-to-br from-purple-800/60 to-purple-900/60 ring-purple-700/60 shadow-purple-900/50 text-purple-100',
      border: 'border-purple-600/80',
      numberBg: 'bg-purple-600',
      textColor: 'text-purple-200'
    },
    secondary: {
      container: 'bg-gradient-to-br from-blue-800/60 to-blue-900/60 ring-blue-700/80 shadow-blue-900/50 text-blue-100',
      border: 'border-blue-600/80',
      numberBg: 'bg-blue-600',
      textColor: 'text-blue-200'
    },
    accent: {
      container: 'bg-gradient-to-br from-green-800/60 to-green-900/60 ring-green-700/80 shadow-green-900/50 text-green-100',
      border: 'border-green-600/80',
      numberBg: 'bg-green-600',
      textColor: 'text-green-200'
    }
  };

  const renderStepCard = (step: StepData, index: number) => (
    <div key={index} className={cn("relative flex flex-col gap-3 p-3 bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-101", variantStyles[variant].border, variantStyles[variant].textColor)}>
      <div className="flex items-center gap-2">
        <div className={cn("flex items-center justify-center w-6 h-6 text-white rounded-full font-bold text-sm shadow-md", variantStyles[variant].numberBg)}>
          {index + 1}
        </div>
        <h2 className={cn('font-semibold italic', variantStyles[variant].textColor)}>{step.title}</h2>
      </div>
      <Text text={step.description} />
      <div className="absolute top-2 right-2 opacity-40">
        {step.icon}
      </div>
    </div>
  );

  return (
    <div
      className={cn('flex flex-1 flex-col rounded-2xl p-3 ring-2 shadow-lg backdrop-blur-sm',
        'transition-all duration-300 hover:shadow-xl hover:scale-[1.02]',
        'border border-gray-600/40 gap-3',
        variantStyles[variant].container)
      }
    >
      <Subtitle text={title} />
      <div className="flex flex-col gap-4">
        {steps && (
          <div className="flex flex-col gap-4">
            {steps.map(renderStepCard)}
          </div>
        )}
      </div>
    </div>
  );
});
Section.displayName = "Section";

/**
 * @description Guide page component with user instructions.
 * Displays sections for picklist, queue, and box grid usage instructions.
 * @returns The guide page component with navigation header and instruction sections
 */
const Guide = memo((): ReactElement => (
  <div className={cn('flex h-full w-full max-w-6xl flex-col gap-10 p-6')}>
    <div className={cn('flex flex-row items-end justify-center h-fit gap-3')}>
      <PikmicardGuideBannerIcon className='h-fit max-w-lg' />
    </div>

    <div className={cn('w-full rounded-lg border border-green-800/40 bg-green-950/30 p-2 shadow-lg backdrop-blur-sm')}>
      <ImageDisplay imageUrl='display.png' mode='fullscreen' />
    </div>


    <Text text='There are 2 methods to use Pikmicards:' />
    <div className='flex flex-row gap-6'>
      <Section
        title="Pick, then Confirm"
        variant="primary"
        steps={[
          {
            title: 'Pick Items',
            description: 'Go through the Item Card list and pick the items in any order you prefer',
            icon: <CardsIcon className="w-6 h-6 text-purple-300" />
          },
          {
            title: 'Confirm Selection',
            description: 'Confirm the picked and organize them into their respective boxes',
            icon: <CardPickedIcon className="w-6 h-6 text-purple-300" />
          },
          {
            title: 'Fulfill Orders',
            description: 'Organize orders into boxes and fulfill each one. Don\'t forget to process QueuePile orders!',
            icon: <OpenBoxIcon className="w-6 h-6 text-purple-300" />
          }
        ]}
      />

      <Section
        title="Pick and Confirm Together"
        variant="secondary"
        steps={[
          {
            title: 'Pick Items',
            description: 'Go through the Item Card list and pick the items by set',
            icon: <CardsIcon className="w-6 h-6 text-blue-300" />
          },
          {
            title: 'Confirm Selection',
            description: 'Confirm the picked items and organize them into their respective boxes',
            icon: <CardPickedIcon className="w-6 h-6 text-blue-300" />
          },
          {
            title: 'Fulfill Orders',
            description: 'Repeat the process until orders turn green, then organize and fulfill each completed order',
            icon: <OpenBoxIcon className="w-6 h-6 text-blue-300" />
          }
        ]}
      />
    </div>

    <Section
      title="Other Important Notes"
      variant="accent"
      steps={[
        {
          title: 'ItemPick List Sorting',
          description: 'The ItemPick list is sorted by Set, Box Number, itemID, and then Alphabetical',
        },
        {
          title: 'Order Confirmation',
          description: 'Orders can be confirmed only after an employee name has been selected',
        },
        {
          title: 'Queue Priority',
          description: 'Items in the queue pile will automatically appear in the front of the list if their box is now in the grid. Make sure to organize these asap',
        },
        {
          title: 'Adding Locations',
          description: 'Location filters are automatically applied when you create a new location. Simply add the location and it will only display the relevant orders.',
        }
      ]}
    />


  </div>
));
Guide.displayName = "Guide"

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Guide;
