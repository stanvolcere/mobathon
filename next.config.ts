import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://files.mob-cdn.co.uk/**')],
  },
};

export default nextConfig;
