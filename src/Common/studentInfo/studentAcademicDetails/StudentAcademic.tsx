"use client";
import React, { FC } from "react";
import {
  useFieldArray,
  Control,
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import AcademicForm from "./AcademicForm";
import { AcademicDetail } from "@/src/lib/type";

interface StudentProps {
  register: UseFormRegister<{ academicDetails: AcademicDetail[] }>;
  watch: any;
  errors: FieldErrors<{ academicDetails: AcademicDetail[] }>;
  setValue: UseFormSetValue<{ academicDetails: AcademicDetail[] }>;
  control: Control<{ academicDetails: AcademicDetail[] }>;
  onCompleted?: () => void;
}

const StudentAcademic: FC<StudentProps> = ({
  register,
  watch,
  errors,
  setValue,
  control,
  onCompleted,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "academicDetails",
  });

  return (
    <AcademicForm
      register={register}
      errors={errors}
      fields={fields}
      append={(item: AcademicDetail) => append(item)}
      control={control}
      remove={remove}
    />
  );
};

export default StudentAcademic;
