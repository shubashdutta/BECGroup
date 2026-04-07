// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/dashboard",
          "/reception",
          "/council",
          "/permission",
          "/role",
        ], // Hide backend pages
      },
    ],
    sitemap: "https://babyeducation.com.np/sitemap.xml",
    host: "https://babyeducation.com.np",
  };
}
