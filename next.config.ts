import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  // Required for Prisma with SQLite (better-sqlite3 native module) on Vercel
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;