"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";
import { MdOutlineAutoDelete } from "react-icons/md";

interface Row {
  id: string;
  title: string;
  file?: File | null;
  previewUrl?: string;
}

interface OthersProps {
  onRowsChange?: (rows: Row[]) => void;
  fileInputRef?: React.RefObject<HTMLInputElement | null>;
  dragging?: boolean;
  setDragging?: React.Dispatch<React.SetStateAction<boolean>>;
  namePrefix?: "noc" | "other";
}

interface FormValues {
  rows: Row[];
}

const Others: React.FC<OthersProps> = ({ onRowsChange }) => {
  const { control, watch, setValue } = useForm<FormValues>({
    defaultValues: { rows: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  const rows = watch("rows");

  // Call onRowsChange whenever rows change
  const handleAddRow = () => {
    append({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      title: "",
      file: null,
      previewUrl: undefined,
    });
    const newRows = [
      ...rows,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        title: "",
        file: null,
        previewUrl: undefined,
      },
    ];
    onRowsChange?.(newRows);
  };

  const handleFileChange = (file: File, index: number) => {
    const previewUrl = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : undefined;
    setValue(`rows.${index}.file`, file);
    setValue(`rows.${index}.previewUrl`, previewUrl);

    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], file, previewUrl };
    onRowsChange?.(updatedRows);
  };

  const handleRemoveRow = (index: number) => {
    const previewUrl = rows[index]?.previewUrl;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    remove(index);

    const updatedRows = rows.filter((_, i) => i !== index);
    onRowsChange?.(updatedRows);
  };

  return (
    <div className="space-y-6">
      {/* Add Document Button */}
      <button
        type="button"
        onClick={handleAddRow}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium transition-colors"
      >
        + Add Document
      </button>

      {/* No documents */}
      {fields.length === 0 && (
        <p className="text-gray-500 text-sm italic">No documents added yet</p>
      )}

      {/* Rows */}
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-gray-200 rounded-lg p-5 bg-gray-50/50 space-y-5 shadow-sm"
        >
          {/* Remove button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleRemoveRow(index)}
              className="text-red-600 hover:text-red-800 transition-colors"
              aria-label="Remove document"
            >
              <MdOutlineAutoDelete size={26} />
            </button>
          </div>

          {/* Title input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Document Title <span className="text-red-500">*</span>
            </label>
            <Controller
              name={`rows.${index}.title`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter document title / description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            />
          </div>

          {/* File input */}
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
              rows[index]?.file
                ? "border-green-400 bg-green-50/30"
                : "border-blue-400 hover:border-blue-500"
            }`}
          >
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
              id={`file-upload-${field.id}`}
              onChange={(e) => {
                if (e.target.files?.[0])
                  handleFileChange(e.target.files[0], index);
              }}
            />
            <label
              htmlFor={`file-upload-${field.id}`}
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <AiOutlineUpload className="text-6xl text-blue-500" />
              <div className="text-lg font-medium text-gray-700">
                {rows[index]?.file
                  ? rows[index]?.file?.name
                  : "Click or drag file here"}
              </div>
              <span className="text-sm text-gray-500">
                Supported: JPG, PNG, PDF
              </span>
            </label>

            {/* Image preview */}
            {rows[index]?.previewUrl && (
              <div className="mt-6 flex justify-center">
                <img
                  src={rows[index].previewUrl}
                  alt="preview"
                  className="max-h-48 rounded border shadow-sm object-contain"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Others;
