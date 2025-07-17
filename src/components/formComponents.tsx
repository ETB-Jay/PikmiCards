// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { ButtonProps, ChildrenAndClassProps, InputProps, PopupProps } from '../interfaces';
import { cn } from '../context/functions';

import { ErrorBox } from './containers';

/**
 * @description InputField renders a styled input with an icon.
 */
const InputField = memo(({ icon, label, type, value, onChange, autoComplete, err }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = (type === 'password');
  const inputType = (isPassword && showPassword) ? 'text' : type;
  const passwordIcon = showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />;
  const passwordAriaLabel = showPassword ? 'Hide password' : 'Show password';
  return (
    <div className={cn("relative flex flex-col items-center justify-center min-w-fit w-full")}>
      <label
        className={cn("relative flex flex-row items-center w-full")}
        htmlFor={label.replace(/\s+/g, '-').toLowerCase()}
      >
        <span className={cn("absolute -translate-y-1/2 left-3 top-1/2")}>{icon}</span>
        <input
          id={label.replace(/\s+/g, '-').toLowerCase()}
          className={cn("w-full rounded-xl border border-green-smoke-200 bg-white/80 py-2.5 pl-11 pr-4 text-base text-stone-800 shadow-sm transition-all placeholder:text-stone-600 focus:ring-2 focus:ring-green-smoke-400 focus:outline-none sm:pl-11")}
          placeholder={label}
          type={inputType}
          value={value}
          aria-label={label.replace(/\s+/g, '-').toLowerCase()}
          onChange={onChange}
          autoComplete={autoComplete}
        />
        {isPassword && (
          <div
            className="absolute right-4 cursor-pointer"
            onClick={() => setShowPassword((show) => !show)}
            tabIndex={0}
            role="button"
            aria-label={passwordAriaLabel}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter' || ev.key === ' ') {
                setShowPassword((show) => !show);
              }
            }}
          >
            {passwordIcon}
          </div>
        )}
      </label>
      {err && <ErrorBox className={cn("mt-4")}>{err}</ErrorBox>}
    </div>
  );
});
InputField.displayName = 'InputField';

/**
 * @description Empty renders a styled visual for when something is empty.
 */
const Empty = memo(({ text }: { text: string }): React.ReactElement => (
  <div className={cn("flex flex-col items-center justify-center w-full h-full p-5 rounded-2xl text-lg text-center bg-green-50/10")}>
    <img src="/OpenBox.svg" alt="" className="w-16 h-16 mx-auto mb-2 text-white" />
    <span className='text-white BFont'>{text}</span>
  </div>
)
);
Empty.displayName = 'Empty';

/**
 * @description Button renders a styled button.
 */
const Button = memo(
  ({
    icon,
    label,
    onClick,
    className = '',
    disabled,
    ref,
    type = 'button',
  }: ButtonProps): React.ReactNode => {
    return (
      <button
        ref={ref}
        // eslint-disable-next-line react/button-has-type
        type={type}
        className={cn(
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-smoke-600 hover:bg-green-smoke-700 active:bg-green-smoke-800 cursor-pointer",
          "inline-flex items-center justify-center rounded-xl py-1 px-2 font-semibold text-white shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-smoke-800 focus:ring-offset-2 BFont",
          className
        )}
        onClick={onClick}
        disabled={disabled}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            onClick(ev as any);
          }
        }}
      >
        <span className="flex items-center gap-2">
          {icon && icon}
          {label && <span className="hidden text-sm font-semibold md:block">{label}</span>}
        </span>
      </button>
    );
  }
);
Button.displayName = 'Button';

/** @description PopupOption displays a selectable option in a dropdown  */
const PopupOption = memo(({ label, current, onSelect }: PopupProps): React.ReactNode => {
  const handleClick = () => label !== current && onSelect(label);

  return (
    <div
      role="button"
      className={cn("px-3 transition-colors rounded cursor-pointer hover:bg-black/10")}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          handleClick();
        }
      }}
    >
      <span className={cn("text-sm font-semibold BFont text-green-950")}>{label}</span>
    </div>
  );
});
PopupOption.displayName = 'PopupOption';

/** @description SectionTitle renders a visually distinct section heading */
const SectionTitle = memo(
  ({ children, className = '' }: ChildrenAndClassProps): React.ReactElement => (
    <h2 className={cn("text-sm font-semibold text-white", className)}>{children}</h2>
  )
);
SectionTitle.displayName = 'SectionTitle';

/**
 * @description Title renders a large, bold heading.
 */
const Title = memo(({ text }: { text: string }) => (
  <h1 className={cn("mb-2 text-4xl font-extrabold tracking-tight text-center text-green-400 drop-shadow-lg")}>{text}</h1>
));
Title.displayName = 'Title';

/**
 * @description Subtitle renders a medium, bold subheading.
 */
const Subtitle = memo(({ text }: { text: string }) => (
  <h2 className={cn("mb-1 text-2xl font-bold text-center text-green-200")}>{text}</h2>
));
Subtitle.displayName = 'Subtitle';

/**
 * @description Description renders a styled description text.
 */
const Description = memo(({ text }: { text: string }) => (
  <h2 className={cn("mb-2 italic font-medium text-gray-300 text-md")}>{text}</h2>
));
Description.displayName = 'Description';

/**
 * @description Text renders a styled paragraph.
 */
const Text = memo(({ text }: { text: string }) => (
  <p className={cn("mb-2 text-green-100")}>{text}</p>
));
Text.displayName = 'Text';

export { InputField, ErrorBox, Empty, Button, PopupOption, SectionTitle, Title, Subtitle, Description, Text };
