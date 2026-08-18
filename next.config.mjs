/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/breeds/biwer-terrier",
        destination: "/breeds/biewer-terrier",
        permanent: true,
      },
      {
        source: "/breeds/cavalier",
        destination: "/breeds/king-charles",
        permanent: true,
      },
    ]
  },
  ...(process.env.REPLIT_DEV_DOMAIN
    ? { allowedDevOrigins: [process.env.REPLIT_DEV_DOMAIN] }
    : {}),
}

export default nextConfig
