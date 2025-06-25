import React from 'react';
import { ReactNode, PropsWithChildren } from 'react';
import Iridescence from './Iridescence';

/**
 * Props for the Container component.
 * @property {string} [className] - Additional CSS classes for the container.
 * @property {ReactNode} children - The content to render inside the container.
 */
interface ContainerProps {
    className?: string;
    children: ReactNode;
}

interface ModalContainerProps extends PropsWithChildren<object> {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onClose?: React.MouseEventHandler<HTMLDivElement>;
    title?: string;
    icon?: React.ReactNode;
    role?: string;
}

const MainContainer = ({ children }: ContainerProps) => (
    <>
        <Iridescence
            color={[0, 0.7, 1]}
            mouseReact={false}
            speed={0.2}
            className="absolute inset-0 -z-1 opacity-70"
        />
        <div className="min-h-screen w-screen relative flex flex-col items-center justify-center gap-5 p-5 select-none">
            {children}
        </div>
    </>
);

const ModalContainer = ({ children, className, onClick, onClose }: ModalContainerProps) => (
    <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center w-screen h-screen cursor-pointer select-none${className}`}
        onClick={onClose}
    >
        <div
            className={`relative rounded-lg bg-green-smoke-50/10 shadow-2xl p-4 z-60 flex flex-col items-center justify-center gap-2 h-fit w-fit max-h-[90vh] max-w-[80vw] cursor-default prompt-animate ${className}`}
            onClick={e => {
                e.stopPropagation();
                if (onClick) onClick(e);
            }}
            aria-modal="true"
            tabIndex={-1}
        >
            {children}
        </div>
    </div >
);

const ScrollContainer = ({ children, className }: ContainerProps) => (
    <div className={`flex flex-col gap-2 h-full overflow-y-scroll rounded-lg p-1 ${className}`}>
        {children}
    </div>
);

export { MainContainer, ModalContainer, ScrollContainer };
