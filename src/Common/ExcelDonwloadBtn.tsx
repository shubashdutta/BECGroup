import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { FcDownload } from "react-icons/fc";
import { IoCloudDownloadOutline } from "react-icons/io5";

interface ExcelProps {
  fun?: () => void;
  label?: string;
}

const ExcelDonwloadBtn: FC<ExcelProps> = ({ fun, label }) => {
  return (
    <div className=" flex justify-between ">
      <button
        className=" bg-blue-600 text-white p-3 rounded cursor-pointer"
        type="button"
        title="Download_Excel"
        onClick={fun}
      >
        <span>
          <IoCloudDownloadOutline className=" text-md" />
        </span>
        {label}
      </button>
    </div>
  );
};

export default ExcelDonwloadBtn;
