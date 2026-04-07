/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Banner from "../../asstest/Image/BannerImage.png";
import GetStartedBtn from "../Common/GetStartedBtn";
import { FaPhoneAlt } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { BsClock, BsShieldCheck } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa6";
import { FiGlobe } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { PublicGetHeroSection } from "../ApiList/PublicApi";
import { errorMessage } from "../lib/ToastifyMessage/ToastifyMessage";

import { Autoplay } from "swiper/modules";
import "swiper/css";
const HeroSection = () => {
  const infoItems = [
    { icon: <BsClock size={24} />, title: "Available", subtitle: "24/7" },
    {
      icon: <BsShieldCheck size={24} />,
      title: "Guaranteed",
      subtitle: "Satisfaction",
    },
    { icon: <FaUserTie size={24} />, title: "Over", subtitle: "50+ Agents" },
    { icon: <FiGlobe size={24} />, title: "Reference", subtitle: "Worldwide" },
  ];

  const [image, setImage] = useState([]);

  const handleGetHeroSection = async () => {
    const params = {
      statusIn: "ACTIVE",
    };
    try {
      const res = await PublicGetHeroSection(params);

      const data =
        res?.data?.length > 0
          ? res?.data?.flatMap(
              (item: any) => item?.files?.map((file: any) => file?.path) || [],
            )
          : [Banner];

      setImage(data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetHeroSection();
  }, []);

  const img = [Banner];
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {image?.map((v: any, index: number) => (
        <SwiperSlide key={index}>
          <div className="relative h-[300px] md:h-[600px]  w-full">
            <Image src={v} alt="Banner" fill />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection;
