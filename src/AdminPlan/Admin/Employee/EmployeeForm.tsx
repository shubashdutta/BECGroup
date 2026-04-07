import { AddEmployee, GetRole, UpdateEmployee } from "@/src/ApiList/AdminApi";
import { FILE_TYPE } from "@/src/Common/fileUpload/FileType";
import { FileUploader } from "@/src/Common/fileUpload/fileUploader";
import { useFileInput } from "@/src/Common/fileUpload/useFile";
import PasswordShow from "@/src/Common/PasswordShow";
import SelectField from "@/src/Common/SelectField";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextInput from "@/src/Common/TextInput";
import ImagePreview from "@/src/lib/ImagePreview/ImagePreview";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import { userType } from "@/src/utils/options/userTypeOption";
import { error } from "console";
import React, { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface EmployeeProps {
  rowData?: any;
  fun?: any;
}

const EmployeeForm: FC<EmployeeProps> = ({ fun, rowData }) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: rowData?.firstName ?? "",
      middleName: rowData?.middleName ?? "",
      lastName: rowData?.lastName ?? "",
      mobileNumber: rowData?.mobileNumber ?? "",
      email: rowData?.email ?? "",
      password: "",
      roleId: "",
      isActive: rowData?.isActive ?? false,
      userType: "",
    },
  });

  const [role, setRole] = useState([]);
  const { closeModal } = useModal();
  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "PHOTO");

  const selectedUserType: any = userType?.find(
    (item: any) => item?.value === rowData?.userType,
  );

  const checkPassword = watch("password");

  const roleIds = rowData?.role?.map((v: any) => ({
    label: v?.name,
    value: v?.id,
  }));

  useEffect(() => {
    if (rowData) {
      setValue("userType", selectedUserType);
      setValue("roleId", roleIds);
    }
  }, []);
  const handelGetRole = async () => {
    const params = {
      statusIn: "ACTIVE",
    };

    try {
      const res: any = await GetRole(params);
      const data = res?.data?.map((v: any) => ({
        label: v?.name,
        value: v?.id,
      }));
      setRole(data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handelGetRole();
  }, []);

  const handleAddUser = async (data: any) => {
    const { roleId, userType, email, password, ...rest } = data;
    const payload = {
      roleIds: roleId?.map((v: any) => v?.value),
      userType: userType?.value,
      ...(rowData && { id: rowData?.id }),
      ...(!rowData && { email }),

      ...(checkPassword && { password }),
      ...rest,
    };

    const fromData: any = new FormData();

    fromData.append("user", JSON.stringify(payload));

    if (files) {
      files.forEach((v: any) => {
        return fromData.append("file", v?.rest);
      });
    } else {
      fromData.append("file", null);
    }
    try {
      const res: any = rowData
        ? await UpdateEmployee(fromData)
        : await AddEmployee(fromData);
      successMessage({ message: res?.message });
      closeModal();
      fun();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleAddUser)}>
      <div className=" wrapper grid grid-cols-3  overflow-y-auto max-h-96">
        <div className=" col-span-1">
          <TextInput
            errors={errors}
            label="First Name"
            name="firstName"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.firstName }}
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            errors={errors}
            label="Middle Name"
            name="middleName"
            register={register}
            type={FORM_TYPE.TEXT}
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            errors={errors}
            label="Last Name"
            name="lastName"
            register={register}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.lastName }}
          />
        </div>

        <div className=" col-span-1">
          <TextInput
            errors={errors}
            label="Mobile Number"
            name="mobileNumber"
            register={register}
            type={FORM_TYPE.TEXT}
          />
        </div>
        <div className=" col-span-1">
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

        <div className=" col-span-1">
          <PasswordShow
            errors={errors}
            label="Password"
            name="password"
            register={register}
            required={!rowData}
            validation={{
              message: rowData ? "" : ErrorMessage.password,
            }}
          />
        </div>

        <div className=" col-span-1">
          <SelectField
            control={control}
            errors={errors}
            name="roleId"
            options={role}
            isMulti={true}
            isRequired={true}
            label="Role"
            validation={{ required: ErrorMessage.role }}
          />
        </div>

        <div className=" col-span-1">
          <SelectField
            control={control}
            errors={errors}
            name="userType"
            label="User Type"
            options={userType}
            isRequired={true}
            validation={{ required: ErrorMessage.userType }}
          />
        </div>

        <div className=" col-span-1  mt-7">
          <TextInput
            errors={errors}
            label="Is Active"
            name="isActive"
            register={register}
            type={FORM_TYPE.CHECKBOX}
          />
        </div>

        <div className=" col-span-3 wrapper">
          <Form.Label>Image</Form.Label>
          <FileUploader
            accept={FILE_TYPE.PHOTO}
            files={files}
            handleFilesChange={handleFilesChange}
            loading={loadingFiles}
            uploadType={"SINGLE"}
            removeFiles={removeFiles}
          />
        </div>

        {rowData?.file && (
          <div>
            <ImagePreview File={rowData} />
          </div>
        )}
      </div>

      <div className=" my-5">
        <SubmitAndCancelBtn fun={closeModal} isSubmiting={isSubmitting} />
      </div>
    </form>
  );
};

export default EmployeeForm;
