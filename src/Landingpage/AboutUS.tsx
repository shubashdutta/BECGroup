"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import RahulSirImage from "@/asstest/Image/RahulSir.jpg";

import { RiCustomerService2Line } from "react-icons/ri";
import GetStartedBtn from "../Common/GetStartedBtn";
import { SiFuturelearn } from "react-icons/si";
import { PublicAboutAndAds } from "../ApiList/PublicApi";
import { errorMessage } from "../lib/ToastifyMessage/ToastifyMessage";

const AboutUS = () => {
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
    <div className="container mx-auto mt-10 px-4 py-5">
      <div className="flex flex-col md:flex-row md:gap-x-12 gap-y-8 items-center">
        <div className=" relative">
          {imagePath?.files?.length > 0 ? (
            <Image
              width={450}
              height={400}
              className="animate__animated animate__backInLeft  md:h-[400px] md:w-auto w-full md:max-w-[450px] rounded-lg object-cover"
              src={imagePath?.files?.[0]?.path}
              alt="About_Image"
            />
          ) : (
            <Image
              width={450}
              height={400}
              className="animate__animated animate__backInLeft w-full md:h-[400px] md:w-auto md:max-w-[450px] rounded-lg object-cover"
              src={RahulSirImage}
              alt="About_Image"
            />
          )}

          <div className="absolute -bottom-6 right-0 bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-sm md:text-xl shadow-2xl">
            10+ Years Experience
          </div>
        </div>

        <div className="animate__animated animate__backInRight w-full">
          <div className="text-lg font-semibold text-gray-800 uppercase mb-1">
            About Our Consultancy
          </div>

          <div className="text-xl md:text-2xl font-medium text-gray-800 leading-snug">
            Empowering students to access the finest educational{" "}
            <strong className="text-[#D61F24]">opportunities</strong> worldwide
            — <strong className="text-[#D61F24]">anytime, anywhere.</strong>
          </div>

          <div className=" my-2 text-md text-gray-700  text-startclsc w-full">
            We offer comprehensive guidance and support to help students unlock
            the best global education opportunities. From selecting the right
            universities and courses to assisting with applications,
            documentation, and visa processing — we ensure a smooth and
            successful journey toward your academic goals.
          </div>

          <div className="">
            <div className="relative w-full md:w-[60%] flex items-center gap-6 rounded-lg border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-l-lg"></div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 ml-1">
                <RiCustomerService2Line size={28} />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Support Inquiries
                </h3>
                <p className="mt-0.5 text-sm text-gray-600">
                  Using any of our products and need help?
                </p>
                <a
                  href="#"
                  className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Get Support
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className=" max:sm:w-full sm:w-[30%] mt-3 flex justify-center items-center">
            <GetStartedBtn
              label="Learn More"
              color={"#D61F24"}
              icon={<SiFuturelearn size={20} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
