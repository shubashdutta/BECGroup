"use client";
import { FaqList } from "@/components/faq/FaqList";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { fetchFaqData } from "@/lib/api/faq";
import { useFaqStore } from "@/store/faqStore";

export default function FaqPage() {
  const { faqs, loading } = useFaqStore();
  return <FaqAccordion faqs={faqs} />;
}
