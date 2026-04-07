"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Checkbox, Collapse } from "antd";
import { BsPatchCheckFill } from "react-icons/bs";
import { IoCloudDownloadOutline, IoTrashOutline } from "react-icons/io5";

import { apiRequest } from "@/src/lib/axiosSetup";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";

import StudentVerfiy from "./StudentVerfiy";
import StudentDocumentPreview from "./StudentDocumentPreview";
import FinalDocument from "@/src/Common/FinalDocument/FinalDocument";
import SendEmail from "./SendEmail";

import { AdminStudentDetails } from "@/src/ApiList/AdminApi";
import { HtmlDateFormat } from "@/src/utils/formatArrayToLocalDate";
import { baseUrl } from "@/config";
import { useDrawer } from "@/src/utils/Modal/DrawerModalProvider";
import { useConsultingStudent } from "@/store/useStudentConsulting";
import Image from "next/image";
import { FaEdit, FaFilePdf, FaEye } from "react-icons/fa";
import StudentAlternativeEmailPage from "./studentAlternativeEmailPage";
import StudentProfileImageChange from "./StudentProfileImageChange";

type InfoRowProps = { label: string; value: string };
type InfoCardProps = {
  title: string;
  children: React.ReactNode;
  email?: string;

  onEmailClick?: () => void;
  onDownloadClick?: () => void;
};

// Reusable InfoRow
const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-3 py-1 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="col-span-2 font-medium text-gray-900">{value}</span>
  </div>
);

// Reusable Card with optional email button
const InfoCard: React.FC<InfoCardProps> = ({
  title,
  children,
  email,
  onEmailClick,
  onDownloadClick,
}) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="text-base font-semibold  mb-3 border-b pb-1 flex justify-between items-center">
      <span>{title}</span>
      {email && (
        <div className=" flex justify-between gap-x-5">
          <button
            type="button"
            className="text-sm bg-blue-600 text-white rounded py-2 px-4 border cursor-pointer"
            onClick={onEmailClick}
          >
            {email}
          </button>
          {onDownloadClick && (
            <button
              type="button"
              className="text-sm bg-blue-600 text-white rounded py-2 px-4 border cursor-pointer"
              onClick={onDownloadClick}
            >
              Bulk Download{" "}
            </button>
          )}
        </div>
      )}
    </h3>
    {children}
  </div>
);

