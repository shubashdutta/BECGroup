/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { FC, useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface SliderProps {
  items: any[];
}

const CardCarousel: FC<SliderProps> = ({ items }) => {
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 480) setVisibleCount(1);
      else if (window.innerWidth < 768) setVisibleCount(2);
      else if (window.innerWidth < 1024) setVisibleCount(3);
      else setVisibleCount(4);
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);
  const cardWidth = 100 / visibleCount;

  const prevSlide = () => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * cardWidth}%)` }}
      >
        {items.map((item: any, index: number) => (
          <div
            key={index}
            className="px-2"
            style={{ minWidth: `${cardWidth}%` }}
          >
            {/* CARD */}
            <div className="shadow-xl rounded-lg bg-white cursor-pointer hover:scale-105 transition-transform duration-300">
              <img
                src={item?.file?.path ?? item.img}
                alt={item.university}
                className="rounded-t-lg w-full h-[200px] object-cover "
              />

              <div className="flex gap-x-2 items-center px-3 mt-3">
                <img
                  src={item?.flag?.path ?? item.flag}
                  alt="flag"
                  className="w-7 h-5 rounded-sm object-cover"
                />
                <h2 className="text-lg font-semibold text-gray-700">
                  {item?.location ?? item?.country}
                </h2>
              </div>

              <div className="px-3 py-3 space-y-1">
                <h3 className="font-bold text-gray-900">
                  {item.universityName ?? item?.university}
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  {item?.courseName ?? item?.course}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LEFT BUTTON */}
      {current > 0 && (
        <button
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
          onClick={prevSlide}
        >
          <FaAngleLeft size={28} />
        </button>
      )}

      {/* RIGHT BUTTON */}
      {current < maxIndex && (
        <button
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
          onClick={nextSlide}
        >
          <FaAngleRight size={28} />
        </button>
      )}
    </div>
  );
};

export default CardCarousel;
