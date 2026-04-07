import React from "react";
import { AiFillFilePdf, AiOutlineClose, AiOutlineUpload } from "react-icons/ai";

interface PaymentFileUploadProps {
  fieldName: string;
  label: string;
  files: File[];
  multiple?: boolean;
  onFilesChange: (files: File[]) => void;
  existingDocument?: { path: string; fileName?: string } | null;
  existingMultiDocuments?: any[];
}

export const PaymentFileUpload: React.FC<PaymentFileUploadProps> = ({
  fieldName,
  label,
  files,
  multiple = false,
  onFilesChange,
  existingDocument,
  existingMultiDocuments,
}) => {
  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    onFilesChange(multiple ? [...files, ...newFiles] : newFiles.slice(0, 1));
  };

  const handleRemoveFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    onFilesChange(updated);
  };

  const singleFile = !multiple ? files[0] : null;
  const isSinglePDF = singleFile?.type === "application/pdf";
  const singlePreviewUrl =
    singleFile && !isSinglePDF ? URL.createObjectURL(singleFile) : "";

  const showExisting = Boolean(existingDocument && files.length === 0);
  const isExistingPDF = existingDocument?.path?.toLowerCase().endsWith(".pdf");

  const renderPreview = (
    isPdf: boolean | undefined,
    previewUrl: string | undefined,
    onRemove: () => void,
    fileName?: string,
  ) => (
    <div className="relative w-full h-full border rounded bg-gray-50 flex items-center justify-center group">
      {isPdf ? (
        <AiFillFilePdf size={60} className="text-red-500" />
      ) : (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full h-full object-cover rounded"
        />
      )}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <AiOutlineClose size={16} />
      </button>
      {fileName && (
        <span className="absolute bottom-1 text-xs text-gray-700 bg-white px-1 rounded truncate max-w-[90%]">
          {fileName}
        </span>
      )}
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <span className="text-sm font-semibold">{label}</span>

      {!multiple ? (
        <div className="relative w-40 h-40">
          {showExisting && existingDocument ? (
            <div className="relative w-full h-full border rounded bg-gray-50 flex items-center justify-center group">
              {isExistingPDF ? (
                <a
                  href={existingDocument.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center w-full h-full"
                >
                  <AiFillFilePdf size={60} className="text-red-500" />
                  <span className="text-xs text-gray-600 mt-1 truncate px-2 w-full text-center">
                    {existingDocument.fileName || "Document"}
                  </span>
                </a>
              ) : (
                <img
                  src={existingDocument.path}
                  alt="Existing Document"
                  className="w-full h-full object-cover rounded"
                />
              )}
              <button
                type="button"
                onClick={() => onFilesChange([])}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <AiOutlineClose size={16} />
              </button>
            </div>
          ) : !singleFile ? (
            <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
              <AiOutlineUpload size={40} className="text-gray-400" />
              <span className="mt-2 text-sm text-gray-600">
                Click to upload
              </span>
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={handleAddFiles}
              />
            </label>
          ) : (
            <div className="relative w-full h-full">
              {renderPreview(isSinglePDF, singlePreviewUrl, () =>
                handleRemoveFile(0),
              )}
              <input
                type="file"
                accept="image/*,application/pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleAddFiles}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mt-2">
          {/* Show existing multi documents when no new files are uploaded */}
          {existingMultiDocuments && files.length === 0 && (
            existingMultiDocuments.map((doc, index) => {
              const isPDF = doc.fileType?.includes("pdf");
              return (
                <div key={`existing-${index}`} className="relative w-40 h-40">
                  <div className="relative w-full h-full border rounded bg-gray-50 flex items-center justify-center group">
                    {isPDF ? (
                      <a
                        href={doc.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center w-full h-full"
                      >
                        <AiFillFilePdf size={60} className="text-red-500" />
                        <span className="text-xs text-gray-600 mt-1 truncate px-2 w-full text-center">
                          {doc.fileName || `Document ${index + 1}`}
                        </span>
                      </a>
                    ) : (
                      <img
                        src={doc.path}
                        alt={`Existing Document ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                  </div>
                </div>
              );
            })
          )}

          <label className="w-40 h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
            <AiOutlineUpload size={40} className="text-gray-400" />
            <span className="mt-2 text-sm text-gray-600">Click to upload</span>
            <input
              type="file"
              accept="image/*,application/pdf"
              multiple
              className="hidden"
              onChange={handleAddFiles}
            />
          </label>

          {files.map((file, index) => {
            const isPDF = file.type === "application/pdf";
            const previewUrl = !isPDF ? URL.createObjectURL(file) : "";
            return (
              <div key={index} className="relative w-40 h-40">
                {renderPreview(
                  isPDF,
                  previewUrl,
                  () => handleRemoveFile(index),
                  file.name,
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
