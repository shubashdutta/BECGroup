import React, { FC, useEffect, useState, useRef } from "react";
import {
  FileText,
  User,
  Plane,
  Home,
  ShieldCheck,
  CreditCard,
  ExternalLink,
  Printer,
  X,
  Download,
} from "lucide-react";
import { AdminStudentDetails } from "@/src/ApiList/AdminApi";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import Image from "next/image";

interface DocumentFile {
  id: string | number;
  path: string;
}

interface Documents {
  [key: string]: DocumentFile[];
}

interface AfterVisaProps {
  rowData?: {
    documents?: Documents;
    accommodationFee?: number;
    flightTicket?: number;
    serviceCharge?: number;
  };
}

type StudentInfo = {
  personalDetail?: any;
  file?: any;
};

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: DocumentFile;
  docType: string;
}

const DocumentModal: FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  file,
  docType,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FileText size={24} className="text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {docType.replaceAll("_", " ")}
              </h3>
              <p className="text-sm text-gray-500">Document ID: {file.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* <a
              href={file.path}
              download
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download size={16} />
              Download
            </a> */}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          {file.path.endsWith(".pdf") ? (
            <div className="w-full h-[70vh]">
              <iframe
                src={file.path}
                className="w-full h-full rounded-lg border"
                title={docType}
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <img
                src={file.path}
                alt={docType}
                className="max-w-full max-h-[70vh] object-contain rounded-lg border"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface PrintViewProps {
  studentInfo: StudentInfo | null;
  rowData?: {
    documents?: Documents;
    accommodationFee?: number;
    flightTicket?: number;
    serviceCharge?: number;
  };
}

const PrintView: FC<PrintViewProps> = ({ studentInfo, rowData }) => {
  const totalAmount =
    (rowData?.accommodationFee || 0) +
    (rowData?.flightTicket || 0) +
    (rowData?.serviceCharge || 0);

  return (
    <div className="print-container">
      <style jsx>{`
        @media print {
          @page {
            size: A4;
            margin: 20mm;
          }
          body {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          }
          .print-container {
            width: 100%;
            margin: 0 auto;
          }
          .no-print {
            display: none !important;
          }
          .print-header {
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .print-logo {
            width: 80px;
            height: 80px;
            background: #2563eb;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 24px;
          }
          .print-student-photo {
            width: 120px;
            height: 160px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
          }
          .print-section {
            margin-bottom: 30px;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background: #fafafa;
          }
          .print-section h3 {
            color: #1f2937;
            margin-bottom: 15px;
            font-size: 18px;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 10px;
          }
          .print-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          .print-item {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          .print-label {
            font-size: 12px;
            color: #6b7280;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .print-value {
            font-size: 16px;
            color: #111827;
            font-weight: 500;
          }
          .print-total {
            background: #2563eb;
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
          }
          .print-total h4 {
            margin: 0 0 10px 0;
            font-size: 18px;
            opacity: 0.9;
          }
          .print-total .amount {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 1px;
          }
          .print-footer {
            margin-top: 40px;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
          }
        }
      `}</style>

      <div className="print-container">
        {/* Header */}
        <div className="print-header">
          <div className="flex justify-between items-start">
            <div>
              <div className="print-logo">BE</div>
              <h1
                style={{
                  margin: "10px 0 0 0",
                  fontSize: "24px",
                  color: "#1f2937",
                }}
              >
                Baby Education
              </h1>
              <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
                Application Preview Report
              </p>
            </div>
            <div className="text-right">
              <p style={{ margin: 0, color: "#6b7280", fontSize: "12px" }}>
                Generated on: {new Date().toLocaleDateString()}
              </p>
              <p
                style={{
                  margin: "5px 0 0 0",
                  color: "#6b7280",
                  fontSize: "12px",
                }}
              >
                Application ID: {studentInfo?.personalDetail?.id || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Student Information */}
        <div className="print-section">
          <h3>
            <User
              size={20}
              style={{ marginRight: "8px", verticalAlign: "middle" }}
            />
            Student Information
          </h3>
          <div className="print-grid">
            <div className="print-item">
              <span className="print-label">Full Name</span>
              <span className="print-value">
                {`${studentInfo?.personalDetail?.firstName} ${studentInfo?.personalDetail?.lastName}`}
              </span>
            </div>
            <div className="print-item">
              <span className="print-label">Email Address</span>
              <span className="print-value">
                {studentInfo?.personalDetail?.email}
              </span>
            </div>
            <div className="print-item">
              <span className="print-label">Course</span>
              <span className="print-value">
                {studentInfo?.personalDetail?.course}
              </span>
            </div>
            <div className="print-item">
              <span className="print-label">University</span>
              <span className="print-value">
                {studentInfo?.personalDetail?.university}
              </span>
            </div>
            <div className="print-item">
              <span className="print-label">Phone</span>
              <span className="print-value">
                {studentInfo?.personalDetail?.phone}
              </span>
            </div>
            <div className="print-item">
              <span className="print-label">Status</span>
              <span className="print-value">
                {studentInfo?.personalDetail?.entityStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="print-section">
          <h3>
            <CreditCard
              size={20}
              style={{ marginRight: "8px", verticalAlign: "middle" }}
            />
            Financial Summary
          </h3>
          <div className="print-grid">
            <div className="print-item">
              <span className="print-label">Accommodation Fee</span>
              <span className="print-value">
                ${rowData?.accommodationFee?.toLocaleString() || "0"}
              </span>
            </div>
            <div className="print-item">
              <span className="print-label">Flight Ticket</span>
              <span className="print-value">
                ${rowData?.flightTicket?.toLocaleString() || "0"}
              </span>
            </div>
            <div className="print-item">
              <span className="print-label">Service Charge</span>
              <span className="print-value">
                ${rowData?.serviceCharge?.toLocaleString() || "0"}
              </span>
            </div>
            <div className="print-item">
              <span className="print-label">Payment Status</span>
              <span className="print-value">Pending</span>
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="print-total">
          <h4>Total Amount Due</h4>
          <div className="amount">${totalAmount.toLocaleString()}</div>
          <p style={{ margin: "10px 0 0 0", fontSize: "14px", opacity: 0.8 }}>
            All amounts are inclusive of applicable taxes
          </p>
        </div>

        {/* Footer */}
        <div className="print-footer">
          <p>
            This document serves as an official application preview for{" "}
            {studentInfo?.personalDetail?.firstName}{" "}
            {studentInfo?.personalDetail?.lastName}.
          </p>
          <p style={{ marginTop: "5px" }}>
            For any inquiries, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

const AfterVisaViewPage: FC<AfterVisaProps> = ({ rowData }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<DocumentFile | null>(null);
  const [selectedDocType, setSelectedDocType] = useState<string>("");
  const printRef = useRef<HTMLDivElement>(null);

  // Data mapped from your response
  useEffect(() => {
    const stored = localStorage.getItem("email");
    if (stored) setEmail(JSON.parse(stored));
  }, []);
  const getStudent = async () => {
    if (!email) return;
    try {
      const res: any = await AdminStudentDetails({ statusIn: "ACTIVE", email });
      const student = res?.data?.[0];
      setStudentInfo({
        personalDetail: student?.personalDetail,
        file: student?.file,
      });
    } catch (e) {
      errorMessage({ error: e });
    }
  };

  useEffect(() => {
    getStudent();
  }, [email]);

  const totalAmount =
    (rowData?.accommodationFee || 0) +
    (rowData?.flightTicket || 0) +
    (rowData?.serviceCharge || 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header / Actions */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Application Preview
          </h1>
          {/* <button
            onClick={() => {
              const printWindow = window.open("", "_slef");
              if (printWindow) {
                printWindow.document.write(`
                  <html>
                    <head>
                      <title>Application Preview - ${studentInfo?.personalDetail?.firstName} ${studentInfo?.personalDetail?.lastName}</title>
                      <style>
                        @page {
                          size: A4;
                          margin: 20mm;
                        }
                        body {
                          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                          margin: 0;
                          padding: 0;
                        }
                        .print-container {
                          width: 100%;
                          margin: 0 auto;
                        }
                        .print-header {
                          border-bottom: 3px solid #2563eb;
                          padding-bottom: 20px;
                          margin-bottom: 30px;
                        }
                        .print-logo {
                          width: 80px;
                          height: 80px;
                          background: #2563eb;
                          border-radius: 12px;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          color: white;
                          font-weight: bold;
                          font-size: 24px;
                        }
                        .print-section {
                          margin-bottom: 30px;
                          padding: 20px;
                          border: 1px solid #e5e7eb;
                          border-radius: 8px;
                          background: #fafafa;
                        }
                        .print-section h3 {
                          color: #1f2937;
                          margin-bottom: 15px;
                          font-size: 18px;
                          border-bottom: 2px solid #2563eb;
                          padding-bottom: 10px;
                        }
                        .print-grid {
                          display: grid;
                          grid-template-columns: 1fr 1fr;
                          gap: 15px;
                        }
                        .print-item {
                          display: flex;
                          flex-direction: column;
                          gap: 5px;
                        }
                        .print-label {
                          font-size: 12px;
                          color: #6b7280;
                          font-weight: 600;
                          text-transform: uppercase;
                          letter-spacing: 0.05em;
                        }
                        .print-value {
                          font-size: 16px;
                          color: #111827;
                          font-weight: 500;
                        }
                        .print-total {
                          background: #2563eb;
                          color: white;
                          padding: 20px;
                          border-radius: 8px;
                          text-align: center;
                        }
                        .print-total h4 {
                          margin: 0 0 10px 0;
                          font-size: 18px;
                          opacity: 0.9;
                        }
                        .print-total .amount {
                          font-size: 32px;
                          font-weight: 700;
                          letter-spacing: 1px;
                        }
                        .print-footer {
                          margin-top: 40px;
                          text-align: center;
                          color: #6b7280;
                          font-size: 12px;
                          border-top: 1px solid #e5e7eb;
                          padding-top: 20px;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="print-container">
                        <div class="print-header">
                          <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div>
                              <div class="print-logo">BE</div>
                              <h1 style="margin: 10px 0 0 0; font-size: 24px; color: #1f2937;">Baby Education</h1>
                              <p style="margin: 0; color: #6b7280; font-size: 14px;">Application Preview Report</p>
                            </div>
                            <div style="text-align: right;">
                              <p style="margin: 0; color: #6b7280; font-size: 12px;">Generated on: ${new Date().toLocaleDateString()}</p>
                              <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">Application ID: ${studentInfo?.personalDetail?.id || "N/A"}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div class="print-section">
                          <h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: middle;"><path d="M20 21v-2a4 4 0 0 0-3-3.87"></path><path d="M4 21v-2a4 4 0 0 1 3-3.87"></path><path d="M12 21v-2a4 4 0 0 0-3-3.87"></path><path d="M1 8h15"></path><circle cx="18" cy="8" r="3"></circle><path d="M23 11v-1a2 2 0 0 0-2-2h-6"></path></svg>Student Information</h3>
                          <div class="print-grid">
                            <div class="print-item">
                              <span class="print-label">Full Name</span>
                              <span class="print-value">${`${studentInfo?.personalDetail?.firstName} ${studentInfo?.personalDetail?.lastName}`}</span>
                            </div>
                            <div class="print-item">
                              <span class="print-label">Email Address</span>
                              <span class="print-value">${studentInfo?.personalDetail?.email}</span>
                            </div>
                            <div class="print-item">
                              <span class="print-label">Course</span>
                              <span class="print-value">${studentInfo?.personalDetail?.course}</span>
                            </div>
                            <div class="print-item">
                              <span class="print-label">University</span>
                              <span class="print-value">${studentInfo?.personalDetail?.university}</span>
                            </div>
                            <div class="print-item">
                              <span class="print-label">Phone</span>
                              <span class="print-value">${studentInfo?.personalDetail?.phone}</span>
                            </div>
                            <div class="print-item">
                              <span class="print-label">Status</span>
                              <span class="print-value">${studentInfo?.personalDetail?.entityStatus}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div class="print-section">
                          <h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: middle;"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>Financial Summary</h3>
                          <div class="print-grid">
                            <div class="print-item">
                              <span class="print-label">Accommodation Fee</span>
                              <span class="print-value">$${rowData?.accommodationFee?.toLocaleString() || "0"}</span>
                            </div>
                            <div class="print-item">
                              <span class="print-label">Flight Ticket</span>
                              <span class="print-value">$${rowData?.flightTicket?.toLocaleString() || "0"}</span>
                            </div>
                            <div class="print-item">
                              <span class="print-label">Service Charge</span>
                              <span class="print-value">$${rowData?.serviceCharge?.toLocaleString() || "0"}</span>
                            </div>
                            <div class="print-item">
                              <span class="print-label">Payment Status</span>
                              <span class="print-value">Pending</span>
                            </div>
                          </div>
                        </div>
                        
                        <div class="print-total">
                          <h4>Total Amount Due</h4>
                          <div class="amount">$${totalAmount.toLocaleString()}</div>
                          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">All amounts are inclusive of applicable taxes</p>
                        </div>
                        
                        <div class="print-footer">
                          <p>This document serves as an official application preview for ${studentInfo?.personalDetail?.firstName} ${studentInfo?.personalDetail?.lastName}.</p>
                          <p style="margin-top: 5px;">For any inquiries, please contact our support team.</p>
                        </div>
                      </div>
                    </body>
                  </html>
                `);
                printWindow.document.close();
                printWindow.print();
              }
            }}
            className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium shadow-sm"
          >
            <Printer size={16} /> Print Application
          </button> */}
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Top Profile Banner */}
          <div className="bg-slate-900 p-8 rounded-xl text-white shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Left Section */}
              <div className="flex items-center gap-6">
                {/* Passport Photo */}
                {studentInfo?.file?.path && (
                  <div className="relative w-24 h-32 border-2 border-white/20 rounded-md overflow-hidden shadow">
                    <Image
                      src={studentInfo.file.path}
                      alt="student"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Student Info */}
                <div>
                  <h2 className="text-2xl font-bold">
                    {studentInfo?.personalDetail?.firstName}{" "}
                    {studentInfo?.personalDetail?.lastName}
                  </h2>

                  <p className="text-slate-400 mt-1">
                    {studentInfo?.personalDetail?.course}
                  </p>

                  <p className="text-slate-500 text-sm mt-1">Student Profile</p>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col items-start md:items-end gap-2">
                <span
                  className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    studentInfo?.personalDetail?.isPasswordResetRequired
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  ● {studentInfo?.personalDetail?.entityStatus}
                </span>

                <p className="text-slate-500 text-xs">Status Verified</p>
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Column 1: Personal Details */}
            <div className="md:col-span-1 space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User size={14} /> Student Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">
                      {`${studentInfo?.personalDetail?.firstName} ${studentInfo?.personalDetail?.lastName}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-900">
                      {studentInfo?.personalDetail?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Institution</p>
                    <p className="font-medium text-gray-900">
                      {studentInfo?.personalDetail?.university}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FileText size={14} /> Documents
                </h3>
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600">
                      <FileText size={20} />
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {rowData?.documents &&
                        Object.entries(rowData.documents).map(
                          ([docType, files]) =>
                            files.map((file: any) => (
                              <div
                                key={file.id}
                                className="flex items-center gap-3 border rounded-lg p-2 shadow-sm"
                              >
                                {/* Preview */}
                                {file.path.endsWith(".pdf") ? (
                                  <iframe
                                    src={file.path}
                                    className="w-16 h-16 rounded border"
                                  />
                                ) : (
                                  <img
                                    src={file.path}
                                    alt={docType}
                                    className="w-16 h-16 object-cover rounded border"
                                  />
                                )}

                                {/* Info */}
                                <div>
                                  <p className="text-sm font-bold text-blue-900">
                                    {docType.replaceAll("_", " ")}
                                  </p>

                                  <p className="text-[10px] text-blue-500 uppercase tracking-tight">
                                    Ref: {file.id}
                                  </p>

                                  <button
                                    onClick={() => {
                                      setSelectedFile(file);
                                      setSelectedDocType(docType);
                                      setIsModalOpen(true);
                                    }}
                                    className="text-xs text-blue-600 underline hover:text-blue-800 transition-colors"
                                  >
                                    View Document
                                  </button>
                                </div>
                              </div>
                            )),
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2 & 3: Financials */}
            <div className="md:col-span-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CreditCard size={14} /> Billing Summary
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-2 text-gray-600">
                    <Home size={18} />
                    <span className="text-sm font-medium">Accommodation</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    ${rowData?.accommodationFee?.toLocaleString() || "0"}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-2 text-gray-600">
                    <Plane size={18} />
                    <span className="text-sm font-medium">Flight Ticket</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    ${rowData?.flightTicket?.toLocaleString() || "0"}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-2 text-gray-600">
                    <ShieldCheck size={18} />
                    <span className="text-sm font-medium">Service Charge</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    ${rowData?.serviceCharge?.toLocaleString() || "0"}
                  </p>
                </div>

                <div className="p-4 bg-blue-600 rounded-xl shadow-md flex flex-col justify-center">
                  <p className="text-blue-100 text-sm font-medium">
                    Total Balance
                  </p>
                  <p className="text-2xl font-extrabold text-white">
                    ${totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
                <p className="text-amber-800 text-xs leading-relaxed">
                  <strong>Note:</strong> All fees mentioned above are inclusive
                  of local taxes. Please ensure the documents are valid for at
                  least 6 months from the date of travel.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
        </div>
      </div>

      {/* Document Modal */}
      <DocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        file={selectedFile!}
        docType={selectedDocType}
      />
    </div>
  );
};

export default AfterVisaViewPage;
