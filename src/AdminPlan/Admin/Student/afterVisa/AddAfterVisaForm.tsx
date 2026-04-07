import TextInput from "@/src/Common/TextInput";
import { FORM_TYPE } from "@/src/utils/InputType";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { PaymentFileUpload } from "../universityPayment/PaymentFileUpload";
import { useConsultingStudent } from "@/store/useStudentConsulting";
import { apiRequest } from "@/src/lib/axiosSetup";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { message } from "antd";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import { useDrawer } from "@/src/utils/Modal/DrawerModalProvider";

interface AfterVisaProps {
  row?: any;
  fun: () => void;
}

interface FileField {
  name: string;
  label: string;
  multiple?: boolean; // optional
}
const afterVisaFileFields: FileField[] = [
  { name: "VISA_PDF", label: "Visa PDF" },
  { name: "FLIGHT_TICKET", label: "Flight Ticket" },
  { name: "SERVICE_CHARGE", label: "Service Charge" },
  { name: "ARRIVAL_STAMP_PHOTO", label: "Arrival Stamp Photo" },
  { name: "COLLEGE_ENROLMENT_LETTER", label: "Enrolment Letter" },
  { name: "ACCOMMODATION_FEE", label: "Accommodation Fee" },
  { name: "OTHER_MULTIPLE_AFTER_VISA", label: "Others", multiple: true },
] as const;

const AddAfterVisaForm: FC<AfterVisaProps> = ({ fun, row }) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      flightTicket: "",
      serviceCharge: "",
      accommodationFee: "",
    },
  });

  const { closeDrawer } = useDrawer();

  const [filesByField, setFilesByField] = useState<Record<string, File[]>>({});

  const consultingStudent = useConsultingStudent(
    (state) => state?.consultingStudent,
  );

  const handleFileChange = (field: string, files: File[]) => {
    setFilesByField((prev) => ({ ...prev, [field]: files }));
  };

  const handleAddAfterVisa = async (data: any) => {
    const { flightTicket, serviceCharge, accommodationFee } = data;

    const payload = {
      accommodationFee,
      flightTicket,
      serviceCharge,
      ...(row ? { id: row?.id } : { studentId: consultingStudent?.id }),
    };

    const fromData: any = new FormData();
    fromData.append("payment", JSON.stringify(payload));

    Object.entries(filesByField).forEach(([Key, fileArr]) => {
      fileArr.forEach((file) => fromData.append(Key, file));
    });

    try {
      const res: any = row
        ? await apiRequest.post("api/payment/after-visa/update", fromData)
        : await apiRequest.post("api/payment/after-visa/create", fromData);

      successMessage({ message: res?.message });
      fun;
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleAddAfterVisa)}>
      <div className=" wrapper grid grid-cols-3 mb-2">
        <TextInput
          errors={errors}
          label="Flight Ticket"
          name="flightTicket"
          register={register}
          type={FORM_TYPE.NUMBER}
        />
        <TextInput
          errors={errors}
          label="Service Charge"
          name="serviceCharge"
          register={register}
          type={FORM_TYPE.NUMBER}
        />
        <TextInput
          errors={errors}
          label="Accommodation Fee"
          name="accommodationFee"
          register={register}
          type={FORM_TYPE.NUMBER}
        />

        <div className=" col-span-3 text-center mt-4 font-semibold">
          Upload Documents
        </div>
        {afterVisaFileFields.map((field) => (
          <PaymentFileUpload
            key={field.name}
            fieldName={field.name}
            files={filesByField[field.name] || []}
            onFilesChange={(files) => handleFileChange(field.name, files)}
            label={field.label}
            multiple={field.multiple || false}
          />
        ))}
      </div>

      <SubmitAndCancelBtn isSubmiting={isSubmitting} fun={closeDrawer} />
    </form>
  );
};

export default AddAfterVisaForm;
