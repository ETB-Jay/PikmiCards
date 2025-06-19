import { memo, ReactNode, useMemo } from "react";

/**
 * Props for the Container component.
 * @property {string} [className] - Additional CSS classes for the container.
 * @property {ReactNode} children - The content to render inside the container.
 */
interface ContainerProps {
    className?: string;
    children: ReactNode;
}

/**
 * A styled container with optional background and shadow.
 * @param {ContainerProps} props - The props for the container.
 * @returns {JSX.Element}
 */
const Container = memo(({ className, children }: ContainerProps) => {
    const containerClass = useMemo(() => 
        `rounded-2xl overflow-y-hidden ${className?.includes("bg-none") ? "" : "bg-white/10 backdrop-blur-sm shadow-lg"} ${className}`,
        [className]
    );
    return <div className={containerClass}>{children}</div>;
});

/**
 * A scrollable container for displaying content with a custom style.
 * @param {ContainerProps} props - The props for the scroll container.
 * @returns {JSX.Element}
 */
const ScrollContainer = memo(({ className, children }: ContainerProps) => {
    const scrollClass = useMemo(() => 
        `flex flex-col gap-2 h-full overflow-y-scroll rounded-lg bg-white/5 backdrop-blur-sm ${className}`,
        [className]
    );
    return <div className={scrollClass}>{children}</div>;
});

export { Container, ScrollContainer }; 