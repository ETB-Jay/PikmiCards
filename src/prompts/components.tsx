import React, { PropsWithChildren } from "react";

interface PromptContainerProps extends PropsWithChildren<{}> {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    title?: string;
    icon?: React.ReactNode;
    role?: string;
}

const PromptContainer: React.FC<PromptContainerProps> = ({ className = '', children, onClick, title, icon, role = "dialog" }) => {
    return (
        <div
            className={`${className} absolute z-20 bg-green-smoke-400 rounded-lg ring-2 ring-black shadow-2xl border border-green-800/30 `}
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

interface PromptButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

const PromptButton: React.FC<PromptButtonProps> = ({ children, icon, className = '', type = 'button', ...props }) => {
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

export { PromptContainer, PromptButton }
