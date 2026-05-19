import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-bae9cdca-dbab-4e8c-a529-9bacb30033da.space-z.ai",
    ".space-z.ai",
    ".z.ai",
    "localhost",
  ],
};

export default nextConfig;
