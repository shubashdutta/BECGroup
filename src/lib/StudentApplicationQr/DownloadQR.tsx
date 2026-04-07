import React from "react";
import { toPng } from "html-to-image";
import QRCode from "react-qr-code";

const DownloadQR = () => {
  const downloadQR = async () => {
    const node = document.getElementById("qr-code");
    if (!node) {
      return;
    }
    const dataUrl = await toPng(node);
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = dataUrl;
    link.click();
  };
  return (
    <>
      <div id="qr-code" style={{ background: "white", padding: 16 }}>
        <QRCode value="Hello from Next.js" size={200} />
      </div>

      <button onClick={downloadQR} className="mt-3">
        Download QR
      </button>
    </>
  );
};

export default DownloadQR;
