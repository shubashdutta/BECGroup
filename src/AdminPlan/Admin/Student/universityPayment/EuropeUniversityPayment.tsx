"use client";

import TextInput from "@/src/Common/TextInput";
import { FORM_TYPE } from "@/src/utils/InputType";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { PaymentFileUpload } from "./PaymentFileUpload";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { apiRequest } from "@/src/lib/axiosSetup";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import { useDrawer } from "@/src/utils/Modal/DrawerModalProvider";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { toNumber } from "@/src/utils/toNumber";

interface EuropeProps {
  id: number;
}

interface BackendDocument {
  id: number;
  path: string;
  fileName: string;
  uniqueName: string;
  fileType: string;
}

interface DocumentFields {
  [key: string]: BackendDocument | File;
}

interface OtherPaymentData {
  id: number;
  admissionFee: string;
  applicationFee: string;
  bankBalanceShow: string;
  documentationCharge: string;
  hotelBookingCharge: string;
  insurance: string;
  paymentSlip: string;
  securityDeposit: string;
  ticket: string;
  vfsDateBook: string;
  documents?: DocumentFields;
  countryName: string;
  totalCollegeFee: string;
  firstinstallment: string;
  secondInstallment: string;
  thirdinstallment: string;
}

const fileFields = [
  { name: "INTERVIEW_RESULT", label: "InterView_Result" },
  { name: "unconditional_Letter", label: "Unconditional Letter" },
  { name: "ADMISSION_FEE", label: "Admission Fee" },
  { name: "APPLICATION_FEE", label: "Application Fee" },
  { name: "PAYMENT_SLIP", label: "Payment Slip" },
  {
    name: "COLLEGE_FEE_FIRST_INSTALLMENT",
    label: "College Fee - First Installment",
  },
  {
    name: "COLLEGE_FEE_SECOND_INSTALLMENT",
    label: "College Fee - Second Installment",
  },
  {
    name: "COLLEGE_FEE_THIRD_INSTALLMENT",
    label: "College Fee - Third Installment",
  },
  { name: "SECURITY_DEPOSIT", label: "Security Deposit" },
  { name: "DOCUMENTATION_CHARGE", label: "Documentation Charge" },
  { name: "VFS_DATE_BOOK", label: "VFS Booking / Date Confirmation" },
  { name: "VFS_SLIP", label: "VFS Slip / Receipt" },
  { name: "INSURANCE", label: "Insurance" },
  { name: "TICKET", label: "Ticket" },
  { name: "BANK_BALANCE_SHOW", label: "Bank Balance Show" },
  { name: "HOTEL_BOOKING_CHARGE", label: "Hotel Booking Charge" },
  {
    name: "OFFER_LETTER",
    label: "Offer Letter / College Letter",
    multiple: true,
  },
  {
    name: "other",
    label: "Other Document",
    multiple: true,
  },
] as const;

type DocumentFieldKeys = (typeof fileFields)[number]["name"];

type OtherPayment = {
  id: number;
  admissionFee: string;
  applicationFee: string;
  bankBalanceShow: string;
  documentationCharge: string;
  hotelBookingCharge: string;
  insurance: string;
  paymentSlip: string;
  securityDeposit: string;
  ticket: string;
  vfsDateBook: string;
  documents?: DocumentFields;
  countryName: string;
  totalCollegeFee: string;
  firstInstallment: string;
  secondInstallment: string;
  thirdinstallment: string;
};

