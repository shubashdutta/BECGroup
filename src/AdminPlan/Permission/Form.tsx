import { AddPermision, UpdatePermission } from "@/src/ApiList/AdminApi";
import SelectField from "@/src/Common/SelectField";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { AdminNavList } from "@/src/utils/AdminNavList/AdminNavList";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import { Action, permissionOption } from "@/src/utils/options/permissionOption";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface permissionProps {
  rowData?: any;
  fun?: any;
}

const Form: FC<permissionProps> = ({ fun, rowData }) => {
  const {
    clearErrors,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    register,
  } = useForm({
    defaultValues: {
      name: "",
      actions: "",
    },
  });

  const { closeModal } = useModal();
  // const result: any = AdminNavList?.filter((item) => item.id !== "dashboard")
  //   .map((item) => ({ label: item.label, value: item.id }))
  //   .find((item) => item.value === rowData?.name);

  const getNavMatch = (list: any[], matchId: string) => {
    for (const parent of list) {
      // ✅ Check parent
      if (parent.id === matchId) {
        return {
          label: parent.label,
          value: parent.id,
        };
      }

      // ✅ Check children
      if (parent.children) {
        const child = parent.children.find((c: any) => c.id === matchId);

        if (child) {
          return {
            label: `${parent.label} (${child.label})`,
            value: child.id,
          };
        }
      }
    }
    return null;
  };

  const result: any = getNavMatch(
    AdminNavList.filter((item) => item.id !== "dashboard"),
    rowData?.name,
  );


  const selectedActions: any = rowData?.actions?.map((act: any) =>
    Action.find((item) => item.value.toLowerCase() === act.toLowerCase()),
  );

  useEffect(() => {
    if (rowData) {
      setValue("name", result);
      setValue("actions", selectedActions);
    }
  }, []);
  const handelAddPermission = async (data: any) => {
    const payload = {
      name: data?.name?.value,
      actions: data?.actions?.map((v: any) => v?.value),
      ...(rowData && { id: rowData?.id }),
    };

    try {
      const res: any = rowData
        ? await UpdatePermission(payload)
        : await AddPermision(payload);
      successMessage({ message: res?.message });
      closeModal();
      fun();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <div className=" ">
      <form onSubmit={handleSubmit(handelAddPermission)}>
        <div className=" grid grid-cols-2 gap-x-3  py-5 wrapper max-h-96 overflow-auto">
          <div className="  col-span-1">
            <SelectField
              control={control}
              errors={errors}
              name="name"
              options={permissionOption}
              label="Permission For"
              isRequired
              validation={{ required: ErrorMessage.permission }}
            />
          </div>

          <div className=" col-span-1">
            <SelectField
              control={control}
              errors={errors}
              name="actions"
              options={Action}
              isMulti={true}
              isRequired
              label="Actions"
              validation={{ required: ErrorMessage.action }}
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

export default Form;
