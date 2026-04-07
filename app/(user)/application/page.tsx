"use client";

import ReceptionRapter from "@/src/AdminPlan/Reception/ReceptionRapter";
import { PublicReception } from "@/src/ApiList/PublicApi";
import SelectField from "@/src/Common/SelectField";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextInput from "@/src/Common/TextInput";
import DynamicSelectWithOther from "@/src/lib/DynamicSelectWithOther/DynamicSelectWithOther";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import {
  counselingMode,
  LanguageTests,
  ReceptionEducationLevel,
} from "@/src/utils/options/LangOption";
import { preferredCountry } from "@/src/utils/options/preferredCountryOption";
import { reference } from "@/src/utils/options/Reference";
import { useRouter } from "next/navigation";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

const page = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      currentAddress: "",
      language: null,
      languageText: "",
      preferredCountry: null,
      preferredCountryText: "",
      reference: "",

      counselingMode: "",
      counselingDate: "",
      counselingTime: "",
      educationDetails: [
        {
          educationLevel: "",
          yearOfPassing: "",
          institutionName: "",
          courseOrStream: "",
          percentageOrGpa: "",
        },
      ],
    },
  });
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/");
  };

  const { append, fields, remove } = useFieldArray({
    control,
    name: "educationDetails",
  });

  const handleAddReception = async (data: any) => {
    const payload = {
      fullName: data.fullName,
      mobile: data.mobile,
      email: data.email,
      currentAddress: data.currentAddress,
      language:
        data.language?.value === "other"
          ? data.languageText
          : data.language?.value,
      preferredCountry:
        data.preferredCountry?.value === "other"
          ? data.preferredCountryText
          : data.preferredCountry?.value,
      reference: data.reference?.value,

      educationDetails: data?.educationDetails?.map((v: any) => ({
        educationLevel: v?.educationLevel?.value || "",
        yearOfPassing: v?.yearOfPassing || "",
        institutionName: v?.institutionName || "",
        courseOrStream: v?.courseOrStream || "",
        percentageOrGpa: v?.percentageOrGpa || "",
      })),
      counselingDate: data?.counselingDate,
      counselingTime: data?.counselingTime,
      counselingMode: data?.counselingMode?.value,
    };

    try {
      const res: any = await PublicReception(payload);
      successMessage({ message: res?.message });
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form className=" p-3" onSubmit={handleSubmit(handleAddReception)}>
      <div className=" wrapper mb-4 p-1 grid grid-cols-2  ">
        <div className=" col-span-2 md:col-span-1">
          <TextInput
            errors={errors}
            label="Full Name"
            name="fullName"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.name }}
          />
        </div>
        <div className=" col-span-2 md:col-span-1">
          <TextInput
            errors={errors}
            label="Moblie Number"
            name="mobile"
            register={register}
            type={FORM_TYPE.TEXT}
            validation={{ required: ErrorMessage.phone }}
          />
        </div>

        <div className=" col-span-2 md:col-span-1">
          <TextInput
            errors={errors}
            label="Email"
            name="email"
            register={register}
            type={FORM_TYPE.EMAIL}
            required={true}
            validation={{ required: ErrorMessage.email }}
          />
        </div>
        <div className=" col-span-2 md:col-span-1">
          <TextInput
            errors={errors}
            label="Address"
            name="currentAddress"
            register={register}
            type={FORM_TYPE.TEXT}
          />
        </div>

        <div className=" col-span-2 md:col-span-1">
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
          />
        </div>

        <div className=" col-span-2 md:col-span-1">
          <DynamicSelectWithOther
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            name="preferredCountry"
            options={preferredCountry}
            label="Preferred Country"
          />
        </div>

        <div className=" col-span-2 md:col-span-1">
          <SelectField
            control={control}
            errors={errors}
            name="reference"
            label="Reference"
            options={reference}
          />
        </div>

        <div className=" col-span-2 md:col-span-1">
          <SelectField
            control={control}
            options={counselingMode}
            isRequired={true}
            validation={{ required: ErrorMessage.counselingMode }}
            name="counselingMode"
            label="counseling Mode "
            errors={errors}
          />
        </div>

        <div className="  col-span-2 md:col-span-1">
          <TextInput
            errors={errors}
            label="counseling Date"
            name="counselingDate"
            register={register}
            type={FORM_TYPE.DATE}
            required
            validation={{ required: ErrorMessage.Date }}
          />
        </div>

        <div className=" col-span-2 md:col-span-1">
          <TextInput
            errors={errors}
            label="counseling Time "
            name="counselingTime"
            register={register}
            type={FORM_TYPE.TIME}
            required
            validation={{ required: ErrorMessage.counselingTime }}
          />
        </div>

        <div className=" col-span-2">
          <ReceptionRapter
            append={append}
            control={control}
            errors={errors}
            fields={fields}
            option={ReceptionEducationLevel}
            register={register}
            remove={remove}
          />
        </div>
      </div>

      <div>
        <SubmitAndCancelBtn isSubmiting={isSubmitting} fun={handleNavigate} />
      </div>
    </form>
  );
};

export default page;
