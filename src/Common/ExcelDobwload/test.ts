import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * Dynamically exports any array of objects to Excel
 * @param data - Array of objects
 * @param fileName - Optional file name
 */
export const exportToExcelDynamic = (data: any[], fileName = "data.xlsx") => {
  if (!data || data.length === 0) {
    console.warn("No data provided for export");
    return;
  }

  // Flatten any nested arrays/dates automatically
  const formattedData = data.map((item) => {
    const flatItem: Record<string, any> = {};

    Object.keys(item).forEach((key) => {
      const value = item[key];

      // If value is an array like your [2026, 2, 16, 15, 56, 19, 67301000], convert to date
      if (
        Array.isArray(value) &&
        value.length >= 6 &&
        value.every((v) => typeof v === "number")
      ) {
        new Date(
          ...(item.createdDate as [
            number,
            number,
            number,
            number,
            number,
            number,
            number,
          ]),
        );
      }
      // Otherwise just assign the value
      else {
        flatItem[key] = value;
      }
    });

    return flatItem;
  });

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Create workbook and append worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate excel buffer
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Save as file
  const dataBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  saveAs(dataBlob, fileName);
};
