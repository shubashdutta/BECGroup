import { AddVisaGranted, UpdateVisaGranted } from "@/src/ApiList/AdminApi";
import { FILE_TYPE } from "@/src/Common/fileUpload/FileType";
import { FileUploader } from "@/src/Common/fileUpload/fileUploader";
import { useFileInput } from "@/src/Common/fileUpload/useFile";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextInput from "@/src/Common/TextInput";
import ImagePreview from "@/src/lib/ImagePreview/ImagePreview";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import { error } from "console";
import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface VisaProps {
  row?: any;
  fun?: any;
}

const VisaGrantedForm: FC<VisaProps> = ({ fun, row }) => {
  const {
    clearErrors,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      studentName: row?.studentName ?? "",
      universityName: row?.universityName ?? "",
      courseName: row?.courseName ?? "",
      isActive: row?.isActive ?? false,
      description: "",
      location: row?.location ?? "",
    },
  });
  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "PHOTO");
  const [files1, handleFilesChange1, removeFiles1, setFiles1, loadingFiles1] =
    useFileInput(null, "PHOTO");
  const { closeModal } = useModal();

  const handleAddVisa = async (data: any) => {
    const payload = {
      ...data,
      ...(row && { id: row?.id }),
    };

    const formData: any = new FormData();

    formData.append("testimonial", JSON.stringify(payload));

    if (files) {
      files?.forEach((v) => formData.append("file", v?.rest));
    } else {
      formData.append("file", null);
    }

    if (files1) {
      files1.forEach((v) => formData.append("flag", v?.rest));
    } else {
      formData.append("flag", null);
    }
    try {
      const res: any = row
        ? await UpdateVisaGranted(formData)
        : await AddVisaGranted(formData);
      successMessage({ mssage: res?.message });
      closeModal();
      fun();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleAddVisa)}>
      <div className=" grid grid-cols-2  wrapper overflow-y-auto max-h-96">
        <div className=" col-span-2">
          <TextInput
            errors={errors}
            label="Student Name"
            name="studentName"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.name }}
          />
        </div>

        <div className="  col-span-1">
          <TextInput
            errors={errors}
            label="University Name"
            name="universityName"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.universityName }}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            name="courseName"
            label="Course Name"
            errors={errors}
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.course }}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            errors={errors}
            label="University Location"
            name="location"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.location }}
          />
        </div>

        <div className=" col-span-1 mt-7">
          <TextInput
            errors={errors}
            label="is Active"
            name="isActive"
            register={register}
            type={FORM_TYPE.CHECKBOX}
          />
        </div>

        <div className=" grid-cols-1 wrapper p-3">
          <Form.Label>Student Iamge</Form.Label>

          <FileUploader
            accept={FILE_TYPE.PHOTO}
            files={files}
            handleFilesChange={handleFilesChange}
            loading={loadingFiles}
            uploadType={"SINGLE"}
            removeFiles={removeFiles}
          />
        </div>
        <div className=" grid-cols-1 wrapper p-3">
          <Form.Label>Country Flag</Form.Label>

          <FileUploader
            accept={FILE_TYPE.PHOTO}
            files={files1}
            handleFilesChange={handleFilesChange1}
            loading={loadingFiles1}
            uploadType={"SINGLE"}
            removeFiles={removeFiles1}
          />
        </div>

        {row?.file && <ImagePreview File={row} />}
      </div>

      <div className=" my-3">
        <SubmitAndCancelBtn fun={closeModal} isSubmiting={isSubmitting} />
      </div>
    </form>
  );
};

export default VisaGrantedForm;
