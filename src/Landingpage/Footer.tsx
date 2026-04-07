"use client";

import React, { useEffect, useState } from "react";

import footerImg from "@/asstest/Image/Footerimg.png";
import footerLeftImg from "@/asstest/Image/FooterLeftImg.png";
import { LinkIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TbWorldSearch } from "react-icons/tb";
import { GiEarthAmerica, GiNotebook } from "react-icons/gi";

import { PublicFooter } from "../ApiList/PublicApi";
import { errorMessage } from "../lib/ToastifyMessage/ToastifyMessage";
import { MdOutlineDesignServices } from "react-icons/md";
import { useRouter } from "next/navigation";
const Footer = () => {
  const [footer, setFooter] = useState([]);
  const router = useRouter();

  const handleGetFooter = async () => {
    const params = {
      statusIn: "ACTIVE",
    };

    try {
      const res: any = await PublicFooter(params);
      setFooter(res?.data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetFooter();
  }, []);
  const getFooterByType = (type: string) => {
    return footer.filter(
      (item: any) => item.footerType === type && item.isActive,
    );
  };
  const countryFooter = getFooterByType("COUNTRIES");
  const serviceFooter = getFooterByType("SERVICE");
  const Test = getFooterByType("TEST");
  const Branches = getFooterByType("BRANCHES");
  const Inter_Branch = getFooterByType("INTERNATIONAL_BRANCH");

  return (
    <>
      <div className=" w-full relative   bg-[#245a91] ">
        <div className=" absolute -left-0">
          <Image src={footerLeftImg} alt="footerImage" />
        </div>
        <div className=" absolute -right-0">
          <Image src={footerImg} alt="image" />
        </div>

        <footer className="bg-[#1f4f7c] text-white">
          <div className="container mx-auto">
            <div className="relative max-w-7xl mx-auto px-6 py-12">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
                {/* Column 1 */}
                {/* <div className="flex flex-col items-center">
                  <h3 className="text-lg font-semibold mb-6">About Us</h3>
                  <ul className="space-y-3 text-sm text-gray-200 text-center">
                    <li>
                      <a href="#" className="hover:text-white">
                        Who We Are
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white">
                        Our Mission
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white">
                        Our Team
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white">
                        Testimonials
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div> */}

                {/* Column 2 */}
                <div className="flex flex-col items-center">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-6">
                    <TbWorldSearch /> Explore Countries
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-200 text-center">
                    {countryFooter?.length > 0 ? (
                      countryFooter.map((item: any) => (
                        <li key={item?.id}>
                          {item?.url ? (
                            <Link href={item.url} className="hover:text-white">
                              {item.title}
                            </Link>
                          ) : (
                            <span>{item.title}</span>
                          )}
                        </li>
                      ))
                    ) : (
                      <li>No countries available</li>
                    )}
                  </ul>
                </div>

                {/* Column 3 */}
                <div className="flex flex-col items-center">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-6">
                    <MdOutlineDesignServices /> Services
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-200 text-center">
                    {serviceFooter?.length > 0 ? (
                      serviceFooter.map((item: any) => (
                        <li key={item?.id}>
                          {item?.url ? (
                            <Link href={item.url} className="hover:text-white">
                              {item.title}
                            </Link>
                          ) : (
                            <span>{item.title}</span>
                          )}
                        </li>
                      ))
                    ) : (
                      <li>No services available</li>
                    )}
                  </ul>
                </div>

                {/* Column 4 */}
                <div className="flex flex-col items-center">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-6">
                    <GiNotebook /> Test Preparation
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-200 text-center">
                    {Test?.map((v: any) => (
                      <li key={v?.id}>
                        {v?.url ? (
                          <Link href={v.url} className="hover:text-white">
                            {v.title}
                          </Link>
                        ) : (
                          <span>{v.title}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 5 */}
                <div className="flex flex-col items-center">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-6">
                    <GiEarthAmerica className="w-5 h-5" /> Internation_Branches
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-200 text-center">
                    {Inter_Branch?.map((v: any) => (
                      <li key={v?.id}>
                        {v?.url ? (
                          <Link href={v.url} className="hover:text-white">
                            {v.title}
                          </Link>
                        ) : (
                          <span>{v.title}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-6">
                    <MapPinIcon className="w-5 h-5" /> Branches
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-200 text-center">
                    {Branches?.map((v: any) => (
                      <li key={v?.id}>
                        {v?.url ? (
                          <Link href={v.url} className="hover:text-white">
                            {v.title}
                          </Link>
                        ) : (
                          <span
                            onClick={() => router.push(`/branches/${v?.id}`)}
                          >
                            {v.title}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 6 */}
                <div className="flex flex-col items-center">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-6">
                    <LinkIcon className="w-5 h-5" /> Quick Links
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-200 text-center">
                    <li>
                      <Link href="/contact" className="hover:text-white">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="hover:text-white">
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy" className="hover:text-white">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/terms-and-conditions"
                        className="hover:text-white"
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="mt-16 pt-6 border-t border-white/20 text-center text-sm text-gray-300">
                © 2025 Baby Education. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
