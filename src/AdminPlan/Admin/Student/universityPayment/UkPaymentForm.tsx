import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextInput from "@/src/Common/TextInput";
import { apiRequest } from "@/src/lib/axiosSetup";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useDrawer } from "@/src/utils/Modal/DrawerModalProvider";
import { PaymentFileUpload } from "./PaymentFileUpload";
import UkVAccountsRapter from "./UkVAccountsRapter";
import CasLattersRapter from "./CasLattersRapter";
import TitleImageRapter from "./TitleImageRapter";

// Types
interface OfferId {
  id: number;
}

interface DocumentFile {
  id: number;
  path: string;
  fileName?: string;
}

interface FileField {
  name: string;
  label: string;
  multiple?: boolean;
}

interface UkviAccount {
  accountId: string;
  password: string;
}

interface CasLetter {
  casId: string;
  password: string;
}

interface UkPaymentFormData {
  country: string;
  ukPayment: UkPaymentData;
  otherPayment: null;
  offerLetterId: number;
}

interface UkPaymentData {
  id?: number;
  documentationCharge: string;
  universityFirstInstallment: string;
  universitySecondInstallment: string;
  universityThirdInstallment: string;
  medicalFee: string;
  loanFee: string;
  insuranceFee: string;
  visaFee: string;
  dateBookFee: string;
  sopFee: string;
  ukviAccounts: UkviAccount[];
  casLetters: CasLetter[];
  UNIVERSITY_FIRST_INSTALLMENT?: DocumentFile | null;
  UNIVERSITY_SECOND_INSTALLMENT?: DocumentFile | null;
  [key: string]: any;
}

// Constants
const PAYMENT_FIELDS = [
  {
    name: "documentationCharge",
    label: "Documentation Charge",
    type: FORM_TYPE.NUMBER,
  },
  {
    name: "universityFirstInstallment",
    label: "First Installment",
    type: FORM_TYPE.NUMBER,
  },
  {
    name: "universitySecondInstallment",
    label: "Second Installment",
    type: FORM_TYPE.NUMBER,
  },
  {
    name: "universityThirdInstallment",
    label: "Third Installment",
    type: FORM_TYPE.NUMBER,
  },
  { name: "medicalFee", label: "Medical Fee", type: FORM_TYPE.NUMBER },
  { name: "loanFee", label: "Loan Fee", type: FORM_TYPE.NUMBER },
  { name: "insuranceFee", label: "Insurance Fee", type: FORM_TYPE.NUMBER },
  { name: "visaFee", label: "Visa Fee", type: FORM_TYPE.NUMBER },
  { name: "dateBookFee", label: "Date Book Fee", type: FORM_TYPE.NUMBER },
  { name: "sopFee", label: "SOP Fee", type: FORM_TYPE.NUMBER },
];

const REQUIRED_FILE_FIELDS: FileField[] = [
  { name: "INTERVIEW_RESULT", label: "Interview Result" },
  { name: "UNCONDITIONAL_LETTER", label: "Unconditional Offer Letter" },
  { name: "NOC", label: "NOC (No Objection Certificate)" },
  {
    name: "UNIVERSITY_FIRST_INSTALLMENT",
    label: "University First Installment",
  },
  {
    name: "UNIVERSITY_SECOND_INSTALLMENT",
    label: "University Second Installment",
  },
  {
    name: "UNIVERSITY_THIRD_INSTALLMENT",
    label: "University Third Installment",
  },
  { name: "MEDICAL_FEE", label: "Medical Fee" },
  { name: "LOAN_FEE", label: "Loan Fee" },
  { name: "UKVI_CHECK_LIST_I", label: "UKVI Check List I" },
  { name: "INSURANCE", label: "Insurance" },
  { name: "VISA_FEE", label: "Visa Fee" },
  { name: "UKVI_CHECK_LIST_II", label: "UKVI Check List II" },
  { name: "DATE_BOOK_FEE", label: "Date Book Fee" },
  { name: "SOP_FEE", label: "SOP Fee" },
  { name: "DOCUMENTATION_CHARGE", label: "Documentation Charge" },
  { name: "UKVI_APPLICATION_FORM", label: "UKVI Application Form" },
  { name: "UKVI_DECISION_LETTER", label: "UKVI Decision Letter" },
  { name: "OTHER", label: "Others", multiple: true },
];

const DEFAULT_UK_PAYMENT = PAYMENT_FIELDS.reduce(
  (acc, field) => {
    acc[field.name] = "";
    return acc;
  },
  {} as Record<string, string>,
);

