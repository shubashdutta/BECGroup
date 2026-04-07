export const toNumber = (value: any) => {
  if (!value) return 0;
  return Number(String(value).replace(/,/g, ""));
};
