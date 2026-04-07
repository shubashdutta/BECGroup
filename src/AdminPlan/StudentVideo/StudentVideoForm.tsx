import { AddVideo } from "@/src/ApiList/AdminApi";
import { FILE_TYPE } from "@/src/Common/fileUpload/FileType";
import { FileUploader } from "@/src/Common/fileUpload/fileUploader";
import { useFileInput } from "@/src/Common/fileUpload/useFile";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextInput from "@/src/Common/TextInput";
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

interface videoProps {
  rowData?: any;
  fun?: any;
}
const StudentVideoForm: FC<videoProps> = ({ fun, rowData }) => {
  const { closeModal } = useModal();
  const {
    formState: { errors, isSubmitting },
    register,
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "VIDEO");

  const handleAddVideo = async (data: any) => {
    const fromData: any = new FormData();

    fromData.append("success", JSON.stringify(data));
    if (files) {
      files?.forEach((v) => fromData.append("file", v?.rest));
    } else {
      fromData.append("file", null);
    }

    try {
      const res: any = await AddVideo(fromData);
      successMessage({ message: res?.message });
      closeModal();
      fun();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleAddVideo)}>
      <div className=" grid grid-cols-1  wrapper max-h-96 overflow-y-auto">
        <TextInput
          label="Video Title"
          errors={errors}
          register={register}
          name="title"
          type={FORM_TYPE.TEXT}
          required={true}
          validation={{ required: ErrorMessage.Title }}
        />

        <div className=" py-2">
          <Form.Label>Video</Form.Label>

          <FileUploader
            accept={FILE_TYPE.VIDEO}
            files={files}
            handleFilesChange={handleFilesChange}
            loading={loadingFiles}
            removeFiles={removeFiles}
            uploadType="SINGLE"
          />
        </div>
      </div>

      <div className=" my-3">
        <SubmitAndCancelBtn fun={closeModal} isSubmiting={isSubmitting} />
      </div>
    </form>
  );
};

export default StudentVideoForm;
