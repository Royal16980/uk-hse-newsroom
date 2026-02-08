import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Prevent Next.js from accidentally picking a parent workspace root
    // when multiple lockfiles exist on the machine.
    root: __dirname,
  },
};

export default nextConfig;
