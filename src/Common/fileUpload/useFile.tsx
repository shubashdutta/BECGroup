import { useState, type ChangeEvent } from "react";

export const fileTypes: Record<string, string[]> = {
  PDF: ["application/pdf"],
  VIDEO: ["video/mp4", "video/mkv", "video/avi"],
  AUDIO: ["audio/mpeg", "audio/m4a", "audio/mp3"],
  PHOTO: ["image/webp", "image/png", "image/gif", "image/jpg", "image/jpeg"],

  PDF_PHOTO: [
    "application/pdf",
    "image/webp",
    "image/png",
    "image/gif",
    "image/jpg",
    "image/jpeg",
  ],

  DEFAULT: [
    "application/pdf",
    "text/plain",
    "image/webp",
    "text/csv",
    "image/png",
    "image/gif",
    "image/jpg",
    "image/jpeg",
  ],

  PHOTO_VIDEO: [
    "image/webp",
    "image/png",
    "image/gif",
    "image/jpg",
    "image/jpeg",
    "video/mp4",
    "video/mkv",
    "video/avi",
  ],
  AUDIO_PHOTO_VIDEO: [
    "image/webp",
    "image/png",
    "image/gif",
    "text/csv",
    "image/jpg",
    "image/jpeg",
    "video/mp4",
    "video/mkv",
    "video/avi",
    "audio/mpeg",
    "audio/m4a",
    "audio/mp3",
  ],
  CSV: ["text/csv", "application/vnd.ms-excel"],

  AUDIO_PHOTO_VIDEO_FILE: [
    "application/pdf",
    "text/plain",
    "image/webp",
    "image/png",
    "image/gif",
    "image/jpg",
    "image/jpeg",
    "video/mp4",
    "video/mkv",
    "video/avi",
    "audio/mpeg",
    "audio/m4a",
    "audio/mp3",
  ],
};

const fileName: Record<string, string> = {
  VIDEO: "MP4, MKV, AVI",
  PHOTO: "WEBP, PNG, GIF, JPG or JPEG",
  PDF: "PDF file",
  PDF_PHOTO: "PDF, WEBP, PNG, GIF, JPG or JPEG",
  AUDIO: "audio/mpeg, audio/mp3, audio/m4a",
  DEFAULT: "PDF, WEBP, PNG, GIF, JPG,TXT or JPEG",
  PHOTO_VIDEO: "WEBP, PNG, GIF, JPG or JPEG, MP4, MKV, AVI",
  AUDIO_PHOTO_VIDEO:
    "WEBP, PNG, GIF, JPG or JPEG, MP4, MKV, AVI, audio/mpeg, audio/mp3, audio/m4a",
  AUDIO_PHOTO_VIDEO_FILE:
    "PDF, TXT, WEBP, PNG, GIF, JPG or JPEG, MP4, MKV, AVI, audio/mpeg, audio/mp3, audio/m4a",
  CSV: "CSV file",
};

type FilePreview = {
  fileName: string;
  encodedData: string | ArrayBuffer | null;
  fileType: string;
  rest: File;
};

export const useFileInput = (
  initialValue: FilePreview[] | null = null,
  fileType: keyof typeof fileTypes = "DEFAULT",
) => {
  const [files, setFiles] = useState<FilePreview[] | null>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);

  const fileName: Record<string, string> = {
    VIDEO: "MP4, MKV, AVI",
    PHOTO: "WEBP, PNG, GIF, JPG or JPEG",
    AUDIO: "audio/mpeg, audio/mp3, audio/m4a",

    DEFAULT: "PDF, WEBP, PNG, GIF, JPG,TXT or JPEG",

    PHOTO_VIDEO: "WEBP, PNG, GIF, JPG or JPEG, MP4, MKV, AVI",
    AUDIO_PHOTO_VIDEO:
      "WEBP, PNG, GIF, JPG or JPEG, MP4, MKV, AVI, audio/mpeg, audio/mp3, audio/m4a",
    AUDIO_PHOTO_VIDEO_FILE:
      "PDF, TXT, WEBP, PNG, GIF, JPG or JPEG, MP4, MKV, AVI, audio/mpeg, audio/mp3, audio/m4a",
    CSV: "CSV file",
  };

  const validFileTypes = fileTypes[fileType] || [];
  const validFileNames = fileName[fileType] || "file";

  const handleFilesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const previewFiles = e?.target?.files;
    if (!previewFiles || previewFiles.length === 0) return;

    setLoading(true);

    const validFileTypePromises = Array.from(previewFiles).map((file) => {
      return new Promise<FilePreview | null>((resolve, reject) => {
        if (!validFileTypes.includes(file?.type)) {
          console.log({
            message: `File type not supported. Please upload a ${validFileNames} file.`,
          });
          resolve(null);
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            fileName: file?.name,
            encodedData: reader?.result,
            fileType: file?.type,
            rest: file,
          });
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    try {
      const newTempPreview = await Promise.all(validFileTypePromises);
      const filteredPreviews = newTempPreview.filter(
        (preview) => preview !== null,
      ) as FilePreview[];

      if (filteredPreviews.length > 0) {
        setFiles((prevTempPreview: FilePreview[] | null) => {
          const updatedPreview = Array.isArray(prevTempPreview)
            ? [...prevTempPreview]
            : [];
          return [...updatedPreview, ...filteredPreviews];
        });
      }
    } catch (error) {
      console.error("Error reading files:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (index: number) => {
    if (!files) return;
    const tempPreview = [...files];
    tempPreview.splice(index, 1);
    setFiles(tempPreview);
  };

  return [files, handleFilesChange, removeFile, setFiles, loading] as const;
};
