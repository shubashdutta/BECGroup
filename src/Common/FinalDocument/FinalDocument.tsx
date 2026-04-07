"use client";

import React, { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiOutlineUpload } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { toast } from "react-toastify";

import MOIFormWithFile from "./MOIFormWithFile";
import LorFirst from "./LorFirst";
import Others from "@/src/AdminPlan/Admin/Student/Others";

import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import { apiRequest } from "@/src/lib/axiosSetup";
import SubmitAndCancelBtn from "../SubmitAndCancelBtn";
import { useDrawer } from "@/src/utils/Modal/DrawerModalProvider";

// ── Types ────────────────────────────────────────────────────────────────

export interface DocumentItem {
  id: string;
  enumKey: string;
  file: File | null;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
}

export interface DocumentFilesProps {
  id: string | number;
  fun?: () => Promise<void>;
  document: any;
  // We keep these props but will mirror them locally to avoid stale data
  uploadedFiles: Record<string, DocumentItem[]>;
  setUploadedFiles: React.Dispatch<
    React.SetStateAction<Record<string, DocumentItem[]>>
  >;
}

interface DynamicRow {
  title: string;
  file?: File | null;
  previewUrl?: string;
}

interface FormData {
  studentId: string | number;
  moiDetail: {
    referenceType: string;
    recommenderName: string;
    recommenderDesignation: string;
    relationWithApplicant: string;
    contactNumber: string;
    email: string;
    organizationName: string;
    organizationAddress: string;
  };
  firstLorDetail: {
    referenceType: string;
    recommenderName: string;
    recommenderDesignation: string;
    relationWithApplicant: string;
    contactNumber: string;
    email: string;
    organizationName: string;
    organizationAddress: string;
  };
}

// ── documentGroups ──────────────────────────────────────────────────────

interface DocumentGroup {
  id: string;
  title: string;
  options: { label: string; value: string }[];
  component?: React.FC<any>;
}

const documentGroups = [
  {
    id: "TENTH",
    title: "Grade 10 Documents",
    required: false,
    options: [
      { label: "Grade Sheet", value: "TENTH_GRADESHEET" },
      { label: "Certificate", value: "TENTH_CERTIFICATE" },
      { label: "Character/Transfer", value: "TENTH_CHARACTER_CERTIFICATE" },
      { label: "Equivalent", value: "TENTH_EQUIVALENT" },
    ],
  },
  {
    id: "DIPLOMA",
    title: "Diploma Documents",
    required: false,
    options: [
      { label: "Transcript", value: "DIPLOMA_TRANSCRIPT" },
      { label: "Migration ", value: "DIPLOMA_MIGRATION" },
      { label: "Provisional ", value: "DIPLOMA_PROVISIONAL" },
      {
        label: "Character ",
        value: "DIPLOMA_CHARACTER_CERTIFICATE",
      },
      { label: "Equivalent Certificate", value: "DIPLOMA_EQUIVALENT" },
    ],
  },
  {
    id: "TWELFTH",
    title: "Grade 12 Documents",
    required: false,
    options: [
      { label: "Transcript", value: "TWELFTH_TRANSCRIPT" },
      { label: "Migration", value: "TWELFTH_MIGRATION" },
      { label: "Provisional", value: "TWELFTH_PROVISIONAL" },
      {
        label: "Character Certificate",
        value: "TWELFTH_CHARACTER_CERTIFICATE",
      },
      { label: "Grade 11 Marksheet", value: "ELEVENTH_MARKSHEET" },
      { label: "Equivalent", value: "ELEVENT_EQUIVALENT" },
    ],
  },
  {
    id: "BACHELOR",
    title: "Bachelor Documents",
    required: false,
    options: [
      { label: "Transcript", value: "BACHELOR_TRANSCRIPT" },
      { label: "Migration", value: "BACHELOR_MIGRATION" },
      { label: "Provisional", value: "BACHELOR_PROVISIONAL" },
      {
        label: "Character Certificate",
        value: "BACHELOR_CHARACTER_CERTIFICATE",
      },
      { label: "Semester Marksheet", value: "BACHELOR_SEMESTER_MARKSHEET" },
      { label: "Equivalent", value: "BACHELOR_EQUIVALENT" },
    ],
  },
  {
    id: "MOI",
    title: "MOI",
    required: false,
    options: [{ label: "MOI", value: "MOI" }],
    component: MOIFormWithFile,
  },
  {
    id: "LOR_I",
    title: "First LOR",
    required: false,
    options: [{ label: "LOR I", value: "LOR_I" }],
    component: LorFirst,
  },
  {
    id: "noc",
    title: "NOC_Document",
    required: false,
    options: [{ label: "Other", value: "NOC_DOCUMENT" }],
    component: Others,
  },
  {
    id: "STUDENT_DOCUMENT",
    title: "Student Documents",
    required: false,
    options: [
      { label: "Resume", value: "RESUME" },
      { label: "Passport", value: "PASSPORT" },
      { label: "Citizenship", value: "CITIZENSHIP" },
    ],
  },
  {
    id: "LOR_II",
    title: "Second LOR",
    options: [{ label: "Second_Lor", value: "LOR_II" }],
  },

  {
    id: "POST_GRADUATE",
    title: "Postgraduate Documents",
    options: [
      { label: "Transcript", value: "POST_GRADUATE_TRANSCRIPT" },
      { label: "Migration", value: "POST_GRADUATE_MIGRATION" },
      { label: "Provisional", value: "POST_GRADUATE_PROVISIONAL" },
      {
        label: "Character Certificate",
        value: "POST_GRADUATE_CHARACTER_CERTIFICATE",
      },
      {
        label: "Semester Marksheet",
        value: "POST_GRADUATE_SEMESTER_MARKSHEET",
      },
      { label: "Equivalent", value: "POST_GRADUATE_EQUIVALENT" },
    ],
  },

  {
    id: "ward",
    title: "Ward_Document",

    options: [{ label: "Ward", value: "Ward_DOCUMENT" }],
    component: Others,
  },
  {
    id: "land",
    title: "Land_Document",
    options: [{ label: "Land", value: "Land_DOCUMENT" }],
    component: Others,
  },
  {
    id: "family",
    title: "Family_Citizenship_Document",
    options: [
      { label: "Family Citizenship", value: "Family_Citizenship_Document" },
    ],
    component: Others,
  },
  {
    id: "other",
    title: "Other_Document",
    options: [{ label: "Other", value: "OTHER_DOCUMENT" }],
    component: Others,
  },
];

