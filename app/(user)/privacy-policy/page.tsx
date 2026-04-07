// app/privacy-policy/page.tsx
import Link from "next/link";
import { Phone, Mail, MapPin, Shield, Lock, Globe } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - BEC Group | Baby Education® Nepal",
  description: "Privacy Policy for BEC Group mobile application.",
};

export default function PrivacyPolicy() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-blue-300" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto">
            Your trust is our top priority. We protect your information with the
            highest standards of security and transparency.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-10 md:p-16">
              <div className="prose prose-lg max-w-none text-gray-700 space-y-12">
                {/* 1. Introduction */}
                <div>
                  <h2 className="text-3xl font-bold text-blue-800 mb-4">
                    1. Introduction
                  </h2>
                  <p>
                    BEC Group (Package name: com.nepionics_tech.baby_eduction),
                    operated under Baby Education® Nepal, is fully committed to
                    protecting your privacy. This privacy policy explains how we
                    collect, use, and safeguard your personal information when
                    you use our mobile application, website, or services.
                  </p>
                </div>

                {/* App Identification */}
                <div>
                  <h2 className="text-3xl font-bold text-blue-800 mb-4">
                    App Identification
                  </h2>
                  <p>
                    This privacy policy applies to the mobile application{" "}
                    <strong>BEC Group</strong> (Package name:
                    com.nepionics_tech.baby_eduction), published on Google Play
                    Store by Baby Education® Nepal.
                  </p>
                </div>

                {/* 2. Information We Collect */}
                <div>
                  <h2 className="text-3xl font-bold text-blue-800 mb-4">
                    2. Information We Collect
                  </h2>
                  <ul className="space-y-4 text-lg list-disc list-inside">
                    <li>
                      <strong>Personal Info:</strong> Name, Email, Phone,
                      Passport (for consultations & applications)
                    </li>
                    <li>
                      <strong>Educational Info:</strong> Transcripts, IELTS/PTE
                      scores, SOPs, and other academic documents
                    </li>
                    <li>
                      <strong>Technical Data:</strong> IP address, browser info,
                      cookies, and app usage data
                    </li>
                  </ul>
                </div>

                {/* 3. How We Use Your Data */}
                <div>
                  <h2 className="text-3xl font-bold text-blue-800 mb-4">
                    3. How We Use Your Data
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      "University Applications",
                      "Visa Processing",
                      "Scholarship Guidance",
                      "Profile Evaluation",
                      "Updates & Offers",
                      "Service Improvement",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl"
                      >
                        <Lock className="w-6 h-6 text-blue-600 flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Data Security */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl">
                  <h2 className="text-3xl font-bold mb-4">4. Data Security</h2>
                  <p className="text-lg opacity-95">
                    We use secure storage, encryption, and limited access to
                    protect your personal and educational documents. Your
                    information is handled only by authorized personnel.
                  </p>
                </div>

                {/* 5. Cookies */}
                <div>
                  <h2 className="text-3xl font-bold text-blue-800 mb-4">
                    5. Cookies & Tracking
                  </h2>
                  <p>
                    We use cookies and analytics tools to enhance your
                    experience and improve our services. You can disable cookies
                    in your browser settings.
                  </p>
                </div>

                {/* 6. Your Rights */}
                <div>
                  <h2 className="text-3xl font-bold text-blue-800 mb-4">
                    6. Your Rights
                  </h2>
                  <ul className="space-y-4 text-lg list-disc list-inside">
                    <li>Access your data</li>
                    <li>Update or correct your data</li>
                    <li>Request deletion</li>
                    <li>Withdraw consent</li>
                  </ul>
                </div>

                {/* Google Compliance */}
                <div>
                  <h2 className="text-3xl font-bold text-blue-800 mb-4">
                    Google Play Compliance
                  </h2>
                  <p>
                    This app complies with Google Play User Data policies
                    regarding data collection, usage, and security.
                  </p>
                </div>

                {/* 7. Contact */}
                <div>
                  <h2 className="text-3xl font-bold text-blue-800 mb-6">
                    7. Contact Us
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8 bg-gray-50 p-8 rounded-2xl">
                    <div className="text-center">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-9 h-9 text-blue-700" />
                      </div>
                      <h3 className="font-bold text-lg">Location</h3>
                      <p className="text-gray-600 mt-2">
                        The Everest Hotel, New Baneshwor, Kathmandu, Nepal
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-9 h-9 text-green-700" />
                      </div>
                      <h3 className="font-bold text-lg">Call / WhatsApp</h3>
                      <p className="text-xl font-bold text-blue-700 mt-2">
                        01-5922468
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        +977 9766845580
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-9 h-9 text-red-700" />
                      </div>
                      <h3 className="font-bold text-lg">Email</h3>
                      <a
                        href="mailto:babyeducation@gmail.com"
                        className="text-xl font-bold text-blue-700 hover:underline"
                      >
                        babyeducation@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-10 border-t-2 border-gray-200">
                  <p className="text-gray-600">
                    © 2026 <strong>BEC Group</strong>{" "}
                    (com.nepionics_tech.baby_eduction)
                    <br />
                    Operated by Baby Education® Nepal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
