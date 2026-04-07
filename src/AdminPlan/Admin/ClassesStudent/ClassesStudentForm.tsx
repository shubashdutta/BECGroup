import {
  AdminAddClassesStudent,
  AdminUpdateClassesStudent,
} from "@/src/ApiList/AdminApi";
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
import { useDrawer } from "@/src/utils/Modal/DrawerModalProvider";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import { VISA_TYPES } from "@/src/utils/options/VisaType";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface ClassesPropsType {
  row?: any;
  fun: () => void;
}

const ClassesStudentForm: FC<ClassesPropsType> = ({ fun, row }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      fullName: row?.fullName ?? "",
      phoneNumber: row?.phoneNumber ?? "",
      email: row?.email ?? "",
      courseName: row?.courseName ?? "",
      visaType: "",
      shift: row?.shift ?? "",
      courseFee: row?.courseFee ?? "",
      ...(row && { id: row?.id }),
    },
  });

  const { closeModal } = useModal();

  const visa = VISA_TYPES?.find((v: any) => v?.value === row?.visaType);

  useEffect(() => {
    if (row) {
      setValue("visaType", visa);
    }
  }, []);

  const handelAddClassStudent = async (data: any) => {
    const { visaType, ...rest } = data;
    const payload = {
      visaType: data?.visaType?.value,
      ...rest,
    };
    try {
      const res: any = row
        ? await AdminUpdateClassesStudent(payload)
        : await AdminAddClassesStudent(payload);

      successMessage({ message: res?.message });
      closeModal();
      fun();
    } catch (error) {
      errorMessage({ error });
    }
  };

  return (
    <form className=" " onSubmit={handleSubmit(handelAddClassStudent)}>
      <div className=" max-h-96 overflow-y-auto wrapper grid grid-cols-2">
        <TextInput
          errors={errors}
          label="Full Name"
          name="fullName"
          register={register}
          type={FORM_TYPE.TEXT}
          required={true}
          validation={{ required: ErrorMessage.name }}
        />

        <TextInput
          errors={errors}
          label="Email"
          name="email"
          register={register}
          type={FORM_TYPE.EMAIL}
          required={true}
          validation={{ required: ErrorMessage.email }}
        />

        <TextInput
          errors={errors}
          label="Phone Number"
          name="phoneNumber"
          register={register}
          type={FORM_TYPE.TEL}
          required
          validation={{ required: ErrorMessage.phone }}
        />

        <TextInput
          errors={errors}
          label="Course Name"
          name="courseName"
          register={register}
          type={FORM_TYPE.TEXT}
          required={true}
          validation={{ required: ErrorMessage.course }}
        />

        <TextInput
          label="Shift"
          errors={errors}
          name="shift"
          register={register}
          type={FORM_TYPE.TEXT}
          required={true}
          validation={{ required: "Shift is Required" }}
        />
        {/* <TextInput
          errors={errors}
          label="Visa Type"
          name="visaType"
          register={register}
          type={FORM_TYPE.TEXT}
        /> */}

        <SelectField
          control={control}
          errors={errors}
          name="visaType"
          options={VISA_TYPES}
          isRequired={true}
          label="Visa_Type"
          validation={{ required: "Visa Type is Required" }}
        />

        <div className=" col-span-2">
          <TextInput
            errors={errors}
            label="Course Fee"
            name="courseFee"
            register={register}
            type={FORM_TYPE.NUMBER}
            required
            validation={{ required: ErrorMessage.monthlyFee }}
          />
        </div>
      </div>

      <div className=" mt-2">
        <SubmitAndCancelBtn fun={closeModal} isSubmiting={isSubmitting} />
      </div>
    </form>
  );
};

export default ClassesStudentForm;
