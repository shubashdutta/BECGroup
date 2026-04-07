"use clinet";
import SelectField from "@/src/Common/SelectField";
import TextInput from "@/src/Common/TextInput";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { Gender } from "@/src/utils/options/GenderOption";

import { useForm } from "react-hook-form";

const StudentRegister = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      gender: "",
      study: "",
      studyLevel: "",
      studyArea: "",
      studyYear: "",
      currentCountry: "",
      studyCountry: "",
    },
  });

  return (
    <form>
      <div className=" grid grid-cols-3 gap-x-3 p-3  overflow-y-auto">
        <div className=" col-span-1">
          <TextInput
            name="firstName"
            label="First Name"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.firstName }}
            errors={errors}
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            name="middleName"
            label="Middle  Name"
            register={register}
            type={FORM_TYPE.TEXT}
            errors={errors}
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            name="lastName"
            label="Last Name"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.lastName }}
            errors={errors}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            label="Mobile Number"
            name="mobileNumber"
            register={register}
            type={FORM_TYPE.TEXT}
            errors={errors}
            required={true}
            validation={{ required: ErrorMessage.phone }}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            label="Email"
            name="email"
            register={register}
            type={FORM_TYPE.EMAIL}
            required={true}
            validation={{ required: ErrorMessage.email }}
            errors={errors}
          />
        </div>

        <div className=" col-span-1">
          <SelectField
            control={control}
            name="gender"
            options={Gender}
            label="Gender"
            isRequired={true}
            validation={{ required: ErrorMessage.gender }}
            errors={errors}
          />
        </div>

        <div className=" col-span-1 ">
          <TextInput
            label="What to Study"
            name="study"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.course }}
            errors={errors}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            label="Degree Level"
            name="studyLevel"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.studyLevel }}
            errors={errors}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            label="InTake Year"
            name="studyYear"
            register={register}
            errors={errors}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.intake }}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            label="Where to Study"
            name="studyCountry"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.studyCountry }}
            errors={errors}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            label="Where are you from "
            name="currentCountry"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.Address }}
            errors={errors}
          />
        </div>
      </div>
    </form>
  );
};

export default StudentRegister;
