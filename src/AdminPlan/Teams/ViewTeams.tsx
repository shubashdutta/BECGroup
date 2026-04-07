import React, { FC } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FcCancel } from "react-icons/fc";

interface TeamsProps {
  row: any;
}

const ViewTeams: FC<TeamsProps> = ({ row }) => {
  return (
    <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden">
      {/* Image */}
      <img
        src={row?.file?.path}
        alt={row?.studentName}
        className="w-full h-56 object-cover"
      />

      <div className="p-4 space-y-2 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">{row?.userName}</h3>

        <p className="text-sm text-gray-600">
          <strong>Designation:</strong> {row?.designation}
        </p>

        {/* University */}
        <div className="flex items-center gap-2 text-sm">
          <strong className="text-gray-600">Status:</strong>

          {row?.isActive ? (
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <CiCircleCheck size={18} />
              Active
            </span>
          ) : (
            <span className="flex items-center gap-1 text-red-500 font-medium">
              <FcCancel size={18} />
              Inactive
            </span>
          )}
        </div>

        {/* Location */}
      </div>
    </div>
  );
};

export default ViewTeams;
