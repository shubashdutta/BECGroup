import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import TextArea from "@/src/Common/TextArea";
import TextInput from "@/src/Common/TextInput";
import { apiRequest } from "@/src/lib/axiosSetup";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { ErrorMessage } from "@/src/utils/FormErrorMessage";
import { FORM_TYPE } from "@/src/utils/InputType";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import { message } from "antd";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

interface EmailProps {
  fileIds: any;
  fun?: any;
}

const SendEmail: FC<EmailProps> = ({ fileIds, fun }) => {
  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    register,
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      subject: "",
      message: "",
      fileIds: fileIds,
    },
  });

  const { closeModal } = useModal();

  const handleSendEmail = async (data: any) => {
    try {
      const res: any = await apiRequest.post("api/email/send", data);
      successMessage({ message: res?.message });
      // fun("ACTIVE");
      closeModal();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSendEmail)}>
      <div className=" wrapper max-h-96 overflow-y-auto grid grid-cols-2">
        <TextInput
          errors={errors}
          label="Send To"
          name="email"
          register={register}
          type={FORM_TYPE.EMAIL}
          required={true}
          validation={{ required: ErrorMessage.email }}
        />

        <TextInput
          errors={errors}
          label="Subject"
          name="subject"
          register={register}
          type={FORM_TYPE.TEXT}
          required={true}
          validation={{ required: "Subject is Required" }}
        />

        <div className=" col-span-2">
          <TextArea
            control={control}
            errors={errors}
            label="Message"
            name="message"
            isRequired={true}
            validation={{ required: "Message is Required" }}
          />
        </div>
      </div>

      <div className=" mt-2">
        <SubmitAndCancelBtn fun={closeModal} isSubmiting={isSubmitting} />
      </div>
    </form>
  );
};

export default SendEmail;
