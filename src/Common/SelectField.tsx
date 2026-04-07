/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { type FC, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Form } from "react-bootstrap";
import { SelectFieldProps } from "../utils/SeleteFiledProps";
import dynamic from "next/dynamic";

// Dynamically import react-select to avoid SSR issues
const SelectLib = dynamic(() => import("react-select"), { ssr: false });

const SelectField: FC<SelectFieldProps> = ({
  control,
  errors,
  label,
  name,
  classname,
  defaultValue,
  formatGroupLabel,
  isDisabled,
  isMulti,
  isRequired = false,
  options,
  validation,
  fontSize,
}) => {
  const [menuTarget, setMenuTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMenuTarget(document.body);
  }, []);

  return (
    <Form.Group className={`${classname}  flex flex-col`}>
      {label && (
        <Form.Label className=" mb-1">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Form.Label>
      )}

      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <SelectLib
            {...field}
            value={field?.value}
            isMulti={isMulti}
            defaultValue={defaultValue}
            maxMenuHeight={200}
            menuPosition="fixed"
            options={options}
            isClearable
            isDisabled={isDisabled}
            formatGroupLabel={formatGroupLabel}
            menuPortalTarget={menuTarget}
            styles={{
              menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
              menu: (base: any) => ({
                ...base,

                overflowY: "auto", // enable vertical scrolling
              }),
            }}
            className={`${fontSize && "font-sm text-sm h-[39px]"} overflow-y-auto`}
          />
        )}
      />

      {errors[name] && (
        <div className="text-red-600 text-lg mt-1">{errors[name]?.message}</div>
      )}
    </Form.Group>
  );
};

export default SelectField;
