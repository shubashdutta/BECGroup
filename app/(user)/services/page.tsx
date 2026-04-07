import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import {
  CheckCircle2,
  Globe,
  GraduationCap,
  Languages,
  Plane,
  ScrollText,
  Trophy,
  Users,
} from "lucide-react";

const currentYear = new Date().getFullYear();

export const metadata = {
  title: `Services – Baby Education® | Best Education Consultancy in Nepal ${currentYear}`,

  description:
    "FREE Counseling ✓ IELTS/PTE/Japanese/Korean/German Classes ✓ University Selection ✓ 100% Visa Success ✓ Full Scholarship Help ✓ Australia, UK, USA, Canada, Japan, Germany, Ireland – Everything under one roof by Rahul Sah",

  keywords: `baby education services, rahul sah baby education, best education consultancy nepal, study abroad services nepal, free counseling kathmandu, ielts class kathmandu, pte coaching nepal, japanese language class nepal, korean language class kathmandu, german class nepal, australia student visa services, uk study visa nepal, usa f1 visa help, canada study permit nepal, 100% visa success consultancy, scholarship for nepali students, university application help nepal, offer letter nepal, study in japan from nepal, study in korea from nepal, study in germany free, education consultancy new baneshwor, best ielts coaching kathmandu ${currentYear}, baby education contact, rahul sah consultancy services, no processing fee consultancy nepal, direct university admission nepal, pre-departure training nepal, education consultancy putalisadak`,

  openGraph: {
    title: "Services – Baby Education® | Nepal’s No.1 Study Abroad Consultancy",
    description:
      "FREE Counseling • Language Classes • University Selection • 100% Visa Success • Maximum Scholarships • Australia • UK • USA • Canada • Japan • Germany",
    images: [
      {
        url: "https://www.babyeducation.com.np/og-services.jpg", // ← create one beautiful image with all services icons
        width: 1200,
        height: 630,
        alt: "Baby Education Services – IELTS, Visa, Scholarship, Japan, Korea, Australia, UK, USA",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Baby Education® Services – 100% Visa Success | Free Counseling",
    description:
      "IELTS • PTE • Japanese • Korean • Australia • UK • USA • Canada • Germany",
    images: ["https://www.babyeducation.com.np/og-services.jpg"],
  },

  alternates: { canonical: "https://www.babyeducation.com.np/services" },
  robots: "index, follow",
};

export default function ServicesPage() {
  const services = [
    {
      icon: GraduationCap,
      title: "FREE Study Abroad Counseling",
      desc: "One-to-one personal guidance by Rahul Sah Sir – completely FREE",
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: Globe,
      title: "University & Course Selection",
      desc: "We find the perfect university & course that matches your budget and career dream",
      color: "from-purple-600 to-pink-600",
    },
    {
      icon: Trophy,
      title: "Maximum Scholarship Help",
      desc: "We have won NPR 50+ Crore scholarships for Nepali students – you can be next!",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: ScrollText,
      title: "100% Visa Success Guarantee",
      desc: "Offer letter + visa filing + interview preparation – zero rejection since 2018",
      color: "from-green-600 to-emerald-600",
    },
    {
      icon: Languages,
      title: "IELTS | PTE | Japanese | Korean | German Classes",
      desc: "Best teachers in Kathmandu – 7+ band & N5/N4 level guaranteed",
      color: "from-indigo-600 to-blue-600",
    },
    {
      icon: Plane,
      title: "Pre-Departure & After Landing Support",
      desc: "Airport pickup, accommodation, bank account, SIM card – we take care of everything",
      color: "from-red-600 to-rose-600",
    },
  ];

  const countries = [
    "Australia",
    "UK",
    "USA",
    "Canada",
    "Ireland",
    "New Zealand",
    "Germany (Free Education)",
    "Japan",
    "South Korea",
    "France",
    "Romania",
    "Malta",
  ];

  const getCountryCode = (name: string): string => {
    const map: Record<string, string> = {
      Australia: "AU",
      UK: "GB",
      USA: "US",
      Canada: "CA",
      Ireland: "IE",
      "New Zealand": "NZ",
      "Germany (Free Education)": "DE",
      Germany: "DE",
      Japan: "JP",
      "South Korea": "KR",
      France: "FR",
      Romania: "RO",
      Malta: "MT",
    };
    return map[name] || "XX"; // "XX" = unknown flag (will show nothing)
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Everything You Need to Study Abroad
            <br />
            <span className="text-yellow-400">Under One Roof</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90">
            From FREE counseling to visa in hand – Baby Education® handles
            everything so you can focus on your dreams
          </p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-3 overflow-hidden group"
              >
                <div className={`h-3 bg-gradient-to-r ${service.color}`} />
                <div className="p-8">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} text-white mb-6`}
                  >
                    <service.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-blue-600 font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    100% Trusted Service
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries We Serve */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Study in Your Dream Country
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {countries.map((country) => (
              <div
                key={country}
                className="bg-gradient-to-br from-blue-50 to-indigo-100 hover:from-blue-100 hover:to-indigo-200 
                         border-2 border-blue-200 rounded-2xl p-6 transition-all hover:scale-110 hover:shadow-xl"
              >
                <ReactCountryFlag
                  countryCode={getCountryCode(country)}
                  svg
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                  }}
                  className="mb-4 transition-transform group-hover:scale-110"
                  aria-label={country}
                />{" "}
                <p className="font-bold text-gray-800">{country}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Language Classes */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Best Language Classes in Kathmandu
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {["IELTS", "PTE", "Japanese N5-N1", "Korean TOPIK"].map((lang) => (
              <div
                key={lang}
                className="bg-white/10 backdrop-blur rounded-2xl p-8 hover:bg-white/20 transition-all"
              >
                <Languages className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">{lang}</h3>
                <p className="mt-4">Morning & Evening Batches</p>
                <p className="text-3xl font-bold mt-2">
                  7+ Band / N4 Guaranteed
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            We Will Guide You to a Safe & Bright Future Abroad
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            1500+ students trusted us – now they are living their dream life
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-4 bg-yellow-400 text-black font-bold text-xl px-12 py-6 rounded-full hover:bg-yellow-300 transition-all hover:scale-105 shadow-2xl"
          >
            Book FREE Counseling Now
            <Plane className="w-8 h-8" />
          </Link>
        </div>
      </section>
    </>
  );
}
