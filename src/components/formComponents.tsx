// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';

import { ButtonProps, ChildrenAndClassProps, InputProps, PopupProps } from '../interfaces';

/** @description InputField renders a styled input with an icon */
const InputField = memo(({ icon, label, type, value, onChange, err }: InputProps) => (
  <div className="flex flex-col items-center justify-center min-w-fit">
    <label
      className="relative flex flex-row items-center w-full"
      htmlFor={label.replace(/\s+/g, '-').toLowerCase()}
    >
      <span className="absolute -translate-y-1/2 left-3 top-1/2">{icon}</span>
      <input
        id={label.replace(/\s+/g, '-').toLowerCase()}
        className="w-full rounded-xl border border-green-smoke-200 bg-white/80 py-2.5 pl-11 pr-4 text-base text-stone-800 shadow-sm transition-all placeholder:text-stone-600 focus:ring-2 focus:ring-green-smoke-400 focus:outline-none sm:pl-11"
        placeholder={label}
        type={type}
        value={value}
        aria-label={label.replace(/\s+/g, '-').toLowerCase()}
        onChange={onChange}
      />
    </label>
    {err && <ErrorBox className="mt-4">{err}</ErrorBox>}
  </div>
));
InputField.displayName = 'InputField';

/** @description ErrorBox renders a styled error message box */
const ErrorBox = memo(
  ({ children, className = '' }: ChildrenAndClassProps): React.ReactElement => (
    <div
      className={`animate-shake rounded-lg bg-red-800/40 px-3 py-2 text-center font-semibold text-red-100 ring-3 ring-red-950 ${className}`}
    >
      {children}
    </div>
  )
);
ErrorBox.displayName = 'ErrorBox';

/** @description Empty renders a styled visual for when something is Empty */
const Empty = memo(
  ({ text }: { text: string }): React.ReactElement => (
    <div className="flex flex-col items-center justify-center w-full h-full p-5 text-lg text-center bg-green-50/10">
      <img src="/OpenBox.svg" alt="" className="w-16 h-16 mx-auto mb-2 opacity-80" />
      {text}
    </div>
  )
);
Empty.displayName = 'Empty';

/** @description Button renders a Button */
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
        className={`${
          disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-smoke-600 hover:bg-green-smoke-700 active:bg-green-smoke-800'
        } inline-flex items-center justify-center rounded-xl p-2 font-semibold text-white shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-smoke-800 focus:ring-offset-2 cursor-pointer BFont ${className}`}
        onClick={onClick}
        disabled={disabled}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick(event as any);
          }
        }}
      >
        <span className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          {label && <span className="hidden text-sm font-semibold md:block">{label}</span>}
        </span>
      </button>
    );
  }
);
Button.displayName = 'Button';

/** @description TagPill renders a pill containing information about something */
const TagPill = memo(
  ({ children, className = '' }: ChildrenAndClassProps): React.ReactNode => (
    <span
      className={`flex flex-nowrap gap-1 items-center justify-center rounded-2xl bg-green-900 px-1.5 py-0.5 text-center text-xs font-semibold text-wrap text-white ring-2 ring-green-950 ${className}`}
    >
      {children}
    </span>
  )
);
TagPill.displayName = 'TagPill';

/** @description PopupOption displays a selectable option in a dropdown  */
const PopupOption = memo(({ label, current, onSelect }: PopupProps): React.ReactNode => {
  const handleClick = () => label !== current && onSelect(label);

  return (
    <div
      role="button"
      className="px-3 transition-colors rounded cursor-pointer hover:bg-black/10"
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          handleClick();
        }
      }}
    >
      <span className="text-sm font-semibold BFont text-green-950">{label}</span>
    </div>
  );
});
PopupOption.displayName = 'PopupOption';

/** @description SectionTitle renders a visually distinct section heading */
const SectionTitle = memo(
  ({ children, className = '' }: ChildrenAndClassProps): React.ReactElement => (
    <h2 className={`text-sm font-semibold text-white ${className}`}>{children}</h2>
  )
);
SectionTitle.displayName = 'SectionTitle';

export { InputField, ErrorBox, Empty, Button, TagPill, PopupOption, SectionTitle };
