import EmpolyeeNavTab from "@/src/Common/EmpolyeeNavTab";
import React, { FC, useEffect } from "react";
import { FaCcVisa, FaFlag, FaRegUser } from "react-icons/fa";
import UkPaymentForm from "./UkPaymentForm";
import EuropeUniversityPayment from "./EuropeUniversityPayment";
import { apiRequest } from "@/src/lib/axiosSetup";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";

type OfferLetterProps = {
  offerId: {
    id: number;
    country: string;
    [key: string]: any;
  };
};

const UniversityPaymentPage: FC<OfferLetterProps> = ({ offerId }) => {
  const tabs = [];

  if (offerId?.country === "United Kingdom") {
    tabs.push({
      id: "uk",
      label: "UK",
      icons: <FaFlag title="UK" />,
      content: <UkPaymentForm id={offerId.id} />,
    });
  }
  if (offerId.country !== "United Kingdom") {
    tabs.push({
      id: "other",
      label: "Other Country",
      icons: <FaFlag title="EU" />,
      content: <EuropeUniversityPayment id={offerId.id} />,
    });
  }

  return (
    <EmpolyeeNavTab
      tabs={tabs}
      defaultActiveTab={offerId?.country === "United Kingdom" ? "uk" : "other"}
    />
  );
};

export default UniversityPaymentPage;
