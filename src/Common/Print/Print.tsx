import React, { forwardRef } from "react";
import Logo from "@/asstest/Image/Logo.png"; // Next.js static import

const PrintPage = forwardRef<HTMLDivElement>((props, ref) => {
  const data = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
    { name: "Robert Brown", email: "robert@example.com" },
  ];

  return (
    <div
      ref={ref}
      style={{
        width: "210mm",
        height: "297mm",
        padding: "20mm",
        boxSizing: "border-box",
        backgroundImage: `url(${Logo.src})`, // Use Logo.src
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Employee Data
      </h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #000", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #000", padding: "8px" }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #000", padding: "8px" }}>
                {item.name}
              </td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>
                {item.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

PrintPage.displayName = "PrintableComponent";

export default PrintPage;
