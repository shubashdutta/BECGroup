"use client";
import { TermsContent } from "@/components/legal/TermsContent";
import { fetchTermsData } from "@/lib/api/legal";
import { useTermsStore } from "@/store/termsStore";
import { TermsAcceptButton } from "@/components/legal/TermsAcceptButton";

export default function TermsPage() {
  const { terms, accepted, acceptTerms } = useTermsStore();
  return <TermsContent terms={terms} onAccept={acceptTerms} />;
}
