"use client";

import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { PublicGetTeam } from "../ApiList/PublicApi";
import { errorMessage } from "../lib/ToastifyMessage/ToastifyMessage";
const OurTeam = () => {
  const [team, SetTeam] = useState([]);
  const teamMembers = [
    {
      name: "Emma Smith",
      role: "CEO & Founder",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Sophia Johnson",
      role: "Head of Admissions",
      img: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Olivia Brown",
      role: "Student Counselor",
      img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Isabella Davis",
      role: "Marketing Director",
      img: "https://plus.unsplash.com/premium_photo-1690086519096-0594592709d3?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Amelia Wilson",
      role: "Visa Consultant",
      img: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Amelia Wilson",
      role: "Visa Consultant",
      img: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Amelia Wilson",
      role: "Visa Consultant",
      img: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Amelia Wilson",
      role: "Visa Consultant",
      img: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const handleGetTeam = async () => {
    const params = {
      statusIn: "ACTIVE",
    };
    try {
      const res: any = await PublicGetTeam(params);

      const apiData = res?.data || [];
      const fallBack = teamMembers;

      if (apiData?.length >= 5) {
        SetTeam(apiData);
      } else {
        const needed = 5 - apiData?.length;
        const extra = fallBack.slice(0, needed);
        const finalData: any = [...apiData, ...extra];
        SetTeam(finalData);
      }
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetTeam();
  }, []);
  return (
    <div className=" w-full shadow-2xl bg-white mt-5 ">
      <div className=" container mx-auto py-3">
        <div>
          <h3 className=" text-center font-bold">Our Dedicated Team</h3>
          <h4 className=" text-center font-semibold">
            Visionary People Behind Our Success
          </h4>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 30 },
          }}
          wrapperClass=" !py-8"
        >
          {team.map((member: any, index: number) => (
            <SwiperSlide key={index}>
              <div
                className="group relative overflow-hidden rounded-3xl shadow-lg 
                           transition-all duration-500 hover:shadow-2xl 
                           hover:-translate-y-3"
              >
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={member?.file?.path ?? member.img}
                    alt={member.name}
                    className="w-full h-80 md:h-96 object-cover 
                               transition-transform duration-700 
                               group-hover:scale-110"
                  />
                </div>

                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent 
             opacity-100 lg:opacity-0 lg:group-hover:opacity-100 
             transition-opacity duration-500 
             flex flex-col justify-end p-6 text-white"
                >
                  <h3 className="text-xl font-bold">
                    {member?.userName ?? member.name}
                  </h3>
                  <p className="text-sm opacity-90">
                    {member?.designation ?? member.role}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OurTeam;
