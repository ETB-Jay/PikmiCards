// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { ReactNode, PropsWithChildren } from 'react';

import Iridescence from './Iridescence';

/**
 * Container components for layout and modals in PikmiCards.
 * Includes MainContainer, ModalContainer, ScrollContainer, FlexRowBetween, FlexColCenter, and ErrorBox.
 *
 * @module containers
 */

/**
 * Props for the Container component.
 * @property {string} [className] - Additional CSS classes for the container.
 * @property {ReactNode} children - The content to render inside the container.
 */
interface ContainerProps {
  children: ReactNode;
}

interface ScrollContainerProps extends ContainerProps {
  className?: string;
}

interface ModalContainerProps extends PropsWithChildren<object> {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * MainContainer wraps the main app content with background and layout styling.
 * @param children - The content to render inside the main container.
 */
const MainContainer = ({ children }: ContainerProps) => (
  <>
    <Iridescence
      color={[0, 0.7, 1]}
      mouseReact={false}
      speed={0.2}
      className="fixed inset-0 -z-1 opacity-70"
    />
    <div className="min-h-screen w-screen relative flex flex-col items-center justify-center gap-5 p-5 select-none">
      {children}
    </div>
  </>
);

/**
 * ModalContainer provides a styled modal overlay and content area.
 * @param children - The modal content.
 * @param className - Additional CSS classes.
 * @param onClick - Click handler for the modal content.
 * @param onClose - Click handler for closing the modal.
 */
const ModalContainer = ({ 
  children, 
  className, 
  onClick, 
  onClose 
}: ModalContainerProps) => (
  <div
    className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center w-screen h-screen cursor-pointer select-none${className}`}
    onClick={onClose}
    tabIndex={0}
    role="button"
    onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') {
        if (onClose) { 
          onClose(event as unknown as React.MouseEvent<HTMLDivElement>); 
        }
      }
    }}
  >
    <div
      className={`relative rounded-lg bg-green-smoke-50/10 shadow-2xl p-4 z-60 flex flex-col items-center justify-center gap-2 h-fit w-fit max-h-[90vh] max-w-[80vw] cursor-default prompt-animate ${className}`}
      onClick={event => {
        event.stopPropagation();
        if (onClick) { onClick(event); }
      }}
      tabIndex={0}
      role="button"
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          if (onClick) { 
            onClick(event as unknown as React.MouseEvent<HTMLDivElement>); 
          }
        }
      }}
    >
      {children}
    </div>
  </div >
);

/**
 * ScrollContainer wraps content in a scrollable flex column.
 * @param children - The content to render inside the scroll container.
 * @param className - Additional CSS classes.
 */
const ScrollContainer = ({ children, className = '' }: ScrollContainerProps) => (
  <div className={`flex flex-col gap-2 h-full overflow-y-scroll rounded-lg p-1 ${className}`}>
    {children}
  </div>
);

/**
 * FlexRowBetween provides a flex row with justify-between and full width.
 * @param children - The content to render inside the row.
 * @param className - Additional CSS classes.
 */
const FlexRowBetween = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex flex-row w-full justify-between items-center ${className}`}>
    {children}
  </div>
);

/**
 * FlexColCenter provides a flex column with centered alignment and optional gap.
 * @param children - The content to render inside the column.
 * @param className - Additional CSS classes.
 */
const FlexColCenter = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex flex-col items-center justify-center w-full ${className}`}>
    {children}
  </div>
);

/**
 * ErrorBox provides a styled box for error or info messages.
 * @param children - The message content.
 * @param className - Additional CSS classes.
 */
const ErrorBox = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-red-800/40 ring-3 ring-red-950 text-red-100 text-center font-semibold rounded-lg py-2 px-3 animate-shake ${className}`}>
    {children}
  </div>
);

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export { MainContainer, ModalContainer, ScrollContainer, FlexRowBetween, FlexColCenter, ErrorBox };
