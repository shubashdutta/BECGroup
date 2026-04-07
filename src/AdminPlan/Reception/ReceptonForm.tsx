import {
  AddReception,
  GetEmployee,
  GetUniversityFilter,
  UpdateReception,
} from "@/src/ApiList/AdminApi";
import SelectField from "@/src/Common/SelectField";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextInput from "@/src/Common/TextInput";
import DynamicSelectWithOther from "@/src/lib/DynamicSelectWithOther/DynamicSelectWithOther";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import {
  counselingMode,
  LanguageTests,
  ReceptionEducationLevel,
} from "@/src/utils/options/LangOption";
import { preferredCountry } from "@/src/utils/options/preferredCountryOption";
import { reference } from "@/src/utils/options/Reference";
import React, { FC, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import ReceptionRapter from "./ReceptionRapter";
import { HtmlDateFormat } from "@/src/utils/formatArrayToLocalDate";

interface RepectionProps {
  row?: any;
  fun?: any;
}

const ReceptonForm: FC<RepectionProps> = ({ fun, row }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      fullName: row?.fullName ?? "",
      mobile: row?.mobile ?? "",
      email: row?.email ?? "",
      currentAddress: row?.currentAddress ?? "",
      language: null,
      languageText:
        row?.language && !LanguageTests.find((o) => o.value === row.language)
          ? row.language
          : "",
      preferredCountry: null,
      preferredCountryText:
        row?.preferredCountry &&
        !preferredCountry.find((o) => o.value === row.preferredCountry)
          ? row.preferredCountry
          : "",
      reference: "",
      assigneeId: "",
      counselingMode: "",
      counselingDate: "",
      counselingTime: "",
      educationDetails: row
        ? row?.educationDetails?.map((v: any) => ({
            educationLevel: ReceptionEducationLevel?.find(
              (a: any) => a?.value === v?.educationLevel,
            ),
            yearOfPassing: v?.yearOfPassing,
            institutionName: v?.institutionName,
            courseOrStream: v?.courseOrStream,
            percentageOrGpa: v?.percentageOrGpa,
          }))
        : [
            {
              educationLevel: "",
              yearOfPassing: "",
              institutionName: "",
              courseOrStream: "",
              percentageOrGpa: "",
            },
          ],
    },
    mode: "onChange",
  });

  const counselingMode1 = watch("counselingMode");

  const [country, setCountry] = useState<{ label: string; value: string }[]>(
    [],
  );

  const getUniversityCountry = async () => {
    const params = {
      type: "COUNTRY",
    };
    try {
      const res: any = await GetUniversityFilter(params);
      const data = [
        ...res?.data?.map((v: any) => ({ label: v, value: v })),
        { label: "Other", value: "other" }, // Static value at end
      ];
      setCountry(data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    getUniversityCountry();
  }, []);

  const { closeModal } = useModal();
  const [employee, setEmployee] = useState([]);

  const { append, fields, remove } = useFieldArray({
    control,
    name: "educationDetails",
  });

  const ref: any = reference?.filter((item) => item?.value === row?.reference);

  const mode: any = counselingMode?.find(
    (item) => item?.value === row?.counselingMode,
  );

  const assignee: any = {
    label: `${row?.assignee?.firstName} ${row?.assignee?.middleName ?? ""}${
      row?.assignee?.lastName
    }`,
    value: row?.assignee?.id,
  };

  useEffect(() => {
    if (ref?.length > 0) {
      setValue("reference", ref);
    }
    if (row) {
      setValue("assigneeId", assignee);
      setValue("counselingMode", mode);
      setValue("counselingDate", HtmlDateFormat(row?.counselingDate));
      setValue("counselingTime", row?.counselingTime);
    }
  }, []);

  const handleGetEmpolyee = async () => {
    const params = {
      statusIn: "ACTIVE",
    };
    try {
      const res = await GetEmployee(params);

      const users = res?.data?.filter((user: any) => {
        // Check if the user has a role with permission "Council"
        const hasCouncilPermission = user.role?.some((role: any) =>
          role.permissionList?.some(
            (perm: any) => perm.name.trim() === "Council",
          ),
        );

        return user.userType === "ADMIN" || hasCouncilPermission;
      });

      // const users = res?.data?.filter(
      //   (v: any) =>
      //     v?.userType === "USER" &&
      //     v?.role?.some((role: any) =>
      //       role?.permissionList?.some((perm: any) => perm?.name === "Council")
      //     )
      // );
      const data = users?.map((v: any) => ({
        label: `${v?.firstName} ${v?.middleName ?? ""} ${v?.lastName}`,
        value: v?.id,
      }));
      setEmployee(data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetEmpolyee();
  }, []);
  const handleAddReception = async (data: any) => {
    const payload = {
      fullName: data.fullName,
      mobile: data.mobile,
      email: data.email,
      currentAddress: data.currentAddress,
      language:
        data.language?.value === "other"
          ? data.languageText
          : data.language?.value,
      preferredCountry:
        data.preferredCountry?.value === "other"
          ? data.preferredCountryText
          : data.preferredCountry?.value,
      reference: data.reference?.value,
      assigneeId: data?.assigneeId?.value,
      educationDetails: data?.educationDetails?.map((v: any) => ({
        educationLevel: v?.educationLevel?.value || "",
        yearOfPassing: v?.yearOfPassing || "",
        institutionName: v?.institutionName || "",
        courseOrStream: v?.courseOrStream || "",
        percentageOrGpa: v?.percentageOrGpa || "",
      })),
      counselingDate: data?.counselingDate,
      counselingTime: data?.counselingTime,
      counselingMode: data?.counselingMode?.value,

      ...(row && { id: row?.id }),
    };

    try {
      const res: any = row
        ? await UpdateReception(payload)
        : await AddReception(payload);
      successMessage({ message: res?.message });
      closeModal();
      fun();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleAddReception)}>
      <div className=" wrapper mb-4 p-1 grid grid-cols-12 max-h-90 overflow-y-auto">
        <div className=" col-span-6">
          <TextInput
            errors={errors}
            label="Full Name"
            name="fullName"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.name }}
          />
        </div>
        <div className=" col-span-6">
          <TextInput
            errors={errors}
            label="Moblie Number"
            name="mobile"
            register={register}
            required={true}
            type={FORM_TYPE.TEXT}
            validation={{ required: ErrorMessage.phone }}
          />
        </div>

        <div className=" col-span-6">
          <TextInput
            errors={errors}
            label="Email"
            name="email"
            register={register}
            type={FORM_TYPE.EMAIL}
            required={true}
            validation={{ required: ErrorMessage.email }}
          />
        </div>
        <div className=" col-span-6">
          <TextInput
            errors={errors}
            label="Address"
            name="currentAddress"
            register={register}
            type={FORM_TYPE.TEXT}
          />
        </div>

        <div className=" col-span-6">
          <DynamicSelectWithOther
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            name="language"
            options={LanguageTests}
            label="Language"
            required={true}
            initialValue={row?.language}
          />
          {/* <SelectField
            control={control}
            errors={errors}
            name="language"
            options={LanguageTests}
            label="Language "
            isRequired={true}
            validation={{ required: ErrorMessage.lang }}
          />
          {langOption?.value === "other" && (
            <TextInput
              label="Language"
              errors={errors}
              name="languageText"
              register={register}
              type={FORM_TYPE.TEXT}
              required={true}
              validation={{ required: ErrorMessage.lang }}
            />
          )} */}
        </div>

        <div className=" col-span-6">
          <DynamicSelectWithOther
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            name="preferredCountry"
            options={country}
            label="Preferred Country"
            required={true}
            initialValue={row?.preferredCountry}
          />
        </div>

        {!row && (
          <div className=" col-span-6">
            <SelectField
              control={control}
              errors={errors}
              name="assigneeId"
              label="Assignee To"
              options={employee}
              isRequired={true}
              validation={{ required: ErrorMessage?.name }}
            />
          </div>
        )}

        <div className="col-span-6">
          <SelectField
            control={control}
            errors={errors}
            name="reference"
            label="Reference"
            options={reference}
          />
          {/* <TextInput
            label="Reference"
            errors={errors}
            name="reference"
            register={register}
            type={FORM_TYPE.TEXT}
          /> */}
        </div>

        <div className=" col-span-6">
          <SelectField
            control={control}
            options={counselingMode}
            isRequired={true}
            validation={{ required: ErrorMessage.counselingMode }}
            name="counselingMode"
            label="counseling Mode "
            errors={errors}
          />
        </div>

        <div className=" col-span-6">
          <TextInput
            errors={errors}
            label="counseling Date"
            name="counselingDate"
            register={register}
            type={FORM_TYPE.DATE}
            required
            validation={{ required: ErrorMessage.Date }}
          />
        </div>

        <div className={`${!row ? "col-span-12" : "col-span-6"}`}>
          <TextInput
            errors={errors}
            label="counseling Time "
            name="counselingTime"
            register={register}
            type={FORM_TYPE.TIME}
            required
            validation={{ required: ErrorMessage.counselingTime }}
          />
        </div>

        <div className=" col-span-12">
          <ReceptionRapter
            append={append}
            control={control}
            errors={errors}
            fields={fields}
            option={ReceptionEducationLevel}
            register={register}
            remove={remove}
          />
        </div>
      </div>

      <div>
        <SubmitAndCancelBtn isSubmiting={isSubmitting} fun={closeModal} />
      </div>
    </form>
  );
};

export default ReceptonForm;
