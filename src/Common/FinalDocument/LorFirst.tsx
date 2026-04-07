"use client";

import React, { FC } from "react";
import { TiDelete } from "react-icons/ti";
import { AiOutlineUpload } from "react-icons/ai";
import TextInput from "../TextInput";
import { FORM_TYPE } from "@/src/utils/InputType";
import { UploadedFile } from "../studentInfo/DocumentFiles";

interface MOISectionProps {
  register: any;
  errors: any;
  enumKey?: string;

  localFiles: { [key: string]: UploadedFile[] };
  handleFile: (file: File, enumKey?: string) => void;
  handleRemoveFile: (index: number, enumKey?: string) => void;

  // FIXED HERE – allow null (this is the missing piece)
  fileInputRef: React.RefObject<HTMLInputElement | null>;

  dragging: boolean;
  setDragging: (val: boolean) => void;
}

const LorFirst: FC<MOISectionProps> = ({
  dragging,
  fileInputRef,
  handleFile,
  handleRemoveFile,
  localFiles,
  register,
  setDragging,
  errors,
  enumKey = "LOR_I",
}) => {
  const lorImage: any = localFiles[enumKey]?.[0];

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="border p-2 rounded border-gray-200">
        <div
          className={`border-2 relative border-dashed rounded p-6 text-center cursor-pointer ${
            dragging ? "bg-blue-50 border-blue-500" : "border-blue-400"
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            if (e.dataTransfer.files[0])
              handleFile(e.dataTransfer.files[0], enumKey);
          }}
        >
          {lorImage ? (
            <>
              <img
                src={lorImage.previewUrl}
                className="h-auto w-full object-contain rounded"
                alt="LOR Preview"
              />
              <TiDelete
                size={26}
                className="absolute top-2 right-2 text-red-600 bg-white rounded-full p-1 cursor-pointer shadow"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(0, enumKey);
                }}
              />
            </>
          ) : (
            <>
              <img
                src="https://edgeinternational.in/wp-content/uploads/2023/10/Letter-of-Recommendation-Sample-2.jpg"
                alt=""
                className="h-full w-full rounded opacity-45"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <AiOutlineUpload className="text-4xl text-blue-500 mx-auto" />
                <button
                  type="button"
                  className="font-semibold text-indigo-600 text-lg"
                >
                  Upload LOR(1st)
                </button>
                <input
                  ref={fileInputRef}
                  hidden
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) =>
                    e.target.files?.[0] &&
                    handleFile(e.target.files[0], enumKey)
                  }
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="border border-gray-200 p-2 rounded">
        <div className="text-center text-sm border-b pb-2 border-gray-200 border-dashed font-bold underline ">
          LOR Form
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <TextInput
            errors={errors}
            label="Ref.Type"
            name="firstLorDetail.referenceType"
            register={register}
            type={FORM_TYPE.TEXT}
            required
          />

          <TextInput
            errors={errors}
            label="Ref.Name"
            name="firstLorDetail.recommenderName"
            register={register}
            type={FORM_TYPE.TEXT}
            required
          />

          <TextInput
            label="Designation"
            name="firstLorDetail.recommenderDesignation"
            errors={errors}
            register={register}
            type={FORM_TYPE.TEXT}
            required
          />

          <TextInput
            errors={errors}
            label="Relation"
            name="firstLorDetail.relationWithApplicant"
            register={register}
            type={FORM_TYPE.TEXT}
            required
          />

          <TextInput
            errors={errors}
            label="Number"
            name="firstLorDetail.contactNumber"
            register={register}
            type={FORM_TYPE.TEL}
            required
          />

          <TextInput
            errors={errors}
            label="Email"
            name="firstLorDetail.email"
            register={register}
            type={FORM_TYPE.EMAIL}
            required
          />
          <TextInput
            errors={errors}
            label="Org.Name"
            name="firstLorDetail.organizationName"
            register={register}
            type={FORM_TYPE.TEXT}
            required
          />

          <TextInput
            errors={errors}
            label="Org.Address"
            name="firstLorDetail.organizationAddress"
            register={register}
            type={FORM_TYPE.TEXT}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default LorFirst;
