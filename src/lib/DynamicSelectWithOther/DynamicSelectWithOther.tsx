// src/lib/DynamicSelectWithOther/DynamicSelectWithOther.tsx
import React, { useEffect } from "react";
import SelectField from "@/src/Common/SelectField";
import TextInput from "@/src/Common/TextInput";
import { FORM_TYPE } from "@/src/utils/InputType";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";

interface Option {
  value: string;
  label: string;
}

interface DynamicSelectWithOtherProps {
  control: any;
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  name: string;
  options: Option[];
  label: string;
  required?: boolean;
  initialValue?: string;
  textFieldName?: string;
}

const DynamicSelectWithOther: React.FC<DynamicSelectWithOtherProps> = ({
  control,
  register,
  errors,
  watch,
  setValue,
  name,
  options,
  label,
  required = false,
  initialValue,
  textFieldName = `${name}Text`,
}) => {
  const selection = watch(name);

  // This works whether value is object OR array[object]
  const isOther = Array.isArray(selection)
    ? selection[0]?.value === "other"
    : selection?.value === "other";

  // Auto-fill on edit mode
  useEffect(() => {
    if (initialValue === undefined) return;

    const matched = options.find((opt) => opt.value === initialValue);

    if (matched) {
      setValue(name, matched); // single object (matches SelectField behavior)
      setValue(textFieldName, "");
    } else {
      setValue(name, { value: "other", label: "Other" });
      setValue(textFieldName, initialValue || "");
    }
  }, [initialValue, options, name, textFieldName, setValue]);

  return (
    <>
      <SelectField
        control={control}
        errors={errors}
        name={name}
        options={options}
        label={label}
        isRequired={required}
      />

      {isOther && (
        <TextInput
          label={`Specify ${label}`}
          errors={errors}
          name={textFieldName}
          register={register}
          type={FORM_TYPE.TEXT}
          required={true}
          validation={{ required: `${name} is Required` }}
        />
      )}
    </>
  );
};

export default DynamicSelectWithOther;
