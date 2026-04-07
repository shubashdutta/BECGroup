import { GetUniversityResult } from "@/src/ApiList/PublicApi";
import { FILE_TYPE } from "@/src/Common/fileUpload/FileType";
import { FileUploader } from "@/src/Common/fileUpload/fileUploader";
import { useFileInput } from "@/src/Common/fileUpload/useFile";
import SelectField from "@/src/Common/SelectField";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
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
import { useConsultingStudent } from "@/store/useStudentConsulting";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface offerProps {
  fun: any;
  row?: any;
}

const AddOfferLatter: FC<offerProps> = ({ fun, row }) => {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: row?.title ?? "",
      country: "",
      universityName: row?.universityName ?? "",
      courseName: row?.courseName ?? "",
    },
  });

  const [countryList, setCountryList] = useState([]);

  const consultingStudent = useConsultingStudent(
    (state) => state?.consultingStudent,
  );
  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "PDF_PHOTO");
  const { closeModal } = useModal();
  const studyCountry: any = countryList?.find(
    (v: any) => v?.value === row?.country,
  );

  const handleGetCountryList = async () => {
    const params = {
      country: "country",
    };
    try {
      const res: any = await GetUniversityResult(params);
      const data = res?.data?.map((v: any) => ({
        label: v,
        value: v,
      }));
      setCountryList(data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    if (countryList && row) {
      setValue("country", studyCountry);
    }
  }, [countryList, row]);
  useEffect(() => {
    handleGetCountryList();
  }, []);
  const handleAddOfferLatter = async (data: any) => {
    const { country, ...rest } = data;

    const payload = {
      ...(row ? { id: row?.id } : { studentId: consultingStudent?.id }),
      country: country?.value,
      ...rest,
    };
    const fromData: any = new FormData();

    fromData.append("offerLetter", JSON.stringify(payload));

    if (files) {
      files?.forEach((v: any) => fromData.append("files", v?.rest));
    } else {
      fromData.append("files", null);
    }

    try {
      const res: any = row
        ? await apiRequest.post("api/offer-letter/update", fromData)
        : await apiRequest.post("api/offer-letter/create", fromData);

      successMessage({ message: res?.message });
      fun();
      closeModal();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleAddOfferLatter)} className="">
      <div className=" grid grid-cols-2 wrapper gap-2 mb-1  max-h-96 overflow-y-auto">
        <TextInput
          errors={errors}
          label="Title"
          name="title"
          register={register}
          type={FORM_TYPE.TEXT}
          required={true}
          validation={{ required: ErrorMessage.Title }}
        />

        {/* <TextInput
          errors={errors}
          label="Country"
          name="country"
          register={register}
          type={FORM_TYPE.TEXT}
          required
          validation={{ required: ErrorMessage.countryName }}
        /> */}

        <SelectField
          control={control}
          errors={errors}
          label="Country"
          name="country"
          // register={register}
          // type={FORM_TYPE.TEXT}
          options={countryList}
          isRequired
          validation={{ required: ErrorMessage.countryName }}
        />

        <TextInput
          errors={errors}
          label="university Name"
          name="universityName"
          register={register}
          type={FORM_TYPE.TEXT}
          required
          validation={{ required: ErrorMessage.universityName }}
        />
        <TextInput
          errors={errors}
          label="Course Name"
          name="courseName"
          register={register}
          type={FORM_TYPE.TEXT}
          required
          validation={{ required: ErrorMessage.course }}
        />

        <div className=" col-span-2">
          <FileUploader
            accept={FILE_TYPE.PDF_PHOTO}
            files={files}
            handleFilesChange={handleFilesChange}
            loading={loadingFiles}
            removeFiles={removeFiles}
            uploadType={"SINGLE"}
          />

          {row?.files?.length > 0 && <ImagePreview File={row?.files} />}
        </div>
      </div>

      <SubmitAndCancelBtn fun={closeModal} isSubmiting={isSubmitting} />
    </form>
  );
};

export default AddOfferLatter;
