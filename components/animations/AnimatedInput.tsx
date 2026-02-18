"use client";

import { m } from "motion/react";
import { useState, forwardRef } from "react";

interface AnimatedInputProps {
  label: string;
  name: string;
  type?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, name, type = "text", error, placeholder, required, disabled, className = "", onChange, defaultValue }, ref) => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState(defaultValue || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e.target.value);
    };

    return (
      <div className={`mb-6 ${className}`}>
        <m.label
          className="block text-sm font-semibold text-primary mb-2"
          animate={{ color: focused ? "#005461" : "#5C5C5C" }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </m.label>

        <m.input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full px-4 py-3 border rounded-lg font-[var(--font-body)] outline-none transition-colors ${
            error ? "border-red-500 bg-red-50" : "border-border bg-surface"
          }`}
          animate={{
            borderColor: error ? "#EF4444" : focused ? "#005461" : "#E5E7EB",
            boxShadow: focused ? "0 0 0 3px rgba(0, 84, 97, 0.1)" : "none",
          }}
          transition={{ duration: 0.2 }}
        />

        {error && (
          <m.p
            className="text-red-500 text-sm mt-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </m.p>
        )}
      </div>
    );
  }
);

AnimatedInput.displayName = "AnimatedInput";

export default AnimatedInput;