const EuropeUniversityPayment: FC<EuropeProps> = ({ id }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      country: "OTHER",
      ukPayment: null,
      otherPayment: {
        countryName: "",
        totalCollegeFee: "",
        firstinstallment: "",
        secondInstallment: "",
        thirdinstallment: "",
        admissionFee: "",
        applicationFee: "",
        securityDeposit: "",
        paymentSlip: "",
        documentationCharge: "",
        vfsDateBook: "",
        insurance: "",
        ticket: "",
        bankBalanceShow: "",
        hotelBookingCharge: "",
        VFS_Slip_Amount: "",
      },
      offerLetterId: id,
    },
  });

  const [europeData, setEuropeData] = useState<OtherPayment>();
  const [previews, setPreviews] = useState<
    Partial<Record<DocumentFieldKeys, string | null>>
  >({});

  const { closeDrawer } = useDrawer();

  // Fetch data from backend
  const handleGet = async () => {
    try {
      const params = {
        statusIn: "ACTIVE",
        page: 0,
        size: 10,
        offerLetterId: id,
      };
      const res: any = await apiRequest.get("api/offer-letter/payment/all", {
        params,
      });
      const item = res?.data?.find((v: any) => v?.otherPayment)?.otherPayment;
      if (!item) {
        return;
      }
      // Find the full item in res.data that has otherPayment
      const fullItem = res?.data?.find((v: any) => v?.otherPayment);
      if (!fullItem) return;

      const { otherPayment, documents } = fullItem;

      const mergedData: OtherPayment = {
        ...europeData,
        ...otherPayment,
        id: fullItem.id,
        documents: documents || {},
      };

      // Set state
      setEuropeData(mergedData);
    } catch (error) {
      errorMessage(error);
    }
  };

  useEffect(() => {
    if (id) handleGet();
  }, [id]);

  // Set form values from europeData
  useEffect(() => {
    if (!europeData) return;

    const payment = europeData;
    setValue("otherPayment.countryName", payment?.countryName);
    setValue("otherPayment.totalCollegeFee", payment.totalCollegeFee);
    setValue("otherPayment.firstinstallment", payment?.firstInstallment);
    (setValue("otherPayment.secondInstallment", payment.secondInstallment),
      setValue("otherPayment.thirdinstallment", payment.thirdinstallment));
    setValue("otherPayment.admissionFee", payment.admissionFee);
    setValue("otherPayment.applicationFee", payment.applicationFee);
    setValue("otherPayment.bankBalanceShow", payment.bankBalanceShow);
    setValue("otherPayment.documentationCharge", payment.documentationCharge);
    setValue("otherPayment.hotelBookingCharge", payment.hotelBookingCharge);
    setValue("otherPayment.insurance", payment.insurance);
    setValue("otherPayment.paymentSlip", payment.paymentSlip);
    setValue("otherPayment.securityDeposit", payment.securityDeposit);
    setValue("otherPayment.ticket", payment.ticket);
    setValue("otherPayment.vfsDateBook", payment.vfsDateBook);
  }, [europeData, setValue]);

  // Populate file previews from backend
  useEffect(() => {
    if (!europeData?.documents) return;

    const initialPreviews: Partial<Record<DocumentFieldKeys, string | null>> =
      {};
    fileFields.forEach((field) => {
      // Check for both camelCase and snake_case variations
      const camelCaseKey = field.name.toLowerCase().replace(/_/g, "");
      const snakeCaseKey = field.name;

      let fileObj = null;

      // Try exact match first
      if (europeData.documents?.[snakeCaseKey]) {
        fileObj = europeData.documents[snakeCaseKey];
      }
      // Then try camelCase match
      else if (europeData.documents?.[camelCaseKey]) {
        fileObj = europeData.documents[camelCaseKey];
      }
      // Then try to find by any key that contains the field name
      else {
        const foundKey = Object.keys(europeData.documents || {}).find(
          (key) =>
            key.toLowerCase().includes(field.name.toLowerCase()) ||
            field.name.toLowerCase().includes(key.toLowerCase()),
        );
        if (foundKey && europeData.documents) {
          fileObj = europeData.documents[foundKey];
        }
      }

      if (fileObj && typeof fileObj === "object" && "path" in fileObj) {
        initialPreviews[field.name] = fileObj.path;
      }
    });
    setPreviews(initialPreviews);
  }, [europeData]);

  const [filesByField, setFilesByField] = useState<Record<string, File[]>>({});

  const handleFileChange = (field: string, files: File[]) => {
    setFilesByField((prev) => ({ ...prev, [field]: files }));
  };

  const handleEurope = async (data: any) => {
    const payload = {
      ukPayment: null,
      otherPayment: {
        countryName: data?.otherPayment?.countryName,
        totalCollegeFee: toNumber(data?.otherPayment?.totalCollegeFee || 0),
        firstInstallment: toNumber(data?.otherPayment?.firstinstallment || 0), // ← fix if you had firstinstallment
        secondInstallment: toNumber(data?.otherPayment?.secondInstallment || 0),
        thirdInstallment: toNumber(data?.otherPayment?.thirdInstallment || 0), // ← make sure this name matches server
        admissionFee: toNumber(data?.otherPayment?.admissionFee || 0),
        applicationFee: toNumber(data?.otherPayment?.applicationFee || 0), // ← confirm which one server wants
        // applicationSlip?:   data?.otherPayment?.applicationSlip || 0,      // ← add only if server really wants it
        paymentSlip: toNumber(data?.otherPayment?.paymentSlip || 0),
        securityDeposit: toNumber(data?.otherPayment?.securityDeposit || 0),
        documentationCharge: toNumber(
          data?.otherPayment?.documentationCharge || 0,
        ),
        vfsDateBook: toNumber(data?.otherPayment?.vfsDateBook || 0),
        insurance: toNumber(data?.otherPayment?.insurance || 0),
        ticket: toNumber(data?.otherPayment?.ticket || 0),
        bankBalanceShow: toNumber(data?.otherPayment?.bankBalanceShow || 0),
        hotelBookingCharge: toNumber(
          data?.otherPayment?.hotelBookingCharge || 0,
        ),
      },

      ...(!europeData && { country: "OTHER" }),
      ...(europeData ? { id: europeData?.id } : { offerLetterId: id }),
    };

    const formData = new FormData();
    formData.append("payment", JSON.stringify(payload));

    // Use filesByField instead of files
    fileFields.forEach((field) => {
      const fieldFiles = filesByField[field.name];
      if (fieldFiles && fieldFiles.length > 0) {
        fieldFiles.forEach((file) => {
          formData.append(field.name, file);
        });
      }
    });

    try {
      const res: any = europeData
        ? await apiRequest.post("api/offer-letter/payment/update", formData)
        : await apiRequest.post("api/offer-letter/payment/create", formData);
      successMessage({ message: res?.message });
      closeDrawer();
    } catch (error) {
      errorMessage({ error });
    }
  };

  return (
    <form className="wrapper" onSubmit={handleSubmit(handleEurope)}>
      <div className="text-center pb-2 text-xl font-bold text-blue-500 underline underline-offset-auto">
        Other Payment Form
      </div>

      <div className="grid grid-cols-3 gap-6 mb-4">
        <div className=" col-span-1">
          <TextInput
            errors={errors}
            label="country"
            name="otherPayment.countryName"
            register={register}
            type={FORM_TYPE.TEXT}
            required
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            errors={errors}
            label="Total Fee"
            name="otherPayment.totalCollegeFee"
            register={register}
            type={FORM_TYPE.NUMBER}
            min={0}
            required
            validation={{ required: ErrorMessage.TotalFee }}
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            errors={errors}
            label="Admission Fee"
            name="otherPayment.admissionFee"
            register={register}
            type={FORM_TYPE.NUMBER}
            required
          />
        </div>

        <TextInput
          errors={errors}
          label="Application Fee"
          name="otherPayment.applicationFee"
          register={register}
          type={FORM_TYPE.NUMBER}
        />

        <TextInput
          errors={errors}
          label="First Installment "
          name="otherPayment.firstinstallment"
          register={register}
          type={FORM_TYPE.NUMBER}
        />
        <TextInput
          errors={errors}
          label="Second Installment"
          name="otherPayment.secondInstallment"
          register={register}
          type={FORM_TYPE.NUMBER}
        />

        <TextInput
          errors={errors}
          label="Third installment"
          name="otherPayment.thirdinstallment"
          register={register}
          type={FORM_TYPE.NUMBER}
        />
        <TextInput
          errors={errors}
          label="Documentation Charge"
          name="otherPayment.documentationCharge"
          register={register}
          type={FORM_TYPE.NUMBER}
        />
        <TextInput
          errors={errors}
          label="Security Deposit"
          name="otherPayment.securityDeposit"
          register={register}
          type={FORM_TYPE.NUMBER}
        />
        <TextInput
          errors={errors}
          label="Bank Balance Show"
          name="otherPayment.bankBalanceShow"
          register={register}
          type={FORM_TYPE.NUMBER}
        />
        <TextInput
          errors={errors}
          label="VFS Date Booking"
          name="otherPayment.vfsDateBook"
          register={register}
          type={FORM_TYPE.NUMBER}
        />
        <TextInput
          errors={errors}
          label="Insurance"
          name="otherPayment.insurance"
          register={register}
          type={FORM_TYPE.NUMBER}
        />
        <TextInput
          errors={errors}
          label="Hotel Booking Charge"
          name="otherPayment.hotelBookingCharge"
          register={register}
          type={FORM_TYPE.NUMBER}
        />
        <TextInput
          errors={errors}
          label="Ticket"
          name="otherPayment.ticket"
          register={register}
          type={FORM_TYPE.NUMBER}
        />
        <TextInput
          errors={errors}
          label="Payment Slip"
          name="otherPayment.paymentSlip"
          register={register}
          type={FORM_TYPE.NUMBER}
        />

        {/* File Uploads */}
        <div className="col-span-3 text-center underline text-lg text-gray-600 mt-4 font-semibold">
          Upload Documents
        </div>
        {fileFields.map((field) => {
          // Find the existing document for this field
          const camelCaseKey = field.name.toLowerCase().replace(/_/g, "");
          const snakeCaseKey = field.name;

          let existingDocument = null;

          // Try exact match first
          if (europeData?.documents?.[snakeCaseKey]) {
            existingDocument = europeData.documents[snakeCaseKey];
          }
          // Then try camelCase match
          else if (europeData?.documents?.[camelCaseKey]) {
            existingDocument = europeData.documents[camelCaseKey];
          }
          // Then try to find by any key that contains the field name
          else {
            const foundKey = Object.keys(europeData?.documents || {}).find(
              (key) =>
                key.toLowerCase().includes(field.name.toLowerCase()) ||
                field.name.toLowerCase().includes(key.toLowerCase()),
            );
            if (foundKey && europeData?.documents) {
              existingDocument = europeData.documents[foundKey];
            }
          }

          return (
            <PaymentFileUpload
              key={field.name}
              fieldName={field.name}
              files={filesByField[field.name] || []}
              onFilesChange={(files) => handleFileChange(field.name, files)}
              label={field.label}
              existingDocument={
                existingDocument && "path" in existingDocument
                  ? {
                      path: existingDocument.path,
                      fileName: existingDocument.fileName,
                    }
                  : null
              }
            />
          );
        })}
      </div>

      <SubmitAndCancelBtn isSubmiting={isSubmitting} />
    </form>
  );
};

export default EuropeUniversityPayment;
