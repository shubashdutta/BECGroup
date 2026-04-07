import { FILE_TYPE } from "@/src/Common/fileUpload/FileType";
import { FileUploader } from "@/src/Common/fileUpload/fileUploader";
import { useFileInput } from "@/src/Common/fileUpload/useFile";
import SubmitAndCancelBtn from "@/src/Common/SubmitAndCancelBtn";
import { apiRequest } from "@/src/lib/axiosSetup";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface studentProps {
  student?: any;
  fun?: any;
}

const StudentProfileImageChange: FC<studentProps> = ({ fun, student }) => {
  const { closeModal, openModal } = useModal();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm({
    defaultValues: {
      studentId: "",
    },
  });

  const [files, handleFilesChange, removeFiles, setFiles, loadingFiles] =
    useFileInput(null, "PHOTO");

  const handleVerfiyStudnt = async () => {
    const payload = {
      id: student?.id,
    };

    if (!files) {
      toast.error("File is needed ");
      return;
    }

    const fromData: any = new FormData();

    fromData.append("student", JSON.stringify(payload));

    if (files) {
      files?.forEach((v: any) => fromData.append("file", v?.rest));
    } else {
      fromData.append("file", null);
    }

    try {
      const res: any = await apiRequest.post(
        "api/student/profile/image",
        fromData,
      );
      successMessage({ message: res?.message });
      fun("ACTIVE");

      closeModal();
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <div>
      <form
        className=" wrapper p-3"
        onSubmit={handleSubmit(handleVerfiyStudnt)}
      >
        <Form.Label>Student Image</Form.Label>

        <FileUploader
          accept={FILE_TYPE.PHOTO}
          files={files}
          handleFilesChange={handleFilesChange}
          loading={loadingFiles}
          uploadType={"SINGLE"}
          removeFiles={removeFiles}
        />

        <div className=" mt-5">
          <SubmitAndCancelBtn fun={closeModal} isSubmiting={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default StudentProfileImageChange;
