/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all domains
      },
      {
        protocol: 'http',
        hostname: '**', // Allow all domains (HTTP)
      },
    ],
  },
};

export default nextConfig;
