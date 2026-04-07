import React, { FC, useEffect } from "react";
import {
  useFieldArray,
  UseFormRegister,
  Control,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import TextInput from "@/src/Common/TextInput";
import { FORM_TYPE } from "@/src/utils/InputType";
import { MdDeleteForever } from "react-icons/md";

interface CasLattersRapterProps {
  control: Control<any>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  name: string;
  label: string;
  initialCasLetters?: any[];
  setValue?: UseFormSetValue<any>;
}

const CasLattersRapter: FC<CasLattersRapterProps> = ({
  control,
  register,
  errors,
  name,
  label,
  initialCasLetters = [],
  setValue,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  // Set initial values if provided
  useEffect(() => {
    if (initialCasLetters && initialCasLetters.length > 0 && setValue) {
      // Only set initial values if no fields exist yet
      if (fields.length === 0) {
        initialCasLetters.forEach((casLetter, index) => {
          if (index === 0) {
            // Set the first CAS letter values
            setValue(`${name}.0.casId`, casLetter.casId);
            setValue(`${name}.0.password`, casLetter.password);
          } else {
            // Add additional CAS letters
            append({ casId: casLetter.casId, password: casLetter.password });
          }
        });
      }
    }
  }, [initialCasLetters, name, setValue, fields.length, append]);

  return (
    <div className="space-y-3">
      <div className="flex justify-end items-center">
        <button
          className="px-4 py-2 mr-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
          type="button"
          onClick={() => append({ casId: "", password: "" })}
        >
          Add {label}
        </button>
      </div>

      <div className="space-y-3">
        {(fields.length > 0 ? fields : [{ id: 'default' }]).map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-9 gap-3 p-3 border rounded"
          >
            <div className=" col-span-4">
              <TextInput
                errors={errors}
                label="CAS ID"
                name={`${name}.${index}.casId`}
                register={register}
                type={FORM_TYPE.TEXT}
              />
            </div>

            <div className=" col-span-4">
              <TextInput
                errors={errors}
                label="Password"
                name={`${name}.${index}.password`}
                register={register}
                type={FORM_TYPE.TEXT}
              />
            </div>

            {fields.length > 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 cursor-pointer text-red-600  rounded transition"
                aria-label={`Remove ${label}`}
              >
                <MdDeleteForever size={24} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CasLattersRapter;