const FinalDocument: React.FC<DocumentFilesProps> = ({
  id,
  document,
  fun,
  uploadedFiles: propUploadedFiles,
  setUploadedFiles: propSetUploadedFiles,
}) => {
  // Mirror prop state locally to avoid stale props in render
  const [localUploadedFiles, setLocalUploadedFiles] =
    useState(propUploadedFiles);

  // Sync from parent when prop changes (initial load / external reset)
  // useEffect(() => {
  //   setLocalUploadedFiles(propUploadedFiles);
  // }, [propUploadedFiles]);

  // Inside FinalDocument

  // Add this cleanup
  useEffect(() => {
    return () => {
      // When drawer closes / component unmounts → clear ONLY local/pending files
      setLocalUploadedFiles((current) => {
        const cleaned = { ...current };

        Object.keys(cleaned).forEach((key) => {
          cleaned[key] = cleaned[key].filter((doc) => {
            if (doc.file) {
              // ← only pending files have .file
              if (doc.previewUrl?.startsWith("blob:")) {
                URL.revokeObjectURL(doc.previewUrl);
              }
              return false; // remove it
            }
            return true; // keep server files
          });
        });

        propSetUploadedFiles(cleaned); // also tell parent to forget pending files
        return cleaned;
      });
    };
  }, [propSetUploadedFiles]); // dependencies important

  // When we update locally, also update parent
  const updateFiles = (
    updater: (
      prev: Record<string, DocumentItem[]>,
    ) => Record<string, DocumentItem[]>,
  ) => {
    setLocalUploadedFiles((prev) => {
      const newState = updater(prev);
      propSetUploadedFiles(newState);
      return newState;
    });
  };

  const { closeDrawer } = useDrawer();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeDoc, setActiveDoc] = useState(documentGroups[0].id);
  const [activeOption, setActiveOption] = useState(
    documentGroups[0].options[0]?.value || "",
  );
  const [dragging, setDragging] = useState(false);

  const [dynamicRows, setDynamicRows] = useState<{
    [key: string]: DynamicRow[];
  }>({
    noc: [],
    other: [],
    ward: [],
    land: [],
    family: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      studentId: id,
      moiDetail: {
        referenceType: "",
        recommenderName: "",
        recommenderDesignation: "",
        relationWithApplicant: "",
        contactNumber: "",
        email: "",
        organizationName: "",
        organizationAddress: "",
      },
      firstLorDetail: {
        referenceType: document?.firstLorDetail?.referenceType ?? "",
        recommenderName: document?.firstLorDetail?.recommenderName ?? "",
        recommenderDesignation:
          document?.firstLorDetail?.recommenderDesignation ?? "",
        relationWithApplicant:
          document?.firstLorDetail?.relationWithApplicant ?? "",
        contactNumber: document?.firstLorDetail?.contactNumber ?? "",
        email: document?.firstLorDetail?.email ?? "",
        organizationName: document?.firstLorDetail?.organizationName ?? "",
        organizationAddress:
          document?.firstLorDetail?.organizationAddress ?? "",
      },
    },
  });

  useEffect(() => {
    return () => {
      Object.values(localUploadedFiles)
        .flat()
        .forEach((doc) => {
          if (doc.previewUrl?.startsWith("blob:")) {
            URL.revokeObjectURL(doc.previewUrl);
          }
        });
    };
  }, []);

  const getFilesForEnumKey = (enumKey: string) => {
    const serverFiles =
      document?.documents?.[enumKey]?.map((file: any) => ({
        id: file.id.toString(),
        name: file.fileName,
        previewUrl: file.path || "",
        file: null,
      })) || [];

    const localFiles = (localUploadedFiles[enumKey] || []).map((doc) => ({
      id: doc.id,
      name: doc.name,
      previewUrl: doc.previewUrl || "",
      file: doc.file,
      size: doc.size,
      type: doc.type,
    }));

    return [...serverFiles, ...localFiles];
  };

  const handleFileSelect = (files: FileList | null, overrideKey?: string) => {
    if (!files) return;

    const targetKey = overrideKey || activeOption;

    const newDocs: DocumentItem[] = Array.from(files).map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      enumKey: targetKey,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
    }));

    updateFiles((prev) => ({
      ...prev,
      [targetKey]: [...(prev[targetKey] || []), ...newDocs],
    }));
  };

  const removeDocument = (docId: string, enumKey?: string) => {
    updateFiles((prev) => {
      if (enumKey && prev[enumKey]) {
        const updated = prev[enumKey].filter((d) => d.id !== docId);
        const removed = prev[enumKey].find((d) => d.id === docId);
        if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
        return { ...prev, [enumKey]: updated };
      }

      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        next[key] = next[key].filter((d) => {
          if (d.id === docId && d.previewUrl) URL.revokeObjectURL(d.previewUrl);
          return d.id !== docId;
        });
      });
      return next;
    });
  };

  const handleDynamicRowsChange = (groupId: string) => (rows: DynamicRow[]) => {
    setDynamicRows((prev) => ({
      ...prev,
      [groupId]: rows,
    }));
  };

  // const handleSubmitDocument = async (data: FormData) => {
  //   try {
  //     const formData = new FormData();

  //     const dynamicDocumentDetails: {
  //       title: string;
  //       dynamicDocumentType: string;
  //     }[] = [];

  //     Object.entries(dynamicRows).forEach(([groupId, rows]) => {
  //       rows.forEach((row, index) => {
  //         if (!row.title?.trim() || !row.file) return;

  //         const docType =
  //           index === 0
  //             ? `${groupId.toUpperCase()}_DOCUMENT`
  //             : `${groupId.toUpperCase()}_DOCUMENT${index + 1}`;

  //         dynamicDocumentDetails.push({
  //           title: row.title.trim(),
  //           dynamicDocumentType: docType,
  //         });

  //         formData.append(docType, row.file);
  //       });
  //     });

  //     const studentPayload = {
  //       ...data,
  //       dynamicDocumentDetails,
  //     };

  //     formData.append("student", JSON.stringify(studentPayload));

  //     Object.entries(localUploadedFiles).forEach(([enumKey, docs]) => {
  //       docs.forEach((doc) => {
  //         if (doc.file) {
  //           formData.append(enumKey, doc.file);
  //         }
  //       });
  //     });

  //     const res: any = await apiRequest.post(
  //       "api/student/document/add",
  //       formData,
  //     );

  //     toast.success(res?.message || "Documents submitted successfully!");
  //     await fun?.();
  //     closeModal();
  //   } catch (error: any) {
  //     console.error("Upload failed:", error);
  //     toast.error(
  //       error?.response?.data?.message || "Failed to upload documents",
  //     );
  //   }
  // };

  const handleSubmitDocument = async (data: FormData) => {
    try {
      const lorDetail = data.firstLorDetail;
      const hasLorFormData =
        lorDetail?.recommenderName?.trim() &&
        lorDetail?.recommenderDesignation?.trim() &&
        lorDetail?.relationWithApplicant?.trim() &&
        lorDetail?.contactNumber?.trim() &&
        lorDetail?.email?.trim();

      // If either file or form data is missing → show error
      // if (!hasLorFormData) {
      //   let errorMsg = "First LOR (LOR I) is required.";

      //   toast.error(errorMsg);
      //   return; // ← stop submission
      // }

      const formData = new FormData();

      const dynamicDocumentDetails: {
        title: string;
        dynamicDocumentType: string;
      }[] = [];

      Object.entries(dynamicRows).forEach(([groupId, rows]) => {
        rows.forEach((row, index) => {
          if (!row.title?.trim() || !row.file) return;

          const docType =
            index === 0
              ? `${groupId.toUpperCase()}_DOCUMENT`
              : `${groupId.toUpperCase()}_DOCUMENT${index + 1}`;

          dynamicDocumentDetails.push({
            title: row.title.trim(),
            dynamicDocumentType: docType,
          });

          formData.append(docType, row.file);
        });
      });

      const studentPayload = {
        ...data,
        dynamicDocumentDetails,
      };

      formData.append("student", JSON.stringify(studentPayload));

      Object.entries(localUploadedFiles).forEach(([enumKey, docs]) => {
        docs.forEach((doc) => {
          if (doc.file) {
            formData.append(enumKey, doc.file);
          }
        });
      });

      const res: any = await apiRequest.post(
        "api/student/document/add",
        formData,
      );

      toast.success(res?.message || "Documents submitted successfully!");
      await fun?.();
      propSetUploadedFiles({});
      setLocalUploadedFiles({});
      closeDrawer();
    } catch (error: any) {
      console.error("Upload failed:", error);
      toast.error(
        error?.response?.data?.message || "Failed to upload documents",
      );
    }
  };
  return (
    <form className="w-full" onSubmit={handleSubmit(handleSubmitDocument)}>
      <div className="grid grid-cols-12 gap-4 max-h-[75vh] overflow-y-auto pb-4">
        <div className="col-span-4 border rounded p-3 space-y-2 bg-white">
          {documentGroups.map((group) => {
            const requiredMissing = group.options.some((opt) => {
              if (opt.label.toLowerCase() === "equivalent") return false;
              return getFilesForEnumKey(opt.value).length === 0;
            });

            return (
              <div
                key={group.id}
                onClick={() => {
                  setActiveDoc(group.id);
                  setActiveOption(group.options[0]?.value || "");
                }}
                className={`p-3 rounded border cursor-pointer transition-colors ${
                  activeDoc === group.id
                    ? "bg-blue-50 border-blue-600 font-medium"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                {group.title}{" "}
                {group?.required && (
                  <span className="text-red-600 text-sm">*</span>
                )}
                {group?.required ? (
                  <div className="pt-1 text-[10px] text-red-600 font-semibold">
                    Required document missing
                  </div>
                ) : (
                  <div className="pt-1 text-[10px] text-gray-400 font-semibold">
                    ( Required document missing)
                  </div>
                )}
                {/* {requiredMissing && (
                  
                )} */}
              </div>
            );
          })}
        </div>

        {/* RIGHT content */}
        <div className="col-span-8 border rounded p-4 bg-white">
          {(() => {
            const activeGroup = documentGroups.find((g) => g.id === activeDoc);
            if (!activeGroup) return null;

            if (activeGroup?.component) {
              const Component = activeGroup.component;

              const commonProps = {
                register,
                errors,
                localFiles: {
                  [activeDoc]: getFilesForEnumKey(
                    activeGroup.options[0]?.value ?? activeOption,
                  ),
                },
                handleFile: (file: File) =>
                  handleFileSelect(
                    [file] as any,
                    activeGroup.options[0]?.value,
                  ),
                handleRemoveFile: (index: number) => {
                  const key = activeGroup.options[0]?.value ?? activeOption;
                  const current = getFilesForEnumKey(key);
                  const doc = current[index];
                  if (doc?.file) removeDocument(doc.id, key);
                },
                fileInputRef,
                dragging,
                setDragging,
              };

              const dynamicGroups = ["noc", "other", "ward", "land", "family"];

              if (dynamicGroups.includes(activeGroup.id)) {
                return (
                  <Component
                    {...commonProps}
                    onRowsChange={handleDynamicRowsChange(activeGroup.id)}
                  />
                );
              }

              return <Component {...commonProps} />;
            }

            // Default UI
            return (
              <>
                <Form.Label className="font-medium mb-3 block">
                  Select Document Type
                </Form.Label>
                <div className="flex flex-wrap gap-2 mb-5">
                  {activeGroup.options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setActiveOption(opt.value)}
                      className={`px-4 py-1.5 rounded border text-sm font-medium transition-colors ${
                        activeOption === opt.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    dragging
                      ? "bg-blue-50 border-blue-500 scale-[1.02]"
                      : "border-blue-300"
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
                    handleFileSelect(e.dataTransfer.files);
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileSelect(e.target.files)}
                  />
                  <AiOutlineUpload className="text-6xl text-blue-500 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700">
                    Click or drag & drop files here
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    for <strong>{activeOption.replace(/_/g, " ")}</strong>
                  </p>
                </div>

                {/* PREVIEW AREA */}
                <div className="mt-6">
                  {(() => {
                    const currentFiles = getFilesForEnumKey(activeOption);

                    if (currentFiles.length === 0) {
                      return (
                        <p className="text-sm text-gray-500 text-center mt-4">
                          No files uploaded yet for this document type
                        </p>
                      );
                    }

                    return (
                      <div className="space-y-4">
                        <p className="text-sm font-medium text-gray-700">
                          Uploaded files ({currentFiles.length}):
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {currentFiles.map((doc) => (
                            <div
                              key={doc.id}
                              className="relative border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow group"
                            >
                              <div className="h-48 bg-gray-50 flex items-center justify-center relative">
                                {doc.previewUrl ? (
                                  <img
                                    src={doc.previewUrl}
                                    alt={doc.name}
                                    className="max-h-full max-w-full object-contain"
                                    onError={(e) => {
                                      console.error(
                                        "Preview load error:",
                                        doc.previewUrl,
                                      );

                                      // Hide broken image instead of loading placeholder
                                      (
                                        e.currentTarget as HTMLImageElement
                                      ).style.display = "none";
                                    }}
                                  />
                                ) : doc.type?.startsWith("image/") ? (
                                  <p className="text-red-500">
                                    Could not generate preview
                                  </p>
                                ) : doc.type?.includes("pdf") ? (
                                  <div className="text-center p-4">
                                    <p className="text-6xl text-red-600">PDF</p>
                                    <p className="text-sm mt-2 text-gray-600">
                                      PDF Document
                                    </p>
                                  </div>
                                ) : (
                                  <div className="text-center p-4 text-gray-500">
                                    <p className="text-6xl">📄</p>
                                    <p className="text-sm mt-2">
                                      {doc.type || "File"}
                                    </p>
                                  </div>
                                )}

                                {doc.file && (
                                  <button
                                    onClick={() =>
                                      removeDocument(doc.id, activeOption)
                                    }
                                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Remove"
                                  >
                                    <TiDelete size={22} />
                                  </button>
                                )}
                              </div>

                              <div className="p-3 text-xs border-t">
                                <p
                                  className="font-medium truncate"
                                  title={doc.name}
                                >
                                  {doc.name}
                                </p>
                                <p className="text-gray-500 mt-0.5">
                                  {(doc.size / 1024).toFixed(1)} KB •{" "}
                                  {doc.type?.split("/")[1]?.toUpperCase() ||
                                    "?"}
                                </p>
                                {doc.file && (
                                  <span className="text-blue-600 text-[10px]">
                                    Local
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </>
            );
          })()}
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t ">
        <SubmitAndCancelBtn fun={closeDrawer} isSubmiting={isSubmitting} />
      </div>
    </form>
  );
};

export default FinalDocument;
