import SelectField from "@/src/Common/SelectField";
import TextInput from "@/src/Common/TextInput";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import React, { FC } from "react";
import {
  Control,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { MdDeleteForever } from "react-icons/md";

interface ReceptionRapterProps {
  fields: any;
  append: UseFieldArrayAppend<any, "educationDetails">;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  control: Control<any>;
  option: any;
}

const ReceptionRapter: FC<ReceptionRapterProps> = ({
  append,
  control,
  errors,
  fields,
  register,
  remove,
  option,
}) => {
  return (
    <div className=" my-2 wrapper">
      <div className=" flex justify-between">
        <h5 className=" mb-4 text-lg font-semibold">Education Qualification</h5>

        <button
          className="px-4 cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
          type="button"
          onClick={() => {
            append({
              educationLevel: "",
              yearOfPassing: "",
              institutionName: "",
              courseOrStream: "",
              percentageOrGpa: "",
            });
          }}
        >
          Add
        </button>
      </div>

      <div className=" space-y-3 my-2">
        {fields?.map((v: any, index: number) => (
          <div
            className=" grid  sm:grid-cols-2 
    lg:grid-cols-3 items-center py-4  px-2 space-y-5 space-x-2.5 rounded border border-gray-500"
            key={index}
          >
            <div className=" col-span-1">
              <SelectField
                control={control}
                errors={errors}
                name={`educationDetails.${index}.educationLevel`}
                options={option}
                label="Education Level"
                isRequired={true}
                validation={{ required: ErrorMessage.studyLevel }}
              />
            </div>

            <div>
              <TextInput
                errors={errors}
                label="Year of Passing"
                name={`educationDetails.${index}.yearOfPassing`}
                register={register}
                type={FORM_TYPE.NUMBER}
                required={true}
                validation={{ required: ErrorMessage.passOut }}
              />
            </div>

            <div>
              <TextInput
                errors={errors}
                label="Collage/University"
                name={`educationDetails.${index}.institutionName`}
                register={register}
                type={FORM_TYPE.TEXT}
                required={true}
                validation={{ required: ErrorMessage.college_UniversityName }}
              />
            </div>

            <div>
              <TextInput
                errors={errors}
                label="Course/Stream"
                name={`educationDetails.${index}.courseOrStream`}
                register={register}
                type={FORM_TYPE.TEXT}
                required={true}
                validation={{ required: ErrorMessage.course }}
              />
            </div>

            <div>
              <TextInput
                errors={errors}
                label="GPA or PERCENTAGE"
                name={`educationDetails.${index}.percentageOrGpa`}
                register={register}
                type={FORM_TYPE.NUMBER}
                required={true}
                step={"any"}
                validation={{ required: ErrorMessage.percentageOrGpa }}
              />
            </div>

            <div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-red-600 hover:bg-red-100 rounded transition"
                aria-label="Remove item"
              >
                <MdDeleteForever size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceptionRapter;
