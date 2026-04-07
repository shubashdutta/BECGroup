"use client";

import { useEmployee } from "@/store/useEmpolyeeInfo";
import React from "react";

type InfoRowProps = {
  label: string;
  value: string;
};

type InfoCardProps = {
  title: string;
  children: React.ReactNode;
};

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-3 py-1 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="col-span-2 font-medium text-gray-900">{value}</span>
  </div>
);

const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="text-base font-semibold mb-3 border-b pb-1">{title}</h3>
    {children}
  </div>
);
const EmployeeDetails = () => {
  const Empolyee = useEmployee((state) => state?.employee);

  return (
    <div className=" container mx-auto shadow p-4 rounded">
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow mb-3">
        <img
          src={Empolyee?.file?.path}
          alt="Student"
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h2 className="text-lg font-semibold">
            {`${Empolyee?.firstName} ${
              Empolyee?.middleName ?? Empolyee?.middleName
            } ${Empolyee?.lastName}`}
          </h2>
          <p className="text-sm text-gray-500">Empolyee</p>
          <p className="text-sm text-gray-500">{Empolyee?.email}</p>
          <p className="text-sm text-gray-500">{Empolyee?.mobileNumber}</p>
        </div>
      </div>

      <InfoCard title="Permission Allow">
        {Empolyee?.role?.map((v: any, i: number) => {
          const label = v.name.split("(")[0]; // before (
          const value = v.name.includes("(")
            ? v.name.split("(")[1].replace(")", "")
            : "";

          return <InfoRow key={i} label={label} value={value} />;
        })}
      </InfoCard>
    </div>
  );
};

export default EmployeeDetails;
