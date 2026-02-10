import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export type SendContactEmailParams = {
  name?: string;
  email: string;
  subject: string;
  message: string;
};

/**
 * Sends the contact form submission to your email via EmailJS.
 * Set these in .env: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
 */
export async function sendContactEmail(params: SendContactEmailParams): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      "EmailJS is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env file."
    );
  }

  const name = params.name?.trim() || params.email.split("@")[0] || "Visitor";
  const time = new Date().toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      name,
      email: params.email,
      subject: params.subject,
      message: params.message,
      time,
    },
    { publicKey: PUBLIC_KEY }
  );
}
