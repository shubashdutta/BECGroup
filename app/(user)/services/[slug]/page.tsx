"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicesData } from "@/src/utils/servicesData";

const Page = () => {
  const { slug } = useParams();

  // ✅ Fix slug type issue
  const currentSlug = Array.isArray(slug) ? slug[0] : slug;

  const service = servicesData.find((s) => s.slug === currentSlug);

  if (!service) return <div>Service not found</div>;

  return (
    <>
      {/* HERO */}
      <div className="relative h-[350px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${service.image})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-blue-900/70" />

        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              {service.title}
            </h1>
            <p className="text-white/70 mt-3 max-w-xl mx-auto">
              {service.desc}
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-8">
          {/* ABOUT */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              About {service.title}
            </h2>

            <p className="text-gray-600 leading-relaxed">{service.about}</p>
          </div>

          {/* FEATURES */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Key Features
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              {service.features?.map((feature: string, i: number) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-white shadow hover:shadow-xl transition"
                >
                  <h4 className="font-semibold text-lg">{feature}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Premium support and guidance tailored for students.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-semibold text-lg mb-2">Why Choose Us?</h4>
            <p className="text-gray-600 text-sm">{service.whyChooseUs}</p>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-8 rounded-2xl text-white">
            <h3 className="text-xl font-bold mb-2">{service.cta}</h3>

            <p className="text-white/70 text-sm">
              Take the next step toward your international education journey
              with expert guidance.
            </p>

            <Link
              href="/application"
              className="inline-flex items-center gap-2 bg-rose-500 px-5 py-3 rounded-lg mt-4 hover:scale-105 transition"
            >
              Apply Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          {/* SERVICES LIST */}
          <div className="bg-white shadow rounded-2xl p-5">
            <h3 className="font-bold mb-4">All Services</h3>

            <ul className="space-y-2">
              {servicesData.map((item: any) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className={`block px-3 py-2 rounded-lg text-sm transition ${
                      currentSlug === item.slug
                        ? "bg-rose-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="bg-blue-900 text-white p-6 rounded-2xl">
            <h3 className="font-bold mb-3">Need Help?</h3>
            <p className="text-sm text-white/70">
              Contact us for expert guidance.
            </p>

            <div className="mt-4 text-sm space-y-2">
              <div>📞 (01)-5922468 ||(01)-5922368</div>
              <div>📧 babyeducation@gmail.com</div>
              <div>📍 Kathmandu, Nepal</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
