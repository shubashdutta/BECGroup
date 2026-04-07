"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import StudentEmpowerImage from "@/asstest/Image/StudentEmpower.png"; // replace with your image
import GetStartedBtn from "../Common/GetStartedBtn";
import { FiGrid } from "react-icons/fi";

export default function HeroSection() {
  // Intersection Observer
  const { ref, inView } = useInView({
    triggerOnce: true, // animate only once
    threshold: 0.5, // trigger when 50% of div is visible
  });

  return (
    <div
      ref={ref}
      className="relative w-full h-[500px] md:h-[600px] mt-5 overflow-hidden"
    >
      <Image
        src={StudentEmpowerImage}
        alt="Students achieving their dreams"
        fill
        className="object-cover brightness-50 bg-black/40 backdrop-blur-sm"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div>
          <h3 className="text-white text-2xl md:text-2xl font-semibold">
            Supporting{" "}
            {inView && (
              <span className="secondary-color text-4xl">
                <CountUp end={7000} duration={4} />+
              </span>
            )}{" "}
            {""}
            students in reaching their global education goals.
          </h3>

          <h4 className=" max-sm:container sm:w-[70%] mx-auto text-center text-gray-200 text-lg pt-3 font-medium ">
            Thousands of students trust us to achieve their higher education
            dreams abroad. With expert guidance, we help them select
            universities, secure scholarships, and navigate the visa process
            with ease.
          </h4>
        </div>

        <div className=" mt-5 cursor-pointer">
          <GetStartedBtn
            label="Learn more"
            color={"#d61f24"}
            icon={<FiGrid size={20} />}
          />
        </div>
      </div>
    </div>
  );
}
