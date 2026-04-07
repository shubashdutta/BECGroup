/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import { formats, TextAreaModules } from "../lib/TextAreaModules";
import { TextAreaProps } from "../lib/type";

import "react-quill-new/dist/quill.snow.css";

// ✅ Dynamic import (Next.js safe)
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const TextArea = ({
  control,
  errors,
  label,
  name,
  className,
  defaultValue = "",
  isRequired = false,
  validation,
  height,
}: TextAreaProps) => {
  const quillRef = useRef<any>(null);

  // ✅ Image upload handler (base64 for now)
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file && quillRef.current) {
        const reader = new FileReader();

        reader.onload = () => {
          const quill = quillRef.current.getEditor(); // ✅ correct instance
          const range = quill.getSelection(true);

          quill.insertEmbed(range.index, "image", reader.result);
        };

        reader.readAsDataURL(file);
      }
    };
  };

  // ✅ Correct toolbar config
  const enhancedModules = {
    ...TextAreaModules,
    toolbar: {
      container: TextAreaModules.toolbar,
      handlers: {
        image: imageHandler,
      },
    },
  };

  return (
    <Form.Group className={`mb-3 ${className}`}>
      <Form.Label>
        {label} {isRequired && <span className="text-red-500">*</span>}
      </Form.Label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          validate: (value) => {
            if (!isRequired && !validation?.required) return true;

            const text = value
              ?.replace(/<[^>]*>/g, "")
              .replace(/&nbsp;/g, "")
              .trim();

            return text?.length > 0 || "Remarks is Required";
          },
        }}
        render={({ field }) => (
          <ReactQuill
            // @ts-expect-error - react-quill-new doesn't expose ref in types but it works at runtime
            ref={(el) => (quillRef.current = el)}
            value={field.value}
            formats={formats}
            modules={enhancedModules}
            onChange={(content) => field.onChange(content)}
            onBlur={field.onBlur}
            style={{ height: height || "150px" }}
          />
        )}
      />

      {errors[name] && (
        <div className="text-red-600 text-center flex items-center justify-center text-sm mt-2">
          {(errors[name] as any)?.message}
        </div>
      )}
    </Form.Group>
  );
};

export default TextArea;
