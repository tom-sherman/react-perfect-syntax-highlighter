/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    outputFileTracingIncludes: ["lib/shiki"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
