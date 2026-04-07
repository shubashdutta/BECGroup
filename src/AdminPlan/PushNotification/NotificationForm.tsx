import { Nofification, UpdateNotification } from "@/src/ApiList/AdminApi";
import { PublicSutdentShortData } from "@/src/ApiList/PublicApi";
import { FILE_TYPE } from "@/src/Common/fileUpload/FileType";
import { FileUploader } from "@/src/Common/fileUpload/fileUploader";
import { useFileInput } from "@/src/Common/fileUpload/useFile";
import SelectField from "@/src/Common/SelectField";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextArea from "@/src/Common/TextArea";
import TextInput from "@/src/Common/TextInput";
import { apiRequest } from "@/src/lib/axiosSetup";
import ImagePreview from "@/src/lib/ImagePreview/ImagePreview";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface NotificationProps {
  fun?: any;
  row?: any;
}

const NotificationForm: FC<NotificationProps> = ({ fun, row }) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm({
    defaultValues: {
      title: row?.title ?? "",
      description: row?.description ?? "",
      url: "",
      isAll: row?.isAll ?? false,
      studentIds: "",
      ...(row && { id: row?.id }),
    },
  });

  const { closeModal } = useModal();

  const [studentList, setStudentList] = useState([]);
  const { userType, id } = getCurrentUserInfo();

  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "PHOTO");

  const student = row?.students?.map((v: any) => ({
    label: `${v?.firstName} ${v?.middleName ?? v?.middleName} ${v?.lastName}`,
    value: v?.studentId,
  }));

  useEffect(() => {
    if (row) {
      setValue("studentIds", student);
    }
  }, []);

  const handleGetStudentList = async () => {
    const params = {
      statusIn: "ACTIVE",
      ...(userType === "USER" && { assigneeId: id }),
    };

    try {
      const res: any = await PublicSutdentShortData(params);
      const data = res?.data?.map((v: any) => ({
        label: `${v?.firstName} ${v?.middleName ?? v?.middleName} ${
          v?.lastName
        }`,
        value: v?.studentId,
      }));
      setStudentList(data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetStudentList();
  }, []);

  const handleSubmitPushNotification = async (data: any) => {
    const { studentIds, isAll, ...rest } = data;

    const payload = {
      studentIds:
        studentIds?.length > 0 ? studentIds.map((v: any) => v.value) : null,
      isAll,
      ...rest,
    };

    const formData: any = new FormData();

    formData.append("notice", JSON.stringify(payload));

    if (files) {
      files?.forEach((v: any) => formData.append("file", v?.rest));
    } else {
      formData.append("file", null);
    }

    try {
      const res: any = row
        ? await UpdateNotification(formData)
        : await Nofification(formData);
      successMessage({ message: res?.message });
      fun();
      closeModal();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitPushNotification)}>
      <div className=" wrapper overflow-y-auto  max-h-96 p-3 grid grid-cols-3 gap-2">
        <div className=" col-span-1 ">
          <TextInput
            errors={errors}
            label="Title"
            name="title"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.Title }}
          />
        </div>

        <div className=" col-span-1">
          <SelectField
            control={control}
            errors={errors}
            name="studentIds"
            options={studentList}
            isMulti={true}
            // isRequired={true}
            label="Student"
            // validation={{ required: ErrorMessage.student }}
          />
        </div>

        <div className=" col-span-1 mt-7">
          <TextInput
            label="Is All Student"
            errors={errors}
            name="isAll"
            register={register}
            type={FORM_TYPE.CHECKBOX}
          />
        </div>

        <div className=" col-span-3">
          <TextArea
            control={control}
            errors={errors}
            label="Description"
            name="description"
            isRequired
            validation={{ required: ErrorMessage.description }}
          />
        </div>

        <div className=" col-span-3  mt-6 wrapper">
          <Form.Label className=" mt-3">File</Form.Label>
          <FileUploader
            accept={FILE_TYPE.PHOTO}
            files={files}
            handleFilesChange={handleFilesChange}
            loading={loadingFiles}
            removeFiles={removeFiles}
            uploadType="SINGLE"
          />

          {row?.file && <ImagePreview File={row?.file} />}
        </div>
      </div>

      <div className="mt-5">
        <SubmitAndCancelBtn isSubmiting={isSubmitting} fun={closeModal} />
      </div>
    </form>
  );
};

export default NotificationForm;