const StudentDetailsPage: React.FC = () => {
  const { openModal } = useModal();
  const { openDrawer } = useDrawer();

  const [email, setEmail] = useState<string | null>(null);
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [documents, setDocuments] = useState<Record<string, any[]>>({});
  const [documentData, setDocumentData] = useState<any>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, any[]>>({});
  const [isVerified, setIsVerified] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const setConsultingData = useConsultingStudent(
    (state) => state?.setConsultingData,
  );

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const verified = localStorage.getItem("isStudentVerified");
    if (storedEmail) setEmail(JSON.parse(storedEmail));
    setIsVerified(verified);
  }, []);

  const fetchStudentInfo = useCallback(
    async (email: string, forceStatus?: "ACTIVE" | "PENDING") => {
      try {
        let status = forceStatus;

        if (!status) {
          status = isVerified === "true" ? "ACTIVE" : "PENDING";
        }

        const params = {
          statusIn: status,
          email,
        };

        const res: any = await AdminStudentDetails(params);
        setStudentInfo(res?.data?.[0] ?? null);
        setConsultingData(res?.data?.[0]);
      } catch (error) {
        errorMessage({ error });
      }
    },
    [isVerified],
  );

  useEffect(() => {
    if (email) fetchStudentInfo(email);
  }, [email, fetchStudentInfo]);

  // -------------------- Fetch Documents --------------------
  const fetchDocuments = useCallback(async () => {
    if (!studentInfo?.id) return;
    try {
      const res = await apiRequest.get(
        `api/student/document/${studentInfo.id}`,
      );
      setDocumentData(res?.data ?? []);
      // setDocuments(res?.data?.documents  ?? {});
      setDocuments({
        ...(res?.data?.documents ?? {}),
        ...(res?.data?.dynamicDocuments ?? {}),
      });
    } catch (error) {
      errorMessage({ error });
    }
  }, [studentInfo]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleCheckboxChange = (fileId: number) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId],
    );
  };

  const handleDownload = async () => {
    if (selectedFiles.length === 0) {
      // maybe show toast/warning: "No files selected"
      return;
    }

    try {
      const token = localStorage.getItem("token") || "";
      const fileIds = selectedFiles.join(",");

      const response = await fetch(
        `${baseUrl}api/file/download?fileIds=${fileIds}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/zip, image/jpeg, image/png, */*",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Download failed (${response.status})`);
      }

      const blob = await response.blob();
      if (blob.size === 0) throw new Error("Empty response");

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        selectedFiles.length > 1 ? "documents.zip" : `${selectedFiles[0]}.zip`; // optional improvement
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (err: any) {
      errorMessage({ error: err });
      console.error(err);
    }
  };

  // Single file download
  const handleSingleDownload = async (id: number | string, path?: string) => {
    try {
      const token = localStorage.getItem("token") || "";

      const response = await fetch(`${baseUrl}api/file/download/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "*/*",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const filename = path?.split("/").pop() || `file-${id}`;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (err) {
      errorMessage({ error: err });
    }
  };

  const handleVerify = () => {
    openModal(
      "Verify Student",
      <StudentVerfiy
        student={studentInfo}
        fun={(status?: "ACTIVE") =>
          fetchStudentInfo(studentInfo?.email, status)
        }
      />,
      "xl",
    );
  };

  const handleChangeStudentImage = () => {
    openModal(
      "Change Profile Image",
      <StudentProfileImageChange
        student={studentInfo}
        fun={(status?: "ACTIVE") =>
          fetchStudentInfo(studentInfo?.email, status)
        }
      />,
      "xl",
    );
  };

  const handlePreview = (images: any[]) =>
    openModal(
      "Document Preview",
      <StudentDocumentPreview images={images} />,
      "lg",
    );

  const handleUploadDocument = () =>
    openDrawer(
      "Upload Document (LOR is compulsory)",
      <FinalDocument
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        id={studentInfo?.id}
        fun={fetchDocuments}
        document={documentData}
      />,
      "xxl",
    );

  // document remove

  const handleRemoveFile = async (fileId: number, key: string) => {
    const dynamicType = [
      "Land_DOCUMENT",
      "Family_Citizenship_Document",
      "OTHER_DOCUMENT",
      "WARD_DOCUMENT",
    ].includes(key);

    try {
      const url = `api/student/document/delete/mapping-doc/${studentInfo?.id}/${fileId}`;
      const dynamicDocumentDelete = `api/student/document/delete/dynamic-doc/${studentInfo?.id}/${fileId}`;

      const res: any = await apiRequest.delete(
        !dynamicType ? url : dynamicDocumentDelete,
      );

      successMessage({ mesage: res?.message });

      // ✅ Remove from UI (local state)
      setDocuments((prev: any) => {
        const updated = { ...prev };

        Object.keys(updated).forEach((key) => {
          updated[key] = updated[key].filter((doc: any) => doc.id !== fileId);
        });

        return updated;
      });
    } catch (error) {
      errorMessage({ error });
    }
  };
  const handleEmail = () =>
    openModal(
      "Send Email",
      <SendEmail
        fileIds={selectedFiles}
        fun={(status?: "ACTIVE") =>
          fetchStudentInfo(studentInfo?.email, status)
        }
      />,
      "xxl",
    );

  const handleAlternativeEmail = () =>
    openModal(
      "Add Alternative Email",
      <StudentAlternativeEmailPage studentId={studentInfo?.id} />,
    );

  const formatTitle = (key: string) =>
    key
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());

  // -------------------- JSX --------------------
  return (
    <div className="h-[89vh] flex flex-col">
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <div className="max-w-5xl mx-auto space-y-2">
          {/* ---------- STUDENT HEADER ---------- */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
            <div className="relative">
              {studentInfo?.file ? (
                <img
                  src={studentInfo.file.path}
                  loading="lazy"
                  alt="Student"
                  className="w-14 h-14 rounded-full"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                  {studentInfo?.personalDetail?.firstName
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>
              )}
              <button
                onClick={handleChangeStudentImage}
                className="absolute bottom-0 right-0 bg-white border rounded-full p-1 shadow cursor-pointer hover:bg-gray-100"
              >
                <FaEdit className="text-blue-600 text-xs" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex gap-x-4 items-center">
                <h2 className="text-lg font-semibold">
                  {`${studentInfo?.personalDetail?.firstName} ${studentInfo?.personalDetail?.middleName ?? ""} ${studentInfo?.personalDetail?.lastName}`}
                </h2>
                {isVerified === "true" && (
                  <BsPatchCheckFill
                    className="text-blue-500 text-lg"
                    title="Verified student"
                  />
                )}
              </div>
              <p className="text-sm text-gray-500">Student</p>
              <p className="text-sm text-gray-500">
                {studentInfo?.personalDetail?.email}
              </p>
              <p className="text-sm text-gray-500">
                {studentInfo?.personalDetail?.mobile}
              </p>
            </div>

            <div className="ml-auto">
              <button
                className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded"
                onClick={handleUploadDocument}
              >
                Upload Document
              </button>
            </div>
          </div>

          {/* ---------- PERSONAL INFO ---------- */}
          <InfoCard
            title="Personal Information"
            email="Add Email"
            onEmailClick={handleAlternativeEmail}
          >
            <InfoRow
              label="Full Name"
              value={`${studentInfo?.personalDetail?.firstName} ${studentInfo?.personalDetail?.middleName ?? ""} ${studentInfo?.personalDetail?.lastName}`}
            />
            <InfoRow
              label="Date of Birth"
              value={HtmlDateFormat(studentInfo?.personalDetail?.dob)}
            />
            <InfoRow
              label="Marital Status"
              value={studentInfo?.personalDetail?.maritalStatus}
            />
            <InfoRow
              label="Nationality"
              value={studentInfo?.personalDetail?.nationalityInfo?.nationality}
            />
            <InfoRow
              label="Citizenship"
              value={studentInfo?.personalDetail?.nationalityInfo?.citizenship}
            />
            <InfoRow
              label="Address"
              value={`${studentInfo?.personalDetail?.permanentAddress?.address1}, ${studentInfo?.personalDetail?.permanentAddress?.city}, (${studentInfo?.personalDetail?.permanentAddress?.state}), ${studentInfo?.personalDetail?.permanentAddress?.country}`}
            />

            {studentInfo?.alternativeCredentials?.map((v: any) => (
              <InfoRow
                label="AlterNative Email"
                value={`Email : ${v?.email}, password: ${v?.password}`}
              />
            ))}
          </InfoCard>

          {/* ---------- PASSPORT INFO ---------- */}
          <InfoCard title="Passport Information">
            <InfoRow
              label="Passport Number"
              value={studentInfo?.personalDetail?.passportInfo?.passportNumber}
            />
            <InfoRow
              label="Passport Issue Country"
              value={studentInfo?.personalDetail?.passportInfo?.issueCountry}
            />
            <InfoRow
              label="Issue Date"
              value={HtmlDateFormat(
                studentInfo?.personalDetail?.passportInfo?.issueDate,
              )}
            />
            <InfoRow
              label="Expiry Date"
              value={HtmlDateFormat(
                studentInfo?.personalDetail?.passportInfo?.expiryDate,
              )}
            />
          </InfoCard>

          {/* ---------- ACADEMIC INFO ---------- */}
          <InfoCard title="Academic Information">
            {studentInfo?.academicDetails?.map((v: any, idx: number) => (
              <div key={idx}>
                <InfoRow label="Level" value={v?.academicType} />
                <InfoRow label="city Of Study" value={v?.cityOfStudy} />
                <InfoRow
                  label="country Of Education"
                  value={v?.countryOfEducation}
                />
              </div>
            ))}
          </InfoCard>

          {/* ---------- WORK INFO ---------- */}
          <InfoCard title="Work Experience">
            <div className="space-y-2 text-sm">
              <p className="font-medium">
                {studentInfo?.workExperience?.jobProfile}
              </p>
              <p className="text-gray-500">
                {studentInfo?.workExperience?.organizationName}
              </p>
            </div>
          </InfoCard>

          {Object.entries(documents)?.length > 0 ? (
            <InfoCard
              title="Documents"
              email="Send Email"
              onEmailClick={handleEmail}
              onDownloadClick={handleDownload}
            >
              <Collapse accordion>
                {Object.entries(documents).map(([key, docs]) => {
                  return (
                    <Collapse.Panel
                      key={key}
                      header={
                        <div className="flex justify-between w-full">
                          <span className="font-medium">
                            {formatTitle(key)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {docs.length} file(s)
                          </span>
                        </div>
                      }
                    >
                      {docs.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {docs.map((doc: any) => {
                            const isPdf =
                              doc?.path ||
                              doc?.file?.path?.toLowerCase().endsWith(".pdf");

                            return (
                              <div
                                key={doc?.id}
                                className="relative border rounded-md group"
                              >
                                {/* ✅ REMOVE ICON (VISIBLE ABOVE BORDER) */}
                                <button
                                  onClick={() =>
                                    handleRemoveFile(
                                      doc?.file ? doc?.file?.id : doc?.id,
                                      key,
                                    )
                                  }
                                  className=" cursor-pointer absolute top-0 -right-2 z-50 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow-md"
                                  title="Remove file"
                                >
                                  <IoTrashOutline size={15} />
                                </button>

                                {/* ✅ CLIPPING WRAPPER */}
                                <div className="overflow-hidden rounded-md">
                                  {/* Overlay buttons (OLD — untouched) */}
                                  <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Checkbox
                                      checked={selectedFiles.includes(doc?.id)}
                                      onChange={() =>
                                        handleCheckboxChange(doc?.id)
                                      }
                                    />
                                    <button
                                      onClick={() =>
                                        handleSingleDownload(doc.id, doc.path)
                                      }
                                      className="text-blue-600 hover:text-blue-800 transition-colors"
                                      title="Download this file"
                                    >
                                      <IoCloudDownloadOutline size={24} />
                                    </button>
                                  </div>

                                  {/* Preview area */}
                                  <div
                                    className="cursor-pointer"
                                    onClick={() => handlePreview([doc])}
                                  >
                                    {isPdf ? (
                                      <div className="h-28 flex items-center justify-center bg-gray-100 text-xs text-gray-600 font-medium">
                                        <FaFilePdf className="w-10 h-10 text-red-500 mb-1" />
                                        <span className="text-xs font-medium">
                                          PDF
                                        </span>
                                      </div>
                                    ) : (
                                      <Image
                                        src={doc?.path || doc?.file?.path}
                                        alt={formatTitle(key)}
                                        className="h-28 w-full object-cover"
                                        width={100}
                                        height={100}
                                        loading="lazy"
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 py-4">
                          No documents uploaded
                        </p>
                      )}
                    </Collapse.Panel>
                  );
                })}
              </Collapse>
            </InfoCard>
          ) : (
            <div className="   bg-white rounded-lg shadow p-4">
              <h1 className=" text-2xl text-gray-700 underline  text-center py-3">
                Document's
              </h1>
              <h4 className=" text-center text-gray-600 ">
                NO file is Uploade
              </h4>
            </div>
          )}
        </div>
      </div>

      {isVerified !== "true" && (
        <div className="bg-[#f0f0f0] shadow p-3 w-[90%] mx-auto rounded flex justify-end">
          <button
            className="py-2 text-white cursor-pointer px-6 bg-green-800 rounded"
            onClick={handleVerify}
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentDetailsPage;
