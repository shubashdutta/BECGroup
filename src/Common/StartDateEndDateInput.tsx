import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FORM_TYPE } from "../utils/InputType";
import { Form } from "react-bootstrap";

interface DateProps {
  onDateChange: any;
}

const StartDateEndDateInput: FC<DateProps> = ({ onDateChange }) => {
  const { register, watch } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    onDateChange({ startDate, endDate });
  }, [startDate, endDate]);

  return (
    <div className="grid grid-cols-2 gap-4 items-end">
      <div className="flex flex-col gap-1">
        <Form.Label className="text-sm font-medium text-gray-700">
          Start Date
        </Form.Label>
        <input
          type={FORM_TYPE.DATE}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("startDate")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Form.Label className="text-sm font-medium text-gray-700">
          End Date
        </Form.Label>
        <input
          type={FORM_TYPE.DATE}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("endDate")}
        />
      </div>
    </div>
  );
};

export default StartDateEndDateInput;
