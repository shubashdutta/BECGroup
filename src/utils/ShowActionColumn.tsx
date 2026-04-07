"use client";

import React, { FC, ReactNode } from "react";

interface ShowActionColumnProps {
  header: string[];
  children: ReactNode;
}

const ShowActionColumn: FC<ShowActionColumnProps> = ({ header, children }) => {
  const show = header.some((h) => h.toLowerCase() === "action");

  if (!show) return null;

  return <td>{children}</td>;
};

export default ShowActionColumn;
