/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      domains: [
        "files.edgestore.dev",
        "img.clerk.com"
      ]
    },
    experimental: {
      webSocketPort: 0, 
    },
  };
  
  module.exports = nextConfig;
  