import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ["res.cloudinary.com"],
    // Alternative newer syntax (recommended):
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
