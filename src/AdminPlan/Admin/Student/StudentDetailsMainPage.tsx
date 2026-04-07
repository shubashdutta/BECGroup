"use client";
import React, { useState } from "react";
import EmpolyeeNavTab from "@/src/Common/EmpolyeeNavTab";
import { FaCcVisa, FaRegUser } from "react-icons/fa";
import { MdOutlineInsertPageBreak } from "react-icons/md";
import StudentDetailsPage from "./StudentDetails";
import OfferLatter from "./OfferLatter/OfferLatter";
import AfterVisaPage from "./afterVisa/AfterVisaPage";

const StudentDetailsMainPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icons: <FaRegUser />,
      content: <StudentDetailsPage />,
    },
    {
      id: "offerLatter",
      label: "Offer_Latter",
      icons: <MdOutlineInsertPageBreak />,
      content: <OfferLatter />,
    },
    {
      id: "afterVisa",
      label: "After_Visa",
      icons: <FaCcVisa />,
      content: <AfterVisaPage />,
    },
  ];

  return (
    <EmpolyeeNavTab
      tabs={tabs}
      defaultActiveTab="profile"
      onTabChange={setActiveTab}
    />
  );
};

export default StudentDetailsMainPage;
