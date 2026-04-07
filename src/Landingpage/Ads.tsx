"use client";

import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import Image from "next/image";
import { PublicAboutAndAds } from "../ApiList/PublicApi";
import { errorMessage } from "../lib/ToastifyMessage/ToastifyMessage";

const Ads = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adData, setAdData] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Open modal after page load
  useEffect(() => {
    const showAd = () => {
      setTimeout(() => {
        setIsModalOpen(true);
      }, 800);
    };

    if (document.readyState === "complete") {
      showAd();
    } else {
      window.addEventListener("load", showAd);
    }

    handleGetAds();

    return () => window.removeEventListener("load", showAd);
  }, []);

  // Auto slide every 3 seconds
  useEffect(() => {
    if (!adData?.files?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === adData.files.length - 1 ? 0 : prev + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [adData]);

  const handleGetAds = async () => {
    const params = {
      statusIn: "ACTIVE",
      isActive: "true",
    };
    try {
      const res: any = await PublicAboutAndAds(params);
      const data = res?.data?.find((item: any) => item.section === "HOSTEL_AD");
      setAdData(data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  if (!adData) return null;

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      closeIcon={null}
      maskClosable
      width={900}
      className="mobile-fullscreen-modal"
      styles={{
        body: {
          padding: 0,
          borderRadius: "24px",
          overflow: "hidden",
        },
      }}
    >
      {/* Wrapper */}
      <div className="relative h-[80vh] md:h-[520px] w-full">
        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="
            absolute top-4 right-4 z-20
            px-4 py-2 text-sm font-medium text-white
            bg-black/40 backdrop-blur-md
            border border-white/20
            rounded-full
            hover:bg-black/60 transition-all
             cursor-pointer
          "
        >
          ✕ Close
        </button>

        {/* Image Slider */}
        <Image
          src={adData?.files?.[currentIndex]?.path}
          alt={`Ad Image ${currentIndex + 1}`}
          fill
          priority
          className=" transition-opacity duration-700"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {adData?.files?.map((_: any, index: number) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full cursor-pointer transition-all
                ${currentIndex === index ? "bg-white scale-125" : "bg-white/40"}
              `}
            />
          ))}
        </div>

        {/* Content */}
        <div
          className="
            absolute inset-x-0 bottom-0 z-10
            bg-gradient-to-t from-black/90 via-black/50 to-transparent
            px-6 md:px-12 py-10 md:py-14
            text-center
          "
        >
          <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Admission Open {new Date().getFullYear()}
          </h3>

          <p className="text-base md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Secure your child’s comfort and care at <b>Baby Boys Hostel</b>.
            Limited seats available!
          </p>

          <Button
            size="large"
            className="
              !bg-yellow-400 hover:!bg-yellow-500
              !border-none !text-black
              font-bold text-lg
              px-10 py-5
              rounded-full
              shadow-lg hover:shadow-xl
              transition-all
            "
            onClick={() => {
              window.open("https://wa.me/+9779766845580", "_blank");
              setIsModalOpen(false);
            }}
          >
            Contact on WhatsApp
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Ads;
