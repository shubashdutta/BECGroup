import { LucideBadgeInfo } from "lucide-react";
import React, { FC } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
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

const ImportantContact: FC<Passport> = ({
  errors,
  prefix,
  register,
  setValue,
  title,
  defaultCountry,
}) => {
  return (
    <div className=" bg-white border-b border-b-gray-200 py-3">
      <div className=" flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
          <LucideBadgeInfo className="text-blue-600" size={20} />
        </div>
        <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className=" col-span-1">
          <TextInput
            label="Name"
            name={`${prefix}.name`}
            errors={errors}
            register={register}
            type={FORM_TYPE.TEXT}
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            label="Phone"
            name={`${prefix}.phone`}
            errors={errors}
            register={register}
            type={FORM_TYPE.TEXT}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            label="Email"
            name={`${prefix}.email`}
            errors={errors}
            register={register}
            type={FORM_TYPE.EMAIL}
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            label="Relation"
            name={`${prefix}.relation`}
            errors={errors}
            register={register}
            type={FORM_TYPE.TEXT}
          />
        </div>
      </div>
    </div>
  );
};

export default ImportantContact;
