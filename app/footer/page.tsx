"use client";
import { FooterLayout } from "@/components/footer/FooterLayout";
import { FooterLinks } from "@/components/footer/FooterLinks";
import { fetchFooterData } from "@/lib/api/footer";
import { useFooterStore } from "@/store/footerStore";

export default function FooterPage() {
  const { links, socialMedia } = useFooterStore();
  return <FooterLayout links={links} social={socialMedia} />;
}
