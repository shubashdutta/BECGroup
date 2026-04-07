import { GetEmployee } from "@/src/ApiList/AdminApi";
import {
  GetUniversityResult,
  PublicStudentRegister,
  PublicStudentRegisterUpdate,
} from "@/src/ApiList/PublicApi";
import OtpModal from "@/src/Common/OtpModal/OtpModal";
import SelectField from "@/src/Common/SelectField";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextInput from "@/src/Common/TextInput";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import { Gender } from "@/src/utils/options/GenderOption";
import { StudyArea, StudyLevel } from "@/src/utils/options/StudyArea";

import React, { FC, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";

interface StudentPropps {
  row?: any;
  fun?: any;
}
const AddStudent: FC<StudentPropps> = ({ row, fun }) => {
  const [country, setCountry] = useState([]);
  const [intake, setInTake] = useState([]);
  const [userid, setUserId] = useState([]);
  const { closeModal } = useModal();

  const [openOtp, setOpenOtp] = React.useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: row?.firstName ?? "",
      middleName: row?.middleName ?? "",
      lastName: row?.lastName ?? "",
      email: row?.email ?? "",
      mobileNumber: row?.mobileNumber ?? "",
      gender: "",
      study: "",
      studyLevel: "",
      studyArea: "",
      studyYear: "",
      studentType: "",
      currentCountry: row?.currentCountry ?? "",
      // userId: "",
      assigneeIds: [],
    },
  });
  const eamil = watch("email");

  const studentTypeOption = [
    { label: "Internal", value: "INTERNAL" },
    { label: "External", value: "EXTERNAL" },
  ];

  const studentType: any = studentTypeOption?.find(
    (v: any) => v?.value === row?.studentType,
  );

  const assignees = row?.assignees?.map((v: any) => ({
    label: `${v?.firstName} ${v?.lastName}`,
    value: v?.id,
  }));

  const gender: any = Gender?.find((v) => v.value === row?.gender);
  const inTakeYear: any = intake?.find(
    (v: any) => v?.value === Number(row?.year),
  );
  const studyCountry: any = country?.find((v: any) => v?.value === row?.study);

  const studyArea: any = StudyArea?.find(
    (v: any) => v?.value === row?.studyArea,
  );

  const studyLevel: any = StudyLevel?.find((v: any) => row?.studyLevel);

  useEffect(() => {
    if (row && country) {
      setValue("gender", gender);
      // setValue("userId", assigneeOption);
      setValue("studyYear", inTakeYear);
      setValue("studyArea", studyArea);
      setValue("study", studyCountry);
      setValue("studyLevel", studyLevel);
      setValue("assigneeIds", assignees);
      setValue("studentType", studentType);
    }
  }, [country]);

  const handleGetIntake = async () => {
    const params = {
      intakeYear: "intakeYear",
    };

    try {
      const res: any = await GetUniversityResult(params);
      const data = res?.data?.map((v: any) => ({
        label: v,
        value: v,
      }));
      setInTake(data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleGetCountry = async () => {
    const params = {
      country: "country",
    };
    try {
      const res: any = await GetUniversityResult(params);
      const data = res?.data?.map((v: any) => ({
        label: v,
        value: v,
      }));
      setCountry(data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleGetUser = async () => {
    const params = {
      statusIn: "ACTIVE",
    };
    try {
      const res: any = await GetEmployee(params);

      const allowedPermissions = ["Consulting_student", "student"];

      const data =
        res?.data
          ?.filter((user: any) => {
            // Include all ADMIN users
            if (user?.userType === "ADMIN") return true;

            // Include USER only if they have allowed permissions
            return user?.role?.some((role: any) =>
              role?.permissionList?.some((permission: any) =>
                allowedPermissions.includes(permission?.name),
              ),
            );
          })
          ?.map((v: any) => ({
            label: `${v?.firstName} ${v?.lastName}`,
            value: v?.id,
          })) || [];

      setUserId(data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetCountry();
    handleGetIntake();
    handleGetUser();
  }, []);

  const handleOpenModal = () => {
    setOpenOtp(true);
  };

  const handleSubmitForm = async (data: any) => {
    const {
      gender,
      study,
      studyArea,
      studyLevel,
      studyYear,
      email,
      studentType,
      assigneeIds,
      ...rest
    } = data;
    const payload = {
      gender: gender?.value,
      study: study?.value,
      studyArea: studyArea?.value,
      studyLevel: studyLevel?.value,
      year: studyYear?.value,
      studentType: studentType?.value,
      assigneeIds: assigneeIds?.map((v: any) => v?.value),
      ...(row && { id: row?.id }),
      email,
      //   userId,
      ...rest,
    };

    try {
      const res: any = row
        ? await PublicStudentRegisterUpdate(payload)
        : await PublicStudentRegister(payload);
      successMessage({ message: res?.message });

      if (studentType?.value === "EXTERNAL") {
        fun();
        closeModal();
      } else {
        handleOpenModal();
      }
      //   router.push(`/otp-verfiy?email=${encodeURIComponent(data?.email)}`);
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <div>
      <form className=" " onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="  wrapper grid grid-cols-1 max-h-96 overflow-y-auto md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
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
              disabled={!!row?.email}
              required={true}
              validation={{ required: ErrorMessage.email }}
              errors={errors}
            />
          </div>

          <div className=" col-span-1">
            <SelectField
              control={control}
              errors={errors}
              name="studentType"
              label="Student Type"
              options={studentTypeOption}
              isRequired={true}
              validation={{ required: "Student Type is Required" }}
            />
          </div>

          {/* <div className=" col-span-1">
            <SelectField
              control={control}
              errors={errors}
              name="userId"
              options={userid}
              isRequired={true}
              label="User"
              validation={{ required: ErrorMessage.assignee }}
            />
          </div> */}
          <div className=" col-span-1">
            <SelectField
              control={control}
              errors={errors}
              name="assigneeIds"
              options={userid}
              isRequired={true}
              label="Assignee"
              isMulti={true}
              validation={{ required: ErrorMessage.assignee }}
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
            <SelectField
              label="What Study Area"
              control={control}
              name="studyArea"
              options={StudyArea}
              isRequired={true}
              validation={{ required: ErrorMessage.course }}
              errors={errors}
            />
            {/* <TextInput
            label="What to Study"
            name="study"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.course }}
            errors={errors}
          /> */}
          </div>
          {/* <div className=" col-span-1 ">
          <TextInput
            label="Study Area"
            name="studyArea"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.course }}
            errors={errors}
          />
        </div> */}

          <div className=" col-span-1">
            <SelectField
              control={control}
              label="What Study Level"
              name="studyLevel"
              options={StudyLevel}
              isRequired={true}
              validation={{ required: ErrorMessage.studyLevel }}
              errors={errors}
            />
            {/* <TextInput
            label="Degree Level"
            name="studyLevel"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.studyLevel }}
            errors={errors}
          /> */}
          </div>

          <div className=" col-span-1">
            <SelectField
              control={control}
              errors={errors}
              name={"studyYear"}
              label="InTake Year"
              options={intake}
              isRequired={true}
              validation={{ required: ErrorMessage.intake }}
            />
            {/* <TextInput
            label="InTake Year"
            name="studyYear"
            register={register}
            errors={errors}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.intake }}
          /> */}
          </div>

          <div className=" col-span-1">
            <SelectField
              control={control}
              errors={errors}
              name="study"
              options={country}
              label="Where To Study"
              isRequired={true}
              validation={{ required: ErrorMessage.studyCountry }}
            />
          </div>

          <div className=" col-span-3">
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

        <div className=" mt-3">
          <SubmitAndCancelBtn isSubmiting={isSubmitting} fun={closeModal} />
        </div>
      </form>
      {openOtp && <OtpModal onClose={() => setOpenOtp(false)} email={eamil} />}
    </div>
  );
};

export default AddStudent;
