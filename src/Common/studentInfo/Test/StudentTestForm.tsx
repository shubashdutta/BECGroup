import { TestType } from "@/src/lib/type";
import React, { FC } from "react";
import {
  Control,
  FieldArrayWithId,
  UseFormRegister,
  UseFormStateReturn,
} from "react-hook-form";
import TextInput from "../../TextInput";
import { FORM_TYPE } from "@/src/utils/InputType";
import SelectField from "../../SelectField";

interface TestProps {
  register: UseFormRegister<{ testDetails: TestType[] }>;
  errors: UseFormStateReturn<{ testDetails: TestType[] }>["errors"];
  fields: FieldArrayWithId<{ testDetails: TestType[] }, "testDetails", "id">[];
  append: (item: TestType) => void;
  remove: (index: number) => void;
  control: Control<any>;
}

const StudentTestForm: FC<TestProps> = ({
  append,
  control,
  errors,
  fields,
  register,
  remove,
}) => {
  const handleAdd = () => {
    append({
      testType: "",
      overallScore: 0,
      examDate: "",
      quantitative: 0,
      verbal: 0,
      analyticWriting: "",
      integratedReasoning: 0,
      isResultReceivable: false,

      resultDate: "",
      hasWaiver: false,
      listening: 0,
      reading: 0,
      speaking: 0,
      writing: 0,
      englishMarks12th: 0,
      mediumOfInstruction: "",
    });
  };

  const option = [
    { label: "GRE", value: "GRE" },
    { label: "GMAT", value: "GMAT" },

    // English Proficiency Tests
    { label: "IELTS", value: "IELTS" },
    { label: "TOEFL", value: "TOEFL" },
    { label: "PTE", value: "PTE" },
    { label: "DTE", value: "DTE" },
    { label: "SAT", value: "SAT" },
    { label: "ACT", value: "ACT" },
  ];
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-bold">Test Info</h2>
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

            {/* <div className="grid grid-cols-2 gap-4">
              <div className=" col-span-1 md:col-span-2">
                <SelectField
                  label="Test Type"
                  control={control}
                  errors={errors}
                  name={`testDetails.${index}.testType`}
                  options={option}
                />
              </div>

              <div>
                <label>Overall Score</label>
                <input
                  type="number"
                  {...register(`testDetails.${index}.overallScore`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                  className="w-full border px-2 py-2 rounded"
                  placeholder="Overall Score"
                />
              </div>
              <TextInput
                label="Exam Date"
                register={register}
                name={`testDetails.${index}.examDate`}
                type={FORM_TYPE.DATE}
                errors={errors}
              />
              <div>
                <label>Quantitative</label>
                <input
                  type="number"
                  {...register(`testDetails.${index}.quantitative`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                  className="w-full border px-2 py-2 rounded"
                  placeholder="Quantitative"
                />
              </div>
              <div>
                <label>Verbal</label>
                <input
                  type="number"
                  {...register(`testDetails.${index}.verbal`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                  className="w-full border px-2 py-2 rounded"
                  placeholder="Verbal"
                />
              </div>
              <TextInput
                label="Analytic Writing"
                register={register}
                name={`testDetails.${index}.analyticWriting`}
                type={FORM_TYPE.TEXT}
                errors={errors}
              />
              <div>
                <label>Integrated Reasoning</label>
                <input
                  type="number"
                  {...register(`testDetails.${index}.integratedReasoning`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                  className="w-full border px-2 py-2 rounded"
                  placeholder="Integrated Reasoning"
                />
              </div>
              <div>
                <label>English Marks 12th</label>
                <input
                  type="number"
                  {...register(`testDetails.${index}.englishMarks12th`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                  className="w-full border px-2 py-2 rounded"
                  placeholder="English Marks 12th"
                />
              </div>
              <TextInput
                label="Medium Of Instruction"
                register={register}
                name={`testDetails.${index}.mediumOfInstruction`}
                type={FORM_TYPE.TEXT}
                errors={errors}
              />

              <div className=" col-span-2">
                <TextInput
                  label="Result Date"
                  register={register}
                  name={`testDetails.${index}.resultDate`}
                  type={FORM_TYPE.DATE}
                  errors={errors}
                />
              </div>

              <div className=" mt-3">
                <TextInput
                  label="is Result Receivable"
                  register={register}
                  name={`testDetails.${index}.isResultReceivable`}
                  type={FORM_TYPE.CHECKBOX}
                  errors={errors}
                />
              </div>

              <div className=" mt-6 ml-7">
                <TextInput
                  label="Has Waiver"
                  register={register}
                  name={`testDetails.${index}.hasWaiver`}
                  type={FORM_TYPE.CHECKBOX}
                  errors={errors}
                />
              </div>
            </div> */}

            <div className="grid grid-cols-2 gap-4">
              <div className=" col-span-1 md:col-span-2">
                <SelectField
                  label="Test Type"
                  control={control}
                  errors={errors}
                  name={`testDetails.${index}.testType`}
                  options={option}
                />
              </div>

              <div>
                <label>Overall Score</label>
                <input
                  type="number"
                  {...register(`testDetails.${index}.overallScore`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                  className="w-full border px-2 py-2 rounded"
                  placeholder="Overall Score"
                />
              </div>

              <TextInput
                label="Exam Date"
                register={register}
                name={`testDetails.${index}.examDate`}
                type={FORM_TYPE.DATE}
                errors={errors}
              />

              <div>
                <label>Quantitative</label>
                <input
                  type="number"
                  {...register(`testDetails.${index}.quantitative`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                  className="w-full border px-2 py-2 rounded"
                  placeholder="Quantitative"
                />
              </div>

              <div>
                <label>Verbal</label>
                <input
                  type="number"
                  {...register(`testDetails.${index}.verbal`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                  className="w-full border px-2 py-2 rounded"
                  placeholder="Verbal"
                />
              </div>

              <TextInput
                label="Analytic Writing"
                register={register}
                name={`testDetails.${index}.analyticWriting`}
                type={FORM_TYPE.TEXT}
                errors={errors}
              />

              <div>
                <label>Integrated Reasoning</label>
                <input
                  type="number"
                  {...register(`testDetails.${index}.integratedReasoning`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                  className="w-full border px-2 py-2 rounded"
                  placeholder="Integrated Reasoning"
                />
              </div>

              <div>
                <label>English Marks 12th</label>
                <input
                  type="number"
                  {...register(`testDetails.${index}.englishMarks12th`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                  className="w-full border px-2 py-2 rounded"
                  placeholder="English Marks 12th"
                />
              </div>

              <TextInput
                label="Medium Of Instruction"
                register={register}
                name={`testDetails.${index}.mediumOfInstruction`}
                type={FORM_TYPE.TEXT}
                errors={errors}
              />

              {/* New Number Inputs for Listening, Reading, Speaking, Writing */}
              <div>
                <label>Listening</label>
                <input
                  type="number"
                  {...register(`testDetails.${index}.listening`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                  className="w-full border px-2 py-2 rounded"
                  placeholder="Listening"
                />
              </div>

              <div>
                <label>Reading</label>
                <input
                  type="number"
                  {...register(`testDetails.${index}.reading`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                  className="w-full border px-2 py-2 rounded"
                  placeholder="Reading"
                />
              </div>

              <div>
                <label>Speaking</label>
                <input
                  type="number"
                  {...register(`testDetails.${index}.speaking`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                  className="w-full border px-2 py-2 rounded"
                  placeholder="Speaking"
                />
              </div>

              <div>
                <label>Writing</label>
                <input
                  type="number"
                  {...register(`testDetails.${index}.writing`, {
                    valueAsNumber: true,
                  })}
                  defaultValue={0}
                  className="w-full border px-2 py-2 rounded"
                  placeholder="Writing"
                />
              </div>

              <div className=" col-span-2">
                <TextInput
                  label="Result Date"
                  register={register}
                  name={`testDetails.${index}.resultDate`}
                  type={FORM_TYPE.DATE}
                  errors={errors}
                />
              </div>

              <div className=" mt-3">
                <TextInput
                  label="is Result Receivable"
                  register={register}
                  name={`testDetails.${index}.isResultReceivable`}
                  type={FORM_TYPE.CHECKBOX}
                  errors={errors}
                />
              </div>

              <div className=" mt-6 ml-7">
                <TextInput
                  label="Has Waiver"
                  register={register}
                  name={`testDetails.${index}.hasWaiver`}
                  type={FORM_TYPE.CHECKBOX}
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

export default StudentTestForm;
