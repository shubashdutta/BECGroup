import { AddHeroSection } from "@/src/ApiList/AdminApi";
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
import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface HeroSectionProps {
  rowData?: any;
  fun?: any;
}

const HeroSectionForm: FC<HeroSectionProps> = ({ fun, rowData }) => {
  const {
    formState: { errors, isSubmitting },
    register,
    control,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const { closeModal } = useModal();

  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "PHOTO");

  const handleAddBannerImage = async (data: any) => {
    const payload = {
      ...data,
    };
    const fromData: any = new FormData();
    fromData.append("hero", JSON.stringify(data));

    if (files) {
      files.forEach((v) => fromData.append("files", v?.rest));
    } else {
      fromData.append("files", null);
    }
    try {
      const res: any = await AddHeroSection(fromData);
      successMessage({ message: res?.message });
      closeModal();
      fun();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleAddBannerImage)}>
      <div className="wrapper ">
        <TextInput
          errors={errors}
          label="Title"
          name="title"
          register={register}
          type={FORM_TYPE.TEXT}
          required
          validation={{ required: ErrorMessage.Title }}
        />

        <div className=" py-3">
          <Form.Label>Banner Image</Form.Label>

          <FileUploader
            accept={FILE_TYPE.PHOTO}
            files={files}
            handleFilesChange={handleFilesChange}
            loading={loadingFiles}
            multiple={true}
            removeFiles={removeFiles}
          />
        </div>
      </div>

      <div className=" py-5">
        <SubmitAndCancelBtn isSubmiting={isSubmitting} fun={closeModal} />
      </div>
    </form>
  );
};

export default HeroSectionForm;
