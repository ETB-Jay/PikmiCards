import React from "react";
import { MouseEventHandler } from "react";

interface ModalContainerProps {
    position: string;
    children: React.ReactNode;
}

interface ButtonProps {
    children: React.ReactNode;
    onClick: MouseEventHandler;
}

const ModalContainer = ({ position, children }: ModalContainerProps) => {
    return (
        <div className={`absolute flex flex-col bg-green-smoke-200 border-1 shadow-2xl py-1 rounded z-100 ${position}`}>
            {children}
        </div>
    );
};

const PromptText = ({ label }: {label: string}) => {
    return (
        <p className={"font-semibold text-sm"}>{label}</p>
    );
};

const Button = ({ children, onClick }: ButtonProps) => {
    return (
        <button
            className={"relative flex items-center px-1 gap-1 bg-green-smoke-300 rounded shadow-[-2px_2px_4.1px_2px_rgba(0,0,0,0.3)] border border-black hover:bg-green-smoke-400 transition-colors cursor-pointer"}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export { ModalContainer, PromptText, Button };