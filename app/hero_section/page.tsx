"use client";
import { HeroSection } from "@/components/hero/HeroSection";
import { HeroBanner } from "@/components/hero/HeroBanner";
import { fetchHeroContent } from "@/lib/api/hero";
import { useHeroStore } from "@/store/heroStore";

export default function HeroSectionPage() {
  const { banner, content, cta } = useHeroStore();
  return <HeroSection banner={banner} content={content} cta={cta} />;
}
