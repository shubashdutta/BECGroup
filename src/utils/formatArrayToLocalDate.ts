export const formatArrayToYMD = (dateArray: any) => {
  if (!Array.isArray(dateArray) || dateArray.length < 3) return null;

  const [year, month, day] = dateArray;

  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");

  return `${year}-${mm}-${dd}`;
};

export const HtmlDateFormat = (dateArray: any) => {
  if (!Array.isArray(dateArray) || dateArray.length < 3) return "";

  const [year, month, day] = dateArray;

  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");

  return `${year}-${mm}-${dd}`;
};
