/**
 * @description LoadingSpinner renders an animated loading indicator for orders
 * @returns The loading spinner
 */
const LoadingSpinner = memo((): React.ReactElement => (
  <FlexColCenter className="h-full w-full gap-4">
    <div className="animate-float-spin">
      <div className="animate-fly-horizontal relative flex flex-row items-center justify-center">
        <div className="spaceship-fire spaceship-fire-horizontal" />
        <img
          src="/spaceship.png"
          alt={SPACESHIP_ALT}
          className="relative z-10 h-20 w-auto drop-shadow-xl"
          draggable={false}
        />
      </div>
    </div>
    <span className="text-white text-xl font-bold tracking-wide drop-shadow-sm">
      {LOADING_TEXT}
      <span className="loading-dots" />
    </span>
  </FlexColCenter>
)
);
LoadingSpinner.displayName = 'LoadingSpinner';



/**
 * Renders a styled input with an icon for the login form.
 *
 * Displays an input field with a leading icon, label/placeholder, and handles value changes.
 *
 * @returns The styled input field component.
 */
const InputField = ({ label, type = 'text', value, onChange, icon, err }: {
  label: string;
  type?: string;
  value: string;
  onChange: (ev: ChangeEvent) => void;
  icon: React.ReactNode;
}): React.ReactElement => {
  const inputId = useId();
  return (
    <div className="relative flex min-w-sm items-center">
      <input
        role="button"
        id={inputId}
        className="border-green-smoke-200 focus:ring-green-smoke-400 w-full rounded-xl border bg-white/80 py-2 pr-3 pl-10 text-base text-stone-800 shadow-sm transition-all placeholder:text-stone-600 focus:ring-2 focus:outline-none sm:py-2.5 sm:pl-12 sm:text-lg"
        placeholder={label}
        type={type}
        value={value}
        aria-label={inputId}
        onChange={onChange}
      />
      <span className="text-green-smoke-600 absolute top-1/2 left-3 -translate-y-1/2 text-xl sm:text-2xl">
        {icon}
      </span>
    </div>
  );
};

const unretrievedItems = order.items
  .filter((item) => item.status !== 'inBox')
  .map((item) => orderData.items.find((data) => data.itemID === item.itemID))
  .filter(Boolean) as ItemData[];

const retrievedItems = order.items
  .filter((item) => item.status === 'inBox')
  .map((item) => orderData.items.find((data) => data.itemID === item.itemID))
  .filter(Boolean) as ItemData[];

const Empty = () => (
  <ErrorBox className="flex h-full w-full flex-col items-center justify-center bg-green-50/10 text-center text-lg">
    <img src="/OpenBox.svg" alt={EMPTY_ALT} className="mx-auto mb-2 h-16 w-16 opacity-80" />
    {EMPTY_TEXT}
  </ErrorBox>
);

const HeaderRedirectButton = memo(
  ({ label, navigateTo, onClick, icon }: HeaderRedirectButtonProps) => {
    const navigate = useNavigate();
    const handleClick = onClick
      ? onClick
      : () => { if (navigateTo) { navigate(navigateTo); } };
    return (
      <button
        type="button"
        className="focus:ring-green-smoke-400 bg-green-smoke-400/50 hover:bg-green-smoke-200/60 hover:text-green-smoke-900 hover:border-green-smoke-400 focus:bg-green-smoke-100/80 focus:text-green-smoke-900 focus:border-green-smoke-600 mx-1 flex cursor-pointer flex-row items-center justify-center gap-2 rounded-lg border border-green-300/40 p-2 font-mono text-xs font-bold tracking-wider text-green-100 shadow-[0_2px_8px_0_rgba(166,170,98,0.15)] transition-all duration-150 focus:ring-2 focus:outline-none"
        onClick={handleClick}
      >
        {icon}
        <span className="hidden md:inline">{label}</span>
      </button>
    );
  }
);
HeaderRedirectButton.displayName = 'HeaderRedirectButton';



const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, icon, className = '', hideSmall = false, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={` bg-green-smoke-700/60 border-green-smoke-900 focus:ring-green-smoke-800 hover:brightness-75 inline-flex w-fit max-w-30 cursor-pointer items-center justify-center gap-2 rounded-md border px-2 py-1 font-bold text-white shadow-lg transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-400 disabled:opacity-80 ${className}`}
      {...props}
    >
      {icon}
      <span className={`BFont text-xs font-bold ${hideSmall && 'hidden sm:flex'}`}>{label}</span>
    </button>
  )
);
Button.displayName = 'Button';


/**
 * Tags component displays item tags (quantity, printing, box, rarity, set).
 * Shows: quantity, printing (abbreviated), rarity, set, and box (if available).
 * @param item - The item to display tags for.
 * @param className - Additional CSS classes.
 */
