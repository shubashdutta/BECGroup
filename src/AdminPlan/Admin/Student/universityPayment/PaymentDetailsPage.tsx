import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AdminStudentDetails } from "@/src/ApiList/AdminApi";
import { apiRequest } from "@/src/lib/axiosSetup";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import ExcelDonwloadBtn from "@/src/Common/ExcelDonwloadBtn";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { baseUrl } from "@/config";

/* ---------------- Types ---------------- */
type PaymentDetails = {
  documentationCharge?: number;
  universityFirstInstallment?: number;
  universitySecondInstallment?: number;
  universityThirdInstallment?: number;
  visaFee?: number;
  medicalFee?: number;
  loanFee?: number;
  insuranceFee?: number;
  sopFee?: number;
  dateBookFee?: number;
  casLetters?: any[];
  ukviAccounts?: any[];
  [key: string]: any;
};

type OfferLetterPayment = {
  country: string;
  documents: Record<string, any>;
  ukPayment?: PaymentDetails | null;
  otherPayment?: PaymentDetails | null;
  multiDocuments?: {
    OTHER?: any[];
  };
};

type StudentInfo = {
  personalDetail?: any;
  file?: any;
};

type Props = {
  id: number;
};

/* ---------------- Image Preview Modal ---------------- */
const ImagePreviewModal = ({
  image,
  document: fileDoc,
  onClose,
}: {
  image: string | null;
  document: any | null;
  onClose: () => void;
}) => {
  if (!image) return null;

  const downloadZip = async (id: number) => {
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
      const filename = `file-${id}`;

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

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white p-4 rounded-xl max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <div className="flex gap-x-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 flex items-center gap-2"
              onClick={() => downloadZip(fileDoc?.id)}
              title="Download Image"
            >
              <IoCloudDownloadOutline className="text-lg" />
              Download
            </button>
            <button
              className="text-xl font-bold cursor-pointer hover:text-gray-600"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>

        <div className="relative w-full h-[500px]">
          <Image
            src={image}
            alt="preview"
            fill
            className="object-contain rounded"
          />
        </div>
      </div>
    </div>
  );
};

