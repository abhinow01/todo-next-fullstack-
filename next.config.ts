import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // bodySizeLimit: '1mb', // Example size limit, adjust as needed
      // allowedOrigins: ['*'], // Example allowed origins, adjust as needed
    },
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
