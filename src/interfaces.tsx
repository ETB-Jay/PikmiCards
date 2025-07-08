
// ─ Interfaces ───────────────────────────────────────────────────────────────────────────────────
interface ConfirmModalProps {
  order: Order;
  onClose: () => void;
}

/**
 * HeaderRedirectButton renders a styled header navigation button.
 * - If `navigateTo` is provided, clicking navigates to that route.
 * - If `onClick` is provided, it is called on click instead.
 *
 * @param label - The button text.
 * @param navigateTo - (Optional) Route to navigate to on click.
 * @param onClick - (Optional) Custom click handler.
 * @param icon - (Optional) Icon to display before the label.
 * @param iconAlt - (Optional) Alternative text for the icon.
 */
interface HeaderRedirectButtonProps {
  label: string;
  navigateTo?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

/**
 * Props for the DetermineLocation component.
 * @property location - The current location string.
 * @property setLocation - Function to update the location.
 * @property prompt - Function to toggle the prompt visibility.
 */
interface DetermineLocationProps {
  location: Location;
  setLocation: (location: Location) => void;
  prompt: (active: boolean) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

interface OrderCardToPickProps {
  item: ItemData;
  selected: boolean;
  onCardClick?: () => void;
}
interface OrderCardQueuePileProps {
  item: ItemData;
  selected: boolean;
  onCardClick?: () => void;
}



/**
 * Button component for modal actions.
 * @param label - The button label text.
 * @param icon - Optional icon element.
 * @param className - Additional CSS classes for the button.
 * @param ...props - Standard button props.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  hideSmall?: boolean;
}


/**
 * Props for the ImageDisplay component.
 * @property {string} imageUrl - The URL of the image to display.
 * @property {string} alt - The alt text for the image.
 * @property {(e: React.MouseEvent) => void} [onClick] - Optional click handler for the image.
 * @property {string} [className] - Additional CSS classes for the image.
 * @property {(e: React.SyntheticEvent<HTMLImageElement>) => void} [onError] - Optional error handler for the image.
 */
interface ImageDisplayProps {
  imageUrl: string;
  alt: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}


interface CustomerInfoProps {
  order: Order;
  index: number;
}


/**
 * Props for the FullscreenModal component.
 * @property image - The image URL to display.
 * @property onClose - Function to close the modal.
 * @property children - Optional additional content.
 */
interface FullscreenModalProps {
  image?: string;
  onClose: () => void;
  children?: React.ReactNode;
}