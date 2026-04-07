"use client";

import React, { useEffect, useState } from "react";
import CardCarousel from "../Common/CardCarousel";
import { PublicGetVisa } from "../ApiList/PublicApi";
import { errorMessage } from "../lib/ToastifyMessage/ToastifyMessage";

const Visa = () => {
  const studyData = [
    {
      id: 1,
      img: "https://cdn.create.vista.com/api/media/small/3958211/stock-photo-new-york-cityscape-tourism-concept-photograph",
      flag: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
      country: "UK",
      university: "University Of London",
      course: "Bachelor In Computer Application",
    },
    {
      id: 2,
      img: "https://cdn.create.vista.com/api/media/small/3958221/stock-photo-london-cityscape",
      flag: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_Kingdom.svg",
      country: "UK",
      university: "Imperial College London",
      course: "Master In Computer Science",
    },
    {
      id: 3,
      img: "https://cdn.create.vista.com/api/media/small/3958221/stock-photo-london-cityscape",
      flag: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
      country: "France",
      university: "Sorbonne University",
      course: "Bachelor In Arts",
    },
    {
      id: 4,
      img: "https://cdn.create.vista.com/api/media/small/3958221/stock-photo-london-cityscape",
      flag: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
      country: "Japan",
      university: "University of Tokyo",
      course: "Bachelor In Engineering",
    },
    {
      id: 5,
      img: "https://cdn.create.vista.com/api/media/small/3958221/stock-photo-london-cityscape",
      flag: "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg",
      country: "Germany",
      university: "Humboldt University",
      course: "Master In Physics",
    },
  ];

  const [visaData, setVisaData] = useState([]);

  const handleGetVisa = async () => {
    const params = {
      statusIn: "ACTIVE",
    };

    try {
      const res: any = await PublicGetVisa(params);
      const apiData = res?.data || [];
      const fallBack = studyData;

      if (apiData?.length >= 5) {
        setVisaData(apiData);
      } else {
        const needed = 5 - apiData?.length;
        const extraMembers = fallBack.slice(0, needed);
        const finalData: any = [...apiData, ...extraMembers];
        setVisaData(finalData);
      }
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetVisa();
  }, []);
  return (
    <div className="container mx-auto  py-5 ">
      <div className=" flex flex-col items-center justify-center  space-y-0.5  py-2">
        <h4 className=" text-gray-800 text-lg font-bold">
          Guaranteed Visa Guidance
        </h4>

        <p className=" max-sm:px-2 text-gray-700 font-medium text-lg">
          Step-by-step support to get your student visa approved without hassle.
        </p>
      </div>

      <div className=" max-w-7xl mx-auto">
        <CardCarousel items={visaData} />
      </div>
    </div>
  );
};

export default Visa;
