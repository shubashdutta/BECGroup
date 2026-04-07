export function formatToFormDate(
  value?: [number, number, number, number?, number?, number?, number?]
): string {
  if (!value || !Array.isArray(value)) return "";

  try {
    const date = new Date(...value);

    if (isNaN(date.getTime())) return "";

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}T${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  } catch {
    return "";
  }
}

export function formatDateOfBirth(dobArray: any) {
  if (!Array.isArray(dobArray) || dobArray.length !== 3) return null;

  const [year, month, day] = dobArray;

  // Pad month and day with leading zeros if needed
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");

  return `${year}-${formattedMonth}-${formattedDay}`;
}
