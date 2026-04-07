"use client";

export const LocalYearMonthDate = (
  dateParts: [number, number, number, number]
): string => {
  const [year, month, day, hour] = dateParts;

  const dateObj = new Date(year, month - 1, day, hour);

  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(
    dateObj.getDate()
  )}`;
};

// Accepts [year, month, day]
export const YearDateMonth = (date: [number, number, number]) => {
  if (!date) return "";

  const localDate = new Date(date[0], date[1] - 1, date[2]);

  // Get YYYY-MM-DD in local time
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const day = String(localDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const LocalDateTime = (date: any) => {
  if (!date || !Array.isArray(date) || date.length < 6) {
    return;
  }
  const [year, month, day, hour, minute, second] = date;
  const localDate = new Date(year, month - 1, day, hour, minute, second);
  return localDate.toLocaleString();
};
