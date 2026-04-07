import React, { useRef } from "react";
import QRCode from "react-qr-code";

const Logo = new URL("@/asstest/Image/DashbaordLogo.png", import.meta.url).href;

const ReceptionQR = () => {
  const qrRef = useRef<HTMLDivElement>(null);

  const getQrUrl = () =>
    window.location.hostname === "localhost"
      ? "http://10.37.145.201:3001/application"
      : `${window.location.origin}/application`;

  const handlePrint = () => {
    if (!qrRef.current) return;

    const qrHtml = qrRef.current.outerHTML;

    const printWindow = window.open("", "_blank", "width=600,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
  <html>
    <head>
      <title>Print QR</title>
      <style>
        body {
         
          height: 100vh;
          margin: 0;
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
          width: 300px; 
          height: 300px; 
        }
      </style>
    </head>
    <body>

     <div class="logo">
     <img  src=${Logo} alt="Logo" />
     <h2>Reception Form</h2>
     </div>

      <div class="QR">
       ${qrHtml}
      </div>
    
     
    </body>
  </html>
`);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="">
      <div
        ref={qrRef}
        className="border hidden flex justify-center p-4 bg-white"
      >
        <QRCode
          value={getQrUrl()}
          size={70}
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>

      <div className="flex gap-3 justify-center">
        <button
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handlePrint}
        >
          Print QR
        </button>
      </div>
    </div>
  );
};

export default ReceptionQR;
