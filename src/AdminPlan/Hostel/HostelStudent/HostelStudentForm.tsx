import {
  AdminAddHostelStudent,
  AdminUpdateHostelStudent,
} from "@/src/ApiList/AdminApi";
import { FILE_TYPE } from "@/src/Common/fileUpload/FileType";
import { FileUploader } from "@/src/Common/fileUpload/fileUploader";
import { useFileInput } from "@/src/Common/fileUpload/useFile";
import SelectField from "@/src/Common/SelectField";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextInput from "@/src/Common/TextInput";
import ImagePreview from "@/src/lib/ImagePreview/ImagePreview";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { HtmlDateFormat } from "@/src/utils/formatArrayToLocalDate";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import { Block } from "@/src/utils/options/PaymentOption";
import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface HostelProp {
  row?: any;
  fun?: any;
}

const HostelStudentForm: FC<HostelProp> = ({ fun, row }) => {
  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      registrationNumber: row?.registrationNumber ?? "",
      studentName: row?.studentName ?? "",
      dateOfBirth: row ? HtmlDateFormat(row?.dateOfBirth) : "",
      citizenshipNumber: row?.citizenshipNumber ?? "",
      fatherName: row?.fatherName ?? "",
      fatherOccupation: row?.fatherOccupation ?? "",
      fatherContactNumber: row?.fatherContactNumber ?? "",
      nationality: row?.nationality ?? "",
      homeAddress: row?.homeAddress ?? "",
      localGuardian: row?.localGuardian ?? "",
      localGuardianContact: row?.localGuardianContact ?? "",
      studentMobileNumber: row?.studentMobileNumber ?? "",
      academicQualification: row?.academicQualification ?? "",
      institutionName: row?.institutionName ?? "",
      instructionName: row?.instructionName ?? "",
      subject: row?.subject ?? "",
      educationLevel: row?.educationLevel ?? "",
      year: row?.year ?? "",
      admissionDate: row ? HtmlDateFormat(row?.admissionDate) : "",
      block: "",
      ...(row && { id: row?.id }),
    },
  });

  const { closeModal } = useModal();
  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "PHOTO");

  const [files1, handleFilesChange1, removeFiles1, setFiles1, loadingFiles1] =
    useFileInput(null, "PHOTO");

  const handleAddHostelStudent = async (data: any) => {
    const { block, ...rest } = data;
    const payload = {
      block: block?.value,
      ...rest,
    };
    const fromData: any = new FormData();
    fromData.append("hostel", JSON.stringify(payload));

    if (files) {
      files?.forEach((v: any) => fromData.append("image", v?.rest));
    } else {
      fromData.append("image", null);
    }

    if (files1) {
      files1?.forEach((v: any) => fromData.append("document", v?.rest));
    } else {
      fromData?.append("document", null);
    }
    try {
      const res: any = row
        ? await AdminUpdateHostelStudent(fromData)
        : await AdminAddHostelStudent(fromData);
      successMessage({ message: res?.message });
      fun();
      closeModal();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form className="" onSubmit={handleSubmit(handleAddHostelStudent)}>
      <div className=" max-h-90 overflow-y-auto wrapper p-3 grid grid-cols-3">
        <div className=" col-span-1">
          <TextInput
            label="Bill No."
            name="registrationNumber"
            register={register}
            type={FORM_TYPE.TEXT}
            errors={errors}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            label="Student Name"
            name="studentName"
            register={register}
            errors={errors}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.name }}
          />
        </div>
        <TextInput
          errors={errors}
          label="Student Mobile Number"
          name="studentMobileNumber"
          register={register}
          type={FORM_TYPE.NUMBER}
          required={true}
          validation={{ required: ErrorMessage.phone }}
        />

        <TextInput
          label="Student DOB"
          errors={errors}
          name="dateOfBirth"
          register={register}
          type={FORM_TYPE.DATE}
          required={true}
          validation={{ required: ErrorMessage.dob }}
        />
        <TextInput
          errors={errors}
          label="Admission Date"
          name="admissionDate"
          register={register}
          type={FORM_TYPE.DATE}
          required={true}
          validation={{ required: ErrorMessage.Date }}
        />
        <TextInput
          label="Citizenship Number"
          name="citizenshipNumber"
          register={register}
          errors={errors}
          type={FORM_TYPE.TEXT}
        />

        <SelectField
          control={control}
          errors={errors}
          name="block"
          label="Hostel Block"
          options={Block}
          isRequired={true}
          validation={{ required: ErrorMessage.Block }}
        />
        <TextInput
          label="Father Name"
          name="fatherName"
          register={register}
          type={FORM_TYPE.TEXT}
          errors={errors}
          required={true}
          validation={{ required: ErrorMessage.FatherName }}
        />

        <TextInput
          errors={errors}
          label="Father Occupation "
          name="fatherOccupation"
          register={register}
          type={FORM_TYPE.TEXT}
        />
        <TextInput
          errors={errors}
          label="Father Contact Number"
          name="fatherContactNumber"
          register={register}
          type={FORM_TYPE.TEXT}
          required={true}
          validation={{ required: ErrorMessage.phone }}
        />
        <TextInput
          errors={errors}
          label="Nationality"
          name="nationality"
          register={register}
          type={FORM_TYPE.TEXT}
          required={true}
          validation={{ required: ErrorMessage.nationality }}
        />

        <TextInput
          errors={errors}
          label="Home Address"
          name="homeAddress"
          register={register}
          type={FORM_TYPE.TEXT}
          required={true}
          validation={{ required: ErrorMessage.Address }}
        />

        <TextInput
          errors={errors}
          label="Local Guardian"
          name="localGuardian"
          register={register}
          type={FORM_TYPE.TEXT}
        />
        <TextInput
          label="Local Guardian Contact"
          errors={errors}
          name="localGuardianContact"
          register={register}
          type={FORM_TYPE.TEXT}
        />

        <TextInput
          errors={errors}
          label="Academic Qualification"
          name="academicQualification"
          register={register}
          type={FORM_TYPE.TEXT}
        />
        <TextInput
          errors={errors}
          label="Institution Name"
          name="institutionName"
          register={register}
          type={FORM_TYPE.TEXT}
        />
        <TextInput
          errors={errors}
          label=" Instruction Name"
          name="instructionName"
          register={register}
          type={FORM_TYPE.TEXT}
        />
        <TextInput
          errors={errors}
          label="Subject"
          name="subject"
          register={register}
          type={FORM_TYPE.TEXT}
        />

        <TextInput
          errors={errors}
          label="Education Level"
          name="educationLevel"
          register={register}
          type={FORM_TYPE.TEXT}
        />

        <div className=" col-span-2">
          <TextInput
            errors={errors}
            label="Year"
            name="year"
            register={register}
            type={FORM_TYPE.NUMBER}
          />
        </div>

        <div className=" col-span-3">
          <Form.Label>Student Image</Form.Label>

          <FileUploader
            accept={FILE_TYPE.PHOTO}
            files={files}
            handleFilesChange={handleFilesChange}
            loading={loadingFiles}
            removeFiles={removeFiles}
            uploadType={"SINGLE"}
          />
          {row?.image && <ImagePreview File={row?.image} />}
        </div>

        <div className=" col-span-3">
          <Form.Label>Citizenship Copy</Form.Label>

          <FileUploader
            accept={FILE_TYPE.PHOTO}
            files={files1}
            handleFilesChange={handleFilesChange1}
            loading={loadingFiles1}
            removeFiles={removeFiles1}
            uploadType={"SINGLE"}
          />

          {row?.document && <ImagePreview File={row?.document} />}
        </div>
      </div>

      <div className=" my-3">
        <SubmitAndCancelBtn fun={closeModal} isSubmiting={isSubmitting} />
      </div>
    </form>
  );
};

export default HostelStudentForm;
