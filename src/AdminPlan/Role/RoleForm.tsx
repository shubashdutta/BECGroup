import { AddRole, GetPermission, UpdateRole } from "@/src/ApiList/AdminApi";
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
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface RolePorps {
  rowData?: any;
  fun?: any;
}

const RoleForm: FC<RolePorps> = ({ fun, rowData }) => {
  const {
    clearErrors,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: rowData?.name ?? "",
      permissionIds: "",
    },
  });

  const { closeModal } = useModal();
  const pers = watch("permissionIds");

  const selectedPermission: any = rowData?.permissionList?.flatMap(
    (item: any) => {
      return item?.actions?.map((v: any) => ({
        label: `${item?.name} (${v})`,
        value: item?.id,
      }));
    },
  );

  useEffect(() => {
    if (rowData) {
      setValue("permissionIds", selectedPermission);
    }
  }, []);

  const [permission, setPermission] = useState([]);

  const handelGetPermission = async () => {
    const params = {
      statusIn: "ACTIVE",
    };
    try {
      const res = await GetPermission(params);

      // const data = res?.data.flatMap((v: any) =>
      //   v.actions?.map((action: string) => ({
      //     label: `${action}(${v?.name})`,
      //     value: v.id,
      //   }))
      // );
      const data = res?.data?.map((valu: any) => ({
        label: `${valu?.name} (${valu?.actions?.join(", ")})`,
        value: valu?.id,
      }));

      setPermission(data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handelGetPermission();
  }, []);
  const handleSubmitData = async (data: any) => {
    const payload = {
      name: data?.name,
      permissionIds: data?.permissionIds?.map((v: any) => v?.value),
      ...(rowData && { id: rowData?.id }),
    };

    try {
      const res: any = rowData
        ? await UpdateRole(payload)
        : await AddRole(payload);
      successMessage({ message: res?.message });
      closeModal();
      fun();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className=" wrapper overflow-auto max-h-96 p-8    grid grid-cols-2">
          <div className=" col-span-1 ">
            <TextInput
              errors={errors}
              name="name"
              register={register}
              type={FORM_TYPE.TEXT}
              label="Name"
              required={true}
              validation={{ required: ErrorMessage.name }}
            />
          </div>

          <div className=" col-span-1  mt-1.5">
            <SelectField
              control={control}
              errors={errors}
              name="permissionIds"
              options={permission}
              isMulti={true}
              isRequired
              label="Permission"
              validation={{ required: ErrorMessage.permission }}
            />
          </div>
        </div>
        <div className=" mt-4">
          <SubmitAndCancelBtn isSubmiting={isSubmitting} fun={closeModal} />
        </div>
      </form>
    </div>
  );
};

export default RoleForm;
