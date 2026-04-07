"use client";

import Image from "next/image";
import React, { FC } from "react";

import bgImage from "@/asstest/Image/Logo.png";

interface BackGroundTemplateProps {
  children?: React.ReactNode;
}

const BackGroundTemplate: FC<BackGroundTemplateProps> = ({ children }) => {
  return (
    <div className="relative px-5 w-full  overflow-hidden ">
      <Image
        src={bgImage}
        alt="bg-img"
        width={300}
        height={300}
        className="absolute inset-0 m-auto   pointer-events-none select-none"
      />

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackGroundTemplate;
