/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: any;
  }
}

const TawkTo = () => {
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById("tawk-script")) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.id = "tawk-script"; // make sure it only loads once
    script.async = true;
    script.src = "https://embed.tawk.to/695e5d363eae05197ecac816/1jec9o7d7";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return null;
};

export default TawkTo;
