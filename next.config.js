 /** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,  
    images:{
        domains:[
            "files.edgestore.dev",
            "img.clerk.com"
        ]
       }
  }
  
  module.exports = nextConfig