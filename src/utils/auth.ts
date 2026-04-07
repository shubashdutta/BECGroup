export const getJwtToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token"); // change key if needed
};
