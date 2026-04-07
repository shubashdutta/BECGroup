import { AddCouncil, updateCouncil } from "@/src/ApiList/AdminApi";
import { FILE_TYPE } from "@/src/Common/fileUpload/FileType";
import { FileUploader } from "@/src/Common/fileUpload/fileUploader";
import { useFileInput } from "@/src/Common/fileUpload/useFile";
import CouncilRapter from "@/src/Common/Rappters/CouncilRapter";
import SelectField from "@/src/Common/SelectField";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextInput from "@/src/Common/TextInput";
import DynamicSelectWithOther from "@/src/lib/DynamicSelectWithOther/DynamicSelectWithOther";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import {
  formatDateOfBirth,
  formatToFormDate,
} from "@/src/utils/formatToFormDate";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import { LanguageTests } from "@/src/utils/options/LangOption";
import { preferredCountry } from "@/src/utils/options/preferredCountryOption";
import React, { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface CouncilProps {
  rowData?: any;
  fun?: any;
}

const CouncilForm: FC<CouncilProps> = ({ fun, rowData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      name: rowData?.name ?? "",
      mobile: rowData?.mobile ?? "",
      email: rowData?.email ?? "",
      currentAddress: rowData?.currentAddress ?? "",
      language: null,
      preferredCountry: null,
      reference: "",
      dateOfBirth: formatDateOfBirth(rowData?.dateOfBirth) ?? "",
      passportNumber: rowData?.passportNumber ?? "",
      fatherName: rowData?.fatherName ?? "",
      fatherDob: formatDateOfBirth(rowData?.fatherDob) ?? "",
      fatherNumber: rowData?.fatherNumber ?? "",
      fatherOccupation: rowData?.fatherOccupation ?? "",
      motherName: rowData?.motherName ?? "",
      motherDob: formatDateOfBirth(rowData?.motherDob) ?? "",
      motherNumber: rowData?.motherNumber ?? "",
      motherOccupation: rowData?.motherOccupation ?? "",
      district: rowData?.district ?? "",
      municipality: rowData?.municipality ?? "",
      ward: rowData?.ward ?? "",
      tole: rowData?.tole ?? "",
      languageText:
        rowData?.language &&
        !LanguageTests.find((o) => o.value === rowData?.language)
          ? rowData.language
          : "",
      preferredCountryText:
        rowData?.preferredCountry &&
        !preferredCountry.find((o) => o.value === rowData.preferredCountry)
          ? rowData?.preferredCountry
          : "",
      academicList: rowData
        ? rowData?.academicList?.map((v: any) => ({
            grade: v?.grade,
            passedYear: v?.passedYear,
            collegeName: v?.collegeName,
            subject: v?.subject,
            percentage: v?.percentage,
            id: v?.id,
          }))
        : [
            {
              grade: "",
              passedYear: "",
              collegeName: "",
              subject: "",
              percentage: "",
            },
          ],
    },
  });

  const { closeModal } = useModal();

  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "PHOTO");

  const { append, fields, remove } = useFieldArray({
    control,
    name: "academicList",
  });

  const prefOption: any = watch("preferredCountry");
  const prefText = watch("preferredCountryText");

  const handleSubmitForm = async (data: any) => {
    const {
      preferredCountry,
      language,
      languageText,
      preferredCountryText,
      ...rest
    } = data;

    const payload = {
      preferredCountry:
        data?.preferredCountry?.value === "other"
          ? data?.preferredCountryText
          : data?.preferredCountry?.value,

      language:
        data?.language?.value === "other"
          ? data?.languageText
          : data?.language?.value,
      ...(rowData && { id: rowData?.id }),
      ...rest,
    };

    const fromData: any = new FormData();
    fromData.append("council", JSON.stringify(payload));

    if (files) {
      files.forEach((v) => fromData.append("featureImage", v?.rest));
    } else {
      fromData.append("featureImage", null);
    }
    try {
      const res: any = rowData
        ? await updateCouncil(fromData)
        : await AddCouncil(fromData);
      successMessage({ message: res?.message });
      fun();
      closeModal();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <div className="wrapper max-h-96 overflow-auto  ">
      <form className=" " onSubmit={handleSubmit(handleSubmitForm)}>
        <div className=" grid grid-cols-2   space-y-4 space-x-2 ">
          <div className="grid-col-1">
            <TextInput
              name="name"
              register={register}
              type={FORM_TYPE.TEXT}
              label="Name"
              required
              errors={errors}
              validation={{ required: ErrorMessage.name }}
            />
          </div>
          <div className=" grid-cols-1">
            <TextInput
              name="email"
              register={register}
              type={FORM_TYPE.EMAIL}
              errors={errors}
              label="Email"
              required={true}
              validation={{ required: ErrorMessage.email }}
            />
          </div>

          <div className="grid-cols-1">
            <TextInput
              name="mobile"
              register={register}
              type={FORM_TYPE.TEXT}
              errors={errors}
              label="Mobile Number"
              required={true}
              validation={{ required: ErrorMessage?.phone }}
            />
          </div>
          <div className=" grid-cols-1">
            <TextInput
              name="currentAddress"
              register={register}
              errors={errors}
              type={FORM_TYPE.TEXT}
              label="Current Address"
              required={true}
              validation={{ required: ErrorMessage?.Address }}
            />
          </div>
          <div className=" grid-cols-1">
            <DynamicSelectWithOther
              control={control}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              name="language"
              options={LanguageTests}
              label="Language"
              required={true}
              initialValue={rowData?.language}
            />
            {/* <SelectField
              control={control}
              errors={errors}
              name="language"
              label=" Language Proficiency"
              options={LanguageTests}
            />
            {LangOption?.value === "other" && (
              <TextInput
                errors={errors}
                name="LangText"
                register={register}
                label="Language Proficiency"
                type={FORM_TYPE.TEXT}
              />
            )} */}
          </div>
          <div className=" grid-cols-1">
            <DynamicSelectWithOther
              control={control}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              name="preferredCountry"
              options={preferredCountry}
              label="Preferred Country"
              initialValue={rowData?.preferredCountry}
            />
            {/* <SelectField
              control={control}
              errors={errors}
              name="preferredCountry"
              options={preferredCountry}
              label="Preferred Country"
            />

            {prefOption?.value === "other" && (
              <TextInput
                errors={errors}
                name="preferredCountryText"
                register={register}
                type={FORM_TYPE.TEXT}
                label="Preferred Country"
              />
            )} */}
          </div>
          <div className=" grid-cols-1">
            <TextInput
              name="dateOfBirth"
              label="D_O_B"
              register={register}
              errors={errors}
              type={FORM_TYPE.DATE}
            />
          </div>
          <div className="grid-cols-1">
            <TextInput
              name="passportNumber"
              register={register}
              errors={errors}
              type={FORM_TYPE.TEXT}
              label="Passport Number"
            />
          </div>
          <div className=" grid-cols-1">
            <TextInput
              errors={errors}
              name="fatherName"
              register={register}
              type={FORM_TYPE.TEXT}
              label="Father Name "
            />
          </div>
          <div className=" grid-cols-1">
            <TextInput
              name="fatherNumber"
              register={register}
              errors={errors}
              type={FORM_TYPE.TEXT}
              label="Father Number"
            />
          </div>

          <div className=" grid-cols-1">
            <TextInput
              name="fatherOccupation"
              errors={errors}
              register={register}
              type={FORM_TYPE.TEXT}
              label="Father_Occupation"
            />
          </div>

          <div className=" grid-cols-1">
            <TextInput
              errors={errors}
              name="fatherDob"
              register={register}
              type={FORM_TYPE.DATE}
              label="Father D_O_B"
            />
          </div>

          <div className=" grid-cols-1">
            <TextInput
              errors={errors}
              name="motherName"
              register={register}
              type={FORM_TYPE.TEXT}
              label="Mother Name"
            />
          </div>
          <div className=" grid-cols-1">
            <TextInput
              name="motherNumber"
              errors={errors}
              register={register}
              type={FORM_TYPE.TEXT}
              label="Mother Number"
            />
          </div>
          <div className=" grid-cols-1">
            <TextInput
              errors={errors}
              name="motherOccupation"
              register={register}
              type={FORM_TYPE.TEXT}
              label="Mother_Occupation"
            />
          </div>
          <div className=" grid-cols-1">
            <TextInput
              errors={errors}
              name="motherDob"
              register={register}
              type={FORM_TYPE.DATE}
              label="Mother D_O_B"
            />
          </div>

          <div className="grid-cols-1">
            <TextInput
              name="district"
              register={register}
              errors={errors}
              type={FORM_TYPE.TEXT}
              label="District"
            />
          </div>

          <div className=" grid-cols-1">
            <TextInput
              errors={errors}
              name="municipality"
              register={register}
              type={FORM_TYPE.TEXT}
              label="Municipality"
            />
          </div>

          <div className=" grid-cols-1">
            <TextInput
              errors={errors}
              name="ward"
              type={FORM_TYPE.TEXT}
              register={register}
              label="Ward"
            />
          </div>
          <div className=" grid-cols-1">
            <TextInput
              errors={errors}
              name="tole"
              register={register}
              type={FORM_TYPE.TEXT}
              label="Tole"
            />
          </div>
        </div>

        <CouncilRapter
          append={append}
          control={control}
          errors={errors}
          fields={fields}
          register={register}
          remove={remove}
        />

        <div className="">
          <FileUploader
            accept={FILE_TYPE.PHOTO}
            files={files}
            handleFilesChange={handleFilesChange}
            loading={loadingFiles}
            uploadType={"SINGLE"}
            removeFiles={removeFiles}
          />
        </div>
        <div className=" my-2">
          <SubmitAndCancelBtn isSubmiting={isSubmitting} fun={closeModal} />
        </div>
      </form>
    </div>
  );
};

export default CouncilForm;
