import { AddStudent, UpdateStudent } from "@/src/ApiList/AdminApi";
import { FILE_TYPE } from "@/src/Common/fileUpload/FileType";
import { FileUploader } from "@/src/Common/fileUpload/fileUploader";
import { useFileInput } from "@/src/Common/fileUpload/useFile";
import PasswordShow from "@/src/Common/PasswordShow";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextInput from "@/src/Common/TextInput";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import { message } from "antd";
import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface StudentProps {
  rowData?: any;
  fun?: any;
}

const StudentForm: FC<StudentProps> = ({ fun, rowData }) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      firstName: rowData?.firstName ?? "",
      lastName: rowData?.lastName ?? "",
      email: rowData?.email ?? "",
      password: "",
      contactNumber: rowData?.contactNumber ?? "",
      isActive: rowData?.isActive ?? false,
    },
  });

  const { closeModal } = useModal();

  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "PHOTO");

  const handleAddStudent = async (data: any) => {
    const payload = {
      ...data,
      ...(rowData && { id: rowData?.id }),
    };
    const fromData: any = new FormData();

    fromData.append("customer", JSON.stringify(payload));

    if (files) {
      files?.forEach((v: any) => fromData.append("file", v?.rest));
    } else {
      fromData.append("file", null);
    }

    try {
      const res: any = rowData
        ? await UpdateStudent(fromData)
        : await AddStudent(fromData);
      successMessage({ message: res?.message });
      closeModal();
      fun();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleAddStudent)}>
        <div className=" grid grid-cols-9 wrapper   overflow-auto max-h-96">
          <div className=" col-span-4">
            <TextInput
              errors={errors}
              name="firstName"
              register={register}
              type={FORM_TYPE.TEXT}
              label="First Name"
              required={true}
              validation={{ required: ErrorMessage.name }}
            />
          </div>

          <div className=" col-span-3">
            <TextInput
              errors={errors}
              name="lastName"
              register={register}
              type={FORM_TYPE.TEXT}
              label="Last Name"
              required={true}
              validation={{ required: "Name " }}
            />
          </div>

          <div className=" col-span-2 mt-8">
            <TextInput
              errors={errors}
              label="Is Active"
              name="isActive"
              register={register}
              type={FORM_TYPE.CHECKBOX}
            />
          </div>

          <div className=" col-span-3">
            <TextInput
              errors={errors}
              name="email"
              register={register}
              type={FORM_TYPE.EMAIL}
              label="Email"
              required={true}
              validation={{ required: ErrorMessage.email }}
            />
          </div>

          <div className=" col-span-3">
            <PasswordShow
              errors={errors}
              name="password"
              register={register}
              label="Password"
              required={!rowData && true}
              // validation={{ required: rowData ? ErrorMessage.password : false }}
            />
          </div>

          <div className=" col-span-3">
            <TextInput
              errors={errors}
              name="contactNumber"
              register={register}
              type={FORM_TYPE.TEXT}
              label="Number"
              required
              validation={{ required: ErrorMessage.action }}
            />
          </div>

          <div className=" col-span-9">
            <Form.Label>Image</Form.Label>

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
    </div>
  );
};

export default StudentForm;
