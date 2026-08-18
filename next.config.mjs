/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  ...(process.env.REPLIT_DEV_DOMAIN
    ? { allowedDevOrigins: [process.env.REPLIT_DEV_DOMAIN] }
    : {}),
}

export default nextConfig
