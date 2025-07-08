// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React from 'react';

import { MainContainer, ScrollContainer } from '../components/containers';
import { SectionTitle } from '../components/modal';
import Header from '../header/Header';

/** @description Guide page component with user instructions */
function Guide(): React.ReactElement {
  return (
    <MainContainer>
      <Header />
      <ScrollContainer className="flex-1 relative z-10 mx-auto w-full max-w-2xl gap-5 border border-indigo-700 bg-black/30 px-5 py-8 text-white shadow-2xl backdrop-blur-md">
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
