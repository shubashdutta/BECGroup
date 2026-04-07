"Use Clinet";

import React, { FC } from "react";
import {
  Control,
  FieldError,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import TextInput from "../TextInput";
import { FORM_TYPE } from "@/src/utils/InputType";
import { MdDeleteForever } from "react-icons/md";

interface CouncileRapterProps {
  fields: any;
  append: UseFieldArrayAppend<any, "academicList">;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  control: Control<any>;
}

const CouncilRapter: FC<CouncileRapterProps> = ({
  append,
  control,
  errors,
  fields,
  register,
  remove,
}) => {
  return (
    <div className="  my-2 wrapper">
      <div className=" flex justify-between">
        <h5 className="mb-4 text-lg font-semibold">Academic Info</h5>

        <button
          className="px-4 cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
          type="button"
          onClick={() => {
            append({
              grade: "",
              passedYear: "",
              collegeName: "",
              subject: "",
              percentage: "",
            });
          }}
        >
          Add
        </button>
      </div>

      <div className=" space-y-3 my-2">
        {fields?.map((v: any, index: number) => (
          <div
            className="  grid grid-cols-6 items-center py-4 px-2 space-y-5 space-x-2.5 rounded border border-gray-500"
            key={index}
          >
            <div className="col-span-3">
              <TextInput
                register={register}
                label="Grade"
                errors={errors}
                type={FORM_TYPE.TEXT}
                name={`academicList.${index}.grade`}
              />
            </div>
            <div className="  col-span-3">
              <TextInput
                errors={errors}
                name={`academicList.${index}.passedYear`}
                label="Passed Year"
                register={register}
                type={FORM_TYPE.TEXT}
              />
            </div>

            <div className=" col-span-3">
              <TextInput
                errors={errors}
                register={register}
                type={FORM_TYPE.TEXT}
                name={`academicList.${index}.collegeName`}
                label="College Name"
              />
            </div>

            <div className=" col-span-3">
              <TextInput
                errors={errors}
                name={`academicList.${index}.subject`}
                register={register}
                type={FORM_TYPE.TEXT}
                label="Subject"
              />
            </div>

            <div className=" col-span-5">
              <TextInput
                name={`academicList.${index}.percentage`}
                errors={errors}
                register={register}
                type={FORM_TYPE.NUMBER}
                label="Percentage"
                max={100}
                min={0}
              />
            </div>
            <div className=" col-span-1">
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

export default CouncilRapter;
