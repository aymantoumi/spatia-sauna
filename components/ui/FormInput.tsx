"use client";

import { cn } from "@/lib/utils";

interface FormInputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "number" | "password";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  hint?: string;
  className?: string;
}

export default function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
  disabled,
  hint,
  className,
}: FormInputProps) {
  return (
    <div className={cn("mb-6", className)}>
      <label className="block text-sm font-medium text-text-primary mb-2">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-full px-4 py-3 border-2 rounded-lg text-base transition-colors",
          error
            ? "border-error bg-error/5 focus:outline-none focus:ring-2 focus:ring-error"
            : "border-border bg-surface focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      />
      {error && <p className="text-error text-sm mt-2">{error}</p>}
      {hint && !error && <p className="text-text-light text-sm mt-2">{hint}</p>}
    </div>
  );
}