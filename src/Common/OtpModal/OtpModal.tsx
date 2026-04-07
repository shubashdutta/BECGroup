import { VerfiyOtp } from "@/src/ApiList/PublicApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import React, { FC, useState } from "react";
import SubmitAndCancelBtn from "../SubmitAndCancelBtn";
import { useRouter } from "next/navigation";
import { useModal } from "@/src/utils/Modal/OpenModalProvider";

interface OtpProps {
  email?: any;
  onClose: () => void;
}

const OtpModal: FC<OtpProps> = ({ email, onClose }) => {
  const router = useRouter();
  const { closeModal } = useModal();
  const otpLength = 6;
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const [message, setMessage] = useState("");

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, otpLength);
    const pasteArray = paste.split("");

    const newOtp = [...otp];
    pasteArray.forEach((char, i) => {
      if (/^[a-zA-Z0-9]$/.test(char) && i < otpLength) {
        newOtp[i] = char;
        const nextInput = document.getElementById(`otp-${i}`);
        nextInput?.focus();
      }
    });
    setOtp(newOtp);
  };

  const handleChange = (index: number, value: string) => {
    if (!/^[a-zA-Z0-9]*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otpLength - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < otpLength) {
      setMessage("Please enter complete OTP");
      return;
    }

    const payload = {
      email,
      otp: enteredOtp,
      userType: "APPLICATION",
    };
    try {
      const res: any = await VerfiyOtp(payload);
      localStorage.setItem("email", JSON.stringify(email));
      successMessage({ message: res?.message });
      onClose();
      closeModal();

      //   localStorage.setItem("email", JSON.stringify(email));
      router.push("/student-application");
    } catch (error) {
      errorMessage({ error });
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white w-full max-w-sm mx-4 rounded-xl shadow-xl overflow-hidden">
          <div className="relative px-5 py-4 border-b border-gray-200">
            <h5 className="text-lg font-semibold text-center">
              OTP Verification
            </h5>
            <p className="mt-1 text-sm text-center text-gray-500">
              Enter the 6-digit OTP sent to your email
            </p>

            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-black text-2xl"
            >
              &times;
            </button>
          </div>

          <form className="px-5 py-6">
            <div className="flex justify-center gap-3 mb-5">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  maxLength={1}
                  className="w-12 h-12 rounded-lg border border-gray-300 text-center text-xl font-semibold focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
                />
              ))}
            </div>

            {message && (
              <p className="text-center text-sm text-green-600">{message}</p>
            )}
          </form>

          {/* Footer */}
          <div className="flex justify-between items-center px-5 py-4 border-t border-gray-200">
            {/* Cancel */}
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-black"
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={handleVerify}
              className=" cursor-pointer bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium px-5 py-2 rounded-lg"
            >
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
