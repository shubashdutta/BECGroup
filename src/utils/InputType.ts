export const FORM_TYPE = {
  TEXT: "text",
  PASSWORD: "password",
  EMAIL: "email",
  SEARCH: "search",
  TEL: "tel",
  URL: "url",

  NUMBER: "number",
  RANGE: "range",

  DATE: "date",
  DATETIME_LOCAL: "datetime-local",
  MONTH: "month",
  TIME: "time",
  WEEK: "week",

  CHECKBOX: "checkbox",
  RADIO: "radio",

  FILE: "file",
  IMAGE: "image",

  HIDDEN: "hidden",
  SUBMIT: "submit",
  RESET: "reset",
  BUTTON: "button",

  COLOR: "color",
} as const;

export type FormInputType = (typeof FORM_TYPE)[keyof typeof FORM_TYPE];
