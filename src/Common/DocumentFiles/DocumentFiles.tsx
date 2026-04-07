import React, { useRef } from "react";

interface ImageUploadInputProps {
  label: string;
  value?: File | null;
  onChange: (file: File | null) => void;
}

const DocumentFiles: React.FC<ImageUploadInputProps> = ({
  label,
  value,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const preview = value ? URL.createObjectURL(value) : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Max file size is 5MB");
      return;
    }

    onChange(file);
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full">
      <label className="block mb-2 font-medium">{label}</label>

      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-blue-400 rounded-lg
          h-[280px] cursor-pointer flex items-center justify-center
          hover:bg-blue-50 transition"
      >
        {!value ? (
          <div className="text-center">
            <div className="text-4xl text-blue-500 mb-2">☁️</div>
            <p className="text-blue-600 font-medium">Browse</p>
            <p className="text-sm text-gray-500">Or Drag & Drop image here</p>
          </div>
        ) : (
          <div className="relative w-full h-full p-3">
            <img
              src={preview!}
              alt="Preview"
              className="w-full h-full object-contain rounded"
            />

            <button
              onClick={removeFile}
              className="absolute top-3 right-3 bg-red-600
                text-white px-3 py-1 rounded text-sm"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
};

export default DocumentFiles;
