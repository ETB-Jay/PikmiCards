import React from "react";
import { memo, useCallback } from "react";
import { useBoxOrders, useFullscreen, useOrderDisplay } from "../../context/useContext";
import { ItemData, Order } from "../../types";
import { ImageDisplay } from "./ImageDisplay";

/**
 * Props for the OrderCard component.
 * @property {Item} item - The item to display in the card.
 * @property {string} [className] - Additional CSS classes for the card.
 * @property {string} itemKey - The unique key for the item.
 * @property {boolean} label - Whether to display the item name label.
 */
interface CardProps {
    itemData: ItemData;
    className?: string;
    selected: boolean;
    label: boolean;
    itemKey: string;
}

/**
 * Generates tags for the item card.
 */
function getTags(item: ItemData, boxOrders: Order[] | null) {
    return [
        `🛒 ${item.itemQuantity}`,
        `${item.itemPrinting}`,
        `${boxOrders !== null && boxOrders.findIndex(order => order.order === item.orderID) !== -1 ? `📦 ${1 + boxOrders.findIndex(order => order.order === item.orderID)}` : ""}`,
        `${item.itemRarity}`,
        `${item.itemSet}`
    ].filter(Boolean);
}

/**
 * Renders a tag element.
 */
function renderTag(tag: string, index: number) {
    return (
        <span key={index} className={"flex flex-row w-fit items-center justify-center text-nowrap bg-green-950 border border-green-400/30 rounded-2xl px-2 py-0.5 text-silver-100 text-xs"}>
            {tag}
        </span>
    );
}

/**
 * Displays an order card with item details, image, and tags.
 * @param {CardProps} props - The props for the order card.
 * @returns {JSX.Element}
 */
const OrderCard = memo(({ itemData, className = "", selected, label }: CardProps) => {
    const { openFullscreen } = useFullscreen();
    const { boxOrders } = useBoxOrders();
    const { handleSelect } = useOrderDisplay();

    const handleImageClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        openFullscreen(itemData.imageUrl);
    }, [openFullscreen, itemData.imageUrl]);

    const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png";
    }, []);

    const handleCardClick = useCallback(() => {
        handleSelect(itemData.itemID);
    }, [handleSelect, itemData]);

    const tags = getTags(itemData, boxOrders);
    const baseClass = `flex flex-row gap-3 items-start ${selected ? "bg-black-olive-800 hover:bg-black-olive-900" : "bg-green-smoke-600/70 hover:bg-green-smoke-600/90"} hover:scale-[1.01] border-brown-950 border shadow-[0px_0px_3px_2px_rgba(0,0,0,0.25)] p-2 rounded-lg cursor-pointer transition-all`;
    const itemName = itemData.itemName || "Unnamed Product";

    return (
        <div className={`${baseClass} ${className}`} onClick={handleCardClick}>
            <div className="relative h-20 min-w-14">
                <ImageDisplay
                    imageUrl={itemData.imageUrl}
                    alt={itemName}
                    onClick={handleImageClick}
                    onError={handleImageError}
                    className="h-full object-contain rounded w-fit"
                />
            </div>
            <div className="flex flex-col justify-between h-full max-w-[calc(100%-6.5rem)]">
                <div className="font-bold text-wrap">
                    {itemData.itemName && label && (
                        <span className="block text-wrap rounded-2xl mb-1.5 text-silver-100 text-sm font-semibold">
                            {itemData.itemName}
                        </span>
                    )}
                    <div className={"flex flex-row flex-wrap min-w-40 gap-2"}>
                        {tags
                            .filter((tag) => tag !== "null" && tag !== "undefined" && tag !== "")
                            .map(renderTag)}
                    </div>
                </div>
            </div>
        </div>
    );
});

OrderCard.displayName = "OrderCard";

export { OrderCard }; 