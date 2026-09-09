import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const publicApiUrl =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

const backendUrl =
  process.env.API_INTERNAL_URL ?? publicApiUrl;

function getRemoteImagePatterns(): NonNullable<
  NextConfig['images']
>['remotePatterns'] {
  const patterns: NonNullable<NextConfig['images']>['remotePatterns'] = [
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
    {
      protocol: 'https',
      hostname: '*.onrender.com',
      pathname: '/media/**',
    },
  ];

  try {
    const api = new URL(publicApiUrl);
    const protocol = api.protocol.replace(':', '') as 'http' | 'https';

    patterns.push({
      protocol,
      hostname: api.hostname,
      ...(api.port ? { port: api.port } : {}),
      pathname: '/media/**',
    });
  } catch {
    // URL inválida en entorno local sin configurar
  }

  return patterns;
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: `${backendUrl.replace(/\/$/, '')}/media/:path*`,
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
    remotePatterns: getRemoteImagePatterns(),
  },
};

export default nextConfig;
