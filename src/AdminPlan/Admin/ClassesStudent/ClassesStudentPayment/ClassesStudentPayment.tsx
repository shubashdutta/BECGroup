"use client";
import { FILE_TYPE } from "@/src/Common/fileUpload/FileType";
import { FileUploader } from "@/src/Common/fileUpload/fileUploader";
import { useFileInput } from "@/src/Common/fileUpload/useFile";
import SelectField from "@/src/Common/SelectField";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextArea from "@/src/Common/TextArea";
import TextInput from "@/src/Common/TextInput";
import { apiRequest } from "@/src/lib/axiosSetup";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import { NEPALI_MONTH_OPTIONS } from "@/src/utils/options/NepaliMonth";
import { PaymentMode, paymentStatus } from "@/src/utils/options/PaymentOption";
import { useClassesStudent } from "@/store/useClassesStudent";
import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ClassesStudentPayment = () => {
  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      month: "",
      year: "",
      amount: "",
      paymentDate: "",
      remarks: "",
      transactionFor: "ENROLLED_STUDENT",

      transactionType: "STUDENT_FEE",
      paymentStatus: "",
      staffId: null,
      paymentMode: "",
    },
    mode: "onSubmit",
  });

  const student = useClassesStudent((state) => {
    return state?.student;
  });

  const { closeModal } = useModal();

  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "PHOTO");

  const handleSubmitPayment = async (data: any) => {
    const { paymentStatus, paymentMode, month, amount, ...rest } = data;

    const payload = {
      paymentStatus: paymentStatus?.value,
      paymentMode: paymentMode?.value,
      enrolledStudentId: student?.id,
      month: month?.value,
      amount: Number(amount),

      ...rest,
    };

    const formData: any = new FormData();

    formData.append("payment", JSON.stringify(payload));

    if (files) {
      files?.forEach((v: any) => formData.append("file", v?.rest));
    } else {
      formData.append("file", null);
    }

    try {
      const res: any = await apiRequest.post("api/payment/create", formData);
      successMessage({ message: res?.message });
      closeModal();
      //   fun();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitPayment)}>
      <div className="  wrapper max-h-96 overflow-y-auto grid grid-cols-2 gap-2 mb-3">
        <SelectField
          label="Month"
          name="month"
          errors={errors}
          control={control}
          options={NEPALI_MONTH_OPTIONS}
          isRequired={true}
          validation={{ required: "month name is required" }}
        />
        <TextInput
          label="year"
          name="year"
          errors={errors}
          register={register}
          type={FORM_TYPE.NUMBER}
          required={true}
          validation={{ required: "payment year is required" }}
        />

        <TextInput
          label="Payment Date"
          name="paymentDate"
          register={register}
          errors={errors}
          type={FORM_TYPE.DATE}
          required={true}
          validation={{ required: ErrorMessage.Date }}
        />

        <SelectField
          control={control}
          name="paymentStatus"
          errors={errors}
          options={paymentStatus}
          label="Paymet Status"
          isRequired={true}
          validation={{ required: ErrorMessage.Payment_Status }}
        />

        <SelectField
          control={control}
          errors={errors}
          name="paymentMode"
          options={PaymentMode}
          isRequired={true}
          label="Payment Mode"
          validation={{ required: "Payment Mode is Required" }}
        />

        <div className=" col-span-1">
          <TextInput
            errors={errors}
            label="Amount"
            name="amount"
            register={register}
            type={FORM_TYPE.NUMBER}
            required
            validation={{ required: ErrorMessage.amount }}
          />
        </div>

        <div className=" col-span-2">
          <TextArea
            control={control}
            errors={errors}
            label="Remark"
            name="remarks"
            isRequired
            validation={{ required: "Remarks is Required" }}
          />
        </div>

        <div className=" col-span-2 wrapper mt-6">
          <Form.Label>Payment Bill Image</Form.Label>

          <FileUploader
            accept={FILE_TYPE.PHOTO}
            files={files}
            handleFilesChange={handleFilesChange}
            loading={loadingFiles}
            uploadType={"SINGLE"}
            removeFiles={removeFiles}
          />
        </div>
      </div>

      <SubmitAndCancelBtn fun={closeModal} isSubmiting={isSubmitting} />
    </form>
  );
};

export default ClassesStudentPayment;
