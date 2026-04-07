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
import { useStaffInfo } from "@/store/useStaffInfo";
import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface PaymentProps {
  fun: any;
}
const StaffPayment: FC<PaymentProps> = ({ fun }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      month: "",
      year: "",
      amount: "",
      paymentDate: "",
      remarks: "",
      transactionType: "STAFF_SALARY",
      transactionFor: "STAFF",
      paymentStatus: "",

      studentId: null,
      paymentMode: "",
    },
  });

  const { closeModal } = useModal();

  const staff = useStaffInfo((state) => state.staff);

  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "PHOTO");

  const handleSubmitPayment = async (data: any) => {
    const { paymentStatus, paymentMode, month, ...rest } = data;

    const payload = {
      paymentStatus: paymentStatus?.value,
      staffId: staff?.id,
      paymentMode: paymentMode?.value,
      month: month?.value,
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
      fun();
      closeModal();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form className=" " onSubmit={handleSubmit(handleSubmitPayment)}>
      <div className="  wrapper max-h-96 overflow-y-auto grid grid-cols-2 gap-2">
        <SelectField
          label="Month"
          name="month"
          errors={errors}
          control={control}
          options={NEPALI_MONTH_OPTIONS}
          isRequired={true}
          validation={{ required: "Month is Required" }}
        />
        <TextInput
          label="year"
          name="year"
          errors={errors}
          register={register}
          type={FORM_TYPE.NUMBER}
          required={true}
          validation={{ required: "year is required" }}
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
          label="Payment Mode"
          isRequired={true}
          validation={{ required: ErrorMessage.PaymentMode }}
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

      <div className=" mt-3">
        <SubmitAndCancelBtn fun={closeModal} isSubmiting={isSubmitting} />
      </div>
    </form>
  );
};

export default StaffPayment;
