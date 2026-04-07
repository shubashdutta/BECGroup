"use client";
import EmpolyeeNavTab from "@/src/Common/EmpolyeeNavTab";
import React from "react";
import HostelStudent from "./page";
import HostelPaymentAll from "./HostelPaymentAll";

const MainPageHostelPage = () => {
  const tabs = [
    { id: "all", label: "All", content: <HostelStudent /> },
    { id: "month", label: "Month's", content: <HostelPaymentAll /> },
  ];
  return <EmpolyeeNavTab tabs={tabs} />;
};

export default MainPageHostelPage;
