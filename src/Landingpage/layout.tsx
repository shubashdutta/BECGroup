/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC } from "react";
import Link from "next/link";
import { Facebook, Instagram, MailCheck, Phone } from "lucide-react";
import { FaLinkedinIn, FaThreads, FaTiktok, FaXTwitter } from "react-icons/fa6";
import Footer from "./Footer";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import TopHeader from "./TopHeader";
import ToastProvider from "@/app/ToastProvider";
import AdminLayout from "../AdminPlan/Admin/layout";
import ModalProvider from "../utils/Modal/OpenModalProvider";
import { AdminNavList } from "../utils/AdminNavList/AdminNavList";
import RouteGuard from "../lib/RouteGuard/RouteGuard";
import TawkTo from "../Common/TawkTo";
import NotificationListener from "../Common/NotficationLis";
import DrawerModalProvider from "../utils/Modal/DrawerModalProvider";
import {
  FaFacebookF,
  FaInstagram,
  FaSnapchatGhost,
  FaViber,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

interface LayoutProps {
  children: any;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const extraPrivateRoutes = ["/all_notification"];

  const isAdminRoute =
    pathname.startsWith("/dashboard") ||
    extraPrivateRoutes.includes(pathname) ||
    AdminNavList.some((item) => {
      if (pathname.startsWith(item.link)) return true;

      if (item?.children) {
        return item.children.some((sub) => pathname.startsWith(sub.link));
      }

      return false;
    });

  if (isAdminRoute) {
    return (
      <RouteGuard>
        <NotificationListener />
        <ModalProvider>
          <DrawerModalProvider>
            <ToastProvider />

            <AdminLayout>{children}</AdminLayout>
          </DrawerModalProvider>
        </ModalProvider>
      </RouteGuard>
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const socialLinks = [
    {
      icon: <FaWhatsapp />,
      href: "https://wa.me/9779766845580", // ← add real viber number if you want direct chat
      color: "bg-green-500",
    },
    {
      icon: <FaViber />,
      href: "https://invite.viber.com/?g2=AQBJ5cv804v3flNafefS%2BshN78GpvofH%2FeCb5oBjmHoS2nosytSTMRPWxBpdfeev&lang=en", // ← add real viber number if you want direct chat
      color: "bg-[#7360F2]",
    },

    {
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/profile.php?id=61563816302650",
      color: "bg-[#1877F2]",
    },
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/babyeducationconsultancy?igsh=aTd0bDZ3b3kycW5j",
      color: "bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888]",
    },
    {
      icon: <FaLinkedinIn />,
      href: "https://www.linkedin.com/in/baby-education-consultancy-60a811326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      color: "bg-[#0A66C2]",
    },
    {
      icon: <FaXTwitter />,
      href: "https://x.com/BabyConsultancy",
      color: "bg-[#000000]",
    },
    {
      icon: <FaTiktok />,
      href: "https://www.tiktok.com/@babyeducationconsultancy?_r=1&_t=ZS-92FZ8w5uMSX",
      color: "bg-black",
    },
    {
      icon: <FaYoutube />,
      href: "https://youtube.com/@babyeducationconsultancy?si=SKm1SNN_d5DHBSbH", // ← update this with your real channel
      color: "bg-[#FF0000]",
    },
    {
      icon: <FaSnapchatGhost />,
      href: "https://www.snapchat.com/add/babyeducationco?share_id=SEdio4QQfyg&locale=en-NP", // ← update with real snap link
      color: "bg-[#FFFC00]",
    },

    {
      icon: <FaThreads />,
      href: "https://www.threads.com/@babyeducationconsultancy", // ← update with real profile
      color: "bg-black",
    },
  ];
  return (
    <>
      <ModalProvider>
        <ToastProvider />
        {/* {!isAdminRoute && <TawkTo />} */}
        <div className=" max-sm:hidden w-full bg-[#245A91] ">
          <div className="  container mx-auto   py-2  text-white  text-sm ">
            <div className=" flex justify-between">
              <div className=" flex gap-6 justify-center items-center  ">
                <a
                  href="mailto:"
                  className=" flex justify-center  items-center gap-2"
                >
                  <span>
                    <MailCheck color="white" size={15} />
                  </span>
                  babyeducation@gmail.com
                </a>
                <a
                  href="tel:+9766845580"
                  className=" flex justify-center items-center gap-2"
                >
                  <span>
                    <Phone color="white" size={15} />
                  </span>
                  (01)-5922468, (01)-5922368
                </a>
              </div>

              <div className="flex items-center gap-4 md:gap-5">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target={social.href ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-8 h-8 md:w-9 md:h-9 ${social.color} rounded-full text-white transition-all duration-300 hover:scale-110 hover:animate-bounce shadow-sm hover:shadow-md`}
                    aria-label="Social media link"
                  >
                    {React.cloneElement(social.icon, { size: 18 })}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <TopHeader />

        <section>{children}</section>

        <Footer />
      </ModalProvider>
    </>
  );
};

export default Layout;
