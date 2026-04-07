"use client";

import React, { useEffect, useRef } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  Control,
} from "react-hook-form";
import { MapPin } from "lucide-react";
import TextInput from "../TextInput";
import { FORM_TYPE } from "@/src/utils/InputType";
import SelectField from "../SelectField";
import { Country, nepalProvinces } from "@/src/utils/nepalProvinces";

type AddressSectionProps = {
  title?: string; // Mailing Address / Permanent Address
  prefix: string; // personalDetail.mailingAddress
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  defaultCountry?: string;
  disabled?: boolean;
  control: Control<any>;
};

const AddressSection = ({
  title,
  prefix,
  register,
  errors,
  setValue,
  defaultCountry = "Nepal",
  disabled = false,
  control,
}: AddressSectionProps) => {
  const isCountrySet = useRef(false);

  // Set default country ONLY once
  useEffect(() => {
    if (!isCountrySet.current && defaultCountry) {
      setValue(`${prefix}.country`, defaultCountry);
      isCountrySet.current = true;
    }
  }, [defaultCountry, prefix, setValue]);

  return (
    <div className="bg-white border-b border-gray-200 py-3">
      {title && (
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
            <MapPin className="text-blue-600" size={20} />
          </div>
          <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
        </div>
      )}

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {/* Address 1 */}
        <TextInput
          label="Address 1"
          name={`${prefix}.address1`}
          register={register}
          // required
          disabled={disabled}
          // validation={{ required: "Address 1 is required" }}
          errors={errors}
          type={FORM_TYPE.TEXT}
        />

        {/* Address 2 */}
        <TextInput
          label="Address 2"
          name={`${prefix}.address2`}
          register={register}
          disabled={disabled}
          errors={errors}
          type={FORM_TYPE.TEXT}
        />

        {/* Country */}
        <TextInput
          label="Country"
          name={`${prefix}.country`}
          register={register}
          // required
          // disabled
          // validation={{ required: "Country is required" }}
          errors={errors}
          type={FORM_TYPE.TEXT}
        />

        {/* <SelectField
          label="Country"
          name={`${prefix}.country`}
          errors={errors}
          control={control}
          isRequired={true}
          validation={{ required: "Country is required" }}
          options={Country}
        /> */}

        {/* State */}

        {/* <SelectField
          control={control}
          label="State"
          errors={errors}
          name={`${prefix}.state`}
          isRequired={true}
          validation={{ required: "State is required" }}
          options={nepalProvinces}
        /> */}
        <TextInput
          label="State"
          name={`${prefix}.state`}
          register={register}
          // required
          // disabled={disabled}
          // validation={{ required: "State is required" }}
          errors={errors}
          type={FORM_TYPE.TEXT}
        />

        {/* City */}
        <TextInput
          label="City"
          name={`${prefix}.city`}
          register={register}
          // required
          // disabled={disabled}
          // validation={{ required: "City is required" }}
          errors={errors}
          type={FORM_TYPE.TEXT}
        />

        {/* Postcode */}
        <TextInput
          label="Postcode"
          name={`${prefix}.postcode`}
          register={register}
          // required
          // disabled={disabled}
          // validation={{ required: "Postcode is required" }}
          errors={errors}
          type={FORM_TYPE.TEXT}
        />
      </div>
    </div>
  );
};

export default AddressSection;
