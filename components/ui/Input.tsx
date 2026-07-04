"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full bg-surface border rounded-2xl px-4 py-3.5
              text-text-primary placeholder:text-text-muted 
              focus:outline-none focus:ring-2 transition-all
              ${icon ? "pl-11" : ""}
              ${error ? "border-primary focus:border-primary focus:ring-primary/20" : "border-border focus:border-primary focus:ring-primary/20"}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-primary">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
