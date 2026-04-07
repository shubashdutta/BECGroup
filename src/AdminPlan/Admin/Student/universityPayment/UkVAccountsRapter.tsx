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

interface UkVAccountsRapterProps {
  control: Control<any>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  name: string;
  label: string;
  initialAccounts?: any[];
  setValue?: UseFormSetValue<any>;
}

const UkVAccountsRapter: FC<UkVAccountsRapterProps> = ({
  control,
  register,
  errors,
  name,
  label,
  initialAccounts = [],
  setValue,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  // Set initial values if provided
  useEffect(() => {
    if (initialAccounts && initialAccounts.length > 0 && setValue) {
      // Only set initial values if no fields exist yet
      if (fields.length === 0) {
        initialAccounts.forEach((account, index) => {
          if (index === 0) {
            // Set the first account values
            setValue(`${name}.0.accountId`, account.accountId);
            setValue(`${name}.0.password`, account.password);
          } else {
            // Add additional accounts
            append({ accountId: account.accountId, password: account.password });
          }
        });
      }
    }
  }, [initialAccounts, name, setValue, fields.length, append]);

  return (
    <div className="space-y-3">
      <div className="flex  justify-end mr-3 items-center">
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
          type="button"
          onClick={() => append({ accountId: "", password: "" })}
        >
          Add {label}
        </button>
      </div>

      <div className=" space-y-3">
        {(fields.length > 0 ? fields : [{ id: 'default' }]).map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-9 gap-3 p-3 border rounded "
          >
            <div className=" col-span-4">
              <TextInput
                errors={errors}
                label="Account ID"
                name={`${name}.${index}.accountId`}
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
                className="p-2 cursor-pointer text-red-600 rounded transition"
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

export default UkVAccountsRapter;
