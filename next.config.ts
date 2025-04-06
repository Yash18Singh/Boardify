import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['lh3.googleusercontent.com'], // Add the domain here
  },
};

export default nextConfig;
