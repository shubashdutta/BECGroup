import React, { FC, useEffect } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { PiArrowsSplitDuotone } from "react-icons/pi";
import { FORM_TYPE } from "../../utils/InputType";
import { FaPassport } from "react-icons/fa";
import TextInput from "../TextInput";

interface Passport {
  title: string;
  prefix: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  defaultCountry?: string;
}

const PassportSection: FC<Passport> = ({
  errors,
  prefix,
  register,
  setValue,
  title,
  defaultCountry = "Nepal",
}) => {
  useEffect(() => {
    setValue(`${prefix}.issueCountry`, defaultCountry);
  }, [setValue, prefix, defaultCountry]);
  return (
    <div className=" bg-white border-b border-b-gray-200 py-3">
      <div className=" flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
          <FaPassport className="text-blue-600" size={20} />
        </div>
        <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className=" col-span-1">
          <TextInput
            label="Passport Number"
            name={`${prefix}.passportNumber`}
            register={register}
            // required
            // validation={{ required: "passportNumber is required" }}
            errors={errors}
            type={FORM_TYPE.TEXT}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            label="Issued Date"
            name={`${prefix}.issuedDate`}
            register={register}
            // required
            // validation={{ required: "issued Date is required" }}
            errors={errors}
            type={FORM_TYPE.DATE}
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            label="Expiry Date"
            name={`${prefix}.expiryDate`}
            register={register}
            // required
            // validation={{ required: "expiryDate is required" }}
            errors={errors}
            type={FORM_TYPE.DATE}
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            label="Issue Country"
            name={`${prefix}.issueCountry`}
            register={register}
            // required
            // disabled
            // validation={{ required: "issueCountry is required" }}
            errors={errors}
            type={FORM_TYPE.TEXT}
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            label="City Of Birth"
            name={`${prefix}.cityOfBirth`}
            register={register}
            // required
            // validation={{ required: "cityOfBirth is required" }}
            errors={errors}
            type={FORM_TYPE.TEXT}
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            label="Country Of Birth"
            name={`${prefix}.countryOfBirth`}
            register={register}
            // required
            // validation={{ required: "countryOfBirth is required" }}
            errors={errors}
            type={FORM_TYPE.TEXT}
          />
        </div>
      </div>
    </div>
  );
};

export default PassportSection;
