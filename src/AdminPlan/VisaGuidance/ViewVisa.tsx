import React, { FC } from "react";

interface Visaprops {
  row: any;
}

const ViewVisa: FC<Visaprops> = ({ row }) => {
  return (
    <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden">
      {/* Image */}
      <img
        src={row?.file?.path}
        alt={row?.studentName}
        className="w-full h-56 object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{row?.studentName}</h3>

        <p className="text-sm text-gray-600">
          <strong>Course:</strong> {row?.courseName}
        </p>

        {/* University */}
        <p className="text-sm text-gray-600">
          <strong>University:</strong> {row?.universityName}
        </p>

        {/* Location */}
        <p className="text-sm text-gray-600">
          <strong>Location:</strong> {row?.location}
        </p>
      </div>
    </div>
  );
};

export default ViewVisa;
