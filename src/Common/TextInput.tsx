/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, type FC } from "react";
import { Form, FormGroup } from "react-bootstrap";

interface InputType {
  register: any;
  label: string;
  errors: any;
  type: string;
  required?: boolean;
  name: string;
  disabled?: boolean;
  validation?: any;
  value?: string;
  defaultValue?: boolean;
  onclick?: () => void;
  max?: number;
  min?: number;
  step?: string | number;
}

const TextInput: FC<InputType> = ({
  register,
  label,
  errors,
  type,
  name,
  required = false,
  disabled = false,
  value,
  defaultValue = false,
  onclick,
  validation,
  max,
  min,
  step,
}) => {
  const [maskedValue, setMaskedValue] = useState(value || "");

  // Handler for masked time input (if using type="text" instead of type="time")
  const handleTimeMaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^0-9:]/g, "");

    if (v.length === 2 && !v.includes(":")) {
      v += ":";
    }
    if (v.length > 5) {
      v = v.slice(0, 5);
    }

    const parts = v.split(":");
    if (parts[0] && Number(parts[0]) > 23) parts[0] = "23";
    if (parts[1] && Number(parts[1]) > 59) parts[1] = "59";
    v = parts.join(":");

    setMaskedValue(v);

    // Update react-hook-form
    register(name).onChange({ target: { name, value: v } });
  };

  // Auto-close native time picker after selection
  const handleTimePickerSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      e.target.blur(); // This usually closes the picker in Chrome/Edge
    }, 0);
  };

  // Sync value from props / react-hook-form
  useEffect(() => {
    setMaskedValue(value || "");
  }, [value]);

  // ── Date range restrictions ──
  const today = new Date().toISOString().split("T")[0]; // e.g. "2026-01-22"
  const endOfYear = new Date(new Date().getFullYear(), 11, 31)
    .toISOString()
    .split("T")[0];

  const dateProps =
    type === "date" || type === "Date" // handle both capitalizations just in case
      ? name === "dateOfBirth"
        ? { max: endOfYear } // DOB: no future dates beyond this year
        : {} // ALL other date fields: allow PAST + future (no min)
      : {};

  return (
    <FormGroup className="flex flex-col">
      <Form.Label className="mb-1">
        {type !== "checkbox" && label}{" "}
        {required && <span className="text-red-900">*</span>}
      </Form.Label>

      {type === "checkbox" ? (
        <Form.Check
          className="cursor-pointer flex items-center gap-2"
          type="checkbox"
          {...register(name)}
          label={label}
          id={name}
          defaultChecked={defaultValue}
          onClick={onclick}
        />
      ) : (
        <Form.Control
          type={type === "Date" ? "date" : type === "Time" ? "time" : type}
          placeholder={
            type === "time" || type === "Time"
              ? "HH:MM"
              : type === "date" || type === "Date"
                ? "mm/dd/yyyy"
                : `Enter ${label}`
          }
          autoComplete={
            type === "email"
              ? "email"
              : type === "time" ||
                  type === "Time" ||
                  type === "date" ||
                  type === "Date"
                ? "off"
                : "new-password"
          }
          value={
            type === "text" &&
            (name === "Time" || name.toLowerCase().includes("time"))
              ? maskedValue
              : undefined
          }
          {...register(name, validation)}
          {...(type === "number" ? { min: 0, max } : {})}
          step={
            type === "time" || type === "Time"
              ? "60"
              : type === "number"
                ? "any"
                : undefined
          }
          id={name}
          {...dateProps}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (type === "time" || type === "Time") {
              handleTimePickerSelect(e);
            } else if (
              type === "text" &&
              (name === "Time" || name.toLowerCase().includes("time"))
            ) {
              handleTimeMaskChange(e);
            }
            // react-hook-form will handle the rest via register
          }}
          disabled={disabled}
          className={`w-full border px-2 py-2 rounded focus:outline-none focus:ring-blue-900 ${
            errors?.[name] ? "border-red-500" : "border-gray-300"
          }`}
        />
      )}

      {errors?.[name] && (
        <div className="text-red-500 text-lg mt-1">{errors[name]?.message}</div>
      )}
    </FormGroup>
  );
};

export default TextInput;
