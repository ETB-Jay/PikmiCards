import React, { PropsWithChildren } from "react";

interface ModalContainerProps extends PropsWithChildren<{}> {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    title?: string;
    icon?: React.ReactNode;
    role?: string;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ className = '', children, onClick, title, icon, role = "dialog" }) => {
    return (
        <div
            className={`relative rounded-lg bg-green-smoke-400 shadow-2xl border border-green-800/30 p-4 z-60 flex flex-col items-center justify-center gap-2 h-fit w-fit max-h-[90vh] max-w-[80vw] cursor-default prompt-animate ${className}`}
            onClick={onClick}
            role={role}
            aria-modal="true"
            tabIndex={-1}
        >
            {(icon || title) && (
                <div className="flex items-center mb-2 gap-2">
                    {icon && <span className="text-2xl">{icon}</span>}
                    {title && <span className="font-bold text-lg text-green-950">{title}</span>}
                </div>
            )}
            {children}
        </div>
    );
};

interface ModalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

const ModalButton: React.FC<ModalButtonProps> = ({ children, icon, className = '', type = 'button', ...props }) => {
    return (
        <button
            type={type}
            className={`bg-black-olive-700 hover:bg-black-olive-800 rounded px-3 py-1 focus:ring-0 focus:outline-none cursor-pointer text-white font-medium flex items-center gap-2 transition-all duration-150 shadow-md ${className}`}
            {...props}
        >
            {icon && <span className="text-lg">{icon}</span>}
            {children}
        </button>
    );
};

interface ModalOverlayProps extends React.PropsWithChildren<{}> {
    onClose: () => void;
    className?: string;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ children, onClose, className = "" }) => (
    <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center w-screen h-screen cursor-pointer select-none ${className}`}
        onClick={onClose}
    >
        {children}
    </div>
);

export { ModalContainer, ModalButton, ModalOverlay }
