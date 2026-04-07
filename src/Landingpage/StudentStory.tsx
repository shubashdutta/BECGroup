// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaPause,
//   FaPlay,
// } from "react-icons/fa6";
// import { Swiper, SwiperSlide } from "swiper/react";

// import { Navigation } from "swiper/modules";
// import { GetVideo } from "../ApiList/AdminApi";
// import { errorMessage } from "../lib/ToastifyMessage/ToastifyMessage";
// import { PublicGetVideo } from "../ApiList/PublicApi";

// const StudentStory = () => {
//   const videoRef = useRef<{ [key: number]: HTMLVideoElement | null }>({});
//   const [isPlaying, setIsPlaying] = useState<number | null>(null);
//   const [canGoPrev, setCanGoPrev] = useState(false);
//   const [canGoNext, setCanGoNext] = useState(true);
//   const [videoData, setVideoData] = useState([]);

//   const videoList = [
//     { id: 1, url: "https://cdn.pixabay.com/video/2025/10/04/307864_large.mp4" },
//     { id: 2, url: "https://cdn.pixabay.com/video/2025/02/17/258799_large.mp4" },
//     {
//       id: 3,
//       url: "https://imagine-public.x.ai/imagine-public/share-videos/b630e4b8-a0fa-45f6-a1bb-65ae7cc9ffe8_hd.mp4?cache=1",
//     },
//     {
//       id: 4,
//       url: "https://videocdn.cdnpk.net/videos/af63f596-1023-47de-8b9e-46511cfe31a6/horizontal/previews/clear/large.mp4?token=exp=1763531507~hmac=12d1be7814d08ea208b1a1ff6c063812e9d8b9f57a2e1bf2db3077c5e20a1617",
//     },
//     {
//       id: 5,
//       url: "https://videocdn.cdnpk.net/videos/23b483ff-0305-52e6-be36-c915b022128c/vertical/previews/clear/large.mp4?token=exp=1763531604~hmac=23ae7d29365a9bc8efc7d25464fe218531cf4897f07409e1bd0e1e458fd86b3e",
//     },
//     {
//       id: 6,
//       url: "https://videocdn.cdnpk.net/videos/f89b337b-72d2-4f31-bd1c-0d9f7ed21b1a/horizontal/previews/clear/large.mp4?token=exp=1763531710~hmac=89ecc6153d7e7b2f2fdc029f4a1a360a19ad070be37fb66364350888d19ee13c",
//     },
//   ];

//   const handelGetVideo = async () => {
//     const param = {
//       statusIn: "ACTIVE",
//     };
//     try {
//       const res: any = await PublicGetVideo(param);
//       const apiData = res?.data || [];
//       const fallBack = videoList;

//       if (apiData?.length >= 5) {
//         setVideoData(apiData);
//       } else {
//         const needed = 5 - apiData?.length;
//         const extra = fallBack.slice(0, needed);
//         const finallData: any = [...apiData, ...extra];
//         setVideoData(finallData);
//       }
//     } catch (error) {
//       errorMessage({ error });
//     }
//   };

//   useEffect(() => {
//     handelGetVideo();
//   }, []);

//   const togglePlay = (id: number) => {
//     const currentVideo = videoRef.current[id];
//     if (!currentVideo) return;

//     if (isPlaying === id) {
//       currentVideo.paused ? currentVideo.play() : currentVideo.pause();
//       setIsPlaying(currentVideo.paused ? null : id);
//     } else {
//       Object.values(videoRef.current).forEach((v) => v?.pause());
//       currentVideo.play();
//       setIsPlaying(id);
//     }
//   };

//   return (
//     <div className="relative container mx-auto rounded-2xl overflow-hidden bg-gradient-to-r from-[#D61F24] via-[#245A91] to-[#102E4E]">
//       <h1 className="text-center text-white text-2xl font-semibold py-6">
//         Real Experiences. Real Success.
//       </h1>

//       {/* Swiper */}
//       <Swiper
//         slidesPerView={1}
//         breakpoints={{
//           640: {
//             slidesPerView: 6,
//             spaceBetween: 20,
//           },
//         }}
//         spaceBetween={10}
//         navigation={{
//           nextEl: ".custom-next",
//           prevEl: ".custom-prev",
//         }}
//         modules={[Navigation]}
//         wrapperClass="px-8 !pr-24 py-5"
//         observer={true}
//         observeParents={true}
//         watchOverflow={true}
//         onSlideChange={(swiper) => {
//           setCanGoPrev(!swiper.isBeginning);
//           setCanGoNext(!swiper.isEnd);
//         }}
//         onSwiper={(swiper) => {
//           setCanGoPrev(!swiper.isBeginning);
//           setCanGoNext(!swiper.isEnd);
//         }}
//       >
//         {videoData?.map((v: any, index: number) => (
//           <SwiperSlide key={index} className="max-sm:h-96 !w-52 !h-96">
//             <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden group shadow-2xl">
//               <video
//                 ref={(el: any) => (videoRef.current[v.id] = el)}
//                 src={v?.file?.path ?? v.url}
//                 className="w-full h-full object-cover"
//                 loop
//                 playsInline
//                 preload="metadata"
//               />

