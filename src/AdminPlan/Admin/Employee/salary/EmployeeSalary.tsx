import { GetEmployee } from "@/src/ApiList/AdminApi";
import SelectField from "@/src/Common/SelectField";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextInput from "@/src/Common/TextInput";
import { apiRequest } from "@/src/lib/axiosSetup";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface SalaryProps {
  row?: any;
  fun?: any;
}

const EmployeeSalary: FC<SalaryProps> = ({ fun, row }) => {
  const {
    control,
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      salary: "",
    },
  });

  const { closeModal } = useModal();

  const handleSalary = async (data: any) => {
    const payload = {
      id: row?.id,
      salary: data?.salary,
    };

    try {
      const res: any = await apiRequest.post("api/user/salary/add", payload);
      successMessage({ message: res?.message });
      closeModal();
      fun();
    } catch (error) {
      errorMessage({ error });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSalary)}>
      <div className=" wrapper p-3  mb-3 grid grid-cols-1">
        <TextInput
          errors={errors}
          label="Salary"
          name="salary"
          register={register}
          type={FORM_TYPE.TEXT}
          required={true}
          validation={{ required: ErrorMessage.salary }}
        />
      </div>

      <SubmitAndCancelBtn isSubmiting={isSubmitting} fun={closeModal} />
    </form>
  );
};

export default EmployeeSalary;
