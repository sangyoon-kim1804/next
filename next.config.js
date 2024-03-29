/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    loader: 'akamai',
    path: '',
  }
}

module.exports = nextConfig
