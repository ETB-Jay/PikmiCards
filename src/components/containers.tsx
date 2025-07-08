// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import React, { ReactNode, PropsWithChildren } from 'react';

import Background from './Background';

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
  <div className="relative flex min-h-screen w-screen flex-col items-center justify-center gap-5 p-5 select-none">
    <Background
      particleColors={['#ffffff', '#ffffff']}
      particleCount={200}
      particleSpread={20}
      speed={0.05}
      particleBaseSize={100}
    />
    {children}
  </div>
);

/**
 * ModalContainer provides a styled modal overlay and content area.
 * @param children - The modal content.
 * @param className - Additional CSS classes.
 * @param onClick - Click handler for the modal content.
 * @param onClose - Click handler for closing the modal.
 */
const ModalContainer = ({ children, className, onClick, onClose }: ModalContainerProps) => (
  <div
    className={`fixed inset-0 z-50 flex h-screen w-screen cursor-pointer items-center justify-center bg-black/50 backdrop-blur-sm select-none${className}`}
    onClick={onClose}
    tabIndex={0}
    role="button"
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        if (onClose) {
          onClose(event as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }
    }}
  >
    <div
      className={`bg-blue-900/80 prompt-animate relative z-60 flex h-fit max-h-[90vh] w-fit max-w-[80vw] cursor-default flex-col items-center justify-center gap-2 rounded-lg p-4 shadow-2xl ${className}`}
      onClick={(event) => {
        event.stopPropagation();
        if (onClick) {
          onClick(event);
        }
      }}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          if (onClick) {
            onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }
      }}
    >
      {children}
    </div>
  </div>
);

/**
 * ScrollContainer wraps content in a scrollable flex column.
 * @param children - The content to render inside the scroll container.
 * @param className - Additional CSS classes.
 */
const ScrollContainer = ({ children, className = '' }: ScrollContainerProps) => (
  <div className={`flex h-full flex-col gap-2 overflow-y-scroll rounded-lg p-1 ${className}`}>
    {children}
  </div>
);

/**
 * FlexRowBetween provides a flex row with justify-between and full width.
 * @param children - The content to render inside the row.
 * @param className - Additional CSS classes.
 */
const FlexRowBetween = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex w-full flex-row items-center justify-between ${className}`}>{children}</div>
);

/**
 * FlexColCenter provides a flex column with centered alignment and optional gap.
 * @param children - The content to render inside the column.
 * @param className - Additional CSS classes.
 */
const FlexColCenter = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex w-full flex-col items-center justify-center ${className}`}>{children}</div>
);

/**
 * ErrorBox provides a styled box for error or info messages.
 * @param children - The message content.
 * @param className - Additional CSS classes.
 */
const ErrorBox = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`animate-shake rounded-lg bg-red-800/40 px-3 py-2 text-center font-semibold text-red-100 ring-3 ring-red-950 ${className}`}
  >
    {children}
  </div>
);

// ─ Exports ──────────────────────────────────────────────────────────────────────────────────────
export { MainContainer, ModalContainer, ScrollContainer, FlexRowBetween, FlexColCenter, ErrorBox };
