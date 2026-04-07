"use client";
import {
  GetUniversityResult,
  PublicStudentRegister,
} from "@/src/ApiList/PublicApi";
import SelectField from "@/src/Common/SelectField";
import TextInput from "@/src/Common/TextInput";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { Gender } from "@/src/utils/options/GenderOption";
import { StudyArea, StudyLevel } from "@/src/utils/options/StudyArea";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

const page = () => {
  const router = useRouter();

  const [country, setCountry] = useState([]);
  const [intake, setInTake] = useState([]);

  const handleGetIntake = async () => {
    const params = {
      intakeYear: "intakeYear",
    };

    try {
      const res: any = await GetUniversityResult(params);
      const data = res?.data?.map((v: any) => ({
        label: v,
        value: v,
      }));
      setInTake(data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleGetCountry = async () => {
    const params = {
      country: "country",
    };
    try {
      const res: any = await GetUniversityResult(params);
      const data = res?.data?.map((v: any) => ({
        label: v,
        value: v,
      }));
      setCountry(data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetCountry();
    handleGetIntake();
  }, []);

  const pathname = usePathname();
  const userId = pathname.split("/")[2];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      gender: "",
      study: "",
      studyLevel: "",
      studyArea: "",
      studyYear: "",
      currentCountry: "",
    },
  });

  const handleSubmitForm = async (data: any) => {
    const { gender, study, studyArea, studyLevel, studyYear, ...rest } = data;
    const payload = {
      gender: gender?.value,
      study: study?.value,
      studyArea: studyArea?.value,
      studyLevel: studyLevel?.value,
      year: studyYear?.value,

      studentType: "INTERNAL",

      assigens: [Number(userId)],
      ...rest,
    };
    try {
      const res: any = await PublicStudentRegister(payload);

      successMessage({ message: res?.message });
      router.push(`/otp-verfiy?email=${encodeURIComponent(data?.email)}`);
    } catch (error) {
      errorMessage({ error });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
        <div className=" col-span-1">
          <TextInput
            name="firstName"
            label="First Name"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.firstName }}
            errors={errors}
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            name="middleName"
            label="Middle  Name"
            register={register}
            type={FORM_TYPE.TEXT}
            errors={errors}
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            name="lastName"
            label="Last Name"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.lastName }}
            errors={errors}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            label="Mobile Number"
            name="mobileNumber"
            register={register}
            type={FORM_TYPE.TEXT}
            errors={errors}
            required={true}
            validation={{ required: ErrorMessage.phone }}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            label="Email"
            name="email"
            register={register}
            type={FORM_TYPE.EMAIL}
            required={true}
            validation={{ required: ErrorMessage.email }}
            errors={errors}
          />
        </div>

        <div className=" col-span-1">
          <SelectField
            control={control}
            name="gender"
            options={Gender}
            label="Gender"
            isRequired={true}
            validation={{ required: ErrorMessage.gender }}
            errors={errors}
          />
        </div>

        <div className=" col-span-1 ">
          <SelectField
            label="What Study Area"
            control={control}
            name="studyArea"
            options={StudyArea}
            isRequired={true}
            validation={{ required: ErrorMessage.course }}
            errors={errors}
          />
          {/* <TextInput
            label="What to Study"
            name="study"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.course }}
            errors={errors}
          /> */}
        </div>
        {/* <div className=" col-span-1 ">
          <TextInput
            label="Study Area"
            name="studyArea"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.course }}
            errors={errors}
          />
        </div> */}

        <div className=" col-span-1">
          <SelectField
            control={control}
            label="What Study Level"
            name="studyLevel"
            options={StudyLevel}
            isRequired={true}
            validation={{ required: ErrorMessage.studyLevel }}
            errors={errors}
          />
          {/* <TextInput
            label="Degree Level"
            name="studyLevel"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.studyLevel }}
            errors={errors}
          /> */}
        </div>

        <div className=" col-span-1">
          <SelectField
            control={control}
            errors={errors}
            name={"studyYear"}
            label="InTake Year"
            options={intake}
            isRequired={true}
            validation={{ required: ErrorMessage.intake }}
          />
          {/* <TextInput
            label="InTake Year"
            name="studyYear"
            register={register}
            errors={errors}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.intake }}
          /> */}
        </div>

        <div className=" col-span-1">
          <SelectField
            control={control}
            errors={errors}
            name="study"
            options={country}
            label="Where To Study"
            isRequired={true}
            validation={{ required: ErrorMessage.studyCountry }}
          />
          {/* <TextInput
            label="Where to Study"
            name="studyCountry"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.studyCountry }}
            errors={errors}
          /> */}
        </div>

        <div className=" col-span-1">
          <TextInput
            label="Where are you from "
            name="currentCountry"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.Address }}
            errors={errors}
          />
        </div>
      </div>

      <div className="py-7 px-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
             cursor-pointer w-full h-12 sm:h-14 rounded-full
            flex items-center justify-center gap-2
            px-8
            text-white text-base sm:text-lg font-semibold
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
            }
          `}
        >
          {isSubmitting && (
            <svg
              aria-hidden="true"
              role="status"
              className="w-5 h-5 animate-spin"
              viewBox="0 0 100 101"
              fill="none"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539"
                fill="currentColor"
              />
            </svg>
          )}

          <span>{isSubmitting ? "Submitting..." : "Submit Application"}</span>
        </button>
      </div>
    </form>
  );
};

export default page;
