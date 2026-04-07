import { AddAboustAndAds, UpdateAboutUSAndAds } from "@/src/ApiList/AdminApi";
import { FILE_TYPE } from "@/src/Common/fileUpload/FileType";
import { FileUploader } from "@/src/Common/fileUpload/fileUploader";
import { useFileInput } from "@/src/Common/fileUpload/useFile";
import ImagePreviewRemove from "@/src/Common/ImageRemoveBtn/ImageRemoveWithbtn";
import SelectField from "@/src/Common/SelectField";
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
import { sectionOption } from "@/src/utils/options/SectionOption";
import React, { FC, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface AboutAdsProps {
  fun?: any;
  row?: any;
}

const AboutAdsForm: FC<AboutAdsProps> = ({ fun, row }) => {
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      title: row?.title ?? "",
      description: "",
      isActive: row?.isActive ?? false,
      section: "",
      ...(row && { id: row?.id }),
    },
  });

  const { closeModal } = useModal();

  const section = watch("section");

  const isAboutUs = section?.value === "ABOUT_US";

  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "PHOTO");

  const sectionoption: any = sectionOption?.find?.(
    (v) => v?.value === row?.section,
  );
  useEffect(() => {
    if (row) {
      setValue("section", sectionoption);
    }
  }, []);

  const handleAddAdsAndAbout = async (data: any) => {
    const { title, section, ...rest } = data;

    const paylaod = {
      title,
      section: data?.section?.value,
      ...rest,
    };


    const formData: any = new FormData();
    formData.append("aboutUs", JSON.stringify(paylaod));

    if (files) {
      files?.forEach((v) => formData.append("files", v?.rest));
    } else {
      formData.append("files", null);
    }
    try {
      const res: any = row
        ? await UpdateAboutUSAndAds(formData)
        : await AddAboustAndAds(formData);
      successMessage({ message: res?.message });
      fun();
      closeModal();
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleRemove = () => {};
  return (
    <form onSubmit={handleSubmit(handleAddAdsAndAbout)}>
      <div className=" wrapper p-3 mb-6 overflow-y-auto max-h-96 grid grid-cols-2 gap-3">
        <div className=" col-span-1">
          <TextInput
            label="Title"
            name="title"
            register={register}
            type={FORM_TYPE.TEXT}
            errors={errors}
            required={true}
            validation={{ required: ErrorMessage.Title }}
          />
        </div>

        <div className=" col-span-1 ">
          <SelectField
            control={control}
            errors={errors}
            name="section"
            options={sectionOption}
            isRequired={true}
            validation={{ required: ErrorMessage.section }}
            label="Section"
          />
        </div>

        {/* <div className=" col-span-1 mt-8">
          <TextInput
            errors={errors}
            label="Is Active"
            name="isActive"
            register={register}
            type={FORM_TYPE.CHECKBOX}
          />
        </div> */}

        <div className=" col-span-3">
          <Form.Label>File</Form.Label>
          <FileUploader
            accept={FILE_TYPE.PHOTO}
            files={files}
            handleFilesChange={handleFilesChange}
            loading={loadingFiles}
            multiple={!isAboutUs}
            uploadType={isAboutUs ? "SINGLE" : "MULTIPLE"}
            removeFiles={removeFiles}
          />

          {row?.files && (
            <ImagePreviewRemove
              path={row?.files}
              onRemoveImage={handleRemove}
            />
          )}
        </div>
      </div>

      <SubmitAndCancelBtn isSubmiting={isSubmitting} fun={closeModal} />
    </form>
  );
};

export default AboutAdsForm;