const Tags = ({ item, className = '' }: { item: ItemData; className?: string }) => {
  const { orderDisplay } = useOrderDisplay();

  const tags: { value: string; icon?: string; alt?: string }[] = [];
  tags.push({
    icon: '/Cart.svg',
    alt: 'Cart',
    value: String(item.itemQuantity),
  });
  if (item.itemPrinting) {
    tags.push({
      value: item.itemPrinting
        .split(/\s+/)
        .map((tag) => tag[0])
        .join(''),
    });
  }
  if (item.itemRarity) {
    tags.push({ value: item.itemRarity });
  }
  if (item.itemSet) {
    tags.push({ value: item.itemSet });
  }

  const order = orderDisplay.find(
    (order): order is import('../types').Order => order.orderID === item.orderID
  );
  if (order && order.box) {
    tags.push({
      icon: '/ClosedBox.svg',
      alt: 'Box',
      value: String(order.box),
    });
  }

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={`${tag.value}-${tag.icon || ''}-${item.itemID || item.orderID || ''}`}
          className={`flex items-center gap-1 rounded-2xl bg-green-900 px-1.5 py-0.5 text-center text-xs font-semibold text-white ring-2 ring-green-950 ${className}`}
        >
          {tag.icon && <img src={tag.icon} alt={tag.alt || ''} className="mr-1 inline h-3 w-3" />}
          {tag.value}
        </span>
      ))}
    </div>
  );
};

/**
 * SectionTitle component for section headers (modals, pages, etc).
 * @param children - The section title content.
 * @param className - Additional CSS classes (e.g., for color).
 */
const SectionTitle = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => <h2 className={`text-green-smoke-300 text-lg font-bold ${className}`}>{children}</h2>;

/**
 * TagPill component for displaying tags, pills, or highlighted text.
 * @param children - The tag content.
 * @param className - Additional CSS classes.
 */
const TagPill = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`mb-1.5 block rounded-2xl px-1.5 py-0.5 text-center text-xs font-semibold text-wrap ${className}`}
  >
    {children}
  </span>
);


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


const CustomerInfoBadge = ({ children }: { children: React.ReactNode }) => (
  <p className="rounded-2xl bg-black/50 px-1.5 py-0.5 font-semibold text-white ring-2 ring-black">
    {children}
  </p>
);

/**
 * CustomerInfo displays summary info for a single order in the grid.
 * @param order - The order to display.
 * @param index - The index of the order in the list.
 */
const CustomerInfo = memo(({ order, index }: CustomerInfoProps) => {
  const { openConfirm } = useConfirm();
  const { orders } = useOrders();

  const orderData = findOrderByID(orders, order.orderID);

  if (!orderData) {
    return null;
  }


  return (
    <div
      className="bg-green-smoke-600/60 hover:bg-green-smoke-600/70 relative flex h-full w-full cursor-pointer flex-row items-center justify-between overflow-hidden rounded-lg border-2 border-green-950 p-2 text-xs text-green-100 shadow backdrop-blur-md transition-all duration-150 hover:scale-[1.01] hover:shadow-lg"
      onClick={(event) => {
        event.stopPropagation();
        openConfirm(order);
      }}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.stopPropagation();
          openConfirm(order);
        }
      }}
    >
      <p className="max-w-1/3 truncate font-semibold">{orderData.customerName}</p>
      <div className="flex flex-row gap-2">
        <CustomerInfoBadge>
          <img
            src="/ClosedBox.svg"
            alt={CARD_IMAGE_ALT_1}
            className="mr-1 inline-block h-4 w-4 align-middle"
          />
          {index}
        </CustomerInfoBadge>
        <CustomerInfoBadge>
          <img
            src="/Picked.svg"
            alt={CARD_IMAGE_ALT_2}
            className="mr-1 inline-block h-4 w-4 align-middle"
          />
          {retrievedCount}
        </CustomerInfoBadge>
        <CustomerInfoBadge>
          <img
            src="/NotPicked.svg"
            alt={CARD_IMAGE_ALT_3}
            className="mr-1 inline-block h-4 w-4 align-middle"
          />
          {unretrievedCount}
        </CustomerInfoBadge>
      </div>
    </div>
  );
});


/**
 * GridContainer wraps content in a styled flex column with optional className.
 * @param content - The content to display inside the container.
 * @param className - Additional CSS classes for the container.
 */
const GridContainer = ({
  content,
  className = '',
}: {
  content: ReactNode;
  className: string | undefined;
}) => {
  return <div className={`flex flex-col rounded-2xl bg-white/20 p-2 ${className}`}>{content}</div>;
};
