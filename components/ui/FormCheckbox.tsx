"use client";

import { cn } from "@/lib/utils";

interface FormCheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
}

export default function FormCheckbox({
  label,
  name,
  checked,
  onChange,
  hint,
  required,
  disabled,
  className,
  error,
}: FormCheckboxProps) {
  return (
    <div className={cn("mb-6", className)}>
      <div className="flex items-start">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className={cn(
            "mt-1 w-5 h-5 border-2 rounded focus:ring-2 focus:ring-accent cursor-pointer",
            error ? "border-error" : "border-border",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
        <label
          htmlFor={name}
          className={cn(
            "ml-3 text-text-secondary cursor-pointer select-none",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      </div>
      {error && <p className="text-error text-sm mt-2 ml-8">{error}</p>}
      {hint && !error && (
        <p className="text-text-light text-sm mt-2 ml-8">{hint}</p>
      )}
    </div>
  );
}