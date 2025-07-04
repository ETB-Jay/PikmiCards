/**
 * CardPicker layout component for the main picking interface.
 * Arranges ToPick, CardGridDisplay, and QueuePile in a responsive grid.
 *
 * @module CardPicker
 */
import ToPick from './sections/ToPick';
import QueuePile from './sections/QueuePile';
import CardGridDisplay from './sections/CardGridDisplay';
import React from 'react';
import { ReactNode } from 'react';

/**
 * GridContainer wraps content in a styled flex column with optional className.
 * @param content - The content to display inside the container.
 * @param className - Additional CSS classes for the container.
 */
const GridContainer = ({ content, className='' }: { content: ReactNode, className: string | undefined }) => {
    return (
        <div className={`flex flex-col bg-white/20 p-2 rounded-2xl ${className}`}>
            {content}
        </div>
    );
};

/**
 * CardPicker is the main layout for the picking workflow.
 * It displays the ToPick, CardGridDisplay, and QueuePile sections in a grid.
 */
const CardPicker = (): React.ReactElement => {
    return (
        <div className='h-full w-full max-h-[calc(95vh-3.75rem)] grid grid-cols-1 lg:grid-cols-[45%_54.5%] xl:grid-cols-[39%_60.5%] lg:grid-rows-[calc(99.5%-8rem)_8rem] gap-2 lg:gap-[0.5%]'>
            <GridContainer content={<ToPick />} className='row-span-2 max-h-[70vh] lg:max-h-none'/>
            <GridContainer content={<CardGridDisplay />} className='' />
            <GridContainer content={<QueuePile />} className='' />
        </div>
    );
};

CardPicker.displayName = 'CardPicker';

export default CardPicker;