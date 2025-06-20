import { memo, useMemo, useCallback } from "react";

/**
 * Props for the Tags component.
 * @property {string[]} tags - The list of tags to display.
 */
interface TagsProps {
    tags: string[];
}

/**
 * Displays a list of tags, filtering out null, undefined, and empty strings.
 * @param {TagsProps} props - The props for the tags component.
 * @returns {JSX.Element}
 */
const Tags = memo(({ tags }: TagsProps) => {
    const filteredTags = useMemo(() => 
        tags.filter((tag) => tag !== "null" && tag !== "undefined" && tag !== ""),
        [tags]
    );

    const renderTag = useCallback((tag: string, index: number) => (
        <span key={index} className={"flex flex-row w-fit items-center justify-center text-nowrap bg-green-950 border border-green-400/30 rounded-2xl px-2 py-0.5 text-silver-100 text-xs"}>
            {tag}
        </span>
    ), []);

    return (
        <div className={"flex flex-row flex-wrap min-w-40 gap-2"}>
            {filteredTags.map(renderTag)}
        </div>
    );
});

export { Tags }; 