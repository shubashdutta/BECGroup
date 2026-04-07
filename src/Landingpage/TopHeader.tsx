/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../asstest/Image/Logo.png";
import GetStartedBtn from "../Common/GetStartedBtn";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { GetUniversityResult } from "../ApiList/PublicApi";
import { errorMessage } from "../lib/ToastifyMessage/ToastifyMessage";

import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale); // Register English locale

const TopHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileTestPrepOpen, setMobileTestPrepOpen] = useState(false);

  const [studyAbroadSubmenu, setStudyAbroadSubmenu] = useState<
    { name: string; code: string }[]
  >([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Services data for dropdown - top 6 services
  const services = [
    {
      name: "Student Screening",
      link: "/services/student-screening",
      icon: "⚙️",
      desc: "Explore our services",
    },
    {
      name: "University Application Assistance",
      link: "/services/university-application-assistance",
      icon: "🎓",
      desc: "Apply to top universities",
    },
    {
      name: "Documentation Guidance",
      link: "/services/documentation-guidance",
      icon: "📄",
      desc: "Prepare required documents",
    },
    {
      name: "Interview Assistance",
      link: "/services/interview-assistance",
      icon: "🎤",
      desc: "Ace your interview",
    },
    {
      name: "Scholarship Assistance",
      link: "/services/scholarship-assistance",
      icon: "💰",
      desc: "Find scholarships",
    },
    {
      name: "Pre Departure Briefing",
      link: "/services/pre-departure",
      icon: "✈️",
      desc: "Prepare for abroad",
    },
  ];

  const testPreparation = [
    {
      name: "IELTS Preparation",
      link: "/test-preparation/ielts",
      icon: "📝",
      desc: "English proficiency test",
    },
    {
      name: "PTE",
      link: "/test-preparation/pte",
      icon: "💬",
      desc: "Pearson Test of English",
    },
    {
      name: "SAT Preparation",
      link: "/test-preparation/sat",
      icon: "🎓",
      desc: "Scholastic Assessment Test",
    },
  ];

  const handleGetCountry = async () => {
    const params = {
      statusIn: "ACTIVE",
      country: "country",
    };
    try {
      const res: any = await GetUniversityResult(params);

      // Step 1: Define allowed countries (after normalization)
      const allowedCountries = [
        "UK",
        "Malta",
        "Lithuania",
        "Spain",
        "Denmark",
        "Germany",
        "Canada",
      ];

      // Step 2: Normalize names
      const countryNameMap: Record<string, string> = {
        "United State Of America": "USA",
        "United States of America": "USA",
        "United Kingdom": "UK",
        UK: "UK",
      };

      const formatted = res?.data
        ?.map((name: string) => {
          const normalizedName = countryNameMap[name] || name;

          const code = countries.getAlpha2Code(name, "en");

          return {
            name: normalizedName,
            code: code || "",
          };
        })
        // Step 3: Filter only allowed countries
        ?.filter((item: any) => allowedCountries.includes(item.name));

      setStudyAbroadSubmenu(formatted);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetCountry();
  }, []);

  const navItems = [
    {
      label: "Test Preparation",
      href: "/test-preparation",
      hasSubmenu: true,
    },
    { label: "University", href: "/university" },
    { label: "Popular Course", href: "/courses" },
    { label: "About Us", href: "/about" },
    {
      label: "Services",
      href: "/services",
      hasSubmenu: true,
    },
  ];

  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [testPrepDropdownOpen, setTestPrepDropdownOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className=" mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src={Logo}
            alt="Baby Education Logo"
            width={120}
            height={120}
            className="h-16 w-auto"
          />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-8 text-gray-900 font-semibold">
          {/* STUDY ABROAD DROPDOWN */}
          <li
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className="flex items-center gap-1 hover:text-rose-600 transition-all cursor-pointer py-2">
              Study Abroad
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* FIXED DROPDOWN */}
            {dropdownOpen && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[480px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 z-50"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                {/* INVISIBLE HOVER BRIDGE (KEY FIX) */}
                <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent"></div>

                {/* Pink gradient line */}
                <div className="h-1.5 bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500" />

                <div className="p-5 bg-gradient-to-b from-gray-50/30 to-white">
                  <div className="grid grid-cols-2 gap-3">
                    {studyAbroadSubmenu?.map((item) => {
                      return (
                        <Link
                          key={item.code}
                          href={`/university/${item?.name}`}
                          className="group/item flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50/70 transition-all duration-300"
                        >
                          <div className="relative flex-shrink-0">
                            {/* Glowing background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-600 rounded-xl blur-lg opacity-50 group-hover/item:opacity-70 transition-opacity" />

                            {/* Flag container */}
                            <div className="relative w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white overflow-hidden">
                              <ReactCountryFlag
                                countryCode={item.code} // e.g. "DE", "CA", "AU"
                                svg
                                style={{
                                  width: "36px",
                                  height: "36px",
                                  borderRadius: "8px",
                                }}
                                aria-label={item.name}
                              />
                            </div>
                          </div>

                          <div className="min-w-0">
                            <p className="font-bold text-gray-800 group-hover/item:text-rose-600 transition-colors text-sm truncate">
                              {item.name}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 text-center">
                    <Link
                      href="/university"
                      className="inline-flex items-center gap-1 text-rose-600 font-semibold hover:text-rose-700 transition-colors"
                    >
                      View All Countries
                      <span className="text-lg">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Other menu items */}
          {navItems.map((item) => {
            const isTestPrep = item.label === "Test Preparation";
            const isOpen = isTestPrep
              ? testPrepDropdownOpen
              : servicesDropdownOpen;
            const setOpen = isTestPrep
              ? setTestPrepDropdownOpen
              : setServicesDropdownOpen;
            const dropdownData = isTestPrep ? testPreparation : services;

            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasSubmenu && setOpen(true)}
                onMouseLeave={() => item.hasSubmenu && setOpen(false)}
              >
                <Link
                  href={item.href}
                  className="hover:text-rose-600 transition-all py-2 block flex items-center gap-1"
                >
                  {item.label}
                  {item.hasSubmenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.hasSubmenu && isOpen && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[300px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 z-50"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                  >
                    {/* Invisible hover bridge */}
                    <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent"></div>

                    {/* Pink gradient line */}
                    <div className="h-1.5 bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500" />

                    <div className="p-5 bg-gradient-to-b from-gray-50/30 to-white">
                      {/* Flex column layout */}
                      <div className="flex flex-col gap-3 mb-4">
                        {dropdownData?.map((dropdownItem: any, idx: number) => (
                          <Link
                            key={idx}
                            href={dropdownItem.link}
                            className="group/item flex items-center gap-4 p-3 rounded-xl hover:bg-pink-50/70 transition-all duration-300"
                          >
                            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                              <span className="text-white text-xl">
                                {dropdownItem.icon}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-gray-800 group-hover/item:text-rose-600 transition-colors text-base">
                                {dropdownItem.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {dropdownItem.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Show bottom actions only for Services, not for Test Preparation */}
                      {!isTestPrep && (
                        <>
                          {/* Divider */}
                          <div className="border-t border-gray-100 my-3"></div>

                          {/* Bottom Actions - 2 columns */}
                          <div className="grid grid-cols-2 gap-3">
                            <Link
                              href="/contact"
                              className="group/item flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50/70 transition-all duration-300"
                            >
                              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                                <span className="text-white text-lg">📞</span>
                              </div>
                              <div>
                                <p className="font-bold text-gray-800 group-hover/item:text-rose-600 transition-colors text-sm">
                                  Contact Us
                                </p>
                                <p className="text-xs text-gray-500">
                                  Get in touch
                                </p>
                              </div>
                            </Link>

                            <Link
                              href="/application"
                              className="group/item flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50/70 transition-all duration-300"
                            >
                              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                                <span className="text-white text-lg">📝</span>
                              </div>
                              <div>
                                <p className="font-bold text-gray-800 group-hover/item:text-rose-600 transition-colors text-sm">
                                  Apply Now
                                </p>
                                <p className="text-xs text-gray-500">
                                  Start your application
                                </p>
                              </div>
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Desktop Login Button */}
        <div className="hidden md:block">
          <Link href="/employee_login">
            <GetStartedBtn color="#D61F24" label="Get started" />
          </Link>
        </div>

        {/* Mobile Button */}
        <button onClick={() => setMobileOpen(true)} className="md:hidden">
          <Menu size={28} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-rose-600">Menu</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X size={32} />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              <div>
                <Link
                  href="/study-abroad"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-bold text-rose-600 block mb-3"
                >
                  Study Abroad
                </Link>
                <div className="ml-4 space-y-3 border-l-4 border-rose-200 pl-4">
                  {studyAbroadSubmenu.map((item) => (
                    <Link
                      key={item.code}
                      href={"/university"}
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-700 hover:text-rose-600 transition"
                    >
                      {item.name}{" "}
                      {/* {item.free && (
                        <span className="text-emerald-600 text-sm font-bold">
                          ★ Free
                        </span>
                      )} */}
                    </Link>
                  ))}
                </div>
              </div>

              {navItems.map((item) => {
                const isTestPrep = item.label === "Test Preparation";
                const isOpen = isTestPrep
                  ? mobileTestPrepOpen
                  : mobileServicesOpen;
                const setOpen = isTestPrep
                  ? setMobileTestPrepOpen
                  : setMobileServicesOpen;
                const submenuItems = isTestPrep
                  ? testPreparation
                  : [
                      { name: "All Services", link: "/services" },
                      { name: "Contact Us", link: "/contact" },
                      { name: "Apply Now", link: "/application" },
                    ];

                return (
                  <div key={item.label}>
                    {item.hasSubmenu ? (
                      <>
                        <button
                          onClick={() => setOpen(!isOpen)}
                          className="flex items-center justify-between w-full text-lg font-medium hover:text-rose-600 transition"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="ml-4 mt-2 space-y-3 border-l-4 border-rose-200 pl-4">
                            {submenuItems.map((subItem: any, idx: number) => (
                              <Link
                                key={idx}
                                href={subItem.link}
                                onClick={() => setMobileOpen(false)}
                                className="block text-gray-700 hover:text-rose-600 transition"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-lg font-medium hover:text-rose-600 transition"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="absolute bottom-8 left-6 right-6">
              <Link href="/employee_login" onClick={() => setMobileOpen(false)}>
                <GetStartedBtn color="#D61F24" label="Get started" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopHeader;
