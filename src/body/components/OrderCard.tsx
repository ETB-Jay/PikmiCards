import React from "react";
import { memo, useMemo, useCallback } from "react";
import { useBoxOrders, useFullscreen } from "../../context/useContext";
import { Item } from "../../types";
import { ImageDisplay } from "./ImageDisplay";
import { Tags } from "./Tags";

/**
 * Props for the OrderCard component.
 * @property {Item} item - The item to display in the card.
 * @property {string} [className] - Additional CSS classes for the card.
 * @property {string} itemKey - The unique key for the item.
 * @property {Set<Item>} selectedItems - The set of selected item objects.
 * @property {(item: Item) => void} onSelect - Handler for selecting the card.
 * @property {boolean} label - Whether to display the item name label.
 */
interface CardProps {
    item: Item;
    className?: string;
    itemKey: string;
    selectedItems: Set<Item>;
    onSelect: (item: Item) => void;
    label: boolean;
}

/**
 * Generates a unique key for an item based on its order number, name, and index.
 * @param item - The item to generate a key for.
 * @param index - The index of the item in the list.
 * @returns The generated key.
 */
const getItemKey = (item: Item, index: number) => 
    `${item.orderNumber}-${item.itemName}-${index}`;

/**
 * Displays an order card with item details, image, and tags.
 * @param {CardProps} props - The props for the order card.
 * @returns {JSX.Element}
 */
const OrderCard = memo(({ item, className = "", selectedItems, onSelect, label }: CardProps) => {
    const { openFullscreen } = useFullscreen();
    const { boxOrders } = useBoxOrders()

    const handleImageClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        openFullscreen(item.imageUrl);
    }, [openFullscreen, item.imageUrl]);

    const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png";
    }, []);

    const handleCardClick = useCallback(() => {
        onSelect(item);
    }, [onSelect, item]);

    // Check if the item is in the selectedItems set by orderNumber and itemName
    const isSelected = useMemo(() => {
        for (let i of selectedItems) {
            if (i.orderNumber === item.orderNumber && i.itemName === item.itemName) {
                return true;
            }
        }
        return false;
    }, [selectedItems, item.orderNumber, item.itemName]);

    const tags = useMemo(() => [
        `🛒 ${item.itemQuantity}`,
        `${item.itemPrinting}`,
        `${boxOrders !== null && boxOrders.findIndex(i => i === item.orderNumber) !== -1 ? `📦 ${1 + boxOrders.findIndex(i => i === item.orderNumber)}` : ""}`,
        `${item.itemRarity}`,
        `${item.itemSet}`
    ].filter(Boolean), [item.itemQuantity, item.itemPrinting, boxOrders, item.orderNumber, item.itemRarity, item.itemSet]);

    const baseClass = useMemo(() => 
        `flex flex-row gap-3 items-start ${isSelected ? "bg-black-olive-800 hover:bg-black-olive-900" : "bg-green-smoke-600/70 hover:bg-green-smoke-600/90"} border-brown-950 border shadow-[0px_0px_3px_2px_rgba(0,0,0,0.25)] p-2 rounded-lg cursor-pointer transition-all`,
        [isSelected]
    );

    const itemName = item.itemName || "Unnamed Product";

    return (
        <div
            className={`${baseClass} ${className}`}
            onClick={handleCardClick}
        >
            <div className="relative h-20 min-w-14">
                <ImageDisplay
                    imageUrl={item.imageUrl}
                    alt={itemName}
                    onClick={handleImageClick}
                    onError={handleImageError}
                    className="h-full object-contain rounded w-fit"
                />
            </div>
            <div className="flex flex-col justify-between h-full max-w-[calc(100%-6.5rem)]">
                <div className="font-bold text-wrap">
                    {item.itemName && label && (
                        <span className="block text-wrap rounded-2xl mb-2 text-silver-200 text-sm font-semibold">
                            {item.itemName}
                        </span>
                    )}
                    <Tags tags={tags} />
                </div>
            </div>
        </div>
    );
});

OrderCard.displayName = "OrderCard";

export { OrderCard, getItemKey }; 