//               <button
//                 onClick={() => togglePlay(v.id)}
//                 className="absolute inset-0 flex items-center justify-center"
//               >
//                 {isPlaying === v.id ? (
//                   <FaPause size={56} className="text-white drop-shadow-2xl" />
//                 ) : (
//                   <FaPlay
//                     size={56}
//                     className="text-white drop-shadow-2xl translate-x-1"
//                   />
//                 )}
//               </button>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* ✅ Custom Prev Button */}
//       <button
//         className={`custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10
//       bg-white/20 backdrop-blur-md text-white p-3 rounded-full shadow-lg
//       transition ${!canGoPrev && "opacity-40 cursor-not-allowed"}`}
//       >
//         <FaChevronLeft size={20} />
//       </button>

//       {/* ✅ Custom Next Button */}
//       <button
//         className={`custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10
//       bg-white/20 backdrop-blur-md text-blue-700 p-3 rounded-full shadow-lg
//       transition ${!canGoNext && "opacity-40 cursor-not-allowed"}`}
//       >
//         <FaChevronRight size={20} />
//       </button>
//     </div>
//   );
// };

// export default StudentStory;

"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPause,
  FaPlay,
} from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { errorMessage } from "../lib/ToastifyMessage/ToastifyMessage";
import { PublicGetVideo } from "../ApiList/PublicApi";

const StudentStory = () => {
  const videoRef = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);
  const [videoData, setVideoData] = useState<any[]>([]);
  const swiperRef = useRef<any>(null); // Store swiper instance

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const videoList = [
    { id: 1, url: "https://cdn.pixabay.com/video/2025/10/04/307864_large.mp4" },
    { id: 2, url: "https://cdn.pixabay.com/video/2025/02/17/258799_large.mp4" },
    {
      id: 3,
      url: "https://imagine-public.x.ai/imagine-public/share-videos/b630e4b8-a0fa-45f6-a1bb-65ae7cc9ffe8_hd.mp4?cache=1",
    },
    {
      id: 4,
      url: "https://videocdn.cdnpk.net/videos/af63f596-1023-47de-8b9e-46511cfe31a6/horizontal/previews/clear/large.mp4",
    },
    {
      id: 5,
      url: "https://videocdn.cdnpk.net/videos/23b483ff-0305-52e6-be36-c915b022128c/vertical/previews/clear/large.mp4",
    },
    {
      id: 6,
      url: "https://videocdn.cdnpk.net/videos/f89b337b-72d2-4f31-bd1c-0d9f7ed21b1a/horizontal/previews/clear/large.mp4",
    },
  ];

  const handelGetVideo = async () => {
    const param = { statusIn: "ACTIVE" };
    try {
      const res: any = await PublicGetVideo(param);
      const apiData = res?.data || [];
      const fallBack = videoList;

      if (apiData?.length >= 5) {
        setVideoData(apiData);
      } else {
        const needed = 5 - apiData?.length;
        const extra = fallBack.slice(0, needed);
        setVideoData([...apiData, ...extra]);
      }
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handelGetVideo();
  }, []);

  const togglePlay = (id: number) => {
    const currentVideo = videoRef.current[id];
    if (!currentVideo) return;

    if (isPlaying === id) {
      currentVideo.paused ? currentVideo.play() : currentVideo.pause();
      setIsPlaying(currentVideo.paused ? null : id);
    } else {
      Object.values(videoRef.current).forEach((v) => v?.pause());
      currentVideo.play();
      setIsPlaying(id);
    }
  };

  // Initialize navigation after refs exist
  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [videoData]);

  return (
    <div className="relative container mx-auto rounded-2xl overflow-hidden bg-gradient-to-r from-[#D61F24] via-[#245A91] to-[#102E4E]">
      <h1 className="text-center text-white text-2xl font-semibold py-6">
        Real Experiences. Real Success.
      </h1>

      {/* Swiper */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        breakpoints={{ 640: { slidesPerView: 6, spaceBetween: 20 } }}
        spaceBetween={10}
        modules={[Navigation]}
        observer={true}
        observeParents={true}
        watchOverflow={true}
        onSlideChange={(swiper) => {
          setCanGoPrev(!swiper.isBeginning);
          setCanGoNext(!swiper.isEnd);
        }}
        wrapperClass="px-8 !pr-24 py-5"
      >
        {videoData.map((v: any, index: number) => (
          <SwiperSlide key={index} className="max-sm:h-96 !w-52 !h-96">
            <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden group shadow-2xl">
              <video
                ref={(el: any) => (videoRef.current[v.id] = el)}
                src={v?.file?.path ?? v.url}
                className="w-full h-full object-cover"
                loop
                playsInline
                preload="metadata"
              />
              <button
                onClick={() => togglePlay(v.id)}
                className="absolute inset-0 flex items-center justify-center"
              >
                {isPlaying === v.id ? (
                  <FaPause size={56} className="text-white drop-shadow-2xl" />
                ) : (
                  <FaPlay
                    size={56}
                    className="text-white drop-shadow-2xl translate-x-1"
                  />
                )}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Prev Button */}
      <button
        ref={prevRef}
        className={` cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 z-10 
          bg-white/20 backdrop-blur-md text-white p-3 rounded-full shadow-lg
          transition ${!canGoPrev ? "opacity-40 cursor-not-allowed" : ""}`}
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Custom Next Button */}
      <button
        ref={nextRef}
        className={` cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 z-10 
          bg-white/20 backdrop-blur-md text-white p-3 rounded-full shadow-lg
          transition ${!canGoNext ? "opacity-40 cursor-not-allowed" : ""}`}
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default StudentStory;
