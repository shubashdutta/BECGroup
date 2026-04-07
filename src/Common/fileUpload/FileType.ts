// export const FILE_TYPE = {
//   PDF: "application/pdf",
//   VIDEO: "video/mp4, video/x-matroska, video/x-msvideo",
//   AUDIO: "audio/mpeg, audio/m4a, audio/mp3",
//   PHOTO: "image/webp, image/png, image/gif, image/jpg, image/jpeg",
//   EXCEL: "text/csv",
//   DEFAULT:
//     "application/pdf, text/plain, image/webp, image/png, image/gif, image/jpg, image/jpeg",

//   PHOTO_VIDEO:
//     "image/webp, image/png, image/gif, image/jpg, image/jpeg, video/mp4, video/mkv, video/avi",
//   AUDIO_PHOTO_VIDEO:
//     "image/webp, image/png, image/gif, image/jpg, image/jpeg, video/mp4, video/mkv, video/avi, audio/mpeg, audio/m4a, audio/mp3",
//   AUDIO_PHOTO_VIDEO_FILE:
//     "application/pdf, text/plain, image/webp, image/png, image/gif, image/jpg, image/jpeg, video/mp4, video/mkv, video/avi, audio/mpeg, audio/m4a, audio/mp3",
// };

export const FILE_TYPE: Record<string, string[]> = {
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
export const FILE_MANAGER_FILE_TYPE =
  "video/mp4, video/mkv, video/avi, audio/mpeg, audio/m4a, audio/mp3, image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp";
