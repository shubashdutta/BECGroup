import { AddFooter, UpdateFooter } from "@/src/ApiList/AdminApi";
import SelectField from "@/src/Common/SelectField";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextArea from "@/src/Common/TextArea";
import TextInput from "@/src/Common/TextInput";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import { FooterType } from "@/src/utils/options/FooterType";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

interface Footerprops {
  row?: any;

  fun?: any;
}

const FooterForm: FC<Footerprops> = ({ fun, row }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      title: row ? row?.title : "",
      url: "",
      footerType: "",
      description: row?.description ?? "",
      isActive: row ? row?.isActive : false,
    },
  });

  const { closeModal } = useModal();

  const country: any = FooterType.find(
    (item: any) => row?.footerType === item?.value,
  );

  useEffect(() => {
    if (row) {
      setValue("footerType", country);
    }
  }, []);

  const handleAddFooter = async (data: any) => {
    const { footerType, ...rest } = data;

    const payload = {
      footerType: data?.footerType?.value,
      ...(row && { id: row?.id }),
      ...rest,
    };
    try {
      const res: any = row
        ? await UpdateFooter(payload)
        : await AddFooter(payload);
      fun();
      closeModal();

      successMessage({ message: res?.message });
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleAddFooter)}>
      <div className=" mb-4 grid grid-cols-3 wrapper max-h-96 overflow-y-auto">
        <div className=" col-span-1 mt-1">
          <SelectField
            control={control}
            errors={errors}
            name="footerType"
            options={FooterType}
            isRequired={true}
            label="Footer Type"
          />
        </div>
        <div className=" col-span-1">
          <TextInput
            label="Title"
            name="title"
            register={register}
            errors={errors}
            type={FORM_TYPE.TEXT}
            required={true}
            validation={{ required: ErrorMessage.Title }}
          />
        </div>

        <div className=" col-span-1 mt-7">
          <TextInput
            errors={errors}
            label="is Active"
            name="isActive"
            register={register}
            type={FORM_TYPE.CHECKBOX}
          />
        </div>
        <div className=" col-span-3">
          <TextArea
            control={control}
            errors={errors}
            label="Content"
            name="description"
          />
        </div>
      </div>

      <SubmitAndCancelBtn isSubmiting={isSubmitting} fun={closeModal} />
    </form>
  );
};

export default FooterForm;
