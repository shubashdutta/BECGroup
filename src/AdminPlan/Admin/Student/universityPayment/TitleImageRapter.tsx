import React, { FC, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";
import { MdOutlineAutoDelete } from "react-icons/md";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";

interface TitleImageRow {
  id: string;
  title: string;
  file?: File | null;
  previewUrl?: string;
}

interface TitleImageRapterProps {
  control: any;
  register: any;
  errors: any;
  name: string;
  label: string;
  setValue: any;
  initialRows?: TitleImageRow[];
}

const TitleImageRapter: FC<TitleImageRapterProps> = ({
  control,
  register,
  errors,
  name,
  label,
  setValue,
  initialRows = [],
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const [rows, setRows] = useState<TitleImageRow[]>(
    initialRows.length > 0 ? initialRows : []
  );

  const handleAddRow = () => {
    const newRow: TitleImageRow = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      title: "",
      file: null,
      previewUrl: undefined,
    };
    
    append(newRow);
    setRows([...rows, newRow]);
  };

  const handleFileChange = (file: File, index: number) => {
    const previewUrl = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : undefined;
    
    setValue(`${name}.${index}.file`, file);
    setValue(`${name}.${index}.previewUrl`, previewUrl);

    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], file, previewUrl };
    setRows(updatedRows);
  };

  const handleRemoveRow = (index: number) => {
    const previewUrl = rows[index]?.previewUrl;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    remove(index);

    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <div className="space-y-4">
      {/* Label */}
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <button
          type="button"
          onClick={handleAddRow}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
        >
          + Add {label}
        </button>
      </div>

      {/* No rows message */}
      {fields.length === 0 && (
        <p className="text-gray-500 text-sm italic">No {label.toLowerCase()} added yet</p>
      )}

      {/* Rows */}
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 space-y-3 shadow-sm"
        >
          <div className="flex justify-between items-start">
            {/* Remove button */}
            <button
              type="button"
              onClick={() => handleRemoveRow(index)}
              className="text-red-600 hover:text-red-800 transition-colors"
              aria-label="Remove document"
            >
              <MdOutlineAutoDelete size={24} />
            </button>

            {/* Title input */}
            <div className="flex-1 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <Controller
                name={`${name}.${index}.title`}
                control={control}
                rules={{ required: ErrorMessage.Title }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              />
              {errors?.[name]?.[index]?.title && (
                <span className="text-red-500 text-sm">
                  {errors[name][index].title.message}
                </span>
              )}
            </div>
          </div>

          {/* File input */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
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
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <AiOutlineUpload className="text-4xl text-blue-500" />
              <div className="text-sm font-medium text-gray-700">
                {rows[index]?.file
                  ? rows[index]?.file?.name
                  : "Click or drag file here"}
              </div>
              <span className="text-xs text-gray-500">
                Supported: JPG, PNG, PDF
              </span>
            </label>

            {/* Image preview */}
            {rows[index]?.previewUrl && (
              <div className="mt-4 flex justify-center">
                <img
                  src={rows[index].previewUrl}
                  alt="preview"
                  className="max-h-32 rounded border shadow-sm object-contain"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TitleImageRapter;