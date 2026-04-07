import { uinversity, UploadCsv } from "@/src/ApiList/AdminApi";
import { FILE_TYPE } from "@/src/Common/fileUpload/FileType";
import { FileUploader } from "@/src/Common/fileUpload/fileUploader";
import { useFileInput } from "@/src/Common/fileUpload/useFile";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextInput from "@/src/Common/TextInput";
import { apiRequest } from "@/src/lib/axiosSetup";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

interface universityProps {
  fun: any;
}

const UploadUniversitycsv: FC<universityProps> = ({ fun }) => {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      intakeYear: "",
      country: "",
    },
  });

  const { closeModal } = useModal();

  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "CSV");

  const handleUploadCsv = async (data: any) => {
    const formData: any = new FormData();

    formData.append("csv", JSON.stringify(data));

    if (files) {
      files?.forEach((v: any) => formData.append("file", v?.rest));
    } else {
      formData.append("file", null);
    }
    try {
      const res: any = await uinversity(formData);
      successMessage({ message: res?.message });
      closeModal();
      fun();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form className=" " onSubmit={handleSubmit(handleUploadCsv)}>
      <div className=" mb-2 wrapper max-h-60 overflow-y-auto p-3 grid grid-cols-2">
        <div className=" col-span-1">
          <TextInput
            label="Country Name"
            name="country"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.countryName }}
            errors={errors}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            label="In_Take_Year"
            name="intakeYear"
            errors={errors}
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.intake }}
          />
        </div>

        <div className=" col-span-2">
          <FileUploader
            accept={FILE_TYPE.EXCEL}
            files={files}
            handleFilesChange={handleFilesChange}
            loading={loadingFiles}
            uploadType={"SINGLE"}
            removeFiles={removeFiles}
          />
        </div>
      </div>

      <SubmitAndCancelBtn isSubmiting={isSubmitting} fun={closeModal} />
    </form>
  );
};

export default UploadUniversitycsv;
