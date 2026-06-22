import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';
const backendUrl =
  process.env.API_INTERNAL_URL ?? 'http://backend:8000';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: `${backendUrl}/media/:path*`,
      },
    ];
  },
  images: {
    dangerouslyAllowLocalIP: isDev,
    localPatterns: [
      {
        pathname: '/media/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'backend',
        port: '8000',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
