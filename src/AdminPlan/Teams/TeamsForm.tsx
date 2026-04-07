import { AddTeam, UpdateTeams } from "@/src/ApiList/AdminApi";
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
import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface TeamProps {
  rowData?: any;
  fun?: any;
}

const TeamsForm: FC<TeamProps> = ({ rowData, fun }) => {
  const { closeModal } = useModal();
  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      userName: rowData?.userName ?? "",
      designation: rowData?.designation ?? "",
      description: "",
      isActive: rowData?.isActive ?? false,
    },
  });

  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "PHOTO");

  const handleAddteams = async (data: any) => {
    const { description, ...rest } = data;
    const payload = {
      ...rest,
      ...(rowData && { id: rowData?.id }),
    };
    const fromData: any = new FormData();
    fromData.append("team", JSON.stringify(payload));

    if (files) {
      files?.forEach((v) => fromData.append("file", v?.rest));
    } else {
      fromData.append("file", null);
    }

    try {
      const res: any = rowData
        ? await UpdateTeams(fromData)
        : await AddTeam(fromData);
      successMessage({ message: res?.message });
      closeModal();
      fun();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form className=" " onSubmit={handleSubmit(handleAddteams)}>
      <div className=" grid grid-cols-2 wrapper max-h-96 overflow-y-auto ">
        <div className=" col-span-2">
          <TextInput
            errors={errors}
            label="Employee Name"
            name="userName"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.name }}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            errors={errors}
            label="Employee Designation"
            name="designation"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.position }}
          />
        </div>

        <div className=" mt-7 col-span-1">
          <TextInput
            errors={errors}
            label="Is Active"
            name="isActive"
            register={register}
            type={FORM_TYPE.CHECKBOX}
          />
        </div>

        <div className=" col-span-2">
          <Form.Label>Employee Image</Form.Label>

          <FileUploader
            accept={FILE_TYPE.PHOTO}
            files={files}
            handleFilesChange={handleFilesChange}
            loading={loadingFiles}
            uploadType={"SINGLE"}
            removeFiles={removeFiles}
          />

          {rowData?.file && <ImagePreview File={rowData} />}
        </div>
      </div>

      <div className=" my-3">
        <SubmitAndCancelBtn isSubmiting={isSubmitting} />
      </div>
    </form>
  );
};

export default TeamsForm;
