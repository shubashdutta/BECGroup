"use client";
import { ContactForm } from "@/components/contact/ContactForm";
import { submitContactForm } from "@/lib/api/contact";
import { useContactStore } from "@/store/contactStore";
import { ContactInfo } from "@/components/contact/ContactInfo";

export default function ContactUsPage() {
  const { submit, loading } = useContactStore();
  return <ContactForm onSubmit={submit} loading={loading} />;
}
