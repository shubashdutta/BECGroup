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

  // FIXED: allow null – this resolves the error
  fileInputRef: React.RefObject<HTMLInputElement | null>;

  dragging: boolean;
  setDragging: (val: boolean) => void;
}

const MOIFormWithFile: FC<MOISectionProps> = ({
  dragging,
  fileInputRef,
  handleFile,
  handleRemoveFile,
  localFiles,
  register,
  setDragging,
  errors,
  enumKey = "MOI",
}) => {
  const moiImage: any = localFiles[enumKey]?.[0];

  return (
    <div className="grid grid-cols-2 gap-2">
      {/* IMAGE UPLOAD */}
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
          {moiImage ? (
            <>
              <img
                src={moiImage?.previewUrl}
                className="h-auto w-full object-contain rounded"
                alt="MOI Preview"
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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY8yanb891y4IIoUldnBYvGTxhVvY02w6DSTcuKqzELw&s"
                alt=""
                className="h-full w-full rounded"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <AiOutlineUpload className="text-4xl text-blue-500 mx-auto" />
                <button
                  className="font-semibold text-indigo-600 text-lg"
                  type="button"
                >
                  Upload MOI
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

      {/* FORM */}
      <div className="border border-gray-200 p-2 rounded">
        <div className="text-center text-sm border-b pb-2 border-gray-200 border-dashed font-bold underline">
          MOI Form
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <TextInput
            errors={errors}
            label="Ref.Type"
            name="moiDetail.referenceType"
            register={register}
            type={FORM_TYPE.TEXT}
          />
          <TextInput
            errors={errors}
            label="Ref.Name"
            name="firstLorDetail.recommenderName"
            register={register}
            type={FORM_TYPE.TEXT}
          />
          <TextInput
            label="Designation"
            name="moiDetail.recommenderDesignation"
            errors={errors}
            register={register}
            type={FORM_TYPE.TEXT}
          />
          <TextInput
            errors={errors}
            label="Relation"
            name="moiDetail.relationWithApplicant"
            register={register}
            type={FORM_TYPE.TEXT}
          />
          <TextInput
            errors={errors}
            label="Number"
            name="moiDetail.contactNumber"
            register={register}
            type={FORM_TYPE.TEL}
          />
          <TextInput
            errors={errors}
            label="Email"
            name="moiDetail.email"
            register={register}
            type={FORM_TYPE.EMAIL}
          />
          <TextInput
            errors={errors}
            label="Org.Name"
            name="moiDetail.organizationName"
            register={register}
            type={FORM_TYPE.TEXT}
          />
          <TextInput
            errors={errors}
            label="Org.Address"
            name="moiDetail.organizationAddress"
            register={register}
            type={FORM_TYPE.TEXT}
          />
        </div>
      </div>
    </div>
  );
};

export default MOIFormWithFile;
