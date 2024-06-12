/** @type {import('next').NextConfig} */

const apiUrl = {
    develop: 'http://localhost:3000/api'
  };
  
  const nextConfig = {
    env: {
      apiUrl: apiUrl.develop
    },
    reactStrictMode: false,
    typescript: {
      ignoreBuildErrors: true,
    }
  };
  
  module.exports = nextConfig;