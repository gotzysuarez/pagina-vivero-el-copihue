import React from "react";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface FieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  textarea?: boolean;
  rows?: number;
  required?: boolean;
}

export function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  textarea = false,
  rows = 4,
  required = false,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[13px] uppercase tracking-[0.14em] text-white/45"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-2xl border bg-white/5 px-5 py-4 text-[15px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-white/60 ${
            error ? "border-red-300/60" : "border-white/15"
          }`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-13 w-full rounded-2xl border bg-white/5 px-5 text-[15px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-white/60 ${
            error ? "border-red-300/60" : "border-white/15"
          }`}
        />
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[13px] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
