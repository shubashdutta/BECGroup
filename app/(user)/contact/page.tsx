// app/contact/page.tsx

"use client";
import { publicContact } from "@/src/ApiList/PublicApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// export const metadata = {
//   title: "Contact Us - Baby Education® Nepal",
//   description:
//     "Get in touch with Baby Education Nepal – Study Abroad Experts in Kathmandu",
// };

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    isReceivable: "",
    content: "",
    country: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const res: any = await publicContact(formData);

      successMessage({ message: res?.message });
    } catch (error) {
      errorMessage({ error });
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-32">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto">
            Ready to study abroad? Talk to our expert counselors today — free
            consultation!
          </p>
        </div>
      </section>

      {/* Contact Info + Map + Form */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Contact Details & Map */}
            <div className="space-y-10">
              {/* Location Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <MapPin className="w-10 h-10 text-blue-700" />
                  </div>
                  <h2 className="text-3xl font-bold text-blue-900">
                    Visit Our Office
                  </h2>
                </div>
                <div className="space-y-4 text-lg">
                  <p className="font-semibold text-gray-800">
                    Baby Education Consultancy Pvt. Ltd.
                  </p>

                  <p className="text-gray-600">
                    New Baneshwor, Kathmandu 44600
                    <br />
                    Nepal
                  </p>

                  {/* Google Maps */}
                  <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.478978733123!2d85.3325314!3d27.6880714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19005bb93053%3A0x6c3d2c6cb3cad42b!2sBaby%20Education%20Consultancy%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1234567890"
                      width="100%"
                      height="320"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-3xl shadow-xl text-center">
                  <MessageCircle className="w-16 h-8 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">WhatsApp / Call</h3>
                  <p className="text-3xl font-bold">+977 9766845580</p>
                  <Link
                    href="https://wa.me/9779766845580"
                    target="_blank"
                    className="inline-block mt-4 bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition"
                  >
                    Message on WhatsApp
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 rounded-3xl shadow-xl text-center">
                  <Phone className="w-16 h-8 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Landline</h3>
                  <p className="text-3xl font-bold">01-5922468</p>
                  <Link
                    href="tel:015922468"
                    className="inline-block mt-4 bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition"
                  >
                    Call Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white h-[950px] rounded-3xl shadow-2xl p-10 border border-blue-100">
              <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition text-lg"
                    placeholder="Ram Bahadur Thapa"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition text-lg"
                      placeholder="ram@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mobile: e.target.value,
                        })
                      }
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition text-lg"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition text-lg resize-none"
                    placeholder="I want to study in Canada/Australia... Please help me with visa & university options."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xl py-5 rounded-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 flex items-center justify-center gap-3"
                >
                  <Send className="w-6 h-6" />
                  Send Message – We Reply in 1 Hour!
                </button>
              </form>

              <p className="text-center text-gray-500 mt-8 text-sm">
                Or just WhatsApp us directly at{" "}
                <strong className="text-green-600">+977 9766845580</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email & Hours */}
    </>
  );
}
