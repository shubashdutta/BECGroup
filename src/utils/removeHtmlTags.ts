export const removeHtmlTag = (
  html: string = "",
  wordLimit: number = 10,
): string => {
  if (!html) return "";

  // Remove HTML + decode entities
  const temp = document.createElement("div");
  temp.innerHTML = html;

  let text = temp.textContent || temp.innerText || "";

  // Replace nbsp
  text = text.replace(/\u00A0/g, " ").trim();

  // Split words
  const words = text.split(/\s+/);

  if (words.length <= wordLimit) return text;

  return words.slice(0, wordLimit).join(" ") + "...";
};
