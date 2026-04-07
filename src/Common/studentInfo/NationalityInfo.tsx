import React, { FC, useEffect } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FaFlag } from "react-icons/fa";
import TextInput from "../TextInput";
import { FORM_TYPE } from "@/src/utils/InputType";

interface Passport {
  title: string;
  prefix: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  defaultCountry?: string;
}

const NationalityInfo: FC<Passport> = ({
  errors,
  prefix,
  register,
  setValue,
  title,
  defaultCountry = "Nepal",
}) => {
  useEffect(() => {
    setValue(`${prefix}.nationality`, defaultCountry);
    setValue(`${prefix}.isMultipleCitizen`, false);
    setValue(`${prefix}.multipleCitizenshipCountry`, "");
    setValue(`${prefix}.isStudyingOtherCountry`, false);
    setValue(`${prefix}.studyingCountry`, "");
  }, [setValue, prefix, defaultCountry]);
  return (
    <div className=" bg-white border-b border-b-gray-200 py-3">
      <div className=" flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
          <FaFlag className="text-blue-600" size={20} />
        </div>
        <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className=" col-span-1">
          <TextInput
            label="Nationality"
            name={`${prefix}.nationality`}
            errors={errors}
            register={register}
            type={FORM_TYPE.TEXT}
            // disabled
            // required
            // validation={{ required: "Nationality is required" }}
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            label="Citizenship"
            name={`${prefix}.citizenship`}
            errors={errors}
            register={register}
            type={FORM_TYPE.TEXT}
            // required
            // validation={{ required: "citizenship Number is required" }}
          />
        </div>
      </div>
    </div>
  );
};

export default NationalityInfo;
