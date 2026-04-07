//
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import Image from "next/image";
import React, { FC } from "react";

interface ImagePreviewProps {
  File?: any;
  isDonwload?: boolean;
  print?: boolean;
}

const ImagePreview: FC<ImagePreviewProps> = ({
  File,
  print = false,
  isDonwload = false,
}) => {
  const { closeModal, openModal } = useModal();

  // Determine the main file object
  const fileObj = Array.isArray(File)
    ? File[0]
    : File?.files?.[0] || File?.file || File;
  const filePath = fileObj?.path;
  const fileType = fileObj?.fileType;
  const fileName = fileObj?.fileName || "file";

  // Modal content with Download button
  const html = (
    <div className="">
      <div className="max-h-96 overflow-y-auto wrapper flex justify-center items-center">
        {fileType === "application/pdf" ? (
          <iframe
            src={filePath}
            style={{ width: "100%", height: "500px", border: "none" }}
            title="PDF Preview"
          />
        ) : (
          <Image
            alt="Preview"
            src={filePath}
            width={500}
            height={300}
            unoptimized
            loading="lazy"
          />
        )}
      </div>

      <div className="flex justify-between mt-4">
        {/* Close button */}
        <button
          className="cursor-pointer bg-rose-500 rounded text-white px-3 py-2"
          onClick={closeModal}
        >
          Close
        </button>

        {/* Download button */}

        <div className=" flex justify-end gap-3">
          {print && (
            <button
              type="button"
              onClick={() => window.open(filePath, "_blank")}
              className="cursor-pointer bg-blue-500 rounded text-white px-3 py-2 hover:bg-blue-600"
            >
              Print PDF
            </button>
          )}

          {isDonwload && (
            <a
              href={filePath}
              download={fileName}
              target="_blank"
              className="cursor-pointer bg-green-500 rounded text-white px-3 py-2"
            >
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  );

  // Open modal
  const handleClick = () => openModal("Preview", html, "md");

  // Table cell preview: show PDF icon or image thumbnail
  return (
    <td
      onClick={handleClick}
      className="cursor-pointer border-none flex justify-center items-center"
    >
      {fileType === "application/pdf" ? (
        <div
          className="flex flex-col items-center justify-center p-2 bg-gray-100 rounded"
          style={{ width: 50, height: 50 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6 text-red-500"
          >
            <path d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM14 3.5V9h5.5L14 3.5zM8 13h8v1H8v-1zm0 3h8v1H8v-1z" />
          </svg>
        </div>
      ) : (
        <Image
          alt="Preview"
          src={filePath}
          width={50}
          height={50}
          loading="lazy"
        />
      )}
    </td>
  );
};

export default ImagePreview;
