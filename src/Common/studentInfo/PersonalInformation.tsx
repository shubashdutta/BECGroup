"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { FORM_TYPE } from "../../utils/InputType";
import { ErrorMessage } from "../../utils/FormErrorMessage";
import SelectField from "../SelectField";
import { Gender, maritalStatusOptions } from "../../utils/options/GenderOption";
import { MapPin } from "lucide-react";
import PassportSection from "./PassportSection";
import AddressSection from "./AddressSection";
import TextInput from "../TextInput";
import NationalityInfo from "./NationalityInfo";
import BackgroundInfo from "./BackgroundInfo";
import ImportantContact from "./ImportantContact";
import { PublicApplicationGet } from "@/src/ApiList/PublicApi";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { GrDocumentImage } from "react-icons/gr";
import { RiUploadCloud2Line } from "react-icons/ri";
import DocumentFiles, { UploadedFile } from "./DocumentFiles";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import { HtmlDateFormat } from "@/src/utils/formatArrayToLocalDate";
import { AdminStudentDetails } from "@/src/ApiList/AdminApi";
import { apiRequest } from "@/src/lib/axiosSetup";

interface PersonalInformationProps {
  register: UseFormRegister<any>;
  watch: any;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  control: Control<any>;
  parentHandleSubmit: UseFormHandleSubmit<any>; // parent handleSubmit from useForm
  parentOnSubmit: (data: any) => void; // This is important for the tab submit
  setUploadedFile: React.Dispatch<
    React.SetStateAction<{ [key: string]: File[] }>
  >;

