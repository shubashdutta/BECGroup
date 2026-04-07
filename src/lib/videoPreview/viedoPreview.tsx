"use client";

import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { FC } from "react";

interface VideoProps {
  file?: any;
}

const VideoPreview: FC<VideoProps> = ({ file }) => {
  const { closeModal, openModal } = useModal();

  const html = (
    <div className=" ">
      <div className=" max-h-96 overflow-y-auto wrapper ">
        <video src={file?.file?.path} autoPlay controls />
      </div>
      <div className=" flex justify-end">
        <button
          className=" cursor-pointer flex justify-end bg-rose-500 rounded text-white mt-4  px-3 py-2"
          onClick={closeModal}
        >
          close
        </button>
      </div>
    </div>
  );

  const handleClick = () => openModal("Video Preview", html, "md");

  return (
    <td
      onClick={handleClick}
      className=" cursor-pointer flex justify-center items-center"
    >
      <video src={file?.file?.path} className=" h-10 w-10" />
    </td>
  );
};

export default VideoPreview;
