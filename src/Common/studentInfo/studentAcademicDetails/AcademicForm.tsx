"use client";

import React from "react";
import TextInput from "../../TextInput";
import { FORM_TYPE } from "@/src/utils/InputType";
import {
  UseFormRegister,
  FieldArrayWithId,
  UseFormStateReturn,
  Control,
} from "react-hook-form";
import { AcademicDetail } from "@/src/lib/type";
import SelectField from "../../SelectField";

type AcademicFormProps = {
  register: UseFormRegister<{ academicDetails: AcademicDetail[] }>;
  errors: UseFormStateReturn<{ academicDetails: AcademicDetail[] }>["errors"];
  fields: FieldArrayWithId<
    { academicDetails: AcademicDetail[] },
    "academicDetails",
    "id"
  >[];
  append: (item: AcademicDetail) => void;
  remove: (index: number) => void;
  control: Control<any>;
};

const AcademicForm = ({
  register,
  errors,
  fields,
  append,
  remove,
  control,
}: AcademicFormProps) => {
  const handleAdd = () => {
    append({
      countryOfEducation: "",
      stateOfStudy: "",
      levelOfStudy: "",
      universityName: "",
      qualificationAchieved: "",
      cityOfStudy: "",
      gradingSystem: "",
      score: "",
      primaryLanguage: "",
      startDate: "",
      endDate: "",
      academicType: "",
    });
  };

  const option = [
    { label: "Post_Graduate", value: "POST_GRADUATE" },
    { label: "Unedr_Graduate", value: "UNDER_GRADUATE" },
    { label: "Grade_Twelve", value: "GRADE_TWELVE" },
    {
      label: "GRADE_TEN",
      value: "Grade_Ten",
    },
  ];

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-bold">Academic Info</h2>
        <button
          type="button"
          onClick={handleAdd}
          className=" cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border p-4 rounded-lg shadow-sm space-y-4 relative bg-white"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 text-red-500 font-bold hover:text-red-700"
            >
              X
            </button>

            {/* <TextInput
              label="Academic Type"
              register={register}
              name={`academicDetails.${index}.academicType`}
              type={FORM_TYPE.TEXT}
              required
              errors={errors}
            /> */}

            <div className="grid grid-cols-2 gap-4">
              <div className=" col-span-1 md:col-span-2">
                <SelectField
                  label="Academic Type"
                  control={control}
                  errors={errors}
                  defaultValue="POST_GRADUATE"
                  name={`academicDetails.${index}.academicType`}
                  options={option}
                />
              </div>

              <TextInput
                label="Country of Education"
                register={register}
                name={`academicDetails.${index}.countryOfEducation`}
                type={FORM_TYPE.TEXT}
                required
                errors={errors}
              />
              <TextInput
                label="State of Study"
                register={register}
                name={`academicDetails.${index}.stateOfStudy`}
                type={FORM_TYPE.TEXT}
                required
                errors={errors}
              />
              <TextInput
                label="City of Study"
                register={register}
                name={`academicDetails.${index}.cityOfStudy`}
                type={FORM_TYPE.TEXT}
                required
                errors={errors}
              />
              <TextInput
                label="University Name"
                register={register}
                name={`academicDetails.${index}.universityName`}
                type={FORM_TYPE.TEXT}
                required
                errors={errors}
              />
              <TextInput
                label="Level of Study"
                register={register}
                name={`academicDetails.${index}.levelOfStudy`}
                type={FORM_TYPE.TEXT}
                required
                errors={errors}
              />
              <TextInput
                label="Qualification Achieved"
                register={register}
                name={`academicDetails.${index}.qualificationAchieved`}
                type={FORM_TYPE.TEXT}
                required
                errors={errors}
              />
              <TextInput
                label="Grading System"
                register={register}
                name={`academicDetails.${index}.gradingSystem`}
                type={FORM_TYPE.TEXT}
                required
                errors={errors}
              />
              <TextInput
                label="Score"
                register={register}
                name={`academicDetails.${index}.score`}
                type={FORM_TYPE.NUMBER}
                required
                errors={errors}
              />
              <TextInput
                label="Primary Language"
                register={register}
                name={`academicDetails.${index}.primaryLanguage`}
                type={FORM_TYPE.TEXT}
                required
                errors={errors}
              />

              <TextInput
                label="Start Date"
                register={register}
                name={`academicDetails.${index}.startDate`}
                type={FORM_TYPE.DATE}
                required
                errors={errors}
              />

              <div className=" col-span-1 md:col-span-2">
                <TextInput
                  label="End Date"
                  register={register}
                  name={`academicDetails.${index}.endDate`}
                  type={FORM_TYPE.DATE}
                  errors={errors}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicForm;
