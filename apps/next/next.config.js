/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  target: 'serverless',
  experimental: {
    externalDir: true,
  },
}

module.exports = nextConfig
