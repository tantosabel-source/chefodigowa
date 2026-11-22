"use server";

import { db } from "@/db";
import { messages, subscribers } from "@/db/schema";
import { inquiryTopics, type FormState } from "@/lib/forms";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim().slice(0, 40);
  const submittedTopic = String(formData.get("topic") ?? "").trim();
  const topic = inquiryTopics.find((item) => item === submittedTopic) ?? "General enquiry";
  const message = String(formData.get("message") ?? "").trim();

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 120) errors.name = "Please enter a name between 2 and 120 characters.";
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) errors.email = "Please add a valid email address.";
  if (message.length < 12 || message.length > 4000) errors.message = "Please enter a message between 12 and 4,000 characters.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "A couple of details need a second look.",
      errors,
    };
  }

  try {
    await db.insert(messages).values({
      name,
      email,
      phone,
      topic,
      message,
    });
  } catch {
    return {
      status: "error",
      message: "Your note could not be saved. Please try again or message @chefodigowa on Instagram.",
    };
  }

  return {
    status: "success",
    message: "Thank you for getting in touch. Your message was sent to the chef studio.",
  };
}

export async function subscribeToNotes(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    await db.insert(subscribers).values({ email }).onConflictDoNothing();
  } catch {
    return {
      status: "error",
      message: "The list is unavailable right now. Please try again shortly.",
    };
  }

  return {
    status: "success",
    message: "You’re on the list. Thanks for joining the kitchen letter!",
  };
}
