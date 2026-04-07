"use client";

import { PublicFooter } from "@/src/ApiList/PublicApi";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Share2,
  Clock,
  Building2,
  Phone,
  CheckCircle2,
  Check,
} from "lucide-react";

interface FooterContent {
  id?: number;
  title?: string;
  description?: string;
  updatedAt?: string;
}

// ✅ CLEAN HTML + REMOVE ##
const decodeHtml = (html: string = ""): string => {
  if (typeof window === "undefined") return html;

  const txt = document.createElement("textarea");
  txt.innerHTML = html;

  let cleaned = txt.value;

  // 🔥 remove markdown ##
  cleaned = cleaned.replace(/^##\s*/gm, "");

  return cleaned;
};

export default function BranchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const branchId = params?.id as string | undefined;

  const [content, setContent] = useState<FooterContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!branchId) {
      errorMessage({ error: "Branch ID not found" });
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res: any = await PublicFooter({
          statusIn: "ACTIVE",
          id: Number(branchId),
        });

        setContent(res.data?.[0] || null);
      } catch (err) {
        errorMessage({ error: "Failed to load branch information" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [branchId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building2 size={40} className="mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold">Branch Not Found</h2>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-black text-white rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f7fb] min-h-screen">
      {/* 🔥 HERO */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-black px-5 pt-24 pb-20">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-indigo-300 hover:text-white mb-6"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex flex-col lg:flex-row justify-between gap-10">
            {/* LEFT */}
            <div className="max-w-2xl">
              <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs">
                Main Branch
              </span>

              <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 break-words leading-tight">
                {content.title}
              </h1>

              <div className="flex gap-6 mt-4 text-gray-300 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  Kathmandu, Nepal
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {content.updatedAt
                    ? new Date(content.updatedAt).toLocaleDateString()
                    : "Recently"}
                </div>
              </div>
            </div>

            {/* SHARE */}
            <button
              onClick={handleCopyLink}
              className="h-fit flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur"
            >
              {copied ? <Check size={18} /> : <Share2 size={18} />}
              {copied ? "Copied" : "Share"}
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 MAIN */}
      <main className="max-w-6xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border">
              <div
                className="prose max-w-none prose-lg
                prose-p:text-gray-600
                prose-headings:text-gray-900
                prose-img:rounded-xl prose-img:shadow
                break-words overflow-hidden
                [&_*]:break-words [&_*]:max-w-full
                [&_*]:whitespace-normal"
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(content.description || ""),
                }}
              />
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4">
              {["5000+ Students", "95% Success", "10+ Years"].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl text-center shadow-sm"
                >
                  <p className="font-bold text-indigo-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 bg-white rounded-2xl p-6 shadow-md border">
              <h3 className="text-lg font-semibold mb-6">Visit our Office</h3>

              <div className="space-y-5">
                <div className="flex gap-3">
                  <MapPin size={18} className="text-indigo-600" />
                  <div>
                    <p className="font-medium text-sm">Address</p>
                    <p className="text-sm text-gray-500">
                      New Baneshwor, Kathmandu
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone size={18} className="text-indigo-600" />
                  <div>
                    <p className="font-medium text-sm">Phone</p>
                    <p className="text-sm text-gray-500">+977 01-XXXXXXX</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock size={18} className="text-indigo-600" />
                  <div>
                    <p className="font-medium text-sm">Hours</p>
                    <p className="text-sm text-gray-500">
                      Sun - Fri: 10 AM - 6 PM
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Book Consultation
              </button>

              <div className="mt-6 space-y-2">
                {["Expert Counselors", "IELTS Lab", "High Success"].map(
                  (item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle2 size={16} className="text-green-500" />
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
