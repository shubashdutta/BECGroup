// "use client";

// import { VerfiyOtp } from "@/src/ApiList/PublicApi";
// import {
//   errorMessage,
//   successMessage,
// } from "@/src/lib/ToastifyMessage/ToastifyMessage";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { useState } from "react";

// const page = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email");
//   const otpLength = 6;
//   const [otp, setOtp] = useState(Array(otpLength).fill(""));
//   const [message, setMessage] = useState("");

//   const handleChange = (index: number, value: string) => {
//     if (!/^[a-zA-Z0-9]*$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < otpLength - 1) {
//       const nextInput = document.getElementById(`otp-${index + 1}`);
//       nextInput?.focus();
//     }
//   };

//   const handleKeyDown = (
//     index: number,
//     e: React.KeyboardEvent<HTMLInputElement>
//   ) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       const prevInput = document.getElementById(`otp-${index - 1}`);
//       prevInput?.focus();
//     }
//   };

//   const handleVerify = async () => {
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length < otpLength) {
//       setMessage("Please enter complete OTP");
//       return;
//     }

//     const payload = {
//       email,
//       otp: enteredOtp,
//       userType: "APPLICATION",
//     };
//     try {
//       const res: any = await VerfiyOtp(payload);
//       successMessage({ message: res?.message });
//       localStorage.setItem("email", JSON.stringify(email));
//       router.push("/profile");
//     } catch (error) {
//       errorMessage({ error });
//     }
//   };
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center mb-4">
//           OTP Verification
//         </h2>
//         <p className="text-center text-gray-500 mb-6">
//           Enter the 6-character OTP sent to your email
//         </p>

//         <div className="flex justify-between mb-6">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               value={digit}
//               onChange={(e) => handleChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//               maxLength={1}
//               className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//             />
//           ))}
//         </div>

//         {message && (
//           <p className="text-center text-sm text-green-500 mb-4">{message}</p>
//         )}

//         <button
//           onClick={handleVerify}
//           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Verify OTP
//         </button>
//       </div>
//     </div>
//   );
// };

// export default page;

"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { VerfiyOtp } from "@/src/ApiList/PublicApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const otpLength = 6;
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
  const [message, setMessage] = useState("");

  /* ------------------ INPUT CHANGE ------------------ */
  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otpLength - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  /* ------------------ BACKSPACE NAV ------------------ */
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  /* ------------------ PASTE OTP ------------------ */
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otpLength);

    if (!pasted) return;

    const newOtp = pasted.split("");
    setOtp((prev) => {
      const updated = [...prev];
      newOtp.forEach((char, idx) => {
        updated[idx] = char;
      });
      return updated;
    });

    document.getElementById(`otp-${pasted.length - 1}`)?.focus();
  };

  /* ------------------ VERIFY OTP ------------------ */
  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length < otpLength) {
      setMessage("Please enter complete OTP");
      return;
    }

    try {
      const payload = {
        email,
        otp: enteredOtp,
        userType: "APPLICATION",
      };

      const res: any = await VerfiyOtp(payload);
      successMessage({ message: res?.message });
      localStorage.setItem("email", JSON.stringify(email));
      router.push("/profile");
    } catch (error) {
      errorMessage({ error });
    }
  };

  /* ------------------ AUTO SUBMIT (OPTIONAL) ------------------ */
  useEffect(() => {
    if (otp.join("").length === otpLength) {
      setMessage("");
    }
  }, [otp]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          OTP Verification
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Enter the 6-digit OTP sent to your email
        </p>

        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          ))}
        </div>

        {message && (
          <p className="text-center text-sm text-red-500 mb-4">{message}</p>
        )}

        <button
          onClick={handleVerify}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default Page;
