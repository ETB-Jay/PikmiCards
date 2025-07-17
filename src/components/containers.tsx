// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';

import { ChildrenAndClassProps } from '../interfaces';
import { useConfirm, useFullscreen } from '../context/useContext';
import { cn } from '../context/functions';

import Background from './Background';

/**
 * @description MainContainer wraps the app content in a scrollable container with a background.
 */
const MainContainer = memo(({ children, className }: ChildrenAndClassProps) => (
  <ScrollContainer
    className={cn("relative flex h-screen items-center justify-center w-screen flex-col gap-5 p-5 select-none", className)}
  >
    <Background
      particleColors={['#ffffff', '#ffffff']}
      particleCount={200}
      particleSpread={20}
      speed={0.05}
      particleBaseSize={100}
    />
    {children}
  </ScrollContainer>
));
MainContainer.displayName = 'MainContainer';


/**
 * @description ModalContainer wraps its children in a modal overlay with close handlers.
 */
const ModalContainer = memo(
  ({ children, className = '' }: ChildrenAndClassProps) => {
    const { closeFullscreen } = useFullscreen();
    const { closeConfirm } = useConfirm();
    const ariaLabel = 'close modal';

    const closeAll = () => {
      closeConfirm();
      closeFullscreen();
    }

    return (
      <div
        role="button"
        aria-label={ariaLabel}
        className={cn("fixed inset-0 z-50 flex h-screen w-screen cursor-pointer items-center justify-center bg-black/50 backdrop-blur-sm select-none", className)}
        tabIndex={0}
        onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { closeAll() } }}
        onClick={() => { closeAll() }}
      >
        <div
          className={cn("bg-green-smoke-600/30 prompt-animate relative z-60 flex h-fit max-h-[90vh] w-fit max-w-[80vw] cursor-default flex-col items-center justify-center gap-2 rounded-lg p-4 shadow-2xl", className)}
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

/**
 * @description FlexColCenter provides a flex column with centered alignment for its children.
 */
const FlexColCenter = memo(({ children, className }: ChildrenAndClassProps) => (
  <div className={cn("flex h-full w-full flex-col items-center justify-center", className)}>
    {children}
  </div>
));
FlexColCenter.displayName = 'flexColCenter';

/**
 * @description ScrollContainer wraps its children in a scrollable container.
 */
const ScrollContainer = memo(({ children, className = '' }: ChildrenAndClassProps) => (
  <div className={cn("flex h-full flex-col w-full gap-2 overflow-y-auto rounded-lg", className)}>
    {children}
  </div>
));
ScrollContainer.displayName = 'ScrollContainer';

/**
 * @description FlexRow provides a flex row with full width and optional classes.
 */
const FlexRow = memo(({ children, className = '' }: ChildrenAndClassProps) => (
  <div className={cn(className, "flex w-full flex-row flex-wrap items-center gap-2")}>{children}</div>
));
FlexRow.displayName = 'FlexRowBetween';

/**
 * @description ErrorBox provides a styled box for error or info messages.
 */
const ErrorBox = memo(({ children, className = '' }: ChildrenAndClassProps) => (
  <div
    className={cn("animate-shake font-semibold rounded-lg bg-red-800/40 px-3 py-2 text-center text-xs text-red-100 ring-2 ring-red-950", className)}
  >
    {children}
  </div>
));
ErrorBox.displayName = 'ErrorBox';

export { MainContainer, ModalContainer, ScrollContainer, FlexColCenter, FlexRow, ErrorBox };