/* ---------------- Payment Card ---------------- */
const PaymentCard = ({
  title,
  amount,
  imageUrl,
  onPreview,
}: {
  title: string;
  amount: number;
  imageUrl?: string;
  onPreview?: (documentObj?: any) => void;
}) => {
  const isPdf = imageUrl?.toLowerCase().endsWith(".pdf");

  return (
    <div className="bg-white shadow rounded-xl p-4 text-center hover:scale-105 transition">
      <p className="text-gray-500 text-sm">{title}</p>

      <p className="text-xl font-bold">₹ {amount.toLocaleString("en-IN")}</p>

      {imageUrl && (
        <div className="mt-3">
          {isPdf ? (
            <a href={imageUrl} target="_blank" className="text-red-600 text-sm">
              📄 View PDF
            </a>
          ) : (
            <div
              className="relative w-20 h-20 mx-auto cursor-pointer"
              onClick={() => onPreview?.()}
            >
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover rounded hover:opacity-80"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ---------------- CAS Card ---------------- */
const CasCard = ({ cas }: { cas: any }) => {
  const [show, setShow] = useState(false);
  const copy = (text: string) => navigator.clipboard.writeText(text);

  return (
    <div className="bg-white shadow p-4 rounded-xl border space-y-2">
      <h4 className="font-semibold text-gray-700">CAS Credentials</h4>

      <div className="flex justify-between bg-gray-100 p-2 rounded">
        <span className="font-mono">{cas.casId}</span>
        <button
          onClick={() => copy(cas.casId)}
          className="text-blue-600 text-sm"
        >
          Copy
        </button>
      </div>

      <div className="flex justify-between bg-gray-100 p-2 rounded">
        <span className="font-mono">{show ? cas.password : "••••••••"}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setShow(!show)}
            className="text-indigo-600 text-sm"
          >
            {show ? "Hide" : "Show"}
          </button>
          <button
            onClick={() => copy(cas.password)}
            className="text-blue-600 text-sm"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- UKVI Account Card ---------------- */
const UkviAccountCard = ({ account }: { account: any }) => {
  const [show, setShow] = useState(false);
  const copy = (text: string) => navigator.clipboard.writeText(text);

  return (
    <div className="bg-white shadow p-4 rounded-xl border space-y-2">
      <h4 className="font-semibold text-gray-700">UKVI Account</h4>

      <div className="flex justify-between bg-gray-100 p-2 rounded">
        <span className="font-mono">{account.accountId}</span>
        <button
          onClick={() => copy(account.accountId)}
          className="text-blue-600 text-sm"
        >
          Copy
        </button>
      </div>

      <div className="flex justify-between bg-gray-100 p-2 rounded">
        <span className="font-mono">
          {show ? account.password : "••••••••"}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setShow(!show)}
            className="text-indigo-600 text-sm"
          >
            {show ? "Hide" : "Show"}
          </button>
          <button
            onClick={() => copy(account.password)}
            className="text-blue-600 text-sm"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Region Payment ---------------- */
const RegionPaymentCard = ({
  region,
  payment,
  documents,
  onPreview,
}: {
  region: OfferLetterPayment;
  payment?: PaymentDetails | null;
  documents?: Record<string, any>;
  onPreview: (url: string) => void;
}) => {
  if (!payment) return null;

  const normalize = (str: string) => str.replace(/[_]/g, "").toLowerCase();
  const usedDocs = new Set<string>();

  const total = Object.entries(payment)
    .filter(([_, v]) => typeof v === "number")
    .reduce((acc, [_, v]) => acc + v, 0);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl space-y-6 shadow">
      <h2 className="text-xl font-semibold text-indigo-700">
        Payment Details - {region.country}
      </h2>

      {/* Payment Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Object.entries(payment)
          .filter(([_, value]) => typeof value === "number")
          .map(([key, value]) => {
            let imageUrl: string | undefined;
            if (documents) {
              const docKey = Object.keys(documents).find(
                (d) => normalize(d) === normalize(key),
              );
              if (docKey) {
                imageUrl = documents[docKey]?.path;
                usedDocs.add(docKey);
              }
            }
            let documentObj: any | undefined;
            if (documents) {
              const docKey = Object.keys(documents).find(
                (d) => normalize(d) === normalize(key),
              );
              if (docKey) {
                documentObj = documents[docKey];
              }
            }

            return (
              <PaymentCard
                key={key}
                title={key.replace(/([A-Z])/g, " $1")}
                amount={value as number}
                imageUrl={imageUrl}
                onPreview={() => documentObj && onPreview(documentObj)}
              />
            );
          })}
      </div>

      {/* Total */}
      <div className="bg-white rounded-lg p-3 text-center font-semibold shadow-inner">
        Total: ₹ {total.toLocaleString("en-IN")}
      </div>

      {/* Other Documents */}
      {documents && (
        <div>
          {/* <h3 className="font-semibold text-gray-700 mb-3">Other Documents</h3> */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(documents)
              .filter(([key]) => !usedDocs.has(key))
              .map(([key, doc]) => {
                // Handle single document
                if (doc && typeof doc === "object" && doc.path) {
                  const isPdf = doc.fileType?.includes("pdf");
                  return (
                    <div
                      key={key}
                      className="bg-white p-3 rounded shadow text-center"
                    >
                      <p className="text-sm text-gray-500 mb-2">
                        {key.replace(/_/g, " ")}
                      </p>
                      {isPdf ? (
                        <a
                          href={doc.path}
                          target="_blank"
                          className="text-red-600 text-sm"
                        >
                          📄 View PDF
                        </a>
                      ) : (
                        <div
                          className="relative w-20 h-20 mx-auto cursor-pointer"
                          onClick={() => onPreview(doc)}
                        >
                          <Image
                            src={doc.path}
                            alt={key}
                            fill
                            className="object-cover rounded hover:opacity-80"
                          />
                        </div>
                      )}
                    </div>
                  );
                }

                // Handle multiple documents (array)
                if (Array.isArray(doc)) {
                  return doc.map((singleDoc, index) => {
                    const isPdf = singleDoc.fileType?.includes("pdf");
                    return (
                      <div
                        key={`${key}-${index}`}
                        className="bg-white p-3 rounded shadow text-center"
                      >
                        <p className="text-sm text-gray-500 mb-2">
                          {key.replace(/_/g, " ")} {index + 1}
                        </p>
                        {isPdf ? (
                          <a
                            href={singleDoc.path}
                            target="_blank"
                            className="text-red-600 text-sm"
                          >
                            📄 View PDF
                          </a>
                        ) : (
                          <div
                            className="relative w-20 h-20 mx-auto cursor-pointer"
                            onClick={() => onPreview(singleDoc)}
                          >
                            <Image
                              src={singleDoc.path}
                              alt={`${key}-${index}`}
                              fill
                              className="object-cover rounded hover:opacity-80"
                            />
                          </div>
                        )}
                      </div>
                    );
                  });
                }

                return null;
              })}
          </div>
        </div>
      )}

      {/* Multi Documents - OTHER */}
      {region.multiDocuments?.OTHER &&
        region.multiDocuments.OTHER.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              Other Documents (Multi)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {region.multiDocuments.OTHER.map((doc: any, index: number) => {
                const isPdf = doc.fileType?.includes("pdf");
                return (
                  <div
                    key={`multi-other-${index}`}
                    className="bg-white p-3 rounded shadow text-center"
                  >
                    <p className="text-sm text-gray-500 mb-2">
                      Document {index + 1}
                    </p>
                    {isPdf ? (
                      <a
                        href={doc.path}
                        target="_blank"
                        className="text-red-600 text-sm"
                      >
                        📄 View PDF
                      </a>
                    ) : (
                      <div
                        className="relative w-20 h-20 mx-auto cursor-pointer"
                        onClick={() => onPreview(doc)}
                      >
                        <Image
                          src={doc.path}
                          alt={`multi-other-${index}`}
                          fill
                          className="object-cover rounded hover:opacity-80"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      {/* CAS Letters */}
      {payment?.casLetters && payment.casLetters.length > 0 && (
        <div className="space-y-3">
          {/* <h3 className="font-semibold text-gray-700">CAS Letters</h3> */}
          {payment.casLetters
            .filter((cas: any) => cas.casId && cas.casId.trim() !== "")
            .map((cas: any) => (
              <CasCard key={cas.id} cas={cas} />
            ))}
        </div>
      )}

      {/* UKVI Accounts */}
      {payment?.ukviAccounts && payment.ukviAccounts.length > 0 && (
        <div className="space-y-3">
          {/* <h3 className="font-semibold text-gray-700">UKVI Accounts</h3> */}
          {payment.ukviAccounts
            .filter(
              (account: any) =>
                account.accountId && account.accountId.trim() !== "",
            )
            .map((account: any) => (
              <UkviAccountCard key={account.id} account={account} />
            ))}
        </div>
      )}
    </div>
  );
};

/* ---------------- Main Page ---------------- */
const PaymentDetailsPage: FC<Props> = ({ id }) => {
  const [paymentData, setPaymentData] = useState<OfferLetterPayment[]>([]);
  const [email, setEmail] = useState<string | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [previewDocument, setPreviewDocument] = useState<any | null>(null);

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

  const getPayments = async () => {
    try {
      const res: any = await apiRequest.get("api/offer-letter/payment/all", {
        params: { offerLetterId: id, statusIn: "ACTIVE" },
      });
      setPaymentData(res.data || []);
    } catch (e) {
      errorMessage(e);
    }
  };

  useEffect(() => {
    getStudent();
  }, [email]);
  useEffect(() => {
    if (id) getPayments();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Student Payment Dashboard</h1>

      {studentInfo && (
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
          {studentInfo.file?.path && (
            <div className="relative w-20 h-20">
              <Image
                src={studentInfo.file.path}
                alt="student"
                fill
                className="rounded-full object-cover"
              />
            </div>
          )}
          <p className="text-lg font-semibold">
            {studentInfo.personalDetail?.firstName}{" "}
            {studentInfo.personalDetail?.lastName}
          </p>
        </div>
      )}

      {paymentData.map((region, i) => {
        return (
          <RegionPaymentCard
            key={i}
            region={region}
            payment={region.ukPayment ?? region.otherPayment}
            documents={region.documents}
            onPreview={(documentObj) => setPreviewDocument(documentObj)}
          />
        );
      })}

      <ImagePreviewModal
        image={previewDocument?.path || null}
        document={previewDocument}
        onClose={() => setPreviewDocument(null)}
      />
    </div>
  );
};

export default PaymentDetailsPage;
