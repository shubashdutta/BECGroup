import React, { useRef } from "react";
import { toPng } from "html-to-image";
import { FcPrint } from "react-icons/fc";
import QRCode from "react-qr-code";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";
import { successMessage } from "../ToastifyMessage/ToastifyMessage";
import { MdContentCopy } from "react-icons/md";

const Logo = new URL("@/asstest/Image/DashbaordLogo.png", import.meta.url).href;
const StudentApplicationQr = () => {
  const qrRef = useRef<HTMLDivElement>(null);

  const cureentUser = getCurrentUserInfo();

  const qrUrl =
    window.location.hostname === "localhost"
      ? ` http://192.168.1.67:3001/register/${cureentUser?.id}`
      : `${window.location.origin}/register/${cureentUser?.id}`;

  const printQRPage = () => {
    if (!qrRef.current) return;

    // Get the outerHTML of the QR div (includes the SVG)
    const qrHtml = qrRef.current.outerHTML;

    // Open a new print window
    const printWindow = window.open("", "_blank", "width=600,height=800");
    if (!printWindow) return;

    // Write the HTML for print
    printWindow.document.write(`
    <html>
      <head>
        <title>Print QR</title>
        <style>
          body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
          }

          .logo{
         display: flex;
          justify-content: center;
          align-items: center;
           margin-bottom:5%;
         
          }
          .QR{
           display:flex;
            justify-content: center;
           
         
          }
       
          svg {
            width: 300px;   /* printed QR width */
            height: 300px;  /* printed QR height */
          }

          p {
            margin-top: 16px;
            font-size: 14px;
            text-align: center;
            word-break: break-all;
          }
        </style>
      </head>
      <body>

       <div class="logo">
       <img  src=${Logo} alt="Logo" />
       <h2>Application Form</h2>
       </div>
        ${qrHtml}
        <p>${window.location.href}</p>
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleCopyLink = async () => {
    if (!qrUrl) return;

    try {
      await navigator.clipboard.writeText(qrUrl);
      successMessage({ message: "Link copied!" });
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-4 gap-4 items-center">
        <div ref={qrRef} className="p-2 border rounded flex justify-center">
          <QRCode value={qrUrl} size={70} bgColor="#ffffff" fgColor="#000000" />
        </div>

        <div
          className=" col-span-2 flex items-center justify-center space-x-2 h-14 w-30 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg cursor-pointer transition-all duration-200"
          onClick={printQRPage}
        >
          <FcPrint size={30} />
          <span>Print QR</span>
        </div>

        <div className=" col-span-1">
          <button
            type="button"
            onClick={handleCopyLink}
            title="Copy registration link"
            className="   cursor-pointer h-12 w-12 flex items-center justify-center
             bg-green-600 text-white rounded-full
             shadow hover:bg-green-700 transition"
          >
            <MdContentCopy size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentApplicationQr;
