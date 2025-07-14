// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';

import { ChildrenAndClassProps } from '../interfaces';
import { useFullscreen } from '../context/useContext';

import Background from './Background';

/** @description MainContainer wraps the app content*/
const MainContainer = memo(({ children, className }: ChildrenAndClassProps) => (
  <div
    className={`relative flex min-h-screen w-screen flex-col items-center justify-center gap-5 p-5 select-none ${className}`}
  >
    <Background
      particleColors={['#ffffff', '#ffffff']}
      particleCount={200}
      particleSpread={20}
      speed={0.05}
      particleBaseSize={100}
    />
    {children}
  </div>
));
MainContainer.displayName = 'MainContainer';

/** @description ModalContainer wraps a modal */
const ModalContainer = memo(
  ({ children, className = '', onClose }: ChildrenAndClassProps & { onClose?: () => void }) => {
    const { closeFullscreen } = useFullscreen();
    const ariaLabel = 'close modal';

    return (
      <div
        role="button"
        aria-label={ariaLabel}
        className={`fixed inset-0 z-50 flex h-screen w-screen cursor-pointer items-center justify-center bg-black/50 backdrop-blur-sm select-none ${className}`}
        tabIndex={0}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            if (onClose) { onClose(); } 
            else { closeFullscreen(); }
          }
        }}
        onClick={() => {
          if (onClose) { onClose(); } 
          else { closeFullscreen(); }
        }}
      >
        <div
          className={`bg-green-smoke-600/30 prompt-animate relative z-60 flex h-fit max-h-[90vh] w-fit max-w-[80vw] cursor-default flex-col items-center justify-center gap-2 rounded-lg p-4 shadow-2xl ${className}`}
          onClick={(ev) => {
            ev.stopPropagation();
          }}
          tabIndex={0}
          role="button"
          onKeyDown={(ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
              ev.stopPropagation();
            }
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);
ModalContainer.displayName = 'Modal Container';

/** @description FlexColCenter provides a flex column with centered alignment */
const FlexColCenter = memo(({ children, className }: ChildrenAndClassProps) => (
  <div className={`relative flex w-full flex-col items-center justify-center ${className}`}>
    {children}
  </div>
));
FlexColCenter.displayName = 'flexColCenter';

/** @description ScrollContainer wraps a scroll container */
const ScrollContainer = memo(({ children, className = '' }: ChildrenAndClassProps) => (
  <div className={`flex h-full flex-col gap-2 overflow-y-scroll rounded-lg p-1 ${className}`}>
    {children}
  </div>
));
ScrollContainer.displayName = 'ScrollContainer';

/** @description FlexRowBetween provides a flex row with justify-between and full width */
const FlexRow = memo(({ children, className = '' }: ChildrenAndClassProps) => (
  <div className={`${className} flex w-full flex-row flex-wrap items-center gap-2`}>{children}</div>
));
FlexRow.displayName = 'FlexRowBetween';

/** @description ErrorBox provides a styled box for error or info messages.  */
const ErrorBox = memo(({ children, className = '' }: ChildrenAndClassProps) => (
  <div
    className={`animate-shake font-semi rounded-lg bg-red-800/40 px-3 py-2 text-center text-xs text-red-100 ring-2 ring-red-950 ${className}`}
  >
    {children}
  </div>
));
ErrorBox.displayName = 'ErrorBox';

export { MainContainer, ModalContainer, ScrollContainer, FlexColCenter, FlexRow, ErrorBox };
