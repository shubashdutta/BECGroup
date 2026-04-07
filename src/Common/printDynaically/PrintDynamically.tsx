import React from "react";

interface PrintDynamicallyProps {
  data: any[];
  title: string;
}

const PrintDynamically: React.FC<PrintDynamicallyProps> = ({ data, title }) => {
  const handlePrint = () => {
    if (!data || data.length === 0) {
      alert("No data to print");
      return;
    }

    // Get dynamic headers
    const headers = Object.keys(data[0]);

    // Create table rows
    const rows = data
      .map(
        (row) =>
          `<tr>
            ${headers
              .map((key) => {
                const value = row[key];
                // Check if the value is an image URL
                if (
                  typeof value === "string" &&
                  (value.startsWith("http") || value.startsWith("data:image"))
                ) {
                  return `<td style="padding:8px; border:1px solid #ccc; text-align: center;">
                      <img src="${value}" alt="${key}" style="max-width: 100px; max-height: 100px; object-fit: cover;" />
                    </td>`;
                }
                // Check if the value is an object with path property (like file objects)
                else if (value && typeof value === "object" && value.path) {
                  return `<td style="padding:8px; border:1px solid #ccc; text-align: center;">
                      <img src="${value.path}" alt="${key}" style="max-width: 100px; max-height: 100px; object-fit: cover;" />
                    </td>`;
                }
                // Regular text content
                else {
                  return `<td style="padding:8px; border:1px solid #ccc;">
                      ${value ?? ""}
                    </td>`;
                }
              })
              .join("")}
          </tr>`,
      )
      .join("");

    // Create full HTML
    const html = `
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            h2 {
              text-align: center;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th {
              background: #f2f2f2;
              border: 1px solid #ccc;
              padding: 10px;
              text-transform: capitalize;
            }
            td {
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h2>${title}</h2>
          <table>
            <thead>
              <tr>
                ${headers.map((header) => `<th>${header}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Open print window with proper data URL to allow image loading
    const printWindow = window.open("", "_blank", "width=800,height=600");

    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();

      // Wait for images to load before printing
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };

      // Fallback: print after a short delay if onload doesn't fire
      setTimeout(() => {
        if (
          !printWindow.document.readyState ||
          printWindow.document.readyState === "complete"
        ) {
          printWindow.focus();
          printWindow.print();
        }
      }, 5000);
    }
  };

  return (
    <button
      onClick={handlePrint}
      style={{
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      Print / Save as PDF
    </button>
  );
};

export default PrintDynamically;
