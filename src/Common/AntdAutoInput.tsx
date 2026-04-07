import { AutoComplete, Input } from "antd";
import React, { FC } from "react";
import { Controller, UseFormRegister } from "react-hook-form";

interface AntdProps {
  control: any;
  register?: UseFormRegister<any>;
  name: string; // field name
  option: any;
  label: string;
}

const AntdAutoInput: FC<AntdProps> = ({
  control,
  register,
  name,
  label,
  option,
}) => {
  return (
    <>
      <label className=" pb-3">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: "Please select a course!" }}
        render={({ field, fieldState }) => (
          <>
            <AutoComplete
              {...field}
              {...(register ? register(name) : {})}
              options={option}
              onChange={(val) => field.onChange(val)}
              placeholder={label}
              filterOption={(inputValue: any, option: any) =>
                option!.value.toLowerCase().includes(inputValue.toLowerCase())
              }
              className=" !w-full"
            >
              <Input className="!h-[40px] !leading-[40px]" />
            </AutoComplete>
            {fieldState.error && (
              <p style={{ color: "red", marginTop: 4 }}>
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </>
  );
};

export default AntdAutoInput;
