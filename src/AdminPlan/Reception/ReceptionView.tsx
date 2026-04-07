"use client";

import { VerfiyReception } from "@/src/ApiList/AdminApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";
import React, { FC, useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";

interface ReceptionViewProps {
  row?: any;

  fun?: any;
}

const ReceptionView: FC<ReceptionViewProps> = ({ row, fun }) => {
  const [loading, setLoading] = useState(false); // ⬅️ Loading state

  const { closeModal } = useModal();
  const handleVerfiy = async () => {
    setLoading(true);
    const payload = {
      id: row?.id,
    };

    try {
      const res: any = await VerfiyReception(payload);
      successMessage({ message: res?.message });
      closeModal();
      fun();
    } catch (error) {
      errorMessage({ error });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <div className="bg-white rounded-xl shadow-lg overflow-y-auto max-h-96 p-6">
        {/* <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{row?.fullName}</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              row?.verificationStatus === "PENDING"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {row?.verificationStatus}
          </span>
        </div> */}

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {row?.fullName}
            </h2>

            {row?.verificationStatus === "VERIFIED" && (
              <BsPatchCheckFill className="text-blue-500 text-xl" />
              // <MdVerified className="text-blue-500 text-xl" />
            )}
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              row?.verificationStatus === "PENDING"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {row?.verificationStatus}
          </span>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 border-b pb-1">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-gray-600">
                <strong>Email:</strong> {row?.email || "-"}
              </p>
              <p className="text-gray-600">
                <strong>Mobile:</strong> {row?.mobile || "-"}
              </p>
              <p className="text-gray-600">
                <strong>Address:</strong> {row?.currentAddress || "-"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <strong>Language:</strong> {row?.language || "-"}
              </p>
              <p className="text-gray-600">
                <strong>Preferred Country:</strong>{" "}
                {row?.preferredCountry || "-"}
              </p>
              <p className="text-gray-600">
                <strong>Reference:</strong> {row?.reference || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Counseling Info */}
        {row?.counselingDate && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 border-b pb-1">
              Counseling Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <p className="text-gray-600">
                <strong>Date:</strong> {row.counselingDate.join("-")}
              </p>
              <p className="text-gray-600">
                <strong>Time:</strong> {row.counselingTime || "-"}
              </p>
              <p className="text-gray-600">
                <strong>Mode:</strong> {row.counselingMode || "-"}
              </p>
            </div>
          </div>
        )}

        {/* Education Details */}
        {row?.educationDetails?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2 border-b pb-1">
              Education Details
            </h3>
            <div className="overflow-x-auto mt-2">
              <table className="min-w-full border border-gray-200 text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border-b">Level</th>
                    <th className="p-2 border-b">Institution</th>
                    <th className="p-2 border-b">Course/Stream</th>
                    <th className="p-2 border-b">Year</th>
                    <th className="p-2 border-b">Percentage/GPA</th>
                  </tr>
                </thead>
                <tbody>
                  {row.educationDetails.map((edu: any, idx: number) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-2 border-b">{edu.educationLevel}</td>
                      <td className="p-2 border-b">{edu.institutionName}</td>
                      <td className="p-2 border-b">{edu.courseOrStream}</td>
                      <td className="p-2 border-b">{edu.yearOfPassing}</td>
                      <td className="p-2 border-b">{edu.percentageOrGpa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {row?.verificationStatus === "PENDING" && (
        <div className="flex justify-end shadow rounded bg-gray-200 p-3 mt-3">
          <button
            onClick={handleVerfiy}
            disabled={loading}
            className={`flex cursor-pointer items-center justify-center py-2 px-4 rounded text-white font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReceptionView;
