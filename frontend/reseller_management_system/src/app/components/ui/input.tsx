import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => {
    const errorClasses = error ? "border-[var(--color-status-error-border)] focus:ring-[var(--color-status-error-border)]" : "border-[var(--color-neutral-border)] focus:ring-[var(--color-primary-light)]";
    
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-[var(--color-neutral-text)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`flex h-10 w-full rounded-md border bg-[var(--color-neutral-white)] px-3 py-2 text-sm placeholder:text-[var(--color-neutral-muted)] focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${errorClasses} ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-[var(--color-status-error-text)]">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";
