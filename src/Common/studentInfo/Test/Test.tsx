import { TestType } from "@/src/lib/type";
import React, { FC } from "react";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  UseFormStateReturn,
} from "react-hook-form";
import StudentTestForm from "./StudentTestForm";

interface TestProps {
  register: UseFormRegister<{ testDetails: TestType[] }>;
  watch: any;
  errors: FieldErrors<{ testDetails: TestType[] }>;
  setValue: UseFormSetValue<{ testDetails: TestType[] }>;
  control: Control<{ testDetails: TestType[] }>;
}

const Test: FC<TestProps> = ({ control, errors, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "testDetails",
  });

  return (
    <StudentTestForm
      register={register}
      control={control}
      errors={errors}
      fields={fields}
      append={(item: TestType) => append(item)}
      remove={remove}
    />
  );
};

export default Test;
