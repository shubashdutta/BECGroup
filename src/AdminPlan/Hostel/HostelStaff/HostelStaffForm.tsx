import { AdminAddHostelStaff, AdmiUpdateStaff } from "@/src/ApiList/AdminApi";
import { FILE_TYPE } from "@/src/Common/fileUpload/FileType";
import { FileUploader } from "@/src/Common/fileUpload/fileUploader";
import { useFileInput } from "@/src/Common/fileUpload/useFile";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextInput from "@/src/Common/TextInput";
import { apiRequest } from "@/src/lib/axiosSetup";
import ImagePreview from "@/src/lib/ImagePreview/ImagePreview";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { HtmlDateFormat } from "@/src/utils/formatArrayToLocalDate";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface StaffProps {
  fun: any;
  row?: any;
}

const HostelStaffForm: FC<StaffProps> = ({ fun, row }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      staffName: row?.staffName ?? "",
      mobileNumber: row?.mobileNumber ?? "",
      dateOfBirth: HtmlDateFormat(row?.dateOfBirth) ?? "",
      nationality: row?.nationality ?? "",
      citizenshipNumber: row?.citizenshipNumber ?? "",
      homeAddress: row?.homeAddress ?? "",
      joinDate: HtmlDateFormat(row?.joinDate) ?? "",
      position: row?.position ?? "",
      salary: row?.salary ?? "",

      ...(row && { id: row?.id }),
    },
  });

  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "PHOTO");

  const [files1, handleFilesChange1, removeFiles1, setFiles1, loadingFiles1] =
    useFileInput(null, "PHOTO");

  const { closeModal } = useModal();

  const handleAddStaff = async (data: any) => {
    const formData: any = new FormData();
    formData.append("staff", JSON.stringify(data));

    if (files) {
      files?.forEach((v: any) => formData.append("image", v?.rest));
    } else {
      formData.append("image", null);
    }

    if (files1) {
      files1?.forEach((v: any) => formData.append("document", v?.rest));
    } else {
      formData.append("document", null);
    }

    try {
      const res: any = row
        ? await AdmiUpdateStaff(formData)
        : await AdminAddHostelStaff(formData);
      successMessage({ message: res?.message });
      fun();
      closeModal();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleAddStaff)}>
      <div className=" wrapper max-h-96 mb-3 overflow-y-auto grid grid-cols-3 gap-3 p-3">
        <TextInput
          errors={errors}
          label="Staff Name"
          name="staffName"
          register={register}
          type={FORM_TYPE.TEXT}
          required={true}
          validation={{ required: ErrorMessage.name }}
        />

        <TextInput
          errors={errors}
          label="Staff Number"
          name="mobileNumber"
          register={register}
          type={FORM_TYPE.NUMBER}
        />

        <TextInput
          label="Staff_dob"
          errors={errors}
          name="dateOfBirth"
          register={register}
          type={FORM_TYPE.DATE}
        />

        <TextInput
          errors={errors}
          label="Nationality"
          name="nationality"
          register={register}
          type={FORM_TYPE.TEXT}
        />

        <TextInput
          errors={errors}
          label="Citizenship_Number"
          name="citizenshipNumber"
          register={register}
          type={FORM_TYPE.TEXT}
        />

        <TextInput
          errors={errors}
          label="Staff_Address"
          name="homeAddress"
          register={register}
          type={FORM_TYPE.TEXT}
        />

        <TextInput
          errors={errors}
          label="Join_Date"
          name="joinDate"
          register={register}
          type={FORM_TYPE.DATE}
        />

        <TextInput
          errors={errors}
          label="Job_Position"
          name="position"
          register={register}
          type={FORM_TYPE.TEXT}
        />

        <TextInput
          errors={errors}
          label="Salary"
          name="salary"
          register={register}
          type={FORM_TYPE.NUMBER}
        />

        <div className=" col-span-3 wrapper my-3">
          <Form.Label>Staff Image</Form.Label>

          <FileUploader
            accept={FILE_TYPE.PHOTO}
            files={files}
            handleFilesChange={handleFilesChange}
            loading={loadingFiles}
            removeFiles={removeFiles}
            uploadType={"SINGLE"}
          />

          {row?.image?.path && <ImagePreview File={row?.image?.path} />}
        </div>

        <div className=" col-span-3">
          <Form.Label>Staff Document</Form.Label>
          <FileUploader
            accept={FILE_TYPE.PHOTO}
            files={files1}
            handleFilesChange={handleFilesChange1}
            loading={loadingFiles1}
            removeFiles={removeFiles1}
            uploadType={"SINLE"}
          />

          {row?.document?.path && <ImagePreview File={row?.document?.path} />}
        </div>
      </div>

      <SubmitAndCancelBtn fun={closeModal} isSubmiting={isSubmitting} />
    </form>
  );
};

export default HostelStaffForm;
