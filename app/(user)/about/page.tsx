"use client";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  Users,
  Trophy,
  Globe,
  Star,
  ArrowRight,
} from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import RahulSirImage from "@/asstest/Image/RahulSir.jpg";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { useEffect, useState } from "react";
import { PublicAboutAndAds } from "@/src/ApiList/PublicApi";

export default function AboutPage() {
  const { ref, inView } = useInView({
    triggerOnce: true, // animate only once
    threshold: 0.5, // trigger when 50% of div is visible
  });

  const [imagePath, setImagePath] = useState<any>([]);

  const handleGetAboutsImage = async () => {
    const params = {
      statusIn: "ACTIVE",
      isActive: "true",
    };

    try {
      const res: any = await PublicAboutAndAds(params);

      const data = res?.data?.find((v: any) => v?.section === "ABOUT_US");

      setImagePath(data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetAboutsImage();
  }, []);
  return (
    <>
      {/* Hero Section */}
      <section
        ref={ref}
        className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-24"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Rahul Sah
                <br />
                <span className="text-yellow-400">Founder & CEO</span>
                <br />
                Baby Education Consultancy Pvt. Ltd.®
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Nepal’s Most Trusted Study Abroad Expert with{" "}
                <span className="text-yellow-400 font-bold">
                  <CountUp end={100} className=" text-yellow-400" />% Visa
                  Success Rate
                </span>{" "}
                & Highest Scholarship Record
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur px-6 py-4 rounded-xl">
                  <span className="text-3xl font-bold">
                    {" "}
                    <CountUp end={2200} />+
                  </span>
                  <p className="text-sm opacity-90">Students Sent Abroad</p>
                </div>
                <div className="bg-white/20 backdrop-blur px-6 py-4 rounded-xl">
                  <span className="text-3xl font-bold">
                    {" "}
                    <CountUp end={100} /> %
                  </span>
                  <p className="text-sm opacity-90">Visa Success</p>
                </div>
                <div className="bg-white/20 backdrop-blur px-6 py-4 rounded-xl">
                  <span className="text-3xl font-bold">
                    More Than <CountUp end={1000} />+
                  </span>
                  <p className="text-sm opacity-90">University World wide</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white/30">
                <Image
                  src={imagePath?.files?.[0]?.path} // ← Put your best professional photo here
                  alt="Rahul Sah – Founder Baby Education"
                  width={600}
                  height={700}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-xl shadow-2xl">
                10+ Years Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Why Students & Parents Trust
            <span className="text-blue-600"> Baby Education®</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: "95% Visa Success Rate",
                desc: "Not a single rejection since 2018",
              },
              {
                icon: Star,
                title: "Highest Scholarship Record",
                desc: "NPR 50+ Crore in scholarships secured",
              },
              {
                icon: Globe,
                title: "30+ Countries",
                desc: "Australia, UK, USA, Canada, Ireland, Germany, Japan & more",
              },
              {
                icon: Users,
                title: "Personal Mentoring",
                desc: "One-to-one guidance by Rahul Sah sir",
              },
              {
                icon: CheckCircle,
                title: "No Hidden Charges",
                desc: "Transparent process & zero service fee for many universities",
              },
              {
                icon: ArrowRight,
                title: "Fastest Processing",
                desc: "Offer letter in 3–7 days",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <item.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Message from Founder */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">
            Message from Rahul Sah
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed mb-8 italic">
            "I started Baby Education Consultancy Pvt. Ltd.® with one dream — to
            make world-class education accessible to every Nepali student.
            Today, I personally mentor every student because your success is my
            success. Come with a dream, leave with a future."
          </p>
          <p className="text-3xl font-bold mt-10">— Rahul Sah</p>
          <p className="text-lg opacity-90">
            Founder & CEO, Baby Education Consultancy Pvt. Ltd.®
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Your Bright Future Starts with One Free Counseling{" "}
          </h2>
          <p className="text-xl mb-10">
            Book your FREE counseling session with Rahul Sah today
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-yellow-400 text-black font-bold text-xl px-10 py-5 rounded-full hover:bg-yellow-300 transition-all hover:scale-105 shadow-2xl"
          >
            Book Free Counseling Now
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </>
  );
}
