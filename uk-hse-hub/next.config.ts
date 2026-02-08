import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Prevent Next.js from accidentally picking a parent workspace root
    // when multiple lockfiles exist on the machine.
    root: __dirname,
  },

  // When you open the dev site from another device (LAN/Tailscale/etc.),
  // Next may treat requests to /_next/* as cross-origin unless explicitly allowed.
  // This silences the warning and future-proofs dev mode.
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://100.83.154.106:3000",
  ],
};

export default nextConfig;
