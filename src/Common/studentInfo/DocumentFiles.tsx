import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { useState, useRef, DragEvent, useEffect } from "react";
import { Form } from "react-bootstrap";
import { AiOutlineUpload } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

export interface UploadedFile {
  file: File;
  preview: string;
}

interface DocumentFilesProps {
  uploadedFiles: { [key: string]: UploadedFile[] };
  setUploadedFiles: React.Dispatch<
    React.SetStateAction<{ [key: string]: UploadedFile[] }>
  >;
  onCloseModal?: () => void;
}

const documents = [
  {
    id: "Passport",
    title: "Passport",
    sub: "Fills 6/6 fields of Work Experience Details",
  },
  {
    id: "Grade10",
    title: "Grade 10th or equivalent Marksheet",
    sub: "Fills 10/48 fields of Academic qualifications",
  },
  {
    id: "Grade12",
    title: "Grade 12th or equivalent Marksheet",
    sub: "Fills 10/48 fields of Academic qualifications",
  },
  {
    id: "Undergraduate",
    title: "Undergraduate Marksheet",
    sub: "Fills 10/48 fields of Academic qualifications",
  },
  {
    id: "Postgraduate",
    title: "Postgraduate Marksheet",
    sub: "Fills 10/48 fields of Academic qualifications",
  },
  {
    id: "Resume",
    title: "Resume",
    sub: "Fills 6/6 fields of Work Experience Details",
  },
];

const DocumentFiles: React.FC<DocumentFilesProps> = ({
  uploadedFiles,
  setUploadedFiles,
}) => {
  const [activeDoc, setActiveDoc] = useState<string>("Passport");
  const [dragging, setDragging] = useState(false);
  const { closeModal } = useModal();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Local state for instant preview
  const [uploadedFilesLocal, setUploadedFilesLocal] = useState<{
    [key: string]: UploadedFile[];
  }>({});

  // Initialize local state from parent
  useEffect(() => {
    setUploadedFilesLocal(uploadedFiles);
  }, [uploadedFiles]);

  const handleFile = (file: File) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return alert("Maximum 5 MB allowed!");
    if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type))
      return alert("Invalid file type! Only JPG, PNG, PDF allowed.");

    const preview = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : "";

    setUploadedFilesLocal((prev) => {
      const existingFiles = prev[activeDoc] || [];
      if (existingFiles.length >= 7) {
        alert("Maximum 7 files per document allowed.");
        return prev;
      }
      return { ...prev, [activeDoc]: [...existingFiles, { file, preview }] };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleFile(e.target.files[0]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFilesLocal((prev) => {
      const files = prev[activeDoc]?.filter((_, i) => i !== index) || [];
      return { ...prev, [activeDoc]: files };
    });
  };

  const handleSave = () => {
    setUploadedFiles(uploadedFilesLocal);
    if (closeModal) closeModal();
  };

  return (
    <div>
      <div className="p-2 max-h-[450px] overflow-y-auto">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5 border rounded-lg p-3 space-y-2 overflow-y-auto">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setActiveDoc(doc.id)}
                className={`relative p-3 rounded-lg border cursor-pointer
                ${
                  activeDoc === doc.id
                    ? "border-blue-500 ring-1 ring-blue-500"
                    : "border-gray-200"
                }
                hover:border-blue-400`}
              >
                {activeDoc === doc.id && (
                  <div
                    className="absolute top-1/2 -right-3 -translate-y-1/2
                  w-0 h-0 border-t-8 border-b-8 border-l-8
                  border-t-transparent border-b-transparent border-l-blue-500"
                  />
                )}

                <div className="font-medium">{doc.title}</div>
                {doc.sub && (
                  <div className="text-sm text-gray-500 mt-1">{doc.sub}</div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT PANEL */}
          <div className="col-span-7 border rounded-lg p-3 flex flex-col">
            <Form.Label className="mb-3 font-medium">
              Upload Document
            </Form.Label>

            <div
              className={`flex-1 border-2 border-dashed rounded-lg
              flex flex-col items-center justify-center text-center gap-3 p-5
              ${dragging ? "border-blue-600 bg-blue-50" : "border-blue-400"}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
              />

              <AiOutlineUpload className="text-5xl cursor-pointer text-blue-500" />
              <p className="text-sm text-gray-500">
                Click or Drag & Drop a file here
              </p>

              {uploadedFilesLocal[activeDoc]?.map((item, i) => (
                <div
                  key={i}
                  className="mt-3 w-full flex items-center justify-center border rounded-lg p-2 relative bg-gray-50 shadow"
                >
                  {item.file.type.startsWith("image/") && item.preview ? (
                    <img
                      src={item.preview}
                      alt={item.file.name}
                      className="w-32 h-20 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-32 h-20 flex items-center justify-center bg-gray-200 rounded-md text-xs text-center p-1">
                      <span>Preview not available</span>
                    </div>
                  )}

                  <div
                    className=" cursor-pointer"
                    onClick={() => handleRemoveFile(i)}
                    title="Remove"
                  >
                    <TiDelete className="" color="red" fontSize={22} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 text-sm text-gray-600">
              <p className="font-medium text-blue-600 mb-2">Instructions:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Upload the complete marksheet with all pages</li>
                <li>Maximum 2 uploads per document</li>
                <li>Supported formats: JPG, PNG, PDF</li>
                <li>Maximum size: 5 MB</li>
                <li>One file at a time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-2xl rounded p-3 bg-[#f0f0f0] flex justify-end">
        <button
          className="cursor-pointer bg-blue-900 px-5 py-3 text-white rounded"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default DocumentFiles;
