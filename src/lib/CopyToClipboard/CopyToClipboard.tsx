import React, { FC } from "react";
import {
  errorMessage,
  successMessage,
} from "../ToastifyMessage/ToastifyMessage";
import { FiCopy } from "react-icons/fi";

interface CopyToClipboardProps {
  text: string;
  success?: any;
}

const CopyToClipboard: FC<CopyToClipboardProps> = ({
  text,
  success = "Copied to clipboard!",
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      successMessage({ message: success });
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1 cursor-pointer text-blue-600 hover:text-blue-800"
    >
      <FiCopy size={16} />
    </button>
  );
};

export default CopyToClipboard;
