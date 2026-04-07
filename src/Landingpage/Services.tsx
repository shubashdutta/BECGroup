import React from "react";

import CareerImg from "@/asstest/Image/Career.png";
import Image from "next/image";

import Application from "@/asstest/Image/Application.png";
import Courses from "@/asstest/Image/Courses.png";
import Visa from "@/asstest/Image/Visa.png";
import Departure from "@/asstest/Image/Departure.png";
import Lang from "@/asstest/Image/LanguageImage.png";
const Services = () => {
  return (
    <div className="md:container  md:mx-auto mt-5">
      <div className="flex justify-center flex-col items-center pt-5">
        <h4 className=" text-lg font-bold">
          Empowering Services for Your Success
        </h4>
        <h5 className=" text-gray-700 max-sm:text-center font-semibold text-lg">
          Step-by-Step Guide to Getting Your Visa Approved
        </h5>
      </div>

      <div className=" max-w-7xl max-sm:space-y-3 mx-auto  mt-3  py-10 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  sm:space-y-5 md:space-y-0 ">
        <div className=" p-6 max-sm:border max-sm:border-sky-500 max-sm:rounded-2xl  md:border-r md:bg-white sm:bg-gray-300 sm:rounded-2xl md:rounded-none md:border-b border-r-gray-400 border-b-gray-400 hover:shadow-md transition-all flex  justify-center gap-x-6 items-center">
          <div className=" w-1/2 ">
            <Image src={CareerImg} alt="Img" objectFit="cover" />
          </div>

          <div>
            <h3 className="text-xl text-center font-semibold text-gray-800 mb-1">
              Career Counseling
            </h3>
            <p className="text-gray-600 mb-4  text-center">
              Personalized career guidance to help you choose the right study
              path and future opportunities.
            </p>
          </div>
        </div>
        <div className=" p-6   max-sm:border max-sm:border-sky-500 max-sm:rounded-2xl  md:border-r  md:border-b md:bg-white sm:bg-gray-300 sm:rounded-2xl md:rounded-none border-r-gray-400 border-b-gray-400  hover:shadow-md transition-all flex  justify-center gap-x-6 items-center">
          <div className=" w-1/2 ">
            <Image src={Courses} alt="Img" objectFit="cover" />
          </div>

          <div>
            <h3 className="text-xl text-center  font-semibold text-gray-800 mb-1">
              University & Course Selection
            </h3>
            <p className="text-gray-600 mb-4  text-center">
              Find the best university and course that match your academic goals
              and financial plans.
            </p>
          </div>
        </div>
        <div className=" p-6  max-sm:border max-sm:border-sky-500 md:border-b max-sm:rounded-2xl md:border-r-gray-400 md:bg-white sm:bg-gray-300 sm:rounded-2xl md:rounded-none border-b-gray-400 hover:shadow-md transition-all flex  justify-center gap-x-6 items-center">
          <div className=" w-1/2 ">
            <Image src={Application} alt="Img" objectFit="cover" />
          </div>

          <div>
            <h3 className="text-xl text-center font-semibold text-gray-800 mb-1">
              Application Assistance
            </h3>
            <p className="text-gray-600 mb-4  text-center">
              Get expert help completing your application, writing SOPs, and
              submitting documents correctly.
            </p>
          </div>
        </div>
        <div className=" p-6  max-sm:border max-sm:border-sky-500 md:border-r max-sm:rounded-2xl md:border-r-gray-400 md:bg-white sm:bg-gray-300 sm:rounded-2xl hover:shadow-md md:rounded-none transition-all flex  justify-center gap-x-6 items-center">
          <div className=" w-1/2 ">
            <Image src={Visa} alt="Visaimg" objectFit="cover" />
          </div>

          <div>
            <h3 className="text-xl text-center font-semibold text-gray-800 mb-1">
              Visa Processing Support
            </h3>
            <p className="text-gray-600 mb-4  text-center">
              Step-by-step visa guidance to ensure smooth documentation and
              maximize your visa success rate.
            </p>
          </div>
        </div>
        <div className=" p-6 max-sm:border max-sm:border-sky-500 md:border-r  max-sm:rounded-2xl md:border-r-gray-400 md:bg-white sm:bg-gray-300 sm:rounded-2xl md:rounded-none hover:shadow-md transition-all flex  justify-center gap-x-6 items-center">
          <div className=" w-1/2 ">
            <Image src={Departure} alt="Img" objectFit="cover" />
          </div>

          <div>
            <h3 className="text-xl text-center font-semibold text-gray-800 mb-1">
              Pre-Departure Guidance
            </h3>
            <p className="text-gray-600 mb-4  text-center">
              Everything you need before flying—travel tips, packing guidance,
              accommodation, and safety advice.
            </p>
          </div>
        </div>
        <div className=" p-6 max-sm:border max-sm:border-sky-500 hover:shadow-md transition-all max-sm:rounded-2xl flex md:bg-white sm:bg-gray-300 sm:rounded-2xl md:rounded-none  justify-center gap-x-6 items-center">
          <div className=" w-1/2 ">
            <Image src={Lang} alt="Img" objectFit="cover" />
          </div>

          <div>
            <h3 className="text-xl text-center font-semibold text-gray-800 mb-1">
              Language & Test Preparation
            </h3>
            <p className="text-gray-600 mb-4  text-center">
              Expert training for IELTS, PTE, TOEFL, and other language tests to
              boost your confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
