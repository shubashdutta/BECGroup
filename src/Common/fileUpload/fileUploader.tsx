/* eslint-disable @typescript-eslint/no-explicit-any */
import { TiDelete } from "react-icons/ti";
import { Spinner } from "react-bootstrap";
import { IoCloudUploadOutline } from "react-icons/io5";
import type { ChangeEvent, FC } from "react";
// import { IMAGE_CONSTANT } from "../../constant/imageConstant";

interface IFileUploader {
  handleFilesChange: (e: ChangeEvent<HTMLInputElement>) => void;
  loading: any;
  files: any;
  uploadType?: any;
  accept: any;
  multiple?: any;
  removeFiles?: any;
}

export const FileUploader: FC<IFileUploader> = ({
  handleFilesChange,
  loading,
  files,
  uploadType,
  accept,
  multiple = false,
  removeFiles,
}: IFileUploader) => {
  const inputId = `fileInput-${uploadType}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  return (
    <div className="files-wrapper my-3">
      <div
        className="wrapper flex-column p-3 mt-3 ml-2"
        style={{ textAlign: "start" }}
      >
        <i className="ml-3 text-muted">NOTE:</i>
        <i className="ml-3 text-muted break line-clamp-1">
          {accept} file types are supported
        </i>

        <div className="form-row mt-3">
          <div
            className={`col-md-4 p-3 wrapper  flex justify-center  flex-col items-center ${
              uploadType === "SINGLE" && files?.length === 1
                ? "disabled-div"
                : ""
            }`}
          >
            <label
              htmlFor={inputId}
              className={`mr-2 custom-upload-button ${
                uploadType === "SINGLE" && files?.length === 1
                  ? "disabled-div"
                  : ""
              }`}
            >
              <div
                className={`${
                  uploadType === "SINGLE" && files?.length === 1
                    ? "disabled-div"
                    : ""
                }`}
              >
                <IoCloudUploadOutline className="text-default" fontSize={22} />
                <span className=" ">Upload File</span>
              </div>
            </label>
            <input
              id={inputId}
              type="file"
              className="text-gray-500  text-center flex justify-center align-center "
              multiple={multiple}
              accept={accept}
              onChange={handleFilesChange}
            />
          </div>

          {files?.length > 0 && (
            <div
              className="col-12 max-h-45 overflow-y-auto p-4 mt-3 wrapper  flex  justify-center items-center"
              style={{ flexWrap: "wrap" }}
            >
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                files?.map((file: any, index: number) => (
                  <div
                    key={index}
                    className="mr-3 mt-2 justify-content-between"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* PDF preview */}
                    {file?.fileType === "application/pdf" ? (
                      <div
                        className="flex flex-col items-center justify-center p-2 bg-gray-100 rounded"
                        style={{ width: "100px", height: "100px" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-8 h-8 text-red-500"
                        >
                          <path d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM14 3.5V9h5.5L14 3.5zM8 13h8v1H8v-1zm0 3h8v1H8v-1z" />
                        </svg>
                        <span className="text-xs truncate mt-1 text-center">
                          {file.fileName}
                        </span>
                      </div>
                    ) : ["video/mp4", "video/mkv", "video/avi"].includes(
                        file?.fileType,
                      ) ? (
                      <video height={120} controls>
                        <source src={file?.encodedData} />
                      </video>
                    ) : ["audio/mpeg", "audio/mp3", "audio/m4a"].includes(
                        file?.fileType,
                      ) ? (
                      <audio controls src={file?.encodedData} />
                    ) : ["text/csv", "application/vnd.ms-excel"].includes(
                        file?.fileType,
                      ) ? (
                      <div
                        style={{
                          width: "250px",
                          maxHeight: "120px",
                          overflow: "auto",
                          background: "#f1f1f1",
                          padding: "8px",
                          fontSize: "12px",
                          borderRadius: "6px",
                        }}
                      >
                        {(file?.encodedData as string)
                          .split("\n")
                          .slice(0, 5)
                          .join("\n")}
                      </div>
                    ) : (
                      <img
                        loading="lazy"
                        src={file?.encodedData}
                        alt="Preview"
                        style={{ height: "100px" }}
                      />
                    )}

                    {/* Remove button */}
                    <div
                      className=" cursor-pointer"
                      onClick={() => removeFiles(index)}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Remove"
                    >
                      <TiDelete color="red" fontSize={22} />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .custom-upload-button {
            border-radius: 5px;
            cursor: pointer;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};
