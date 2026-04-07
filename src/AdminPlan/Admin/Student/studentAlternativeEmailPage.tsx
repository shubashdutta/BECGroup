import PasswordShow from "@/src/Common/PasswordShow";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextInput from "@/src/Common/TextInput";
import { apiRequest } from "@/src/lib/axiosSetup";
import { successMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface studentProps {
  studentId: number;
  fun?: any;
}

const StudentAlternativeEmailPage: FC<studentProps> = ({ studentId, fun }) => {
  const {
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      alternateEmails: [{ email: "", password: "" }],
      studentId: "",
    },
  });

  const { closeModal } = useModal();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "alternateEmails",
  });

  const onSubmit = async (data: any) => {
    const payload = {
      alternativeCredentials: data?.alternateEmails?.map((v: any) => v),
      studentId,
    };
    try {
      const res: any = await apiRequest.post(
        "api/student/alternative-credentials/add",
        payload,
      );
      // alert("Emails saved!");
      successMessage({ message: res?.message });
      closeModal();
      fun();
    } catch (error) {
      console.error("Error saving emails:", error);
    }
  };

  return (
    <div className="max-w-3xl  ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6  ">
        <div className="max-h-96 overflow-y-auto wrapper">
          <div className="flex justify-end pb-2">
            <button
              type="button"
              onClick={() => append({ email: "", password: "" })}
              className="bg-green-600 text-white cursor-pointer font-semibold px-6 py-2 rounded hover:bg-green-700 transition"
            >
              + Add Another Email
            </button>
          </div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className=" p-2   flex flex-col md:flex-row gap-4 items-end"
            >
              <div className="flex-1">
                <TextInput
                  errors={errors}
                  label="Email"
                  name={`alternateEmails.${index}.email`}
                  register={register}
                  type={FORM_TYPE.EMAIL}
                  required={true}
                  validation={{ required: ErrorMessage.email }}
                />
              </div>

              <div className="flex-1">
                <PasswordShow
                  errors={errors}
                  label="Password"
                  name={`alternateEmails.${index}.password`}
                  register={register}
                  required={true}
                  validation={{ required: ErrorMessage.password }}
                />
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600  cursor-pointer font-semibold px-3 py-2 border border-red-600 rounded hover:bg-red-50 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Submit and Cancel Buttons */}
        <SubmitAndCancelBtn fun={closeModal} isSubmiting={isSubmitting} />
      </form>
    </div>
  );
};

export default StudentAlternativeEmailPage;
