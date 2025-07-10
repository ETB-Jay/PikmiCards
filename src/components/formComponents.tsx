// ─ Imports ──────────────────────────────────────────────────────────────────────────────────────
import { memo } from 'react';

import { ButtonProps, ChildrenAndClassProps, InputProps, PopupProps } from '../interfaces';

/** @description InputField renders a styled input with an icon */
const InputField = memo(({ icon, label, type, value, onChange, err }: InputProps) => (
  <div className="flex min-w-fit flex-col items-center justify-center">
    <label
      className="relative flex min-w-100 flex-row items-center"
      htmlFor={label.replace(/\s+/g, '-').toLowerCase()}
    >
      <span className="absolute left-3.5">{icon}</span>
      <input
        id={label.replace(/\s+/g, '-').toLowerCase()}
        role="button"
        className="border-green-smoke-200 focus:ring-green-smoke-400 w-full rounded-xl border bg-white/80 py-2 pr-3 pl-10 text-base text-stone-800 shadow-sm transition-all placeholder:text-stone-600 focus:ring-2 focus:outline-none sm:py-2.5 sm:pl-12 sm:text-lg"
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
    <div className="flex h-full w-full flex-col items-center justify-center bg-green-50/10 text-center text-lg">
      <img src="/OpenBox.svg" alt="" className="mx-auto mb-2 h-16 w-16 opacity-80" />
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
        className={`${disabled ? 'bg-gray-400' : 'bg-green-smoke-600 hover:bg-green-smoke-700 focus:ring-green-smoke-800'} cursor-pointer rounded-xl p-2 font-bold tracking-wide text-white shadow transition-all focus:ring-2 focus:outline-none ${className}`}
        onClick={onClick}
        disabled={disabled}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick(event as any);
          }
        }}
      >
        <span className="flex items-center gap-1">
          {icon}
          <span className="BFont hidden font-bold sm:inline sm:text-xs lg:text-base">{label}</span>
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
      className={`block items-center justify-center rounded-2xl bg-green-900 px-1.5 py-0.5 text-center text-xs font-semibold text-wrap text-white ring-2 ring-green-950 ${className}`}
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
      className="cursor-pointer rounded px-3 transition-colors hover:bg-black/10"
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          handleClick();
        }
      }}
    >
      <span className="BFont text-sm font-semibold text-green-950">{label}</span>
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