  isSubmiting?: any;
  onCompleted?: () => void;
}
const PersonalInformation: FC<PersonalInformationProps> = ({
  control,
  errors,
  parentHandleSubmit,
  register,
  setValue,
  watch,
  parentOnSubmit,
  setUploadedFile,
  isSubmiting,
  onCompleted,
}) => {
  const { openModal } = useModal();
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  setUploadedFile(uploadedFiles);

  const [sameAsMailing, setSameAsMailing] = useState(false);
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [studentDetalis, setStudentDetalis] = useState<any>();
  const [email, setEmail] = useState<string | null>(null);
  const [verfiy, setverfiy] = useState<any>();

  useEffect(() => {
    const stored = localStorage.getItem("email");
    const verfiyed: any = localStorage.getItem("isStudentVerified");
    if (stored) {
      setEmail(JSON.parse(stored));
      setverfiy(verfiyed);
    }
  }, []);

  const mailingAddress = watch("personalDetail.mailingAddress");

  const handleSameAsMailing = (checked: boolean) => {
    setSameAsMailing(checked);

    if (checked) {
      Object.entries(mailingAddress || {}).forEach(([key, value]) => {
        setValue(`personalDetail.permanentAddress.${key}`, value);
      });
    }
  };

  // const handleGetStudentinfo = async (email: any) => {
  //   const params = {
  //     statusIn: "ACTIVE",
  //     email,
  //   };

  //   const paramsStudent = {
  //     ...(verfiy === "true" ? { statusIn: "ACTIVE" } : { statusIn: "PENDING" }),
  //     email,
  //   };

  //   try {
  //     const res: any = await PublicApplicationGet(params);
  //     const studentDetalis = await AdminStudentDetails(paramsStudent);

  //     const data = res?.data;

  //     setStudentDetalis(studentDetalis?.data[0]);

  //     setStudentInfo(data);
  //   } catch (error) {
  //     errorMessage({ error });
  //   }
  // };

  const handleGetStudentinfo = async (email: any) => {
    const params = {
      // statusIn: "ACTIVE",
      email,
    };

    const paramsStudent = {
      ...(verfiy === "true" ? { statusIn: "ACTIVE" } : { statusIn: "PENDING" }),
      email,
    };

    try {
      const res: any = await PublicApplicationGet(params);
      const studentDetalis = await AdminStudentDetails(paramsStudent);

      const data = res?.data;

      setStudentDetalis(studentDetalis?.data[0]);

      setStudentInfo(data[0]);
    } catch (error) {
      errorMessage({ error });
    }
  };
  useEffect(() => {
    if (!email) return;

    handleGetStudentinfo(email);
  }, [email, verfiy]);

  const marriedStatued = maritalStatusOptions?.find(
    (v: any) => v?.value === studentDetalis?.personalDetail?.maritalStatus,
  );

  useEffect(() => {
    if (!studentInfo) return;

    // Set basic fields
    setValue("personalDetail.firstName", studentInfo.firstName);
    setValue("personalDetail.middleName", studentInfo?.middleName);
    setValue("personalDetail.lastName", studentInfo.lastName);
    setValue("personalDetail.email", studentInfo.email);
    setValue("personalDetail.mobile", studentInfo.mobileNumber);
    setValue("personalDetail.maritalStatus", marriedStatued);
    setValue(
      "personalDetail.dob",
      HtmlDateFormat(studentDetalis?.personalDetail?.dob),
    );

    // Mailing Address
    const mailing = studentDetalis?.personalDetail?.mailingAddress;
    setValue("personalDetail.mailingAddress.address1", mailing?.address1);
    setValue("personalDetail.mailingAddress.address2", mailing?.address2);
    setValue("personalDetail.mailingAddress.state", mailing?.state);
    setValue("personalDetail.mailingAddress.city", mailing?.city);
    setValue("personalDetail.mailingAddress.postcode", mailing?.postcode);

    // Permanent Address
    const permanent = studentDetalis?.personalDetail?.permanentAddress;
    setValue("personalDetail.permanentAddress.address1", permanent?.address1);
    setValue("personalDetail.permanentAddress.address2", permanent?.address2);
    setValue("personalDetail.permanentAddress.state", permanent?.state);
    setValue("personalDetail.permanentAddress.city", permanent?.city);
    setValue("personalDetail.permanentAddress.postcode", permanent?.postcode);

    // Passport Info
    const passport = studentDetalis?.personalDetail?.passportInfo;
    setValue(
      "personalDetail.passportInfo.passportNumber",
      passport?.passportNumber,
    );
    setValue("personalDetail.passportInfo.cityOfBirth", passport?.birthCity);
    setValue(
      "personalDetail.passportInfo.countryOfBirth",
      passport?.birthCountry,
    );
    setValue(
      "personalDetail.passportInfo.issuedDate",
      HtmlDateFormat(passport?.issueDate),
    );
    setValue(
      "personalDetail.passportInfo.expiryDate",
      HtmlDateFormat(passport?.expiryDate),
    );

    // Nationality
    const nationality = studentDetalis?.personalDetail?.nationalityInfo;
    setValue(
      "personalDetail.nationalityInfo.citizenship",
      nationality?.citizenship,
    );

    // Check if all required fields exist before calling onCompleted
    const allFieldsSet =
      studentInfo.firstName &&
      studentInfo.lastName &&
      studentInfo.email &&
      studentInfo.mobileNumber &&
      studentDetalis?.personalDetail?.dob &&
      mailing?.address1 &&
      mailing?.city &&
      permanent?.address1 &&
      permanent?.city &&
      passport?.passportNumber &&
      passport?.birthCity &&
      passport?.birthCountry &&
      passport?.issueDate &&
      passport?.expiryDate &&
      nationality?.citizenship;

    if (allFieldsSet) {
      onCompleted?.();
    }
  }, [studentInfo, studentDetalis, setValue]);

  return (
    <div className=" ">
      {/* <div className=" px-3 py-4 my-3 border  border-blue-600 rounded-2xl flex justify-between">
        <div className=" flex gap-x-2 items-center">
          <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
            <GrDocumentImage className="text-blue-600" size={20} />
          </div>

          <div className=" text-sky-900 font-semibold">
            Uplaod Student Document
          </div>
        </div>

        <div
          onClick={handleAddDocument}
          className=" rounded-2xl  bg-[#ECE8FF] text-blue-900 cursor-pointer  flex items-center gap-x-3 p-2"
        >
          <span>
            <RiUploadCloud2Line className=" text-blue-700" size={20} />
          </span>
          Upload Document
        </div>
      </div> */}

      <div className="flex items-center gap-x-3 p-4">
        <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
          <FaRegUser className="text-blue-600" size={20} />
        </div>

        <div className="text-blue-600 font-semibold">Personal Information</div>
      </div>

      <div className=" py-3  border-b  border-b-gray-200 grid  grid-cols-1 md:grid-cols-3  gap-1 md:gap-3">
        <div className=" col-span-1">
          <TextInput
            label="First Name"
            register={register}
            type={FORM_TYPE.TEXT}
            name={`personalDetail.firstName`}
            required
            validation={{ required: ErrorMessage.firstName }}
            errors={errors}
          />
        </div>
        <div className="col-span-1">
          <TextInput
            label="Middle Name"
            register={register}
            type={FORM_TYPE.TEXT}
            name={`personalDetail.middleName`}
            errors={errors}
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            label="Last Name"
            register={register}
            type={FORM_TYPE.TEXT}
            name={`personalDetail.lastName`}
            required
            validation={{ required: ErrorMessage.lastName }}
            errors={errors}
          />
        </div>

        <div className="col-span-1 ">
          <TextInput
            label="Email"
            name="personalDetail.email"
            register={register}
            type={FORM_TYPE.EMAIL}
            errors={errors}
            required
            disabled={!!studentInfo?.email}
            validation={{ required: ErrorMessage.email }}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            label="Mobile Number"
            name="personalDetail.mobile"
            register={register}
            errors={errors}
            type={FORM_TYPE.NUMBER}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            label="DOB"
            name="personalDetail.dob"
            register={register}
            type={FORM_TYPE.DATE}
            required={true}
            validation={{ required: ErrorMessage.dob }}
            errors={errors}
          />
        </div>

        {/* <div className=" col-span-1">
          <SelectField
            control={control}
            errors={errors}
            name=""
            options={Gender}
            label="Gender"
          />
        </div> */}
        <div className="md:col-span-3 col-span-1">
          <SelectField
            control={control}
            errors={errors}
            name="personalDetail.maritalStatus"
            options={maritalStatusOptions}
            label="Marital Status"
          />
        </div>
      </div>

      <AddressSection
        title="Mailing Address"
        prefix="personalDetail.mailingAddress"
        register={register}
        setValue={setValue}
        errors={errors}
        control={control}
      />

      <div className=" bg-white ">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-x-3 p-4">
            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
              <MapPin className="text-blue-600" size={20} />
            </div>

            <div className="text-blue-600 font-semibold">Permanent Address</div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={sameAsMailing}
              onChange={(e) => handleSameAsMailing(e.target.checked)}
            />
            Same as mailing address
          </label>
        </div>

        <AddressSection
          prefix="personalDetail.permanentAddress"
          register={register}
          setValue={setValue}
          errors={errors}
          disabled={sameAsMailing}
          control={control}
        />
      </div>

      <PassportSection
        errors={errors}
        prefix="personalDetail.passportInfo"
        register={register}
        setValue={setValue}
        title="Passport"
      />

      <NationalityInfo
        errors={errors}
        prefix="personalDetail.nationalityInfo"
        register={register}
        setValue={setValue}
        title="Nationality"
      />

      <BackgroundInfo
        prefix="personalDetail.backgroundInfo"
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
      />

      <ImportantContact
        errors={errors}
        prefix="personalDetail.importantContact"
        register={register}
        setValue={setValue}
        title="Important Contact"
      />

      <div className=" flex justify-end py-5 ">
        {/* <button
          type="submit"
          onClick={parentHandleSubmit(parentOnSubmit)}
          className=" bg-blue-500 text-white p-4 rounded cursor-pointer"
        >
          Submit
        </button> */}

        <button
          type="submit"
          onClick={parentHandleSubmit(parentOnSubmit)}
          disabled={isSubmiting}
          className={`bg-blue-500 text-white px-3 py-4 rounded flex items-center gap-2
      ${isSubmiting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
    `}
        >
          {isSubmiting ? (
            <>
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

export default PersonalInformation;
