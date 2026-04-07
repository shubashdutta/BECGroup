import React, { useState } from "react";

type ImageType = {
  id: number;
  path?: string;
  fileName?: string;
  uniqueName?: string;
  fileType?: string;
  file?: {
    id: number;
    path: string;
    fileName: string;
    uniqueName: string;
    fileType: string;
  };
};

type Props = {
  images: ImageType[];
};

const StudentDocumentPreview: React.FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // 👉 current file
  const currentFile = images[currentIndex];

  // 👉 detect pdf - handle both direct and nested file structures
  const isPdf =
    currentFile?.fileType === "application/pdf" ||
    currentFile?.file?.fileType === "application/pdf" ||
    currentFile?.path?.toLowerCase().endsWith(".pdf") ||
    currentFile?.file?.path?.toLowerCase().endsWith(".pdf");

  // 👉 get the correct path - handle both direct and nested file structures
  const getImagePath = () => {
    if (currentFile?.path) {
      return currentFile.path;
    }
    if (currentFile?.file?.path) {
      return currentFile.file.path;
    }
    return "";
  };

  return (
    <div className="w-full">
      <div className="max-h-96 overflow-y-auto flex justify-center">
        {isPdf ? (
          // ✅ PDF Preview
          <iframe
            src={getImagePath()}
            width="100%"
            height="500px"
            className="border rounded"
          />
        ) : (
          // ✅ Image Preview
          <img
            src={getImagePath()}
            alt="preview"
            className="w-full h-auto"
            loading="lazy"
          />
        )}
      </div>

      <div className="flex justify-between mt-2 shadow p-3">
        <button
          className="bg-gray-200 px-3 py-1 rounded cursor-pointer"
          onClick={prevImage}
        >
          Prev
        </button>

        <button
          className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
          onClick={nextImage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentDocumentPreview;
