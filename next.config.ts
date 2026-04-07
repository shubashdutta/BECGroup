import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // optional but recommended
  images: {
    domains: ["img.freepik.com", "babyeducation.com.np", "images.unsplash.com"],
  },
};

export default nextConfig;
