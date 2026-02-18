"use client";

import { cn } from "@/lib/utils";

interface FormSelectProps {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function FormSelect({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required,
  placeholder,
  disabled,
  className,
}: FormSelectProps) {
  return (
    <div className={cn("mb-6", className)}>
      <label className="block text-sm font-medium text-text-primary mb-2">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-full px-4 py-3 border-2 rounded-lg text-base transition-colors appearance-none cursor-pointer",
          "bg-no-repeat bg-right",
          error
            ? "border-error bg-error/5"
            : "border-border bg-surface focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235C5C5C'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
          backgroundSize: "1.5rem",
          backgroundPosition: "right 0.75rem center",
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-error text-sm mt-2">{error}</p>}
    </div>
  );
}