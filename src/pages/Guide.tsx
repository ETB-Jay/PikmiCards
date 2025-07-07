// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React from 'react';

import { MainContainer, ScrollContainer } from '../components/containers';
import { SectionTitle } from '../components/modal';
import Header from '../header/Header';

// ─ Guide Page Content ─
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

/** @description Guide page component with user instructions */
function Guide(): React.ReactElement {
  return (
    <MainContainer>
      <Header />
      <ScrollContainer className="relative z-10 mx-auto w-full max-w-2xl gap-5 border border-indigo-700 bg-black/30 px-5 py-8 text-white shadow-2xl backdrop-blur-md">
        <div className="flex flex-col">
          <h1 className="text-center text-4xl font-extrabold text-green-300 drop-shadow">
            {GUIDE_TEXT.title}
          </h1>
          <h2 className="text-center text-lg text-green-200">{GUIDE_TEXT.subtitle}</h2>
        </div>
        <div className="flex flex-col">
          <SectionTitle>{GUIDE_TEXT.keywords.picklist}</SectionTitle>
          <p className="text-green-smoke-200 mb-2 font-semibold">
            {GUIDE_TEXT.pick.picklist.subtitle.map((part) => (
              <span key={part}>{part} </span>
            ))}
          </p>
          <ul className="ml-8 list-outside list-disc break-words whitespace-pre-line text-gray-100">
            {GUIDE_TEXT.pick.picklist.features.map((feature) => (
              <li className="ml-6 break-words whitespace-pre-line" key={feature}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <SectionTitle>{GUIDE_TEXT.keywords.queue}</SectionTitle>
          <p className="text-green-smoke-200 mb-2 font-semibold">
            {GUIDE_TEXT.pick.queue.subtitle.map((part) => (
              <span key={part}>{part} </span>
            ))}
          </p>
          <ul className="ml-8 list-outside list-disc break-words whitespace-pre-line text-gray-100">
            {GUIDE_TEXT.pick.queue.features.map((feature) => (
              <li className="ml-6 break-words whitespace-pre-line" key={feature}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <SectionTitle>{GUIDE_TEXT.keywords.box}</SectionTitle>
          <p className="text-green-smoke-200 mb-2 font-semibold">
            {GUIDE_TEXT.pick.box.subtitle.map((part) => (
              <span key={part}>{part} </span>
            ))}
          </p>
          <ul className="ml-8 list-outside list-disc break-words whitespace-pre-line text-gray-100">
            {' '}
            {GUIDE_TEXT.pick.box.features.map((feature) => (
              <li className="ml-6 break-words whitespace-pre-line" key={feature}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </ScrollContainer>
    </MainContainer>
  );
}

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export default Guide;
