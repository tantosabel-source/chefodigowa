export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
};

export const initialFormState: FormState = {
  status: "idle",
  message: "",
};

export const inquiryTopics = [
  "Private dining & events",
  "Recipe development",
  "Brand collaboration",
  "Nutrition & workshops",
  "Press & interviews",
  "Something else",
] as const;