const PAYMENT_TO_DOCUMENT_MAP: Record<string, string> = {
  documentationCharge: "DOCUMENTATION_CHARGE",
  universityFirstInstallment: "UNIVERSITY_FIRST_INSTALLMENT",
  universitySecondInstallment: "UNIVERSITY_SECOND_INSTALLMENT",
  universityThirdInstallment: "UNIVERSITY_THIRD_INSTALLMENT",
  medicalFee: "MEDICAL_FEE",
};

const UkPaymentForm: FC<OfferId> = ({ id }) => {
  const { closeDrawer } = useDrawer();

  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      country: "UK",
      ukPayment: {
        ...DEFAULT_UK_PAYMENT,
        ukviAccounts: [{ accountId: "", password: "" }],
        casLetters: [{ casId: "", password: "" }],
      },
      otherPayment: null,
      offerLetterId: id,
    },
  });

  const [ukFormData, setUkFormData] = useState<
    UkPaymentFormData["ukPayment"] | null
  >(null);
  const [filesByField, setFilesByField] = useState<Record<string, File[]>>({});
  const [existingDocuments, setExistingDocuments] = useState<
    Record<string, DocumentFile>
  >({});
  const [multiDocuments, setMultiDocuments] = useState<any[]>([]);
  const [initialUkviAccounts, setInitialUkviAccounts] = useState<any[]>([]);
  const [initialCasLetters, setInitialCasLetters] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchPaymentData = async () => {
      try {
        const res: any = await apiRequest.get("api/offer-letter/payment/all", {
          params: { statusIn: "ACTIVE", page: 0, size: 10, offerLetterId: id },
        });
        const item = res?.data?.find((v: any) => v?.ukPayment);
        if (!item) return;

        const ukPayment = item.ukPayment || {};
        const documents = item.documents || {};
        const multiDocs = item.multiDocuments?.OTHER || [];

        setExistingDocuments(documents);
        setMultiDocuments(multiDocs);
        setUkFormData({
          ...ukPayment,
          id: item.id,
          UNIVERSITY_FIRST_INSTALLMENT:
            documents.UNIVERSITY_FIRST_INSTALLMENT || null,
          UNIVERSITY_SECOND_INSTALLMENT:
            documents.UNIVERSITY_SECOND_INSTALLMENT || null,
        });
      } catch (error) {
        errorMessage(error);
      }
    };

    fetchPaymentData();
  }, [id]);

  useEffect(() => {
    if (ukFormData) {
      PAYMENT_FIELDS.forEach((field) => {
        const value = ukFormData[field.name];
        if (value !== undefined) {
          setValue(`ukPayment.${field.name}` as any, value);
        }
      });

      // Set ukviAccounts and casLetters if they exist
      if (ukFormData.ukviAccounts) {
        setValue("ukPayment.ukviAccounts", ukFormData.ukviAccounts);
        setInitialUkviAccounts(ukFormData.ukviAccounts);
      }
      if (ukFormData.casLetters) {
        setValue("ukPayment.casLetters", ukFormData.casLetters);
        setInitialCasLetters(ukFormData.casLetters);
      }
    }
  }, [ukFormData, setValue]);

  const handleFileChange = (field: string, files: File[]) => {
    setFilesByField((prev) => ({ ...prev, [field]: files }));
  };

  const validateDocuments = (data: any): string[] => {
    const missingDocuments: string[] = [];

    PAYMENT_FIELDS.forEach((field) => {
      const paymentValue = data.ukPayment[field.name];
      const numericValue = Number(paymentValue || 0);

      // Skip document validation for ukviAccounts and casLetters
      if (field.name === "ukviAccounts" || field.name === "casLetters") {
        return;
      }

      const documentKey = PAYMENT_TO_DOCUMENT_MAP[field.name] || field.name;
      const hasFiles = filesByField[documentKey]?.length > 0;
      const hasExistingDoc = !!existingDocuments[documentKey];

      if (numericValue > 0 && !hasFiles && !hasExistingDoc) {
        missingDocuments.push(field.label);
      }
    });

    return missingDocuments;
  };

  const buildUkPayment = (data: any) => {
    const ukPayment = PAYMENT_FIELDS.reduce(
      (acc, field) => {
        const value = data.ukPayment[field.name];
        acc[field.name] = Number(value || 0);
        return acc;
      },
      {} as Record<string, any>,
    );

    ukPayment.ukviAccounts = data?.ukviAccounts.map((ukviAccount: any) => ({
      accountId: ukviAccount.accountId,
      password: ukviAccount.password,
    }));
    ukPayment.casLetters = data?.casLetters.map((casLetter: any) => ({
      casId: casLetter.casId,
      password: casLetter.password,
    }));

    return ukPayment;
  };

  const appendFilesToFormData = (formData: FormData, data: any) => {
    // Process payment-related files
    PAYMENT_FIELDS.forEach((field) => {
      const paymentValue = data.ukPayment[field.name];
      const numericValue = Number(paymentValue || 0);

      if (field.name === "ukviAccounts" || field.name === "casLetters") {
        return;
      }

      const documentKey = PAYMENT_TO_DOCUMENT_MAP[field.name] || field.name;

      // Only append files if payment value is greater than 0
      if (numericValue > 0 && filesByField[documentKey]?.length > 0) {
        filesByField[documentKey].forEach((file) =>
          formData.append(documentKey, file),
        );
      }
    });

    // Process all other required document files
    REQUIRED_FILE_FIELDS.forEach((field) => {
      // Skip payment-related fields (already processed above)
      const isPaymentField = PAYMENT_FIELDS.some(
        (p) => (PAYMENT_TO_DOCUMENT_MAP[p.name] || p.name) === field.name,
      );

      if (isPaymentField) return;

      // Skip ukviAccounts and casLetters
      if (field.name === "ukviAccounts" || field.name === "casLetters") {
        return;
      }

      // Append files for this document field if they exist
      if (filesByField[field.name]?.length > 0) {
        filesByField[field.name].forEach((file) =>
          formData.append(field.name, file),
        );
      }
    });
  };

  const handleAddPayment = async (data: any) => {
    const missingDocuments = validateDocuments(data);

    if (missingDocuments.length > 0) {
      toast.error(
        `Please upload documents for: ${missingDocuments.join(", ")}`,
      );
      return;
    }

    const ukPayment = buildUkPayment(data);

    // Create a clean payload without any system-managed fields
    const payload = {
      ukPayment,
      ...(!ukFormData ? { country: "UK" } : {}),
      otherPayment: null,

      ...(ukFormData ? { id: ukFormData?.id } : { offerLetterId: id }),
    };

    const formData = new FormData();
    formData.append("payment", JSON.stringify(payload));
    appendFilesToFormData(formData, data);

    try {
      const endpoint = ukFormData
        ? "api/offer-letter/payment/update"
        : "api/offer-letter/payment/create";

      const res: any = await apiRequest.post(endpoint, formData);

      closeDrawer();
      successMessage({ message: res?.message });
    } catch (error) {
      errorMessage({ error });
    }
  };

  return (
    <form className="wrapper" onSubmit={handleSubmit(handleAddPayment)}>
      <div className="text-center pb-2 text-xl font-bold text-blue-500 underline">
        UK Payment Form
      </div>

      <div className="max-h-96 overflow-y-auto space-y-3 grid grid-cols-3 gap-2">
        {PAYMENT_FIELDS.map((field) => (
          <div key={field.name} className="col-span-1">
            <TextInput
              errors={errors}
              label={field.label}
              name={`ukPayment.${field.name}`}
              register={register}
              type={field.type}
            />
          </div>
        ))}

        <div className="col-span-3 mt-4 font-semibold">UKV Accounts</div>
        <div className="col-span-3">
          <UkVAccountsRapter
            control={control}
            register={register}
            errors={errors}
            name="ukviAccounts"
            label="UKVI Accounts"
            initialAccounts={initialUkviAccounts}
            setValue={setValue}
          />
        </div>

        <div className="col-span-3 mt-4 font-semibold">CAS Letters</div>
        <div className="col-span-3">
          <CasLattersRapter
            control={control}
            register={register}
            errors={errors}
            name="casLetters"
            label="CAS Letters"
            initialCasLetters={initialCasLetters}
            setValue={setValue}
          />
        </div>

        <div className="col-span-3 mt-4 font-semibold">Upload Documents</div>

        {REQUIRED_FILE_FIELDS.map((field) => (
          <PaymentFileUpload
            key={field.name}
            fieldName={field.name}
            label={field.label}
            files={filesByField[field.name] || []}
            multiple={field.multiple || false}
            onFilesChange={(files) => handleFileChange(field.name, files)}
            existingDocument={existingDocuments[field.name] || null}
            existingMultiDocuments={
              field.name === "OTHER" ? multiDocuments : undefined
            }
          />
        ))}
      </div>

      <div className="mt-5">
        <SubmitAndCancelBtn isSubmiting={isSubmitting} fun={closeDrawer} />
      </div>
    </form>
  );
};

export default UkPaymentForm;
