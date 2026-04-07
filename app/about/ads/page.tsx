"use client";
import { AdsLayout } from "@/components/about/AdsLayout";
import { fetchAdsData } from "@/lib/api/about";
import { useAdsStore } from "@/store/adsStore";

export default function AdsPage() {
  const { ads, loading } = useAdsStore();
  return <AdsLayout ads={ads} loading={loading} />;
}
