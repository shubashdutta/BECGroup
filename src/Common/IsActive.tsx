import React, { FC } from "react";
import { FcApproval, FcCancel } from "react-icons/fc";

interface isActiveProps {
  isActive?: boolean;
}

const IsActive: FC<isActiveProps> = ({ isActive }) => {
  return (
    <td className=" flex items-center justify-center border-none">
      {isActive ? <FcApproval size={25} /> : <FcCancel />}
    </td>
  );
};

export default IsActive;
